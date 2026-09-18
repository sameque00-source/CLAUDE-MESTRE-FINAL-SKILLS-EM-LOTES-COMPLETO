/**
 * ABSTRAÇÃO DE PROVIDER DE PESQUISA — FASE 5, seções 1/10 do pedido.
 * `search(query, options)` / `open(url, options)` desacoplados de qual
 * mecanismo executa. Detecta indisponibilidade real (erro de rede/HTTP) e
 * cai para o próximo provider gratuito — nunca usa API paga, nunca inventa.
 */
const { buscarNpm } = require('./providers/npm');
const { buscarDuckDuckGo } = require('./providers/duckduckgo');
const { buscarWikipedia } = require('./providers/wikipedia');
const { open: abrirUrl } = require('./extrator');

// Estado de disponibilidade em memória (por processo) — se um provider
// falhou por erro de rede recentemente, evita insistir nele imediatamente
// de novo dentro da MESMA pesquisa (não é um circuit-breaker persistente
// como o do Gateway/scoring — é local e simples, escopo desta fase).
const indisponivelAte = {};
const COOLDOWN_PROVIDER_MS = 30000;

function marcarIndisponivel(nome) { indisponivelAte[nome] = Date.now() + COOLDOWN_PROVIDER_MS; }
function estaIndisponivel(nome) { return (indisponivelAte[nome] || 0) > Date.now(); }

const PROVIDERS = {
  npm: { fn: buscarNpm, tipos: ['pacote', 'biblioteca', 'versao'] },
  wikipedia: { fn: buscarWikipedia, tipos: ['geral', 'conceito', 'definicao'] },
  duckduckgo: { fn: buscarDuckDuckGo, tipos: ['geral', 'atual', 'comparacao'] },
};

/**
 * @param {string} query
 * @param {object} [options]
 * @param {'pacote'|'geral'|'atual'|'comparacao'|'conceito'|null} [options.tipo] - dica de qual provider tentar primeiro
 * @param {string[]} [options.ordemForcada] - força ordem específica de providers (usado em teste)
 * @returns {Promise<{ok:boolean, provider:string|null, itens:object[], tentativas:object[], error?:string}>}
 */
async function search(query, options = {}) {
  const tentativas = [];
  let ordem = options.ordemForcada || Object.keys(PROVIDERS);
  if (options.tipo) {
    // prioriza providers que declaram lidar com esse tipo
    ordem = [...ordem].sort((a, b) => {
      const aRelevante = PROVIDERS[a].tipos.includes(options.tipo) ? 0 : 1;
      const bRelevante = PROVIDERS[b].tipos.includes(options.tipo) ? 0 : 1;
      return aRelevante - bRelevante;
    });
  }

  for (const nome of ordem) {
    if (estaIndisponivel(nome)) {
      tentativas.push({ provider: nome, ok: false, motivo: 'em cooldown por falha recente (não paga, tenta próximo grátis)' });
      continue;
    }
    const provider = PROVIDERS[nome];
    if (!provider) continue;
    try {
      const resultado = await provider.fn(query);
      tentativas.push({ provider: nome, ok: resultado.ok, motivo: resultado.ok ? 'sucesso' : resultado.error });
      if (resultado.ok && resultado.itens.length > 0) {
        return { ok: true, provider: nome, itens: resultado.itens, tentativas };
      }
    } catch (e) {
      marcarIndisponivel(nome);
      tentativas.push({ provider: nome, ok: false, motivo: `exceção: ${e.message}` });
    }
  }

  return {
    ok: false, provider: null, itens: [], tentativas,
    error: `todos os providers gratuitos tentados sem resultado (${tentativas.map((t) => t.provider).join(', ')})`,
  };
}

/** Reexporta `open` — mesma interface pedida na seção 1 (`open(url, options)`). */
const open = abrirUrl;

function listarProviders() {
  return Object.keys(PROVIDERS).map((nome) => ({ nome, tipos: PROVIDERS[nome].tipos, indisponivel: estaIndisponivel(nome) }));
}

module.exports = { search, open, listarProviders, PROVIDERS };
