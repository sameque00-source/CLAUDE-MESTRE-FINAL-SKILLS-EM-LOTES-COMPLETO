/**
 * Valida se o valor é um numero finito e seguro para operacoes aritmeticas.
 * Lanca erro caso o valor seja invalido.
 * @param {number} val - O valor a ser validado.
 * @param {string} nomeParam - Nome do parametro para a mensagem de erro.
 * @throws {TypeError} Se o valor nao for numero ou nao for finito.
 * @throws {RangeError} Se o valor exceder limites seguros de inteiro.
 */
function validarNumero(val, nomeParam) {
    if (typeof val !== 'number') {
        throw new TypeError(`O parametro '${nomeParam}' deve ser um numero.`);
    }

    if (!Number.isFinite(val)) {
        throw new TypeError(`O parametro '${nomeParam}' deve ser um numero finito (nao NaN ou Infinity).`);
    }

    if (val > Number.MAX_SAFE_INTEGER || val < Number.MIN_SAFE_INTEGER) {
        throw new RangeError(`O parametro '${nomeParam}' esta fora dos limites seguros de precisao.`);
    }
}

/**
 * Soma dois numeros validando a entrada.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function soma(a, b) {
    validarNumero(a, 'a');
    validarNumero(b, 'b');
    return a + b;
}

module.exports = { soma, validarNumero };