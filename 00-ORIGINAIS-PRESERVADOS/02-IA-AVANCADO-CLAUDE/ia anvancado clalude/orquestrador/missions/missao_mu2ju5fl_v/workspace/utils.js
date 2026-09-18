// utils.js
// Funções utilitárias.

/**
 * Soma dois números.
 *
 * @param {number} a - Primeiro operando.
 * @param {number} b - Segundo operando.
 * @returns {number} A soma de a e b.
 * @throws {TypeError} Se "a" ou "b" não forem números finitos.
 */
function soma(a, b) {
  // Validação explícita dos parâmetros.
  if (!Number.isFinite(a)) {
    throw new TypeError(`Argumento "a" deve ser um número finito. Recebido: ${a}`);
  }
  if (!Number.isFinite(b)) {
    throw new TypeError(`Argumento "b" deve ser um número finito. Recebido: ${b}`);
  }

  // Operação segura – ambos são números finitos.
  return a + b;
}

module.exports = {
  soma,
};