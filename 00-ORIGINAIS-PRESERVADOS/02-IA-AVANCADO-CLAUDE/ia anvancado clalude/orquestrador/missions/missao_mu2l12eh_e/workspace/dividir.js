// le os argumentos da linha de comando
const arg1 = process.argv[2];
const arg2 = process.argv[3];

// valida se faltam argumentos ou se o divisor e zero
if (!arg1 || !arg2 || Number(arg2) === 0) {
  console.log('invalido');
} else {
  // realiza a divisao e imprime o resultado
  const resultado = Number(arg1) / Number(arg2);
  console.log(resultado);
}
