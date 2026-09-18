/**
 * MEMÓRIA DE ERROS — FASE 8, seções "Memória de erros" e "Aprendizado de
 * soluções" do pedido.
 *
 * Usa os tipos ERRO e SOLUCAO já existentes na memória da FASE 6
 * (`memoria/core/tipos.js`) — não inventa tipo novo. Registra
 * erro→causa→solução→resultado; numa missão nova, CONSULTA primeiro (nunca
 * cegamente — "deve validar novamente", conforme o pedido explicita), e a
 * sugestão volta como CONTEXTO extra pro prompt de correção, nunca como uma
 * ação aplicada automaticamente sem nova tentativa/validação real.
 */
const path = require('path');
const memoria = require(path.join(__dirname, '..', '..', 'memoria', 'memoria.js'));

/**
 * Registra um erro já diagnosticado e (se houver) a solução que funcionou.
 * @param {object} d
 * @param {string} d.categoria - categoria do diagnóstico (autocorrecao/core/diagnostico.js)
 * @param {string} d.mensagemErro
 * @param {string} d.causaProvavel
 * @param {string|null} d.solucaoAplicada - descrição da correção tentada
 * @param {boolean} d.resolveu - se a correção de fato funcionou (validada por execução/teste real)
 * @param {string} [d.tarefaTipo]
 * @param {string} [d.missaoId]
 */
function registrarErro({ categoria, mensagemErro, causaProvavel, solucaoAplicada = null, resolveu = false, tarefaTipo = null, missaoId = null }) {
  const tags = ['autocorrecao', categoria, tarefaTipo].filter(Boolean);
  const erroGravado = memoria.gravar({
    tipo: 'erro',
    conteudo: `[${categoria}] ${mensagemErro}`.slice(0, 2000),
    origem: 'autocorrecao',
    tags,
    contexto: { query: `${categoria} ${tarefaTipo || ''} ${mensagemErro}`.trim(), categoria, causaProvavel, tarefaTipo },
    confianca: 0.5,
    missaoId,
  });
  if (!solucaoAplicada) return { erro: erroGravado, solucao: null };

  const solucaoGravada = memoria.gravar({
    tipo: 'solucao',
    conteudo: solucaoAplicada.slice(0, 2000),
    origem: 'autocorrecao',
    tags: [...tags, resolveu ? 'resolveu=true' : 'resolveu=false'],
    contexto: { query: `${categoria} ${tarefaTipo || ''} ${mensagemErro}`.trim(), categoria, resolveu, erroRelacionadoId: erroGravado.id },
    confianca: resolveu ? 0.7 : 0.3, // solução que NÃO resolveu ainda vale registrar (evita repetir a mesma tentativa fracassada numa missão futura), mas com confiança baixa
    missaoId,
  });
  return { erro: erroGravado, solucao: solucaoGravada };
}

/**
 * Consulta se um erro PARECIDO já foi visto e resolvido antes. Retorna a
 * sugestão como TEXTO DE CONTEXTO — quem chama decide se usa, e a estratégia
 * de correção sempre valida de novo com execução/teste real (nunca copia
 * cegamente, conforme o pedido: "deve validar novamente").
 */
function consultarErroConhecido(categoria, mensagemErro, tarefaTipo = null) {
  const query = `${categoria} ${tarefaTipo || ''} ${mensagemErro}`.trim();
  const rErros = memoria.lembrar(query, { tipos: ['erro'] });
  const rSolucoes = memoria.lembrar(query, { tipos: ['solucao'] });
  const solucoesQueResolveram = rSolucoes.registros.filter((s) => s.contexto && s.contexto.resolveu);

  if (solucoesQueResolveram.length === 0) {
    return { encontrouPrecedente: rErros.achou, sugestao: null, motivo: rErros.achou ? 'erro parecido já visto antes, mas nenhuma solução registrada resolveu de fato' : 'nenhum precedente na memória' };
  }
  const melhor = solucoesQueResolveram[0];
  return {
    encontrouPrecedente: true,
    sugestao: melhor.conteudo,
    confianca: melhor._confiancaAtual,
    motivo: `erro semelhante já foi resolvido antes (confiança=${melhor._confiancaAtual}) — usar como CONTEXTO, revalidar com execução real, nunca aplicar sem testar de novo`,
  };
}

module.exports = { registrarErro, consultarErroConhecido };
