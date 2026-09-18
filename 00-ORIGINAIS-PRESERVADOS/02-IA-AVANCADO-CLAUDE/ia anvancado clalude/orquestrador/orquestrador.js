/**
 * ORQUESTRADOR CENTRAL — FASE 1 (PLANO-MESTRE-AGENTE-9ROUTER.md, módulo 1).
 *
 * Recebe OBJETIVO DO USUÁRIO → transforma em MISSÃO → coordena o ciclo de
 * vida via máquina de estados + grafo de tarefas + paralelismo + decisor
 * (integrado ao score real do Gateway) + gerenciador de agentes (base
 * curada na FASE 0) + persistência em disco.
 *
 * Escopo desta fase (explicitamente limitado pelo pedido): o NÚCLEO que vai
 * coordenar Planejador/Pesquisador/Executor/Testador/Revisor/Autocorretor —
 * não a implementação completa de cada um deles. Por isso `executarFn` (quem
 * de fato roda uma subtarefa) e `testarFn`/`revisarFn` (quem valida) são
 * injetados por quem usa o Orquestrador — nas Fases 2+ isso vira Planejador
 * automático via LLM, Testador real, Revisor real. Aqui o contrato já é
 * real e testável, só o "cérebro" de cada etapa ainda é plugável.
 */
const path = require('path');
const { ESTADOS, transicionar } = require('./core/maquina-estados');
const { criarMissao, tocarMissao, recalcularProgresso } = require('./core/Missao');
const { STATUS, criarTarefa, criarResultado, marcarStatus } = require('./core/Tarefa');
const grafo = require('./core/grafo-tarefas');
const { executarLevaParalela } = require('./core/paralelismo');
const decisor = require('./core/decisor');
const gerenciadorAgentes = require('./core/gerenciador-agentes');
const persistencia = require('./core/persistencia');

const scoring = require(path.join('C:/Users/Administrator/Documents/AI-ORCHESTRATOR', 'gateway', 'scoring.js'));

const MAX_TENTATIVAS_PADRAO = 3;

class Orquestrador {
  constructor() {
    /** @type {Map<string, object>} missões ativas em memória, espelhadas em disco */
    this.missoes = new Map();
  }

  // -------------------------------------------------------------------
  // CICLO DE VIDA DA MISSÃO
  // -------------------------------------------------------------------

  /**
   * Recebe o objetivo do usuário e cria a missão. Decide AUTO vs PLAN MODE
   * (seção 20 do plano mestre): PLAN quando a missão marca explicitamente
   * `requerAprovacao` (decisão real de preferência do usuário) ou quando
   * `complexidade >= 4` E `ambiguo:true` for passado — nesta fase o critério
   * é literal (recebido do chamador), a heurística automática de detectar
   * ambiguidade de negócio é trabalho do Planejador (Fase 2).
   */
  criarMissao(objetivo, opcoes = {}) {
    const missao = criarMissao({ objetivo, contexto: opcoes.contexto, prioridade: opcoes.prioridade, complexidade: opcoes.complexidade });
    missao.modoExecucao = opcoes.requerAprovacao ? 'PLAN' : 'AUTO';
    this.missoes.set(missao.id, missao);
    this._transicionar(missao, ESTADOS.ANALISANDO, 'objetivo recebido, iniciando análise');
    persistencia.salvar(missao);
    return missao;
  }

  /** Recupera uma missão do disco (retomada após interrupção — seção 13/19). */
  retomarMissao(missaoId) {
    const doDisco = persistencia.carregar(missaoId);
    if (!doDisco) return null;
    this.missoes.set(missaoId, doDisco);
    return doDisco;
  }

  /** Lista missões incompletas persistidas (para oferecer retomada ao subir). */
  listarMissoesParaRetomar() {
    return persistencia.listarMissoesIncompletas();
  }

  obterMissao(missaoId) {
    return this.missoes.get(missaoId) || null;
  }

  // -------------------------------------------------------------------
  // PLANEJAMENTO (grafo de tarefas) — a decomposição em si é responsabilidade
  // do Planejador (Fase 2); aqui o Orquestrador só aceita e valida o grafo.
  // -------------------------------------------------------------------

  adicionarSubtarefa(missaoId, dadosTarefa) {
    const missao = this._exigirMissao(missaoId);
    if (missao.estado === ESTADOS.RECEBIDA) {
      this._transicionar(missao, ESTADOS.ANALISANDO, 'primeira subtarefa recebida');
    }
    if (missao.estado === ESTADOS.ANALISANDO) {
      this._transicionar(missao, ESTADOS.PLANEJANDO, 'construindo grafo de tarefas');
    }
    const tarefa = criarTarefa(dadosTarefa);
    grafo.adicionarTarefa(missao, tarefa);
    missao.proximaAcao = `avaliar dependências e prontidão de ${tarefa.id}`;
    tocarMissao(missao);
    persistencia.salvar(missao);
    return tarefa;
  }

