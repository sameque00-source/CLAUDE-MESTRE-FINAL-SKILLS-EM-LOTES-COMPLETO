/**
 * PERSISTÊNCIA — FASE 1, seção 13 do pedido.
 *
 * 1 pasta por missão em `orquestrador/missions/<id>/MISSION_STATE.json`.
 * Escrita atômica (escreve em .tmp, depois renomeia) para nunca deixar um
 * JSON parcialmente escrito no lugar do bom em caso de crash no meio da
 * gravação. Best-effort: falha de persistência NUNCA derruba a missão em
 * memória (mesmo princípio do scoring.js) — só fica logada.
 */
const fs = require('fs');
const path = require('path');

const MISSIONS_DIR = path.join(__dirname, '..', 'missions');

function pastaDaMissao(missaoId) {
  return path.join(MISSIONS_DIR, missaoId);
}

function caminhoEstado(missaoId) {
  return path.join(pastaDaMissao(missaoId), 'MISSION_STATE.json');
}

/** Salva o estado da missão em disco. Nunca lança — best-effort, loga em caso de falha. */
function salvar(missao) {
  try {
    const dir = pastaDaMissao(missao.id);
    fs.mkdirSync(dir, { recursive: true });
    const destino = caminhoEstado(missao.id);
    const tmp = `${destino}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(missao, null, 2), 'utf8');
    fs.renameSync(tmp, destino); // rename é atômico no mesmo volume
    return true;
  } catch (e) {
    console.error(`[persistencia] falha ao salvar missão ${missao && missao.id}: ${e.message}`);
    return false;
  }
}

/** Carrega uma missão específica pelo id. Retorna null se não existir/corrompida. */
function carregar(missaoId) {
  try {
    const raw = fs.readFileSync(caminhoEstado(missaoId), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Varre todas as missões persistidas e devolve as que NÃO estão em estado
 * terminal (CONCLUIDA) — candidatas a retomada automática (seção 19 do
 * plano mestre: "o Orquestrador, ao subir, lê todo missions/*.MISSION_STATE
 * com fase_atual != concluída e oferece retomar").
 */
function listarMissoesIncompletas() {
  if (!fs.existsSync(MISSIONS_DIR)) return [];
  const resultado = [];
  for (const nome of fs.readdirSync(MISSIONS_DIR)) {
    const missao = carregar(nome);
    if (missao && missao.estado !== 'CONCLUIDA') resultado.push(missao);
  }
  return resultado;
}

function listarTodasMissoes() {
  if (!fs.existsSync(MISSIONS_DIR)) return [];
  return fs.readdirSync(MISSIONS_DIR)
    .map((nome) => carregar(nome))
    .filter(Boolean);
}

module.exports = { salvar, carregar, listarMissoesIncompletas, listarTodasMissoes, MISSIONS_DIR, pastaDaMissao };
