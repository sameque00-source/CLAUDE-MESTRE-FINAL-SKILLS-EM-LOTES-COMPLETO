const args = process.argv.slice(2);

// Valida se foram passados exatamente os dois números necessários
if (args.length < 2) {
  console.log("invalido");
  process.exit(0);
}

// Converte as strings dos argumentos para número
const a = parseFloat(args[0]);
const b = parseFloat(args[1]);

// Verifica se algum dos valores é NaN (valor inválido) ou se o divisor é zero
if (isNaN(a) || isNaN(b) || b === 0) {
  console.log("invalido");
  process.exit(0);
}

// Executa a divisão e imprime o resultado
const resultado = a / b;
console.log(resultado);
