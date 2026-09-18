/**
 * REVISOR DE PLANO — FASE 2, seção 19 do pedido:
 * "PLANO AUTOMÁTICO → REVISÃO AUTOMÁTICA → DETECÇÃO DE LACUNAS → PLANO MELHORADO"
 *
 * Detecção de lacunas é DETERMINÍSTICA (regras auditáveis, sempre a mesma
 * saída pro mesmo plano — não depende de um LLM "achar" que está tudo bem).
 * Só quando há lacuna real é que uma chamada de LLM entra em cena, para
 * PROPOR as tarefas que preenchem a lacuna — nunca pra reescrever o plano
 * inteiro do zero.
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', '..', 'orquestrador');
const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
const { criarTarefa } = require(path.join(ORQ_DIR, 'core', 'Tarefa.js'));
const gerenciadorAgentes = require(path.join(ORQ_DIR, 'core', 'gerenciador-agentes.js'));
const { garantirCriteriosEmTodasAsTarefas } = require('./criterios');

const TIPOS_CODIGO = ['codigo', 'frontend', 'backend', 'devops'];
const TIPOS_VALIDACAO = ['teste', 'revisao'];

/**
 * Roda as regras de detecção de lacunas sobre uma missão já construída.
 * @returns {{ temLacuna: boolean, lacunas: string[] }}
 */
function detectarLacunas(missao) {
  const lacunas = [];
  const tipos = missao.subtarefas.map((t) => t.tipo);

  const temCodigo = tipos.some((t) => TIPOS_CODIGO.includes(t));
  const temValidacao = tipos.some((t) => TIPOS_VALIDACAO.includes(t));
  if (temCodigo && !temValidacao) {
    lacunas.push('há tarefas de implementação mas nenhuma de teste/revisão — plano não valida o próprio resultado');
  }

  const semCriterio = missao.subtarefas.filter((t) => !Array.isArray(t.criterioConclusao) || t.criterioConclusao.length === 0);
  if (semCriterio.length > 0) {
    lacunas.push(`${semCriterio.length} tarefa(s) sem critério de conclusão: ${semCriterio.map((t) => t.id).join(', ')}`);
  }

  const decisoesSemMotivo = missao.subtarefas.filter((t) => t.decisaoUsuario && !t.motivoDecisaoUsuario);
  if (decisoesSemMotivo.length > 0) {
    lacunas.push(`${decisoesSemMotivo.length} tarefa(s) marcam decisaoUsuario sem justificar o motivo`);
  }

  if (missao.subtarefas.length === 1 && missao.complexidade >= 3) {
    lacunas.push('missão marcada como complexa mas decomposta em apenas 1 tarefa — decomposição provavelmente rasa demais');
  }

  // campos de nível-plano exigidos pela seção 3 do pedido — variância real
  // observada em teste: o LLM às vezes devolve esses arrays vazios mesmo
  // com o schema pedindo. Não há correção automática nesta fase (exigiria
  // nova chamada de LLM só pra isso); o objetivo aqui é NUNCA esconder a
  // lacuna — fica registrada em plano.validacoes para quem for usar o plano.
  if (Array.isArray(missao.requisitos) && missao.requisitos.length === 0) {
    lacunas.push('plano sem "requisitos" preenchidos pelo LLM — campo obrigatório ficou vazio nesta geração');
  }
  if (Array.isArray(missao.entregaveis) && missao.entregaveis.length === 0) {
    lacunas.push('plano sem "entregaveis" preenchidos pelo LLM — campo obrigatório ficou vazio nesta geração');
  }
  if (Array.isArray(missao.criteriosSucesso) && missao.criteriosSucesso.length === 0) {
    lacunas.push('plano sem "criteriosSucesso" gerais preenchidos pelo LLM — campo obrigatório ficou vazio nesta geração');
  }

  const pesquisasSemJustificativa = missao.subtarefas.filter((t) => t.precisaPesquisa && !t.justificativaPesquisa);
  if (pesquisasSemJustificativa.length > 0) {
    lacunas.push(`${pesquisasSemJustificativa.length} tarefa(s) marcam precisaPesquisa sem justificar por quê`);
  }

  const orfasComRecursoDuplicado = new Map();
  for (const t of missao.subtarefas) {
    if (!t.recursoExclusivo) continue;
    orfasComRecursoDuplicado.set(t.recursoExclusivo, (orfasComRecursoDuplicado.get(t.recursoExclusivo) || 0) + 1);
  }

  return { temLacuna: lacunas.length > 0, lacunas };
}

