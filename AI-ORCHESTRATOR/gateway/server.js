/**
 * Gateway local — fala o protocolo Anthropic Messages API (o mesmo que o
 * Claude Code usa via ANTHROPIC_BASE_URL) e por trás roteia pra Groq/Google
 * usando o classificador + catálogo já validados.
 *
 * ISOLADO: roda em porta própria (20130), NÃO mexe no 9Router (20128) nem
 * em nenhuma configuração do Claude Code. Só existe pra ser testado via
 * curl/script até estar validado — a troca de fato (apontar o Claude Code
 * pra cá) é uma decisão separada, explícita, feita depois.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { classifyConversation, stripSystemReminders } = require('../classifier/classify');
const { ADAPTERS, STREAM_ADAPTERS, flattenContent } = require('./providers');
const scoring = require('./scoring');

// aproveita a telemetria já existente em disco para não começar "cego"
scoring.aquecerDoLog();

const CATALOG_PATH = path.join(__dirname, '..', 'catalog', 'models.json');
const LOG_PATH = path.join(__dirname, '..', 'logs', 'gateway.jsonl');
const ENV_PATH = path.join(__dirname, '..', 'config', '.env');
const PORT = process.env.GATEWAY_PORT || 20130;

function loadGatewayKey() {
  if (!fs.existsSync(ENV_PATH)) return null;
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^GATEWAY_API_KEY=(.*)$/);
    if (m) return m[1].trim();
  }
  return null;
}
const GATEWAY_KEY = loadGatewayKey();

/** Mesmo formato de erro 401 do 9Router, pra manter Claude Code/clientes consistentes. */
function checkAuth(req) {
  if (!GATEWAY_KEY) return true; // sem chave configurada = auth desligada (dev only)
  const xApiKey = req.headers['x-api-key'];
  const authHeader = req.headers['authorization'];
  const bearer = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return xApiKey === GATEWAY_KEY || bearer === GATEWAY_KEY;
}

function loadCatalog() {
  return JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
}

// contexto de score da requisição atual (setado por handleMessages antes de escolher)
let ctxScore = { level: 1, tipoTarefa: 'texto', estTokens: 0 };

function eligible(catalog, predicate) {
  return catalog.models
    .filter((m) => m.free === true && m.requires_card !== true)
    // só provedores que realmente têm adapter implementado — sem isso, entradas
    // como Cloudflare/OpenRouter (ainda sem adapter) ocupavam vagas da lista de
    // candidatos e o fallback "gastava" tentativas em quem nunca seria chamado
    // (bug real observado em 2026-09-14: o 9Router nunca era alcançado).
    .filter((m) => Object.prototype.hasOwnProperty.call(ADAPTERS, m.provider))
    .filter(predicate)
    // ordenação por SCORE DINÂMICO (saúde real + latência medida + aptidão +
    // folga de contexto), não mais por `priority` fixa do JSON.
    .sort((a, b) => scoring.score(b, ctxScore) - scoring.score(a, ctxScore));
}

/**
 * Remove quem está em cooldown — mas nunca devolve lista vazia: se todos
 * estiverem penalizados, é melhor tentar o menos ruim do que falhar de cara.
 */
function semCooldown(lista) {
  const livres = lista.filter((m) => !scoring.emCooldown(m.id));
  return livres.length > 0 ? livres : lista;
}

/**
 * O 9Router local é o backup de último recurso: tem cota independente
 * (OpenCode/Cloudflare por trás) e fallback próprio de 17 modelos. Ele deve
 * SEMPRE fechar a cadeia, nunca ser cortado pelo limite de candidatos.
 */
function withLocalBackup(catalog, list) {
  const backup = catalog.models.find((m) => m.provider === '9Router' && m.free === true);
  if (!backup) return list;
  if (list.some((m) => m.id === backup.id)) return list;
  return [...list, backup];
}

