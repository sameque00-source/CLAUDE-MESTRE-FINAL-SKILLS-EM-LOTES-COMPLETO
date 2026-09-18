/**
 * teste.js - Testes simples para utils.js
 */
const { soma } = require('./utils.js');

console.log('--- Testes de soma ---');
console.log('soma(1, 2) =', soma(1, 2)); // esperado 3
console.log('soma(NaN, 5) =', soma(NaN, 5)); // esperado NaN
console.log('soma(undefined, 3) =', soma(undefined, 3)); // esperado NaN
console.log('soma("a", "b") =', soma('a', 'b')); // esperado 'ab' (concatenação)
console.log('soma(5, null) =', soma(5, null)); // esperado 5 (null vira 0)
console.log('soma({}, {}) =', soma({}, {})); // esperado NaN
