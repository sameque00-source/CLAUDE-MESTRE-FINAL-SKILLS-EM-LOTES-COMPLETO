const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

// Verifica quantidade de argumentos, se são números e se o divisor não é zero
if (process.argv.length !== 4 || isNaN(a) || isNaN(b) || b === 0) {
  console.log('invalido');
} else {
  console.log(a / b);
}
