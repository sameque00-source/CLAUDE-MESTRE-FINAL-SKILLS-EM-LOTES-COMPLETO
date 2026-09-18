/**
 * ARMAZENAMENTO — FASE 6, seções 12/23/25 do pedido.
 * 1 arquivo JSON por TIPO (`memoria/dados/<tipo>.json`, dict por id) —
 * atômico (escreve em .tmp + rename, mesmo padrão da persistência da FASE
 * 1), sempre passando pela sanitização antes de gravar. Sobrevive a
 * reinício de processo (é a própria definição de "persistente").
 */
const fs = require('fs');
const path = require('path');
const { TIPOS, VALIDADE_PADRAO_MS } = require('./tipos');
const { sanitizarRegistro, idValido } = require('./sanitizacao');

const DADOS_DIR = path.join(__dirname, '..', 'dados');

function caminhoDoTipo(tipo) {
  if (!Object.values(TIPOS).includes(tipo)) throw new Error(`tipo de memória desconhecido: "${tipo}" — nunca inventar tipo fora do enum`);
  return path.join(DADOS_DIR, `${tipo}.json`);
}

function carregarTipo(tipo) {
  try {
    return JSON.parse(fs.readFileSync(caminhoDoTipo(tipo), 'utf8'));
  } catch {
    return {};
  }
}

function salvarTipo(tipo, dados) {
  try {
    fs.mkdirSync(DADOS_DIR, { recursive: true });
    const destino = caminhoDoTipo(tipo);
    const tmp = `${destino}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(dados, null, 2), 'utf8');
    fs.renameSync(tmp, destino);
    return true;
  } catch (e) {
    console.error(`[memoria/armazenamento] falha ao salvar tipo "${tipo}" (não bloqueante): ${e.message}`);
    return false;
  }
}

/**
 * Grava (ou substitui) um registro de memória. Sempre sanitiza antes.
 * @param {object} registro - { id, tipo, conteudo, origem, tags, contexto, evidencias, missaoId, projetoId }
 * @returns {{ ok:boolean, id?:string, error?:string }}
 */
function gravar(registro) {
  try {
    const agora = Date.now();
    const validadeMs = registro.validadeMs || VALIDADE_PADRAO_MS[registro.tipo] || VALIDADE_PADRAO_MS[TIPOS.FATO];
    const limpo = sanitizarRegistro({
      ...registro,
      criadoEm: registro.criadoEm || agora,
      atualizadoEm: agora,
      expiraEm: agora + validadeMs,
      confianca: typeof registro.confianca === 'number' ? Math.min(registro.confianca, 0.97) : 0.5,
      invalidada: false,
      motivoInvalidacao: null,
      historico: registro.historico || [],
    });
    const dados = carregarTipo(limpo.tipo);
    dados[limpo.id] = limpo;
    salvarTipo(limpo.tipo, dados);
    return { ok: true, id: limpo.id };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function obter(tipo, id) {
  if (!idValido(id)) return null;
  const dados = carregarTipo(tipo);
  return dados[id] || null;
}

function listar(tipo) {
  return Object.values(carregarTipo(tipo));
}

function listarTodos() {
  return Object.values(TIPOS).flatMap((tipo) => listar(tipo));
}

/** Invalida (nunca apaga) — seção 17: "não apagar silenciosamente, registrar a invalidação". */
function invalidar(tipo, id, motivo) {
  const dados = carregarTipo(tipo);
  const registro = dados[id];
  if (!registro) return { ok: false, error: 'registro não encontrado' };
  registro.invalidada = true;
  registro.motivoInvalidacao = motivo || 'sem motivo declarado';
  registro.historico.push({ evento: 'invalidada', motivo, ts: Date.now() });
  registro.atualizadaEm = Date.now();
  salvarTipo(tipo, dados);
  return { ok: true };
}

module.exports = { gravar, obter, listar, listarTodos, invalidar, carregarTipo, DADOS_DIR };
