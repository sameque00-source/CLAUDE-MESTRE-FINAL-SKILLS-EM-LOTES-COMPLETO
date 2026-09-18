// divide dois numeros recebidos via args

const a = process.argv[2];
const b = process.argv[3];

// valida se os dois argumentos existem e sao numericos
if (!isNaN(a) && !isNaN(b) && Number(b) !== 0) {
    console.log(Number(a) / Number(b));
} else {
    // qualquer falha de entrada cai aqui
    console.log("invalido");
}
