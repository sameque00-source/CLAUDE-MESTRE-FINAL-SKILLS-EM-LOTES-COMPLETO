/**
 * TRIANGULAÇÃO — FASE 5, seções 6/7 do pedido.
 * Fonte A + Fonte B + Fonte C → comparação real: concordância, contradição,
 * ou informação insuficiente. Nunca escolhe arbitrariamente — se divergem,
 * registra as DUAS afirmações com evidência e confiabilidade de cada uma
 * (o consolidador, FASE 4, decide ou mantém a incerteza explícita).
 */
const path = require('path');
const { chamarLLM } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'chamar-llm.js'));
const { extrairJSON } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'json-robusto.js'));

/**
 * @param {object[]} evidencias - itens de evidência estruturados (query/fonte/url/titulo/data/trecho/confianca)
 * @param {string} pergunta - a pergunta original que a pesquisa tentava responder
 * @returns {Promise<{ok:boolean, situacao:'concordancia'|'contradicao'|'insuficiente', sintese:string, afirmacoes:object[], motivo:string}>}
 */
async function triangular(evidencias, pergunta) {
  if (evidencias.length === 0) {
    return { ok: true, situacao: 'insuficiente', sintese: '', afirmacoes: [], motivo: 'nenhuma evidência coletada' };
  }
  if (evidencias.length === 1) {
    return { ok: true, situacao: 'insuficiente', sintese: evidencias[0].trecho, afirmacoes: [{ texto: evidencias[0].trecho, fontes: [evidencias[0].url], confiabilidade: evidencias[0].confianca }], motivo: 'só 1 fonte — não dá pra triangular, resultado fica com confiança limitada' };
  }

  const blocos = evidencias.map((e, i) => `Fonte ${i + 1} (${e.fonte}, confiabilidade=${e.confianca}): "${e.trecho.slice(0, 500)}" [${e.url}]`).join('\n\n');
  const prompt = `Você é o módulo de Triangulação de um agente de pesquisa. Compare as fontes abaixo sobre a mesma pergunta e determine se elas CONCORDAM, CONTRADIZEM, ou se a informação é INSUFICIENTE pra concluir.

PERGUNTA: "${pergunta}"

FONTES:
${blocos}

REGRAS:
- Nunca escolha um lado arbitrariamente sem justificar com evidência.
- Se as fontes concordam (mesmo com palavras diferentes), diga isso e sintetize.
- Se contradizem de verdade, registre as DUAS (ou mais) afirmações, cada uma com suas fontes e um motivo plausível da divergência (ex: versões diferentes, datas diferentes, definições diferentes).

Responda APENAS com JSON: {"situacao": "concordancia"|"contradicao"|"insuficiente", "sintese": "...", "afirmacoes": [{"texto": "...", "fontes": ["url1"], "confiabilidade": 0.8}], "motivoDivergencia": "..." }`;

  const resp = await chamarLLM(prompt, { tipoTarefa: 'raciocinio', complexidade: 2, maxTokens: 700 });
  if (!resp.ok) {
    return { ok: false, situacao: 'insuficiente', sintese: '', afirmacoes: [], motivo: `triangulação por LLM falhou: ${resp.error}` };
  }
  const json = extrairJSON(resp.texto);
  if (!json) {
    return { ok: true, situacao: 'insuficiente', sintese: resp.texto, afirmacoes: [], motivo: 'resposta do LLM não estruturada — síntese bruta preservada' };
  }
  return {
    ok: true,
    situacao: ['concordancia', 'contradicao', 'insuficiente'].includes(json.situacao) ? json.situacao : 'insuficiente',
    sintese: json.sintese || '',
    afirmacoes: Array.isArray(json.afirmacoes) ? json.afirmacoes : [],
    motivo: json.motivoDivergencia || '',
  };
}

module.exports = { triangular };
