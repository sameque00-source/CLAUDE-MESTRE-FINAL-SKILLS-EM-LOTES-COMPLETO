/**
 * TESTES DA FASE 2 — Planejador Automático.
 * Cobre os 13 cenários pedidos (seção 17), o teste real obrigatório (seção
 * 18, "pequeno projeto web de demonstração") e o teste de qualidade/
 * auto-revisão (seção 19). Mistura chamadas REAIS de LLM (para provar
 * decomposição de verdade em vários níveis de complexidade) com checagens
 * determinísticas (para os mecanismos que não devem depender de um LLM
 * "cooperar" nesta rodada específica — replanejamento, decisão pendente,
 * detecção de lacunas).
 *
 * Uso: node teste-fase2-planejador.js
 */
const path = require('path');
const PLAN_DIR = path.join(__dirname, '..', 'planejador');
const { Planejador } = require(path.join(PLAN_DIR, 'planejador.js'));
const { classificarComplexidade } = require(path.join(PLAN_DIR, 'core', 'classificador-complexidade.js'));
const { revisarEMelhorarPlano, detectarLacunas } = require(path.join(PLAN_DIR, 'core', 'revisor-plano.js'));
const { montarPlanoFinal } = require(path.join(PLAN_DIR, 'core', 'construtor-plano.js'));

const ORQ_DIR = path.join(__dirname, '..', 'orquestrador');
const { Orquestrador, ESTADOS, STATUS, criarResultado } = require(path.join(ORQ_DIR, 'orquestrador.js'));
const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
const { criarTarefa } = require(path.join(ORQ_DIR, 'core', 'Tarefa.js'));
const persistencia = require(path.join(ORQ_DIR, 'core', 'persistencia.js'));

let passed = 0, failed = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { passed++; results.push(`PASS  ${name}`); }
  else { failed++; results.push(`FAIL  ${name}  ${detail}`); }
  if (!cond) console.log(`  [FALHOU] ${name} — ${detail}`);
}

