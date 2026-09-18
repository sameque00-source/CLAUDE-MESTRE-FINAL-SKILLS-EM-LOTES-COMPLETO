/**
 * PROVIDER NPM — busca REAL de informação de pacotes via registry.npmjs.org.
 * API pública, gratuita, sem chave, sem cartão. Ideal pra "qual a versão
 * atual de uma biblioteca" (o próprio exemplo do teste obrigatório da FASE 5).
 */
const https = require('https');

function requisitar(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'AI-ORCHESTRATOR-pesquisa/1.0' }, timeout: timeoutMs }, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let corpo = '';
      res.on('data', (c) => { corpo += c; });
      res.on('end', () => resolve(corpo));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

/**
 * @param {string} pacote - nome do pacote npm (a "query" aqui é literal: o nome do pacote)
 * @returns {Promise<{ok:boolean, itens:object[], error?:string}>}
 */
async function buscarNpm(pacote) {
  const nomeSanitizado = String(pacote || '').trim().replace(/[^a-zA-Z0-9@/_.-]/g, '');
  if (!nomeSanitizado) return { ok: false, itens: [], error: 'nome de pacote vazio/inválido' };
  try {
    const corpo = await requisitar(`https://registry.npmjs.org/${encodeURIComponent(nomeSanitizado).replace('%40', '@').replace('%2F', '/')}/latest`);
    const json = JSON.parse(corpo);
    if (!json || !json.version) return { ok: false, itens: [], error: 'pacote sem campo version no registry' };
    return {
      ok: true,
      itens: [{
        titulo: `${json.name}@${json.version}`,
        url: json.homepage || `https://www.npmjs.com/package/${json.name}`,
        trecho: json.description || '',
        data: json.time || null, // registry não devolve "time" no endpoint /latest; fica null honestamente quando ausente
        origem: 'npm-registry',
        camposReais: { name: json.name, version: json.version, license: json.license || null, repository: json.repository ? (json.repository.url || json.repository) : null },
      }],
    };
  } catch (e) {
    return { ok: false, itens: [], error: e.message };
  }
}

module.exports = { buscarNpm };
