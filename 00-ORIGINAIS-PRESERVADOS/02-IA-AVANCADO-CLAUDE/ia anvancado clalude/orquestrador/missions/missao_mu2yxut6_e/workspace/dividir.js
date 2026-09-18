// Dividir dois números fornecidos via linha de comando
// Se argumentos faltarem ou divisor for zero, imprime "invalido"

// Verifica quantidade mínima de argumentos (node + script + 2 valores)
if (process.argv.length < 4) {
  console.log('invalido');
  process.exit(0);
}

const dividendo = parseFloat(process.argv[2]);
const divisor = parseFloat(process.argv[3]);

// Validação explícita dos valores
if (isNaN(dividendo) || isNaN(divisor) || divisor === 0) {
  console.log('invalido');
  process.exit(0);
}

const resultado = dividendo / divisor;
console.log(resultado);
