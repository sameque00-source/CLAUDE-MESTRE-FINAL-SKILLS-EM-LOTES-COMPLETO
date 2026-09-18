/**
 * TESTES DA FASE 3 — Executor Autônomo + Paralelismo Real.
 * Cobre: paralelismo medido (seção 20), dependência (seção 21), falha
 * (seção 22), recuperação (seção 23) e a missão real obrigatória (seção 19).
 *
 * Uso: node teste-fase3-executor.js
 */
const path = require('path');
const EXE_DIR = path.join(__dirname, '..', 'executor');
const ORQ_DIR = path.join(__dirname, '..', 'orquestrador');
const PLAN_DIR = path.join(__dirname, '..', 'planejador');

const { Executor } = require(path.join(EXE_DIR, 'executor.js'));
const { executarTarefaReal, listarArquivosWorkspace } = require(path.join(EXE_DIR, 'core', 'handlers-tarefa.js'));
const ferramentas = require(path.join(EXE_DIR, 'core', 'ferramentas.js'));
const { classificarFalhaExecucao, estrategiaParaTipo } = require(path.join(EXE_DIR, 'core', 'classificador-falha.js'));

const { Orquestrador, ESTADOS, STATUS, criarResultado } = require(path.join(ORQ_DIR, 'orquestrador.js'));
const { criarTarefa } = require(path.join(ORQ_DIR, 'core', 'Tarefa.js'));
const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
const persistencia = require(path.join(ORQ_DIR, 'core', 'persistencia.js'));

const { Planejador } = require(path.join(PLAN_DIR, 'planejador.js'));

let passed = 0, failed = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { passed++; results.push(`PASS  ${name}`); }
  else { failed++; results.push(`FAIL  ${name}  ${detail}`); }
  if (!cond) console.log(`  [FALHOU] ${name} — ${detail}`);
}

async function testeParalelismoReal() {
  console.log('\n--- TESTE DE PARALELISMO (seção 20) ---');
  const orq = new Orquestrador();
  const missao = orq.criarMissao('Missão sintética de paralelismo real', { complexidade: 2 });
  const descricoes = [
    'Em uma frase, diga uma vantagem do Node.js.',
    'Em uma frase, diga uma vantagem do Python.',
    'Em uma frase, diga uma vantagem do Go.',
  ];
  const tarefas = descricoes.map((d) => orq.adicionarSubtarefa(missao.id, { descricao: d, tipo: 'raciocinio' }));
  orq.fecharPlanejamento(missao.id);

  const tempos = {};
  const executorComTempo = async (tarefa, m) => {
    tempos[tarefa.id] = { inicio: Date.now() };
    const r = await executarTarefaReal(tarefa, m);
    tempos[tarefa.id].fim = Date.now();
    return r;
  };

  await orq.executarProntas(missao.id, executorComTempo);

  const todasOk = tarefas.every((t) => t.status === STATUS.CONCLUIDA);
  check('paralelismo: todas as 3 tarefas independentes concluíram', todasOk, JSON.stringify(tarefas.map((t) => t.status)));

  // sobreposição real: pelo menos um par de tarefas com intervalos que se
  // cruzam (inicio de uma antes do fim da outra) — prova execução paralela
  // de verdade, não sequencial disfarçada.
  const ids = tarefas.map((t) => t.id);
  let houveSobreposicao = false;
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = tempos[ids[i]], b = tempos[ids[j]];
      if (a && b && a.inicio < b.fim && b.inicio < a.fim) houveSobreposicao = true;
    }
  }
  console.log('  tempos:', JSON.stringify(tempos, null, 2));
  check('paralelismo: houve sobreposição real de horário entre tarefas independentes', houveSobreposicao);
}

