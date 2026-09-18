/**
 * CLASSIFICADOR DE COMPLEXIDADE — FASE 2, seção 7 do pedido.
 *
 * Deliberadamente NÃO classifica por palavras-chave do objetivo. Classifica
 * a partir de SINAIS REAIS extraídos do plano já decomposto (número de
 * etapas, dependências, ferramentas distintas, risco, pesquisa necessária,
 * múltiplos agentes, multimodalidade) — os mesmos sinais listados
 * explicitamente no pedido. É determinístico: o mesmo plano sempre produz
 * o mesmo nível, o que o torna testável sem depender de um LLM "opinar"
 * sobre o próprio nível (LLMs são inconsistentes nisso; contar sinais não).
 */

const NIVEIS = Object.freeze({ 0: 'trivial', 1: 'simples', 2: 'normal', 3: 'complexo', 4: 'muito complexo' });

/**
 * @param {object} plano - saída já parseada do Planejador (com `.tarefas`)
 * @returns {{ nivel: 0|1|2|3|4, rotulo: string, sinais: object, pontuacao: number }}
 */
function classificarComplexidade(plano) {
  const tarefas = Array.isArray(plano.tarefas) ? plano.tarefas : [];
  const numEtapas = tarefas.length;
  const numDependencias = tarefas.reduce((acc, t) => acc + (Array.isArray(t.dependeDe) ? t.dependeDe.length : 0), 0);
  const ferramentasDistintas = new Set(tarefas.flatMap((t) => t.ferramentas || [])).size;
  const agentesDistintos = new Set(tarefas.map((t) => t.agenteFuncao).filter(Boolean)).size;
  const tarefasComPesquisa = tarefas.filter((t) => t.precisaPesquisa).length;
  const numRiscos = Array.isArray(plano.riscos) ? plano.riscos.length : 0;
  const modalidades = Array.isArray(plano.modalidade) ? plano.modalidade : ['texto'];
  const ehMultimodal = modalidades.some((m) => m && m !== 'texto');
  const temDecisaoUsuario = tarefas.some((t) => t.decisaoUsuario);

  // pontuação simples e auditável — cada sinal soma um peso proporcional
  // à sua importância real para o esforço de execução, não à sua "aparência".
  let pontuacao = 0;
  pontuacao += Math.min(numEtapas, 12) * 0.5;         // até 6 pontos
  pontuacao += Math.min(numDependencias, 10) * 0.4;   // até 4 pontos
  pontuacao += Math.min(ferramentasDistintas, 6) * 0.5; // até 3 pontos
  pontuacao += Math.min(agentesDistintos, 8) * 0.6;   // até 4.8 pontos — múltiplos agentes pesa bastante
  pontuacao += Math.min(tarefasComPesquisa, 5) * 0.7; // até 3.5 pontos — pesquisa pesa bastante
  pontuacao += Math.min(numRiscos, 5) * 0.4;          // até 2 pontos
  pontuacao += ehMultimodal ? 2.5 : 0;                 // multimodalidade é um salto de complexidade
  pontuacao += temDecisaoUsuario ? 1 : 0;

  const sinais = {
    numEtapas, numDependencias, ferramentasDistintas, agentesDistintos,
    tarefasComPesquisa, numRiscos, ehMultimodal, temDecisaoUsuario,
  };

  // limiares calibrados pra um plano de "app de edição de vídeo" (referência
  // do próprio pedido, ~15 tarefas + pesquisa + múltiplos agentes + risco)
  // cair em nível 4, e uma tarefa de "corrigir 1 bug" cair em nível 0-1.
  let nivel;
  if (pontuacao < 2) nivel = 0;
  else if (pontuacao < 5) nivel = 1;
  else if (pontuacao < 9) nivel = 2;
  else if (pontuacao < 14) nivel = 3;
  else nivel = 4;

  return { nivel, rotulo: NIVEIS[nivel], sinais, pontuacao: Number(pontuacao.toFixed(2)) };
}

module.exports = { classificarComplexidade, NIVEIS };
