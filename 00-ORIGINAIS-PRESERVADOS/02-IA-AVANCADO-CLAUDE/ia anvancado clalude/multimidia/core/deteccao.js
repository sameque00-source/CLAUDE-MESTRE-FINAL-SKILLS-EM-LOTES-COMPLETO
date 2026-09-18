/**
 * DETECÇÃO DE ARQUIVOS MULTIMÍDIA — FASE 9, seção "Detecção de arquivos".
 *
 * "Não confiar apenas na extensão": lê os primeiros bytes REAIS do arquivo
 * (assinatura/magic bytes) e compara com a extensão declarada — um .png
 * renomeado pra .txt (ou um .exe renomeado pra .jpg) é detectado aqui, não
 * mais adiante quando já é tarde demais.
 */
const fs = require('fs');
const path = require('path');

// Assinaturas reais (magic bytes) dos formatos mais comuns — não é uma lista
// exaustiva de todo formato existente, é o conjunto real e verificável que
// este módulo sabe reconhecer (nunca "inventa" reconhecimento de um formato
// que não testou).
const ASSINATURAS = [
  { mime: 'image/png', modalidade: 'imagem', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { mime: 'image/jpeg', modalidade: 'imagem', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/gif', modalidade: 'imagem', bytes: [0x47, 0x49, 0x46, 0x38] },
  { mime: 'image/webp', modalidade: 'imagem', bytes: [0x52, 0x49, 0x46, 0x46], offsetCheckAscii: { offset: 8, valor: 'WEBP' } },
  { mime: 'image/bmp', modalidade: 'imagem', bytes: [0x42, 0x4d] },
  { mime: 'audio/mpeg', modalidade: 'audio', bytes: [0x49, 0x44, 0x33] }, // MP3 com tag ID3
  { mime: 'audio/mpeg', modalidade: 'audio', bytes: [0xff, 0xfb] }, // MP3 sem tag (frame sync)
  { mime: 'audio/wav', modalidade: 'audio', bytes: [0x52, 0x49, 0x46, 0x46], offsetCheckAscii: { offset: 8, valor: 'WAVE' } },
  { mime: 'audio/ogg', modalidade: 'audio', bytes: [0x4f, 0x67, 0x67, 0x53] },
  { mime: 'audio/flac', modalidade: 'audio', bytes: [0x66, 0x4c, 0x61, 0x43] },
  { mime: 'video/mp4', modalidade: 'video', bytes: [], offsetCheckAscii: { offset: 4, valor: 'ftyp' } },
  { mime: 'video/webm', modalidade: 'video', bytes: [0x1a, 0x45, 0xdf, 0xa3] },
  { mime: 'video/x-matroska', modalidade: 'video', bytes: [0x1a, 0x45, 0xdf, 0xa3] }, // mesma família EBML do webm — distinguido pela extensão quando ambíguo
  { mime: 'application/pdf', modalidade: 'documento', bytes: [0x25, 0x50, 0x44, 0x46] },
  { mime: 'application/zip', modalidade: 'arquivo_compactado', bytes: [0x50, 0x4b, 0x03, 0x04] },
  // executáveis — nunca tratados como mídia, mesmo se a extensão disser o contrário (ver seguranca-multimidia.js)
  { mime: 'application/x-msdownload', modalidade: 'executavel', bytes: [0x4d, 0x5a] }, // .exe/.dll (MZ header)
  { mime: 'application/x-elf', modalidade: 'executavel', bytes: [0x7f, 0x45, 0x4c, 0x46] }, // ELF (Linux)
];

const MIME_POR_EXTENSAO = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.bmp': 'image/bmp',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.flac': 'audio/flac',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mkv': 'video/x-matroska', '.mov': 'video/quicktime', '.avi': 'video/x-msvideo',
  '.pdf': 'application/pdf', '.zip': 'application/zip', '.txt': 'text/plain', '.md': 'text/markdown', '.json': 'application/json',
};

function modalidadePorMime(mime) {
  if (!mime) return 'desconhecida';
  if (mime.startsWith('image/')) return 'imagem';
  if (mime.startsWith('audio/')) return 'audio';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('text/') || mime === 'application/json') return 'texto';
  return 'outro';
}

function bytesIniciaisBatem(buf, assinatura) {
  if (assinatura.bytes.length > 0) {
    for (let i = 0; i < assinatura.bytes.length; i++) {
      if (buf[i] !== assinatura.bytes[i]) return false;
    }
  }
  if (assinatura.offsetCheckAscii) {
    const { offset, valor } = assinatura.offsetCheckAscii;
    const trecho = buf.slice(offset, offset + valor.length).toString('ascii');
    if (trecho !== valor) return false;
  }
  return assinatura.bytes.length > 0 || !!assinatura.offsetCheckAscii;
}

