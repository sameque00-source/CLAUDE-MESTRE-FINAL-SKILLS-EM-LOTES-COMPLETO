const a = process.argv[2];
const b = process.argv[3];

// Verifica validade dos inputs antes de processar
if (!a || !b) {
  console.log("invalido");
  process.exit(0);
}

const x = parseInt(a, 10);
const y = parseInt(b, 10);

// Segure se nao for numero valido ou divisor zero
if (isNaN(x) || isNaN(y) || y === 0) {
  console.log("invalido");
  process.exit(0);
}

console.log(x / y);
