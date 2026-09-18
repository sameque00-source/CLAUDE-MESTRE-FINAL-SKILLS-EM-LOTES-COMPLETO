/**
 * APRENDIZADO DO ROUTER — FASE 7, seção "Aprendizado do router" do pedido.
 *
 * Usa a MEMÓRIA já construída na FASE 6 (não cria um armazenamento
 * paralelo). Registra, por combinação `tarefaTipo + agente + modelo +
 * provider`, o resultado real de cada execução — e usa esse histórico para
 * aplicar um AJUSTE PEQUENO E ADITIVO sobre o score já calculado pelo
 * `gateway/scoring.js` (FASE 1), nunca reescreve o ranking inteiro.
 *
 * "Não criar aprendizado perigoso que altere tudo automaticamente sem
 * controle" (pedido): por isso o ajuste é:
 *   - pequeno (teto de ±0.15 sobre uma escala de score que já vai a ~1.5);
 *   - gradual (baseado em taxa de sucesso das últimas N execuções, não em
 *     uma única amostra);
 *   - explicável (o motivo da decisão sempre cita o ajuste aplicado);
 *   - reversível (é só um número recalculado a cada consulta a partir dos
 *     registros de memória — nunca sobrescreve o score real do Gateway,
 *     nunca muta o catálogo, nunca é aplicado sem histórico suficiente).
 */
const path = require('path');
const memoria = require(path.join(__dirname, '..', '..', 'memoria', 'memoria.js'));

const MIN_AMOSTRAS_PARA_AJUSTE = 3; // menos que isso, ajuste é ruído — não aplica
const AJUSTE_MAXIMO = 0.15;

function chaveCombinacao({ tarefaTipo, agente, modeloId, provider }) {
  return `${tarefaTipo || '?'}::${agente || '?'}::${modeloId || '?'}::${provider || '?'}`;
}

/**
 * Registra o resultado real de UMA execução para a combinação
 * tarefa+agente+modelo+provider. Chamado depois que o resultado é conhecido
 * (sucesso/falha, duração, se precisou correção, se usou fallback).
 */
function registrarExecucao({ tarefaTipo, agente, modeloId, provider, sucesso, duracaoMs, correcoes = 0, fallbackUsado = false, missaoId = null }) {
  if (!modeloId) return { ok: false, motivo: 'sem modeloId — nada a registrar' };
  const chave = chaveCombinacao({ tarefaTipo, agente, modeloId, provider });
  return memoria.gravar({
    tipo: 'agente', // reaproveita o tipo já existente (FASE 6) "desempenho de um especialista" — não inventa tipo novo
    conteudo: `execução real: tarefaTipo=${tarefaTipo} agente=${agente} modelo=${modeloId} provider=${provider} sucesso=${sucesso} duracaoMs=${duracaoMs} correcoes=${correcoes} fallback=${fallbackUsado}`,
    origem: 'router-aprendizado',
    tags: ['router-aprendizado', chave, tarefaTipo, agente, modeloId, provider].filter(Boolean),
    contexto: { query: chave, tarefaTipo, agente, modeloId, provider, sucesso, duracaoMs, correcoes, fallbackUsado },
    confianca: sucesso ? 0.6 : 0.4,
    missaoId,
    // nota: `memoria.gravar` (wrapper) não repassa `validadeMs` — usa a
    // validade padrão do tipo 'agente' (180 dias, ver memoria/core/tipos.js),
    // adequada aqui (desempenho de modelo não muda a cada hora).
  });
}

/**
 * Consulta o histórico de uma combinação e devolve um ajuste ADITIVO pequeno
 * para somar ao score bruto do Gateway. Nunca aplica ajuste sem amostras
 * suficientes (evita decidir com base em 1 execução de sorte/azar).
 *
 * @returns {{ajuste:number, amostras:number, taxaSucesso:number|null, motivo:string}}
 */
function ajustePorHistorico({ tarefaTipo, agente, modeloId, provider }) {
  const chave = chaveCombinacao({ tarefaTipo, agente, modeloId, provider });
  const r = memoria.listar('agente').filter((reg) => !reg.invalidada && (reg.tags || []).includes('router-aprendizado') && (reg.tags || []).includes(chave));
  if (r.length < MIN_AMOSTRAS_PARA_AJUSTE) {
    return { ajuste: 0, amostras: r.length, taxaSucesso: null, motivo: `histórico insuficiente (${r.length}/${MIN_AMOSTRAS_PARA_AJUSTE} amostras mínimas) — sem ajuste, usa só o score real do Gateway` };
  }
  const recentes = r.slice(-10); // últimas 10 — aprendizado gradual, não "a última falhou, bane pra sempre"
  const sucessos = recentes.filter((reg) => reg.contexto && reg.contexto.sucesso).length;
  const taxaSucesso = sucessos / recentes.length;
  // mapeia taxa de sucesso [0,1] pra ajuste [-AJUSTE_MAXIMO, +AJUSTE_MAXIMO],
  // centrado em 0.7 (a mesma "saúde neutra" que o scoring.js já assume pra
  // modelo sem histórico) — combinações consistentemente melhores que a
  // média sobem um pouco, consistentemente piores descem um pouco.
  const ajuste = Math.max(-AJUSTE_MAXIMO, Math.min(AJUSTE_MAXIMO, (taxaSucesso - 0.7) * AJUSTE_MAXIMO * 2));
  return {
    ajuste: Number(ajuste.toFixed(3)), amostras: recentes.length, taxaSucesso: Number(taxaSucesso.toFixed(2)),
    motivo: `${recentes.length} execução(ões) reais anteriores desta combinação, taxa de sucesso=${(taxaSucesso * 100).toFixed(0)}% → ajuste ${ajuste >= 0 ? '+' : ''}${ajuste.toFixed(3)} sobre o score do Gateway`,
  };
}

module.exports = { registrarExecucao, ajustePorHistorico, chaveCombinacao, MIN_AMOSTRAS_PARA_AJUSTE, AJUSTE_MAXIMO };
