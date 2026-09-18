/**
 * SANITIZAÇÃO DA MEMÓRIA — FASE 6, seções 22/23 do pedido.
 * "Memória nunca deve virar fonte de prompt injection não filtrada" +
 * "nunca salvar secrets". Aplicado SEMPRE antes de qualquer escrita —
 * é a única porta de entrada da memória (armazenamento.js chama isto,
 * nunca escreve direto).
 *
 * Reaproveita os MESMOS padrões de secret já usados no veto de Security
 * da FASE 4 (`executor/core/handlers-tarefa.js`) — não duplica a lista,
 * mantém uma cópia local pequena e propositalmente conservadora (prefere
 * falso positivo a deixar passar um secret real).
 */
const path = require('path');

const PADROES_SECRET = [
  /\b(sk-[a-zA-Z0-9]{10,}|gsk_[a-zA-Z0-9]{10,}|AQ\.[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{12,})\b/,
  /\b(password|senha|passwd|token|api[_-]?key|secret)\s*[:=]\s*['"]?[^\s'"]{6,}['"]?/i,
  /\bBearer\s+[A-Za-z0-9._-]{16,}/,
];

const TAMANHO_MAX_CONTEUDO = 20000; // limite real contra memória "gigante" (seção 23)
const TAMANHO_MAX_TAG = 60;
const MAX_TAGS = 20;

class ConteudoRejeitadoError extends Error {
  constructor(motivo) { super(`Conteúdo rejeitado pela sanitização: ${motivo}`); this.name = 'ConteudoRejeitadoError'; }
}

/** Remove/mascara qualquer trecho que pareça secret — nunca deixa passar em silêncio, mas também nunca lança por isso (mascara e segue). */
function mascarrarSecrets(texto) {
  let resultado = String(texto || '');
  let encontrouAlgum = false;
  for (const re of PADROES_SECRET) {
    if (re.test(resultado)) {
      encontrouAlgum = true;
      resultado = resultado.replace(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'), '[REDACTED]');
    }
  }
  return { texto: resultado, sanitizado: encontrouAlgum };
}

/**
 * Valida um ID de memória — impede path traversal (seção 23) já que o ID
 * frequentemente vira parte de um caminho de arquivo/chave de índice.
 */
function idValido(id) {
  return typeof id === 'string' && id.length > 0 && id.length <= 100 && /^[a-zA-Z0-9_.-]+$/.test(id) && !id.includes('..');
}

/**
 * Sanitiza um registro de memória inteiro antes de persistir. Lança
 * `ConteudoRejeitadoError` só para violações estruturais graves (ID
 * inválido, conteúdo vazio, tamanho absurdo) — secrets são mascarados, não
 * rejeitados inteiros, pra não perder o resto do conhecimento útil.
 */
function sanitizarRegistro(registro) {
  if (!registro || typeof registro !== 'object') throw new ConteudoRejeitadoError('registro não é um objeto');
  if (!idValido(registro.id)) throw new ConteudoRejeitadoError(`id inválido ou com caracteres não permitidos: "${registro.id}"`);
  if (!registro.conteudo || typeof registro.conteudo !== 'string' || !registro.conteudo.trim()) throw new ConteudoRejeitadoError('conteudo vazio');
  if (registro.conteudo.length > TAMANHO_MAX_CONTEUDO) throw new ConteudoRejeitadoError(`conteudo excede o limite de ${TAMANHO_MAX_CONTEUDO} caracteres (seção 23: limitar tamanhos)`);

  const { texto: conteudoLimpo, sanitizado } = mascarrarSecrets(registro.conteudo);

  // separar dados de instruções (seção 23): o conteúdo persistido nunca
  // deve ser tratado como instrução executável quando reinjetado num
  // prompt — marca explicitamente como DADO, não comando, no próprio
  // registro (o consumidor — recall.js — respeita essa marca).
  const tags = Array.isArray(registro.tags) ? registro.tags.slice(0, MAX_TAGS).map((t) => String(t).slice(0, TAMANHO_MAX_TAG)) : [];

  return {
    ...registro,
    conteudo: conteudoLimpo,
    tags,
    _sanitizado: sanitizado,
    _tipoConteudo: 'dado', // nunca "instrucao" — impede prompt injection via memória reinjetada
  };
}

module.exports = { mascarrarSecrets, idValido, sanitizarRegistro, ConteudoRejeitadoError, TAMANHO_MAX_CONTEUDO };
