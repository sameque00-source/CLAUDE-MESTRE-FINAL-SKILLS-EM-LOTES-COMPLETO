/**
 * Suite de regressao da FASE 0 (Agente 9Router).
 * Roda contra o Gateway (localhost:20130) e o 9Router (localhost:20128)
 * para confirmar que nenhuma capacidade existente quebrou durante a
 * curadoria/preparacao desta fase.
 *
 * Uso: node suite-regressao-fase0.js
 */
const http = require('http');
const fs = require('fs');

const ENV_PATH = 'C:/Users/Administrator/Documents/AI-ORCHESTRATOR/config/.env';
let GATEWAY_KEY = '';
for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^GATEWAY_API_KEY=(.*)$/);
  if (m) GATEWAY_KEY = m[1].trim();
}

function httpJSON(host, port, path, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    const r = http.request({ hostname: host, port, path, method, headers }, (res) => {
      let raw = '';
      res.on('data', (c) => (raw += c));
      res.on('end', () => resolve({ status: res.statusCode, raw }));
    });
    r.on('error', reject);
    r.end();
  });
}

function postMessages(body) {
  return new Promise((resolve) => {
    const b = JSON.stringify(body);
    const r = http.request(
      { hostname: 'localhost', port: 20130, path: '/v1/messages', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': GATEWAY_KEY, 'Content-Length': Buffer.byteLength(b) } },
      (res) => { let raw = ''; res.on('data', (c) => (raw += c)); res.on('end', () => resolve({ status: res.statusCode, raw })); }
    );
    r.write(b);
    r.end();
  });
}

let passed = 0, failed = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { passed++; results.push(`PASS  ${name}`); }
  else { failed++; results.push(`FAIL  ${name}  ${detail}`); }
}

(async () => {
  const h1 = await httpJSON('localhost', 20130, '/health');
  check('health gateway', h1.status === 200);

  const h2 = await httpJSON('localhost', 20128, '/api/health');
  check('health 9Router', h2.status === 200);

  const r1 = await postMessages({ model: 'claude-sonnet-5', max_tokens: 30, messages: [{ role: 'user', content: 'Responda apenas: OK' }] });
  check('texto simples via gateway', r1.status === 200 && /ok/i.test(r1.raw));

  const toolsClima = [{ name: 'get_weather', description: 'Clima', input_schema: { type: 'object', properties: { city: { type: 'string' } }, required: ['city'] } }];
  const r2 = await postMessages({ model: 'claude-sonnet-5', max_tokens: 150, messages: [{ role: 'user', content: 'Qual o clima em Manaus? Use a ferramenta.' }], tools: toolsClima, tool_choice: { type: 'auto' } });
  check('tool_use via gateway', r2.status === 200 && r2.raw.includes('"type":"tool_use"'));

  const r3 = await postMessages({ model: 'claude-sonnet-5', max_tokens: 100, stream: true, messages: [{ role: 'user', content: 'Conte de 1 a 5.' }] });
  check('streaming SSE via gateway', r3.status === 200 && r3.raw.includes('event: message_start') && r3.raw.includes('event: message_stop'));

  const segredos = [GATEWAY_KEY];
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
    const m = line.match(/=(.+)$/);
    if (m && m[1].length > 10) segredos.push(m[1].trim());
  }
  const todas = [r1, r2, r3].map((r) => r.raw).join('\n');
  check('nenhuma credencial vazada', !segredos.some((s) => s && todas.includes(s)));

  console.log(results.join('\n'));
  console.log(`\n${passed}/${passed + failed} testes aprovados`);
  process.exit(failed > 0 ? 1 : 0);
})();
