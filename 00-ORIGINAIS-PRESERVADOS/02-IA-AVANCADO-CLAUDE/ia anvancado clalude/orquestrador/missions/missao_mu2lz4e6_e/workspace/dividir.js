// resolve divisao entre dois argumentos de linha de comando
const a = process.argv[2];
const b = process.argv[3];
if (a === undefined || b === undefined) {
  console.log('invalido');
} else {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (isNaN(x) || isNaN(y) || y === 0) {
    console.log('invalido');
  } else {
    console.log(x / y);
  }
}