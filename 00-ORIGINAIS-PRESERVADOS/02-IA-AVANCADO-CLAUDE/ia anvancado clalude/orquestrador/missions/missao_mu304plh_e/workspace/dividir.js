// lê os dois args e valida antes de mexer, evita stack trace
let a = process.argv[2];
let b = process.argv[3];

if (a === undefined || b === undefined) {
  console.log("invalido");
  process.exit(0);
}

let n1 = parseFloat(a);
let n2 = parseFloat(b);

if (isNaN(n1) || isNaN(n2) || n2 === 0) {
  console.log("invalido");
  process.exit(0);
}

console.log(n1 / n2);
