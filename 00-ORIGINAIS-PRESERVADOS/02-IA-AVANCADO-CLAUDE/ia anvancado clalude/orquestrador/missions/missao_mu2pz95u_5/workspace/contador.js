/**
 * Módulo de contador simples
 * Usa exclusivamente `let` para variáveis
 * Sem dependências externas
 */

let count = 0;

/**
 * Incrementa o valor do contador em 1
 */
function increment() {
  count += 1;
}

/**
 * Retorna o valor atual do contador
 * @returns {number} valor atual
 */
function getCount() {
  return count;
}

module.exports = {
  increment,
  getCount
};