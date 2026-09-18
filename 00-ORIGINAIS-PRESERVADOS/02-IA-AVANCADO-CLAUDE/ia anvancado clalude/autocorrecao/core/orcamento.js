/**
 * ORÇAMENTO DE CORREÇÃO — FASE 8, seção "Limite de tentativas" do pedido.
 *
 * Custo monetário é SEMPRE R$0 nesta arquitetura (só providers gratuitos —
 * ver `orquestrador/core/decisor.js`, filtro `free === true && requires_card
 * !== true`) — por isso não há uma dimensão de "custo em reais" pra
 * rastrear de verdade; o orçamento real que existe é TEMPO, TENTATIVAS e
 * CHAMADAS, e é isso que este módulo controla.
 */
const PADRAO = Object.freeze({
  maxTentativas: 3,
  maxTempoMs: 3 * 60 * 1000, // 3 minutos por tarefa — generoso o bastante para retries reais de LLM gratuito, sem deixar uma tarefa travada pra sempre
  maxChamadas: 8,
});

function criarOrcamento(opcoes = {}) {
  return {
    ...PADRAO,
    ...opcoes,
    tentativas: 0,
    chamadas: 0,
    inicioMs: Date.now(),
    custoReais: 0, // sempre 0 — nunca há chamada paga nesta arquitetura (documentado, não apenas assumido)
  };
}

function registrarTentativa(orcamento) {
  orcamento.tentativas += 1;
  return orcamento;
}

function registrarChamada(orcamento) {
  orcamento.chamadas += 1;
  return orcamento;
}

/** @returns {{dentro:boolean, motivo:string|null}} */
function dentroDoOrcamento(orcamento) {
  if (orcamento.tentativas >= orcamento.maxTentativas) {
    return { dentro: false, motivo: `orçamento esgotado: ${orcamento.tentativas}/${orcamento.maxTentativas} tentativas` };
  }
  const decorridoMs = Date.now() - orcamento.inicioMs;
  if (decorridoMs >= orcamento.maxTempoMs) {
    return { dentro: false, motivo: `orçamento esgotado: ${decorridoMs}ms/${orcamento.maxTempoMs}ms de tempo` };
  }
  if (orcamento.chamadas >= orcamento.maxChamadas) {
    return { dentro: false, motivo: `orçamento esgotado: ${orcamento.chamadas}/${orcamento.maxChamadas} chamadas` };
  }
  return { dentro: true, motivo: null };
}

module.exports = { PADRAO, criarOrcamento, registrarTentativa, registrarChamada, dentroDoOrcamento };
