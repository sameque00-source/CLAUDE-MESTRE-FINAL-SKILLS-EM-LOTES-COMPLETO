/**
 * ESTRATÉGIA DE CORREÇÃO — FASE 8, seções "Correção inteligente" e "Evitar
 * loops infinitos" do pedido.
 *
 * Regra central do pedido: "não tentar a mesma coisa repetidamente". Se duas
 * tentativas seguidas produzem essencialmente a MESMA falha (mesma
 * categoria de diagnóstico), a próxima ação NUNCA é "tentar de novo do
 * mesmo jeito" — é uma mudança real de estratégia, específica por categoria.
 */
const { CATEGORIAS } = require('./diagnostico');

const ACOES = Object.freeze({
  TENTAR: 'tentar',                 // 1ª tentativa, ou categoria mudou — segue a estratégia padrão da categoria
  TROCAR_MODELO: 'trocar_modelo',   // exclui o(s) modelo(s) que falharam, tenta com outro
  TROCAR_FERRAMENTA: 'trocar_ferramenta',
  DECOMPOR: 'decompor',             // contexto grande repetido — dividir a tarefa
  REPLANEJAR: 'replanejar',         // plano inadequado — gerar novo plano parcial
  CONSULTAR_MEMORIA: 'consultar_memoria', // antes de corrigir de novo, ver se já resolvemos isso antes
  BLOQUEAR: 'bloquear',             // sem estratégia viável restante — não insistir
});

/** Assinatura curta pra comparar "é essencialmente o mesmo erro de novo?" sem exigir string idêntica. */
function assinatura(mensagem = '') {
  return String(mensagem || '').toLowerCase().replace(/[0-9a-f]{8,}/g, '#').replace(/\s+/g, ' ').trim().slice(0, 140);
}

/**
 * @param {Array<{categoria:string, mensagem:string}>} historico - diagnósticos das tentativas anteriores, em ordem
 * @returns {{acao:string, motivo:string, repeticaoDetectada:boolean}}
 */
function decidirProximaEstrategia(historico = []) {
  if (historico.length === 0) {
    return { acao: ACOES.TENTAR, motivo: 'primeira tentativa', repeticaoDetectada: false };
  }

  const ultima = historico[historico.length - 1];
  const penultima = historico.length >= 2 ? historico[historico.length - 2] : null;

  const repeticaoDetectada = !!penultima
    && penultima.categoria === ultima.categoria
    && assinatura(penultima.mensagem) === assinatura(ultima.mensagem);

  const mesmaCategoriaSeguidas = !!penultima && penultima.categoria === ultima.categoria;

  if (!mesmaCategoriaSeguidas) {
    // categoria diferente da tentativa anterior: ainda vale tentar corrigir
    // do jeito padrão dessa categoria (não é repetição, é um problema novo).
    return { acao: ACOES.TENTAR, motivo: `categoria mudou (${penultima ? penultima.categoria : 'nenhuma'} → ${ultima.categoria}) — não é repetição, tenta corrigir normalmente`, repeticaoDetectada: false };
  }

  // mesma categoria 2x seguidas (ou mais): "não tentar a mesma coisa
  // repetidamente" — muda de estratégia, específico por categoria.
  const motivoBase = repeticaoDetectada
    ? `mesma falha exata repetida (categoria=${ultima.categoria}) — mudando de estratégia`
    : `mesma categoria de falha 2x seguidas (${ultima.categoria}), mensagens diferentes — mudando de estratégia por precaução`;

  switch (ultima.categoria) {
    case CATEGORIAS.CODIGO:
    case CATEGORIAS.MODELO:
      return { acao: ACOES.TROCAR_MODELO, motivo: motivoBase, repeticaoDetectada };
    case CATEGORIAS.FERRAMENTA:
      return { acao: ACOES.TROCAR_FERRAMENTA, motivo: motivoBase, repeticaoDetectada };
    case CATEGORIAS.CONTEXTO:
      return { acao: ACOES.DECOMPOR, motivo: motivoBase, repeticaoDetectada };
    case CATEGORIAS.PLANEJAMENTO:
      return { acao: ACOES.REPLANEJAR, motivo: motivoBase, repeticaoDetectada };
    case CATEGORIAS.DEPENDENCIA:
    case CATEGORIAS.CONFIGURACAO:
    case CATEGORIAS.AMBIENTE:
      // ambiente/dependência/configuração raramente têm uma "troca" óbvia
      // disponível pro Executor sozinho consertar (ex: pacote não instalável
      // neste ambiente sem npm install) — depois da repetição, não insiste:
      // sinaliza bloqueio honesto em vez de queimar mais tentativas no vazio.
      return { acao: ACOES.BLOQUEAR, motivo: `${motivoBase} — categoria não tem correção automática viável após repetição`, repeticaoDetectada };
    case CATEGORIAS.PESQUISA:
      // pesquisa sem fonte não é bloqueante (handlers-tarefa.js já trata como
      // 'ok' com nota honesta) — mas se está no histórico de correção é
      // porque outra coisa depende disso; consulta memória antes de insistir.
      return { acao: ACOES.CONSULTAR_MEMORIA, motivo: motivoBase, repeticaoDetectada };
    case CATEGORIAS.VALIDACAO:
      return { acao: ACOES.CONSULTAR_MEMORIA, motivo: `${motivoBase} — antes de tentar corrigir de novo, consulta se um veto parecido já foi resolvido antes`, repeticaoDetectada };
    default:
      return { acao: ACOES.BLOQUEAR, motivo: `${motivoBase} — categoria desconhecida, sem estratégia de correção definida`, repeticaoDetectada };
  }
}

module.exports = { ACOES, decidirProximaEstrategia, assinatura };
