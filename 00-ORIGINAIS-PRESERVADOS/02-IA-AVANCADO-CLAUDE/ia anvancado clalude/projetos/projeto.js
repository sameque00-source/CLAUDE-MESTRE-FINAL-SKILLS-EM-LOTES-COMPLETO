/**
 * PROJETOS PERSISTENTES — FASE 10 (PLANO-MESTRE-AGENTE-9ROUTER.md), entry point único.
 *
 * Conceito real de PROJETO: id, nome, descrição, diretório, estado, tarefas
 * (missões vinculadas), memória (integrada à FASE 6), decisões, histórico,
 * artefatos, resultados, testes.
 *
 * Continuidade real: MISSÃO 1 → salvar estado → encerrar; MISSÃO 2 → abrir
 * projeto → recuperar estado → continuar — sem reimplementar o Orquestrador/
 * Planejador/Executor das FASES 1-4: uma missão vinculada a um projeto
 * continua sendo uma Missão normal (mesmo schema, mesmo Executor), só que
 * seu workspace é redirecionado pro workspace PERSISTENTE do projeto (ver
 * `core/vinculo-missao.js` + a mudança mínima em `executor/core/workspace.js`).
 */
const armazenamento = require('./core/armazenamento-projeto');
const workspaceProjeto = require('./core/workspace-projeto');
const vinculo = require('./core/vinculo-missao');
const artefatos = require('./core/artefatos');
const historico = require('./core/historico');
const memoriaProjeto = require('./core/memoria-projeto');

const ESTADOS = Object.freeze({
  ATIVO: 'ativo',
  FECHADO: 'fechado',
});

let contador = 0;
function novoId() {
  contador += 1;
  return `projeto_${Date.now().toString(36)}_${contador.toString(36)}`;
}

/** Cria um projeto novo, persiste imediatamente (seção "Reabertura real": precisa existir em disco desde já). */
function criarProjeto({ nome, descricao = '' }) {
  if (!nome || !nome.trim()) throw new Error('criarProjeto: "nome" é obrigatório');
  const agora = new Date().toISOString();
  const projeto = {
    id: novoId(),
    nome: nome.trim(),
    descricao,
    diretorio: null, // preenchido abaixo (depende do id)
    estado: ESTADOS.ATIVO,
    missoes: [],
    artefatos: [],
    decisoes: [], // referências leves — o conteúdo real vive na memória (FASE 6), isto aqui é só um índice rápido
    historico: [],
    resultados: [],
    testes: [],
    criadoEm: agora,
    atualizadoEm: agora,
  };
  projeto.diretorio = workspaceProjeto.pastaWorkspace(projeto.id);
  workspaceProjeto.garantirWorkspace(projeto.id);
  historico.registrarEvento(projeto, { tipo: historico.TIPOS_EVENTO.CRIACAO, descricao: `projeto "${projeto.nome}" criado` });
  armazenamento.salvar(projeto);
  return projeto;
}

/** Abre (ou reabre) um projeto existente — recupera TUDO do disco. Retorna null honestamente se não existir (nunca inventa um projeto vazio). */
function abrirProjeto(projetoId) {
  const projeto = armazenamento.carregar(projetoId);
  if (!projeto) return null;
  if (projeto.estado === ESTADOS.FECHADO) {
    historico.registrarEvento(projeto, { tipo: historico.TIPOS_EVENTO.REABERTURA, descricao: 'projeto reaberto após fechamento' });
    projeto.estado = ESTADOS.ATIVO;
    armazenamento.salvar(projeto);
  }
  return projeto;
}

/** Alias semântico de `abrirProjeto` — usado pelos testes de "reabertura real" (seção do pedido). */
const reabrirProjeto = abrirProjeto;

function listarProjetos() {
  return armazenamento.listar();
}

