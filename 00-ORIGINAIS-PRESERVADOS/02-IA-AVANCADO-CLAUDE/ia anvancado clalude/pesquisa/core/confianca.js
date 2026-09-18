/**
 * CONFIANÇA DE EVIDÊNCIA — base determinística usada pela pesquisa.
 * Considera: qualidade da fonte, presença de data, quantidade de fontes
 * concordantes. Nunca finge certeza absoluta (teto real abaixo de 1.0
 * mesmo no melhor caso, seção 18).
 */
const { classificarFonte } = require('./classificador-fonte');

/** @returns {number} 0 a 0.97 — nunca 1.0 absoluto, mesmo pra documentação oficial */
function confiancaDeItem(item) {
  const fonte = classificarFonte(item.url, item.origem);
  let c = fonte.peso * 0.8; // teto por fonte única
  if (item.data) c += 0.08; // ter data real de verificação aumenta confiança
  return Math.min(Number(c.toFixed(2)), 0.97);
}

/** Confiança agregada após triangulação — concordância entre fontes eleva, contradição reduz. */
function confiancaAgregada(itensComConfianca, situacaoTriangulacao) {
  if (itensComConfianca.length === 0) return 0;
  const media = itensComConfianca.reduce((s, i) => s + i.confianca, 0) / itensComConfianca.length;
  if (situacaoTriangulacao === 'concordancia' && itensComConfianca.length > 1) return Math.min(media + 0.1, 0.97);
  if (situacaoTriangulacao === 'contradicao') return Math.min(media * 0.5, 0.5); // nunca "confiante" quando há contradição real
  return media;
}

module.exports = { confiancaDeItem, confiancaAgregada };
