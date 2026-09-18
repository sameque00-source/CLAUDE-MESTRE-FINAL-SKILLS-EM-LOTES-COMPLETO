/**
 * EXTRATOR — `open(url, options)` real da interface pedida na seção 1.
 * Busca a URL de verdade (HTTP real) e extrai texto legível de HTML/JSON.
 * Não simula conteúdo — se a URL não responder, devolve erro real.
 */
const https = require('https');
const http = require('http');

const TAMANHO_MAX = 300000; // limite de segurança contra páginas gigantes

function buscarBruto(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    let urlObj;
    try { urlObj = new URL(url); } catch { reject(new Error('URL inválida')); return; }
    if (!['http:', 'https:'].includes(urlObj.protocol)) { reject(new Error('protocolo não suportado (só http/https)')); return; }
    const lib = urlObj.protocol === 'https:' ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'AI-ORCHESTRATOR-pesquisa/1.0' }, timeout: timeoutMs }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        buscarBruto(new URL(res.headers.location, url).toString(), timeoutMs).then(resolve, reject);
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) { res.resume(); reject(new Error(`HTTP ${res.statusCode}`)); return; }
      let corpo = '';
      let tamanho = 0;
      res.on('data', (c) => {
        tamanho += c.length;
        if (tamanho > TAMANHO_MAX) { req.destroy(); return; }
        corpo += c;
      });
      res.on('end', () => resolve({ corpo, contentType: res.headers['content-type'] || '' }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

/** Extração simples e real de texto legível de HTML (remove script/style/tags, decodifica entidades básicas). */
function extrairTextoDeHTML(html) {
  let texto = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return texto;
}

/**
 * @param {string} url
 * @param {object} [opcoes]
 * @returns {Promise<{ok:boolean, texto:string, titulo:string|null, url:string, error?:string}>}
 */
async function open(url, opcoes = {}) {
  try {
    const { corpo, contentType } = await buscarBruto(url, opcoes.timeoutMs);
    let texto;
    if (contentType.includes('application/json')) {
      texto = corpo; // JSON já é estruturado, não precisa "extrair texto"
    } else {
      texto = extrairTextoDeHTML(corpo);
    }
    const matchTitulo = corpo.match(/<title[^>]*>([^<]*)<\/title>/i);
    const limite = opcoes.limiteCaracteres || 3000;
    return {
      ok: true,
      texto: texto.slice(0, limite),
      titulo: matchTitulo ? matchTitulo[1].trim() : null,
      url,
      truncado: texto.length > limite,
    };
  } catch (e) {
    return { ok: false, texto: '', titulo: null, url, error: e.message };
  }
}

module.exports = { open, extrairTextoDeHTML };
