/**
 * VALIDAÇÃO DE RESULTADO MULTIMÍDIA — FASE 9, seção "Validação".
 *
 * "Não considerar sucesso apenas porque um comando terminou com código 0":
 * confirma que o arquivo de saída REALMENTE existe, tem o FORMATO correto
 * (via detecção real de assinatura, não extensão), tem TAMANHO > 0, e —
 * quando um mínimo é conhecido — que o conteúdo não é um artefato vazio
 * disfarçado de sucesso (ex: ffmpeg criou o arquivo mas com 0 frames úteis).
 */
const { detectarArquivo } = require('./deteccao');

/**
 * @param {object} esperado
 * @param {string} esperado.caminhoAbsoluto
 * @param {'imagem'|'audio'|'video'|'texto'} [esperado.modalidadeEsperada]
 * @param {number} [esperado.tamanhoMinimoBytes=1]
 * @returns {{ok:boolean, motivo:string, deteccao:object|null}}
 */
function validarResultadoProcessamento({ caminhoAbsoluto, modalidadeEsperada = null, tamanhoMinimoBytes = 1 }) {
  const deteccao = detectarArquivo(caminhoAbsoluto);
  if (!deteccao.ok) {
    return { ok: false, motivo: `arquivo de saída não existe ou é inválido: ${deteccao.motivo} — comando pode ter retornado código 0 sem produzir nada real`, deteccao };
  }
  if (deteccao.tamanhoBytes < tamanhoMinimoBytes) {
    return { ok: false, motivo: `arquivo de saída existe mas é menor que o mínimo esperado (${deteccao.tamanhoBytes} < ${tamanhoMinimoBytes} bytes) — provável artefato vazio/corrompido`, deteccao };
  }
  if (modalidadeEsperada && deteccao.modalidade !== modalidadeEsperada) {
    return { ok: false, motivo: `modalidade real do arquivo de saída (${deteccao.modalidade}) não é a esperada (${modalidadeEsperada}) — conteúdo não confere com o que foi pedido`, deteccao };
  }
  return { ok: true, motivo: `validado: existe, ${deteccao.tamanhoBytes} bytes, modalidade=${deteccao.modalidade}, mime=${deteccao.mimeReal}`, deteccao };
}

module.exports = { validarResultadoProcessamento };
