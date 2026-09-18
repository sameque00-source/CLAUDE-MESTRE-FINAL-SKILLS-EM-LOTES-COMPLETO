/**
 * CONTRATO DE AGENTE — FASE 4, seção 3 do pedido.
 *
 * INPUT/CONTEXT/OBJECTIVE/TOOLS/CONSTRAINTS/EXPECTED_OUTPUT/SUCCESS_CRITERIA
 * → STATUS/RESULTADO/ARQUIVOS/TESTES/ERROS/EVIDÊNCIAS/RECOMENDAÇÕES.
 *
 * O lado de SAÍDA já existe desde a FASE 1 (`Tarefa.criarResultado`) — não
 * duplicado aqui, só documentado. Este módulo formaliza o lado de ENTRADA:
 * monta o bloco de contrato que é prependado à PERSONA do agente antes de
 * qualquer chamada de LLM (geração de código, texto, revisão).
 */

/**
 * @param {object} opts
 * @param {string} opts.persona - corpo real do agente (.md), a instrução comportamental
 * @param {string} opts.objetivo - a tarefa em si
 * @param {string} [opts.contexto] - contexto relevante (achados de dependências, resumo)
 * @param {string[]} [opts.ferramentas] - ferramentas permitidas pro especialista
 * @param {string[]} [opts.restricoes] - restrições reais (R$0, sem VPS, sem secrets, etc.)
 * @param {string} [opts.saidaEsperada]
 * @param {string[]} [opts.criteriosSucesso]
 */
function montarContrato({ persona, objetivo, contexto = '', ferramentas = [], restricoes = [], saidaEsperada = '', criteriosSucesso = [] }) {
  const restricoesPadrao = ['R$0 — nenhuma ação paga', 'nunca expor secrets/tokens/senhas', 'nunca tocar VPS/FiveM/FXServer', 'escrever só dentro do workspace da missão'];
  return `${persona ? `${persona}\n\n---\n` : ''}CONTRATO DESTA TAREFA:

INPUT/OBJECTIVE: ${objetivo}
${contexto ? `CONTEXT: ${contexto}\n` : ''}TOOLS PERMITIDAS: ${ferramentas.length ? ferramentas.join(', ') : '(nenhuma além de raciocínio)'}
CONSTRAINTS: ${[...restricoesPadrao, ...restricoes].join('; ')}
EXPECTED_OUTPUT: ${saidaEsperada || 'resultado real e verificável, nunca "deveria funcionar"'}
SUCCESS_CRITERIA: ${criteriosSucesso.length ? criteriosSucesso.join('; ') : 'critério de conclusão da própria tarefa'}`;
}

/** Valida que um resultado (Tarefa.criarResultado) tem a forma mínima exigida pelo contrato. */
function validarResultadoPadrao(resultado) {
  const campos = ['status', 'resultado', 'arquivos', 'erros', 'evidencias', 'testes', 'recomendacoes'];
  const faltando = campos.filter((c) => !(c in resultado));
  return { valido: faltando.length === 0, faltando };
}

module.exports = { montarContrato, validarResultadoPadrao };
