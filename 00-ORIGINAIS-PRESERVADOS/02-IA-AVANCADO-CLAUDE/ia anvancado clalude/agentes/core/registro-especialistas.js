/**
 * REGISTRO DE ESPECIALISTAS — FASE 4, seções 1/4/9/10 do pedido.
 *
 * Auditoria real dos 19 agentes curados na FASE 0 (`base-agente/agents/`),
 * mapeados aqui para: especialidade, ferramentas PERMITIDAS (vocabulário do
 * Executor da FASE 3), tipo de tarefa pro scoring (FASE 1), se tem PODER DE
 * VETO, se é somente-leitura, e nível de complexidade típico.
 *
 * "Não inventar especialidades sem necessidade" (seção 4): os 19 nomes
 * abaixo são exatamente os 19 arquivos reais em `base-agente/agents/` — não
 * um só foi inventado aqui.
 */

const ESPECIALISTAS = Object.freeze({
  research: {
    arquivo: 'research', especialidade: 'pesquisa', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'navegador', 'api'], somenteLeitura: true, temVeto: false,
    complexidadeTipica: 2, entradaEsperada: 'pergunta ou objetivo a investigar', saidaEsperada: 'achados com fonte e confiança declarada',
  },
  architecture: {
    arquivo: 'architecture', especialidade: 'arquitetura', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: true, temVeto: true, // pode rejeitar solução mal projetada (seção 16)
    complexidadeTipica: 3, entradaEsperada: 'proposta ou objetivo de mudança estrutural', saidaEsperada: 'mapa de impacto + recomendação, pode rejeitar',
  },
  coding: {
    arquivo: 'coding', especialidade: 'implementação geral', tipoTarefaScoring: 'codigo',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 2, entradaEsperada: 'especificação da funcionalidade', saidaEsperada: 'arquivo(s) reais + validação de execução',
  },
  backend: {
    arquivo: 'backend', especialidade: 'backend/API/servidor', tipoTarefaScoring: 'codigo',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 3, entradaEsperada: 'especificação de rota/serviço/dado', saidaEsperada: 'código de servidor real + teste',
  },
  frontend: {
    arquivo: 'frontend', especialidade: 'UI/cliente', tipoTarefaScoring: 'codigo',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 2, entradaEsperada: 'especificação de tela/componente', saidaEsperada: 'código de interface real',
  },
  devops: {
    arquivo: 'devops', especialidade: 'CI/CD, build, ambiente', tipoTarefaScoring: 'codigo',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 3, entradaEsperada: 'objetivo de automação/deploy', saidaEsperada: 'script/config real, nunca toca produção sem aprovação',
  },
  testing: { // = "QA" do pedido
    arquivo: 'testing', especialidade: 'QA — testes, casos extremos, aceite', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: true, // pode bloquear conclusão (seção 18)
    complexidadeTipica: 2, entradaEsperada: 'artefato já implementado + critério de aceite', saidaEsperada: 'veredito aprovado/reprovado com evidência real',
  },
  reviewer: {
    arquivo: 'reviewer', especialidade: 'revisão adversarial final', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: true, temVeto: true,
    complexidadeTipica: 3, entradaEsperada: 'trabalho já testado de outros agentes', saidaEsperada: 'aprovado/reprovado com motivo, sem produzir código',
  },
  security: {
    arquivo: 'security', especialidade: 'segurança de mudança específica', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: true, temVeto: true,
    complexidadeTipica: 3, entradaEsperada: 'mudança que toca auth/permissão/dinheiro/dado pessoal', saidaEsperada: 'aprovado/bloqueado + risco encontrado',
  },
  'security-auditor': {
    arquivo: 'security-auditor', especialidade: 'auditoria ampla de segurança (projeto inteiro)', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: true, temVeto: true,
    complexidadeTipica: 4, entradaEsperada: 'workspace/projeto inteiro', saidaEsperada: 'lista de vulnerabilidades reais encontradas',
  },
  debugger: {
    arquivo: 'debugger', especialidade: 'investigação e correção de erro concreto', tipoTarefaScoring: 'codigo',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 3, entradaEsperada: 'sintoma observado (stack trace, comportamento errado)', saidaEsperada: 'causa raiz + correção real testada',
  },
  performance: {
    arquivo: 'performance', especialidade: 'gargalo real (CPU/memória/rede)', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: true, temVeto: false,
    complexidadeTipica: 3, entradaEsperada: 'sintoma de lentidão', saidaEsperada: 'gargalo identificado e medido, nunca opinião sem medição',
  },
  optimizer: {
    arquivo: 'optimizer', especialidade: 'aplicar otimização já identificada', tipoTarefaScoring: 'codigo',
    ferramentas: ['arquivos', 'terminal'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 2, entradaEsperada: 'gargalo já medido pelo performance', saidaEsperada: 'código otimizado + medição do ganho',
  },
  docs: {
    arquivo: 'docs', especialidade: 'documentação técnica', tipoTarefaScoring: 'texto',
    ferramentas: ['arquivos'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 1, entradaEsperada: 'código/decisão já estável', saidaEsperada: 'documento real refletindo o estado atual',
  },
  uiux: {
    arquivo: 'uiux', especialidade: 'direção visual antes de implementar', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos'], somenteLeitura: true, temVeto: false,
    complexidadeTipica: 2, entradaEsperada: 'objetivo de interface', saidaEsperada: 'diretriz visual — não escreve código de produção',
  },
  seo: {
    arquivo: 'seo', especialidade: 'copy, meta tags, estrutura semântica', tipoTarefaScoring: 'texto',
    ferramentas: ['arquivos'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 1, entradaEsperada: 'página/conteúdo já existente', saidaEsperada: 'texto/meta tags reais',
  },
  memory: {
    arquivo: 'memory', especialidade: 'organização de conhecimento persistente', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos'], somenteLeitura: false, temVeto: false,
    complexidadeTipica: 1, entradaEsperada: 'fato/decisão a persistir', saidaEsperada: 'registro estruturado do que guardar e onde',
  },
  'queen-coordinator': {
    arquivo: 'queen-coordinator', especialidade: 'planejamento de fases (só planeja)', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos'], somenteLeitura: true, temVeto: false,
    complexidadeTipica: 3, entradaEsperada: 'objetivo amplo', saidaEsperada: 'plano de execução — não executa nem despacha',
  },
  coordinator: {
    arquivo: 'coordinator', especialidade: 'consolidação final (só no fim)', tipoTarefaScoring: 'raciocinio',
    ferramentas: ['arquivos'], somenteLeitura: true, temVeto: false,
    complexidadeTipica: 2, entradaEsperada: 'resultados já produzidos por vários especialistas', saidaEsperada: 'síntese única com veredito',
  },
});

// Especialidades do pedido (seção 4) que NÃO têm agente dedicado na base
// curada — gap real, documentado, não inventado. `image`/`audio`/`video`
// ficam de fora até a FASE 9 (Gerenciador de Multimídia) do plano mestre;
// `database` foi absorvido por `backend` (mesma decisão já tomada na FASE 0:
// não recriar papel pra cada sub-fatia quando um agente mais genérico cobre
// bem, evitando "25 papéis pra tudo").
const GAPS_CONHECIDOS = Object.freeze(['image', 'audio', 'video', 'database (absorvido por backend)']);

/** Mapa de sinônimo → chave real do registro (o Planejador, FASE 2, usa `agenteFuncao` em inglês). */
const SINONIMOS = Object.freeze({
  researcher: 'research', planner: 'queen-coordinator', executor: 'coding',
  architect: 'architecture', developer: 'coding', qa: 'testing', analysis: 'performance',
  analise: 'performance', optimization: 'optimizer', documentation: 'docs',
  'ux/ui': 'uiux', ux: 'uiux', ui: 'uiux', database: 'backend',
});

function resolverEspecialista(nomeOuFuncao) {
  const chave = String(nomeOuFuncao || '').toLowerCase().trim();
  const real = ESPECIALISTAS[chave] ? chave : (SINONIMOS[chave] || null);
  return real ? { chave: real, ...ESPECIALISTAS[real] } : null;
}

function listarEspecialistas() {
  return Object.keys(ESPECIALISTAS).map((chave) => ({ chave, ...ESPECIALISTAS[chave] }));
}

module.exports = { ESPECIALISTAS, GAPS_CONHECIDOS, SINONIMOS, resolverEspecialista, listarEspecialistas };
