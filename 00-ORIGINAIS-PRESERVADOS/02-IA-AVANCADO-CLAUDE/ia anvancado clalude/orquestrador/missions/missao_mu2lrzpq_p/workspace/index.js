// Script de teste para a função soma
const { soma } = require('./utils');

// Testando casos válidos
console.log("Testando soma válida: 2 + 3 =", soma(2, 3));
console.log("Testando soma válida: -1 + 1 =", soma(-1, 1));

// Testando casos inválidos
try {
  soma("a", 1);
} catch (e) {
  console.log("Erro capturado corretamente:", e.message);
}

try {
  soma(1, "b");
} catch (e) {
  console.log("Erro capturado corretamente:", e.message);
}
