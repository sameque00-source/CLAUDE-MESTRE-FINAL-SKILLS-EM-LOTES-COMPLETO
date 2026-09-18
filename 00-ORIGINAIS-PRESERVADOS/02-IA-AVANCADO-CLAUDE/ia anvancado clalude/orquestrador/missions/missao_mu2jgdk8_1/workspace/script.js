// Inicializa o estado do contador e garante acessibilidade semântica
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('botao-incrementar');
  const valorSpan = document.getElementById('contador-valor');
  let contador = 0;

  botao.addEventListener('click', () => {
    contador++;
    valorSpan.textContent = contador;
  });
});
