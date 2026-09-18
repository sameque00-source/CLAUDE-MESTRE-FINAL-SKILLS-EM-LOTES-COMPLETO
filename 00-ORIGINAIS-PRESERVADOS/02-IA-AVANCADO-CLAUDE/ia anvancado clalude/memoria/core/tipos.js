/**
 * TIPOS DE MEMÓRIA — FASE 6, seção 11 do pedido.
 * Mesmo espírito do classificador de complexidade (FASE 2): enum fechado e
 * auditável, não "o que o LLM achar que é".
 */
const TIPOS = Object.freeze({
  MISSAO: 'missao',       // fatos/decisões específicos de UMA missão
  PROJETO: 'projeto',      // decisões/convenções que atravessam várias missões do mesmo projeto
  AGENTE: 'agente',        // desempenho de um especialista (extensão do log da FASE 4)
  PESQUISA: 'pesquisa',    // resultado de pesquisa real, reutilizável
  FATO: 'fato',            // conhecimento factual validado
  DECISAO: 'decisao',      // decisão tomada (com justificativa) — nunca reescrita, só invalidada
  ERRO: 'erro',            // erro conhecido (padrão de falha já visto)
  SOLUCAO: 'solucao',      // solução conhecida pra um erro/problema
});

// validade padrão por tipo — mesma filosofia de VALIDADE_MS do cache de
// pesquisa (seção 16 do pedido: "não usar TTL fixo pra tudo"), mas em nível
// de MEMÓRIA (mais duradoura por natureza que o cache bruto de busca).
const VALIDADE_PADRAO_MS = Object.freeze({
  [TIPOS.MISSAO]: 90 * 24 * 60 * 60 * 1000,      // 90 dias
  [TIPOS.PROJETO]: 365 * 24 * 60 * 60 * 1000,     // 1 ano — convenção de projeto muda pouco
  [TIPOS.AGENTE]: 180 * 24 * 60 * 60 * 1000,      // 180 dias
  [TIPOS.PESQUISA]: 14 * 24 * 60 * 60 * 1000,     // 14 dias — pesquisa web pode ficar desatualizada
  [TIPOS.FATO]: 180 * 24 * 60 * 60 * 1000,        // 180 dias
  [TIPOS.DECISAO]: 365 * 24 * 60 * 60 * 1000,     // 1 ano — decisão não expira sozinha, só é invalidada
  [TIPOS.ERRO]: 365 * 24 * 60 * 60 * 1000,        // 1 ano — padrão de erro é conhecimento durável
  [TIPOS.SOLUCAO]: 365 * 24 * 60 * 60 * 1000,     // 1 ano
});

module.exports = { TIPOS, VALIDADE_PADRAO_MS };
