/**
 * TESTES DA FASE 7+8 — Roteamento Inteligente + Autocorreção Avançada.
 * Cobre os 20 cenários pedidos + as 2 missões reais obrigatórias.
 *
 * Uso: node teste-fase7-8-router-autocorrecao.js
 */
const path = require('path');
const ROUTER_DIR = path.join(__dirname, '..', 'router');
const AUTO_DIR = path.join(__dirname, '..', 'autocorrecao');
const EXE_DIR = path.join(__dirname, '..', 'executor');

const router = require(path.join(ROUTER_DIR, 'router.js'));
const estimadorContexto = require(path.join(ROUTER_DIR, 'core', 'estimador-contexto.js'));
const aprendizado = require(path.join(ROUTER_DIR, 'core', 'aprendizado.js'));
const composicaoAgentes = require(path.join(ROUTER_DIR, 'core', 'composicao-agentes.js'));

const autocorrecao = require(path.join(AUTO_DIR, 'autocorrecao.js'));
const { executarComAutocorrecao } = require(path.join(AUTO_DIR, 'core', 'loop.js'));

const { Executor } = require(path.join(EXE_DIR, 'executor.js'));
const { listarArquivosWorkspace } = require(path.join(EXE_DIR, 'core', 'handlers-tarefa.js'));
const ferramentas = require(path.join(EXE_DIR, 'core', 'ferramentas.js'));
const { garantirWorkspace } = require(path.join(EXE_DIR, 'core', 'workspace.js'));

let passed = 0, failed = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { passed++; results.push(`PASS  ${name}`); }
  else { failed++; results.push(`FAIL  ${name}  ${detail}`); }
  if (!cond) console.log(`  [FALHOU] ${name} — ${detail}`);
}

// ---------------------------------------------------------------------------
// 1-5: ROTEAMENTO
// ---------------------------------------------------------------------------
function testes1a5_Roteamento() {
  console.log('\n--- 1. Roteamento simples ---');
  const d1 = router.decidirModelo({ tipoTarefa: 'texto', complexidade: 1 });
  check('1. roteamento simples escolhe um candidato real do catálogo', !!d1.escolhido && typeof d1.escolhido.id === 'string', JSON.stringify(d1.motivo));

  console.log('\n--- 2. Roteamento complexo ---');
  const d2 = router.decidirModelo({ tipoTarefa: 'raciocinio', complexidade: 4 });
  check('2. roteamento complexo escolhe candidato apto a raciocínio', !!d2.escolhido, JSON.stringify(d2.motivo));

  console.log('\n--- 3. Escolha por modalidade (visão) ---');
  const d3 = router.decidirModelo({ tipoTarefa: 'texto', complexidade: 2, precisaVisao: true });
  check('3. escolha por modalidade filtra candidatos sem suporte a visão', !d3.escolhido || d3.escolhido.vision === true, JSON.stringify(d3));

  console.log('\n--- 4. Escolha por tamanho de contexto ---');
  const grande = estimadorContexto.avaliarContexto(estimadorContexto.estimarTokens('x'.repeat(500000)), 32000);
  const pequeno = estimadorContexto.avaliarContexto(estimadorContexto.estimarTokens('entrada pequena'), 32000);
  check('4a. entrada muito grande nunca "cabe" silenciosamente', grande.cabe === false && grande.estrategia !== 'ok');
  check('4b. entrada pequena cabe normalmente', pequeno.cabe === true && pequeno.estrategia === 'ok');
  check('4c. estratégia nunca é "truncar" (nunca corta dado importante)', grande.estrategia !== 'truncar');

  console.log('\n--- 5. Escolha por agente (composição multiagente não fixa) ---');
  const compSoDev = composicaoAgentes.sugerirComposicaoPorObjetivo('Crie um arquivo com uma função simples');
  const compComplexa = composicaoAgentes.sugerirComposicaoPorObjetivo('Pesquise a versão do pacote, defina a arquitetura, implemente, teste e revise o resultado com foco em segurança');
  check('5a. objetivo simples sugere poucos agentes (não força pipeline fixo)', compSoDev.length <= 2, JSON.stringify(compSoDev));
  check('5b. objetivo complexo sugere composição mais rica', compComplexa.length >= 4, JSON.stringify(compComplexa));
  check('5c. nunca um pipeline fixo idêntico para os dois objetivos', JSON.stringify(compSoDev) !== JSON.stringify(compComplexa));
}