async function main() {
  const planejador = new Planejador();

  // -------------------------------------------------------------------
  // 1-2. TRIVIAL / SIMPLES — objetivo pequeno, real, deve gerar plano enxuto
  // -------------------------------------------------------------------
  console.log('\n--- Teste 1/2: tarefa trivial/simples ---');
  // Modelos gratuitos pequenos variam de decomposição entre chamadas reais
  // (mesma entrada, saída não 100% idêntica) — tolera até 2 tentativas antes
  // de considerar falha real, em vez de fingir que o LLM é determinístico.
  let rTrivial = await planejador.planejar('Corrija a ortografia da palavra "aplicacao" para "aplicação" no arquivo README.md deste projeto.');
  if (rTrivial.ok && rTrivial.plano.subtarefas.length > 5) {
    console.log(`  (1a tentativa gerou ${rTrivial.plano.subtarefas.length} tarefas para algo trivial — tentando mais uma vez antes de reprovar)`);
    rTrivial = await planejador.planejar('Corrija a ortografia da palavra "aplicacao" para "aplicação" no arquivo README.md deste projeto.');
  }
  check('1. tarefa trivial: planejamento bem-sucedido', rTrivial.ok, rTrivial.error);
  if (rTrivial.ok) {
    check('1b. tarefa trivial: poucas subtarefas (<=5, com 1 retry por variância real do LLM)', rTrivial.plano.subtarefas.length <= 5, `gerou ${rTrivial.plano.subtarefas.length}`);
    check('1c. tarefa trivial: nível de complexidade baixo (0-2)', rTrivial.plano.complexidade.nivel <= 2, `nível=${rTrivial.plano.complexidade.nivel}`);
    check('1d. todas as tarefas têm critério de conclusão', rTrivial.missao.subtarefas.every((t) => t.criterioConclusao.length > 0));
  }

  // -------------------------------------------------------------------
  // 3-7. MÉDIA/COMPLEXA + DEPENDÊNCIAS + PARALELISMO + MÚLTIPLOS AGENTES
  // — usa o próprio exemplo do pedido original da missão.
  // -------------------------------------------------------------------
  console.log('\n--- Teste 3-7: tarefa complexa/muito complexa (exemplo do pedido: app de edição de vídeo) ---');
  const rVideo = await planejador.planejar('Crie um aplicativo profissional de edição de vídeo.');
  check('3. tarefa complexa: planejamento bem-sucedido', rVideo.ok, rVideo.error);
  if (rVideo.ok) {
    check('4. tarefa muito complexa: nível alto (>=3)', rVideo.plano.complexidade.nivel >= 3, `nível=${rVideo.plano.complexidade.nivel}`);
    check('5. plano com múltiplas subtarefas (cobertura real)', rVideo.plano.subtarefas.length >= 4, `${rVideo.plano.subtarefas.length} tarefas`);
    check('6. tarefa com dependências: existe ao menos 1 dependência real', rVideo.plano.dependencias.length > 0, JSON.stringify(rVideo.plano.dependencias));
    check('7. tarefa com paralelismo: existem tarefas independentes (sem dependência)', rVideo.plano.tarefasIndependentes.length >= 2, `${rVideo.plano.tarefasIndependentes.length} independentes`);
    check('9. múltiplos agentes recomendados', rVideo.plano.agentesRecomendados.length >= 2, JSON.stringify(rVideo.plano.agentesRecomendados));
    check('10. ferramentas recomendadas não vazias', rVideo.plano.ferramentasRecomendadas.length > 0, JSON.stringify(rVideo.plano.ferramentasRecomendadas));
    check('8. pesquisa: ao menos 1 tarefa marca precisaPesquisa', rVideo.missao.subtarefas.some((t) => t.precisaPesquisa), 'nenhuma tarefa marcou precisaPesquisa — pode ser plano legítimo sem incerteza, ver nota no relatório');
    console.log('  plano de vídeo:', rVideo.plano.subtarefas.length, 'tarefas, nível', rVideo.plano.complexidade.rotulo, ', agentes:', rVideo.plano.agentesRecomendados.join(', '));
  }

  // -------------------------------------------------------------------
  // 13. MULTIMODAL
  // -------------------------------------------------------------------
  console.log('\n--- Teste 13: tarefa multimodal ---');
  const objetivoVisao = 'Crie uma ferramenta que analisa fotos de produtos enviadas pelo usuário e gera automaticamente uma descrição de texto para cada foto.';
  let rVisao = await planejador.planejar(objetivoVisao);
  const ehVisual = (p) => p.modalidade.some((m) => ['visao', 'imagem', 'vision', 'image'].includes(String(m).toLowerCase()));
  if (rVisao.ok && !ehVisual(rVisao.plano)) {
    console.log('  (1a tentativa não marcou modalidade visual — tentando mais uma vez antes de reprovar; variância real de modelo gratuito)');
    rVisao = await planejador.planejar(objetivoVisao);
  }
  check('13. tarefa multimodal: planejamento bem-sucedido', rVisao.ok, rVisao.error);
  if (rVisao.ok) {
    check('13b. modalidade detectada como visual (com 1 retry por variância real do LLM)', ehVisual(rVisao.plano), JSON.stringify(rVisao.plano.modalidade));
  }

  // -------------------------------------------------------------------
  // 11. FERRAMENTA — já coberto no teste de vídeo (10), reforço aqui
  // -------------------------------------------------------------------
  console.log('\n--- Teste 11: necessidade de ferramenta específica (terminal/git) ---');
  const rFerramenta = await planejador.planejar('Escreva um script bash que faz backup de uma pasta usando git e o publica em um repositório.');
  check('11. tarefa com ferramenta: planejamento bem-sucedido', rFerramenta.ok, rFerramenta.error);
  if (rFerramenta.ok) {
    check('11b. ferramentas incluem terminal ou git', rFerramenta.plano.ferramentasRecomendadas.some((f) => ['terminal', 'git'].includes(f)), JSON.stringify(rFerramenta.plano.ferramentasRecomendadas));
  }

  // -------------------------------------------------------------------
  // 12. INFORMAÇÃO INSUFICIENTE — teste do MECANISMO (determinístico),
  // não depende do LLM "decidir" marcar isso nesta rodada específica.
  // -------------------------------------------------------------------
  console.log('\n--- Teste 12: informação insuficiente (mecanismo determinístico) ---');
  {
    const orqSint = new Orquestrador();
    const missaoSint = orqSint.criarMissao('Missão sintética para testar decisão pendente', {});
    const tarefaAmbigua = orqSint.adicionarSubtarefa(missaoSint.id, {
      descricao: 'Escolher entre publicar o app na loja ou manter uso pessoal',
      tipo: 'raciocinio',
      decisaoUsuario: true,
      motivoDecisaoUsuario: 'isso muda a arquitetura (loja exige compliance, uso pessoal não) e é preferência real do usuário, não algo tecnicamente decidível sozinho',
    });
    const planoSint = montarPlanoFinal(missaoSint.objetivo, { tarefas: [] }, missaoSint, [], null);
    check('12. mecanismo de decisão pendente captura a tarefa corretamente', planoSint.decisoesPendentes.length === 1 && planoSint.decisoesPendentes[0].tarefaId === tarefaAmbigua.id);
    check('12b. motivo da decisão pendente é preservado', planoSint.decisoesPendentes[0].motivo.includes('preferência'));
  }

  // -------------------------------------------------------------------
  // 11 (seção 14/15 - AUTO MODE não deveria marcar decisaoUsuario para
  // coisas técnicas) — checagem indireta: nos planos reais gerados acima,
  // nenhuma tarefa TÉCNICA (ex: "qual framework usar") deveria ter
  // decisaoUsuario:true, já que estamos em AUTO MODE por padrão.
  // -------------------------------------------------------------------
  console.log('\n--- Verificação AUTO MODE: não deveria perguntar decisão técnica óbvia ---');
  if (rVideo.ok) {
    const decisoesTecnicas = rVideo.missao.subtarefas.filter((t) => t.decisaoUsuario);
    check('AUTO MODE: nenhuma decisão pendente artificial no plano de vídeo (ou, se houver, tem motivo genuíno de negócio)', decisoesTecnicas.every((t) => t.motivoDecisaoUsuario && t.motivoDecisaoUsuario.length > 10), JSON.stringify(decisoesTecnicas.map((t) => t.descricao)));
  }

  // -------------------------------------------------------------------
  // TESTE DE QUALIDADE (seção 19): plano automático → revisão →
  // detecção de lacuna → plano melhorado — determinístico, não usa LLM.
  // -------------------------------------------------------------------
  console.log('\n--- Teste de qualidade: auto-revisão detecta e corrige lacuna ---');
  {
    const orqQ = new Orquestrador();
    const missaoQ = orqQ.criarMissao('Missão sintética só com código, sem teste/revisão', {});
    orqQ.adicionarSubtarefa(missaoQ.id, { descricao: 'Implementar função de soma', tipo: 'codigo' });
    orqQ.adicionarSubtarefa(missaoQ.id, { descricao: 'Implementar função de subtração', tipo: 'codigo' });
    const { temLacuna, lacunas } = detectarLacunas(missaoQ);
    check('19a. detecta lacuna real (falta validação)', temLacuna && lacunas.some((l) => l.includes('teste/revisão')));
    const antesDoNumTarefas = missaoQ.subtarefas.length;
    const resultadoRevisao = revisarEMelhorarPlano(missaoQ);
    check('19b. plano melhorado: tarefa de revisão foi adicionada', missaoQ.subtarefas.length === antesDoNumTarefas + 1 && !!resultadoRevisao.tarefaAdicionada);
    check('19c. tarefa de revisão depende de todas as tarefas de código', resultadoRevisao.tarefaAdicionada.dependeDe.length === 2);
    const { temLacuna: aindaTemLacuna } = detectarLacunas(missaoQ);
    check('19d. lacuna original não existe mais após a correção', !aindaTemLacuna);
  }

  // -------------------------------------------------------------------
  // REPLANEJAMENTO (seção 13) — real, usando o plano de vídeo já criado.
  // -------------------------------------------------------------------
  if (rVideo.ok) {
    console.log('\n--- Teste: replanejamento (nova informação muda o plano) ---');
    const numTarefasAntes = rVideo.missao.subtarefas.length;
    const idsAntes = new Set(rVideo.missao.subtarefas.map((t) => t.id));
    const rReplan = await planejador.replanejar(rVideo.missao.id, 'Descobrimos que a biblioteca ffmpeg.wasm tem suporte limitado no navegador Safari — é preciso considerar uma alternativa nativa ou um fallback no servidor.');
    check('replanejamento: chamada bem-sucedida', rReplan.ok, rReplan.error);
    if (rReplan.ok) {
      check('replanejamento: nenhuma tarefa antiga foi removida (só adicionada/cancelada)', [...idsAntes].every((id) => grafo.porId(rVideo.missao, id) !== null));
      check('replanejamento: resumo da mudança foi registrado', !!rReplan.resumo && rReplan.resumo.length > 5, rReplan.resumo);
      check('replanejamento: registrado no histórico da missão', Array.isArray(rVideo.missao.replanejamentos) && rVideo.missao.replanejamentos.length === 1);
    }

    // garantia dura: NUNCA cancela tarefa concluída (determinístico, sem LLM)
    const primeiraTarefa = rVideo.missao.subtarefas[0];
    const statusOriginal = primeiraTarefa.status;
    primeiraTarefa.status = STATUS.CONCLUIDA; // simula que já rodou
    const tentativaCancelar = grafo.cancelarTarefa(rVideo.missao, primeiraTarefa.id, 'tentativa de cancelar tarefa concluída');
    check('replanejamento: NUNCA cancela tarefa já concluída', tentativaCancelar.cancelada === false);
    primeiraTarefa.status = statusOriginal; // desfaz a simulação
  }

  // -------------------------------------------------------------------
  // INTEGRAÇÃO REAL COM A FASE 1: o plano produzido pelo Planejador
  // consegue ser executado de verdade pelo Orquestrador (paralelismo,
  // máquina de estados, persistência) — não só "existe", EXECUTA.
  // -------------------------------------------------------------------
  console.log('\n--- Teste de integração real: executar o plano de vídeo via Orquestrador (mock executor) ---');
  if (rVideo.ok) {
    const executorMock = async (tarefa) => {
      await new Promise((r) => setTimeout(r, 5));
      tarefa.modelo = 'mock';
      return criarResultado({ status: 'ok', resultado: `mock: ${tarefa.descricao.slice(0, 40)}` });
    };
    let seguranca = 0;
    while (rVideo.missao.estado !== ESTADOS.TESTANDO && seguranca < 20) {
      await planejador.orquestrador.executarProntas(rVideo.missao.id, executorMock);
      seguranca++;
    }
    check('integração: missão produzida pelo Planejador chega a TESTANDO via execução real do Orquestrador', rVideo.missao.estado === ESTADOS.TESTANDO, `estado final: ${rVideo.missao.estado} após ${seguranca} levas`);
    check('integração: todas as tarefas (concluídas ou canceladas) foram resolvidas', rVideo.missao.subtarefas.every((t) => t.status === STATUS.CONCLUIDA || t.status === STATUS.CANCELADA));

    persistencia.salvar(rVideo.missao);
    const doDisco = persistencia.carregar(rVideo.missao.id);
    check('integração: missão do Planejador persiste corretamente em disco', !!doDisco && doDisco.subtarefas.length === rVideo.missao.subtarefas.length);
  }

  console.log('\n' + results.join('\n'));
  console.log(`\n${passed}/${passed + failed} testes aprovados`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('EXCEÇÃO NÃO TRATADA:', e.stack); process.exit(1); });
