/**
 * Realiza a soma de dois números com validação estrita de tipos e valores finitos.
 * 
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @returns {number} O resultado da soma.
 * @throws {TypeError} Se algum dos argumentos não for do tipo number.
 * @throws {Error} Se algum dos argumentos for NaN, Infinity ou -Infinity.
 */
function soma(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Argumentos devem ser do tipo número.');
  }

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Argumentos não podem ser NaN ou infinitos.');
  }

  return a + b;
}

module.exports = {
  soma
};
