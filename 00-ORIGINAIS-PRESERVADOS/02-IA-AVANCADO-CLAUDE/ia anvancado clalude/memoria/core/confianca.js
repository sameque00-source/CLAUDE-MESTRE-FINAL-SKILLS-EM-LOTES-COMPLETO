/**
 * CONFIANÇA DE MEMÓRIA — FASE 6, seção 18 do pedido.
 * Diferente da confiança de EVIDÊNCIA (pesquisa/core/confianca.js, que
 * avalia 1 pesquisa no momento em que acontece), esta avalia um REGISTRO DE
 * MEMÓRIA ao longo do tempo — soma recência, quantidade de fontes
 * originais, e se já passou por alguma revisão/confirmação posterior.
 * Nunca finge certeza absoluta (teto real, nunca 1.0).
 */
const { estaValida, estaProximaDeExpirar } = require('./expiracao');

/**
 * @param {object} registro - registro de memória já persistido
 * @returns {number} 0 a 0.95
 */
function calcularConfianca(registro) {
  if (!registro) return 0;
  if (!estaValida(registro)) return 0; // memória inválida/expirada nunca tem confiança

  let c = typeof registro.confianca === 'number' ? registro.confianca : 0.5;

  // mais fontes de evidência = mais confiança (até um teto)
  const numEvidencias = Array.isArray(registro.evidencias) ? registro.evidencias.length : 0;
  c += Math.min(numEvidencias * 0.03, 0.1);

  // já foi confirmada por revisão/uso posterior (histórico tem evento de confirmação)?
  const foiConfirmada = Array.isArray(registro.historico) && registro.historico.some((h) => h.evento === 'confirmada');
  if (foiConfirmada) c += 0.05;

  // perto de expirar = penaliza um pouco (informação "envelhecendo")
  if (estaProximaDeExpirar(registro)) c -= 0.1;

  return Math.max(0, Math.min(Number(c.toFixed(2)), 0.95));
}

module.exports = { calcularConfianca };
