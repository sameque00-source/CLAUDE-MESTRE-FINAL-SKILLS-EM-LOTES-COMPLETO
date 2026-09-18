/**
 * WORKSPACE DE PROJETO — FASE 10, seção "Isolamento".
 *
 * MESMO padrão exato de `executor/core/workspace.js` (FASE 3) — path
 * traversal bloqueado do mesmo jeito, só que a raiz é a pasta do PROJETO em
 * vez da pasta da MISSÃO. Projeto A e Projeto B nunca compartilham
 * diretório: cada um tem sua própria raiz resolvida por `pastaProjeto`
 * (armazenamento-projeto.js) — dois projetos diferentes fisicamente não têm
 * como colidir (ids diferentes → pastas diferentes).
 */
const fs = require('fs');
const path = require('path');
const { pastaProjeto } = require('./armazenamento-projeto');

function pastaWorkspace(projetoId) {
  return path.join(pastaProjeto(projetoId), 'workspace');
}

function garantirWorkspace(projetoId) {
  const dir = pastaWorkspace(projetoId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Idêntico em espírito a `executor/core/workspace.js:resolverCaminhoSeguro` — nunca deixa escapar da raiz do PROJETO. */
function resolverCaminhoSeguro(projetoId, caminhoRelativo) {
  const raiz = garantirWorkspace(projetoId);
  const alvo = path.resolve(raiz, caminhoRelativo);
  if (!alvo.startsWith(raiz + path.sep) && alvo !== raiz) {
    throw new Error(`caminho "${caminhoRelativo}" tentaria escrever fora do workspace do projeto (bloqueado por segurança)`);
  }
  return alvo;
}

module.exports = { pastaWorkspace, garantirWorkspace, resolverCaminhoSeguro };