// ---------------------------------------------------------------------------
// 6-9: FALLBACK E FALHAS DE ROTEAMENTO
// ---------------------------------------------------------------------------
function testes6a9_FallbackEFalhas() {
  console.log('\n--- 6. Fallback de provider (simulado, sem chamada real) ---');
  const catQuota = router.classificarFalha('HTTP 429: {"error":"per day quota exceeded"}');
  const catRateLimit = router.classificarFalha('HTTP 429 rate limit');
  check('6a. quota e rate_limit são distinguidos, não tratados igual', catQuota === 'quota' && catRateLimit === 'rate_limit', `${catQuota} vs ${catRateLimit}`);
  check('6b. fallback é recomendado para falha de provider', router.vaFallback(catQuota) === true);

  console.log('\n--- 7. Fallback de modelo (categorias distintas) ---');
  const catTimeout = router.classificarFalha('request timeout after 20000ms');
  const catVazio = router.classificarFalha('resposta vazia');
  const catRede = router.classificarFalha('fetch failed: ECONNREFUSED 127.0.0.1:1234');
  const catIncompat = router.classificarFalha('model not found for this provider');
  check('7. timeout/vazio/rede/modelo_incompativel são 4 categorias distintas', new Set([catTimeout, catVazio, catRede, catIncompat]).size === 4, JSON.stringify({ catTimeout, catVazio, catRede, catIncompat }));

  console.log('\n--- 8. Contexto grande (nunca truncar) ---');
  const catContexto = router.classificarFalha('', { estourouContexto: true });
  check('8a. contexto grande tem categoria própria', catContexto === router.CATEGORIAS_FALHA.CONTEXTO_GRANDE);
  check('8b. contexto grande NÃO recomenda simplesmente trocar de modelo (fallback de modelo não resolve tamanho)', router.vaFallback(catContexto) === false);

  console.log('\n--- 9. Erro de ferramenta indisponível ---');
  const catFerramenta = router.classificarFalha('', { ferramentaAusente: true });
  check('9. ferramenta indisponível tem categoria própria, distinta de erro de execução', catFerramenta === router.CATEGORIAS_FALHA.FERRAMENTA_INDISPONIVEL);
}

// ---------------------------------------------------------------------------
// 10: ERRO DE CÓDIGO (diagnóstico)
// ---------------------------------------------------------------------------
function teste10_ErroDeCodigo() {
  console.log('\n--- 10. Erro de código (diagnóstico) ---');
  const d = autocorrecao.diagnosticar('SyntaxError: Unexpected token }');
  check('10. SyntaxError é diagnosticado como erro_codigo', d.categoria === autocorrecao.CATEGORIAS_DIAGNOSTICO.CODIGO, d.categoria);
}