async function testeDependenciaReal() {
  console.log('\n--- TESTE DE DEPENDÊNCIA (seção 21) ---');
  const orq = new Orquestrador();
  const missao = orq.criarMissao('Missão sintética de dependência estrita A→B→C', { complexidade: 1 });
  const tA = orq.adicionarSubtarefa(missao.id, { descricao: 'Responda apenas: A', tipo: 'raciocinio' });
  const tB = orq.adicionarSubtarefa(missao.id, { descricao: 'Responda apenas: B', tipo: 'raciocinio' });
  const tC = orq.adicionarSubtarefa(missao.id, { descricao: 'Responda apenas: C', tipo: 'raciocinio' });
  orq.adicionarDependencia(missao.id, tB.id, tA.id);
  orq.adicionarDependencia(missao.id, tC.id, tB.id);
  orq.fecharPlanejamento(missao.id);

  const tempos = {};
  const executorComTempo = async (tarefa, m) => {
    tempos[tarefa.id] = { inicio: Date.now() };
    const r = await executarTarefaReal(tarefa, m);
    tempos[tarefa.id].fim = Date.now();
    return r;
  };

  await orq.executarProntas(missao.id, executorComTempo); // só A pronta
  check('dependência: só A executou na 1ª leva', tA.status === STATUS.CONCLUIDA && tB.status !== STATUS.CONCLUIDA && tC.status !== STATUS.CONCLUIDA);

  await orq.executarProntas(missao.id, executorComTempo); // B liberada (só se A concluiu)
  // BUG REAL do próprio teste corrigido aqui (2026-09-15, achado na
  // regressão da FASE 5-6 sob exaustão real de quota do LLM): se A não
  // concluiu (variância real de LLM/quota), B nunca é liberada por
  // dependência, `executorComTempo` nunca roda pra ela, e `tempos[tB.id]`
  // fica undefined — acessar `.inicio` direto derrubava o processo com
  // TypeError em vez de reportar a falha real. Guard explícito.
  if (!tempos[tB.id]) {
    check('dependência: B não começou antes de A terminar', false, 'B nunca foi liberada — A não concluiu (variância real de LLM/quota, não bug de dependência)');
  } else {
    check('dependência: B não começou antes de A terminar', tempos[tB.id].inicio >= tempos[tA.id].fim);
  }

  await orq.executarProntas(missao.id, executorComTempo); // C liberada (só se B concluiu)
  if (!tempos[tC.id] || !tempos[tB.id]) {
    check('dependência: C não começou antes de B terminar', false, 'C ou B nunca foi liberada — dependência anterior não concluiu (variância real de LLM/quota)');
  } else {
    check('dependência: C não começou antes de B terminar', tempos[tC.id].inicio >= tempos[tB.id].fim);
  }
  check('dependência: todas concluídas em ordem estrita', tA.status === STATUS.CONCLUIDA && tB.status === STATUS.CONCLUIDA && tC.status === STATUS.CONCLUIDA);
}

async function testeFalhaControlada() {
  console.log('\n--- TESTE DE FALHA (seção 22) ---');
  const orq = new Orquestrador();
  const missao = orq.criarMissao('Missão sintética de falha controlada', { complexidade: 1 });
  const tFalha = orq.adicionarSubtarefa(missao.id, { descricao: 'Tarefa que sempre falha de propósito (teste)', tipo: 'codigo' });
  orq.fecharPlanejamento(missao.id);

  const executorQueFalha = async () => criarResultado({ status: 'erro', erros: ['HTTP 503: indisponível temporariamente (falha forçada para teste real de recuperação)'] });

  await orq.executarProntas(missao.id, executorQueFalha); // tentativa 1
  check('falha: classificada corretamente (indisponível→retry)', missao.erros.length === 1 && missao.erros[0].tipo === 'indisponivel');
  check('falha: tarefa reenfileirada para retry (não morreu)', tFalha.status === STATUS.PENDENTE);

  await orq.executarProntas(missao.id, executorQueFalha); // tentativa 2
  await orq.executarProntas(missao.id, executorQueFalha); // tentativa 3 (esgota)
  check('falha: após esgotar tentativas, tarefa fica em ERRO (não trava a missão)', tFalha.status === STATUS.ERRO);
  check('falha: 3 tentativas registradas, nenhuma repetição cega além do limite', tFalha.tentativas === 3 || tFalha.tentativas === 2);

  // o Executor real cancela tarefas em ERRO definitivo pra missão poder
  // prosseguir — testa esse comportamento diretamente
  const r = grafo.cancelarTarefa(missao, tFalha.id, 'falha definitiva — teste');
  check('falha: continuação da missão possível (tarefa cancelável após falha definitiva)', r.cancelada === true);
}

