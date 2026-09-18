/**
 * utils.js - Funções utilitárias simples
 *
 * Função soma(a,b) - retorna a soma de dois números
 *
 * Pontos de falha:
 * - Se algum argumento for undefined, resultará em NaN
 * - Se algum argumento não for número, pode gerar NaN ou concatenação de strings
 */
function soma(a, b) {
  return a + b;
}

module.exports = { soma };