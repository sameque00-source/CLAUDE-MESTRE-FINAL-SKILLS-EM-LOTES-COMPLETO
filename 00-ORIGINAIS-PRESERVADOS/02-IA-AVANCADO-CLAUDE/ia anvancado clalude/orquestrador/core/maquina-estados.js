/**
 * MÁQUINA DE ESTADOS — Orquestrador Central (FASE 1)
 *
 * Estados exigidos pela missão (não inventados, não simplificados):
 *   RECEBIDA → ANALISANDO → PLANEJANDO → AGUARDANDO_DEPENDENCIA → EXECUTANDO
 *   → TESTANDO → CORRIGINDO → REVISANDO → CONCLUIDA
 *   (com saídas para BLOQUEADA e FALHA a partir de quase qualquer estado)
 *
 * Princípio central exigido pelo pedido: "Nunca considerar uma missão
 * concluída somente porque um modelo respondeu." — por isso CONCLUIDA só é
 * alcançável a partir de REVISANDO (nunca direto de EXECUTANDO), e TESTANDO
 * é obrigatório entre EXECUTANDO e REVISANDO.
 */

const ESTADOS = Object.freeze({
  RECEBIDA: 'RECEBIDA',
  ANALISANDO: 'ANALISANDO',
  PLANEJANDO: 'PLANEJANDO',
  AGUARDANDO_DEPENDENCIA: 'AGUARDANDO_DEPENDENCIA',
  EXECUTANDO: 'EXECUTANDO',
  TESTANDO: 'TESTANDO',
  CORRIGINDO: 'CORRIGINDO',
  REVISANDO: 'REVISANDO',
  CONCLUIDA: 'CONCLUIDA',
  BLOQUEADA: 'BLOQUEADA',
  FALHA: 'FALHA',
});

// Tabela de transições permitidas. Qualquer transição fora desta tabela
// lança erro — a máquina de estados é a autoridade, não uma sugestão.
const TRANSICOES = {
  [ESTADOS.RECEBIDA]: [ESTADOS.ANALISANDO, ESTADOS.FALHA],
  [ESTADOS.ANALISANDO]: [ESTADOS.PLANEJANDO, ESTADOS.BLOQUEADA, ESTADOS.FALHA],
  [ESTADOS.PLANEJANDO]: [ESTADOS.AGUARDANDO_DEPENDENCIA, ESTADOS.EXECUTANDO, ESTADOS.BLOQUEADA, ESTADOS.FALHA],
  [ESTADOS.AGUARDANDO_DEPENDENCIA]: [ESTADOS.EXECUTANDO, ESTADOS.BLOQUEADA, ESTADOS.FALHA],
  [ESTADOS.EXECUTANDO]: [ESTADOS.TESTANDO, ESTADOS.AGUARDANDO_DEPENDENCIA, ESTADOS.BLOQUEADA, ESTADOS.FALHA],
  [ESTADOS.TESTANDO]: [ESTADOS.REVISANDO, ESTADOS.CORRIGINDO, ESTADOS.FALHA],
  [ESTADOS.CORRIGINDO]: [ESTADOS.EXECUTANDO, ESTADOS.TESTANDO, ESTADOS.BLOQUEADA, ESTADOS.FALHA],
  [ESTADOS.REVISANDO]: [ESTADOS.CONCLUIDA, ESTADOS.CORRIGINDO, ESTADOS.PLANEJANDO, ESTADOS.FALHA],
  [ESTADOS.CONCLUIDA]: [],           // estado terminal
  [ESTADOS.BLOQUEADA]: [ESTADOS.ANALISANDO, ESTADOS.AGUARDANDO_DEPENDENCIA, ESTADOS.EXECUTANDO, ESTADOS.FALHA],
  [ESTADOS.FALHA]: [ESTADOS.ANALISANDO, ESTADOS.CORRIGINDO], // falha pode ser reaberta por decisão explícita
};

class TransicaoInvalidaError extends Error {
  constructor(de, para) {
    super(`Transição inválida: ${de} → ${para}. Permitidas a partir de ${de}: [${(TRANSICOES[de] || []).join(', ') || 'nenhuma (estado terminal)'}]`);
    this.name = 'TransicaoInvalidaError';
    this.de = de;
    this.para = para;
  }
}

/** Valida e aplica uma transição. Lança TransicaoInvalidaError se inválida. */
function transicionar(missao, novoEstado, motivo = '') {
  const atual = missao.estado;
  if (!ESTADOS[novoEstado]) {
    throw new Error(`Estado desconhecido: ${novoEstado}`);
  }
  const permitidas = TRANSICOES[atual] || [];
  if (!permitidas.includes(novoEstado)) {
    throw new TransicaoInvalidaError(atual, novoEstado);
  }
  const registro = { de: atual, para: novoEstado, motivo, ts: new Date().toISOString() };
  missao.estado = novoEstado;
  missao.historicoEstados = missao.historicoEstados || [];
  missao.historicoEstados.push(registro);
  return registro;
}

function ehEstadoTerminal(estado) {
  return estado === ESTADOS.CONCLUIDA; // FALHA e BLOQUEADA são reversíveis por design
}

module.exports = { ESTADOS, TRANSICOES, transicionar, ehEstadoTerminal, TransicaoInvalidaError };
