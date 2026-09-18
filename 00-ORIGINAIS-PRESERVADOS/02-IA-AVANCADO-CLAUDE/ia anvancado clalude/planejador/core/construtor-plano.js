/**
 * CONSTRUTOR DE PLANO — traduz o JSON decomposto pelo LLM em uma Missão
 * real da FASE 1 (via Orquestrador), reaproveitando 100% do grafo de
 * tarefas, máquina de estados e persistência já existentes. Não duplica
 * nenhuma dessas estruturas.
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', '..', 'orquestrador');
const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
const gerenciadorAgentes = require(path.join(ORQ_DIR, 'core', 'gerenciador-agentes.js'));
const { garantirCriteriosEmTodasAsTarefas } = require('./criterios');
const { classificarComplexidade } = require('./classificador-complexidade');

/**
 * Constrói o grafo de tarefas real dentro de `missao` (já criada pelo
 * Orquestrador) a partir do `planoJSON` decomposto pelo LLM.
 *
 * Estratégia em 2 passos (necessária porque o grafo real valida que toda
 * dependência já existe no momento em que é declarada — os ids locais
 * t1/t2/... do LLM não existem ainda na missão):
 *   1. cria todas as tarefas SEM dependências, guarda localId → tarefaReal.id
 *   2. aplica as dependências reais (grafo.adicionarDependencia, que já
 *      detecta ciclo e marca BLOQUEADA)
 *
 * @returns {{ missao: object, mapaIds: Map<string,string>, avisos: string[] }}
 */
function construirGrafoNaMissao(missao, planoJSON) {
  garantirCriteriosEmTodasAsTarefas(planoJSON); // seção 12: nunca sem critério
  const avisos = [];
  const mapaIds = new Map();
  const tarefasEntrada = Array.isArray(planoJSON.tarefas) ? planoJSON.tarefas : [];

  const { criarTarefa } = require(path.join(ORQ_DIR, 'core', 'Tarefa.js'));

  // passo 1: criar todas sem dependência ainda
  for (const t of tarefasEntrada) {
    if (!t.descricao) { avisos.push(`tarefa "${t.id}" sem descrição — ignorada`); continue; }
    const agenteMeta = t.agenteFuncao ? gerenciadorAgentes.getAgentePorFuncao(t.agenteFuncao) : null;
    if (t.agenteFuncao && !agenteMeta) {
      avisos.push(`função de agente "${t.agenteFuncao}" pedida pela tarefa "${t.id}" não tem agente correspondente na base curada (gap conhecido) — seguindo sem agente designado`);
    }
    const tarefaReal = criarTarefa({
      descricao: t.descricao,
      tipo: t.tipo || 'texto',
      contexto: { objetivo: t.descricao, resultadoEsperado: (t.criterioConclusao || [])[0] || null },
      recursoExclusivo: t.recursoExclusivo || null,
      ferramentas: Array.isArray(t.ferramentas) ? t.ferramentas : [],
      criterioConclusao: Array.isArray(t.criterioConclusao) ? t.criterioConclusao : [],
      precisaPesquisa: !!t.precisaPesquisa,
      justificativaPesquisa: t.justificativaPesquisa || null,
      decisaoUsuario: !!t.decisaoUsuario,
      motivoDecisaoUsuario: t.motivoDecisaoUsuario || null,
      agenteFuncaoSugerida: t.agenteFuncao || null,
    });
    if (agenteMeta) tarefaReal.agente = agenteMeta.arquivo;
    grafo.adicionarTarefa(missao, tarefaReal);
    mapaIds.set(t.id, tarefaReal.id);
  }

  // passo 2: aplicar dependências reais, traduzindo ids locais → reais
  for (const t of tarefasEntrada) {
    const idReal = mapaIds.get(t.id);
    if (!idReal) continue;
    for (const depLocal of t.dependeDe || []) {
      const depReal = mapaIds.get(depLocal);
      if (!depReal) { avisos.push(`tarefa "${t.id}" declara dependência de "${depLocal}", que não existe no plano — ignorada`); continue; }
      try {
        grafo.adicionarDependencia(missao, idReal, depReal);
      } catch (e) {
        avisos.push(`dependência "${t.id}"→"${depLocal}" rejeitada: ${e.message}`);
      }
    }
  }

  return { missao, mapaIds, avisos };
}

/**
 * Monta o objeto PLANO final (todos os campos pedidos na seção 3) a partir
 * do JSON do LLM + da missão real já construída + classificação determinística.
 */
function montarPlanoFinal(objetivo, planoJSON, missao, avisos, modeloUsado) {
  const classificacao = classificarComplexidade(planoJSON);
  const tarefasIndependentes = missao.subtarefas.filter((t) => t.dependeDe.length === 0).map((t) => t.id);
  const agentesRecomendados = [...new Set(missao.subtarefas.map((t) => t.agente).filter(Boolean))];
  const ferramentasRecomendadas = [...new Set(missao.subtarefas.flatMap((t) => t.ferramentas || []))];
  const decisoesPendentes = missao.subtarefas
    .filter((t) => t.decisaoUsuario)
    .map((t) => ({ tarefaId: t.id, descricao: t.descricao, motivo: t.motivoDecisaoUsuario }));

  return {
    objetivo,
    interpretacao: planoJSON.interpretacao || null,
    // preferimos missao.requisitos/entregaveis/criteriosSucesso porque o
    // Revisor (seção 19) pode ter corrigido/derivado esses campos depois da
    // decomposição original do LLM — ver revisor-plano.js
    requisitos: missao.requisitos || planoJSON.requisitos || [],
    restricoes: planoJSON.restricoes || [],
    entregaveis: missao.entregaveis || planoJSON.entregaveis || [],
    subtarefas: missao.subtarefas.map((t) => t.id),
    dependencias: missao.dependencias,
    tarefasIndependentes,
    agentesRecomendados,
    ferramentasRecomendadas,
    modalidade: planoJSON.modalidade || ['texto'],
    complexidade: classificacao,
    criteriosSucesso: missao.criteriosSucesso || planoJSON.criteriosSucessoGeral || [],
    riscos: planoJSON.riscos || [],
    validacoes: avisos,
    decisoesPendentes,
    missaoId: missao.id,
    modeloUsadoNoPlanejamento: modeloUsado,
    geradoEm: new Date().toISOString(),
  };
}

module.exports = { construirGrafoNaMissao, montarPlanoFinal };