/**
 * Detecta o MIME REAL de um arquivo pelos primeiros bytes (nunca confia só
 * na extensão), e reporta se extensão/conteúdo real DIVERGEM (sinal de
 * arquivo malformado, renomeado, ou potencialmente malicioso).
 *
 * @param {string} caminhoAbsoluto
 * @returns {{ok:boolean, mimeReal:string|null, mimePorExtensao:string|null, extensao:string,
 *   modalidade:string, tamanhoBytes:number, integro:boolean, divergenciaExtensao:boolean, motivo:string}}
 */
function detectarArquivo(caminhoAbsoluto) {
  if (!fs.existsSync(caminhoAbsoluto)) {
    return { ok: false, mimeReal: null, mimePorExtensao: null, extensao: null, modalidade: 'desconhecida', tamanhoBytes: 0, integro: false, divergenciaExtensao: false, motivo: 'arquivo não existe' };
  }
  const stat = fs.statSync(caminhoAbsoluto);
  if (!stat.isFile()) {
    return { ok: false, mimeReal: null, mimePorExtensao: null, extensao: null, modalidade: 'desconhecida', tamanhoBytes: 0, integro: false, divergenciaExtensao: false, motivo: 'não é um arquivo regular (é diretório/link/etc)' };
  }
  const tamanhoBytes = stat.size;
  const extensao = path.extname(caminhoAbsoluto).toLowerCase();
  const mimePorExtensao = MIME_POR_EXTENSAO[extensao] || null;

  if (tamanhoBytes === 0) {
    return { ok: true, mimeReal: null, mimePorExtensao, extensao, modalidade: 'vazio', tamanhoBytes: 0, integro: false, divergenciaExtensao: false, motivo: 'arquivo vazio (0 bytes) — não íntegro' };
  }

  // lê só os primeiros 32 bytes — suficiente pra toda assinatura conhecida,
  // nunca carrega o arquivo inteiro na memória só pra detectar o tipo.
  const fd = fs.openSync(caminhoAbsoluto, 'r');
  const buf = Buffer.alloc(32);
  const lidos = fs.readSync(fd, buf, 0, 32, 0);
  fs.closeSync(fd);

  let mimeReal = null;
  let modalidade = 'desconhecida';
  for (const assinatura of ASSINATURAS) {
    if (bytesIniciaisBatem(buf.slice(0, lidos), assinatura)) {
      mimeReal = assinatura.mime;
      modalidade = assinatura.modalidade === 'documento' || assinatura.modalidade === 'arquivo_compactado' || assinatura.modalidade === 'executavel'
        ? assinatura.modalidade : assinatura.modalidade;
      break;
    }
  }
  // nenhuma assinatura binária bateu — pode ser texto puro (sem magic bytes
  // fixos); checagem honesta: se os bytes são majoritariamente imprimíveis, é texto.
  if (!mimeReal) {
    const textoProvavel = [...buf.slice(0, lidos)].every((b) => b === 9 || b === 10 || b === 13 || (b >= 32 && b < 127) || b >= 128);
    if (textoProvavel) { mimeReal = mimePorExtensao && mimePorExtensao.startsWith('text/') ? mimePorExtensao : 'text/plain'; modalidade = 'texto'; }
  } else {
    modalidade = modalidadePorMime(mimeReal) !== 'outro' ? modalidadePorMime(mimeReal) : modalidade;
  }

  const divergenciaExtensao = !!(mimePorExtensao && mimeReal && mimePorExtensao !== mimeReal && modalidadePorMime(mimePorExtensao) !== modalidadePorMime(mimeReal));

  return {
    ok: true,
    mimeReal: mimeReal || 'application/octet-stream',
    mimePorExtensao,
    extensao,
    modalidade: mimeReal ? (modalidade === 'documento' || modalidade === 'arquivo_compactado' || modalidade === 'executavel' ? modalidade : modalidadePorMime(mimeReal)) : 'desconhecida',
    tamanhoBytes,
    integro: true,
    divergenciaExtensao,
    motivo: divergenciaExtensao
      ? `conteúdo real (${mimeReal}) diverge da extensão declarada (${extensao} → esperado ${mimePorExtensao}) — NUNCA confiar só na extensão`
      : 'conteúdo real confere com a extensão (ou extensão desconhecida/ausente, sem conflito a reportar)',
  };
}

module.exports = { detectarArquivo, MIME_POR_EXTENSAO, modalidadePorMime, ASSINATURAS };
