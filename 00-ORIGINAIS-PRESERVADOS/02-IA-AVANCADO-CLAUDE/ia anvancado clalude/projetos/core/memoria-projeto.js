/**
 * MEMÓRIA DE PROJETO — FASE 10, seção "Memória de projeto".
 *
 * Integra com a memória real da FASE 6 (`memoria/memoria.js`) — NÃO cria um
 * armazenamento paralelo. `memoria/core/tipos.js` já tem `TIPOS.PROJETO`
 * ("decisões/convenções que atravessam várias missões do mesmo projeto",
 * validade de 1 ano) desde a FASE 6, preparado exatamente para este uso —
 * este módulo é só a integração real que faltava.
 */
const path = require('path');
const memoria = require(path.join(__dirname, '..', '..', 'memoria', 'memoria.js'));

/** Guarda decisão/arquitetura/convenção/problema/solução do PROJETO (atravessa missões). */
function gravarNaMemoriaDoProjeto(projeto, { tipo = memoria.TIPOS.PROJETO, conteudo, tags = [], origem = 'projeto', evidencias = [], confianca = 0.6 }) {
  return memoria.gravar({
    tipo, conteudo, origem, tags: [...tags, `projeto:${projeto.id}`], evidencias, confianca,
    projetoId: projeto.id, contexto: { query: conteudo },
  });
}

/** Consulta memória ESCOPADA a este projeto (nunca despeja memória de outro projeto — seção "Isolamento"). */
function consultarMemoriaDoProjeto(projeto, query, opcoes = {}) {
  return memoria.lembrar(query, { ...opcoes, projetoId: projeto.id });
}

/** Contexto seletivo (poucos registros, não a memória inteira) pra um agente atuando dentro do projeto. */
function contextoDoProjetoParaAgente(projeto, query, opcoes = {}) {
  return memoria.contextoParaAgente(query, { ...opcoes, projetoId: projeto.id });
}

module.exports = { gravarNaMemoriaDoProjeto, consultarMemoriaDoProjeto, contextoDoProjetoParaAgente };
