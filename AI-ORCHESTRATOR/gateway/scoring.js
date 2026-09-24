/**
 * SCORING + CIRCUIT BREAKER
 *
 * Substitui a ordenação por `priority` estática do catálogo por um score
 * calculado a partir do que REALMENTE aconteceu (telemetria em logs/gateway.jsonl)
 * mais o estado de saúde do momento.
 *
 * Problema real que isto resolve (medido em 2026-09-14): o Gemini devolvia 503
 * ou estourava timeout de 20s, e era tentado DE NOVO na requisição seguinte, e na
 * seguinte — 20s desperdiçados por vez. Uma tarefa agêntica simples levava 108s,
 * quase tudo esperando provedores que já se sabia estarem ruins.
 */

const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '..', 'logs', 'gateway.jsonl');
const ESTADO_PATH = path.join(__dirname, '..', 'logs', 'health-state.json');

// ---------------------------------------------------------------------------
// Estado de saúde em memória (persistido em disco para sobreviver a restart)
// ---------------------------------------------------------------------------
let estado = carregarEstado();

function carregarEstado() {
  try {
    return JSON.parse(fs.readFileSync(ESTADO_PATH, 'utf8'));
  } catch {
    return {};   // { [modeloId]: { falhasSeguidas, cooldownAte, ultimoErro, amostras: [...] } }
  }
}

function salvarEstado() {
  try {
    fs.mkdirSync(path.dirname(ESTADO_PATH), { recursive: true });
    fs.writeFileSync(ESTADO_PATH, JSON.stringify(estado, null, 2));
  } catch { /* estado é otimização, nunca deve derrubar uma requisição */ }
}

function entrada(id) {
  if (!estado[id]) estado[id] = { falhasSeguidas: 0, cooldownAte: 0, ultimoErro: null, amostras: [] };
  return estado[id];
}

// ---------------------------------------------------------------------------
// Classificação de erro — cada tipo merece uma reação diferente
// ---------------------------------------------------------------------------
const COOLDOWN_POR_TIPO = {
  quota:       30 * 60 * 1000,  // 429 de cota diária: tenta de novo só daqui a 30min
  rate_limit:   2 * 60 * 1000,  // 429 por minuto: 2min
  auth:        60 * 60 * 1000,  // 401/403: credencial ruim, não adianta insistir
  payload:                  0,  // 413: não é culpa do provedor, é do tamanho do pedido
  indisponivel: 5 * 60 * 1000,  // 503: sobrecarga temporária
  timeout:      3 * 60 * 1000,
  vazio:        1 * 60 * 1000,
  desconhecido: 1 * 60 * 1000,
};

function classificarErro(mensagem = '') {
  const m = String(mensagem);
  if (/timeout/i.test(m)) return 'timeout';
  if (/HTTP 401|HTTP 403|invalid.?api.?key|API key not valid|unauthorized/i.test(m)) return 'auth';
  if (/HTTP 413|too large|Request too large/i.test(m)) return 'payload';
  if (/HTTP 429/.test(m)) return /per day|daily|quota/i.test(m) ? 'quota' : 'rate_limit';
  if (/HTTP 5\d\d|high demand|UNAVAILABLE|overloaded/i.test(m)) return 'indisponivel';
  if (/resposta vazia/i.test(m)) return 'vazio';
  if (/HTTP 400|Invalid JSON|Cannot find field|INVALID_ARGUMENT/i.test(m)) return 'payload';
  return 'desconhecido';
}

// ---------------------------------------------------------------------------
// Registro de resultado (chamado pelo server a cada tentativa)
// ---------------------------------------------------------------------------
const MAX_AMOSTRAS = 20;

function registrar(modeloId, { ok, latency_ms, error }) {
  const e = entrada(modeloId);
  e.amostras.push({ ok: !!ok, latency_ms: latency_ms || 0, ts: Date.now() });
  if (e.amostras.length > MAX_AMOSTRAS) e.amostras.shift();

  if (ok) {
    e.falhasSeguidas = 0;
    e.cooldownAte = 0;
    e.ultimoErro = null;
  } else {
    const tipo = classificarErro(error);
    e.falhasSeguidas += 1;
    e.ultimoErro = tipo;
    const base = COOLDOWN_POR_TIPO[tipo] ?? COOLDOWN_POR_TIPO.desconhecido;
    if (base > 0) {
      // backoff: 1ª falha usa metade do tempo, a partir da 2ª usa o tempo cheio,
      // dobrando até um teto — evita banir um provedor por um soluço isolado.
      const mult = e.falhasSeguidas === 1 ? 0.5 : Math.min(2 ** (e.falhasSeguidas - 1), 8);
      e.cooldownAte = Date.now() + base * mult;
    }
  }
  salvarEstado();
}

function emCooldown(modeloId) {
  const e = estado[modeloId];
  return !!(e && e.cooldownAte && Date.now() < e.cooldownAte);
}

