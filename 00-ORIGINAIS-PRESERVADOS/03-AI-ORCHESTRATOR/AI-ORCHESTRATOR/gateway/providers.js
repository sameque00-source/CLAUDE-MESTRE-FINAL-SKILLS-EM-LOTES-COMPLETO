/**
 * Adapters que aceitam uma CONVERSA completa (system + messages), não só uma
 * string — necessário pra falar de verdade com o Claude Code, que manda
 * histórico completo a cada turno, não uma frase solta.
 */

const fs = require('fs');
const path = require('path');

const ENV_PATH = path.join(__dirname, '..', 'config', '.env');

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  const env = {};
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  }
  return env;
}
const ENV = loadEnv();

/** Extrai texto puro de um bloco de conteúdo no formato Anthropic (string ou array de blocks). */
function flattenContent(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n');
  }
  return '';
}

// ===========================================================================
// TOOL-CALLING — tradução entre o formato Anthropic (que o Claude Code fala)
// e os formatos de cada provider.
//
// Bug real corrigido aqui (2026-09-14): o gateway descartava o campo `tools`
// por completo. Como o Claude Code só age emitindo `tool_use`, ele nunca tinha
// nada para executar — respondia texto e o turno acabava. Era exatamente o
// sintoma de "faz uma parte e para, precisa dizer continue".
// ===========================================================================

/** Anthropic tools -> formato OpenAI (Groq, OpenRouter). */
function toOpenAITools(tools) {
  if (!Array.isArray(tools) || tools.length === 0) return undefined;
  return tools.map((t) => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description || '',
      parameters: t.input_schema || { type: 'object', properties: {} },
    },
  }));
}

/** Anthropic tool_choice -> formato OpenAI. */
function toOpenAIToolChoice(tc) {
  if (!tc) return undefined;
  if (tc.type === 'auto') return 'auto';
  if (tc.type === 'any') return 'required';
  if (tc.type === 'none') return 'none';
  if (tc.type === 'tool' && tc.name) return { type: 'function', function: { name: tc.name } };
  return undefined;
}

/** Anthropic tools -> functionDeclarations do Gemini. */
// O function-calling do Gemini aceita só um subconjunto do JSON Schema. Qualquer
// palavra-chave fora desta lista causa HTTP 400 "Unknown name ... Cannot find field".
// Bug real (2026-09-14): os schemas de tools do Claude Code usam `propertyNames`,
// `prefixItems`, `$schema`, `additionalProperties` etc., e TODA requisição do CLI
// era rejeitada pelo Google. Por isso a limpeza é por LISTA BRANCA, não por
// remoção de campos conhecidos — assim keywords novas não voltam a quebrar.
const GEMINI_SCHEMA_PERMITIDO = new Set([
  'type', 'format', 'description', 'nullable', 'enum',
  'maxItems', 'minItems', 'properties', 'required', 'items', 'anyOf',
]);

function limparSchemaGemini(schema) {
  if (!schema || typeof schema !== 'object') return { type: 'string' };
  if (Array.isArray(schema)) return schema.map(limparSchemaGemini);

  const out = {};
  for (const [k, v] of Object.entries(schema)) {
    if (!GEMINI_SCHEMA_PERMITIDO.has(k)) continue;
    if (k === 'properties' && v && typeof v === 'object') {
      out.properties = Object.fromEntries(Object.entries(v).map(([pk, pv]) => [pk, limparSchemaGemini(pv)]));
    } else if (k === 'items') {
      out.items = limparSchemaGemini(v);
    } else if (k === 'anyOf' && Array.isArray(v)) {
      out.anyOf = v.map(limparSchemaGemini);
    } else {
      out[k] = v;
    }
  }
  // o Gemini exige `type`; sem ele o schema é rejeitado
  if (!out.type) out.type = out.properties ? 'object' : (out.items ? 'array' : 'string');
  // objeto sem properties também é rejeitado
  if (out.type === 'object' && !out.properties) out.properties = {};
  // array SEM `items` é rejeitado ("missing field"). Acontece de verdade com
  // schemas de tupla (`prefixItems`), que o Gemini não entende e nós removemos:
  // o array fica órfão. Damos um items permissivo para o schema continuar válido.
  if (out.type === 'array' && !out.items) out.items = { type: 'string' };
  // O Gemini só aceita `enum` com valores STRING e type:'string'. Enum numérico
  // causa 400 ("Invalid value ... (TYPE_STRING), 1"). Descartamos o enum nesse
  // caso: perde-se a dica de validação, mas a ferramenta continua chamável.
  if (out.enum !== undefined) {
    const todosString = Array.isArray(out.enum) && out.enum.every((v) => typeof v === 'string');
    if (!todosString || out.type !== 'string') delete out.enum;
  }
  // `required` só pode citar propriedades que existem
  if (Array.isArray(out.required) && out.properties) {
    out.required = out.required.filter((r) => Object.prototype.hasOwnProperty.call(out.properties, r));
    if (out.required.length === 0) delete out.required;
  }
  return out;
}

