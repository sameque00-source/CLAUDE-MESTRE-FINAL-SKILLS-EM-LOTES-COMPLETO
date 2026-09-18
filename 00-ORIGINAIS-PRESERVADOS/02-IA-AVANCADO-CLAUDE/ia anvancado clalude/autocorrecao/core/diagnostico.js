/**
 * DIAGNÓSTICO DE FALHAS — FASE 8, seção "Diagnóstico de falhas" do pedido.
 *
 * Categorias EXATAS pedidas (10, nenhuma inventada além dessas): erro de
 * código, configuração, dependência, ferramenta, ambiente, planejamento,
 * modelo, contexto, pesquisa, validação.
 *
 * Não reimplementa classificação já existente — compõe as duas que já
 * existem (execução: `executor/core/classificador-falha.js`; roteamento:
 * `router/core/classificador-roteamento.js`) e mapeia o resultado delas
 * para este vocabulário mais amplo de DIAGNÓSTICO (que cobre falhas em
 * QUALQUER estágio do pipeline — planejamento, pesquisa, validação —, não
 * só execução de código).
 */
const path = require('path');
const { classificarFalhaExecucao, TIPOS: TIPOS_EXECUCAO } = require(path.join(__dirname, '..', '..', 'executor', 'core', 'classificador-falha.js'));
const { classificarFalhaRoteamento, CATEGORIAS: CATEGORIAS_ROTEAMENTO } = require(path.join(__dirname, '..', '..', 'router', 'core', 'classificador-roteamento.js'));

const CATEGORIAS = Object.freeze({
  CODIGO: 'erro_codigo',
  CONFIGURACAO: 'erro_configuracao',
  DEPENDENCIA: 'erro_dependencia',
  FERRAMENTA: 'erro_ferramenta',
  AMBIENTE: 'erro_ambiente',
  PLANEJAMENTO: 'erro_planejamento',
  MODELO: 'erro_modelo',
  CONTEXTO: 'erro_contexto',
  PESQUISA: 'erro_pesquisa',
  VALIDACAO: 'erro_validacao',
});

/**
 * @param {string} mensagem
 * @param {object} [contexto]
 * @param {'planejamento'|'execucao'|'pesquisa'|'validacao'|'roteamento'} [contexto.fase] - estágio do pipeline onde a falha ocorreu, quando conhecido (evita ambiguidade — ex: "resposta vazia" na fase de planejamento é erro_planejamento, na fase de geração de código é erro_modelo)
 * @param {boolean} [contexto.estourouContexto]
 * @param {boolean} [contexto.ferramentaAusente]
 * @param {string} [contexto.stderr]
 * @param {number|null} [contexto.codigoSaida]
 * @returns {{categoria:string, causaProvavel:string, origem:string}}
 */
