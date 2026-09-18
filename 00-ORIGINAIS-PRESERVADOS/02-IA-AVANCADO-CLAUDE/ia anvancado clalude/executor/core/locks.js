/**
 * LOCKS — FASE 3, seção 4/8 do pedido (gerenciamento de recursos, controle
 * de conflitos).
 *
 * Defesa em profundidade: o `paralelismo.js` da FASE 1 já evita despachar
 * duas tarefas com o MESMO `recursoExclusivo` na mesma leva (nível
 * declarativo, decidido pelo Planejador). Este módulo é a segunda camada,
 * em runtime: mesmo que uma tarefa não tenha declarado `recursoExclusivo`
 * mas acabe escrevendo num arquivo que outra tarefa da mesma leva também
 * toca, o lock real impede a escrita simultânea — nunca corrompe o mesmo
 * arquivo por corrida entre duas tarefas paralelas.
 */

const locksAtivos = new Map(); // recurso(string) -> { tarefaId, desde }

/**
 * Tenta adquirir o lock. Retorna true se conseguiu, false se já está
 * ocupado por outra tarefa (nunca lança — quem chama decide o que fazer:
 * esperar, pular, ou falhar a tarefa).
 */
function adquirir(recurso, tarefaId) {
  const atual = locksAtivos.get(recurso);
  if (atual && atual.tarefaId !== tarefaId) return false;
  locksAtivos.set(recurso, { tarefaId, desde: Date.now() });
  return true;
}

function liberar(recurso, tarefaId) {
  const atual = locksAtivos.get(recurso);
  if (atual && atual.tarefaId === tarefaId) locksAtivos.delete(recurso);
}

function liberarTodosDaTarefa(tarefaId) {
  for (const [recurso, info] of locksAtivos) {
    if (info.tarefaId === tarefaId) locksAtivos.delete(recurso);
  }
}

function estaTravado(recurso) {
  return locksAtivos.has(recurso);
}

function quemSegura(recurso) {
  const info = locksAtivos.get(recurso);
  return info ? info.tarefaId : null;
}

module.exports = { adquirir, liberar, liberarTodosDaTarefa, estaTravado, quemSegura };
