/**
 * MEMÓRIA — FASE 6 (PLANO-MESTRE-AGENTE-9ROUTER.md, módulo 9, evoluído).
 *
 * A FASE 4 criou `agentes/core/memoria-agentes.js` — um log append-only de
 * uso de agente. Este módulo NÃO o substitui nem o altera (zero linhas
 * tocadas naquele arquivo) — é uma evolução COMPATÍVEL ao lado: adiciona os
 * 7 outros tipos de memória (missão, projeto, pesquisa, fato, decisão,
 * erro, solução) que o log de agente sozinho nunca cobriu, com estrutura
 * completa (seção 12), recall, expiração, invalidação, confiança e
 * sanitização real.
 */
const path = require('path');
const armazenamento = require('./core/armazenamento');
const recall = require('./core/recall');
const { estaValida, estaProximaDeExpirar } = require('./core/expiracao');
const { calcularConfianca } = require('./core/confianca');
const { TIPOS } = require('./core/tipos');

// reaproveita o log de agente da FASE 4 sem alterá-lo — só importa e expõe
const memoriaAgentesFase4 = require(path.join(__dirname, '..', 'agentes', 'core', 'memoria-agentes.js'));

let contador = 0;
function novoId(prefixo) {
  contador += 1;
  return `${prefixo}_${Date.now().toString(36)}_${contador.toString(36)}`;
}

/**
 * Grava um registro de memória (seção 12: campos completos). Sanitizado
 * automaticamente em `armazenamento.gravar`.
 */
function gravar({ tipo, conteudo, origem, tags = [], contexto = null, evidencias = [], missaoId = null, projetoId = null, confianca = 0.5, id = null }) {
  return armazenamento.gravar({
    id: id || novoId(tipo),
    tipo, conteudo, origem, tags, contexto, evidencias, missaoId, projetoId, confianca,
  });
}

/** PERGUNTA → MEMÓRIA → achou? (seção 13/20) */
function lembrar(query, opcoes = {}) {
  return recall.lembrar(query, opcoes);
}

function invalidar(tipo, id, motivo) {
  return armazenamento.invalidar(tipo, id, motivo);
}

function confirmar(tipo, id) {
  const registro = armazenamento.obter(tipo, id);
  if (!registro) return { ok: false, error: 'registro não encontrado' };
  registro.historico.push({ evento: 'confirmada', ts: Date.now() });
  return armazenamento.gravar(registro); // regrava com histórico atualizado
}

/**
 * FASE 5→6, seção 19: RESEARCH RESULT → FILTRO → NORMALIZAÇÃO → MEMÓRIA.
 * Só grava se o resultado de pesquisa passou de um limiar mínimo de
 * confiança E teve pelo menos 1 evidência real — nunca guarda "lixo".
 */
function gravarResultadoDePesquisa(resultadoPesquisa, { missaoId = null, projetoId = null } = {}) {
  if (!resultadoPesquisa || !resultadoPesquisa.ok || resultadoPesquisa.evidencias.length === 0) {
    return { ok: false, motivo: 'resultado de pesquisa sem evidência real — não guardado (seção 19: nunca lixo indiscriminado)' };
  }
  if (resultadoPesquisa.confianca < 0.2) {
    return { ok: false, motivo: `confiança baixa demais (${resultadoPesquisa.confianca}) — não guardado` };
  }
  return gravar({
    tipo: TIPOS.PESQUISA,
    conteudo: resultadoPesquisa.sintese || resultadoPesquisa.evidencias.map((e) => e.trecho).join(' '),
    origem: `pesquisa:${resultadoPesquisa.provider}`,
    tags: [resultadoPesquisa.query.toLowerCase().split(/\s+/).slice(0, 5)].flat(),
    contexto: { query: resultadoPesquisa.query, situacao: resultadoPesquisa.situacao },
    evidencias: resultadoPesquisa.evidencias,
    missaoId, projetoId,
    confianca: resultadoPesquisa.confianca,
  });
}

/**
 * FASE 6, seção 20: antes de pesquisar de novo, consulta memória.
 * @returns {{ reutilizar:boolean, registro:object|null, precisaAtualizar:boolean }}
 */
function consultarAntesDePesquisar(query, opcoes = {}) {
  // BUG REAL corrigido aqui (2026-09-15, FASE 6): memória de PESQUISA existe
  // justamente pra ser reutilizada ENTRE missões diferentes (é o próprio
  // objetivo do teste de reutilização, seção 28) — passar `missaoId` pro
  // recall filtrava incorretamente memórias de OUTRAS missões, fazendo a
  // missão B nunca encontrar o que a missão A pesquisou. `missaoId` só faz
  // sentido como filtro pra memória tipo MISSAO/PROJETO (escopo real), não
  // pra PESQUISA (conhecimento, não estado de missão).
  const { missaoId, projetoId, ...opcoesSemEscopoDeMissao } = opcoes;
  const r = recall.lembrar(query, { ...opcoesSemEscopoDeMissao, tipos: [TIPOS.PESQUISA] });
  if (!r.achou) return { reutilizar: false, registro: null, precisaAtualizar: false };
  const melhor = r.registros[0];
  return {
    reutilizar: true,
    registro: melhor,
    precisaAtualizar: estaProximaDeExpirar(melhor), // seção 20: se parcialmente desatualizada, sinaliza pra pesquisa incremental
  };
}

/** Contexto seletivo pra um agente (seção 24) — nunca a memória inteira. */
function contextoParaAgente(query, opcoes = {}) {
  const r = recall.lembrar(query, { ...opcoes, maxResultados: opcoes.maxResultados || 3 });
  return r.registros.map((reg) => `[memória ${reg.tipo}, confiança=${reg._confiancaAtual}] ${reg.conteudo}`);
}

module.exports = {
  TIPOS, gravar, lembrar, invalidar, confirmar, gravarResultadoDePesquisa, consultarAntesDePesquisar, contextoParaAgente,
  obter: armazenamento.obter, listar: armazenamento.listar, listarTodos: armazenamento.listarTodos,
  calcularConfianca, estaValida,
  agentes: memoriaAgentesFase4, // reexporta o log da FASE 4 intacto, sem duplicar
};
