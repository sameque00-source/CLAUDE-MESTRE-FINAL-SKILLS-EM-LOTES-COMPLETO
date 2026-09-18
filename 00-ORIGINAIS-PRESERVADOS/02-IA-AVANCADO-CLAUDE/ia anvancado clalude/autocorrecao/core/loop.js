/**
 * LOOP AUTÔNOMO CONTROLADO — FASE 8, seções "Loop autônomo" e "Evitar loops
 * infinitos" do pedido.
 *
 * executar → avaliar → falhou? → (não: revisar/concluir | sim: diagnosticar
 * → decidir estratégia → corrigir → repetir) → para só em SUCESSO_VALIDADO
 * ou FALHA_HONESTA.
 *
 * Genérico de propósito: recebe funções (`executar`/`avaliar`/`corrigir`) em
 * vez de conhecer implementação/QA/pesquisa especificamente — quem usa este
 * módulo (ex: `handleImplementacao`) fornece o comportamento real; o loop só
 * garante a DISCIPLINA (orçamento, diagnóstico, não repetir a mesma coisa,
 * parar honestamente).
 */
const orcamentoModulo = require('./orcamento');
const diagnosticoModulo = require('./diagnostico');
const estrategiaModulo = require('./estrategia');

/**
 * @param {object} config
 * @param {object} [config.orcamento] - de `criarOrcamento()`; cria um padrão se omitido
 * @param {object} [config.contextoInicial] - estado passado à 1ª chamada de `executar`
 * @param {(contexto:object, meta:{tentativa:number, historico:object[]}) => Promise<object>} config.executar
 * @param {(resultado:object, contexto:object) => {sucesso:boolean, mensagemErro?:string, contextoDiagnostico?:object}} config.avaliar
 * @param {(info:{diagnostico:object, estrategia:object, contextoAnterior:object, historico:object[], resultado:object}) => Promise<object>} [config.corrigir] - produz o novo `contexto` pra próxima tentativa; se omitido, qualquer falha já para em FALHA_HONESTA (não há como corrigir sem essa função)
 * @returns {Promise<{status:'SUCESSO_VALIDADO'|'FALHA_HONESTA', resultado:object, historico:object[], orcamento:object, motivo?:string, tentativas?:number}>}
 */
async function executarComAutocorrecao(config) {
  const orc = config.orcamento || orcamentoModulo.criarOrcamento();
  const historico = [];
  let contexto = config.contextoInicial || {};
  let ultimoResultado = null;

  for (;;) {
    const chk = orcamentoModulo.dentroDoOrcamento(orc);
    if (!chk.dentro) {
      return { status: 'FALHA_HONESTA', motivo: chk.motivo, resultado: ultimoResultado, historico, orcamento: orc };
    }
    orcamentoModulo.registrarTentativa(orc);
    orcamentoModulo.registrarChamada(orc);

    ultimoResultado = await config.executar(contexto, { tentativa: orc.tentativas, historico });
    const avaliacao = config.avaliar(ultimoResultado, contexto);

    if (avaliacao.sucesso) {
      return { status: 'SUCESSO_VALIDADO', resultado: ultimoResultado, historico, orcamento: orc, tentativas: orc.tentativas };
    }

    const diag = diagnosticoModulo.diagnosticar(avaliacao.mensagemErro || '', avaliacao.contextoDiagnostico || {});
    historico.push({ tentativa: orc.tentativas, categoria: diag.categoria, mensagem: avaliacao.mensagemErro || '', causaProvavel: diag.causaProvavel });

    const estrat = estrategiaModulo.decidirProximaEstrategia(historico);
    if (estrat.acao === estrategiaModulo.ACOES.BLOQUEAR) {
      return { status: 'FALHA_HONESTA', motivo: estrat.motivo, resultado: ultimoResultado, historico, orcamento: orc };
    }
    if (typeof config.corrigir !== 'function') {
      return { status: 'FALHA_HONESTA', motivo: 'sem função de correção configurada para esta tarefa — falha reportada sem tentar de novo às cegas', resultado: ultimoResultado, historico, orcamento: orc };
    }
    contexto = (await config.corrigir({ diagnostico: diag, estrategia: estrat, contextoAnterior: contexto, historico, resultado: ultimoResultado })) || contexto;
  }
}

module.exports = { executarComAutocorrecao };