function toGeminiTools(tools) {
  if (!Array.isArray(tools) || tools.length === 0) return undefined;
  return [{
    functionDeclarations: tools.map((t) => ({
      name: t.name,
      description: t.description || '',
      parameters: limparSchemaGemini(t.input_schema),
    })),
  }];
}

/**
 * Converte messages Anthropic -> OpenAI, preservando tool_use e tool_result.
 * - assistant com tool_use  -> assistant com tool_calls
 * - user com tool_result    -> mensagens role:'tool' (uma por resultado)
 */
function toOpenAIMessages(system, messages) {
  const out = [];
  if (system) out.push({ role: 'system', content: flattenContent(system) });

  for (const m of messages) {
    const blocos = Array.isArray(m.content) ? m.content : null;

    if (m.role === 'assistant' && blocos) {
      const toolUses = blocos.filter((b) => b.type === 'tool_use');
      const texto = blocos.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
      if (toolUses.length > 0) {
        out.push({
          role: 'assistant',
          content: texto || null,
          tool_calls: toolUses.map((b) => ({
            id: b.id,
            type: 'function',
            function: { name: b.name, arguments: JSON.stringify(b.input ?? {}) },
          })),
        });
        continue;
      }
    }

    if (blocos && blocos.some((b) => b.type === 'tool_result')) {
      // cada tool_result vira uma mensagem role:'tool' separada
      for (const b of blocos.filter((x) => x.type === 'tool_result')) {
        out.push({
          role: 'tool',
          tool_call_id: b.tool_use_id,
          content: typeof b.content === 'string' ? b.content : flattenContent(b.content),
        });
      }
      const textoExtra = blocos.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
      if (textoExtra) out.push({ role: 'user', content: textoExtra });
      continue;
    }

    out.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: flattenContent(m.content) });
  }
  return out;
}

/** Resposta OpenAI -> blocos de conteúdo Anthropic (text + tool_use). */
function fromOpenAIResponse(msg) {
  const blocos = [];
  if (msg?.content) blocos.push({ type: 'text', text: msg.content });
  for (const tc of msg?.tool_calls || []) {
    let input = {};
    try { input = JSON.parse(tc.function?.arguments || '{}'); } catch { input = {}; }
    blocos.push({ type: 'tool_use', id: tc.id, name: tc.function?.name, input });
  }
  return blocos;
}

/** Converte um bloco de conteúdo Anthropic em "parts" do Gemini, preservando imagens (inlineData). */
function toGeminiParts(content, mapaIdParaNome = {}) {
  if (typeof content === 'string') return [{ text: content }];
  if (!Array.isArray(content)) return [{ text: '' }];
  const parts = [];
  for (const b of content) {
    if (b.type === 'text') {
      if (b.text) parts.push({ text: b.text });
    } else if (b.type === 'image' && b.source?.type === 'base64') {
      // a REST v1beta espera snake_case (inline_data/mime_type) — camelCase é
      // silenciosamente ignorado pela API, o que já causou um bug real aqui
      // (a imagem "sumia" sem erro, o modelo respondia sem ver nada).
      parts.push({ inline_data: { mime_type: b.source.media_type || 'image/png', data: b.source.data } });
    } else if (b.type === 'tool_use') {
      // NÃO reenviamos functionCall no histórico: os modelos Gemini com
      // "thinking" exigem o campo `thought_signature` junto, que não existe no
      // formato Anthropic — sem ele a API responde 400 ("Function call is
      // missing a thought_signature"). Textualizar o histórico preserva a
      // informação e não impede o modelo de emitir NOVAS chamadas de ferramenta,
      // porque as tools continuam declaradas normalmente na requisição.
      // Redação em 1ª pessoa, como narração natural do próprio assistente.
      // Formato de marcador (`[ferramenta chamada: X]`) foi testado e causava um
      // defeito real: o modelo copiava o marcador na resposta final ao usuário.
      parts.push({ text: `(Executei a ferramenta ${b.name} com ${JSON.stringify(b.input ?? {})}.)` });
    } else if (b.type === 'tool_result') {
      // o resultado que o Claude Code devolveu depois de executar a ferramenta
      const texto = typeof b.content === 'string'
        ? b.content
        : Array.isArray(b.content) ? b.content.filter((x) => x.type === 'text').map((x) => x.text).join('\n') : '';
      // pelo mesmo motivo do tool_use acima, o resultado volta como texto
      const nomeFerramenta = b.name || mapaIdParaNome[b.tool_use_id] || 'ferramenta';
      // NÃO adicionar instrução do tipo "responda ao usuário agora": foi testado
      // e fazia o modelo PARAR de chamar ferramentas no meio da tarefa — o
      // próprio sintoma que este projeto existe para corrigir.
      parts.push({ text: `(Resultado de ${nomeFerramenta}: ${texto})` });
    }
  }
  return parts.length ? parts : [{ text: '' }];
}