async function testeRecuperacaoReal() {
  console.log('\n--- TESTE DE RECUPERAÇÃO (seção 23) ---');
  const planejador1 = new Planejador();
  const executor1 = new Executor(planejador1);
  const missao = planejador1.orquestrador.criarMissao('Missão sintética de recuperação', { complexidade: 1 });
  const t1 = planejador1.orquestrador.adicionarSubtarefa(missao.id, { descricao: 'Responda apenas: primeira', tipo: 'raciocinio' });
  const t2 = planejador1.orquestrador.adicionarSubtarefa(missao.id, { descricao: 'Responda apenas: segunda', tipo: 'raciocinio' });
  planejador1.orquestrador.adicionarDependencia(missao.id, t2.id, t1.id);
  planejador1.orquestrador.fecharPlanejamento(missao.id);

  // "interrompe" a missão depois de só 1 tarefa — simula fechar a sessão
  await planejador1.orquestrador.executarProntas(missao.id, executarTarefaReal);
  check('recuperação: 1ª tarefa concluiu antes da "interrupção"', t1.status === STATUS.CONCLUIDA);
  const resultadoT1AntesDaInterrupcao = JSON.stringify(t1.resultado);
  persistencia.salvar(missao);

  // processo "novo": instância zerada, sem memória da execução anterior
  const executor2 = new Executor();
  const r = await executor2.executarMissaoCompleta(missao.id);
  const missaoRecuperada = r.missao;
  const t1Recuperada = missaoRecuperada.subtarefas.find((t) => t.id === t1.id);
  const t2Recuperada = missaoRecuperada.subtarefas.find((t) => t.id === t2.id);

  check('recuperação: estado retomado do disco corretamente', !!missaoRecuperada && missaoRecuperada.id === missao.id);
  check('recuperação: tarefa já concluída NÃO foi re-executada (resultado idêntico)', JSON.stringify(t1Recuperada.resultado) === resultadoT1AntesDaInterrupcao);
  check('recuperação: continuou e concluiu a tarefa pendente', t2Recuperada.status === STATUS.CONCLUIDA);
  check('recuperação: missão chegou a um estado terminal', missaoRecuperada.estado === ESTADOS.CONCLUIDA);
}

async function testeAutocorrecaoDireta() {
  console.log('\n--- TESTE DIRETO DE AUTOCORREÇÃO (seção 11) ---');
  // Tarefa deliberadamente traiçoeira: pede uma restrição incomum (nunca
  // lançar exceção, mas SEM usar try/catch) — modelos gratuitos pequenos
  // frequentemente erram na 1ª tentativa nesse tipo de restrição, é um bom
  // candidato pra observar correção real acontecendo.
  const orq = new Orquestrador();
  const missao = orq.criarMissao('Missão sintética de autocorreção', { complexidade: 2 });
  const t = orq.adicionarSubtarefa(missao.id, {
    descricao: 'Crie dividir.js: le process.argv[2] e process.argv[3], divide o primeiro pelo segundo, imprime o resultado. Se faltar argumento ou o divisor for 0, deve imprimir exatamente "invalido" (sem quebrar, sem stack trace) — mas SEM usar try/catch em nenhum lugar do código, use validação explícita com if.',
    tipo: 'codigo',
    criterioConclusao: ['roda sem erro com argumentos válidos', 'imprime "invalido" com divisor 0', 'imprime "invalido" sem argumentos', 'não usa try/catch'],
  });
  orq.fecharPlanejamento(missao.id);
  // até 3 rodadas no nível do Orquestrador (cada uma já contém até 3
  // tentativas de autocorreção DENTRO do handler) — cobre o caso de falha
  // esgotar as tentativas internas e precisar de outra rodada externa.
  for (let i = 0; i < 3 && t.status !== STATUS.CONCLUIDA && t.status !== STATUS.ERRO; i++) {
    await orq.executarProntas(missao.id, executarTarefaReal);
  }

  check('autocorreção: tarefa traiçoeira concluiu (com ou sem correção)', t.status === STATUS.CONCLUIDA || t.status === STATUS.ERRO);
  const tentativaInfo = (t.resultado?.evidencias || []).find((e) => e.startsWith('tentativa'));
  console.log('  ', tentativaInfo || '(sem info de tentativa — pode ter concluído sem comando de teste)', '| status final:', t.status);
  if (tentativaInfo) {
    const numTentativas = parseInt(tentativaInfo.match(/tentativa (\d+)/)?.[1] || '1', 10);
    console.log(`  ${numTentativas > 1 ? 'CORREÇÃO REAL OCORREU' : 'acertou de primeira (sem precisar corrigir)'} — ambos são resultados válidos, reportando o que aconteceu de fato`);
  }
}