  adicionarDependencia(missaoId, tarefaId, dependeDeId) {
    const missao = this._exigirMissao(missaoId);
    const tarefa = grafo.adicionarDependencia(missao, tarefaId, dependeDeId);
    tocarMissao(missao);
    persistencia.salvar(missao);
    return tarefa;
  }

  /** Fecha o planejamento: decide se há tarefas prontas já ou se tudo depende de algo. */
  fecharPlanejamento(missaoId) {
    const missao = this._exigirMissao(missaoId);
    if (missao.subtarefas.length === 0) {
      throw new Error(`Missão ${missaoId} não tem nenhuma subtarefa — planejamento vazio não pode ser fechado`);
    }
    const prontas = grafo.tarefasProntas(missao);
    if (prontas.length > 0) {
      this._transicionar(missao, ESTADOS.EXECUTANDO, `${prontas.length} tarefa(s) pronta(s) para execução imediata`);
    } else {
      this._transicionar(missao, ESTADOS.AGUARDANDO_DEPENDENCIA, 'todas as tarefas têm dependência pendente');
    }
    persistencia.salvar(missao);
    return missao;
  }

  // -------------------------------------------------------------------
  // DECISÃO (seção 7/8) — exposta diretamente para quem for montar o
  // Executor real nas próximas fases.
  // -------------------------------------------------------------------

  decidirModeloParaTarefa(tarefa, extras = {}) {
    return decisor.decidirModelo({ tipoTarefa: tarefa.tipo, ...extras });
  }

  selecionarAgenteParaTarefa(funcao) {
    return gerenciadorAgentes.getAgentePorFuncao(funcao);
  }

  // -------------------------------------------------------------------
  // EXECUÇÃO PARALELA (seção 6) — despacha uma leva de tarefas prontas.
  // `executorFn(tarefa, missao)` deve devolver um resultado padronizado
  // (Tarefa.criarResultado) ou lançar/rejeitar em caso de falha real.
  // -------------------------------------------------------------------

  async executarProntas(missaoId, executorFn) {
    const missao = this._exigirMissao(missaoId);
    if (missao.estado === ESTADOS.PLANEJANDO) {
      this.fecharPlanejamento(missaoId);
    }
    if (missao.estado === ESTADOS.AGUARDANDO_DEPENDENCIA) {
      const prontas = grafo.tarefasProntas(missao);
      if (prontas.length === 0) {
        return { executadas: [], adiadasPorConflito: [] }; // ainda travada, nada a fazer
      }
      this._transicionar(missao, ESTADOS.EXECUTANDO, 'dependências liberadas, retomando execução');
    }
    if (missao.estado !== ESTADOS.EXECUTANDO && missao.estado !== ESTADOS.CORRIGINDO) {
      throw new Error(`Missão ${missaoId} não está em estado executável (estado atual: ${missao.estado})`);
    }

    const leva = await executarLevaParalela(missao, executorFn);

    for (const t of leva.executadas) {
      if (t.status === STATUS.CONCLUIDA) {
        missao.resultados.push({ tarefaId: t.id, ...t.resultado });
        if (!missao.modelos.includes(t.modelo) && t.modelo) missao.modelos.push(t.modelo);
        if (!missao.agentes.includes(t.agente) && t.agente) missao.agentes.push(t.agente);
      } else if (t.status === STATUS.ERRO) {
        this._registrarErroInterno(missao, t);
      }
    }

    recalcularProgresso(missao);

    if (grafo.missaoTravada(missao)) {
      this._transicionar(missao, ESTADOS.AGUARDANDO_DEPENDENCIA, 'sem tarefas prontas no momento, aguardando dependências');
    } else if (grafo.missaoCompleta(missao)) {
      this._transicionar(missao, ESTADOS.TESTANDO, 'todas as subtarefas concluídas, iniciando validação da missão');
    }

    missao.proximaAcao = grafo.missaoCompleta(missao) ? 'testar resultado consolidado da missão'
      : grafo.missaoTravada(missao) ? 'aguardando dependência ou correção de erro'
      : 'continuar executando tarefas prontas';
    tocarMissao(missao);
    persistencia.salvar(missao);
    return leva;
  }

  // -------------------------------------------------------------------
  // FALHAS (seção 12) — classifica com o MESMO classificador do gateway,
  // decide retry (reabre a tarefa) ou escalonamento (fica em erro definitivo,
  // sem derrubar as outras subtarefas independentes).
  // -------------------------------------------------------------------

