/**
 * EXECUTOR AUTÔNOMO — FASE 3 (PLANO-MESTRE-AGENTE-9ROUTER.md, módulo 10).
 *
 * OBJETIVO → PLANO → DAG → EXECUÇÃO AUTÔNOMA → TOOLS → AGENTS → PARALELISMO
 * → TESTES → CORREÇÃO → REVISÃO → ENTREGA.
 *
 * Integra 100% com FASE 1 (Orquestrador: máquina de estados, DAG,
 * paralelismo, persistência) e FASE 2 (Planejador: decomposição real) —
 * este módulo só ADICIONA a camada que faltava: quem de fato EXECUTA cada
 * subtarefa (handlers-tarefa.js) com ferramentas reais (ferramentas.js),
 * dentro de um workspace isolado (workspace.js), com locks (locks.js) e
 * classificação de falha própria de execução (classificador-falha.js).
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', 'orquestrador');
const { Orquestrador, ESTADOS, STATUS } = require(path.join(ORQ_DIR, 'orquestrador.js'));
const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
const persistencia = require(path.join(ORQ_DIR, 'core', 'persistencia.js'));

const { Planejador } = require(path.join(__dirname, '..', 'planejador', 'planejador.js'));
const { executarTarefaReal, listarArquivosWorkspace } = require('./core/handlers-tarefa');
const { garantirWorkspace } = require('./core/workspace');
const locks = require('./core/locks');

const MAX_LEVAS_SEGURANCA = 60;

class Executor {
  /** @param {Planejador} [planejador] - injeta um Planejador (e seu Orquestrador interno) existente, ou cria um novo */
  constructor(planejador) {
    this.planejador = planejador || new Planejador();
    this.orquestrador = this.planejador.orquestrador;
  }

  /**
   * Ponto de entrada principal. Aceita OU um objetivo em linguagem natural
   * (planeja do zero) OU o id de uma missão já existente (retoma — seção 13
   * do pedido: recuperação após interrupção).
   *
   * @returns {Promise<{ok:boolean, missao:object, plano:object|null, eventos:object[]}>}
   */
  async executarMissaoCompleta(objetivoOuMissaoId, opcoes = {}) {
    const eventos = [];
    const log = (msg) => { eventos.push({ ts: new Date().toISOString(), msg }); };

    let missao;
    let plano = null;
    const pareceId = /^missao_/.test(objetivoOuMissaoId);
    if (pareceId) {
      missao = this.orquestrador.obterMissao(objetivoOuMissaoId) || this.orquestrador.retomarMissao(objetivoOuMissaoId);
      if (!missao) return { ok: false, missao: null, plano: null, eventos: [{ msg: `missão ${objetivoOuMissaoId} não encontrada` }] };
      log(`missão retomada do disco: estado=${missao.estado}, ${missao.subtarefas.filter((t) => t.status === STATUS.CONCLUIDA).length}/${missao.subtarefas.length} já concluídas`);
    } else {
      const r = await this.planejador.planejar(objetivoOuMissaoId, opcoes);
      if (!r.ok) return { ok: false, missao: null, plano: null, eventos: [{ msg: `planejamento falhou: ${r.error}` }] };
      missao = r.missao;
      plano = r.plano;
      log(`missão planejada: ${missao.subtarefas.length} tarefa(s), complexidade=${plano.complexidade.rotulo}`);
    }

    garantirWorkspace(missao.id);

    let semProgressoSeguidas = 0;
    for (let i = 0; i < MAX_LEVAS_SEGURANCA; i++) {
      if (missao.estado === ESTADOS.CONCLUIDA || missao.estado === ESTADOS.FALHA) break;

      if (missao.estado === ESTADOS.EXECUTANDO || missao.estado === ESTADOS.CORRIGINDO || missao.estado === ESTADOS.AGUARDANDO_DEPENDENCIA) {
        const antesConcluidasOuCanceladas = missao.subtarefas.filter((t) => t.status === STATUS.CONCLUIDA || t.status === STATUS.CANCELADA).length;
        const leva = await this.orquestrador.executarProntas(missao.id, executarTarefaReal);
        for (const t of leva.executadas) {
          log(`tarefa ${t.id} (${t.tipo}) → ${t.status}${(t.resultado?.erros || []).length ? ': ' + t.resultado.erros.join('; ') : ''}`);
        }

        // FASE 4, seção 12/13 — VETO DE QUALIDADE: quando QA/Security/Reviewer
        // reprova (erro classificado como "veto:" pelo handler), a correção
        // certa não é reexecutar a MESMA tarefa de QA — é reabrir a tarefa de
        // IMPLEMENTAÇÃO que ela dependia, com o motivo real do veto
        // alimentando a próxima geração (o mesmo princípio de autocorreção
        // da FASE 3, agora disparado por julgamento de agente, não só por
        // erro de execução). Nunca apaga histórico — `reabrirTarefa` só
        // volta o status pra PENDENTE.
        const TIPOS_IMPLEMENTACAO_LOCAL = ['codigo', 'frontend', 'backend', 'devops'];
        // BUG REAL encontrado em teste (2026-09-15): a dependência de
        // implementação nem sempre é DIRETA — QA pode depender de "teste",
        // que por sua vez depende de "codigo" (cadeia transitiva). Checar só
        // `t.dependeDe` direto perdia esse caso, o veto nunca achava o que
        // reabrir e a tarefa era cancelada em vez de corrigida de verdade.
        // Corrigido: busca em largura por toda a cadeia de dependências.
        const encontrarAncestraisImplementacao = (tarefaId, visitados = new Set()) => {
          if (visitados.has(tarefaId)) return [];
          visitados.add(tarefaId);
          const tarefaAtual = grafo.porId(missao, tarefaId);
          if (!tarefaAtual) return [];
          const encontrados = [];
          for (const depId of tarefaAtual.dependeDe || []) {
            const dep = grafo.porId(missao, depId);
            if (!dep) continue;
            if (TIPOS_IMPLEMENTACAO_LOCAL.includes(dep.tipo) && dep.status === STATUS.CONCLUIDA) {
              encontrados.push(dep);
            } else {
              encontrados.push(...encontrarAncestraisImplementacao(depId, visitados));
            }
          }
          return encontrados;
        };

        for (const t of leva.executadas) {
          const primeiroErro = (t.resultado?.erros || [])[0] || '';
          if (!/^veto:/i.test(primeiroErro)) continue;
          const dependenciasImplementacao = encontrarAncestraisImplementacao(t.id);
          if (dependenciasImplementacao.length === 0) {
            log(`veto em ${t.id} (${primeiroErro.slice(0, 120)}) mas nenhuma dependência de implementação concluída pra reabrir — segue pro fluxo normal de retry/cancelamento`);
            continue;
          }
          for (const dep of dependenciasImplementacao) {
            const r = grafo.reabrirTarefa(missao, dep.id, primeiroErro);
            log(`veto em ${t.id} (${t.tipo}) reabriu ${dep.id} (${dep.tipo}) para correção real — ${r.reaberta ? 'ok' : r.motivo}`);
          }
        }

        // recuperação de trava real (seção 12 do plano mestre + seção 10
        // desta fase): tarefa que esgotou tentativas fica em ERRO
        // permanente e nunca soma pra `missaoCompleta`/`missaoTravada` —
        // sem isso a missão trava pra sempre. Cancela (nunca apaga o
        // histórico do que foi tentado) e deixa a missão seguir com o
        // restante, registrando a falha parcial com transparência.
        const emErroDefinitivo = missao.subtarefas.filter((t) => t.status === STATUS.ERRO);
        for (const t of emErroDefinitivo) {
          const r = grafo.cancelarTarefa(missao, t.id, 'falha definitiva após esgotar tentativas — cancelada para a missão poder prosseguir com o que é possível');
          log(`tarefa ${t.id} cancelada após falha definitiva (cascata: ${(r.cascata || []).length} tarefa(s))`);
        }

        const depoisConcluidasOuCanceladas = missao.subtarefas.filter((t) => t.status === STATUS.CONCLUIDA || t.status === STATUS.CANCELADA).length;
        if (depoisConcluidasOuCanceladas === antesConcluidasOuCanceladas && leva.executadas.length === 0) {
          semProgressoSeguidas++;
        } else {
          semProgressoSeguidas = 0;
        }
        if (semProgressoSeguidas >= 3) {
          this.orquestrador.falharMissao(missao.id, 'sem progresso após múltiplas tentativas — possível dependência impossível de resolver');
          log('missão marcada como FALHA: sem progresso');
          break;
        }
        if (grafo.missaoCompleta(missao) && missao.estado !== ESTADOS.TESTANDO) {
          // executarProntas já deveria ter transicionado, isso é rede de segurança
        }
        continue;
      }

      if (missao.estado === ESTADOS.TESTANDO) {
        const resultadoTeste = await this._validarMissaoReal(missao);
        log(`validação da missão: ${resultadoTeste.passou ? 'passou' : 'falhou'} — ${resultadoTeste.evidencia}`);
        await this.orquestrador.testarMissao(missao.id, async () => resultadoTeste);
        continue;
      }

      if (missao.estado === ESTADOS.REVISANDO) {
        const resultadoRevisao = await this._revisarMissaoReal(missao);
        log(`revisão da missão: ${resultadoRevisao.aprovado ? 'aprovada' : 'reprovada'} — ${resultadoRevisao.motivo}`);

        // BUG REAL encontrado em teste (2026-09-15, FASE 4): quando a
        // revisão a nível de MISSÃO reprova (não uma tarefa dedicada de
        // 'revisao' — o veredito de fallback do próprio Executor), o estado
        // ia pra CORRIGINDO mas NADA reabria as tarefas de implementação —
        // não havia mais nenhuma tarefa PENDENTE pra rodar, então a próxima
        // leva não fazia nada, a missão voltava pra TESTANDO→REVISANDO e
        // reprovava DE NOVO pelo MESMO motivo, em loop, até a proteção de
        // "sem progresso" declarar FALHA — sem NUNCA tentar corrigir de
        // verdade. Corrigido: reabre as tarefas de implementação com o
        // motivo real da reprovação, até um teto de rodadas (o mesmo
        // princípio do veto a nível de tarefa, seção 12, aplicado aqui a
        // nível de missão).
        missao._rodadasRevisaoMissao = (missao._rodadasRevisaoMissao || 0) + (resultadoRevisao.aprovado ? 0 : 1);
        if (!resultadoRevisao.aprovado && missao._rodadasRevisaoMissao <= 2) {
          const implementacoes = missao.subtarefas.filter((t) => ['codigo', 'frontend', 'backend', 'devops'].includes(t.tipo) && t.status === STATUS.CONCLUIDA);
          for (const t of implementacoes) {
            const r = grafo.reabrirTarefa(missao, t.id, `revisão da missão reprovou: ${resultadoRevisao.motivo}`);
            log(`revisão reprovou (rodada ${missao._rodadasRevisaoMissao}/2) — reabrindo ${t.id} (${t.tipo}) para correção real: ${r.reaberta ? 'ok' : r.motivo}`);
          }
          if (implementacoes.length > 0) {
            const { transicionar } = require(path.join(ORQ_DIR, 'core', 'maquina-estados.js'));
            // REVISANDO só permite ir direto pra CORRIGINDO (tabela de
            // transições da FASE 1) — de lá sim pra EXECUTANDO, em 2 passos válidos.
            transicionar(missao, ESTADOS.CORRIGINDO, 'revisão da missão reprovou, reabrindo implementação');
            transicionar(missao, ESTADOS.EXECUTANDO, 'tarefas de implementação reabertas, retomando execução');
            continue;
          }
        }
        await this.orquestrador.revisarMissao(missao.id, async () => resultadoRevisao);
        continue;
      }

      if (missao.estado === ESTADOS.BLOQUEADA) {
        log('missão bloqueada — precisa de decisão externa, encerrando o loop autônomo aqui');
        break;
      }

      log(`estado inesperado no loop: ${missao.estado} — encerrando por segurança`);
      break;
    }

    locks.liberarTodosDaTarefa(undefined); // limpeza defensiva (não deveria sobrar nada)
    persistencia.salvar(missao);
    return { ok: missao.estado === ESTADOS.CONCLUIDA, missao, plano, eventos };
  }

  /**
   * Validação REAL da missão inteira (seção 12: "não confiar apenas na
   * resposta do agente"). Checa: proporção de sucesso real, e quando há
   * arquivos esperados, confirma que EXISTEM de verdade no workspace (não
   * só que uma tarefa "disse" que criou).
   */
  async _validarMissaoReal(missao) {
    const concluidas = missao.subtarefas.filter((t) => t.status === STATUS.CONCLUIDA);
    const canceladas = missao.subtarefas.filter((t) => t.status === STATUS.CANCELADA);
    const total = missao.subtarefas.length;
    const arquivosNoDisco = listarArquivosWorkspace(missao.id);

    if (concluidas.length === 0) {
      return { passou: false, evidencia: `0/${total} subtarefas concluídas com sucesso real` };
    }
    const taxaSucesso = concluidas.length / total;
    const evidencia = `${concluidas.length}/${total} subtarefas concluídas (${canceladas.length} canceladas por falha definitiva), ${arquivosNoDisco.length} arquivo(s) real(is) no workspace: ${arquivosNoDisco.join(', ') || '(nenhum)'}`;
    // critério real: maioria das tarefas concluiu de fato (não just "tentou")
    return { passou: taxaSucesso >= 0.5, evidencia };
  }

  /** Revisão REAL: usa o resultado de uma tarefa tipo 'revisao' se existir; senão pede um veredito final direto. */
  async _revisarMissaoReal(missao) {
    const tarefaRevisao = missao.subtarefas.find((t) => t.tipo === 'revisao' && t.status === STATUS.CONCLUIDA);
    if (tarefaRevisao && tarefaRevisao.resultado) {
      const aprovado = (tarefaRevisao.resultado.evidencias || []).some((e) => e === 'aprovado=true');
      return { aprovado, motivo: tarefaRevisao.resultado.resultado || (aprovado ? 'tarefa de revisão aprovou' : 'tarefa de revisão reprovou'), estrutural: false };
    }
    // sem tarefa de revisão dedicada no plano: usa o mesmo veredito da validação
    const val = await this._validarMissaoReal(missao);
    return { aprovado: val.passou, motivo: `sem tarefa de revisão dedicada no plano — veredito baseado na validação: ${val.evidencia}`, estrutural: false };
  }
}

module.exports = { Executor };
