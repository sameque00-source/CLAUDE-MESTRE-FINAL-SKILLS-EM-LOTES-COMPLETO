/**
 * COMPOSIÇÃO DINÂMICA DE AGENTES — FASE 7, seções "Escolha de agentes" e
 * "Roteamento multiagente" do pedido.
 *
 * Não obriga pipeline fixo (ex: sempre researcher→architect→developer→qa→
 * reviewer). A composição real de uma missão já emerge da decomposição do
 * Planejador (FASE 2: cada subtarefa recebe seu próprio `tipo`, e
 * `handlers-tarefa.js` resolve o especialista real por tarefa, FASE 4) —
 * este módulo não reimplementa a decomposição, só TORNA EXPLÍCITA e
 * TESTÁVEL a composição resultante, e aplica a regra de "mínimo necessário":
 * uma tarefa recebe 1 agente quando 1 basta; a missão inteira pode envolver
 * vários agentes distintos SÓ quando o objetivo genuinamente exige (nenhum
 * agente é injetado artificialmente pra "parecer mais completo").
 */
const path = require('path');
const { resolverEspecialista } = require(path.join(__dirname, '..', '..', 'agentes', 'core', 'registro-especialistas.js'));
const { ESPECIALISTA_PADRAO_POR_TIPO } = require(path.join(__dirname, '..', '..', 'agentes', 'core', 'especialista-padrao-por-tipo.js'));

/**
 * Dado um plano já decomposto (missao.subtarefas, cada uma com `tipo` e/ou
 * `agenteFuncaoSugerida`), calcula a composição REAL de agentes distintos
 * que a missão vai efetivamente usar — nunca um número fixo.
 *
 * @param {object[]} subtarefas
 * @returns {{agentes:string[], porTarefa:object[], minimoNecessario:number}}
 */
function composicaoReal(subtarefas = []) {
  const porTarefa = subtarefas.map((t) => {
    const funcaoSugerida = t.agenteFuncaoSugerida || ESPECIALISTA_PADRAO_POR_TIPO[t.tipo] || null;
    const especialista = resolverEspecialista(funcaoSugerida);
    return { tarefaId: t.id, tipo: t.tipo, agente: especialista ? especialista.chave : null };
  });
  const agentes = [...new Set(porTarefa.map((x) => x.agente).filter(Boolean))];
  return { agentes, porTarefa, minimoNecessario: agentes.length };
}

/**
 * Sugere, a partir de um OBJETIVO em linguagem natural (antes de qualquer
 * decomposição), quais papéis de agente provavelmente serão necessários —
 * uso leve, determinístico, sem chamada de LLM, para decisões rápidas de
 * observabilidade/pré-triagem (a decomposição real e definitiva continua
 * sendo feita pelo Planejador via LLM, FASE 2 — isto aqui NUNCA substitui
 * aquilo, é só uma estimativa "de relance").
 */
function sugerirComposicaoPorObjetivo(objetivo = '') {
  const o = String(objetivo || '').toLowerCase();
  const papeis = new Set();
  if (/\b(pesquis|descobrir|vers[aã]o|document[aã]|comparar?)\b/.test(o)) papeis.add('research');
  if (/\b(arquitetur|estrutur|design|padr[aã]o de projeto)\b/.test(o)) papeis.add('architecture');
  if (/\b(cri(ar|e)|implementar?|escrever?|desenvolver?|c[oó]digo|aplicativo|servidor|api|p[aá]gina)\b/.test(o)) papeis.add('coding');
  if (/\b(test(ar|e)|qa|caso extremo|valida[cç][aã]o)\b/.test(o)) papeis.add('testing');
  if (/\b(revis[aã]o|revis(ar|e)|aprovar?)\b/.test(o)) papeis.add('reviewer');
  if (/\b(seguran[cç]a|senha|token|permiss[aã]o|vulnerab)\b/.test(o)) papeis.add('security');
  if (papeis.size === 0) papeis.add('coding'); // fallback mínimo: pelo menos alguém produz o resultado
  return [...papeis];
}

module.exports = { composicaoReal, sugerirComposicaoPorObjetivo };