  _registrarErroInterno(missao, tarefa) {
    const mensagemErro = (tarefa.resultado && tarefa.resultado.erros && tarefa.resultado.erros[0]) || 'erro desconhecido';
    const tipo = scoring.classificarErro(mensagemErro);
    tarefa.tentativas = (tarefa.tentativas || 0) + 1;
    const registro = { subtarefaId: tarefa.id, erro: mensagemErro, tipo, ts: new Date().toISOString(), tentativas: tarefa.tentativas };
    missao.erros.push(registro);

    const podeTentarDeNovo = tarefa.tentativas < MAX_TENTATIVAS_PADRAO && tipo !== 'auth' && tipo !== 'payload';
    if (podeTentarDeNovo) {
      marcarStatus(tarefa, STATUS.PENDENTE); // volta pra fila, próxima leva tenta de novo
      missao.correcoes.push({ erroRef: registro, diagnostico: `retry automático (${tarefa.tentativas}/${MAX_TENTATIVAS_PADRAO})`, correcao: 'reenfileirada para nova tentativa', resultado: 'pendente', ts: new Date().toISOString() });
    } else {
      missao.correcoes.push({ erroRef: registro, diagnostico: tipo === 'auth' ? 'erro de credencial — não adianta repetir' : tipo === 'payload' ? 'erro de payload — não adianta repetir sem mudar a entrada' : `esgotou tentativas (${tarefa.tentativas}/${MAX_TENTATIVAS_PADRAO})`, correcao: 'nenhuma — escalada', resultado: 'falha definitiva desta subtarefa', ts: new Date().toISOString() });
      // uma falha de subtarefa NÃO derruba a missão inteira (seção 12) —
      // só bloqueia quem depende dela; tarefas independentes seguem soltas.
    }
  }

  // -------------------------------------------------------------------
  // TESTE / REVISÃO / CONCLUSÃO — orquestração de alto nível; a validação
  // de fato (testarFn/revisarFn) é injetada, igual ao executorFn.
  // -------------------------------------------------------------------

  async testarMissao(missaoId, testarFn) {
    const missao = this._exigirMissao(missaoId);
    if (missao.estado !== ESTADOS.TESTANDO) {
      throw new Error(`testarMissao chamado fora de hora: estado atual é ${missao.estado}, esperado TESTANDO`);
    }
    const resultado = await testarFn(missao);
    missao.testes.push({ subtarefaId: null, oQue: 'validação consolidada da missão', resultado: resultado.passou ? 'passou' : 'falhou', evidencia: resultado.evidencia || null, ts: new Date().toISOString() });
    if (resultado.passou) {
      this._transicionar(missao, ESTADOS.REVISANDO, 'testes passaram, indo para revisão');
    } else {
      this._transicionar(missao, ESTADOS.CORRIGINDO, `testes falharam: ${resultado.evidencia || 'sem detalhe'}`);
    }
    tocarMissao(missao);
    persistencia.salvar(missao);
    return missao;
  }

  async revisarMissao(missaoId, revisarFn) {
    const missao = this._exigirMissao(missaoId);
    if (missao.estado !== ESTADOS.REVISANDO) {
      throw new Error(`revisarMissao chamado fora de hora: estado atual é ${missao.estado}, esperado REVISANDO`);
    }
    const resultado = await revisarFn(missao);
    if (resultado.aprovado) {
      this._transicionar(missao, ESTADOS.CONCLUIDA, resultado.motivo || 'revisão aprovou');
      missao.estadoFinal = { sucesso: true, motivo: resultado.motivo || 'aprovado na revisão', ts: new Date().toISOString() };
    } else {
      this._transicionar(missao, resultado.estrutural ? ESTADOS.PLANEJANDO : ESTADOS.CORRIGINDO, resultado.motivo || 'revisão reprovou (veto)');
    }
    tocarMissao(missao);
    persistencia.salvar(missao);
    return missao;
  }

  /** Marca falha definitiva e terminal da missão inteira (não de uma subtarefa). */
  falharMissao(missaoId, motivo) {
    const missao = this._exigirMissao(missaoId);
    this._transicionar(missao, ESTADOS.FALHA, motivo);
    missao.estadoFinal = { sucesso: false, motivo, ts: new Date().toISOString() };
    tocarMissao(missao);
    persistencia.salvar(missao);
    return missao;
  }

  // -------------------------------------------------------------------
  // internos
  // -------------------------------------------------------------------

  _exigirMissao(missaoId) {
    const missao = this.missoes.get(missaoId);
    if (!missao) throw new Error(`Missão não encontrada em memória: ${missaoId} (use retomarMissao se ela existe em disco)`);
    return missao;
  }

  _transicionar(missao, novoEstado, motivo) {
    return transicionar(missao, novoEstado, motivo);
  }
}

module.exports = { Orquestrador, ESTADOS, STATUS, criarResultado, gerenciadorAgentes, decisor, persistencia, grafo };
