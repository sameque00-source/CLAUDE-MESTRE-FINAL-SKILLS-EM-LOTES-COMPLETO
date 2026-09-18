/**
 * WORKSPACE — FASE 3, seção 4/24 do pedido (isolamento de recurso/segurança).
 *
 * Cada missão executada ganha um diretório próprio, isolado, onde o
 * Executor tem permissão de escrever de verdade. Nenhuma escrita de
 * arquivo do Executor acontece fora daqui — reforça a regra já em vigor
 * desde a FASE 0 ("código gerado por tarefa autônoma roda primeiro num
 * diretório de trabalho isolado da missão").
 */
const fs = require('fs');
const path = require('path');

const MISSIONS_DIR = path.join(__dirname, '..', '..', 'orquestrador', 'missions');

// FASE 10: quando uma missão está VINCULADA a um projeto persistente, seu
// workspace deixa de ser o diretório isolado-por-missão (padrão desde a
// FASE 3) e passa a ser o workspace PERSISTENTE do projeto — assim
// "MISSÃO 1 → salvar estado → encerrar; MISSÃO 2 → abrir projeto →
// recuperar estado → continuar" funciona de verdade (arquivos da missão 1
// continuam lá pra missão 2 ler). Mudança CIRÚRGICA e aditiva: nenhuma
// missão sem projeto (o caso de todas as fases anteriores) muda de
// comportamento — `projetoDaMissao` devolve `null` e cai no `path.join`
// de sempre. `require` fica dentro da função (lazy) pra nunca criar
// dependência circular entre `executor/` e `projetos/` no carregamento do
// módulo (projetos/projeto.js não depende de workspace.js).
function projetoDaMissaoOuNull(missaoId) {
  try {
    return require(path.join(__dirname, '..', '..', 'projetos', 'core', 'vinculo-missao.js')).projetoDaMissao(missaoId);
  } catch {
    return null; // módulo de projetos ausente/indisponível — comportamento de sempre, nunca quebra a FASE 3
  }
}

function pastaWorkspace(missaoId) {
  const projetoId = projetoDaMissaoOuNull(missaoId);
  if (projetoId) {
    return require(path.join(__dirname, '..', '..', 'projetos', 'core', 'workspace-projeto.js')).pastaWorkspace(projetoId);
  }
  return path.join(MISSIONS_DIR, missaoId, 'workspace');
}

function garantirWorkspace(missaoId) {
  const dir = pastaWorkspace(missaoId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Resolve um caminho relativo DENTRO do workspace da missão, recusando
 * qualquer tentativa de escapar dele (`..`, caminho absoluto de fora).
 * Isso é o que impede uma tarefa gerada automaticamente de escrever em
 * qualquer lugar do sistema — só dentro do próprio workspace da missão.
 */
function resolverCaminhoSeguro(missaoId, caminhoRelativo) {
  const raiz = garantirWorkspace(missaoId);
  const alvo = path.resolve(raiz, caminhoRelativo);
  if (!alvo.startsWith(raiz + path.sep) && alvo !== raiz) {
    throw new Error(`caminho "${caminhoRelativo}" tentaria escrever fora do workspace da missão (bloqueado por segurança)`);
  }
  return alvo;
}

module.exports = { pastaWorkspace, garantirWorkspace, resolverCaminhoSeguro, MISSIONS_DIR };