/**
 * Converte messages Anthropic em "contents" do Gemini.
 * Regra dura do Gemini: a conversa NÃO pode terminar num turno "model"
 * ("Requests ending with a model turn are not supported" — erro real observado
 * no laço agêntico, quando o último turno era o assistente pedindo a ferramenta).
 */
function toGeminiContents(messages) {
  // mapa tool_use_id -> nome da ferramenta, extraído dos turnos do assistente
  const mapaIdParaNome = {};
  for (const m of messages) {
    if (Array.isArray(m.content)) {
      for (const b of m.content) {
        if (b.type === 'tool_use' && b.id && b.name) mapaIdParaNome[b.id] = b.name;
      }
    }
  }

  const contents = messages
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: toGeminiParts(m.content, mapaIdParaNome) }))
    .filter((c) => c.parts.length > 0);

  while (contents.length > 0 && contents[contents.length - 1].role === 'model') {
    // fecha com um turno de usuário mínimo para a requisição ser aceita
    contents.push({ role: 'user', parts: [{ text: 'Continue.' }] });
    break;
  }
  return contents;
}

// Alguns modelos Groq têm limite de OTPM (output tokens/min) bem baixo (ex: qwen3.8-27b
// só permite 1000/min). Pedir max_tokens alto demais causa 429 imediato, mesmo com cota
// de requisição sobrando — bug real encontrado em teste (2026-09-13): o adapter pedia
// 4096 fixo, ignorando o max_tokens do cliente, e estourava esse teto.
const GROQ_OTPM_CAP = {
  'qwen/qwen3.8-27b': 1000,
  'groq/compound': 4096,
};
const GROQ_DEFAULT_CAP = 4096;

/**
 * Timeout por tentativa. Sem isto, um provedor que demora 18s para responder
 * 503 (caso real observado com o Gemini em 2026-09-14) consome todo o
 * orçamento de tempo e o fallback nunca chega a ser útil. Preferimos abortar
 * cedo e passar para o próximo candidato.
 */
const CALL_TIMEOUT_MS = Number(process.env.GATEWAY_CALL_TIMEOUT_MS || 20000);

// Timeout por provedor. O 9Router é o backup final e é comprovadamente lento
// com payload grande (medido: 142s via CLI, 20s+ com tools) — cortá-lo em 20s
// eliminava justamente a última rede de segurança. Os diretos continuam curtos,
// porque para eles demora = provavelmente vai falhar mesmo.
// 90s foi testado e se mostrou PIOR que o problema: quando o 9Router estava
// lento, ele sozinho consumia 90s da requisição, duas vezes. 30s é o suficiente
// para o caminho feliz dele e curto o bastante para não afundar o pedido —
// se estourar, o cooldown tira ele de circulação por alguns minutos.
const TIMEOUT_POR_PROVEDOR = {
  '9Router': Number(process.env.GATEWAY_9ROUTER_TIMEOUT_MS || 30000),
};
const timeoutDoProvedor = (provider) => TIMEOUT_POR_PROVEDOR[provider] ?? CALL_TIMEOUT_MS;

