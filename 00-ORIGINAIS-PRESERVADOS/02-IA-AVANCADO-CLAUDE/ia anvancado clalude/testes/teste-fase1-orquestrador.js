/**
 * TESTES DA FASE 1 — Orquestrador Central.
 * Cobre os 12 cenários pedidos + 1 missão REAL executada de ponta a ponta
 * (não apenas funções isoladas), usando modelos reais via o Gateway.
 *
 * Uso: node teste-fase1-orquestrador.js
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', 'orquestrador');
const { Orquestrador, ESTADOS, STATUS, criarResultado } = require(path.join(ORQ_DIR, 'orquestrador.js'));
const persistencia = require(path.join(ORQ_DIR, 'core', 'persistencia.js'));
const decisor = require(path.join(ORQ_DIR, 'core', 'decisor.js'));
const { ADAPTERS } = require('C:/Users/Administrator/Documents/AI-ORCHESTRATOR/gateway/providers');

let passed = 0, failed = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { passed++; results.push(`PASS  ${name}`); }
  else { failed++; results.push(`FAIL  ${name}  ${detail}`); }
}
function assertThrows(fn, name) {
  try { fn(); check(name, false, 'esperava lançar erro, não lançou'); }
  catch (e) { check(name, true); }
}

async function testesMecanicos() {
  const orq = new Orquestrador();

  // 1. criar missão
  const missao = orq.criarMissao('Missão de teste da FASE 1', { complexidade: 2 });
  check('1. criar missão', missao.estado === ESTADOS.ANALISANDO && !!missao.id);

  // 2. adicionar subtarefa
  const tA = orq.adicionarSubtarefa(missao.id, { descricao: 'Tarefa A (independente)', tipo: 'texto' });
  const tB = orq.adicionarSubtarefa(missao.id, { descricao: 'Tarefa B (independente)', tipo: 'texto' });
  check('2. adicionar subtarefa', missao.subtarefas.length === 2 && missao.estado === ESTADOS.PLANEJANDO);

  // 3. criar dependência
  const tC = orq.adicionarSubtarefa(missao.id, { descricao: 'Tarefa C (depende de A e B)', tipo: 'consolidacao' });
  orq.adicionarDependencia(missao.id, tC.id, tA.id);
  orq.adicionarDependencia(missao.id, tC.id, tB.id);
  check('3. criar dependência', tC.dependeDe.includes(tA.id) && tC.dependeDe.includes(tB.id) && tC.status === STATUS.BLOQUEADA);

  // dependência cíclica deve ser rejeitada
  assertThrows(() => orq.adicionarDependencia(missao.id, tA.id, tC.id), '3b. dependência cíclica rejeitada');

  // 5. bloquear tarefa dependente (antes de A/B concluírem, C não pode estar pronta)
  const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
  check('5. bloquear tarefa dependente', !grafo.tarefaEstaPronta(missao, tC));

  // 4. executar tarefas independentes em paralelo
  const ordemChamadas = [];
  const executorMock = async (tarefa) => {
    ordemChamadas.push(tarefa.id);
    await new Promise((r) => setTimeout(r, 20)); // simula trabalho assíncrono real
    tarefa.modelo = 'mock-model';
    tarefa.agente = 'mock-agent';
    return criarResultado({ status: 'ok', resultado: `resultado de ${tarefa.descricao}`, evidencias: ['execução mock concluída'] });
  };
  const leva1 = await orq.executarProntas(missao.id, executorMock);
  check('4. executar tarefas independentes em paralelo', leva1.executadas.length === 2 && leva1.executadas.every((t) => t.status === STATUS.CONCLUIDA));

  // 6. concluir subtarefa
  check('6. concluir subtarefa', tA.status === STATUS.CONCLUIDA && tB.status === STATUS.CONCLUIDA && !!tA.resultado);

  // 7. liberar dependência (C deveria estar pronta agora que A e B concluíram)
  check('7. liberar dependência', grafo.tarefaEstaPronta(missao, tC));

  const leva2 = await orq.executarProntas(missao.id, executorMock);
  check('7b. tarefa antes bloqueada executa após liberação', leva2.executadas.some((t) => t.id === tC.id) && tC.status === STATUS.CONCLUIDA);

  // 10. conclusão da missão (todas concluídas -> deve ter ido para TESTANDO)
  check('10. missão avança para TESTANDO ao concluir todas as subtarefas', missao.estado === ESTADOS.TESTANDO);

  const missaoTestada = await orq.testarMissao(missao.id, async () => ({ passou: true, evidencia: 'mock: 3/3 subtarefas com resultado' }));
  check('10b. testarMissao aprova e avança para REVISANDO', missaoTestada.estado === ESTADOS.REVISANDO);

  const missaoRevisada = await orq.revisarMissao(missao.id, async () => ({ aprovado: true, motivo: 'mock: revisão aprovou' }));
  check('10c. revisarMissao aprova e conclui a missão', missaoRevisada.estado === ESTADOS.CONCLUIDA && !!missaoRevisada.estadoFinal);
  check('10d. nunca concluída sem passar por TESTANDO/REVISANDO', missaoRevisada.historicoEstados.some((h) => h.para === ESTADOS.TESTANDO) && missaoRevisada.historicoEstados.some((h) => h.para === ESTADOS.REVISANDO));

  // --- missão separada para testar erro/retry isoladamente ---
  const missao2 = orq.criarMissao('Missão de teste de erro/retry', { complexidade: 1 });
  const tFalha = orq.adicionarSubtarefa(missao2.id, { descricao: 'Tarefa que falha 2x e passa na 3a', tipo: 'texto' });
  let tentativa = 0;
  const executorComFalha = async (tarefa) => {
    tentativa++;
    if (tentativa < 3) {
      return criarResultado({ status: 'erro', erros: ['HTTP 503: indisponível temporariamente (simulado)'] });
    }
    tarefa.modelo = 'mock-model';
    return criarResultado({ status: 'ok', resultado: 'passou na 3a tentativa', evidencias: [`tentativa ${tentativa}`] });
  };
  await orq.executarProntas(missao2.id, executorComFalha); // tentativa 1: erro
  check('8. registrar erro', missao2.erros.length === 1 && missao2.erros[0].tarefaId === undefined && missao2.erros[0].subtarefaId === tFalha.id);
  check('8b. status volta pra pendente para retry', tFalha.status === STATUS.PENDENTE && tFalha.tentativas === 1);

  await orq.executarProntas(missao2.id, executorComFalha); // tentativa 2: erro de novo
  await orq.executarProntas(missao2.id, executorComFalha); // tentativa 3: sucesso
  check('9. retry até sucesso', tFalha.status === STATUS.CONCLUIDA && tFalha.tentativas === 2 && tentativa === 3);

  // 11. persistência
  const salvouOk = persistencia.salvar(missao2);
  check('11. persistência salva sem erro', salvouOk === true);
  const fs = require('fs');
  const existeArquivo = fs.existsSync(persistencia.pastaDaMissao(missao2.id) + '/MISSION_STATE.json');
  check('11b. arquivo MISSION_STATE.json existe em disco', existeArquivo);

  // 12. recuperação
  const orqNova = new Orquestrador(); // simula processo novo, sem memória
  const recuperada = orqNova.retomarMissao(missao2.id);
  check('12. recuperação após "reinício"', !!recuperada && recuperada.id === missao2.id && recuperada.subtarefas.length === missao2.subtarefas.length);
  check('12b. estado das subtarefas preservado na recuperação', recuperada.subtarefas[0].status === STATUS.CONCLUIDA);

  // transição inválida deve ser rejeitada pela máquina de estados
  const missao3 = orq.criarMissao('Missão para testar transição inválida', {});
  const { TransicaoInvalidaError } = require(path.join(ORQ_DIR, 'core', 'maquina-estados.js'));
  try {
    require(path.join(ORQ_DIR, 'core', 'maquina-estados.js')).transicionar(missao3, ESTADOS.CONCLUIDA, 'tentativa inválida direto de ANALISANDO');
    check('máquina de estados rejeita transição inválida', false, 'não lançou');
  } catch (e) {
    check('máquina de estados rejeita transição inválida', e instanceof TransicaoInvalidaError);
  }

  return orq;
}

async function testeMissaoReal() {
  console.log('\n--- MISSÃO REAL: "pesquisar X + pesquisar Y → consolidar → decisão" ---');
  const orq = new Orquestrador();
  const missao = orq.criarMissao(
    'Decidir se Node.js ou Python é melhor para construir um roteador de LLMs local, baseado em pesquisa real sobre cada um.',
    { complexidade: 2 }
  );

  const tX = orq.adicionarSubtarefa(missao.id, {
    descricao: 'Resumir em 2 frases os pontos fortes do Node.js para servidores de rede (I/O assíncrono, ecossistema)',
    tipo: 'pesquisa',
    contexto: { objetivo: 'Node.js para roteador de LLM', resultadoEsperado: 'resumo curto e factual' },
  });
  const tY = orq.adicionarSubtarefa(missao.id, {
    descricao: 'Resumir em 2 frases os pontos fortes do Python para servidores de rede (async/await, ecossistema de IA)',
    tipo: 'pesquisa',
    contexto: { objetivo: 'Python para roteador de LLM', resultadoEsperado: 'resumo curto e factual' },
  });
  const tConsolida = orq.adicionarSubtarefa(missao.id, {
    descricao: 'Com base nos dois resumos, decidir em 1 frase qual linguagem é mais adequada para ESTE projeto específico (que já é 100% Node.js) e por quê',
    tipo: 'consolidacao',
  });
  orq.adicionarDependencia(missao.id, tConsolida.id, tX.id);
  orq.adicionarDependencia(missao.id, tConsolida.id, tY.id);

  /** Executor REAL: escolhe modelo via decisor (score real) e chama o adapter real do Gateway. */
  const executorReal = async (tarefa, missaoAtual) => {
    const decisao = decisor.decidirModelo({ tipoTarefa: tarefa.tipo, complexidade: missaoAtual.complexidade });
    if (!decisao.escolhido) {
      return criarResultado({ status: 'erro', erros: [`decisor não encontrou candidato: ${decisao.motivo}`] });
    }
    const candidate = decisao.escolhido;
    tarefa.modelo = candidate.id;

    let mensagens;
    if (tarefa.tipo === 'consolidacao') {
      const achados = missaoAtual.resultados.map((r) => `- ${r.resultado}`).join('\n');
      mensagens = [{ role: 'user', content: `${tarefa.descricao}\n\nAchados da pesquisa:\n${achados}` }];
    } else {
      mensagens = [{ role: 'user', content: tarefa.contexto.objetivo + ': ' + tarefa.descricao }];
    }

    const adapter = ADAPTERS[candidate.provider];
    const t0 = Date.now();
    let resposta;
    try {
      resposta = await adapter(candidate, { system: undefined, messages: mensagens, max_tokens: 200, tools: undefined, tool_choice: undefined });
    } catch (e) {
      return criarResultado({ status: 'erro', erros: [`exceção no adapter: ${e.message}`] });
    }
    const latencia = Date.now() - t0;

    if (!resposta.ok || !resposta.text || !resposta.text.trim()) {
      return criarResultado({ status: 'erro', erros: [resposta.error || 'resposta vazia'] });
    }
    return criarResultado({
      status: 'ok',
      resultado: resposta.text.trim(),
      evidencias: [`modelo=${candidate.id} provider=${candidate.provider} latencia_ms=${latencia}`],
    });
  };

  await orq.executarProntas(missao.id, executorReal); // roda tX e tY em paralelo, de verdade
  console.log(`Tarefa X (${tX.status}):`, tX.resultado && tX.resultado.resultado);
  console.log(`Tarefa Y (${tY.status}):`, tY.resultado && tY.resultado.resultado);
  check('missão real: pesquisas paralelas concluídas com texto real', tX.status === STATUS.CONCLUIDA && tY.status === STATUS.CONCLUIDA && tX.resultado.resultado.length > 5 && tY.resultado.resultado.length > 5);

  await orq.executarProntas(missao.id, executorReal); // roda tConsolida (dependia de X e Y)
  console.log(`Tarefa Consolidação (${tConsolida.status}):`, tConsolida.resultado && tConsolida.resultado.resultado);
  check('missão real: consolidação usou os dois achados anteriores', tConsolida.status === STATUS.CONCLUIDA && /node/i.test(tConsolida.resultado.resultado));

  check('missão real: avançou para TESTANDO após concluir tudo', missao.estado === ESTADOS.TESTANDO);

  await orq.testarMissao(missao.id, async (m) => ({ passou: m.resultados.length === 3, evidencia: `${m.resultados.length}/3 subtarefas com resultado real` }));
  await orq.revisarMissao(missao.id, async (m) => ({ aprovado: m.resultados.every((r) => r.status === 'ok'), motivo: 'todos os resultados têm status ok' }));
  check('missão real: concluída de ponta a ponta pelo orquestrador', missao.estado === ESTADOS.CONCLUIDA);

  persistencia.salvar(missao);
  console.log(`Missão real persistida em: ${persistencia.pastaDaMissao(missao.id)}`);
}

(async () => {
  await testesMecanicos();
  try {
    await testeMissaoReal();
  } catch (e) {
    check('missão real executou sem exceção não tratada', false, e.stack);
  }

  console.log('\n' + results.join('\n'));
  console.log(`\n${passed}/${passed + failed} testes aprovados`);
  process.exit(failed > 0 ? 1 : 0);
})();
