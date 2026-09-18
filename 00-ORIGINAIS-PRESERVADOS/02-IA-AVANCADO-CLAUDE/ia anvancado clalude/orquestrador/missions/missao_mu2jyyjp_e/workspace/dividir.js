// le os argumentos da linha de comando
const arg1 = process.argv[2];
const arg2 = process.argv[3];

// valida se faltou argumento ou se o divisor e zero
if (arg1 === undefined || arg2 === undefined || Number(arg2) === 0) {
  console.log("invalido");
} else {
  const resultado = Number(arg1) / Number(arg2);
  console.log(resultado);
}