async function fetchWithTimeout(url, options, timeoutMs = CALL_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } catch (e) {
    if (e.name === 'AbortError') {
      const err = new Error(`timeout apos ${timeoutMs}ms`);
      err.isTimeout = true;
      throw err;
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

function safeJson(raw) {
  try {
    const j = JSON.parse(raw);
    const blocos = Array.isArray(j.content) ? j.content : [];
    const text = blocos.filter((b) => b.type === 'text').map((b) => b.text).join('');
    return {
      text,
      content: blocos.length ? blocos : undefined,   // preserva tool_use
      stop_reason: j.stop_reason,
      usage: { prompt_tokens: j.usage?.input_tokens, completion_tokens: j.usage?.output_tokens },
    };
  } catch {
    return { text: '', usage: undefined };
  }
}

/**
 * Parser de SSE no formato Anthropic. Acumula SÓ os text_delta — os
 * thinking_delta são raciocínio interno do modelo e não fazem parte da
 * resposta visível (ignorá-los evita devolver o "pensamento" ao usuário).
 */
function parseAnthropicSSE(raw) {
  let text = '';
  let usage;
  let stop_reason;
  // reconstrói blocos por índice — tool_use chega fatiado em input_json_delta
  const blocosPorIndice = new Map();

  for (const line of raw.split(/\r?\n/)) {
    if (!line.startsWith('data:')) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === '[DONE]') continue;
    let evt;
    try { evt = JSON.parse(payload); } catch { continue; }

    if (evt.type === 'content_block_start' && evt.content_block) {
      blocosPorIndice.set(evt.index, { ...evt.content_block, _jsonParcial: '' });
    }
    if (evt.type === 'content_block_delta') {
      const b = blocosPorIndice.get(evt.index);
      if (evt.delta?.type === 'text_delta') {
        text += evt.delta.text || '';
        if (b) b.text = (b.text || '') + (evt.delta.text || '');
      }
      if (evt.delta?.type === 'input_json_delta' && b) {
        b._jsonParcial += evt.delta.partial_json || '';
      }
    }
    if (evt.type === 'message_delta') {
      if (evt.usage) usage = { completion_tokens: evt.usage.output_tokens };
      if (evt.delta?.stop_reason) stop_reason = evt.delta.stop_reason;
    }
    if (evt.type === 'message_start' && evt.message?.usage) {
      usage = { ...(usage || {}), prompt_tokens: evt.message.usage.input_tokens };
    }
  }

  const content = [];
  for (const b of [...blocosPorIndice.values()]) {
    if (b.type === 'text') {
      if (b.text) content.push({ type: 'text', text: b.text });
    } else if (b.type === 'tool_use') {
      let input = b.input ?? {};
      if (b._jsonParcial) { try { input = JSON.parse(b._jsonParcial); } catch { /* mantém o que já tinha */ } }
      content.push({ type: 'tool_use', id: b.id, name: b.name, input });
    }
    // blocos de "thinking" são descartados de propósito: são raciocínio interno
  }

  return { text, content: content.length ? content : undefined, stop_reason, usage };
}

// ===========================================================================
// STREAMING REAL — consumo incremental de verdade.
//
// Os ADAPTERS acima (não-streaming) ficam 100% intocados: são o caminho já
// testado (20/20) e continuam sendo usados quando o cliente não pede stream,
// e também são o que decide QUAL candidato tentar primeiro (fallback).
//
// STREAM_ADAPTERS abaixo é um caminho NOVO e SEPARADO: abre a conexão com
// stream:true, e só COMPROMETE a resposta ao cliente real (Claude Code) depois
// de confirmar que o upstream aceitou a chamada (HTTP ok). Se o upstream
// recusar de cara (401/429/503), nada foi escrito no cliente ainda — o
// server.js pode tentar o próximo candidato sem quebrar o protocolo SSE.
// Depois que o primeiro byte é aceito, o gateway está comprometido com AQUELE
// provedor: não dá para trocar de provedor no meio de um stream já iniciado
// sem violar o protocolo (o cliente já recebeu message_start).
//
// Cada função de STREAM_ADAPTERS recebe (candidate, ctx, onEvent) e chama
// onEvent com eventos normalizados:
//   { kind:'text',       key:'text',        text }
//   { kind:'tool_start', key:`tool:${i}`,   id, name }
//   { kind:'tool_delta', key:`tool:${i}`,   partial_json }
// Devolve { ok, stop_reason, usage, error, hadContent }.
// ===========================================================================

/** Lê um Response como texto SSE incremental, chamando onLine(payload) por evento "data:". */
async function consumirSSE(response, onLine, sinalAbortoIdle) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let bufer = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (sinalAbortoIdle) sinalAbortoIdle();   // reseta o watchdog de inatividade a cada chunk real
      bufer += decoder.decode(value, { stream: true });
      const linhas = bufer.split(/\r?\n/);
      bufer = linhas.pop() ?? '';               // última linha pode estar incompleta
      for (const linha of linhas) {
        if (!linha.startsWith('data:')) continue;
        const payload = linha.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        onLine(payload);
      }
    }
  } finally {
    try { reader.releaseLock(); } catch { /* já liberado */ }
  }
}

/** Timeout de INATIVIDADE (não de duração total): reinicia a cada chunk recebido. */
function criarWatchdogIdle(ms, aoEstourar) {
  let timer = setTimeout(aoEstourar, ms);
  return {
    reset: () => { clearTimeout(timer); timer = setTimeout(aoEstourar, ms); },
    cancelar: () => clearTimeout(timer),
  };
}

const IDLE_TIMEOUT_MS = Number(process.env.GATEWAY_STREAM_IDLE_MS || 25000);

