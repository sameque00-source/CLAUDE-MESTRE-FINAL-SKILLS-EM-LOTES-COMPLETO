// le os argumentos da linha de comando
const args = process.argv.slice(2);

// valida se temos os dois argumentos necessarios
if (args.length < 2) {
    console.log("invalido");
    process.exit(0);
}

const a = Number(args[0]);
const b = Number(args[1]);

// valida se o divisor e zero ou se nao sao numeros validos
if (b === 0 || isNaN(a) || isNaN(b)) {
    console.log("invalido");
    process.exit(0);
}

// realiza a divisao e imprime o resultado
const resultado = a / b;
console.log(resultado);
