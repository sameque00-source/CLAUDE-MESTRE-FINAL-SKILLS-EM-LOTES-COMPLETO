/**
 * CHAMAR-LLM — ponte real entre o Planejador e o Gateway/9Router.
 *
 * Não reimplementa nada do roteamento base: usa o `decisor` da FASE 1
 * (que já integra `gateway/scoring.js`) para escolher o modelo, e os
 * adapters reais (`gateway/providers.js`) para a chamada de verdade —
 * o mesmo caminho já testado e validado nas fases anteriores desta sessão.
 *
 * FASE 7 adiciona, sem quebrar o caminho existente: (1) o `router/router.js`
 * envolve `decisor.decidirModelo` com um ajuste pequeno de aprendizado real
 * (histórico de sucesso por tarefa+agente+modelo+provider); (2) avaliação de
 * TAMANHO DE CONTEXTO antes de cada tentativa — um candidato cuja janela não
 * comporta a entrada estimada é PULADO (não truncamos o prompt pra caber à
 * força, e nunca fingimos que uma resposta veio de um modelo que na
 * verdade não recebeu a entrada inteira); se NENHUM candidato comporta,
 * retorna erro honesto categorizado como `contexto_grande`, para que a
 * camada de autocorreção (FASE 8) decida dividir/resumir a tarefa, em vez
 * de silenciosamente perder dado.
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', '..', 'orquestrador');
const router = require(path.join(__dirname, '..', '..', 'router', 'router.js'));
const { ADAPTERS } = require('C:/Users/Administrator/Documents/AI-ORCHESTRATOR/gateway/providers');
const scoring = require('C:/Users/Administrator/Documents/AI-ORCHESTRATOR/gateway/scoring.js');

/**
 * @param {string} prompt - prompt completo (system já embutido no texto, se precisar)
 * @param {object} [opts]
 * @param {'texto'|'codigo'|'raciocinio'} [opts.tipoTarefa]
 * @param {number} [opts.complexidade]
 * @param {number} [opts.maxTokens]
 * @param {string[]} [opts.evitarModelos]
 * @param {string} [opts.agente] - chave do especialista (FASE 7: chave de aprendizado, opcional)
 * @param {Array<object>} [opts.blocosConteudo] - FASE 9: blocos de conteúdo no formato Anthropic
 *   (`[{type:'text',text},{type:'image',source:{type:'base64',media_type,data}}]`) para chamadas
 *   multimodais (visão). Quando presente, SUBSTITUI `prompt` como conteúdo da mensagem — `prompt`
 *   continua útil só como rótulo/estimativa textual. Reaproveita o adapter real do Google AI Studio
 *   (`gateway/providers.js:toGeminiParts`, já com suporte a `inline_data` — não duplicado aqui).
 * @returns {Promise<{ok:boolean, texto:string, modeloId:string|null, provider:string|null, error?:string, categoriaFalha?:string}>}
 */
