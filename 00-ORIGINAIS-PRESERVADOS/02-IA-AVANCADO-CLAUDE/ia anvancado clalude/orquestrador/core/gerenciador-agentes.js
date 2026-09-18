/**
 * GERENCIADOR DE AGENTES — FASE 1, seção 9 do pedido.
 *
 * Lê a base curada na FASE 0 (`base-agente/agents/*.md`). NUNCA carrega os
 * 19 de uma vez — só parseia o frontmatter (nome/descrição/tools) no boot
 * (é barato, são arquivos de poucas linhas) e só lê o CORPO do agente
 * (o prompt de verdade) quando ele é efetivamente selecionado para uma
 * tarefa, sob demanda (`carregarAgente`).
 */
const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '..', '..', 'base-agente', 'agents');

// Mapa função→nome-de-arquivo. Cobre os papéis de exemplo citados no pedido
// (researcher, architect, developer, frontend, backend, qa, reviewer,
// security, devops, multimedia) mais os demais da base curada da FASE 0.
const MAPA_FUNCAO = {
  researcher: 'research',
  pesquisador: 'research',
  architect: 'architecture',
  arquiteto: 'architecture',
  developer: 'coding',
  desenvolvedor: 'coding',
  programador: 'coding',
  frontend: 'frontend',
  backend: 'backend',
  qa: 'testing',
  testes: 'testing',
  reviewer: 'reviewer',
  revisor: 'reviewer',
  security: 'security',
  seguranca: 'security',
  'security-auditor': 'security-auditor',
  devops: 'devops',
  multimedia: null,             // ainda não existe agente dedicado (Fase 9 do plano mestre) — ver getAgentePorFuncao
  docs: 'docs',
  documentacao: 'docs',
  uiux: 'uiux',
  seo: 'seo',
  performance: 'performance',
  otimizador: 'optimizer',
  optimizer: 'optimizer',
  debugger: 'debugger',
  depurador: 'debugger',
  memoria: 'memory',
  memory: 'memory',
  'planejador-de-fase': 'queen-coordinator', // só planeja, não executa
  consolidador: 'coordinator',                // só consolida no fim
};

let indiceCache = null; // { nomeArquivo: { name, description, tools, color } }

function indexarAgentes() {
  if (indiceCache) return indiceCache;
  indiceCache = {};
  if (!fs.existsSync(AGENTS_DIR)) return indiceCache;
  for (const arq of fs.readdirSync(AGENTS_DIR)) {
    if (!arq.endsWith('.md')) continue;
    const nomeArquivo = arq.replace(/\.md$/, '');
    const conteudo = fs.readFileSync(path.join(AGENTS_DIR, arq), 'utf8');
    const meta = parsearFrontmatter(conteudo);
    indiceCache[nomeArquivo] = meta;
  }
  return indiceCache;
}

function parsearFrontmatter(conteudo) {
  const m = conteudo.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { name: null, description: null, tools: [], color: null };
  const bloco = m[1];
  const pegar = (chave) => {
    const linha = bloco.split('\n').find((l) => l.startsWith(`${chave}:`));
    return linha ? linha.slice(chave.length + 1).trim() : null;
  };
  const tools = pegar('tools');
  return {
    name: pegar('name'),
    description: pegar('description'),
    tools: tools ? tools.split(',').map((s) => s.trim()) : [],
    color: pegar('color'),
  };
}

/** Lista os agentes disponíveis SEM carregar o corpo (leve, para decisão). */
function listarAgentesDisponiveis() {
  const indice = indexarAgentes();
  return Object.entries(indice).map(([arquivo, meta]) => ({ arquivo, ...meta }));
}

/**
 * Escolhe qual agente atender a uma função/tipo de tarefa. Retorna só o
 * METADADO (não o corpo/prompt) — o corpo só é lido se de fato for usar
 * (ver carregarAgente). Retorna null se não houver agente para a função
 * (ex: 'multimedia' ainda não tem agente dedicado — gap conhecido, documentado
 * no plano mestre como Fase 9).
 */
function getAgentePorFuncao(funcao) {
  const chave = String(funcao || '').toLowerCase().trim();
  const arquivo = MAPA_FUNCAO[chave];
  if (!arquivo) return null;
  const indice = indexarAgentes();
  const meta = indice[arquivo];
  if (!meta) return null;
  return { arquivo, ...meta };
}

/** Carrega o corpo completo (prompt real) de um agente — sob demanda, só quando selecionado. */
function carregarAgente(arquivo) {
  const caminho = path.join(AGENTS_DIR, `${arquivo}.md`);
  if (!fs.existsSync(caminho)) return null;
  const conteudo = fs.readFileSync(caminho, 'utf8');
  const corpo = conteudo.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
  const meta = parsearFrontmatter(conteudo);
  return { arquivo, ...meta, prompt: corpo };
}

module.exports = { listarAgentesDisponiveis, getAgentePorFuncao, carregarAgente, MAPA_FUNCAO };
