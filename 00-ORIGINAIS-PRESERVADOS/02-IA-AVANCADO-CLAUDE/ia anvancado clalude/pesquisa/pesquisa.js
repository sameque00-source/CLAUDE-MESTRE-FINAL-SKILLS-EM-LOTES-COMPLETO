/**
 * PESQUISA — FASE 5 (PLANO-MESTRE-AGENTE-9ROUTER.md, camada de pesquisa real
 * do especialista `research`).
 *
 * MISSÃO → PLANEJADOR → precisaPesquisa → RESEARCH AGENT → BUSCA WEB REAL →
 * COLETA FONTES → VALIDAÇÃO → SÍNTESE → (memória, integrada no handler do
 * Executor, não aqui — este módulo é "pesquisa pura", desacoplado de missão).
 *
 * Nunca inventa fonte, nunca simula resultado, nunca transforma
 * conhecimento interno do modelo em "fonte web" — se a busca real não
 * encontra nada, devolve status="indisponivel"/"sem_resultado" honesto.
 */
const providerBusca = require('./core/provider-busca');
const cache = require('./core/cache-pesquisa');
const adaptativa = require('./core/pesquisa-adaptativa');
const { classificarFonte } = require('./core/classificador-fonte');
const { confiancaDeItem, confiancaAgregada } = require('./core/confianca');
const { triangular } = require('./core/triangulacao');

/**
 * BUG REAL corrigido aqui (2026-09-15, FASE 5): a query recebida pela
 * pesquisa quase sempre é a DESCRIÇÃO da tarefa em linguagem natural (ex:
 * "Identificar a versão atual do pacote npm express via API do registro
 * npm."), não o nome limpo do pacote — o provider npm (que precisa do nome
 * exato pra montar a URL do registry) recebia a frase inteira e batia
 * HTTP 404 sempre. Extrai o nome real quando o tipo de busca é "pacote".
 */
