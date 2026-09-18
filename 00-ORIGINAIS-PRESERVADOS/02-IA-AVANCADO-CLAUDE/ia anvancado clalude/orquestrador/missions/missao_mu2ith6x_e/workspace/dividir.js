// Script de divisão com validação explícita e sem uso de try/catch

const args = process.argv;

// 1. Verificação de falta de argumentos (precisamos de índice 2 e 3)
if (args.length < 4) {
  console.log('invalido');
  process.exit(0); // Encerra o processo para quebrar o fluxo
}

// 2. Extração e conversão numérica
const a = Number(args[2]);
const b = Number(args[3]);

// 3. Verificação se o divisor é zero
if (b === 0) {
  console.log('invalido');
}
else {
  console.log(a / b);
}