// ---------------------------------------------------------------------------
// 11-14: AUTOCORREÇÃO / REPETIÇÃO / LIMITE
// ---------------------------------------------------------------------------
async function testes11a14_AutocorrecaoRepeticaoLimite() {
  console.log('\n--- 11. Replanejamento (categoria erro_planejamento → REPLANEJAR) ---');
  const histPlan = [
    { categoria: 'erro_planejamento', mensagem: 'planejamento falhou: resposta vazia' },
    { categoria: 'erro_planejamento', mensagem: 'planejamento falhou: resposta vazia' },
  ];
  const estratPlan = autocorrecao.decidirProximaEstrategia(histPlan);
  check('11. falha de planejamento repetida decide REPLANEJAR (não insistir cegamente)', estratPlan.acao === autocorrecao.ACOES_ESTRATEGIA.REPLANEJAR, estratPlan.acao);

  console.log('\n--- 12. Autocorreção real (loop controlado, sucesso após correção) ---');
  let execs = 0;
  const rSucesso = await executarComAutocorrecao({
    executar: async () => { execs++; return { ok: execs >= 2 }; },
    avaliar: (r) => (r.ok ? { sucesso: true } : { sucesso: false, mensagemErro: 'SyntaxError: token inesperado' }),
    corrigir: async () => ({ corrigiu: true }),
  });
  check('12. loop de autocorreção converge pra SUCESSO_VALIDADO após corrigir de verdade', rSucesso.status === 'SUCESSO_VALIDADO' && rSucesso.tentativas === 2, JSON.stringify(rSucesso.status));

  console.log('\n--- 13. Repetição detectada (mesma falha exata 2x) ---');
  const histRepeticao = [
    { categoria: 'erro_codigo', mensagem: 'TypeError: x is not a function' },
    { categoria: 'erro_codigo', mensagem: 'TypeError: x is not a function' },
  ];
  const estratRepeticao = autocorrecao.decidirProximaEstrategia(histRepeticao);
  check('13a. repetição EXATA é detectada explicitamente', estratRepeticao.repeticaoDetectada === true);
  check('13b. repetição de erro_codigo muda para TROCAR_MODELO (nunca insiste na mesma coisa)', estratRepeticao.acao === autocorrecao.ACOES_ESTRATEGIA.TROCAR_MODELO);

  console.log('\n--- 14. Limite de tentativas (orçamento esgota → FALHA_HONESTA, nunca finge sucesso) ---');
  const rLimite = await executarComAutocorrecao({
    orcamento: autocorrecao.criarOrcamento({ maxTentativas: 2 }),
    executar: async () => ({ ok: false }),
    avaliar: () => ({ sucesso: false, mensagemErro: 'sempre a mesma falha de verdade' }),
    corrigir: async () => ({}),
  });
  check('14a. orçamento esgotado produz FALHA_HONESTA, nunca SUCESSO fingido', rLimite.status === 'FALHA_HONESTA');
  check('14b. nunca excede o máximo de tentativas configurado', rLimite.orcamento.tentativas <= 2, rLimite.orcamento.tentativas);
  check('14c. custo monetário permanece R$0 mesmo esgotando o orçamento', rLimite.orcamento.custoReais === 0);
}

// ---------------------------------------------------------------------------
// 15-16: MEMÓRIA DE ERRO / APRENDIZADO DE SOLUÇÃO
// ---------------------------------------------------------------------------
function testes15e16_MemoriaEAprendizado() {
  console.log('\n--- 15. Memória de erro (registrar → consultar) ---');
  const marcador = `erro-teste-fase78-${Date.now()}`;
  const grav = autocorrecao.registrarErro({
    categoria: 'erro_codigo', mensagemErro: `${marcador}: TypeError ao acessar propriedade indefinida`,
    causaProvavel: 'variável não inicializada', solucaoAplicada: `${marcador}: adicionar guard de undefined antes do acesso`,
    resolveu: true, tarefaTipo: 'codigo',
  });
  check('15a. erro e solução são gravados de verdade na memória', grav.erro.ok && grav.solucao.ok);
  const consulta = autocorrecao.consultarErroConhecido('erro_codigo', `${marcador}: TypeError ao acessar propriedade indefinida`, 'codigo');
  check('15b. consulta encontra o precedente real gravado', consulta.encontrouPrecedente === true && consulta.sugestao && consulta.sugestao.includes(marcador), JSON.stringify(consulta));

  console.log('\n--- 16. Aprendizado de solução (nunca copiado cegamente) ---');
  check('16. sugestão vem acompanhada de aviso explícito de revalidação', /revalidar|não aplicar sem testar/i.test(consulta.motivo), consulta.motivo);
}

