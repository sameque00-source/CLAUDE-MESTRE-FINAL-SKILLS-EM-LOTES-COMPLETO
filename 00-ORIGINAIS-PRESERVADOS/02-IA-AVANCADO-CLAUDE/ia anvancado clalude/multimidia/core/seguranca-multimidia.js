/**
 * SEGURANÇA MULTIMÍDIA — FASE 9, seção "Segurança multimídia".
 *
 * Reaproveita `executor/core/workspace.js:resolverCaminhoSeguro` para o
 * bloqueio de path traversal (não duplica essa lógica) — este módulo
 * ADICIONA as verificações específicas de mídia que o workspace genérico
 * não faz: tamanho máximo, formato perigoso disfarçado, e MIME real vs.
 * extensão (usa `deteccao.js`, seção "Detecção de arquivos").
 */
const path = require('path');
const { detectarArquivo } = require('./deteccao');

const TAMANHO_MAXIMO_BYTES = 25 * 1024 * 1024; // 25MB — generoso pra imagem/áudio curto, bloqueia vídeo longo/arquivo anômalo

// extensões cuja EXECUÇÃO seria perigosa, mesmo que disfarçadas de mídia —
// nunca processadas como se fossem um arquivo de mídia legítimo.
const EXTENSOES_PERIGOSAS = new Set([
  '.exe', '.dll', '.bat', '.cmd', '.sh', '.ps1', '.vbs', '.js', '.msi', '.scr', '.com', '.jar', '.app',
]);

/**
 * @param {string} missaoId
 * @param {string} caminhoRelativo
 * @param {function} resolverCaminhoSeguro - injeta `workspace.resolverCaminhoSeguro` (ou o equivalente de projeto) — nunca duplica a checagem de path traversal, só a REUSA
 * @returns {{ok:boolean, caminhoAbsoluto:string|null, motivo:string, deteccao:object|null}}
 */
function validarArquivoMultimidia(missaoId, caminhoRelativo, resolverCaminhoSeguro) {
  let caminhoAbsoluto;
  try {
    caminhoAbsoluto = resolverCaminhoSeguro(missaoId, caminhoRelativo);
  } catch (e) {
    return { ok: false, caminhoAbsoluto: null, motivo: `bloqueado (path traversal ou caminho inválido): ${e.message}`, deteccao: null };
  }

  const extensao = path.extname(caminhoRelativo).toLowerCase();
  if (EXTENSOES_PERIGOSAS.has(extensao)) {
    return { ok: false, caminhoAbsoluto, motivo: `extensão "${extensao}" é potencialmente executável — nunca processada como mídia`, deteccao: null };
  }

  const deteccao = detectarArquivo(caminhoAbsoluto);
  if (!deteccao.ok) {
    return { ok: false, caminhoAbsoluto, motivo: `arquivo inválido: ${deteccao.motivo}`, deteccao };
  }
  if (deteccao.modalidade === 'executavel') {
    return { ok: false, caminhoAbsoluto, motivo: `conteúdo real do arquivo é um executável (assinatura ${deteccao.mimeReal}), mesmo que a extensão diga o contrário — bloqueado`, deteccao };
  }
  if (deteccao.tamanhoBytes > TAMANHO_MAXIMO_BYTES) {
    return { ok: false, caminhoAbsoluto, motivo: `arquivo excede o limite de segurança (${deteccao.tamanhoBytes} bytes > ${TAMANHO_MAXIMO_BYTES} bytes)`, deteccao };
  }
  if (deteccao.modalidade === 'vazio') {
    return { ok: false, caminhoAbsoluto, motivo: 'arquivo vazio — nada a processar', deteccao };
  }

  return { ok: true, caminhoAbsoluto, motivo: deteccao.divergenciaExtensao ? `[ATENÇÃO] ${deteccao.motivo} — aceito mas sinalizado` : 'arquivo válido e seguro para processamento', deteccao };
}

module.exports = { validarArquivoMultimidia, TAMANHO_MAXIMO_BYTES, EXTENSOES_PERIGOSAS };
