/**
 * CONSOLIDADOR — FASE 4, seções 7/20/21 do pedido.
 *
 * Recebe resultados de VÁRIOS agentes (tipicamente pesquisas paralelas) e
 * produz uma decisão consolidada: resolve conflito, identifica divergência,
 * prioriza evidência — nunca escolhe arbitrariamente sem evidência (seção 21).
 * Reaproveita `chamar-llm.js` da FASE 2, não duplica chamada de modelo.
 */
const path = require('path');
const { chamarLLM } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'chamar-llm.js'));
const { extrairJSON } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'json-robusto.js'));

/**
 * Detecção rápida e determinística de divergência textual (antes de gastar
 * uma chamada de LLM): se os resultados são todos muito parecidos, não há
 * necessidade de "resolver conflito" nenhum — é só consolidar.
 */
function pareceDivergente(resultados) {
  const textos = resultados.map((r) => (r.resultado || '').toLowerCase());
  if (textos.length < 2) return false;
  // heurística leve: conta palavras-chave em comum entre o 1º e os demais;
  // pouca sobreposição = sinal de recomendações diferentes.
  // BUG REAL corrigido aqui (2026-09-15, achado na FASE 6 no mesmo padrão em
  // memoria/core/recall.js): `\W` no JS não é Unicode-aware, quebra
  // "versão"/"não"/"é" no acento, criando fragmentos que colidem entre
  // textos sem relação nenhuma. Trocado por `\p{L}`/`\p{N}` (Unicode).
  const palavras = (t) => new Set(t.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 4));
  const base = palavras(textos[0]);
  for (let i = 1; i < textos.length; i++) {
    const outras = palavras(textos[i]);
    const intersecao = [...base].filter((w) => outras.has(w)).length;
    const uniao = new Set([...base, ...outras]).size;
    const jaccard = uniao > 0 ? intersecao / uniao : 1;
    if (jaccard < 0.15) return true; // muito pouca sobreposição de vocabulário = provável divergência
  }
  return false;
}

/**
 * @param {object[]} resultados - resultados padronizados (Tarefa.criarResultado) de cada agente
 * @param {string} objetivo - o que a consolidação precisa decidir
 * @returns {Promise<{ok:boolean, decisao:string, divergenciaDetectada:boolean, evidenciasUsadas:string[], precisaDecisaoHumana:boolean, motivo?:string}>}
 */
async function consolidar(resultados, objetivo) {
  const validos = resultados.filter((r) => r && r.status === 'ok' && r.resultado);
  if (validos.length === 0) {
    return { ok: false, decisao: '', divergenciaDetectada: false, evidenciasUsadas: [], precisaDecisaoHumana: false, motivo: 'nenhum resultado válido para consolidar' };
  }
  if (validos.length === 1) {
    return { ok: true, decisao: validos[0].resultado, divergenciaDetectada: false, evidenciasUsadas: validos[0].evidencias || [] };
  }

  const divergente = pareceDivergente(validos);
  const blocos = validos.map((r, i) => `--- Fonte ${i + 1} ---\n${r.resultado}\nEvidências: ${(r.evidencias || []).join('; ')}`).join('\n\n');
  const prompt = `Você é o módulo Consolidador de um agente de IA autônomo. Vários especialistas produziram resultados independentes sobre o mesmo objetivo. Sua função: comparar evidências e produzir UMA decisão consolidada.

OBJETIVO: "${objetivo}"

RESULTADOS DOS ESPECIALISTAS:
${blocos}

REGRAS:
- Se os resultados convergem (mesma conclusão prática), apenas sintetize numa resposta única.
- Se DIVERGEM de verdade, compare a QUALIDADE da evidência de cada lado (não escolha arbitrariamente) e decida com justificativa concreta.
- Só marque precisaDecisaoHumana:true se a divergência for genuinamente uma questão de preferência/negócio que nenhuma evidência técnica resolve (raro).

Responda APENAS com JSON: {"decisao": "...", "divergenciaReal": true|false, "motivoDaDecisao": "...", "precisaDecisaoHumana": false}`;

  const resp = await chamarLLM(prompt, { tipoTarefa: 'raciocinio', complexidade: 3, maxTokens: 700 });
  if (!resp.ok) {
    // fallback determinístico sem LLM: concatena tudo, marca divergência sem resolver
    return {
      ok: true,
      decisao: validos.map((r) => r.resultado).join(' | '),
      divergenciaDetectada: divergente,
      evidenciasUsadas: validos.flatMap((r) => r.evidencias || []),
      precisaDecisaoHumana: false,
      motivo: `consolidação por LLM falhou (${resp.error}) — fallback de concatenação simples usado`,
    };
  }
  const json = extrairJSON(resp.texto);
  if (!json) {
    return {
      ok: true, decisao: resp.texto, divergenciaDetectada: divergente,
      evidenciasUsadas: validos.flatMap((r) => r.evidencias || []), precisaDecisaoHumana: false,
    };
  }
  return {
    ok: true,
    decisao: json.decisao || resp.texto,
    divergenciaDetectada: !!json.divergenciaReal || divergente,
    evidenciasUsadas: validos.flatMap((r) => r.evidencias || []),
    precisaDecisaoHumana: !!json.precisaDecisaoHumana,
    motivo: json.motivoDaDecisao || '',
  };
}

module.exports = { consolidar, pareceDivergente };
