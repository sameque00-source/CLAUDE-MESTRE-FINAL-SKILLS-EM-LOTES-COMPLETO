/**
 * ESTIMADOR DE CONTEXTO — FASE 7, seção "Tamanho de contexto" do pedido.
 *
 * Estima o tamanho da entrada ANTES de escolher o modelo, para nunca
 * simplesmente truncar dado importante (o que já aconteceu de fato na FASE 4
 * — ver bug real corrigido em `handlers-tarefa.js:formatarAmostraArquivo`,
 * onde a amostra de arquivo mostrada ao revisor era cortada demais e o
 * modelo reportava "truncado" corretamente, mas a causa era o corte, não o
 * código). Aqui a decisão é tomada ANTES da chamada, não depois do dano.
 *
 * Heurística deliberadamente simples (chars/4 ≈ tokens em inglês/português,
 * a mesma aproximação usada por praticamente todo tokenizer BPE moderno em
 * texto latino) — não reimplementa um tokenizer real, que exigiria uma
 * dependência pesada só pra uma estimativa. Erra para MAIS (arredonda pra
 * cima), nunca para menos — subestimar contexto é o erro perigoso aqui.
 */
const CHARS_POR_TOKEN = 3.5; // conservador (menos chars/token = estimativa MAIOR = mais seguro)

/** Estima tokens de um texto (ou concatenação de textos). Nunca subestima de propósito. */
function estimarTokens(...textos) {
  const total = textos.filter(Boolean).map((t) => String(t)).join('\n').length;
  return Math.ceil(total / CHARS_POR_TOKEN);
}

/**
 * Decide o que fazer quando a entrada estimada é grande demais para a janela
 * de contexto do modelo candidato. Nunca "apenas truncar" — sempre uma das
 * estratégias explícitas abaixo, cada uma preservando o dado essencial de um
 * jeito diferente.
 *
 * @param {number} estTokens - tokens estimados da entrada completa
 * @param {number} janelaContexto - context_window do modelo candidato
 * @param {object} [opcoes]
 * @param {number} [opcoes.margemSaida=1500] - tokens reservados para a resposta do modelo
 * @param {number} [opcoes.numPartesDivisiveis=1] - quantas unidades independentes existem na entrada (ex: nº de arquivos) — só "dividir" faz sentido se > 1
 */
function avaliarContexto(estTokens, janelaContexto, opcoes = {}) {
  const { margemSaida = 1500, numPartesDivisiveis = 1 } = opcoes;
  const capacidadeUtil = Math.max(janelaContexto - margemSaida, 1);
  const ocupacao = estTokens / capacidadeUtil;

  if (ocupacao <= 0.85) {
    return { cabe: true, ocupacao: Number(ocupacao.toFixed(2)), estrategia: 'ok', motivo: 'entrada estimada cabe com folga na janela do modelo' };
  }

  // Não cabe (ou está perigosamente perto do limite). Escolhe a estratégia
  // que preserva o dado essencial, na ordem de preferência do pedido:
  // dividir > resumir > paralelizar > modelo com mais capacidade.
  if (numPartesDivisiveis > 1) {
    return {
      cabe: false, ocupacao: Number(ocupacao.toFixed(2)), estrategia: 'dividir',
      motivo: `entrada tem ${numPartesDivisiveis} unidade(s) independente(s) — dividir em subtarefas menores preserva 100% do dado, em vez de cortar`,
    };
  }
  return {
    cabe: false, ocupacao: Number(ocupacao.toFixed(2)), estrategia: 'resumir_ou_modelo_maior',
    motivo: 'entrada não é divisível em partes independentes — resumir preservando pontos essenciais, ou escolher um modelo com janela maior, nunca truncar cegamente',
  };
}

module.exports = { estimarTokens, avaliarContexto, CHARS_POR_TOKEN };