/**
 * Corrige as lacunas que dá pra corrigir sem chamada de LLM (determinístico):
 * preenche critério faltante, remove decisaoUsuario sem motivo (rebaixa pra
 * false — regra "não perguntar sem necessidade real", seção 14/15).
 * Retorna o que foi corrigido.
 */
function corrigirLacunasDeterministicas(missao) {
  const corrigidas = [];
  for (const t of missao.subtarefas) {
    if (!Array.isArray(t.criterioConclusao) || t.criterioConclusao.length === 0) {
      garantirCriteriosEmTodasAsTarefas({ tarefas: [t] });
      corrigidas.push(`critério de conclusão preenchido para ${t.id}`);
    }
    if (t.decisaoUsuario && !t.motivoDecisaoUsuario) {
      t.decisaoUsuario = false;
      corrigidas.push(`decisaoUsuario de ${t.id} rebaixada para false (sem motivo real declarado — seção 14: só marcar quando genuinamente não houver como determinar sozinho)`);
    }
  }

  // recuperação determinística de campos de plano vazios (sem nova chamada
  // de LLM): deriva do que já existe no grafo real, em vez de deixar vazio.
  if (Array.isArray(missao.entregaveis) && missao.entregaveis.length === 0) {
    const derivados = [...new Set(missao.subtarefas.map((t) => t.recursoExclusivo).filter(Boolean))];
    if (derivados.length > 0) {
      missao.entregaveis = derivados;
      corrigidas.push(`entregaveis derivados dos recursos exclusivos declarados pelas tarefas: ${derivados.join(', ')}`);
    }
  }
  if (Array.isArray(missao.criteriosSucesso) && missao.criteriosSucesso.length === 0 && missao.subtarefas.length > 0) {
    missao.criteriosSucesso = ['todas as subtarefas concluídas com seus critérios individuais satisfeitos (derivado automaticamente — o LLM não gerou critério geral nesta rodada)'];
    corrigidas.push('critériosSucesso geral derivado automaticamente (fallback determinístico) a partir dos critérios individuais das tarefas');
  }

  return corrigidas;
}

/**
 * Preenche a lacuna "falta validação" adicionando uma tarefa de revisão que
 * depende de TODAS as tarefas de implementação atuais (sem chamada de LLM —
 * é um padrão estrutural, não precisa de "criatividade" do modelo).
 */
function adicionarTarefaDeValidacaoFaltante(missao) {
  const tarefasCodigo = missao.subtarefas.filter((t) => TIPOS_CODIGO.includes(t.tipo));
  if (tarefasCodigo.length === 0) return null;
  const revisorMeta = gerenciadorAgentes.getAgentePorFuncao('reviewer');
  const tarefaRevisao = criarTarefa({
    descricao: 'Revisar e validar o resultado das tarefas de implementação (adicionada automaticamente pelo Revisor de Plano — lacuna detectada: implementação sem validação)',
    tipo: 'revisao',
    criterioConclusao: ['aprovação ou reprovação explícita registrada', 'todas as tarefas de implementação foram cobertas pela revisão'],
  });
  if (revisorMeta) tarefaRevisao.agente = revisorMeta.arquivo;
  grafo.adicionarTarefa(missao, tarefaRevisao);
  for (const t of tarefasCodigo) {
    grafo.adicionarDependencia(missao, tarefaRevisao.id, t.id);
  }
  return tarefaRevisao;
}

/**
 * Ciclo completo pedido na seção 19: revisa, detecta lacunas, melhora.
 * @returns {{ lacunasEncontradas: string[], correcoes: string[], tarefaAdicionada: object|null }}
 */
function revisarEMelhorarPlano(missao) {
  const { lacunas } = detectarLacunas(missao);
  const correcoes = corrigirLacunasDeterministicas(missao);
  let tarefaAdicionada = null;
  if (lacunas.some((l) => l.includes('nenhuma de teste/revisão'))) {
    tarefaAdicionada = adicionarTarefaDeValidacaoFaltante(missao);
    if (tarefaAdicionada) correcoes.push(`tarefa de revisão adicionada (${tarefaAdicionada.id}), dependente de todas as tarefas de implementação`);
  }
  return { lacunasEncontradas: lacunas, correcoes, tarefaAdicionada };
}

module.exports = { detectarLacunas, corrigirLacunasDeterministicas, adicionarTarefaDeValidacaoFaltante, revisarEMelhorarPlano };
