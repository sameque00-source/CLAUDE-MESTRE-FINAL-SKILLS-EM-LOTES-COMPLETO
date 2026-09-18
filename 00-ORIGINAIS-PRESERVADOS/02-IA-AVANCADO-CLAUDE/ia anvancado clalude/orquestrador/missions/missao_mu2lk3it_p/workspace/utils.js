/**
 * Realiza a soma de dois números verificando se são finitos.
 * 
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} A soma de a e b
 * @throws {TypeError} Se a ou b não forem números finitos
 */
function soma(a, b) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new TypeError('Argumentos inválidos: a e b devem ser números finitos.');
    }
    return a + b;
}

module.exports = {
    soma
};
