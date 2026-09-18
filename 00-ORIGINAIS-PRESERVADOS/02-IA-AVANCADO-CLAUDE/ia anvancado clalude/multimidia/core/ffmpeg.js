/**
 * FFMPEG/FFPROBE — FASE 9, processamento local gratuito de áudio/vídeo.
 *
 * `ffmpeg`/`ffprobe` já estão instalados neste ambiente (confirmado via
 * `where ffmpeg`/`where ffprobe` antes de escrever este módulo — "não
 * inventar capacidade": só usa porque REALMENTE está disponível, e checa
 * de novo em runtime, nunca assume). 100% local, 100% R$0.
 *
 * BUG REAL já corrigido uma vez nesta sessão (FASE 7/8,
 * `executor/core/ferramentas.js:testarServidor`): `spawn()` sem listener de
 * 'error' derruba o processo INTEIRO num ENOENT (comando não encontrado).
 * Replicado aqui o mesmo tratamento desde o início — nunca introduzir de
 * novo um bug já corrigido antes.
 */
const { spawn } = require('child_process');

let disponibilidadeCache = null; // { ffmpeg: bool, ffprobe: bool } — checado 1x por processo

function executarComando(comando, args, { timeoutMs = 15000 } = {}) {
  return new Promise((resolve) => {
    let jaResolveu = false;
    const proc = spawn(comando, args);
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      if (jaResolveu) return;
      jaResolveu = true;
      try { proc.kill(); } catch { /* já pode ter morrido */ }
      resolve({ ok: false, stdout, stderr, erro: `timeout após ${timeoutMs}ms` });
    }, timeoutMs);
    proc.on('error', (e) => {
      if (jaResolveu) return;
      jaResolveu = true;
      clearTimeout(timer);
      resolve({ ok: false, stdout, stderr, erro: `falha ao iniciar "${comando}" (${e.code || 'erro'}): ${e.message}` });
    });
    proc.stdout.on('data', (d) => { stdout += d; });
    proc.stderr.on('data', (d) => { stderr += d; });
    proc.on('close', (code) => {
      if (jaResolveu) return;
      jaResolveu = true;
      clearTimeout(timer);
      resolve({ ok: code === 0, codigoSaida: code, stdout, stderr });
    });
  });
}

/** Checa disponibilidade real (nunca assume) — cacheado por processo. */
async function checarDisponibilidade() {
  if (disponibilidadeCache) return disponibilidadeCache;
  const [rProbe, rMpeg] = await Promise.all([
    executarComando('ffprobe', ['-version'], { timeoutMs: 5000 }),
    executarComando('ffmpeg', ['-version'], { timeoutMs: 5000 }),
  ]);
  disponibilidadeCache = { ffprobe: rProbe.ok, ffmpeg: rMpeg.ok };
  return disponibilidadeCache;
}

/**
 * Extrai metadados técnicos REAIS de um arquivo de áudio/vídeo via ffprobe
 * (duração, codec, resolução/sample rate, bitrate) — nunca inventa esses
 * valores, sempre lê do arquivo real.
 */
async function extrairMetadados(caminhoAbsoluto) {
  const disp = await checarDisponibilidade();
  if (!disp.ffprobe) return { ok: false, erro: 'ffprobe não disponível neste ambiente (gap real, não fingido)' };
  const r = await executarComando('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', caminhoAbsoluto], { timeoutMs: 20000 });
  if (!r.ok) return { ok: false, erro: `ffprobe falhou: ${r.erro || r.stderr.slice(0, 300)}` };
  let json;
  try { json = JSON.parse(r.stdout); } catch (e) { return { ok: false, erro: `ffprobe devolveu JSON inválido: ${e.message}` }; }

  const streamVideo = (json.streams || []).find((s) => s.codec_type === 'video');
  const streamAudio = (json.streams || []).find((s) => s.codec_type === 'audio');
  return {
    ok: true,
    duracaoSegundos: json.format && json.format.duration ? Number(json.format.duration) : null,
    bitrate: json.format && json.format.bit_rate ? Number(json.format.bit_rate) : null,
    formatoContainer: json.format && json.format.format_name,
    video: streamVideo ? { codec: streamVideo.codec_name, largura: streamVideo.width, altura: streamVideo.height, fps: streamVideo.avg_frame_rate } : null,
    audio: streamAudio ? { codec: streamAudio.codec_name, sampleRate: streamAudio.sample_rate, canais: streamAudio.channels } : null,
    bruto: json,
  };
}

/** Extrai 1 frame (imagem PNG real) de um vídeo, num timestamp — processamento local real via ffmpeg. */
async function extrairFrame(caminhoVideoAbsoluto, caminhoSaidaAbsoluto, tempoSegundos = 1) {
  const disp = await checarDisponibilidade();
  if (!disp.ffmpeg) return { ok: false, erro: 'ffmpeg não disponível neste ambiente (gap real, não fingido)' };
  const r = await executarComando('ffmpeg', ['-y', '-ss', String(tempoSegundos), '-i', caminhoVideoAbsoluto, '-frames:v', '1', caminhoSaidaAbsoluto], { timeoutMs: 20000 });
  if (!r.ok) return { ok: false, erro: `ffmpeg falhou ao extrair frame: ${r.erro || r.stderr.slice(0, 300)}` };
  return { ok: true, caminho: caminhoSaidaAbsoluto };
}

module.exports = { checarDisponibilidade, extrairMetadados, extrairFrame, executarComando };
