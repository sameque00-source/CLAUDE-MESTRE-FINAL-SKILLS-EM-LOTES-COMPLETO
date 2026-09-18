/**
 * PROVIDER DUCKDUCKGO — Instant Answer API oficial (api.duckduckgo.com),
 * gratuita, sem chave, sem cartão. NÃO é scraping de HTML (testado e
 * confirmado nesta sessão que o endpoint /html/ de busca é bloqueado por
 * proteção anti-bot no ambiente — este endpoint é diferente: uma API JSON
 * pública documentada, pensada pra consumo programático).
 *
 * Limitação real e honesta: a Instant Answer API não é um buscador geral —
 * só devolve resultado quando a query casa com um "tópico" conhecido
 * (Wikipedia/Wikidata por trás). Para queries muito específicas ela
 * frequentemente devolve Abstract vazio — reportado como tal, nunca
 * inventado.
 */
const https = require('https');

function requisitar(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'AI-ORCHESTRATOR-pesquisa/1.0' }, timeout: timeoutMs }, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) { res.resume(); reject(new Error(`HTTP ${res.statusCode}`)); return; }
      let corpo = '';
      res.on('data', (c) => { corpo += c; });
      res.on('end', () => resolve(corpo));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function buscarDuckDuckGo(query) {
  const q = String(query || '').trim();
  if (!q) return { ok: false, itens: [], error: 'query vazia' };
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`;
    const corpo = await requisitar(url);
    const json = JSON.parse(corpo);
    const itens = [];
    if (json.AbstractText) {
      itens.push({
        titulo: json.Heading || q,
        url: json.AbstractURL || null,
        trecho: json.AbstractText,
        data: null, // API não fornece data de publicação
        origem: json.AbstractSource || 'duckduckgo',
      });
    }
    for (const rel of (json.RelatedTopics || []).slice(0, 3)) {
      if (rel.Text && rel.FirstURL) itens.push({ titulo: rel.Text.slice(0, 80), url: rel.FirstURL, trecho: rel.Text, data: null, origem: 'duckduckgo-related' });
    }
    if (itens.length === 0) return { ok: false, itens: [], error: 'DuckDuckGo Instant Answer não tem tópico casando com esta query (limitação real da API, não erro de rede)' };
    return { ok: true, itens };
  } catch (e) {
    return { ok: false, itens: [], error: e.message };
  }
}

module.exports = { buscarDuckDuckGo };
