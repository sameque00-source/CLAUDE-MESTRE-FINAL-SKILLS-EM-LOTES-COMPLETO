// dividir.js
// Calcula divisão entre argv[2] e argv[3]
// Imprime "invalido" se faltar argumento ou divisor for 0

function main() {
    const a = process.argv[2];
    const b = process.argv[3];

    // Verificando presença dos argumentos
    if (!a || !b) {
        console.log('invalido');
        return;
    }

    const numA = Number(a);
    const numB = Number(b);

    // Verificando divisor zero
    if (numB === 0) {
        console.log('invalido');
        return;
    }

    // Calcula divisão e imprime resultado
    const resultado = numA / numB;
    console.log(resultado);
}

main();