function motivoCooldown(modeloId) {
  const e = estado[modeloId];
  if (!e || !emCooldown(modeloId)) return null;
  return { tipo: e.ultimoErro, faltaMs: e.cooldownAte - Date.now(), falhasSeguidas: e.falhasSeguidas };
}

// ---------------------------------------------------------------------------
// Score
// ---------------------------------------------------------------------------
const NOTA = { 'muito forte': 1.0, forte: 0.85, boa: 0.65, media: 0.5, simples: 0.35, 'nao confirmado': 0.4 };
const nota = (v) => NOTA[String(v || '').toLowerCase()] ?? 0.4;

/** Teto de latência aceitável por nível (ms). Nível baixo prioriza rapidez. */
const TETO_LATENCIA = { 0: 2000, 1: 4000, 2: 8000, 3: 20000, 4: 40000 };

function estatisticas(modeloId) {
  const e = estado[modeloId];
  if (!e || e.amostras.length === 0) return { taxaSucesso: null, p50: null, n: 0 };
  const ok = e.amostras.filter((a) => a.ok);
  const lat = ok.map((a) => a.latency_ms).sort((a, b) => a - b);
  return {
    taxaSucesso: ok.length / e.amostras.length,
    p50: lat.length ? lat[Math.floor(lat.length / 2)] : null,
    n: e.amostras.length,
  };
}

/**
 * Score de 0 a ~1.5. Maior = melhor escolha para ESTE pedido.
 * Quem está em cooldown recebe -Infinity (fica fora).
 */
function score(modelo, { level = 1, tipoTarefa = 'texto', estTokens = 0 } = {}) {
  if (emCooldown(modelo.id)) return -Infinity;

  const st = estatisticas(modelo.id);

  // 1) aptidão para o tipo de tarefa — finalmente usa os campos do catálogo
  let aptidao;
  if (tipoTarefa === 'visao') aptidao = modelo.vision ? 0.9 : 0;
  else if (tipoTarefa === 'codigo') aptidao = nota(modelo.coding_score);
  else if (tipoTarefa === 'raciocinio') aptidao = nota(modelo.reasoning_score);
  else aptidao = (nota(modelo.coding_score) + nota(modelo.reasoning_score)) / 2;

  // 2) saúde observada (sem histórico = neutro, para não punir modelo novo)
  const saude = st.taxaSucesso === null ? 0.7 : st.taxaSucesso;

  // 3) latência relativa ao teto do nível
  const teto = TETO_LATENCIA[level] ?? 8000;
  const penalLatencia = st.p50 === null ? 0 : Math.min(st.p50 / teto, 2) * 0.35;

  // 4) folga de contexto: quanto mais apertado, pior
  const janela = modelo.context_window || 128000;
  const ocupacao = estTokens / janela;
  const penalContexto = ocupacao > 0.5 ? Math.min((ocupacao - 0.5) * 2, 1) * 0.4 : 0;

  // 5) preferência declarada do catálogo, com peso pequeno (desempate)
  const prioridade = (modelo.priority || 50) / 100 * 0.2;

  // pesos por nível: tarefa trivial valoriza velocidade; tarefa difícil valoriza aptidão
  const pesoAptidao = level >= 3 ? 0.85 : 0.45;
  const pesoSaude = 0.5;

  return aptidao * pesoAptidao + saude * pesoSaude + prioridade - penalLatencia - penalContexto;
}

/** Ordena candidatos pelo score (maior primeiro), removendo os em cooldown. */
function ordenar(modelos, contexto) {
  return modelos
    .map((m) => ({ m, s: score(m, contexto) }))
    .filter((x) => x.s !== -Infinity)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.m);
}

/** Aquece o estado a partir do histórico já gravado em disco. */
function aquecerDoLog(maxLinhas = 500) {
  try {
    const linhas = fs.readFileSync(LOG_PATH, 'utf8').trim().split('\n').slice(-maxLinhas);
    for (const l of linhas) {
      let j; try { j = JSON.parse(l); } catch { continue; }
      if (!j.candidate || j.event) continue;
      const e = entrada(j.candidate);
      e.amostras.push({ ok: !!j.ok, latency_ms: j.latency_ms || 0, ts: Date.parse(j.ts) || Date.now() });
      if (e.amostras.length > MAX_AMOSTRAS) e.amostras.shift();
    }
    // o histórico serve para latência/taxa de sucesso, NÃO para cooldown:
    // erros antigos não devem banir ninguém na subida do processo.
    for (const id of Object.keys(estado)) { estado[id].cooldownAte = 0; estado[id].falhasSeguidas = 0; }
  } catch { /* sem log ainda é normal */ }
}

module.exports = { score, ordenar, registrar, emCooldown, motivoCooldown, classificarErro, estatisticas, aquecerDoLog };