function diagnosticar(mensagem = '', contexto = {}) {
  const m = String(mensagem || '');

  // sinais explícitos de fase têm prioridade — evita reclassificar errado
  // uma mensagem genérica ("resposta vazia") que na verdade aconteceu numa
  // fase específica do pipeline.
  if (contexto.fase === 'planejamento' || /planejamento falhou/i.test(m)) {
    return { categoria: CATEGORIAS.PLANEJAMENTO, causaProvavel: 'o Planejador não conseguiu produzir um plano executável (LLM indisponível, resposta malformada, ou objetivo não decomponível)', origem: 'diagnostico:planejamento' };
  }
  if (contexto.fase === 'pesquisa' || /pesquisa indispon[ií]vel/i.test(m)) {
    return { categoria: CATEGORIAS.PESQUISA, causaProvavel: 'nenhum provider de pesquisa gratuito encontrou fonte real para a query', origem: 'diagnostico:pesquisa' };
  }
  if (contexto.fase === 'validacao' || /^veto:/i.test(m)) {
    return { categoria: CATEGORIAS.VALIDACAO, causaProvavel: 'QA/Security/Reviewer reprovou o resultado produzido — falha de qualidade/segurança, não de execução', origem: 'diagnostico:validacao' };
  }
  if (/config(?:uração|uracao)?\s+(inv[aá]lida|ausente|faltando)|\.env\b.*(ausente|inv[aá]lido)|missing config|invalid configuration/i.test(m)) {
    return { categoria: CATEGORIAS.CONFIGURACAO, causaProvavel: 'configuração de ambiente/projeto ausente ou inválida', origem: 'diagnostico:configuracao' };
  }

  // roteamento (provider/modelo) — contexto_grande e modelo_incompatível são
  // explícitos aqui; os demais (quota/timeout/rede/etc.) caem em erro_modelo,
  // porque do ponto de vista de QUEM PEDE a correção, todos são "o provedor
  // não entregou", e a estratégia de correção é a mesma (trocar candidato).
  const catRoteamento = classificarFalhaRoteamento(m, contexto);
  if (catRoteamento === CATEGORIAS_ROTEAMENTO.CONTEXTO_GRANDE) {
    return { categoria: CATEGORIAS.CONTEXTO, causaProvavel: 'entrada estimada maior que a janela de contexto de qualquer candidato disponível', origem: 'diagnostico:roteamento' };
  }
  if (catRoteamento === CATEGORIAS_ROTEAMENTO.FERRAMENTA_INDISPONIVEL) {
    return { categoria: CATEGORIAS.FERRAMENTA, causaProvavel: 'ferramenta necessária não disponível para o modelo/provider escolhido', origem: 'diagnostico:roteamento' };
  }
  if ([CATEGORIAS_ROTEAMENTO.QUOTA, CATEGORIAS_ROTEAMENTO.RATE_LIMIT, CATEGORIAS_ROTEAMENTO.AUTH, CATEGORIAS_ROTEAMENTO.TIMEOUT, CATEGORIAS_ROTEAMENTO.RESPOSTA_VAZIA, CATEGORIAS_ROTEAMENTO.ERRO_REDE, CATEGORIAS_ROTEAMENTO.MODELO_INCOMPATIVEL, CATEGORIAS_ROTEAMENTO.INDISPONIVEL].includes(catRoteamento)) {
    return { categoria: CATEGORIAS.MODELO, causaProvavel: `provider/modelo não entregou resposta utilizável (${catRoteamento})`, origem: 'diagnostico:roteamento' };
  }

  // execução (código/ambiente/dependência/ferramenta/teste)
  const catExecucao = classificarFalhaExecucao(m, { stderr: contexto.stderr, codigoSaida: contexto.codigoSaida });
  const mapaExecucao = {
    [TIPOS_EXECUCAO.CODIGO]: CATEGORIAS.CODIGO,
    [TIPOS_EXECUCAO.TESTE]: CATEGORIAS.CODIGO, // teste falhando aponta pro código, não pra um novo tipo de erro
    [TIPOS_EXECUCAO.AMBIENTE]: CATEGORIAS.AMBIENTE,
    [TIPOS_EXECUCAO.DEPENDENCIA]: CATEGORIAS.DEPENDENCIA,
    [TIPOS_EXECUCAO.FERRAMENTA]: CATEGORIAS.FERRAMENTA,
    [TIPOS_EXECUCAO.TIMEOUT]: CATEGORIAS.MODELO,
    [TIPOS_EXECUCAO.PROVIDER]: CATEGORIAS.MODELO,
    [TIPOS_EXECUCAO.VETO]: CATEGORIAS.VALIDACAO,
  };
  if (mapaExecucao[catExecucao]) {
    return { categoria: mapaExecucao[catExecucao], causaProvavel: `falha de execução classificada como "${catExecucao}"`, origem: 'diagnostico:execucao' };
  }

  // fallback honesto: não force uma categoria específica quando não há sinal
  // real — erro_codigo é o destino mais comum estatisticamente (a maioria
  // das falhas sem padrão reconhecido são bug de implementação), mas isso é
  // uma heurística explícita, não uma certeza.
  return { categoria: CATEGORIAS.CODIGO, causaProvavel: 'nenhum padrão reconhecido — assumindo falha de implementação por ser a causa mais comum estatisticamente (heurística, não certeza)', origem: 'diagnostico:fallback' };
}

module.exports = { CATEGORIAS, diagnosticar };