async function chamarLLM(prompt, opts = {}) {
  const { tipoTarefa = 'raciocinio', complexidade = 3, maxTokens = 1500, evitarModelos = [], agente = null, blocosConteudo = null, precisaVisao = false } = opts;
  const conteudoDaMensagem = blocosConteudo || prompt;

  const decisao = router.decidirModelo({ tipoTarefa, complexidade, evitarModelos, agente, precisaVisao: precisaVisao || !!blocosConteudo });
  if (!decisao.escolhido) {
    return { ok: false, texto: '', modeloId: null, provider: null, error: `decisor não encontrou candidato: ${decisao.motivo}`, categoriaFalha: router.CATEGORIAS_FALHA.DESCONHECIDO };
  }

  // tenta o escolhido e, se falhar, cai para o próximo do fallback ordenado
  // (o mesmo princípio de cascata do Gateway, sem duplicar a lógica dele —
  // aqui é só uma cascata simples porque o Planejador faz poucas chamadas,
  // não precisa do circuit breaker completo do server.js).
  // Janela ampliada pra 6 (não 3): descoberto em teste real que os 3
  // primeiros do score às vezes são todos do MESMO provedor (ex: 3
  // variantes Gemini), e se aquele provedor está com cota estourada no
  // momento, 3 tentativas esgotam sem NUNCA chegar a um provedor diferente
  // (Groq/OpenRouter/9Router) que ainda tinha cota livre.
  const candidatos = [decisao.escolhido, ...decisao.ordemFallback.slice(1, 6)];
  let ultimoErro = 'nenhuma tentativa';
  let ultimaCategoria = router.CATEGORIAS_FALHA.DESCONHECIDO;
  let algumCandidatoCoubeNoContexto = false;
  for (let i = 0; i < candidatos.length; i++) {
    const candidate = candidatos[i];
    const adapter = ADAPTERS[candidate.provider];
    if (!adapter) continue;

    // FASE 7: nunca truncar — avalia se a entrada cabe na janela ANTES de
    // chamar. Se não cabe, pula este candidato (não é falha DELE, é
    // incompatibilidade de tamanho) e tenta o próximo, que pode ter janela
    // maior. Só marca "contexto grande" como causa final se NENHUM candidato
    // testado coube.
    // para blocos multimodais, estima o texto normalmente + um custo fixo
    // por imagem (aproximação conservadora — imagens reais custam bem menos
    // que isso na prática, mas nunca subestimamos de propósito, seção FASE 7).
    const textosParaEstimar = blocosConteudo
      ? blocosConteudo.filter((b) => b.type === 'text').map((b) => b.text)
      : [prompt];
    const custoImagensEstimado = blocosConteudo ? blocosConteudo.filter((b) => b.type === 'image').length * 1200 : 0;
    const avaliacao = router.avaliarEntrada(textosParaEstimar, candidate, { margemSaida: maxTokens + custoImagensEstimado });
    if (!avaliacao.cabe && avaliacao.estrategia !== 'dividir') {
      ultimoErro = `entrada estimada (${avaliacao.estTokens} tokens) não cabe na janela de ${candidate.id} (${avaliacao.janela} tokens, estratégia sugerida: ${avaliacao.estrategia})`;
      ultimaCategoria = router.CATEGORIAS_FALHA.CONTEXTO_GRANDE;
      continue;
    }
    algumCandidatoCoubeNoContexto = true;

    const t0 = Date.now();
    try {
      const resposta = await adapter(candidate, {
        system: undefined,
        messages: [{ role: 'user', content: conteudoDaMensagem }],
        max_tokens: maxTokens,
        tools: undefined,
        tool_choice: undefined,
      });
      const latency_ms = Date.now() - t0;
      // registra no MESMO scoring real do Gateway (não reimplementa cooldown):
      // sem isso, um candidato exaurido de cota continuava sendo escolhido de
      // novo a cada chamada do Planejador, porque o score nunca aprendia com
      // a própria falha (bug real encontrado em teste desta fase).
      scoring.registrar(candidate.id, { ok: !!resposta.ok, latency_ms, error: resposta.ok ? null : resposta.error });
      router.registrarResultado({ tarefaTipo: tipoTarefa, agente, modeloId: candidate.id, provider: candidate.provider, sucesso: !!(resposta.ok && resposta.text && resposta.text.trim()), duracaoMs: latency_ms, fallbackUsado: i > 0 });
      if (resposta.ok && resposta.text && resposta.text.trim()) {
        return { ok: true, texto: resposta.text.trim(), modeloId: candidate.id, provider: candidate.provider };
      }
      ultimoErro = resposta.error || 'resposta vazia';
      ultimaCategoria = router.classificarFalha(ultimoErro);
    } catch (e) {
      scoring.registrar(candidate.id, { ok: false, latency_ms: Date.now() - t0, error: e.message });
      router.registrarResultado({ tarefaTipo: tipoTarefa, agente, modeloId: candidate.id, provider: candidate.provider, sucesso: false, duracaoMs: Date.now() - t0, fallbackUsado: i > 0 });
      ultimoErro = e.message;
      ultimaCategoria = router.classificarFalha(ultimoErro);
    }
  }
  if (!algumCandidatoCoubeNoContexto) {
    return { ok: false, texto: '', modeloId: null, provider: null, error: `nenhum candidato comportava a entrada estimada — ${ultimoErro}`, categoriaFalha: router.CATEGORIAS_FALHA.CONTEXTO_GRANDE };
  }
  return { ok: false, texto: '', modeloId: null, provider: null, error: ultimoErro, categoriaFalha: ultimaCategoria };
}

module.exports = { chamarLLM };
