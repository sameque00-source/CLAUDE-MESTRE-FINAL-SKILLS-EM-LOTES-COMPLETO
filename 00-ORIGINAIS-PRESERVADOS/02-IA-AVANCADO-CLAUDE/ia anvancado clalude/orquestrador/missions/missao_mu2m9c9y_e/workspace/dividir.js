// valida os argumentos para evitar erros de runtime ou divisao por zero
if (process.argv.length < 4 || process.argv[3] === '0') {
  console.log('invalido');
  process.exit(0);
}

// converte e executa a divisao
const a = parseInt(process.argv[2]);
const b = parseInt(process.argv[3]);
console.log(a / b);
