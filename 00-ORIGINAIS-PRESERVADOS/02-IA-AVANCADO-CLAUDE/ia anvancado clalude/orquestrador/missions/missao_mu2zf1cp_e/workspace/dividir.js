// divide o 1o argumento pelo 2o; valida entrada antes de calcular
const args = process.argv.slice(2);

if (args.length < 2 || args[1] === "0" || args[1] === "" || isNaN(Number(args[1]))) {
  console.log("invalido");
  process.exit(0);
}

const a = Number(args[0]);
const b = Number(args[1]);
console.log(a / b);