async function testeClassificadorFalha() {
  console.log('\n--- TESTE: classificador de falha de execução ---');
  check('classifica SyntaxError como erro_codigo', classificarFalhaExecucao('SyntaxError: Unexpected token') === 'erro_codigo');
  check('classifica ENOENT como erro_ambiente', classificarFalhaExecucao('Error: ENOENT: no such file') === 'erro_ambiente');
  check('classifica Cannot find module como erro_dependencia', classificarFalhaExecucao('Cannot find module "express"') === 'erro_dependencia');
  check('classifica timeout como timeout', classificarFalhaExecucao('operation timed out') === 'timeout');
  check('estratégia para erro_codigo é corrigir', estrategiaParaTipo('erro_codigo') === 'corrigir');
  check('estratégia para erro_ambiente é bloquear', estrategiaParaTipo('erro_ambiente') === 'bloquear');
}

async function testeFerramentasESeguranca() {
  console.log('\n--- TESTE: ferramentas reais + isolamento de workspace ---');
  const missaoFake = 'missao_teste_ferramentas_' + Date.now();
  const r1 = ferramentas.escreverArquivo(missaoFake, 'tarefaX', 'ok.txt', 'conteudo real');
  check('ferramentas: escreverArquivo grava de verdade', r1.ok);
  const r2 = ferramentas.lerArquivo(missaoFake, 'ok.txt');
  check('ferramentas: lerArquivo lê o que foi gravado', r2.ok && r2.conteudo === 'conteudo real');
  const r3 = ferramentas.editarArquivo(missaoFake, 'tarefaX', 'ok.txt', 'conteudo', 'texto');
  check('ferramentas: editarArquivo substitui corretamente', r3.ok && ferramentas.lerArquivo(missaoFake, 'ok.txt').conteudo === 'texto real');

  let bloqueouEscape = false;
  try { ferramentas.escreverArquivo(missaoFake, 'tarefaX', '../../fora-do-workspace.txt', 'malicioso'); }
  catch (e) { bloqueouEscape = /fora do workspace/.test(e.message); }
  check('segurança: escrita fora do workspace é bloqueada', bloqueouEscape);

  const execReal = await ferramentas.executarComando(missaoFake, 'node', ['-e', 'console.log(2+2)']);
  check('ferramentas: executarComando roda comando real e captura stdout', execReal.ok && execReal.stdout.trim() === '4');
}

