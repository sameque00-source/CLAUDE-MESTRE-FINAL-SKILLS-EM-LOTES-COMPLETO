// teste básico da função soma
const { soma } = require('./utils');

// teste válido
console.log(soma(2, 3)); // esperado: 5

// teste inválido: string
try {
  soma('a', 1);
  console.error('não deveria chegar aqui');
} catch (e) {
  console.log('erro capturado:', e.message);
}

// teste inválido: undefined
try {
  soma(1, undefined);
  console.error('não deveria chegar aqui');
} catch (e) {
  console.log('erro capturado:', e.message);
}

// teste inválido: null
try {
  soma(null, 1);
  console.error('não deveria chegar aqui');
} catch (e) {
  console.log('erro capturado:', e.message);
}