const STREAM_ADAPTERS = {
  // -------------------------------------------------------------------------
  // Groq e OpenRouter: mesmo formato (OpenAI chat/completions com stream:true).
  // delta.content chega em pedaços; delta.tool_calls[].function.arguments
  // chega fatiado por índice — precisa acumular por índice, não por texto puro.
  // -------------------------------------------------------------------------
  async _openAIStream(candidate, { system, messages, max_tokens, tools, tool_choice, apiKey, cap }, onEvent) {
    const effectiveMaxTokens = cap ? Math.max(1, Math.min(max_tokens || cap, cap)) : (max_tokens || 2048);
    const payload = { model: candidate.model, messages: toOpenAIMessages(system, messages), max_tokens: effectiveMaxTokens, stream: true };
    const t = toOpenAITools(tools);
    if (t) { payload.tools = t; const tc = toOpenAIToolChoice(tool_choice); if (tc) payload.tool_choice = tc; }

    const ctrl = new AbortController();
    const abrirTimer = setTimeout(() => ctrl.abort(), CALL_TIMEOUT_MS);
    let r;
    try {
      r = await fetch(`${candidate.endpoint}/chat/completions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
    } catch (e) {
      clearTimeout(abrirTimer);
      return { ok: false, error: e.name === 'AbortError' ? `timeout apos ${CALL_TIMEOUT_MS}ms` : e.message };
    }
    clearTimeout(abrirTimer);
    if (!r.ok) {
      const body = await r.text().catch(() => '');
      return { ok: false, error: `HTTP ${r.status}: ${body.slice(0, 300)}` };
    }

    const watchdog = criarWatchdogIdle(IDLE_TIMEOUT_MS, () => ctrl.abort());
    const toolsPorIndice = new Map();   // index -> { id, name, iniciado }
    let stopReason = 'end_turn';
    let usage;
    let hadContent = false;

    try {
      await consumirSSE(r, (payload) => {
        let evt; try { evt = JSON.parse(payload); } catch { return; }
        if (evt.usage) usage = { prompt_tokens: evt.usage.prompt_tokens, completion_tokens: evt.usage.completion_tokens };
        const choice = evt.choices?.[0];
        if (!choice) return;
        const delta = choice.delta || {};

        if (delta.content) {
          hadContent = true;
          onEvent({ kind: 'text', key: 'text', text: delta.content });
        }
        for (const tc of delta.tool_calls || []) {
          const idx = tc.index ?? 0;
          const key = `tool:${idx}`;
          if (!toolsPorIndice.has(idx)) {
            toolsPorIndice.set(idx, { id: tc.id, name: tc.function?.name });
            hadContent = true;
            onEvent({ kind: 'tool_start', key, id: tc.id || `toolu_${Date.now()}_${idx}`, name: tc.function?.name || '' });
          }
          if (tc.function?.arguments) onEvent({ kind: 'tool_delta', key, partial_json: tc.function.arguments });
        }
        if (choice.finish_reason) stopReason = choice.finish_reason === 'tool_calls' ? 'tool_use' : 'end_turn';
      }, watchdog.reset);
    } catch (e) {
      watchdog.cancelar();
      return { ok: hadContent, stop_reason: stopReason, usage, hadContent, error: hadContent ? undefined : `stream interrompido: ${e.message}` };
    }
    watchdog.cancelar();
    return { ok: true, stop_reason: stopReason, usage, hadContent };
  },

  async Groq(candidate, ctx, onEvent) {
    if (!ENV.GROQ_API_KEY) return { ok: false, error: 'GROQ_API_KEY não configurada' };
    const cap = GROQ_OTPM_CAP[candidate.model] ?? GROQ_DEFAULT_CAP;
    return STREAM_ADAPTERS._openAIStream(candidate, { ...ctx, apiKey: ENV.GROQ_API_KEY, cap }, onEvent);
  },

  async OpenRouter(candidate, ctx, onEvent) {
    if (!ENV.OPENROUTER_API_KEY) return { ok: false, error: 'OPENROUTER_API_KEY não configurada' };
    if (!candidate.model.endsWith(':free')) return { ok: false, error: 'modelo OpenRouter sem sufixo :free recusado por segurança' };
    return STREAM_ADAPTERS._openAIStream(candidate, { ...ctx, apiKey: ENV.OPENROUTER_API_KEY, cap: null }, onEvent);
  },

  // -------------------------------------------------------------------------
  // 9Router: já fala SSE Anthropic nativamente (confirmado em teste real,
  // 2026-09-13) — é o único caso onde dá pra fazer passthrough quase direto,
  // só reindexando os blocos pro protocolo normalizado interno.
  // -------------------------------------------------------------------------
  async '9Router'(candidate, { system, messages, max_tokens, tools, tool_choice }, onEvent) {
    if (!ENV.NINEROUTER_API_KEY) return { ok: false, error: 'NINEROUTER_API_KEY não configurada' };
    const body = { model: candidate.model, max_tokens: max_tokens || 4096, messages, stream: true };
    if (system) body.system = flattenContent(system);
    if (Array.isArray(tools) && tools.length > 0) { body.tools = tools; if (tool_choice) body.tool_choice = tool_choice; }

    const ctrl = new AbortController();
    const timeoutMs = timeoutDoProvedor('9Router');
    const abrirTimer = setTimeout(() => ctrl.abort(), timeoutMs);
    let r;
    try {
      r = await fetch(`${candidate.endpoint}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': ENV.NINEROUTER_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
    } catch (e) {
      clearTimeout(abrirTimer);
      return { ok: false, error: e.name === 'AbortError' ? `timeout apos ${timeoutMs}ms` : e.message };
    }
    clearTimeout(abrirTimer);
    if (!r.ok) {
      const b = await r.text().catch(() => '');
      return { ok: false, error: `HTTP ${r.status}: ${b.slice(0, 300)}` };
    }

    const watchdog = criarWatchdogIdle(IDLE_TIMEOUT_MS, () => ctrl.abort());
    const indiceParaKey = new Map();   // índice do 9Router -> nossa key normalizada
    let stopReason = 'end_turn';
    let usage;
    let hadContent = false;

    try {
      await consumirSSE(r, (payload) => {
        let evt; try { evt = JSON.parse(payload); } catch { return; }
        if (evt.type === 'content_block_start' && evt.content_block) {
          const key = evt.content_block.type === 'tool_use' ? `tool:${evt.index}` : 'text';
          indiceParaKey.set(evt.index, key);
          if (evt.content_block.type === 'tool_use') {
            hadContent = true;
            onEvent({ kind: 'tool_start', key, id: evt.content_block.id, name: evt.content_block.name });
          }
        }
        if (evt.type === 'content_block_delta') {
          const key = indiceParaKey.get(evt.index) || 'text';
          if (evt.delta?.type === 'text_delta' && evt.delta.text) {
            hadContent = true;
            onEvent({ kind: 'text', key: 'text', text: evt.delta.text });
          }
          if (evt.delta?.type === 'input_json_delta' && evt.delta.partial_json) {
            onEvent({ kind: 'tool_delta', key, partial_json: evt.delta.partial_json });
          }
        }
        if (evt.type === 'message_delta') {
          if (evt.usage) usage = { completion_tokens: evt.usage.output_tokens };
          if (evt.delta?.stop_reason) stopReason = evt.delta.stop_reason;
        }
        if (evt.type === 'message_start' && evt.message?.usage) {
          usage = { ...(usage || {}), prompt_tokens: evt.message.usage.input_tokens };
        }
        // blocos de "thinking" são ignorados de propósito (raciocínio interno)
      }, watchdog.reset);
    } catch (e) {
      watchdog.cancelar();
      return { ok: hadContent, stop_reason: stopReason, usage, hadContent, error: hadContent ? undefined : `stream interrompido: ${e.message}` };
    }
    watchdog.cancelar();
    return { ok: true, stop_reason: stopReason, usage, hadContent };
  },

  // -------------------------------------------------------------------------
  // Google Gemini: endpoint streamGenerateContent?alt=sse. Cada evento SSE é
  // um objeto GenerateContentResponse completo, mas o TEXTO em si já vem
  // fatiado (delta real, não acumulado) — confirmado no formato observado.
  // functionCall normalmente chega inteiro em um único evento (o Gemini não
  // fatia argumentos de function call como o OpenAI faz).
  // -------------------------------------------------------------------------
  async 'Google AI Studio'(candidate, { system, messages, max_tokens, tools, tool_choice }, onEvent) {
    if (!ENV.GOOGLE_API_KEY) return { ok: false, error: 'GOOGLE_API_KEY não configurada' };
    const body = { contents: toGeminiContents(messages) };
    const gTools = toGeminiTools(tools);
    if (gTools) {
      body.tools = gTools;
      const modo = tool_choice?.type === 'any' ? 'ANY' : tool_choice?.type === 'none' ? 'NONE' : 'AUTO';
      body.toolConfig = { functionCallingConfig: { mode: modo } };
    }
    if (max_tokens) body.generationConfig = { maxOutputTokens: Math.max(max_tokens, 2048) };
    if (system) body.systemInstruction = { parts: [{ text: flattenContent(system) }] };

    const ctrl = new AbortController();
    const abrirTimer = setTimeout(() => ctrl.abort(), CALL_TIMEOUT_MS);
    let r;
    try {
      r = await fetch(`${candidate.endpoint}/models/${candidate.model}:streamGenerateContent?alt=sse&key=${ENV.GOOGLE_API_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal,
      });
    } catch (e) {
      clearTimeout(abrirTimer);
      return { ok: false, error: e.name === 'AbortError' ? `timeout apos ${CALL_TIMEOUT_MS}ms` : e.message };
    }
    clearTimeout(abrirTimer);
    if (!r.ok) {
      const b = await r.text().catch(() => '');
      return { ok: false, error: `HTTP ${r.status}: ${b.slice(0, 300)}` };
    }

    const watchdog = criarWatchdogIdle(IDLE_TIMEOUT_MS, () => ctrl.abort());
    let stopReason = 'end_turn';
    let usage;
    let hadContent = false;
    let n = 0;

    try {
      await consumirSSE(r, (payload) => {
        let evt; try { evt = JSON.parse(payload); } catch { return; }
        if (evt.usageMetadata) usage = evt.usageMetadata;
        const parts = evt.candidates?.[0]?.content?.parts || [];
        for (const p of parts) {
          if (p.text) { hadContent = true; onEvent({ kind: 'text', key: 'text', text: p.text }); }
          if (p.functionCall) {
            hadContent = true;
            stopReason = 'tool_use';
            const key = `tool:${n++}`;
            const id = `toolu_gemini_${Date.now()}_${n}`;
            onEvent({ kind: 'tool_start', key, id, name: p.functionCall.name });
            onEvent({ kind: 'tool_delta', key, partial_json: JSON.stringify(p.functionCall.args ?? {}) });
          }
        }
      }, watchdog.reset);
    } catch (e) {
      watchdog.cancelar();
      return { ok: hadContent, stop_reason: stopReason, usage, hadContent, error: hadContent ? undefined : `stream interrompido: ${e.message}` };
    }
    watchdog.cancelar();
    return { ok: true, stop_reason: stopReason, usage, hadContent };
  },
};

const ADAPTERS = {
  Groq: async (candidate, { system, messages, max_tokens, tools, tool_choice }) => {
    if (!ENV.GROQ_API_KEY) return { ok: false, error: 'GROQ_API_KEY não configurada' };
    const cap = GROQ_OTPM_CAP[candidate.model] ?? GROQ_DEFAULT_CAP;
    const effectiveMaxTokens = Math.max(1, Math.min(max_tokens || cap, cap));
    const payload = { model: candidate.model, messages: toOpenAIMessages(system, messages), max_tokens: effectiveMaxTokens };
    const t = toOpenAITools(tools);
    if (t) { payload.tools = t; const tc = toOpenAIToolChoice(tool_choice); if (tc) payload.tool_choice = tc; }
    const r = await fetchWithTimeout(`${candidate.endpoint}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ENV.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}` };
    const msg = j.choices?.[0]?.message;
    const blocos = fromOpenAIResponse(msg);
    return {
      ok: true,
      text: msg?.content ?? '',
      content: blocos,
      stop_reason: j.choices?.[0]?.finish_reason === 'tool_calls' ? 'tool_use' : 'end_turn',
      usage: j.usage,
    };
  },
  // 9Router local (porta 20128) como TERCEIRO provedor do gateway. Ele tem os
  // seus próprios provedores gratuitos por trás (OpenCode/Cloudflare), com cota
  // independente da Groq/Google — é exatamente o papel de "backup" do plano.
  // Fala Anthropic Messages API, então mandamos o payload quase como recebemos.
  // OpenRouter: chave com Key limit $0 fixado no dashboard (impossível gastar,
  // mesmo se um dia o pool de modelos ":free" mudar de nome) — só modelos
  // ":free" são usados (ver catalog/models.json e a checagem abaixo).
  OpenRouter: async (candidate, { system, messages, max_tokens, tools, tool_choice }) => {
    if (!ENV.OPENROUTER_API_KEY) return { ok: false, error: 'OPENROUTER_API_KEY não configurada' };
    if (!candidate.model.endsWith(':free')) {
      return { ok: false, error: 'modelo OpenRouter sem sufixo :free recusado por segurança' };
    }
    const payload = { model: candidate.model, messages: toOpenAIMessages(system, messages), max_tokens: max_tokens || 2048 };
    const t = toOpenAITools(tools);
    if (t) { payload.tools = t; const tc = toOpenAIToolChoice(tool_choice); if (tc) payload.tool_choice = tc; }
    const r = await fetchWithTimeout(`${candidate.endpoint}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ENV.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}` };
    const msg = j.choices?.[0]?.message;
    return {
      ok: true,
      text: msg?.content ?? '',
      content: fromOpenAIResponse(msg),
      stop_reason: j.choices?.[0]?.finish_reason === 'tool_calls' ? 'tool_use' : 'end_turn',
      usage: j.usage,
    };
  },
  // 9Router já fala Anthropic nativamente: tools passam direto, sem tradução.
  // É o adapter com melhor fidelidade de tool-calling — mas também o mais lento
  // (medido: 142s para um prompt trivial vindo do CLI, contra ~7s dos diretos),
  // por isso fica como backup de último recurso, não como primeira escolha.
  '9Router': async (candidate, { system, messages, max_tokens, tools, tool_choice }) => {
    if (!ENV.NINEROUTER_API_KEY) return { ok: false, error: 'NINEROUTER_API_KEY não configurada' };
    const body = { model: candidate.model, max_tokens: max_tokens || 4096, messages };
    if (system) body.system = flattenContent(system);
    if (Array.isArray(tools) && tools.length > 0) {
      body.tools = tools;                       // formato Anthropic, repassado cru
      if (tool_choice) body.tool_choice = tool_choice;
    }
    const r = await fetchWithTimeout(`${candidate.endpoint}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ENV.NINEROUTER_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    }, timeoutDoProvedor('9Router'));
    const raw = await r.text();
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${raw.slice(0, 300)}` };
    // O 9Router SEMPRE responde em SSE, mesmo sem stream:true (confirmado em
    // teste real 2026-09-14). Por isso aceitamos os dois formatos.
    const parsed = raw.trimStart().startsWith('{') ? safeJson(raw) : parseAnthropicSSE(raw);
    return {
      ok: true,
      text: parsed.text,
      content: parsed.content,           // pode conter tool_use vindo do 9Router
      stop_reason: parsed.stop_reason,
      usage: parsed.usage,
    };
  },
  'Google AI Studio': async (candidate, { system, messages, max_tokens, tools, tool_choice }) => {
    if (!ENV.GOOGLE_API_KEY) return { ok: false, error: 'GOOGLE_API_KEY não configurada' };
    const body = { contents: toGeminiContents(messages) };
    const gTools = toGeminiTools(tools);
    if (gTools) {
      body.tools = gTools;
      const modo = tool_choice?.type === 'any' ? 'ANY' : tool_choice?.type === 'none' ? 'NONE' : 'AUTO';
      body.toolConfig = { functionCallingConfig: { mode: modo } };
    }
    // Bug real encontrado (2026-09-13): modelos Gemini com "thinking" (ex: gemini-3.6-flash)
    // gastam parte do maxOutputTokens em raciocínio interno antes de escrever a resposta
    // visível. Se o cliente pede um max_tokens pequeno (ex: 300, comum em teste rápido),
    // o pensamento consome quase tudo e a resposta final sai cortada/vazia. Por isso nunca
    // repassamos o max_tokens do cliente cru pro Gemini — usamos um piso generoso (2048)
    // que sobra espaço pro raciocínio E pra resposta, e só sobe se o cliente pedir mais.
    if (max_tokens) body.generationConfig = { maxOutputTokens: Math.max(max_tokens, 2048) };
    if (system) body.systemInstruction = { parts: [{ text: flattenContent(system) }] };
    if (process.env.GATEWAY_DEBUG) {
      const debugBody = JSON.parse(JSON.stringify(body));
      for (const c of debugBody.contents) for (const p of c.parts) if (p.inline_data) p.inline_data.data = `[${p.inline_data.data.length} chars]`;
      console.error('[DEBUG google body]', JSON.stringify(debugBody));
    }
    const r = await fetchWithTimeout(
      `${candidate.endpoint}/models/${candidate.model}:generateContent?key=${ENV.GOOGLE_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}` };
    const parts = j.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p) => p.text || '').join('');

    // functionCall do Gemini -> bloco tool_use do Anthropic
    const blocos = [];
    if (text) blocos.push({ type: 'text', text });
    let n = 0;
    for (const p of parts) {
      if (p.functionCall) {
        blocos.push({
          type: 'tool_use',
          id: `toolu_gemini_${Date.now()}_${n++}`,   // o Gemini não devolve id próprio
          name: p.functionCall.name,
          input: p.functionCall.args ?? {},
        });
      }
    }
    const temTool = blocos.some((b) => b.type === 'tool_use');
    return {
      ok: true,
      text,
      content: blocos.length ? blocos : undefined,
      stop_reason: temTool ? 'tool_use' : 'end_turn',
      usage: j.usageMetadata,
    };
  },
};

module.exports = { ADAPTERS, STREAM_ADAPTERS, flattenContent };