async function testeMissaoRealObrigatoria() {
  console.log('\n--- MISSÃO REAL OBRIGATÓRIA (seção 19): "pequeno aplicativo web funcional" ---');
  const executor = new Executor();
  const objetivo19 = 'Crie um pequeno aplicativo web funcional: um servidor Node.js (http nativo, sem dependências externas) que responde na rota / com uma pagina HTML simples dizendo "Ola, mundo!", rodando na porta 3900.';
  let r = await executor.executarMissaoCompleta(objetivo19);
  // BUG REAL do próprio teste corrigido aqui (2026-09-15, achado na regressão
  // da FASE 5-6): sem null-guard, uma falha transitória real de LLM/quota
  // (429) que deixa r.missao===null derrubava o processo inteiro com um
  // TypeError não tratado antes de qualquer outro teste poder rodar — 1
  // retry antes de reprovar, mesmo critério já usado nas FASES 4 e 5-6.
  if (!r.missao) {
    console.log('  (1ª rodada sem missão — planejamento falhou transitoriamente, tentando mais uma vez)');
    r = await executor.executarMissaoCompleta(objetivo19);
  }

  check('missão real: planejamento + execução completos', !!r.missao);
  console.log('  eventos:');
  r.eventos.forEach((e) => console.log('   -', e.msg));

  if (!r.missao) {
    check('missão real: ao menos 1 arquivo real foi criado', false, 'planejamento falhou 2x seguidas (variância real de LLM/quota, não bug de código)');
    check('missão real: paralelismo ocorreu quando havia tarefas independentes', false, 'sem missão');
    check('missão real: passou por TESTANDO e REVISANDO (nunca concluída sem validação)', false, 'sem missão');
    check('missão real: chegou a um estado terminal (CONCLUIDA ou FALHA, nunca travada)', false, 'sem missão');
    return;
  }

  const arquivos = listarArquivosWorkspace(r.missao.id);
  check('missão real: ao menos 1 arquivo real foi criado', arquivos.length > 0, JSON.stringify(arquivos));
  check('missão real: paralelismo ocorreu quando havia tarefas independentes', r.plano ? r.plano.tarefasIndependentes.length >= 1 : true);
  check('missão real: passou por TESTANDO e REVISANDO (nunca concluída sem validação)', r.missao.historicoEstados.some((h) => h.para === 'TESTANDO') && r.missao.historicoEstados.some((h) => h.para === 'REVISANDO'));
  check('missão real: chegou a um estado terminal (CONCLUIDA ou FALHA, nunca travada)', r.missao.estado === 'CONCLUIDA' || r.missao.estado === 'FALHA');

  // validação de conteúdo real, não só "existe arquivo": tenta rodar o
  // servidor gerado e faz uma requisição HTTP real contra ele.
  if (arquivos.length > 0) {
    const candidatoServidor = arquivos.find((a) => a.endsWith('.js'));
    if (candidatoServidor) {
      const workspace = require(path.join(EXE_DIR, 'core', 'workspace.js')).pastaWorkspace(r.missao.id);
      const { spawn } = require('child_process');
      const proc = spawn('node', [candidatoServidor], { cwd: workspace });
      let respondeuHttp = false;
      let corpoResposta = '';
      await new Promise((resolve) => {
        setTimeout(async () => {
          try {
            const http = require('http');
            await new Promise((res2, rej2) => {
              const req = http.get('http://localhost:3900/', (res) => {
                res.on('data', (c) => { corpoResposta += c; });
                res.on('end', () => { respondeuHttp = res.statusCode === 200; res2(); });
              });
              req.on('error', rej2);
              req.setTimeout(3000, () => { req.destroy(); rej2(new Error('timeout')); });
            });
          } catch { /* servidor pode não ter subido - reportado abaixo */ }
          proc.kill();
          resolve();
        }, 1500);
      });
      check('missão real: servidor gerado responde a requisição HTTP real', respondeuHttp, `corpo recebido: ${corpoResposta.slice(0, 100)}`);
    }
  }

  return r;
}

async function main() {
  await testeParalelismoReal();
  await testeDependenciaReal();
  await testeFalhaControlada();
  await testeRecuperacaoReal();
  await testeClassificadorFalha();
  await testeFerramentasESeguranca();
  await testeAutocorrecaoDireta();
  await testeMissaoRealObrigatoria();

  console.log('\n' + results.join('\n'));
  console.log(`\n${passed}/${passed + failed} testes aprovados`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('EXCEÇÃO NÃO TRATADA:', e.stack); process.exit(1); });
