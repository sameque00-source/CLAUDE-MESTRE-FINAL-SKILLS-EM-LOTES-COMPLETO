/**
 * VÍDEO — FASE 9: análise/informações técnicas reais (ffprobe local), e
 * extração de frame real (ffmpeg local) pra permitir análise visual via
 * `visao.js` quando fizer sentido — sem duplicar a extração de metadados
 * genérica, que já vive em `ffmpeg.js` (reaproveitada por áudio e vídeo).
 */
const path = require('path');
const { extrairMetadados, extrairFrame } = require('./ffmpeg');
const { detectarArquivo } = require('./deteccao');
const { analisarImagem } = require('./visao');

/** Informações técnicas reais (duração, resolução, codec, fps) — nunca inventado, sempre lido do arquivo real via ffprobe. */
async function analisarVideo(caminhoAbsoluto) {
  const deteccao = detectarArquivo(caminhoAbsoluto);
  if (!deteccao.ok || deteccao.modalidade !== 'video') {
    return { ok: false, error: `arquivo não é vídeo válido (modalidade detectada: ${deteccao.modalidade}, motivo: ${deteccao.motivo})` };
  }
  const meta = await extrairMetadados(caminhoAbsoluto);
  if (!meta.ok) return { ok: false, error: meta.erro };
  return {
    ok: true, duracaoSegundos: meta.duracaoSegundos, bitrate: meta.bitrate, mimeReal: deteccao.mimeReal,
    resolucao: meta.video ? `${meta.video.largura}x${meta.video.altura}` : null,
    codec: meta.video ? meta.video.codec : null, fps: meta.video ? meta.video.fps : null,
    temAudio: !!meta.audio,
  };
}

/**
 * Análise VISUAL de um vídeo: extrai um frame real (ffmpeg, processamento
 * local gratuito) e passa pro modelo de visão (`visao.js`) — combina as duas
 * capacidades reais deste projeto em vez de inventar uma terceira (nenhum
 * modelo gratuito com adapter real neste ambiente aceita vídeo bruto
 * diretamente, apesar de `video_in` aparecer no catálogo — gap documentado).
 */
async function analisarConteudoVisual(caminhoVideoAbsoluto, pastaTemp, tempoSegundos = 1, pergunta) {
  const deteccao = detectarArquivo(caminhoVideoAbsoluto);
  if (!deteccao.ok || deteccao.modalidade !== 'video') {
    return { ok: false, error: `arquivo não é vídeo válido (modalidade detectada: ${deteccao.modalidade})` };
  }
  const caminhoFrame = path.join(pastaTemp, `frame_${Date.now()}.png`);
  const extracao = await extrairFrame(caminhoVideoAbsoluto, caminhoFrame, tempoSegundos);
  if (!extracao.ok) return { ok: false, error: `extração de frame falhou: ${extracao.erro}` };
  const analise = await analisarImagem(caminhoFrame, pergunta);
  return { ...analise, frameExtraidoEm: caminhoFrame, tempoSegundos };
}

module.exports = { analisarVideo, analisarConteudoVisual };
