/**
 * CRITÉRIOS DE CONCLUSÃO — FASE 2, seção 12 do pedido.
 * "Não permitir tarefas sem critério de término."
 *
 * Preferência: usar o `criterioConclusao` que o próprio LLM já devolveu
 * (é específico da tarefa real, melhor que um template genérico). Só cai
 * pro template por `tipo` quando o LLM não devolveu nada — nunca deixa uma
 * tarefa sem critério algum.
 */
const TEMPLATES_POR_TIPO = {
  pesquisa: ['fontes/fatos levantados e citados', 'resumo produzido com rótulo de confiança ([CONFIRMADO]/[INFERIDO])'],
  codigo: ['código existe no arquivo esperado', 'roda sem erro de sintaxe', 'testes relacionados passam'],
  arquitetura: ['decisão de arquitetura registrada com justificativa', 'não deixa alternativa óbvia sem considerar'],
  raciocinio: ['conclusão apresentada com justificativa verificável'],
  visao: ['saída da análise de imagem/vídeo produzida e coerente com a entrada'],
  consolidacao: ['todas as entradas dependentes foram usadas no resultado final'],
  teste: ['execução real do teste registrada (não "deveria passar")', 'resultado (passou/falhou) registrado com evidência'],
  revisao: ['aprovação ou reprovação explícita registrada', 'motivo da decisão documentado'],
  documentacao: ['documento existe no caminho esperado', 'reflete o estado real do que foi implementado'],
  devops: ['processo/deploy roda de fato', 'nenhuma credencial exposta no processo'],
  default: ['resultado produzido e verificável, não apenas "parece pronto"'],
};

function criteriosParaTarefa(tarefaDoPlano) {
  if (Array.isArray(tarefaDoPlano.criterioConclusao) && tarefaDoPlano.criterioConclusao.length > 0) {
    return tarefaDoPlano.criterioConclusao;
  }
  return TEMPLATES_POR_TIPO[tarefaDoPlano.tipo] || TEMPLATES_POR_TIPO.default;
}

/** Garante que TODA tarefa do plano tem pelo menos 1 critério — preenche o que faltar. */
function garantirCriteriosEmTodasAsTarefas(plano) {
  let preenchidos = 0;
  for (const t of plano.tarefas || []) {
    if (!Array.isArray(t.criterioConclusao) || t.criterioConclusao.length === 0) {
      t.criterioConclusao = criteriosParaTarefa(t);
      preenchidos++;
    }
  }
  return preenchidos;
}

module.exports = { criteriosParaTarefa, garantirCriteriosEmTodasAsTarefas, TEMPLATES_POR_TIPO };
