// divide dois numeros recebidos via CLI
// regra: se faltar arg ou divisor for 0, da invalido
const args = process.argv.slice(2);

// valida se tem os dois numeros
if (args.length < 2) {
  console.log('invalido');
  process.exit(0);
}

// converte e valida se sao numeros validos
const a = Number(args[0]);
const b = Number(args[1]);

if (isNaN(a) || isNaN(b)) {
  console.log('invalido');
  process.exit(0);
}

// valida divisor diferente de zero
if (b === 0) {
  console.log('invalido');
  process.exit(0);
}

// calcula e imprime
const resultado = a / b;
console.log(resultado);
