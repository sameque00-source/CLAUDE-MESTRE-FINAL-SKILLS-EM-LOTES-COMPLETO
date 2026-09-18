/**
 * PROVIDER WIKIPEDIA — REST API oficial (pt/en), gratuita, sem chave.
 * Boa cobertura geral, sempre tem data de última edição (informação real
 * de "quando isso foi verificado pela última vez").
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

async function buscarWikipedia(query, idioma = 'pt') {
  const q = String(query || '').trim();
  if (!q) return { ok: false, itens: [], error: 'query vazia' };
  try {
    // 1) busca o título mais provável
    const urlBusca = `https://${idioma}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=1`;
    const respBusca = JSON.parse(await requisitar(urlBusca));
    const titulo = respBusca?.query?.search?.[0]?.title;
    if (!titulo) return { ok: false, itens: [], error: 'nenhum artigo encontrado na Wikipedia para esta query' };

    // 2) pega o resumo real + timestamp real de última edição
    const urlResumo = `https://${idioma}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`;
    const resumo = JSON.parse(await requisitar(urlResumo));
    if (!resumo || !resumo.extract) return { ok: false, itens: [], error: 'artigo encontrado mas sem resumo disponível' };

    return {
      ok: true,
      itens: [{
        titulo: resumo.title,
        url: resumo.content_urls?.desktop?.page || `https://${idioma}.wikipedia.org/wiki/${encodeURIComponent(titulo)}`,
        trecho: resumo.extract,
        data: resumo.timestamp || null, // timestamp REAL da última revisão retornada pela API
        origem: 'wikipedia',
      }],
    };
  } catch (e) {
    return { ok: false, itens: [], error: e.message };
  }
}

module.exports = { buscarWikipedia };