function extrairNomePacote(texto) {
  const alvo = String(texto || '');
  const padroes = [
    /\b(?:pacote|package|biblioteca|library)\s+(?:npm\s+)?["'`]?([a-zA-Z0-9@][a-zA-Z0-9@/_.-]{1,60})["'`]?/i,
    /\bnpm\s+["'`]?([a-zA-Z0-9@][a-zA-Z0-9@/_.-]{1,60})["'`]?/i,
    // fallback mais fraco: "documentação (oficial) do/da <Nome>" — captura o
    // nome próprio mesmo sem a palavra "pacote"/"npm" explícita na frase.
    /\bdocumenta[cç][aã]o\s+(?:oficial\s+)?(?:do|da|de)\s+["'`]?([A-Z][a-zA-Z0-9@/_.-]{1,40})["'`]?/,
  ];
  for (const re of padroes) {
    const m = alvo.match(re);
    if (m) return m[1].replace(/[.,;:!?]+$/, ''); // tira pontuação de fim de frase colada
  }
  return null;
}

/**
 * @param {string} query
 * @param {object} [opcoes]
 * @param {'pacote'|'geral'|'atual'|'comparacao'|'conceito'} [opcoes.tipo]
 * @param {'documentacao'|'versao_pacote'|'preco'|'noticia'|'fato_geral'} [opcoes.categoria] - afeta TTL do cache
 * @param {number} [opcoes.complexidade]
 * @param {boolean} [opcoes.controversa]
 * @param {boolean} [opcoes.forcarNovaPesquisa] - ignora cache (usado no teste de atualização, seção 29)
 * @returns {Promise<object>} resultado estruturado — ver seção 4 do pedido
 */
async function pesquisar(query, opcoes = {}) {
  const q = String(query || '').trim();
  if (!q) return { ok: false, status: 'erro', error: 'query vazia', evidencias: [], fontes: [] };

  if (!opcoes.forcarNovaPesquisa) {
    const cacheado = cache.obter(q, opcoes.categoria);
    if (cacheado) {
      return { ...cacheado.resultado, deCache: true, cacheadoEm: new Date(cacheado.criadoEm).toISOString() };
    }
  }

  const profundidade = adaptativa.determinarProfundidade(opcoes);
  // quando a busca é de pacote, tenta extrair o nome limpo da query em
  // linguagem natural — o provider npm precisa do nome exato, não da frase.
  const nomeExtraido = extrairNomePacote(q);
  const queryEfetiva = opcoes.tipo === 'pacote' ? (nomeExtraido || q) : q;
  let resultadoBusca = await providerBusca.search(queryEfetiva, { tipo: opcoes.tipo, ordemForcada: opcoes.ordemForcada });

  // fallback real: se a busca com a query original/frase falhou e existe um
  // nome de pacote extraível na frase (mesmo sem o tipo ter sido marcado
  // "pacote" explicitamente — ex: "consulte a documentação do Express"),
  // tenta de novo com o nome extraído antes de desistir.
  if (!resultadoBusca.ok && nomeExtraido && queryEfetiva !== nomeExtraido) {
    // nomes de pacote npm são convencionalmente minúsculos — o nome extraído
    // de uma frase em português pode vir capitalizado ("Express").
    const tentativaExtraida = await providerBusca.search(nomeExtraido.toLowerCase(), { tipo: 'pacote' });
    if (tentativaExtraida.ok) resultadoBusca = tentativaExtraida;
    else resultadoBusca.tentativas.push(...tentativaExtraida.tentativas.map((t) => ({ ...t, motivo: `[retry c/ nome extraído "${nomeExtraido}"] ${t.motivo}` })));
  }

  if (!resultadoBusca.ok) {
    // FASE 5, seção 10: falha de pesquisa NUNCA inventa — devolve status
    // indisponível, explica tentativa/provider/erro/impacto.
    return {
      ok: false, status: 'indisponivel', query: q,
      tentativas: resultadoBusca.tentativas,
      error: resultadoBusca.error,
      impacto: 'nenhuma evidência real obtida — qualquer conclusão sobre este tópico deve ser marcada [PRECISA VERIFICAÇÃO], nunca apresentada como fato',
      evidencias: [], fontes: [], confianca: 0, ts: new Date().toISOString(),
    };
  }

  const itensLimitados = resultadoBusca.itens.slice(0, profundidade.numFontesAlvo);
  const evidencias = itensLimitados.map((item) => {
    const fonte = classificarFonte(item.url, item.origem);
    return {
      query: q,
      fonte: item.origem,
      url: item.url,
      titulo: item.titulo,
      data: item.data,
      trecho: item.trecho,
      evidencia: item.trecho,
      confianca: confiancaDeItem(item),
      classificacaoFonte: fonte.rotulo,
      pesoFonte: fonte.peso,
    };
  });

  const resultadoTriangulacao = await triangular(evidencias, q);
  const confiancaFinal = confiancaAgregada(evidencias, resultadoTriangulacao.situacao);

  const resultado = {
    ok: true,
    status: evidencias.length > 0 ? 'ok' : 'sem_resultado',
    query: q,
    evidencias,
    fontes: evidencias.map((e) => e.url).filter(Boolean),
    sintese: resultadoTriangulacao.sintese || evidencias.map((e) => e.trecho).join(' '),
    situacao: resultadoTriangulacao.situacao, // 'concordancia'|'contradicao'|'insuficiente'
    afirmacoes: resultadoTriangulacao.afirmacoes,
    motivoDivergencia: resultadoTriangulacao.motivo,
    confianca: confiancaFinal,
    provider: resultadoBusca.provider,
    tentativas: resultadoBusca.tentativas,
    profundidade: profundidade.motivo,
    ts: new Date().toISOString(),
  };

  cache.salvar(q, opcoes.categoria, resultado);
  return resultado;
}

module.exports = { pesquisar, providerBusca, cache };
