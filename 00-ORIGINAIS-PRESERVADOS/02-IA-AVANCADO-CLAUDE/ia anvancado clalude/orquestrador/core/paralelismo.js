/**
 * PARALELISMO — FASE 1, seção 6 do pedido.
 *
 * Regras aplicadas (não paralelismo irrestrito):
 *   1. Só tarefas PRONTAS (grafo-tarefas.tarefasProntas) entram na leva.
 *   2. Duas tarefas que declaram o mesmo `recursoExclusivo` NUNCA rodam juntas
 *      na mesma leva — a segunda fica pra próxima leva (mesmo estando "pronta"
 *      pelo grafo). Isso é o "registrar propriedade/lock" pedido.
 *   3. Resultados preservam a ORDEM da lista de entrada, não a ordem de
 *      término (Promise.all já garante isso — documentado explicitamente
 *      aqui porque é um requisito funcional, não um acidente de implementação).
 */
const { tarefasProntas, porId } = require('./grafo-tarefas');
const { STATUS, marcarStatus } = require('./Tarefa');

/**
 * Filtra tarefasProntas em duas listas: as que podem rodar JÁ (sem conflito
 * de recurso entre si) e as que precisam esperar a próxima leva.
 */
function separarPorConflitoDeRecurso(prontas) {
  const podeRodarAgora = [];
  const adiadas = [];
  const recursosNestaLeva = new Set();
  for (const t of prontas) {
    if (t.recursoExclusivo && recursosNestaLeva.has(t.recursoExclusivo)) {
      adiadas.push(t);
      continue;
    }
    if (t.recursoExclusivo) recursosNestaLeva.add(t.recursoExclusivo);
    podeRodarAgora.push(t);
  }
  return { podeRodarAgora, adiadas };
}

/**
 * Executa UMA leva de tarefas prontas em paralelo, chamando `executorFn(tarefa, missao)`
 * para cada uma. `executorFn` deve devolver uma Promise<resultadoPadronizado>
 * (ver Tarefa.criarResultado). Marca status em_progresso antes e
 * concluida/erro depois, na própria tarefa.
 *
 * Retorna { executadas: Tarefa[], adiadasPorConflito: Tarefa[] } — na MESMA
 * ordem em que entraram (garantido por Promise.all sobre um array mapeado).
 */
async function executarLevaParalela(missao, executorFn) {
  const prontas = tarefasProntas(missao);
  if (prontas.length === 0) return { executadas: [], adiadasPorConflito: [] };

  const { podeRodarAgora, adiadas } = separarPorConflitoDeRecurso(prontas);

  for (const t of podeRodarAgora) marcarStatus(t, STATUS.EM_PROGRESSO);

  // Promise.allSettled: uma tarefa falhando não derruba as outras da mesma leva
  // (a missão inteira não morre por causa de 1 subtarefa — seção 12 do pedido)
  const settled = await Promise.allSettled(
    podeRodarAgora.map((t) => Promise.resolve(executorFn(t, missao)))
  );

  settled.forEach((res, i) => {
    const tarefa = podeRodarAgora[i];
    if (res.status === 'fulfilled') {
      tarefa.resultado = res.value;
      marcarStatus(tarefa, res.value && res.value.status === 'erro' ? STATUS.ERRO : STATUS.CONCLUIDA);
    } else {
      tarefa.resultado = { status: 'erro', resultado: null, arquivos: [], erros: [String(res.reason && res.reason.message || res.reason)], evidencias: [], testes: [], recomendacoes: [], ts: new Date().toISOString() };
      marcarStatus(tarefa, STATUS.ERRO);
    }
  });

  return { executadas: podeRodarAgora, adiadasPorConflito: adiadas };
}

/**
 * Roda a missão inteira em levas sucessivas até não haver mais tarefas
 * prontas (fica bloqueada esperando dependência ou termina). Não é um loop
 * infinito: para se uma leva não produzir progresso (proteção contra travar).
 */
async function executarAteBloquearOuTerminar(missao, executorFn, { maxLevas = 50 } = {}) {
  const levas = [];
  for (let i = 0; i < maxLevas; i++) {
    const antes = missao.subtarefas.filter((t) => t.status === STATUS.CONCLUIDA || t.status === STATUS.ERRO).length;
    const leva = await executarLevaParalela(missao, executorFn);
    levas.push(leva);
    if (leva.executadas.length === 0) break; // nada mais pronto agora
    const depois = missao.subtarefas.filter((t) => t.status === STATUS.CONCLUIDA || t.status === STATUS.ERRO).length;
    if (depois === antes) break; // proteção: sem progresso real, evita loop
  }
  return levas;
}

module.exports = { executarLevaParalela, executarAteBloquearOuTerminar, separarPorConflitoDeRecurso };
