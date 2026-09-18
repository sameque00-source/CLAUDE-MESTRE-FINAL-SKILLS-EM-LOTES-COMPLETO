/**
 * Extração robusta de JSON de uma resposta de LLM em texto livre.
 * Modelos gratuitos às vezes envolvem o JSON em ```json ... ```, adicionam
 * texto antes/depois, ou usam aspas simples por engano — este módulo tenta
 * as estratégias mais comuns antes de desistir.
 */

function extrairJSON(texto) {
  if (!texto) return null;

  // 1. tenta o texto inteiro primeiro (caso ideal: o modelo obedeceu)
  const tentativas = [texto.trim()];

  // 2. bloco ```json ... ``` ou ``` ... ```
  const blocoFence = texto.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (blocoFence) tentativas.push(blocoFence[1].trim());

  // 3. do primeiro '{' ao último '}' (ignora prosa antes/depois)
  const primeira = texto.indexOf('{');
  const ultima = texto.lastIndexOf('}');
  if (primeira !== -1 && ultima !== -1 && ultima > primeira) {
    tentativas.push(texto.slice(primeira, ultima + 1));
  }

  for (const t of tentativas) {
    try {
      return JSON.parse(t);
    } catch { /* tenta a próxima estratégia */ }
  }

  // 4. reparo de truncamento: a resposta foi cortada no meio (estourou
  // max_tokens) — tenta salvar os objetos de "tarefas" que ficaram
  // completos antes do corte, descartando o objeto truncado no final.
  const reparado = repararJSONTruncado(texto);
  if (reparado) return reparado;

  return null;
}

/**
 * Recupera um objeto plano parcial de uma resposta truncada: acha o array
 * "tarefas": [ ... e faz varredura de chaves balanceadas, mantendo só os
 * objetos de tarefa que fecharam completamente antes do texto acabar.
 * Os demais campos de nível superior (interpretacao, requisitos, etc.) são
 * recuperados com regex simples quando possível, ou ficam com default vazio
 * — o construtor de plano já trata ausência desses campos sem quebrar.
 */
function repararJSONTruncado(texto) {
  const idxTarefas = texto.indexOf('"tarefas"');
  if (idxTarefas === -1) return null;
  const idxArray = texto.indexOf('[', idxTarefas);
  if (idxArray === -1) return null;

  const objetos = [];
  let i = idxArray + 1;
  while (i < texto.length) {
    while (i < texto.length && /[\s,]/.test(texto[i])) i++;
    if (texto[i] !== '{') break; // array fechou ou o próximo item nem começou — para aqui
    let profundidade = 0;
    let dentroDeString = false;
    let escape = false;
    let inicio = i;
    let fechou = false;
    for (; i < texto.length; i++) {
      const c = texto[i];
      if (escape) { escape = false; continue; }
      if (c === '\\') { escape = true; continue; }
      if (c === '"') { dentroDeString = !dentroDeString; continue; }
      if (dentroDeString) continue;
      if (c === '{') profundidade++;
      else if (c === '}') {
        profundidade--;
        if (profundidade === 0) { fechou = true; i++; break; }
      }
    }
    if (!fechou) break; // objeto de tarefa cortado no meio — descarta e para
    const bruto = texto.slice(inicio, i);
    try { objetos.push(JSON.parse(bruto)); } catch { /* objeto malformado, ignora só esse */ }
  }
  if (objetos.length === 0) return null;

  const pegarCampoString = (chave) => {
    const m = texto.match(new RegExp(`"${chave}"\\s*:\\s*"([^"]*)"`));
    return m ? m[1] : null;
  };

  return {
    interpretacao: pegarCampoString('interpretacao'),
    requisitos: [], restricoes: [], entregaveis: [], modalidade: ['texto'], riscos: [],
    criteriosSucessoGeral: [],
    tarefas: objetos,
    _reparadoDeTruncamento: true,
  };
}

module.exports = { extrairJSON, repararJSONTruncado };