/**
 * Estimativa de tokens do pedido. Não precisa ser exata — precisa ser
 * conservadora o bastante para não mandar um pedido de 13k tokens para um
 * provedor cujo teto por minuto é 8k (bug real observado em 2026-09-13:
 * o Claude Code manda 13-17k tokens por turno só de CLAUDE.md + hooks +
 * schemas de tools, e a Groq recusava com HTTP 413 em loop).
 * ~3.5 chars por token é uma aproximação segura para PT/EN misturado.
 */
function estimateTokens(system, messages) {
  let chars = 0;
  const add = (c) => {
    if (typeof c === 'string') chars += c.length;
    else if (Array.isArray(c)) {
      for (const b of c) {
        if (b.type === 'text') chars += (b.text || '').length;
        // imagem base64: conta o custo aproximado em tokens de visão
        else if (b.type === 'image') chars += 4000;
      }
    }
  };
  add(system);
  for (const m of messages) add(m.content);
  return Math.ceil(chars / 3.5);
}

/**
 * Filtra candidatos que realmente conseguem atender ESTE pedido:
 * - respeita o teto de tokens por requisição/minuto do provedor (max_request_tokens)
 * - respeita a janela de contexto do modelo
 * Sem isso o fallback fica preso tentando provedor que vai recusar sempre.
 */
function fitsRequest(m, estTokens) {
  const perRequestCap = m.max_request_tokens ?? null;
  if (perRequestCap !== null && estTokens > perRequestCap) return false;
  if (m.context_window && estTokens > m.context_window * 0.8) return false;
  return true;
}

// Bug real encontrado (2026-09-14): com corte em 4 candidatos, provedores
// novos de prioridade menor (ex: OpenRouter, recém-integrado) nunca eram
// alcançados quando já havia 4 modelos de prioridade maior no mesmo nível —
// mesmo com Google E Groq quebrados de propósito, o OpenRouter ficava de fora
// e a cadeia ia direto pro erro. 6 dá margem real sem custo perceptível.
function pickCandidates(catalog, level, needsVision, estTokens = 0) {
  const viable = (predicate) => eligible(catalog, (m) => predicate(m) && fitsRequest(m, estTokens));

  const base = needsVision
    ? viable((m) => m.vision === true)
    : viable((m) => m.modality.includes('text') && (m.level_tags || []).includes(level));

  if (base.length > 0) {
    let lista = semCooldown(base).slice(0, 6);
    // Bug real (2026-09-14): com payload grande do Claude Code (13-17k tokens),
    // a Groq é excluída pelo teto de 7k e sobram só 2 modelos Google do nível.
    // Se ambos falharem (503/timeout), a requisição morre — mesmo havendo
    // modelos de 1M de contexto disponíveis, só que marcados em outro nível.
    // Por isso completamos a lista com QUALQUER modelo que caiba no pedido.
    if (lista.length < 4) {
      const extras = viable((m) => m.modality.includes('text') && !lista.some((x) => x.id === m.id));
      lista = [...lista, ...extras].slice(0, 6);
    }
    return withLocalBackup(catalog, lista);
  }

  // nada no nível exato: sobe de nível procurando quem aguenta o pedido
  for (let l = level + 1; l <= 4; l++) {
    const higher = viable((m) => m.modality.includes('text') && (m.level_tags || []).includes(l));
    if (higher.length > 0) return withLocalBackup(catalog, higher.slice(0, 6));
  }
  // último recurso: qualquer modelo de texto que caiba no pedido
  const any = viable((m) => m.modality.includes('text'));
  if (any.length > 0) return withLocalBackup(catalog, any.slice(0, 6));

  // ninguém cabe pelo tamanho: devolve os de maior contexto mesmo assim,
  // é melhor tentar e falhar com erro claro do que não tentar nada
  return eligible(catalog, (m) => m.modality.includes('text'))
    .sort((a, b) => (b.context_window || 0) - (a.context_window || 0))
    .slice(0, 3);
}

