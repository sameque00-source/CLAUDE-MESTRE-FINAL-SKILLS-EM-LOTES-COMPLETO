/**
 * REPLANEJADOR — FASE 2, seção 13 do pedido.
 *
 * PLANO INICIAL → EXECUÇÃO → NOVA INFORMAÇÃO → REPLANEJAR → ATUALIZAR DAG → CONTINUAR
 *
 * Regras duras (garantidas pelo código, não só pelo prompt):
 *   - NUNCA apaga uma tarefa já concluída (grafo.cancelarTarefa recusa).
 *   - Tarefa que deixa de ser necessária é CANCELADA, não removida.
 *   - Tarefa nova é ADICIONADA ao grafo existente, nunca substitui o plano inteiro.
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', '..', 'orquestrador');
const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
const { criarTarefa } = require(path.join(ORQ_DIR, 'core', 'Tarefa.js'));
const gerenciadorAgentes = require(path.join(ORQ_DIR, 'core', 'gerenciador-agentes.js'));
const { chamarLLM } = require('./chamar-llm');
const { extrairJSON } = require('./json-robusto');
const { garantirCriteriosEmTodasAsTarefas } = require('./criterios');

function montarPromptReplanejamento(missao, novaInformacao) {
  const tarefasAtuais = missao.subtarefas.map((t) => ({ id: t.id, descricao: t.descricao, status: t.status, tipo: t.tipo }));
  return `Você é o módulo Planejador de um agente de IA autônomo, em modo REPLANEJAMENTO. Uma missão já está em andamento e surgiu uma informação nova que pode mudar a estratégia.

TAREFAS ATUAIS DA MISSÃO (id, descrição, status, tipo):
${JSON.stringify(tarefasAtuais, null, 2)}

NOVA INFORMAÇÃO:
"${novaInformacao}"

REGRAS:
- Tarefas com status "concluida" NUNCA podem ser canceladas (o sistema recusaria de qualquer forma) — nem sugira isso.
- Se uma tarefa PENDENTE ou BLOQUEADA deixou de fazer sentido por causa da nova informação, coloque o id dela em tarefasParaCancelar com o motivo.
- Se a nova informação exige trabalho novo, adicione em novasTarefas. Para dependeDe, use IDS REAIS já existentes na lista acima quando a nova tarefa depende de uma tarefa já existente, ou um id local novo (ex: "n1") quando depende de outra tarefa nova que você também está propondo.
- Se a nova informação não muda nada de prático, devolva as duas listas vazias e explique por quê em resumoDaMudanca.

Responda APENAS com JSON válido, exatamente neste formato:
{
  "resumoDaMudanca": "explicação objetiva do que muda e por quê",
  "tarefasParaCancelar": [{"id": "id_real_existente", "motivo": "..."}],
  "novasTarefas": [
    {"id": "n1", "descricao": "...", "tipo": "codigo", "dependeDe": ["id_real_existente_ou_n2"], "criterioConclusao": ["..."], "agenteFuncao": "developer"}
  ]
}`;
}

/**
 * @param {object} missao - missão REAL (já em memória no Orquestrador)
 * @param {string} novaInformacao - o fato novo que motiva o replanejamento
 * @returns {Promise<{ok:boolean, resumo:string, canceladas:object[], adicionadas:object[], error?:string}>}
 */
async function replanejar(missao, novaInformacao) {
  const prompt = montarPromptReplanejamento(missao, novaInformacao);
  const resp = await chamarLLM(prompt, { tipoTarefa: 'raciocinio', complexidade: 2, maxTokens: 800 });
  if (!resp.ok) {
    return { ok: false, resumo: '', canceladas: [], adicionadas: [], error: resp.error };
  }
  const json = extrairJSON(resp.texto);
  if (!json) {
    return { ok: false, resumo: '', canceladas: [], adicionadas: [], error: `LLM não devolveu JSON válido: ${resp.texto.slice(0, 200)}` };
  }

  const canceladas = [];
  for (const c of json.tarefasParaCancelar || []) {
    try {
      const r = grafo.cancelarTarefa(missao, c.id, c.motivo || 'replanejamento');
      canceladas.push({ id: c.id, ...r });
    } catch (e) {
      canceladas.push({ id: c.id, cancelada: false, motivo: `erro: ${e.message}` });
    }
  }

  const mapaIds = new Map();
  const adicionadas = [];
  const novas = Array.isArray(json.novasTarefas) ? json.novasTarefas : [];

  // passo 1: cria sem dependência
  for (const t of novas) {
    if (!t.descricao) continue;
    const agenteMeta = t.agenteFuncao ? gerenciadorAgentes.getAgentePorFuncao(t.agenteFuncao) : null;
    const nova = criarTarefa({
      descricao: t.descricao,
      tipo: t.tipo || 'texto',
      criterioConclusao: Array.isArray(t.criterioConclusao) ? t.criterioConclusao : [],
      agenteFuncaoSugerida: t.agenteFuncao || null,
    });
    if (agenteMeta) nova.agente = agenteMeta.arquivo;
    garantirCriteriosEmTodasAsTarefas({ tarefas: [nova] });
    grafo.adicionarTarefa(missao, nova);
    mapaIds.set(t.id, nova.id);
    adicionadas.push(nova);
  }
  // passo 2: aplica dependências (ids reais existentes OU novos locais)
  for (const t of novas) {
    const idReal = mapaIds.get(t.id);
    if (!idReal) continue;
    for (const dep of t.dependeDe || []) {
      const depReal = mapaIds.has(dep) ? mapaIds.get(dep) : dep; // dep pode já ser um id real existente
      if (!grafo.porId(missao, depReal)) continue; // dependência inexistente é ignorada, não derruba o replanejamento
      try { grafo.adicionarDependencia(missao, idReal, depReal); } catch { /* ciclo ou inválida — ignora essa aresta específica */ }
    }
  }

  missao.replanejamentos = missao.replanejamentos || [];
  missao.replanejamentos.push({ novaInformacao, resumo: json.resumoDaMudanca, ts: new Date().toISOString(), canceladas: canceladas.length, adicionadas: adicionadas.length });

  return { ok: true, resumo: json.resumoDaMudanca || '', canceladas, adicionadas };
}

module.exports = { replanejar, montarPromptReplanejamento };
