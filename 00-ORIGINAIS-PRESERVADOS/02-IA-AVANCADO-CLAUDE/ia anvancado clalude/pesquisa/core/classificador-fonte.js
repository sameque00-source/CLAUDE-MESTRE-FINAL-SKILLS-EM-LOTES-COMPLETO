/**
 * CLASSIFICADOR DE FONTE — FASE 5, seção 5 do pedido.
 * "Não tratar todas as fontes como equivalentes." Classificação por padrão
 * de domínio/origem — determinística e auditável, não opinião de LLM.
 */

const NIVEIS = Object.freeze({
  DOCUMENTACAO_OFICIAL: { peso: 1.0, rotulo: 'documentação oficial' },
  FONTE_PRIMARIA: { peso: 0.9, rotulo: 'fonte primária' },
  PUBLICACAO_TECNICA: { peso: 0.75, rotulo: 'publicação técnica' },
  SITE_RECONHECIDO: { peso: 0.65, rotulo: 'site reconhecido' },
  COMUNIDADE: { peso: 0.45, rotulo: 'comunidade' },
  SECUNDARIA: { peso: 0.3, rotulo: 'conteúdo secundário' },
});

const PADROES = [
  { nivel: 'DOCUMENTACAO_OFICIAL', re: /registry\.npmjs\.org|npmjs\.com\/package|docs\.python\.org|developer\.mozilla\.org|nodejs\.org\/(api|docs)|react\.dev|pypi\.org|go\.dev\/doc|docs\.microsoft\.com|learn\.microsoft\.com/i },
  { nivel: 'FONTE_PRIMARIA', re: /github\.com\/[^/]+\/[^/]+\/(releases|blob|tags)|gitlab\.com/i },
  { nivel: 'PUBLICACAO_TECNICA', re: /wikipedia\.org|arxiv\.org|ieee\.org|acm\.org/i },
  { nivel: 'SITE_RECONHECIDO', re: /wikidata\.org|w3\.org|ietf\.org|owasp\.org/i },
  { nivel: 'COMUNIDADE', re: /stackoverflow\.com|reddit\.com|dev\.to|medium\.com|forum\./i },
];

/**
 * @param {string} url
 * @param {string} [origem] - identificador do provider que trouxe o item (ex: 'npm-registry')
 * @returns {{ nivel:string, peso:number, rotulo:string }}
 */
function classificarFonte(url, origem = '') {
  if (origem === 'npm-registry') return { nivel: 'DOCUMENTACAO_OFICIAL', ...NIVEIS.DOCUMENTACAO_OFICIAL };
  if (origem === 'wikipedia') return { nivel: 'PUBLICACAO_TECNICA', ...NIVEIS.PUBLICACAO_TECNICA };
  const alvo = String(url || '');
  for (const p of PADROES) {
    if (p.re.test(alvo)) return { nivel: p.nivel, ...NIVEIS[p.nivel] };
  }
  return { nivel: 'SECUNDARIA', ...NIVEIS.SECUNDARIA };
}

module.exports = { classificarFonte, NIVEIS };
