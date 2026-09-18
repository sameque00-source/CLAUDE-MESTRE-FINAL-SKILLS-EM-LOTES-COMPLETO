/**
 * TAREFA / SUBTAREFA — schema padronizado (FASE 1, seções 5, 10 e 11 do pedido).
 *
 * Contexto reduzido por design (seção 10): cada tarefa carrega SÓ o que
 * precisa (objetivo, arquivos relevantes, dependências, resultado esperado) —
 * nunca o histórico inteiro da missão.
 *
 * Resultado padronizado (seção 11): STATUS, RESULTADO, ARQUIVOS, ERROS,
 * EVIDENCIAS, TESTES, RECOMENDACOES — pronto para alimentar outra subtarefa.
 */
const { novoId } = require('./Missao');

const STATUS = Object.freeze({
  PENDENTE: 'pendente',
  EM_PROGRESSO: 'em_progresso',
  BLOQUEADA: 'bloqueada',
  CONCLUIDA: 'concluida',
  ERRO: 'erro',
  // Adicionado na FASE 2 (Planejador/replanejamento, seção 13 do pedido):
  // uma tarefa nunca é apagada quando deixa de ser necessária — é marcada
  // obsoleta, preservando o histórico da missão.
  CANCELADA: 'cancelada',
});

/**
 * @param {object} opts
 * @param {string} opts.descricao
 * @param {string[]} [opts.dependeDe] - ids de outras tarefas
 * @param {string} [opts.tipo] - 'pesquisa'|'codigo'|'raciocinio'|'visao'|'consolidacao'|... (mesmo vocabulário do scoring.js, expansível)
 * @param {object} [opts.contexto] - { objetivo, arquivos: [], dependencias: [], resultadoEsperado }
 * @param {string} [opts.recursoExclusivo] - caminho/recurso que esta tarefa vai escrever (para detecção de conflito no paralelismo)
 * @param {string[]} [opts.ferramentas] - FASE 2: ferramentas estimadas necessárias (navegador, terminal, git, ...)
 * @param {string[]} [opts.criterioConclusao] - FASE 2: critérios verificáveis de término (nunca vazio de propósito — ver planejador/core/criterios.js)
 * @param {boolean} [opts.precisaPesquisa] - FASE 2: a tarefa depende de fato não confirmado
 * @param {string} [opts.justificativaPesquisa]
 * @param {boolean} [opts.decisaoUsuario] - FASE 2: true só quando é genuinamente uma preferência de negócio (PLAN MODE)
 * @param {string} [opts.motivoDecisaoUsuario]
 * @param {string} [opts.agenteFuncaoSugerida] - FASE 2: função sugerida pelo Planejador (ex: 'researcher') antes do Gerenciador de Agentes resolver o arquivo real
 */
function criarTarefa({
  descricao, dependeDe = [], tipo = 'texto', contexto = {}, recursoExclusivo = null,
  ferramentas = [], criterioConclusao = [], precisaPesquisa = false, justificativaPesquisa = null,
  decisaoUsuario = false, motivoDecisaoUsuario = null, agenteFuncaoSugerida = null,
} = {}) {
  if (!descricao || typeof descricao !== 'string' || !descricao.trim()) {
    throw new Error('criarTarefa: "descricao" é obrigatória');
  }
  const agora = new Date().toISOString();
  return {
    id: novoId('tarefa'),
    descricao: descricao.trim(),
    tipo,
    dependeDe: [...dependeDe],
    recursoExclusivo,
    status: STATUS.PENDENTE,
    agente: null,               // preenchido pelo Gerenciador de Agentes
    modelo: null,                // preenchido pelo Decisor
    // campos adicionados na FASE 2 (Planejador) — aditivos, não quebram nada da FASE 1
    ferramentas: [...ferramentas],
    criterioConclusao: [...criterioConclusao],
    precisaPesquisa,
    justificativaPesquisa,
    decisaoUsuario,
    motivoDecisaoUsuario,
    agenteFuncaoSugerida,
    contexto: {
      objetivo: contexto.objetivo || descricao,
      arquivos: contexto.arquivos || [],
      dependencias: contexto.dependencias || dependeDe,
      resultadoEsperado: contexto.resultadoEsperado || null,
    },
    resultado: null,             // preenchido ao concluir (ver criarResultado)
    tentativas: 0,
    criadaEm: agora,
    atualizadaEm: agora,
  };
}

/** Estrutura padronizada de resultado (seção 11 do pedido). */
function criarResultado({ status, resultado = null, arquivos = [], erros = [], evidencias = [], testes = [], recomendacoes = [] }) {
  if (!status) throw new Error('criarResultado: "status" é obrigatório');
  return { status, resultado, arquivos, erros, evidencias, testes, recomendacoes, ts: new Date().toISOString() };
}

function marcarStatus(tarefa, status) {
  tarefa.status = status;
  tarefa.atualizadaEm = new Date().toISOString();
}

module.exports = { STATUS, criarTarefa, criarResultado, marcarStatus };
