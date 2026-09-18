// utilidades básicas do projeto

/**
 * Soma dois números com validação de tipos.
 * @param {number} a - primeiro operando
 * @param {number} b - segundo operando
 * @returns {number} resultado da soma
 */
function soma(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error(`Operandos inválidos para soma: esperava número, recebeu ${a} e ${b}`);
  }
  return a + b;
}

module.exports = { soma };