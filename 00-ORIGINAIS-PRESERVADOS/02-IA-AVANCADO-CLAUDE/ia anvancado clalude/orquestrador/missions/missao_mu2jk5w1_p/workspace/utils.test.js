const assert = require('assert');
const { soma } = require('./utils');

assert.strictEqual(soma(2, 3), 5);
assert.strictEqual(soma(-1, 1), 0);

let erroLancado = false;
try {
    soma('2', 3);
} catch (e) {
    erroLancado = true;
}
assert.strictEqual(erroLancado, true);

console.log('Todos os testes passaram com sucesso!');