function appendLog(entry) {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n');
}

function anthropicResponse({ id, model, content, stopReason = 'end_turn', usage }) {
  return {
    id,
    type: 'message',
    role: 'assistant',
    model,
    content,
    stop_reason: stopReason,
    stop_sequence: null,
    usage: {
      input_tokens: usage?.prompt_tokens || usage?.promptTokenCount || 0,
      output_tokens: usage?.completion_tokens || usage?.candidatesTokenCount || 0,
    },
  };
}

function sendJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

/**
 * Emite os blocos no formato SSE do Anthropic, incluindo `tool_use`.
 * Um bloco de tool_use precisa de content_block_start (com id/name) seguido de
 * input_json_delta — é assim que o SDK do Claude Code remonta a chamada.
 */
function streamBlocks(res, { id, model, content, stopReason = 'end_turn', usage }) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  send('message_start', {
    type: 'message_start',
    message: { id, type: 'message', role: 'assistant', model, content: [], stop_reason: null, usage: { input_tokens: usage?.prompt_tokens || 0, output_tokens: 0 } },
  });

  content.forEach((bloco, index) => {
    if (bloco.type === 'tool_use') {
      send('content_block_start', {
        type: 'content_block_start', index,
        content_block: { type: 'tool_use', id: bloco.id, name: bloco.name, input: {} },
      });
      send('content_block_delta', {
        type: 'content_block_delta', index,
        delta: { type: 'input_json_delta', partial_json: JSON.stringify(bloco.input ?? {}) },
      });
    } else {
      send('content_block_start', { type: 'content_block_start', index, content_block: { type: 'text', text: '' } });
      send('content_block_delta', { type: 'content_block_delta', index, delta: { type: 'text_delta', text: bloco.text || '' } });
    }
    send('content_block_stop', { type: 'content_block_stop', index });
  });

  send('message_delta', {
    type: 'message_delta',
    delta: { stop_reason: stopReason, stop_sequence: null },
    usage: { output_tokens: usage?.completion_tokens || usage?.candidatesTokenCount || 0 },
  });
  send('message_stop', { type: 'message_stop' });
  res.end();
}

/**
 * STREAMING REAL — repassa eventos do provedor ao cliente à medida que chegam,
 * em vez de esperar a resposta inteira (o que `streamBlocks` faz).
 *
 * O PONTO CRÍTICO (a tensão streaming-vs-fallback): uma vez que o cliente
 * recebe `message_start`, o protocolo SSE do Anthropic não permite trocar de
 * provedor no meio — o cliente já está "dentro" de uma mensagem. Por isso
 * NÃO escrevemos nada em `res` até o PRIMEIRO evento de conteúdo real
 * (texto ou tool_use) chegar do provedor. Até esse ponto, se o provedor
 * falhar (HTTP de erro, stream vazio, timeout de inatividade antes de
 * qualquer chunk), nada foi comprometido e o candidato seguinte pode ser
 * tentado normalmente — o fallback continua funcionando.
 *
 * Só DEPOIS do primeiro evento real é que a função "compromete" a resposta:
 * escreve o cabeçalho SSE + `message_start`, e a partir daí qualquer falha
 * do provedor é encerrada como fim de stream (com o que já foi enviado),
 * nunca mais como fallback silencioso — isso é o comportamento aceito e
 * documentado no relatório (ETAPA 2 do pedido).
 *
 * Retorna { attempted, started, ok, stop_reason, usage, error }:
 *   - started=false  → nada foi escrito no cliente, pode tentar o próximo candidato
 *   - started=true   → a resposta já foi (ao menos parcialmente) entregue ao
 *                       cliente; a requisição termina aqui, sucesso ou não
 */