/** Vincula uma Missão (Orquestrador, FASE 1) a este projeto — a partir daqui, o workspace dela é o do projeto, persistente entre missões. */
function adicionarMissao(projeto, missaoId) {
  if (!projeto.missoes.includes(missaoId)) projeto.missoes.push(missaoId);
  vinculo.vincular(missaoId, projeto.id);
  historico.registrarEvento(projeto, { tipo: historico.TIPOS_EVENTO.MISSAO_VINCULADA, descricao: `missão ${missaoId} vinculada ao projeto`, missaoId });
  armazenamento.salvar(projeto);
  return projeto;
}

function registrarArtefato(projeto, info) {
  const a = artefatos.registrarArtefato(projeto, info);
  historico.registrarEvento(projeto, { tipo: historico.TIPOS_EVENTO.ARTEFATO, descricao: `artefato ${info.resultado || 'criado'}: ${info.caminhoRelativo}`, missaoId: info.missaoId, tarefaId: info.tarefaId });
  armazenamento.salvar(projeto);
  return a;
}

function listarArtefatos(projeto, filtro) { return artefatos.listarArtefatos(projeto, filtro); }
function artefatosAtuais(projeto) { return artefatos.artefatosAtuais(projeto); }

/** Registra uma decisão REAL: grava na memória (FASE 6, escopada ao projeto) + um índice leve no próprio projeto + histórico. */
function registrarDecisao(projeto, { conteudo, tags = [], evidencias = [] }) {
  // BUG REAL corrigido aqui (2026-09-15, achado no teste 19 da FASE 9-10):
  // `gravarNaMemoriaDoProjeto` usa `TIPOS.PROJETO` como default — correto
  // pra convenção/arquitetura geral do projeto, mas uma DECISÃO específica
  // precisa do tipo `TIPOS.DECISAO` (memoria/core/tipos.js) pra ser
  // encontrada por quem consulta `memoria.listar('decisao')`/pesquisa
  // decisões. Sem isso, `registrarDecisao` gravava sob o tipo errado —
  // `ok:true` (gravação nunca falhava), mas o registro "sumia" pra quem
  // procurasse por decisões especificamente.
  const gravado = memoriaProjeto.gravarNaMemoriaDoProjeto(projeto, { tipo: 'decisao', conteudo, tags, evidencias });
  projeto.decisoes.push({ memoriaId: gravado.id, resumo: conteudo.slice(0, 200), ts: new Date().toISOString() });
  historico.registrarEvento(projeto, { tipo: historico.TIPOS_EVENTO.DECISAO, descricao: conteudo.slice(0, 200) });
  armazenamento.salvar(projeto);
  return gravado;
}

function consultarMemoria(projeto, query, opcoes) { return memoriaProjeto.consultarMemoriaDoProjeto(projeto, query, opcoes); }
function contextoParaAgente(projeto, query, opcoes) { return memoriaProjeto.contextoDoProjetoParaAgente(projeto, query, opcoes); }

function listarHistorico(projeto, filtro) { return historico.listarHistorico(projeto, filtro); }

/** Salva estado + marca FECHADO — "MISSÃO 1 → salvar estado → encerrar". */
function fecharProjeto(projeto) {
  projeto.estado = ESTADOS.FECHADO;
  historico.registrarEvento(projeto, { tipo: historico.TIPOS_EVENTO.FECHAMENTO, descricao: 'projeto encerrado' });
  armazenamento.salvar(projeto);
  return projeto;
}

/** Resolve o caminho seguro dentro do workspace do projeto (path traversal bloqueado). */
function resolverCaminhoSeguro(projeto, caminhoRelativo) {
  return workspaceProjeto.resolverCaminhoSeguro(projeto.id, caminhoRelativo);
}

module.exports = {
  ESTADOS, criarProjeto, abrirProjeto, reabrirProjeto, listarProjetos, adicionarMissao,
  registrarArtefato, listarArtefatos, artefatosAtuais, registrarDecisao, consultarMemoria,
  contextoParaAgente, listarHistorico, fecharProjeto, resolverCaminhoSeguro,
  pastaWorkspace: workspaceProjeto.pastaWorkspace, garantirWorkspace: workspaceProjeto.garantirWorkspace,
  projetoDaMissao: vinculo.projetoDaMissao,
};