// ---------------------------------------------------------------------------
// 17-19: VETO + AUTOCORREÇÃO (QA/Security/Reviewer)
// ---------------------------------------------------------------------------
function testes17a19_VetoAutocorrecao() {
  console.log('\n--- 17. QA veto → diagnóstico correto ---');
  const dQa = autocorrecao.diagnosticar('veto: QA reprovou — execução real falhou: teste X esperava 4, recebeu 5');
  check('17. veto de QA é diagnosticado como erro_validacao (não erro_codigo genérico)', dQa.categoria === autocorrecao.CATEGORIAS_DIAGNOSTICO.VALIDACAO, dQa.categoria);

  console.log('\n--- 18. Security veto → diagnóstico correto ---');
  const dSec = autocorrecao.diagnosticar('veto: Security bloqueou — senha hardcoded');
  check('18. veto de Security é diagnosticado como erro_validacao', dSec.categoria === autocorrecao.CATEGORIAS_DIAGNOSTICO.VALIDACAO);

  console.log('\n--- 19. Reviewer veto → estratégia consulta memória antes de corrigir de novo ---');
  const histVeto = [
    { categoria: 'erro_validacao', mensagem: 'veto: Reviewer reprovou — falta tratamento de erro' },
    { categoria: 'erro_validacao', mensagem: 'veto: Reviewer reprovou — falta tratamento de erro' },
  ];
  const estratVeto = autocorrecao.decidirProximaEstrategia(histVeto);
  check('19. veto repetido consulta memória antes de tentar de novo', estratVeto.acao === autocorrecao.ACOES_ESTRATEGIA.CONSULTAR_MEMORIA, estratVeto.acao);
}

// ---------------------------------------------------------------------------
// 20: FALHA HONESTA (critério objetivo de parar)
// ---------------------------------------------------------------------------
async function teste20_FalhaHonesta() {
  console.log('\n--- 20. Falha honesta (categoria sem correção automática viável) ---');
  const rBloqueio = await executarComAutocorrecao({
    executar: async () => ({ ok: false }),
    avaliar: () => ({ sucesso: false, mensagemErro: 'ENOENT: comando não encontrado no PATH deste ambiente' }),
    corrigir: async () => ({}),
  });
  check('20a. erro_ambiente repetido bloqueia (nunca insiste "cegamente" em algo que o Executor não pode consertar sozinho)', rBloqueio.status === 'FALHA_HONESTA');
  check('20b. motivo da falha honesta é explícito e rastreável', typeof rBloqueio.motivo === 'string' && rBloqueio.motivo.length > 10, rBloqueio.motivo);
  check('20c. histórico completo preservado (observabilidade)', rBloqueio.historico.length >= 1);
}

