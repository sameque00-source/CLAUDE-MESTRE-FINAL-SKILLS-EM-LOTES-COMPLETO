/**
 * GRAFO DE TAREFAS (DAG) — FASE 1, seção 5 do pedido.
 *
 * Opera sobre missao.subtarefas (array de Tarefa). Não duplica estado — lê e
 * escreve diretamente no array da missão, para que o grafo nunca fique
 * dessincronizado do MISSION_STATE persistido.
 */
const { STATUS } = require('./Tarefa');

class DependenciaCiclicaError extends Error {
  constructor(caminho) {
    super(`Dependência cíclica detectada: ${caminho.join(' → ')}`);
    this.name = 'DependenciaCiclicaError';
    this.caminho = caminho;
  }
}

class DependenciaInexistenteError extends Error {
  constructor(tarefaId, depId) {
    super(`Tarefa "${tarefaId}" depende de "${depId}", que não existe na missão`);
    this.name = 'DependenciaInexistenteError';
  }
}

function porId(missao, id) {
  return missao.subtarefas.find((t) => t.id === id) || null;
}

/** Detecta ciclo via DFS a partir de uma tarefa, considerando uma aresta hipotética extra. */
function existeCaminho(missao, origemId, destinoId, visitados = new Set()) {
  if (origemId === destinoId) return true;
  if (visitados.has(origemId)) return false;
  visitados.add(origemId);
  const t = porId(missao, origemId);
  if (!t) return false;
  for (const depId of t.dependeDe) {
    if (existeCaminho(missao, depId, destinoId, visitados)) return true;
  }
  return false;
}

function adicionarTarefa(missao, tarefa) {
  for (const depId of tarefa.dependeDe) {
    if (!porId(missao, depId)) throw new DependenciaInexistenteError(tarefa.id, depId);
  }
  missao.subtarefas.push(tarefa);
  return tarefa;
}

/**
 * Adiciona dependência "tarefaId depende de dependeDeId" a uma tarefa já
 * existente na missão. Rejeita se criar ciclo.
 */
function adicionarDependencia(missao, tarefaId, dependeDeId) {
  const tarefa = porId(missao, tarefaId);
  const dep = porId(missao, dependeDeId);
  if (!tarefa) throw new Error(`Tarefa "${tarefaId}" não existe na missão`);
  if (!dep) throw new DependenciaInexistenteError(tarefaId, dependeDeId);
  if (tarefa.dependeDe.includes(dependeDeId)) return tarefa; // idempotente

  // se já existe caminho de dependeDeId até tarefaId, adicionar a aresta
  // tarefaId->dependeDeId fecharia um ciclo
  if (existeCaminho(missao, dependeDeId, tarefaId)) {
    throw new DependenciaCiclicaError([tarefaId, dependeDeId]);
  }
  tarefa.dependeDe.push(dependeDeId);
  missao.dependencias.push({ de: tarefaId, para: dependeDeId });
  tarefa.status = STATUS.BLOQUEADA;
  return tarefa;
}

/**
 * Uma tarefa está pronta quando está pendente/bloqueada e todas as deps
 * estão resolvidas — CONCLUIDA (fez o trabalho) OU CANCELADA (FASE 2:
 * deixou de ser necessária no replanejamento, não deve travar quem dependia
 * dela para sempre).
 */
function tarefaEstaPronta(missao, tarefa) {
  if (tarefa.status !== STATUS.PENDENTE && tarefa.status !== STATUS.BLOQUEADA) return false;
  return tarefa.dependeDe.every((depId) => {
    const dep = porId(missao, depId);
    return dep && (dep.status === STATUS.CONCLUIDA || dep.status === STATUS.CANCELADA);
  });
}

/** Lista todas as tarefas prontas para execução AGORA (sem dependência pendente). */
function tarefasProntas(missao) {
  return missao.subtarefas.filter((t) => tarefaEstaPronta(missao, t));
}

/** Lista tarefas ainda bloqueadas (têm ao menos 1 dependência não concluída). */
function tarefasBloqueadas(missao) {
  return missao.subtarefas.filter((t) => {
    if (t.status === STATUS.CONCLUIDA || t.status === STATUS.ERRO) return false;
    return t.dependeDe.some((depId) => {
      const dep = porId(missao, depId);
      return !dep || dep.status !== STATUS.CONCLUIDA;
    });
  });
}

