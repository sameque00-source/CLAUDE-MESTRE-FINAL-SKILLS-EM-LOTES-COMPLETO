// dividir.js
// Divide o 1o pelo 2o argumento, valida falhas explicitamente sem try/catch

const a = process.argv[2];
const b = process.argv[3];

// valida se faltaram ou sao invalidos
if (a === undefined || b === undefined || b === '0') {
  console.log('invalido');
} else {
  console.log(a / b);
}
