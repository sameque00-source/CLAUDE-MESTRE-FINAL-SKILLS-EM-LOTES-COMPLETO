/**
 * Mapa tipo-de-tarefa → função de especialista padrão (FASE 4, usado quando
 * o Planejador não sugeriu explicitamente `agenteFuncaoSugerida`).
 *
 * Extraído para um módulo próprio na FASE 7 (evita dependência circular:
 * `router/core/composicao-agentes.js` e `executor/core/handlers-tarefa.js`
 * precisam do mesmo mapa, e handlers-tarefa.js agora também consulta o
 * router — um exigiria o outro em ciclo se este mapa continuasse vivendo
 * dentro de handlers-tarefa.js). Valor idêntico ao original, sem alteração
 * de comportamento.
 */
const ESPECIALISTA_PADRAO_POR_TIPO = {
  pesquisa: 'research', arquitetura: 'architecture', codigo: 'coding', frontend: 'frontend',
  backend: 'backend', devops: 'devops', teste: 'testing', qa: 'testing', revisao: 'reviewer',
  security: 'security', documentacao: 'docs', consolidacao: 'coordinator', raciocinio: 'coding',
};

module.exports = { ESPECIALISTA_PADRAO_POR_TIPO };
