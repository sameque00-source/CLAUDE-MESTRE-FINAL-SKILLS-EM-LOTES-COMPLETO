// util.js
// definiu a funcao pra somar dois numeros.
// nao aceita nada que nao seja number, ta?

function soma(a, b) {
  if (typeof a !== 'number' || Number.isNaN(a)) {
    throw new TypeError(`a deve ser um number, foi: ${typeof a}`);
  }
  if (typeof b !== 'number' || Number.isNaN(b)) {
    throw new TypeError(`b deve ser um number, foi: ${typeof b}`);
  }
  return a + b;
}

module.exports = { soma };