async function streamPassthrough(res, { id, model, candidate, ctx }) {
  const streamAdapter = STREAM_ADAPTERS[candidate.provider];
  if (!streamAdapter) return { attempted: false, started: false };

  let started = false;
  let indiceSeguinte = 0;
  const indicePorChave = new Map();
  const blocosAbertos = new Map(); // key -> tipo ('text'|'tool_use')

  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  const garantirInicio = () => {
    if (started) return;
    started = true;
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    send('message_start', {
      type: 'message_start',
      message: { id, type: 'message', role: 'assistant', model, content: [], stop_reason: null, usage: { input_tokens: 0, output_tokens: 0 } },
    });
  };

  const indiceDe = (key) => {
    if (!indicePorChave.has(key)) indicePorChave.set(key, indiceSeguinte++);
    return indicePorChave.get(key);
  };

  let result;
  try {
    result = await streamAdapter(candidate, ctx, (evt) => {
      garantirInicio();
      const index = indiceDe(evt.key);
      if (!blocosAbertos.has(evt.key)) {
        if (evt.kind === 'tool_start') {
          blocosAbertos.set(evt.key, 'tool_use');
          send('content_block_start', { type: 'content_block_start', index, content_block: { type: 'tool_use', id: evt.id, name: evt.name, input: {} } });
        } else {
          blocosAbertos.set(evt.key, 'text');
          send('content_block_start', { type: 'content_block_start', index, content_block: { type: 'text', text: '' } });
        }
      }
      if (evt.kind === 'text') {
        send('content_block_delta', { type: 'content_block_delta', index, delta: { type: 'text_delta', text: evt.text } });
      } else if (evt.kind === 'tool_delta') {
        send('content_block_delta', { type: 'content_block_delta', index, delta: { type: 'input_json_delta', partial_json: evt.partial_json } });
      }
    });
  } catch (e) {
    result = { ok: started ? true : false, error: `excecao no stream: ${e.message}`, hadContent: started };
  }

  if (!started) {
    // nada foi enviado ao cliente — falha limpa, o candidato seguinte pode tentar
    return { attempted: true, started: false, ok: false, error: result.error || 'stream sem conteudo' };
  }

  // já comprometido: fecha os blocos abertos e encerra a mensagem
  for (const [key, tipo] of blocosAbertos) {
    send('content_block_stop', { type: 'content_block_stop', index: indicePorChave.get(key) });
  }
  const stopReason = result.stop_reason || (blocosAbertos.size && [...blocosAbertos.values()].includes('tool_use') ? 'tool_use' : 'end_turn');
  send('message_delta', { type: 'message_delta', delta: { stop_reason: stopReason, stop_sequence: null }, usage: { output_tokens: result.usage?.completion_tokens || result.usage?.candidatesTokenCount || 0 } });
  send('message_stop', { type: 'message_stop' });
  res.end();

  return { attempted: true, started: true, ok: true, stop_reason: stopReason, usage: result.usage, error: result.error };
}

