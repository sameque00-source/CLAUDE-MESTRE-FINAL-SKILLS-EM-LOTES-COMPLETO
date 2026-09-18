// divididor.basico.js - utilitário simples de divisão sem dependências externas
const args = process.argv;

// verifica o mínimo necessário antes de tentar converter
if (args.length < 4) {
    console.log("invalido");
    process.exit(0);
}

// valor bruto vindo do terminal (string)
const alvo = args[2];
const divisor = args[3];

// converte apenas o que precisamos pra o cálculo
const numAlvo = Number(alvo);
const numDivisor = Number(divisor);

// se converteu pra algo estranho (NaN) também tá inválido
if (Number.isNaN(numAlvo) || Number.isNaN(numDivisor)) {
    console.log("invalido");
    process.exit(0);
}

// caso clássico: dividir por zero não faz sentido
if (numDivisor === 0) {
    console.log("invalido");
    process.exit(0);
}

// só chega aqui se tudo estiver ok -> imprime o resultado
console.log(numAlvo / numDivisor);