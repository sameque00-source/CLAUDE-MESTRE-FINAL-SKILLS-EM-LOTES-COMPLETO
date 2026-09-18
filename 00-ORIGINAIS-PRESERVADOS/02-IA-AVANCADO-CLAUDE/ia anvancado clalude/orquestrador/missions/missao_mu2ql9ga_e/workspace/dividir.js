// le os argumentos da linha de comando
const arg1 = process.argv[2];
const arg2 = process.argv[3];

// valida se ambos os argumentos foram passados
if (arg1 === undefined || arg2 === undefined) {
  console.log("invalido");
  process.exit(0);
}

// converte para numero
const numerador = Number(arg1);
const denominador = Number(arg2);

// valida se sao numeros validos e se o divisor e zero
if (isNaN(numerador) || isNaN(denominador) || denominador === 0) {
  console.log("invalido");
  process.exit(0);
}

// realiza a divisao e imprime o resultado
const resultado = numerador / denominador;
console.log(resultado);