async function handleMessages(req, res, body) {
  const t0 = Date.now();
  // `tools` e `tool_choice` são ESSENCIAIS: sem eles o Claude Code nunca recebe
  // um tool_use e o laço agêntico morre (bug real, corrigido em 2026-09-14).
  const { messages = [], system, stream, max_tokens, tools, tool_choice } = body;
  const cls = classifyConversation(messages);
  const needsVision = cls.modality.includes('vision') || messages.some((m) => Array.isArray(m.content) && m.content.some((b) => b.type === 'image'));
  const catalog = loadCatalog();
  const estTokens = estimateTokens(system, messages);

  // contexto usado pelo score: tipo de tarefa vem da classificação + presença de tools
  const tipoTarefa = needsVision ? 'visao'
    : (Array.isArray(tools) && tools.length > 0) ? 'codigo'   // Claude Code agêntico = trabalho de código
    : cls.level >= 3 ? 'raciocinio' : 'texto';
  ctxScore = { level: cls.level, tipoTarefa, estTokens };

  const candidates = pickCandidates(catalog, cls.level, needsVision, estTokens);

  if (process.env.GATEWAY_DEBUG) {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    const preview = stripSystemReminders(flattenContent(lastUser?.content)).slice(0, 300);
    console.error(`[DEBUG classify] level=${cls.level} estTokens=${estTokens} candidates=[${candidates.map((c) => c.id).join(',')}] msgCount=${messages.length} strippedPreview="${preview.replace(/\n/g, '\\n')}"`);
  }

  if (candidates.length === 0) {
    return sendJSON(res, 502, { type: 'error', error: { type: 'overloaded_error', message: 'nenhum modelo gratuito elegível para esta tarefa' } });
  }

  const id = 'msg_' + Math.random().toString(36).slice(2, 12);
  const attempts = [];

  for (const candidate of candidates) {
    const adapter = ADAPTERS[candidate.provider];
    if (!adapter) continue;
    const tCall = Date.now();

    // -------------------------------------------------------------------
    // STREAMING REAL: se o cliente pediu stream E este provedor tem
    // adapter incremental, tenta o caminho de passthrough primeiro. Ele só
    // "comete" a resposta ao cliente depois do primeiro evento de conteúdo
    // real — até lá, uma falha aqui é igual a uma falha não-streaming: o
    // fallback segue pro próximo candidato normalmente.
    // -------------------------------------------------------------------
    if (stream && STREAM_ADAPTERS[candidate.provider]) {
      const passthrough = await streamPassthrough(res, {
        id, model: candidate.model, candidate, ctx: { system, messages, max_tokens, tools, tool_choice },
      });
      const latency_ms = Date.now() - tCall;

      if (passthrough.started) {
        // já entregue ao cliente (parcial ou completo) — não dá mais pra trocar
        // de candidato. Registra telemetria com o resultado real e encerra.
        scoring.registrar(candidate.id, { ok: true, latency_ms, error: passthrough.error });
        appendLog({
          ts: new Date().toISOString(), level: cls.level, needsVision, tipoTarefa,
          candidate: candidate.id, provider: candidate.provider, ok: true, latency_ms,
          streaming: 'real', mid_stream_error: passthrough.error || null,
        });
        appendLog({ ts: new Date().toISOString(), event: 'request_complete', level: cls.level, used: candidate.id, total_ms: Date.now() - t0, streaming: 'real' });
        return;
      }
      // não comprometido — trata como falha desta tentativa e cai no fallback
      attempts.push({ candidate: candidate.id, ok: false, latency_ms });
      scoring.registrar(candidate.id, { ok: false, latency_ms, error: passthrough.error });
      appendLog({
        ts: new Date().toISOString(), level: cls.level, needsVision, tipoTarefa,
        candidate: candidate.id, provider: candidate.provider, ok: false, latency_ms,
        streaming: 'real', tipoErro: scoring.classificarErro(passthrough.error), error: passthrough.error,
      });
      continue;
    }

    // Um adapter pode lançar (timeout abortado, DNS, conexão recusada). Isso
    // deve virar falha DESTE candidato e seguir para o próximo — nunca derrubar
    // a requisição inteira.
    let result;
    try {
      result = await adapter(candidate, { system, messages, max_tokens, tools, tool_choice });
    } catch (e) {
      result = { ok: false, error: e.isTimeout ? `timeout: ${e.message}` : `excecao: ${e.message}` };
    }
    const latency_ms = Date.now() - tCall;

    // VALIDAÇÃO DE CONTEÚDO: HTTP 200 com texto vazio NÃO é sucesso. Isso
    // acontece de verdade (ex: modelo de "thinking" que gasta todo o orçamento
    // raciocinando, ou resposta em formato inesperado). Sem esta checagem o
    // fallback para de cascatear e o cliente recebe uma resposta vazia.
    // ATENÇÃO: uma resposta com tool_use e SEM texto é sucesso legítimo — é
    // assim que o modelo pede para executar uma ferramenta. Só é falha quando
    // não há nem texto nem tool_use.
    const temToolUse = Array.isArray(result.content) && result.content.some((b) => b.type === 'tool_use');
    if (result.ok && !temToolUse && (!result.text || result.text.trim().length === 0)) {
      result = { ok: false, error: 'resposta vazia (HTTP 200 sem texto e sem tool_use) — tratado como falha' };
    }
    attempts.push({ candidate: candidate.id, ok: result.ok, latency_ms });

    // alimenta o score/cooldown com o resultado REAL desta tentativa
    scoring.registrar(candidate.id, { ok: result.ok, latency_ms, error: result.error });

    appendLog({
      ts: new Date().toISOString(),
      level: cls.level,
      needsVision,
      tipoTarefa,
      candidate: candidate.id,
      provider: candidate.provider,
      ok: result.ok,
      latency_ms,
      streaming: stream ? 'fake_buffered' : 'n/a',
      tipoErro: result.ok ? null : scoring.classificarErro(result.error),
      error: result.ok ? null : result.error,
    });

    if (result.ok) {
      const total_ms = Date.now() - t0;
      appendLog({ ts: new Date().toISOString(), event: 'request_complete', level: cls.level, used: candidate.id, total_ms, streaming: stream ? 'fake_buffered' : 'n/a' });
      const blocos = Array.isArray(result.content) && result.content.length
        ? result.content
        : [{ type: 'text', text: result.text }];
      const stopReason = result.stop_reason || (temToolUse ? 'tool_use' : 'end_turn');
      if (stream) return streamBlocks(res, { id, model: candidate.model, content: blocos, stopReason, usage: result.usage });
      return sendJSON(res, 200, anthropicResponse({ id, model: candidate.model, content: blocos, stopReason, usage: result.usage }));
    }
  }

  return sendJSON(res, 502, { type: 'error', error: { type: 'overloaded_error', message: 'todos os candidatos gratuitos falharam', attempts } });
}

