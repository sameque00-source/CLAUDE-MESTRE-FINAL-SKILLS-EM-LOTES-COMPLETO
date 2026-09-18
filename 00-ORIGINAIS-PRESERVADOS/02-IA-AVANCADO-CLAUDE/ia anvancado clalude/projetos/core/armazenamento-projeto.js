/**
 * ARMAZENAMENTO DE PROJETO — FASE 10.
 *
 * Persistência real em disco, mesmo padrão atômico (.tmp + rename) já usado
 * em `orquestrador/core/persistencia.js` (FASE 1) e `memoria/core/
 * armazenamento.js` (FASE 6) — não inventa um mecanismo novo de escrita.
 * 1 pasta por projeto: `projetos/dados/<id>/estado.json` (metadados +
 * missões + artefatos + histórico) + `projetos/dados/<id>/workspace/`
 * (arquivos reais do projeto, isolados — ver workspace-projeto.js).
 */
const fs = require('fs');
const path = require('path');

const PROJETOS_DIR = path.join(__dirname, '..', 'dados');

function pastaProjeto(projetoId) {
  return path.join(PROJETOS_DIR, projetoId);
}
function caminhoEstado(projetoId) {
  return path.join(pastaProjeto(projetoId), 'estado.json');
}

function salvar(projeto) {
  const dir = pastaProjeto(projeto.id);
  fs.mkdirSync(dir, { recursive: true });
  const destino = caminhoEstado(projeto.id);
  const tmp = `${destino}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(projeto, null, 2), 'utf8');
  fs.renameSync(tmp, destino);
  return true;
}

function carregar(projetoId) {
  try {
    return JSON.parse(fs.readFileSync(caminhoEstado(projetoId), 'utf8'));
  } catch {
    return null;
  }
}

function existe(projetoId) {
  return fs.existsSync(caminhoEstado(projetoId));
}

function listar() {
  if (!fs.existsSync(PROJETOS_DIR)) return [];
  return fs.readdirSync(PROJETOS_DIR)
    .filter((nome) => existe(nome))
    .map((nome) => carregar(nome))
    .filter(Boolean);
}

module.exports = { salvar, carregar, existe, listar, pastaProjeto, caminhoEstado, PROJETOS_DIR };
