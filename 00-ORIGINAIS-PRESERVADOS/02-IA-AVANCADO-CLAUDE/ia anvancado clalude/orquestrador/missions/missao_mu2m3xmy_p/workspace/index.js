/**
 * Soma dois numeros
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function soma(a, b) {
  // Valida se os argumentos sao do tipo number e nao sao NaN
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Argumentos invalidos: ambos devem ser numeros');
  }

  return a + b;
}

// Testes de validacao
try {
  console.log(soma(1, 2));
  soma(1, '2');
} catch (e) {
  console.error(e.message);
}