const server = http.createServer((req, res) => {
  console.error(`[REQ] ${req.method} ${req.url}`);
  if (req.method === 'GET' && req.url === '/health') {
    return sendJSON(res, 200, { status: 'ok', note: 'gateway ativo (rota principal do Claude Code); 9Router 20128 permanece intacto como backup' });
  }
  if (req.method === 'GET' && req.url.startsWith('/v1/models')) {
    if (!checkAuth(req)) {
      return sendJSON(res, 401, { error: { message: 'Missing or invalid API key', type: 'authentication_error', code: 'invalid_api_key' } });
    }
    // lista mínima e honesta — o gateway escolhe o modelo real por trás, isto é só
    // para satisfazer clientes (como o Claude Code) que checam /v1/models no início.
    return sendJSON(res, 200, {
      object: 'list',
      data: [
        { id: 'claude-sonnet-5', object: 'model', owned_by: 'ai-orchestrator' },
        { id: 'claude-opus-5', object: 'model', owned_by: 'ai-orchestrator' },
        { id: 'claude-haiku-4-5', object: 'model', owned_by: 'ai-orchestrator' },
      ],
    });
  }
  if (req.method === 'POST' && req.url.startsWith('/v1/messages')) {
    if (!checkAuth(req)) {
      return sendJSON(res, 401, { error: { message: 'Missing or invalid API key', type: 'authentication_error', code: 'invalid_api_key' } });
    }
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', async () => {
      try {
        const body = JSON.parse(raw || '{}');
        await handleMessages(req, res, body);
      } catch (e) {
        sendJSON(res, 400, { type: 'error', error: { type: 'invalid_request_error', message: e.message } });
      }
    });
    return;
  }
  sendJSON(res, 404, { type: 'error', error: { type: 'not_found_error', message: 'rota não implementada neste gateway' } });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Gateway do AI Orchestrator ouvindo em http://localhost:${PORT} (ISOLADO — não é o roteador ativo do Claude Code)`);
  });
}

module.exports = { server };
