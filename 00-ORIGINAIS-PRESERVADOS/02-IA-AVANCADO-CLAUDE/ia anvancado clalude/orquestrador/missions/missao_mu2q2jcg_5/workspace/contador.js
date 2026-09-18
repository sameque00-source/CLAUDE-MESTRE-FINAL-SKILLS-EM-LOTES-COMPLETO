/**
 * Módulo contador para gerenciar estados numéricos.
 * Utiliza encapsulamento para evitar poluição de escopo.
 */

class Contador {
  #valor = 0; // Estado privado do contador

  // Incrementa o estado atual
  incrementar() {
    let novoValor = this.#valor + 1;
    this.#valor = novoValor;
    return this.#valor;
  }

  // Decrementa o estado atual
  decrementar() {
    let novoValor = this.#valor - 1;
    this.#valor = novoValor;
    return this.#valor;
  }

  // Retorna o valor sem modificar o estado
  obterValor() {
    return this.#valor;
  }

  // Reseta o contador para zero
  resetar() {
    this.#valor = 0;
  }
}

module.exports = new Contador();