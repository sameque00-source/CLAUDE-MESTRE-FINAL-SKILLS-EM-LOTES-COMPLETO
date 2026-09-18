// test.js – valida a nova implementação de soma(a, b).
const { soma } = require('./utils.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function runTest(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
  } catch (e) {
    console.error(`❌ ${description}: ${e.message}`);
  }
}

// Caso feliz
runTest('soma(2, 3) retorna 5', () => {
  const result = soma(2, 3);
  assert(result === 5, `Esperado 5, obtido ${result}`);
});

// Erro de tipo em "a"
runTest('soma("a", 2) lança TypeError', () => {
  let threw = false;
  try {
    soma('a', 2);
  } catch (e) {
    if (e instanceof TypeError) threw = true;
    else throw e;
  }
  assert(threw, 'Não foi lançada a TypeError esperada');
});

// Erro de tipo em "b"
runTest('soma(2, NaN) lança TypeError', () => {
  let threw = false;
  try {
    soma(2, NaN);
  } catch (e) {
    if (e instanceof TypeError) threw = true;
    else throw e;
  }
  assert(threw, 'Não foi lançada a TypeError esperada');
});