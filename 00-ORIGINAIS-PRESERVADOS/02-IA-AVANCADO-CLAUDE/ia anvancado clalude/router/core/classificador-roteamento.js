/**
 * CLASSIFICADOR DE FALHA DE ROTEAMENTO — FASE 7, seção "Roteamento com
 * falhas" do pedido: "não tratar todos como o mesmo erro".
 *
 * Estende `gateway/scoring.js:classificarErro` (que já cobre quota/
 * rate_limit/auth/payload/indisponivel/timeout/vazio, read-only, não
 * duplicado aqui) com as categorias que o pedido pede explicitamente e que o
 * scoring do Gateway não distingue: erro de REDE (indisponibilidade de
 * conexão, diferente de "o provider respondeu com erro"), CONTEXTO GRANDE
 * (estourou a janela do modelo — distinto de "payload" genérico do HTTP) e
 * MODELO INCOMPATÍVEL (o modelo escolhido não suporta o que a tarefa pede —
 * ex: tools=true pedido a um modelo tools=false, hoje isso já é filtrado
 * ANTES da chamada pelo `decisor.js`, mas pode acontecer de fato se o
 * catálogo estiver desatualizado em relação ao provider real).
 */
const scoring = require('C:/Users/Administrator/Documents/AI-ORCHESTRATOR/gateway/scoring.js');

const CATEGORIAS = Object.freeze({
  QUOTA: 'quota',
  RATE_LIMIT: 'rate_limit',
  AUTH: 'auth',
  TIMEOUT: 'timeout',
  RESPOSTA_VAZIA: 'resposta_vazia',
  ERRO_REDE: 'erro_rede',
  CONTEXTO_GRANDE: 'contexto_grande',
  FERRAMENTA_INDISPONIVEL: 'ferramenta_indisponivel',
  MODELO_INCOMPATIVEL: 'modelo_incompativel',
  INDISPONIVEL: 'indisponivel', // 503/sobrecarga temporária do provider
  DESCONHECIDO: 'desconhecido',
});

/**
 * @param {string} mensagem - texto do erro
 * @param {object} [contexto]
 * @param {boolean} [contexto.estourouContexto] - já se sabe (calculado por estimador-contexto ANTES da chamada) que a entrada não cabia
 * @param {boolean} [contexto.ferramentaAusente] - a tarefa pedia uma ferramenta que o modelo/provider não tem
 */
function classificarFalhaRoteamento(mensagem = '', contexto = {}) {
  const m = String(mensagem || '');
  if (contexto.estourouContexto) return CATEGORIAS.CONTEXTO_GRANDE;
  if (contexto.ferramentaAusente) return CATEGORIAS.FERRAMENTA_INDISPONIVEL;

  // erro de REDE: falha de conexão de verdade, nunca uma resposta HTTP do
  // provider (isso é "indisponivel"/"timeout", já coberto pelo scoring).
  if (/ECONNREFUSED|ECONNRESET|ENOTFOUND|EAI_AGAIN|ETIMEDOUT.*connect|network.?error|fetch failed|getaddrinfo/i.test(m)) {
    return CATEGORIAS.ERRO_REDE;
  }
  // modelo incompatível: o provider recusou por incompatibilidade estrutural
  // (não por cota/auth), ex: "model does not support tools/function calling",
  // "model not found", "unsupported modality".
  if (/does not support|model not found|unsupported (modality|model)|invalid model/i.test(m)) {
    return CATEGORIAS.MODELO_INCOMPATIVEL;
  }
  if (/resposta vazia/i.test(m)) return CATEGORIAS.RESPOSTA_VAZIA;
  if (/context.?length|context.?window|maximum context|too many tokens/i.test(m)) return CATEGORIAS.CONTEXTO_GRANDE;

  // delega o resto pro classificador real já validado do Gateway (não duplica lógica)
  const tipoGateway = scoring.classificarErro(m);
  if (tipoGateway === 'vazio') return CATEGORIAS.RESPOSTA_VAZIA;
  if (Object.values(CATEGORIAS).includes(tipoGateway)) return tipoGateway;
  return CATEGORIAS.DESCONHECIDO;
}

/** Decide se, após esta falha, faz sentido tentar o PRÓXIMO candidato (fallback) ou não adianta tentar mais nenhum agora. */
function vaFallback(categoria) {
  // auth/modelo_incompativel/ferramenta_indisponivel do PRÓPRIO candidato não
  // se resolvem tentando o mesmo candidato de novo, mas outro candidato pode
  // muito bem servir — fallback sempre faz sentido, exceto contexto_grande
  // (nenhum modelo vai "caber" se o problema é o TAMANHO da entrada, não o
  // modelo escolhido — ali a estratégia certa é dividir/resumir, não trocar de modelo).
  return categoria !== CATEGORIAS.CONTEXTO_GRANDE;
}

module.exports = { CATEGORIAS, classificarFalhaRoteamento, vaFallback };