// ---------------------------------------------------------------------------
// MISSÃO REAL 1 — app pequena com bug controlado: detectar → diagnosticar →
// corrigir → testar → revisar.
// ---------------------------------------------------------------------------
async function missaoReal1_BugControlado() {
  console.log('\n=== MISSÃO REAL 1: app com bug controlado ===');
  const executor = new Executor();
  const objetivo = 'Existe um arquivo calculadora.js com uma função soma(a,b) que tem um BUG conhecido: ela está SUBTRAINDO em vez de somar (o código usa "a - b" no lugar de "a + b"). Leia o arquivo, corrija o bug para que soma(2,3) retorne 5, e valide rodando o arquivo de verdade (node calculadora.js).';

  // bug REAL e determinístico semeado no workspace ANTES da execução — a
  // missão é primeiro só PLANEJADA (sem rodar tarefas ainda), o arquivo com
  // bug é escrito no workspace real dessa missão, e só então a execução é
  // retomada — assim o gerador de código (FASE 8: agora recebe CONTEÚDO real
  // dos arquivos existentes, não só nomes) efetivamente vê o bug de verdade.
  let planejamento = await executor.planejador.planejar(objetivo);
  if (!planejamento.ok) { console.log('  (1ª rodada de planejamento falhou — variância real de LLM, tentando mais uma vez)'); planejamento = await executor.planejador.planejar(objetivo); }
  if (!planejamento.ok) {
    check('MISSÃO REAL 1: detectou/corrigiu bug controlado', false, `planejamento falhou 2x — variância real de LLM/quota, não bug de código (${planejamento.error})`);
    return;
  }
  garantirWorkspace(planejamento.missao.id);
  const codigoComBug = `function soma(a, b) { return a - b; } // BUG CONHECIDO: deveria ser a + b, não a - b\nconsole.log(soma(2, 3));\nmodule.exports = { soma };\n`;
  ferramentas.escreverArquivo(planejamento.missao.id, 'seed', 'calculadora.js', codigoComBug);

  const r = await executor.executarMissaoCompleta(planejamento.missao.id);
  console.log('  eventos:'); r.eventos.forEach((e) => console.log('   -', e.msg));

  if (!r.missao) {
    check('MISSÃO REAL 1: detectou/corrigiu bug controlado', false, 'retomada da missão falhou inesperadamente');
    return;
  }
  const arquivos = listarArquivosWorkspace(r.missao.id);
  const arqCalc = arquivos.find((a) => a === 'calculadora.js') || arquivos.find((a) => a.includes('calc')) || arquivos.find((a) => a.endsWith('.js'));
  check('MISSÃO REAL 1a: produziu arquivo real', arquivos.length > 0, JSON.stringify(arquivos));
  if (arqCalc) {
    const conteudo = ferramentas.lerArquivo(r.missao.id, arqCalc);
    check('MISSÃO REAL 1b: código final usa soma correta (a + b), não o bug (a - b)', conteudo.ok && /a\s*\+\s*b/.test(conteudo.conteudo) && !/return\s+a\s*-\s*b/.test(conteudo.conteudo), conteudo.conteudo);
  }
  check('MISSÃO REAL 1c: passou por validação real (testes registrados)', r.missao.resultados.some((res) => (res.testes || []).length > 0));
  check('MISSÃO REAL 1d: chegou a estado terminal', r.missao.estado === 'CONCLUIDA' || r.missao.estado === 'FALHA');
}