/** true se a missão inteira já concluiu (ou cancelou, FASE 2) todas as subtarefas. */
function missaoCompleta(missao) {
  return missao.subtarefas.length > 0 && missao.subtarefas.every((t) => t.status === STATUS.CONCLUIDA || t.status === STATUS.CANCELADA);
}

/**
 * Marca uma tarefa como CANCELADA (FASE 2 — replanejamento, seção 13 do
 * pedido: "se uma tarefa deixar de ser necessária, marcar como
 * cancelada/obsoleta", nunca apagar). NUNCA cancela uma tarefa já
 * CONCLUIDA — histórico de trabalho real feito é preservado sempre.
 * Cascateia para dependentes que ficariam sem NENHUMA dependência viva
 * (todas as deps dela canceladas) — decisão conservadora: se a tarefa
 * dependente ainda tem outra dependência não cancelada, ela é preservada
 * (só fica bloqueada esperando a dependência restante, como já era).
 */
function cancelarTarefa(missao, tarefaId, motivo = null) {
  const tarefa = porId(missao, tarefaId);
  if (!tarefa) throw new Error(`cancelarTarefa: tarefa "${tarefaId}" não existe na missão`);
  if (tarefa.status === STATUS.CONCLUIDA) {
    return { cancelada: false, motivo: 'tarefa já concluída — trabalho real preservado, não pode ser cancelada', cascata: [] };
  }
  if (tarefa.status === STATUS.CANCELADA) {
    return { cancelada: true, motivo: 'já estava cancelada', cascata: [] };
  }
  tarefa.status = STATUS.CANCELADA;
  tarefa.motivoCancelamento = motivo;
  tarefa.atualizadaEm = new Date().toISOString();

  const cascata = [tarefaId];
  const dependentes = missao.subtarefas.filter(
    (x) => x.dependeDe.includes(tarefaId) && (x.status === STATUS.PENDENTE || x.status === STATUS.BLOQUEADA)
  );
  for (const dep of dependentes) {
    const aindaTemDependenciaViva = dep.dependeDe
      .filter((id) => id !== tarefaId)
      .some((id) => {
        const o = porId(missao, id);
        return o && o.status !== STATUS.CANCELADA;
      });
    if (!aindaTemDependenciaViva) {
      const r = cancelarTarefa(missao, dep.id, `cascata: dependia de "${tarefaId}", que foi cancelada`);
      if (r.cascata) cascata.push(...r.cascata);
    }
  }
  return { cancelada: true, motivo, cascata };
}

/** true se a missão está travada: nenhuma pronta, nenhuma em progresso, e ainda há pendentes/bloqueadas. */
function missaoTravada(missao) {
  const pendentesOuBloqueadas = missao.subtarefas.filter((t) => t.status === STATUS.PENDENTE || t.status === STATUS.BLOQUEADA);
  const emProgresso = missao.subtarefas.some((t) => t.status === STATUS.EM_PROGRESSO);
  return pendentesOuBloqueadas.length > 0 && !emProgresso && tarefasProntas(missao).length === 0;
}

/**
 * Reabre uma tarefa JÁ CONCLUÍDA para nova execução — FASE 4, seção 12/13:
 * veto de QA/Security/Reviewer manda o trabalho de volta pra quem produziu,
 * não apaga o histórico, só permite tentar de novo. Diferente de
 * `cancelarTarefa` (que é definitivo): aqui a tarefa volta a ser elegível
 * pra rodar, preservando `tentativas` (conta pro limite de retry) e
 * anexando o motivo do veto em `motivoReabertura` pra alimentar a próxima
 * geração com o problema real encontrado.
 */
function reabrirTarefa(missao, tarefaId, motivoReabertura) {
  const tarefa = porId(missao, tarefaId);
  if (!tarefa) throw new Error(`reabrirTarefa: tarefa "${tarefaId}" não existe na missão`);
  if (tarefa.status === STATUS.CANCELADA) {
    return { reaberta: false, motivo: 'tarefa já estava cancelada — não faz sentido reabrir' };
  }
  tarefa.status = STATUS.PENDENTE;
  tarefa.motivoReabertura = motivoReabertura || null;
  tarefa.atualizadaEm = new Date().toISOString();
  return { reaberta: true };
}

module.exports = {
  porId, adicionarTarefa, adicionarDependencia, tarefaEstaPronta, tarefasProntas,
  tarefasBloqueadas, missaoCompleta, missaoTravada, existeCaminho, cancelarTarefa, reabrirTarefa,
  DependenciaCiclicaError, DependenciaInexistenteError,
};
