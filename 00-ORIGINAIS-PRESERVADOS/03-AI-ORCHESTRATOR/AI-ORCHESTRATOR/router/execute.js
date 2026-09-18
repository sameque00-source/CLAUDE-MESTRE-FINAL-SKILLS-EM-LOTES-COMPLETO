/**
 * Executor — pega o plano do router, tenta os candidatos em ordem (fallback real),
 * chama a API de verdade, mede latência, e registra em logs/ para aprendizado
 * (Fase 11 do plano: latência/erro/sucesso alimenta priority no catálogo).
 *
 * Hoje só sabe falar com providers cujo formato é compatível com OpenAI chat
 * completions (Groq). Google (Gemini) tem formato próprio — adicionado quando
 * houver key configurada (ver adapters abaixo).
 */

const fs = require('fs');
const path = require('path');
const { route } = require('./route');

const ENV_PATH = path.join(__dirname, '..', 'config', '.env');
const LOG_PATH = path.join(__dirname, '..', 'logs', 'execucoes.jsonl');

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

/** Adapters: cada um sabe montar a chamada certa para um provedor. Retorna {ok, text, raw, error}. */
const ADAPTERS = {
  Groq: async (candidate, prompt) => {
    if (!ENV.GROQ_API_KEY) return { ok: false, error: 'GROQ_API_KEY não configurada' };
    const r = await fetch(`${candidate.endpoint}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ENV.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: candidate.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}` };
    const text = j.choices?.[0]?.message?.content ?? '';
    return { ok: true, text, raw: j };
  },
  'Google AI Studio': async (candidate, prompt) => {
    if (!ENV.GOOGLE_API_KEY) return { ok: false, error: 'GOOGLE_API_KEY não configurada' };
    const r = await fetch(
      `${candidate.endpoint}/models/${candidate.model}:generateContent?key=${ENV.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}` };
    const text = j.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return { ok: true, text, raw: j };
  },
  OpenRouter: async (candidate, prompt) => {
    if (!ENV.OPENROUTER_API_KEY) return { ok: false, error: 'OPENROUTER_API_KEY não configurada' };
    const r = await fetch(`${candidate.endpoint}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ENV.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: candidate.model, messages: [{ role: 'user', content: prompt }] }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}` };
    const text = j.choices?.[0]?.message?.content ?? '';
    return { ok: true, text, raw: j };
  },
};

function appendLog(entry) {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n');
}

async function run(input, opts = {}) {
  const plan = route(input, opts);
  const textPlan = plan.plan.find((p) => p.modality === 'text');
  const attempts = [];

  if (!textPlan) {
    return { ...plan, executed: false, reason: 'nenhum plano de texto gerado' };
  }

  for (const candidate of textPlan.candidates) {
    const adapter = ADAPTERS[candidate.provider];
    if (!adapter) {
      attempts.push({ candidate: candidate.id, ok: false, error: 'sem adapter implementado ainda' });
      continue;
    }
    const t0 = Date.now();
    const result = await adapter(candidate, input);
    const latency_ms = Date.now() - t0;
    attempts.push({ candidate: candidate.id, provider: candidate.provider, ok: result.ok, latency_ms, error: result.error });

    appendLog({
      ts: new Date().toISOString(),
      input_preview: input.slice(0, 80),
      level: plan.level,
      candidate: candidate.id,
      provider: candidate.provider,
      ok: result.ok,
      latency_ms,
      error: result.error || null,
    });

    if (result.ok) {
      return { ...plan, executed: true, used: candidate.id, latency_ms, text: result.text, attempts };
    }
    // falhou — tenta o próximo candidato da cadeia (fallback real, só entre free)
  }

  return { ...plan, executed: false, reason: 'todos os candidatos falharam ou sem adapter/key', attempts };
}

module.exports = { run };

if (require.main === module) {
  const input = process.argv.slice(2).join(' ') || 'olá';
  run(input).then((r) => console.log(JSON.stringify(r, null, 2)));
}
