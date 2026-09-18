/**
 * VÍNCULO MISSÃO↔PROJETO — FASE 10, seção "Continuidade".
 *
 * Quando uma missão pertence a um projeto, ela deve escrever/ler no
 * WORKSPACE DO PROJETO (persistente entre missões), não no workspace
 * isolado por missão da FASE 3 (que existe pra missões avulsas, sem
 * projeto). Este módulo só guarda esse mapeamento — quem realmente
 * REDIRECIONA o workspace é `executor/core/workspace.js`, que consulta este
 * mapa (mudança mínima e cirúrgica, ver seção 6 do relatório da FASE 9-10).
 *
 * Mapa pequeno, persistente, em `projetos/dados/_mapa-missao-projeto.json`
 * — nunca reescreve o workspace.js da FASE 3 pra "saber sobre projeto"; o
 * workspace.js só faz UMA pergunta a este módulo ("essa missão pertence a
 * um projeto?") e segue com sua própria lógica de sempre se a resposta for não.
 */
const fs = require('fs');
const path = require('path');

const MAPA_PATH = path.join(__dirname, '..', 'dados', '_mapa-missao-projeto.json');

function carregarMapa() {
  try { return JSON.parse(fs.readFileSync(MAPA_PATH, 'utf8')); } catch { return {}; }
}
function salvarMapa(mapa) {
  fs.mkdirSync(path.dirname(MAPA_PATH), { recursive: true });
  const tmp = `${MAPA_PATH}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(mapa, null, 2), 'utf8');
  fs.renameSync(tmp, MAPA_PATH);
}

function vincular(missaoId, projetoId) {
  const mapa = carregarMapa();
  mapa[missaoId] = projetoId;
  salvarMapa(mapa);
}

function projetoDaMissao(missaoId) {
  const mapa = carregarMapa();
  return mapa[missaoId] || null;
}

function desvincular(missaoId) {
  const mapa = carregarMapa();
  delete mapa[missaoId];
  salvarMapa(mapa);
}

module.exports = { vincular, projetoDaMissao, desvincular };
