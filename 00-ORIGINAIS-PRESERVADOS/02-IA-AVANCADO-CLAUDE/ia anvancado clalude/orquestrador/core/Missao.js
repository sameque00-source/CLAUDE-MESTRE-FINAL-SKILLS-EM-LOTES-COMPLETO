/**
 * MISSAO — schema central do Orquestrador (FASE 1).
 * Todos os campos exigidos pela missão (seção 3 do pedido) estão presentes.
 */
const { ESTADOS } = require('./maquina-estados');

let contador = 0;
function novoId(prefixo) {
  contador += 1;
  return `${prefixo}_${Date.now().toString(36)}_${contador.toString(36)}`;
}

/**
 * @param {object} opts
 * @param {string} opts.objetivo - objetivo em linguagem natural
 * @param {object} [opts.contexto] - contexto adicional (arquivos, preferências conhecidas)
 * @param {'baixa'|'media'|'alta'} [opts.prioridade]
 * @param {0|1|2|3|4} [opts.complexidade] - mesma escala 0-4 do classifier do Gateway
 */
function criarMissao({ objetivo, contexto = {}, prioridade = 'media', complexidade = 2 } = {}) {
  if (!objetivo || typeof objetivo !== 'string' || !objetivo.trim()) {
    throw new Error('criarMissao: "objetivo" é obrigatório e precisa ser uma string não vazia');
  }
  const agora = new Date().toISOString();
  return {
    id: novoId('missao'),
    objetivo: objetivo.trim(),
    contexto,
    prioridade,
    complexidade,
    estado: ESTADOS.RECEBIDA,
    historicoEstados: [{ de: null, para: ESTADOS.RECEBIDA, motivo: 'criação', ts: agora }],
    subtarefas: [],              // array de Tarefa (ver Tarefa.js)
    dependencias: [],            // array de {de, para} — de depende de "para" (redundante com Tarefa.dependeDe, mantido para consulta rápida no nível da missão)
    agentes: [],                 // agentes designados até agora (nomes)
    modelos: [],                 // modelos usados até agora (ids do catálogo)
    ferramentas: [],             // ferramentas habilitadas até agora
    resultados: [],              // resultados consolidados por subtarefa concluída
    testes: [],                  // { subtarefaId, oQue, resultado, evidencia, ts }
    erros: [],                   // { subtarefaId, erro, tipo, ts, tentativas }
    correcoes: [],               // { erroRef, diagnostico, correcao, resultado, ts }
    progresso: 0,                // 0-1, calculado por concluídas/total
    proximaAcao: 'analisar objetivo',
    estadoFinal: null,           // preenchido só quando CONCLUIDA/FALHA terminal
    criadaEm: agora,
    atualizadaEm: agora,
  };
}

function tocarMissao(missao) {
  missao.atualizadaEm = new Date().toISOString();
}

function recalcularProgresso(missao) {
  const total = missao.subtarefas.length;
  if (total === 0) { missao.progresso = 0; return 0; }
  const concluidas = missao.subtarefas.filter((t) => t.status === 'concluida').length;
  missao.progresso = Number((concluidas / total).toFixed(3));
  return missao.progresso;
}

module.exports = { criarMissao, tocarMissao, recalcularProgresso, novoId };
