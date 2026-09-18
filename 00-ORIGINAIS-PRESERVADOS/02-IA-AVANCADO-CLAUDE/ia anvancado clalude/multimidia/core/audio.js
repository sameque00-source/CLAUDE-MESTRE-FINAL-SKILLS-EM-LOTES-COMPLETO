/**
 * ÁUDIO — FASE 9: análise técnica (ffprobe, real e local) + transcrição real.
 *
 * TRANSCRIÇÃO — gap real encontrado nesta fase: o catálogo já lista
 * `groq-whisper-large-v3-turbo` (modality `audio_stt`), mas
 * `gateway/providers.js` só implementa o adapter de CHAT (`/chat/completions`)
 * pra Groq — não existe adapter pro endpoint real de transcrição
 * (`/openai/v1/audio/transcriptions`, multipart/form-data). Esse endpoint
 * NUNCA foi chamado por nenhum código deste projeto antes de agora.
 * Implementado aqui como uma chamada HTTP direta e NOVA (não duplica nada
 * existente, porque nada existia pra esse endpoint) — reaproveita a MESMA
 * chave `GROQ_API_KEY` já usada pelo Gateway, lida do MESMO arquivo `.env`
 * (nunca logada, nunca persistida — só usada no header Authorization).
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { extrairMetadados } = require('./ffmpeg');
const { detectarArquivo } = require('./deteccao');

const ENV_PATH = path.join('C:', 'Users', 'Administrator', 'Documents', 'AI-ORCHESTRATOR', 'config', '.env');
const TAMANHO_MAXIMO_AUDIO_BYTES = 25 * 1024 * 1024; // 25MB, mesmo teto do limite real da API do Groq pro tier gratuito

function lerChaveGroq() {
  try {
    const conteudo = fs.readFileSync(ENV_PATH, 'utf8');
    const linha = conteudo.split(/\r?\n/).find((l) => l.startsWith('GROQ_API_KEY='));
    return linha ? linha.slice('GROQ_API_KEY='.length).trim() : null;
  } catch { return null; }
}

/** Metadados técnicos reais (duração, sample rate, canais, codec) — via ffprobe local, nunca inventado. */
async function analisarAudio(caminhoAbsoluto) {
  const deteccao = detectarArquivo(caminhoAbsoluto);
  if (!deteccao.ok || deteccao.modalidade !== 'audio') {
    return { ok: false, error: `arquivo não é áudio válido (modalidade detectada: ${deteccao.modalidade}, motivo: ${deteccao.motivo})` };
  }
  const meta = await extrairMetadados(caminhoAbsoluto);
  if (!meta.ok) return { ok: false, error: meta.erro };
  return { ok: true, duracaoSegundos: meta.duracaoSegundos, codec: meta.audio ? meta.audio.codec : null, sampleRate: meta.audio ? meta.audio.sampleRate : null, canais: meta.audio ? meta.audio.canais : null, mimeReal: deteccao.mimeReal };
}

/**
 * Transcrição REAL via Groq Whisper (multipart/form-data direto, sem
 * biblioteca externa — Node `https` nativo). Retorna erro HONESTO
 * (`indisponivel`) se a chave não estiver configurada ou a chamada falhar —
 * nunca inventa uma transcrição.
 */
function transcreverAudio(caminhoAbsoluto) {
  return new Promise((resolve) => {
    const deteccao = detectarArquivo(caminhoAbsoluto);
    if (!deteccao.ok || deteccao.modalidade !== 'audio') {
      resolve({ ok: false, error: `arquivo não é áudio válido (modalidade detectada: ${deteccao.modalidade})` }); return;
    }
    if (deteccao.tamanhoBytes > TAMANHO_MAXIMO_AUDIO_BYTES) {
      resolve({ ok: false, error: `áudio excede o limite de ${TAMANHO_MAXIMO_AUDIO_BYTES} bytes` }); return;
    }
    const chave = lerChaveGroq();
    if (!chave) {
      resolve({ ok: false, error: 'GROQ_API_KEY não configurada — transcrição indisponível (gap real, não fingido)', categoriaFalha: 'auth' }); return;
    }

    const boundary = `----multimidia${Date.now()}`;
    const nomeArquivo = path.basename(caminhoAbsoluto);
    const conteudoArquivo = fs.readFileSync(caminhoAbsoluto);
    const preambulo = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\nwhisper-large-v3-turbo\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${nomeArquivo}"\r\nContent-Type: ${deteccao.mimeReal}\r\n\r\n`,
      'utf8'
    );
    const posambulo = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8');
    const corpo = Buffer.concat([preambulo, conteudoArquivo, posambulo]);

    const req = https.request({
      hostname: 'api.groq.com', path: '/openai/v1/audio/transcriptions', method: 'POST', timeout: 30000,
      headers: { Authorization: `Bearer ${chave}`, 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': corpo.length },
    }, (res) => {
      let dados = '';
      res.on('data', (c) => { dados += c; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve({ ok: false, error: `HTTP ${res.statusCode}: ${dados.slice(0, 300)}`, categoriaFalha: res.statusCode === 429 ? 'quota' : res.statusCode === 401 ? 'auth' : 'indisponivel' });
          return;
        }
        try {
          const json = JSON.parse(dados);
          resolve({ ok: true, texto: json.text || '', modeloId: 'groq-whisper-large-v3-turbo', provider: 'Groq' });
        } catch (e) {
          resolve({ ok: false, error: `resposta da API não é JSON válido: ${e.message}` });
        }
      });
    });
    req.on('error', (e) => resolve({ ok: false, error: `erro de rede: ${e.message}`, categoriaFalha: 'erro_rede' }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'timeout na transcrição', categoriaFalha: 'timeout' }); });
    req.write(corpo);
    req.end();
  });
}

module.exports = { analisarAudio, transcreverAudio, TAMANHO_MAXIMO_AUDIO_BYTES };
