/**
 * CACHE DE PESQUISA — FASE 5, seção 9 do pedido.
 * Persistente (sobrevive a reinício), validade VARIÁVEL por tipo de
 * conteúdo (não TTL fixo pra tudo — seção 16, compartilhado com a memória).
 */
const fs = require('fs');
const path = require('path');

const CACHE_PATH = path.join(__dirname, '..', 'dados', 'cache-pesquisa.json');

// validade em ms por categoria de conteúdo — mesma filosofia da seção 16
// (memória), aplicada aqui à pesquisa bruta antes mesmo de virar memória.
const VALIDADE_MS = {
  documentacao: 30 * 24 * 60 * 60 * 1000,   // 30 dias — muda devagar
  versao_pacote: 3 * 24 * 60 * 60 * 1000,   // 3 dias — pacotes lançam versão com frequência
  preco: 6 * 60 * 60 * 1000,                 // 6 horas — muda rápido
  noticia: 6 * 60 * 60 * 1000,               // 6 horas
  fato_geral: 14 * 24 * 60 * 60 * 1000,      // 14 dias — fatos estáveis (ex: definição técnica)
  default: 7 * 24 * 60 * 60 * 1000,          // 7 dias
};

function carregarTudo() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function salvarTudo(dados) {
  try {
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    const tmp = `${CACHE_PATH}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(dados, null, 2), 'utf8');
    fs.renameSync(tmp, CACHE_PATH);
    return true;
  } catch (e) {
    console.error(`[cache-pesquisa] falha ao salvar (não bloqueante): ${e.message}`);
    return false;
  }
}

function chaveDe(query, categoria) {
  return `${categoria || 'default'}::${String(query || '').trim().toLowerCase()}`;
}

/** @returns {object|null} entrada válida do cache, ou null se ausente/expirada */
function obter(query, categoria) {
  const dados = carregarTudo();
  const entrada = dados[chaveDe(query, categoria)];
  if (!entrada) return null;
  if (Date.now() > entrada.expiraEm) return null; // expirada — não confia em cache velho
  return entrada;
}

function salvar(query, categoria, resultado) {
  const dados = carregarTudo();
  const validade = VALIDADE_MS[categoria] || VALIDADE_MS.default;
  dados[chaveDe(query, categoria)] = {
    query, categoria, resultado,
    criadoEm: Date.now(),
    expiraEm: Date.now() + validade,
  };
  return salvarTudo(dados);
}

module.exports = { obter, salvar, VALIDADE_MS, chaveDe };
