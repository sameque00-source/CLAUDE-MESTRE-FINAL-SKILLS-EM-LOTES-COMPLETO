/**
 * PESQUISA ADAPTATIVA — FASE 5, seção 2 do pedido.
 * A pesquisa não roda uma quantidade fixa de buscas. Determina profundidade
 * a partir de sinais reais (mesma filosofia do classificador de
 * complexidade determinístico da FASE 2 — auditável, não "achismo" de LLM).
 */

/**
 * @param {object} opts
 * @param {number} [opts.complexidade] - 0-4, da missão/tarefa
 * @param {boolean} [opts.controversa] - a pergunta é sabidamente sujeita a opinião/divergência
 * @param {boolean} [opts.informacaoRecente] - exige dado atual (versão, preço, notícia)
 * @param {number} [opts.confiancaAtual] - 0-1, confiança já obtida por uma primeira rodada (para pesquisa incremental)
 * @returns {{ numFontesAlvo:number, ampliarSeDivergente:boolean, priorizarRecencia:boolean, motivo:string }}
 */
function determinarProfundidade({ complexidade = 2, controversa = false, informacaoRecente = false, confiancaAtual = null } = {}) {
  let numFontesAlvo = 1;
  const motivos = [];

  if (complexidade <= 1) {
    numFontesAlvo = 1;
    motivos.push('pergunta simples — 1 fonte é suficiente');
  } else if (complexidade <= 3) {
    numFontesAlvo = 2;
    motivos.push('questão técnica normal — 2 fontes para reduzir risco de erro isolado');
  } else {
    numFontesAlvo = 3;
    motivos.push('questão complexa — 3 fontes para maior confiança');
  }

  if (controversa) {
    numFontesAlvo = Math.max(numFontesAlvo, 3);
    motivos.push('questão controversa — pesquisa ampliada');
  }

  if (confiancaAtual !== null && confiancaAtual < 0.5) {
    numFontesAlvo += 1;
    motivos.push(`confiança atual baixa (${confiancaAtual}) — 1 fonte adicional`);
  }

  return {
    numFontesAlvo: Math.min(numFontesAlvo, 5), // teto real — nunca pesquisa infinitamente
    ampliarSeDivergente: true,
    priorizarRecencia: !!informacaoRecente,
    motivo: motivos.join('; '),
  };
}

module.exports = { determinarProfundidade };
