/**
 * VISÃO (análise de imagem) — FASE 9.
 *
 * Reaproveita 100% o pipeline real de `chamar-llm.js` (decisor + router +
 * fallback + aprendizado + avaliação de contexto) — não duplica nada disso.
 * A única coisa nova aqui é montar o BLOCO de imagem no formato Anthropic
 * (`type:'image', source:{type:'base64', media_type, data}`), que o adapter
 * real do Google AI Studio já sabe traduzir pra `inline_data` do Gemini
 * (`gateway/providers.js:toGeminiParts` — CONFIRMADO existente antes de
 * escrever este módulo, não assumido).
 *
 * "Não inventar capacidade": só os modelos com `vision:true` no catálogo
 * REAL e com adapter REAL implementado são considerados (o próprio
 * `decisor.js` já filtra isso) — na prática, hoje, isso restringe a modelos
 * Google AI Studio gratuitos (Cloudflare tem `vision:true` no catálogo mas
 * NENHUM adapter implementado ainda, filtrado fora — gap real, documentado).
 */
const fs = require('fs');
const path = require('path');
const { chamarLLM } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'chamar-llm.js'));
const { detectarArquivo } = require('./deteccao');

const TAMANHO_MAXIMO_IMAGEM_BYTES = 8 * 1024 * 1024; // 8MB — generoso pra imagem real, evita payload absurdo

/**
 * @param {string} caminhoAbsoluto
 * @param {string} [pergunta] - o que pedir ao modelo de visão sobre a imagem
 * @param {object} [opcoes]
 * @returns {Promise<{ok:boolean, descricao?:string, modeloId?:string|null, provider?:string|null, error?:string}>}
 */
async function analisarImagem(caminhoAbsoluto, pergunta = 'Descreva objetivamente o que há nesta imagem, em português, de forma concisa.', opcoes = {}) {
  const deteccao = detectarArquivo(caminhoAbsoluto);
  if (!deteccao.ok || deteccao.modalidade !== 'imagem') {
    return { ok: false, error: `arquivo não é uma imagem válida (modalidade detectada: ${deteccao.modalidade}, motivo: ${deteccao.motivo})` };
  }
  if (deteccao.tamanhoBytes > TAMANHO_MAXIMO_IMAGEM_BYTES) {
    return { ok: false, error: `imagem excede o limite de ${TAMANHO_MAXIMO_IMAGEM_BYTES} bytes (tem ${deteccao.tamanhoBytes})` };
  }

  const dadosBase64 = fs.readFileSync(caminhoAbsoluto).toString('base64');
  const blocosConteudo = [
    { type: 'text', text: pergunta },
    { type: 'image', source: { type: 'base64', media_type: deteccao.mimeReal, data: dadosBase64 } },
  ];

  const resp = await chamarLLM(pergunta, {
    tipoTarefa: 'texto', complexidade: opcoes.complexidade || 2, maxTokens: opcoes.maxTokens || 500,
    blocosConteudo, precisaVisao: true, agente: opcoes.agente || 'research',
  });
  if (!resp.ok) {
    return { ok: false, error: `análise de imagem indisponível: ${resp.error}`, categoriaFalha: resp.categoriaFalha };
  }
  return { ok: true, descricao: resp.texto, modeloId: resp.modeloId, provider: resp.provider, mimeReal: deteccao.mimeReal };
}

module.exports = { analisarImagem, TAMANHO_MAXIMO_IMAGEM_BYTES };