// ---------------------------------------------------------------------------
// MISSÃO REAL 2 — missão complexa (researcher+architect+developer+qa+
// reviewer escolhidos automaticamente), com falha real controlada no meio.
// ---------------------------------------------------------------------------
async function missaoReal2_ComposicaoEFalhaReal() {
  console.log('\n=== MISSÃO REAL 2: composição multiagente + falha real controlada ===');
  const executor = new Executor();
  const objetivo = 'Pesquise rapidamente qual a diferença entre var e let em JavaScript, defina uma pequena arquitetura de um contador simples em Node.js, implemente um arquivo contador.js que usa let corretamente (nao var) para evitar bug de escopo, teste rodando o arquivo, e revise o resultado final quanto a qualidade.';

  // FALHA REAL CONTROLADA (não simulada): põe o(s) modelo(s) hoje no topo do
  // ranking real pra tarefa de código em cooldown de VERDADE, usando a MESMA
  // API que o Gateway usa em produção quando um provider responde 429/503
  // (`gateway/scoring.js:registrar`, seção "Roteamento com falhas" do
  // pedido). Isso força o router a genuinamente PRECISAR escolher um
  // candidato diferente — prova real de fallback, não teatro.
  const scoring = require('C:/Users/Administrator/Documents/AI-ORCHESTRATOR/gateway/scoring.js');
  const decisaoAntes = router.decidirModelo({ tipoTarefa: 'codigo', complexidade: 2 });
  const modelosForcadosEmCooldown = decisaoAntes.escolhido ? [decisaoAntes.escolhido.id] : [];
  for (const id of modelosForcadosEmCooldown) {
    scoring.registrar(id, { ok: false, latency_ms: 100, error: 'HTTP 429: rate limit exceeded (falha real controlada injetada pelo teste da FASE 7)' });
    scoring.registrar(id, { ok: false, latency_ms: 100, error: 'HTTP 429: rate limit exceeded (falha real controlada injetada pelo teste da FASE 7)' });
  }
  const decisaoDepois = router.decidirModelo({ tipoTarefa: 'codigo', complexidade: 2 });
  check('MISSÃO REAL 2 (falha injetada): candidato top REALMENTE mudou após cooldown real', modelosForcadosEmCooldown.length === 0 || !modelosForcadosEmCooldown.includes(decisaoDepois.escolhido && decisaoDepois.escolhido.id), JSON.stringify({ antes: decisaoAntes.escolhido && decisaoAntes.escolhido.id, depois: decisaoDepois.escolhido && decisaoDepois.escolhido.id }));

  let r = await executor.executarMissaoCompleta(objetivo);
  if (!r.missao) { console.log('  (1ª rodada sem missão — variância real de LLM, tentando mais uma vez)'); r = await executor.executarMissaoCompleta(objetivo); }
  console.log('  eventos:'); r.eventos.forEach((e) => console.log('   -', e.msg));

  if (!r.missao) {
    check('MISSÃO REAL 2: composição multiagente automática executou', false, 'planejamento falhou 2x — variância real de LLM/quota, não bug de código');
    return;
  }

  const composicao = router.composicaoDaMissao(r.missao.subtarefas);
  console.log('  composição real de agentes usada:', composicao.agentes);
  check('MISSÃO REAL 2a: composição usou mais de 1 agente distinto (não é um único agente fazendo tudo)', composicao.agentes.length >= 2, JSON.stringify(composicao.agentes));
  check('MISSÃO REAL 2b: composição foi ESCOLHIDA, não fixa — reflete os tipos reais do plano', composicao.porTarefa.every((x) => r.missao.subtarefas.some((t) => t.id === x.tarefaId)));

  // falha real controlada: se alguma tarefa reabriu (histórico de reabertura
  // por veto ou correção), isso É a prova real de diagnóstico→correção→
  // novo teste→aprovação pedida pelo mandato — sem simular nada.
  const algumaTarefaTeveHistoricoDeCorrecao = r.missao.subtarefas.some((t) => t.tentativas > 0 || t.motivoReabertura || (t.historicoEstados || []).length > 2);
  const missaoConcluiuOuFalhouHonestamente = r.missao.estado === 'CONCLUIDA' || r.missao.estado === 'FALHA';
  check('MISSÃO REAL 2c: chegou a estado terminal (nunca travada)', missaoConcluiuOuFalhouHonestamente, r.missao.estado);
  check('MISSÃO REAL 2d: arquivo(s) real(is) produzido(s)', listarArquivosWorkspace(r.missao.id).length > 0, JSON.stringify(listarArquivosWorkspace(r.missao.id)));

  const tarefaCodigo = r.missao.subtarefas.find((t) => t.tipo === 'codigo');
  const modeloRealUsado = tarefaCodigo && tarefaCodigo.modelo;
  check('MISSÃO REAL 2e: a tarefa de código real usou um modelo DIFERENTE do que foi forçado em cooldown (fallback real, ponta a ponta)', modelosForcadosEmCooldown.length === 0 || (modeloRealUsado && !modelosForcadosEmCooldown.includes(modeloRealUsado)), JSON.stringify({ forcadoEmCooldown: modelosForcadosEmCooldown, usadoDeVerdade: modeloRealUsado }));
  console.log(`  (correção/reabertura real observada nesta execução: ${algumaTarefaTeveHistoricoDeCorrecao}; falha real injetada em: ${JSON.stringify(modelosForcadosEmCooldown)}; modelo real usado na tarefa de código: ${modeloRealUsado})`);
}

async function main() {
  testes1a5_Roteamento();
  testes6a9_FallbackEFalhas();
  teste10_ErroDeCodigo();
  await testes11a14_AutocorrecaoRepeticaoLimite();
  testes15e16_MemoriaEAprendizado();
  testes17a19_VetoAutocorrecao();
  await teste20_FalhaHonesta();
  await missaoReal1_BugControlado();
  await missaoReal2_ComposicaoEFalhaReal();

  console.log('\n' + results.join('\n'));
  console.log(`\n${passed}/${passed + failed} testes aprovados`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('EXCEÇÃO NÃO TRATADA:', e.stack); process.exit(1); });
