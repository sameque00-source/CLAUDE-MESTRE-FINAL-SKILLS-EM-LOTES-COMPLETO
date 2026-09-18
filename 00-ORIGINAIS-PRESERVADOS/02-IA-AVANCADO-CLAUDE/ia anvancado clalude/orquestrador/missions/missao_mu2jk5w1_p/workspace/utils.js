/**
 * Retorna a soma de dois números.
 * Lança um erro se os argumentos não forem números válidos.
 * 
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} A soma de a e b
 */
function soma(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
        throw new TypeError('Ambos os argumentos devem ser números válidos.');
    }
    return a + b;
}

module.exports = { soma };
