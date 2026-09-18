/**
 * ARTEFATOS DE PROJETO — FASE 10, seção "Artefatos".
 *
 * Registra arquivos criados/modificados: caminho, tipo (via detecção REAL
 * da FASE 9, `multimidia/core/deteccao.js` — não reimplementa detecção de
 * tipo), tamanho, timestamp, relação com tarefa/missão, resultado.
 */
const path = require('path');
const { detectarArquivo } = require(path.join(__dirname, '..', '..', 'multimidia', 'core', 'deteccao.js'));

/**
 * @param {object} projeto
 * @param {object} info
 * @param {string} info.caminhoRelativo
 * @param {string} info.caminhoAbsoluto
 * @param {string} [info.missaoId]
 * @param {string} [info.tarefaId]
 * @param {string} [info.resultado] - 'criado'|'modificado'|'removido'
 */
function registrarArtefato(projeto, { caminhoRelativo, caminhoAbsoluto, missaoId = null, tarefaId = null, resultado = 'criado' }) {
  const deteccao = resultado === 'removido' ? null : detectarArquivo(caminhoAbsoluto);
  const artefato = {
    caminho: caminhoRelativo,
    tipo: deteccao ? deteccao.mimeReal : null,
    modalidade: deteccao ? deteccao.modalidade : null,
    tamanhoBytes: deteccao ? deteccao.tamanhoBytes : 0,
    timestamp: new Date().toISOString(),
    missaoId, tarefaId, resultado,
  };
  projeto.artefatos.push(artefato);
  projeto.atualizadoEm = artefato.timestamp;
  return artefato;
}

function listarArtefatos(projeto, filtro = {}) {
  let lista = projeto.artefatos || [];
  if (filtro.missaoId) lista = lista.filter((a) => a.missaoId === filtro.missaoId);
  if (filtro.modalidade) lista = lista.filter((a) => a.modalidade === filtro.modalidade);
  return lista;
}

/** Estado ATUAL dos artefatos (o mais recente por caminho) — histórico completo fica em projeto.artefatos, isto aqui é a "foto de agora". */
function artefatosAtuais(projeto) {
  const porCaminho = new Map();
  for (const a of projeto.artefatos || []) porCaminho.set(a.caminho, a);
  return [...porCaminho.values()].filter((a) => a.resultado !== 'removido');
}

module.exports = { registrarArtefato, listarArtefatos, artefatosAtuais };
