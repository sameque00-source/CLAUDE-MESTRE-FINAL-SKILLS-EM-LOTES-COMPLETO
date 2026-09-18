// Módulo de contador utilizando let para controle de escopo de bloco

function criarContador(inicio = 0) {
    let valor = inicio;

    return {
        incrementar() {
            valor += 1;
            return valor;
        },
        decrementar() {
            valor -= 1;
            return valor;
        },
        obterValor() {
            return valor;
        },
        resetar() {
            valor = inicio;
            return valor;
        }
    };
}

module.exports = criarContador;
