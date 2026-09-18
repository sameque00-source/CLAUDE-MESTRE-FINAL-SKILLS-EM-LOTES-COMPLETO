/**
 * RECALL — FASE 6, seções 13/20/24 do pedido.
 *
 * PERGUNTA → MEMÓRIA → achou conhecimento válido? → reutilizar.
 * Não achou? → pesquisar (a decisão de pesquisar de novo fica pro
 * `pesquisa/pesquisa.js`/handler do Executor — este módulo só responde "o
 * que já sabemos").
 *
 * Seleção CONTEXTUAL (seção 24): nunca devolve a memória inteira — só os
 * registros relevantes à query, via correspondência de palavras-chave em
 * conteúdo/tags (mesmo espírito leve e determinístico do resto do projeto,
 * sem gastar uma chamada de LLM só pra decidir o que é relevante).
 */
const armazenamento = require('./armazenamento');
const { estaValida } = require('./expiracao');
const { calcularConfianca } = require('./confianca');

// BUG REAL corrigido aqui (2026-09-15, FASE 6, achado no teste de
// reutilização seção 28): o Planejador gera descrições de tarefa quase
// IDÊNTICAS entre missões parecidas (ex: "Consultar o registro npm para
// obter a versão atual do pacote X" muda só o "X") — sem filtrar o
// vocabulário-molde comum, a pontuação de relevância batia o limiar por
// causa das 6-7 palavras template compartilhadas, mesmo quando o nome do
// pacote (a ÚNICA palavra que realmente distingue duas pesquisas
// diferentes) não tinha NADA a ver — memória de "axios" era devolvida pra
// pergunta sobre "chalk". Corrigido: remove o vocabulário-molde antes de
// pontuar, sobra só o que é realmente distintivo.
const PALAVRAS_MOLDE_IGNORADAS = new Set([
  'consultar', 'registro', 'obter', 'versao', 'versão', 'atual', 'pacote', 'identificar',
  'documentacao', 'documentação', 'oficial', 'produza', 'recomendacao', 'recomendação',
  'descubra', 'descobrir', 'verificar', 'realizar', 'atraves', 'através', 'entender',
  'praticas', 'práticas', 'recomendadas', 'sobre', 'para', 'pelo', 'pela', 'esse', 'essa',
  'este', 'esta', 'qual', 'quais', 'npm', 'api', 'registro',
  'mais', 'recente', 'estavel', 'estável', 'repositorio', 'repositório', 'atual',
]);

function normalizarPalavras(texto) {
  // BUG REAL corrigido aqui (2026-09-15): `\W` no JS NÃO é Unicode-aware por
  // padrão — trata "ã"/"é"/"ç" como separador, quebrando "versão" em "vers"
  // + "o". Esse fragmento "vers" (4 letras, passava no filtro de tamanho)
  // colidia entre QUALQUER pesquisa que mencionasse "versão", inflando a
  // pontuação de relevância entre pesquisas de pacotes totalmente
  // diferentes. Corrigido com `\p{L}` (Unicode property escape — letra de
  // qualquer alfabeto) em vez de `\W`.
  // preserva hífen DENTRO da palavra (não como separador) — nomes de pacote
  // reais costumam ser compostos ("date-fns", "is-even") e sem isso
  // quebravam em fragmentos genéricos demais (ex: "date-fns" virava só
  // "date", que colide com qualquer outra lib relacionada a datas).
  return new Set(
    String(texto || '').toLowerCase().split(/[^\p{L}\p{N}-]+/u)
      .map((w) => w.replace(/^-+|-+$/g, '')) // tira hífen solto nas pontas (fim de frase, etc.)
      .filter((w) => w.length > 3 && !PALAVRAS_MOLDE_IGNORADAS.has(w))
  );
}

function pontuarRelevancia(registro, palavrasQuery) {
  // BUG REAL corrigido aqui (2026-09-15, FASE 6): a query de recall vem da
  // descrição da tarefa gerada pelo Planejador (varia de missão pra missão,
  // mesmo pra objetivos equivalentes), mas o `conteudo` gravado é a SÍNTESE
  // da pesquisa (prosa do resultado, não da pergunta) — a sobreposição de
  // palavras entre "pergunta nova" e "resposta antiga" é naturalmente baixa,
  // fazendo memória relevante nunca bater o limiar. Corrigido: também
  // considera `contexto.query` (a pergunta ORIGINAL que gerou aquele
  // registro), que é o texto certo pra comparar pergunta-com-pergunta.
  const queryOriginalArmazenada = (registro.contexto && registro.contexto.query) || '';
  const palavrasConteudo = normalizarPalavras(`${registro.conteudo} ${(registro.tags || []).join(' ')} ${queryOriginalArmazenada}`);
  let acertos = 0;
  for (const p of palavrasQuery) if (palavrasConteudo.has(p)) acertos++;
  return palavrasQuery.size > 0 ? acertos / palavrasQuery.size : 0;
}

/**
 * @param {string} query - a pergunta/tópico
 * @param {object} [opcoes]
 * @param {string[]} [opcoes.tipos] - restringe a tipos específicos (default: todos)
 * @param {string} [opcoes.missaoId] - prioriza/filtra por missão
 * @param {string} [opcoes.projetoId]
 * @param {number} [opcoes.limiarRelevancia=0.34]
 * @param {number} [opcoes.maxResultados=5]
 * @returns {{ achou:boolean, registros:object[] }}
 */
function lembrar(query, opcoes = {}) {
  const { TIPOS } = require('./tipos');
  const tiposAlvo = opcoes.tipos || Object.values(TIPOS);
  const palavrasQuery = normalizarPalavras(query);
  const limiar = opcoes.limiarRelevancia ?? 0.34;

  const candidatos = tiposAlvo.flatMap((tipo) => armazenamento.listar(tipo))
    .filter((r) => estaValida(r))
    .filter((r) => !opcoes.missaoId || r.missaoId === opcoes.missaoId || !r.missaoId)
    .filter((r) => !opcoes.projetoId || r.projetoId === opcoes.projetoId || !r.projetoId)
    .map((r) => ({ registro: r, relevancia: pontuarRelevancia(r, palavrasQuery), confianca: calcularConfianca(r) }))
    .filter((x) => x.relevancia >= limiar)
    .sort((a, b) => (b.relevancia * b.confianca) - (a.relevancia * a.confianca))
    .slice(0, opcoes.maxResultados || 5);

  return {
    achou: candidatos.length > 0,
    registros: candidatos.map((x) => ({ ...x.registro, _relevancia: Number(x.relevancia.toFixed(2)), _confiancaAtual: x.confianca })),
  };
}

module.exports = { lembrar, pontuarRelevancia, normalizarPalavras };
