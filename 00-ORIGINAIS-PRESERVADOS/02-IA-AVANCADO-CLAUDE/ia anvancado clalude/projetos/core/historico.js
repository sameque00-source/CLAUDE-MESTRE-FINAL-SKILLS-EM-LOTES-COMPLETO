/**
 * HISTÓRICO DE PROJETO — FASE 10, seção "Versões".
 *
 * "Não precisa criar um Git completo. Precisa existir rastreabilidade
 * suficiente para: saber o que mudou; saber quando mudou; relacionar
 * mudança com missão/tarefa." — log append-only, nunca reescrito/apagado
 * (mesma filosofia de `missao.correcoes`/`missao.erros` da FASE 1 e do
 * `historico` de invalidação da memória da FASE 6: nunca perder rastro).
 */
const TIPOS_EVENTO = Object.freeze({
  CRIACAO: 'criacao',
  MISSAO_VINCULADA: 'missao_vinculada',
  ARTEFATO: 'artefato',
  DECISAO: 'decisao',
  ESTADO: 'mudanca_estado',
  FECHAMENTO: 'fechamento',
  REABERTURA: 'reabertura',
});

function registrarEvento(projeto, { tipo, descricao, missaoId = null, tarefaId = null }) {
  const evento = { tipo, descricao, missaoId, tarefaId, ts: new Date().toISOString() };
  projeto.historico.push(evento);
  projeto.atualizadoEm = evento.ts;
  return evento;
}

function listarHistorico(projeto, filtro = {}) {
  let lista = projeto.historico || [];
  if (filtro.tipo) lista = lista.filter((e) => e.tipo === filtro.tipo);
  if (filtro.missaoId) lista = lista.filter((e) => e.missaoId === filtro.missaoId);
  return lista;
}

module.exports = { TIPOS_EVENTO, registrarEvento, listarHistorico };
