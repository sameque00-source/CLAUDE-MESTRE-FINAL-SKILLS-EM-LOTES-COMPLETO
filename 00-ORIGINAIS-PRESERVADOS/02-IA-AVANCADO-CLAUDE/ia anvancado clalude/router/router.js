/**
 * ROUTER — FASE 7 (PLANO-MESTRE-AGENTE-9ROUTER.md, módulo "Roteamento
 * Inteligente"), entry point único.
 *
 * NÃO reimplementa o que já existe e já funciona:
 * - seleção de modelo/provider real → `orquestrador/core/decisor.js`
 *   (que por sua vez usa `gateway/scoring.js`, aptidão/saúde/latência/
 *   contexto/prioridade, com circuit breaker real);
 * - seleção de agente/ferramentas → `agentes/core/registro-especialistas.js`;
 * - classificação de erro de execução → `executor/core/classificador-falha.js`.
 *
 * O que este módulo ADICIONA (novo nesta fase):
 * - `decidirModelo`: mesma decisão do `decisor.js`, com um AJUSTE pequeno,
 *   gradual e explicável vindo do histórico real de execuções
 *   (`router/core/aprendizado.js`);
 * - `avaliarEntrada`: estima o tamanho da entrada ANTES de escolher o
 *   modelo, decidindo dividir/resumir/paralelizar em vez de truncar
 *   (`router/core/estimador-contexto.js`);
 * - `classificarFalha`: distingue quota/timeout/resposta-vazia/rede/
 *   contexto-grande/ferramenta-indisponível/modelo-incompatível
 *   (`router/core/classificador-roteamento.js`);
 * - `composicaoDaMissao`/`sugerirComposicao`: torna explícita e testável a
 *   composição multiagente já emergente da decomposição do Planejador
 *   (`router/core/composicao-agentes.js`) — nunca obriga pipeline fixo.
 */
const estimadorContexto = require('./core/estimador-contexto');
const aprendizado = require('./core/aprendizado');
const classificadorRoteamento = require('./core/classificador-roteamento');
const composicaoAgentes = require('./core/composicao-agentes');
const path = require('path');
const decisor = require(path.join(__dirname, '..', 'orquestrador', 'core', 'decisor.js'));

const LIMIAR_PROMOCAO_POSITIVO = 0.075; // ajuste mínimo positivo pra considerar "divergência forte"
const LIMIAR_DEMOCAO_NEGATIVO = -0.05;   // ajuste negativo do 1º colocado que abre espaço pra promoção

/**
 * Decisão de modelo/provider — decisor.js real + ajuste de aprendizado
 * (FASE 7). Nunca reescreve o ranking inteiro: só examina os top-5 já
 * ordenados pelo score real, e só promove um candidato de trás pra frente
 * quando o histórico diverge FORTEMENTE do score estático (nunca por ruído
 * de 1-2 amostras — ver `MIN_AMOSTRAS_PARA_AJUSTE` em aprendizado.js).
 *
 * @param {object} req - mesmos campos de `decisor.decidirModelo` + `agente` (chave do especialista, para a chave de aprendizado)
 */
function decidirModelo(req = {}) {
  const base = decisor.decidirModelo(req);
  if (!base.escolhido) return { ...base, ajustes: [] };

  const top = base.ordemFallback.slice(0, 5);
  const ajustes = top.map((m) => ({
    modeloId: m.id,
    provider: m.provider,
    ...aprendizado.ajustePorHistorico({ tarefaTipo: req.tipoTarefa, agente: req.agente, modeloId: m.id, provider: m.provider }),
  }));

  let escolhido = top[0];
  let motivoAjuste = 'sem ajuste de aprendizado (histórico insuficiente ou sem divergência forte o bastante para superar o score real)';
  const primeiro = ajustes[0];
  if (primeiro.ajuste <= LIMIAR_DEMOCAO_NEGATIVO) {
    const alternativa = ajustes.slice(1).find((a) => a.ajuste >= LIMIAR_PROMOCAO_POSITIVO);
    if (alternativa) {
      escolhido = top.find((m) => m.id === alternativa.modeloId);
      motivoAjuste = `aprendizado promoveu "${alternativa.modeloId}" à frente de "${primeiro.modeloId}" — ${alternativa.motivo} (1º colocado pelo score real: ${primeiro.motivo})`;
    }
  }

  return {
    escolhido, ordemFallback: base.ordemFallback,
    motivo: `${base.motivo}; ${motivoAjuste}`,
    ajustes,
  };
}

/**
 * Estima o tamanho da entrada e decide a estratégia ANTES da chamada —
 * nunca trunca cegamente (ver `router/core/estimador-contexto.js`).
 * @param {string[]} partesDaEntrada - textos que compõem a entrada (contrato, arquivos, contexto de dependências, etc.)
 * @param {object} modeloCandidato - candidato escolhido por `decidirModelo` (usa `context_window`)
 * @param {object} [opcoes]
 */
function avaliarEntrada(partesDaEntrada = [], modeloCandidato = null, opcoes = {}) {
  const estTokens = estimadorContexto.estimarTokens(...partesDaEntrada);
  const janela = (modeloCandidato && modeloCandidato.context_window) || 32000;
  const avaliacao = estimadorContexto.avaliarContexto(estTokens, janela, opcoes);
  return { estTokens, janela, ...avaliacao };
}

/** Registra o resultado real de uma execução para o aprendizado (FASE 7). */
function registrarResultado(dados) {
  return aprendizado.registrarExecucao(dados);
}

/** Classifica falha de nível ROTEAMENTO (provider/modelo) — distingue tipos, nunca trata tudo igual. */
function classificarFalha(mensagem, contexto) {
  return classificadorRoteamento.classificarFalhaRoteamento(mensagem, contexto);
}

/** Composição real (a partir do plano já decomposto) e sugestão leve (a partir só do objetivo). */
function composicaoDaMissao(subtarefas) {
  return composicaoAgentes.composicaoReal(subtarefas);
}
function sugerirComposicao(objetivo) {
  return composicaoAgentes.sugerirComposicaoPorObjetivo(objetivo);
}

module.exports = {
  decidirModelo, avaliarEntrada, registrarResultado, classificarFalha,
  composicaoDaMissao, sugerirComposicao,
  CATEGORIAS_FALHA: classificadorRoteamento.CATEGORIAS,
  vaFallback: classificadorRoteamento.vaFallback,
};
