/**
 * PLANEJADOR AUTOMÁTICO — FASE 2 (PLANO-MESTRE-AGENTE-9ROUTER.md, módulo 2).
 *
 * OBJETIVO DO USUÁRIO → REQUISITOS → ENTREGÁVEIS → TAREFAS → SUBTAREFAS →
 * DEPENDÊNCIAS → TAREFAS PARALELAS → AGENTES → FERRAMENTAS → MODELOS
 * ADEQUADOS (metadados p/ o Roteador) → ORDEM DE EXECUÇÃO → CRITÉRIOS DE
 * TESTE → CRITÉRIOS DE CONCLUSÃO.
 *
 * Integra 100% com a FASE 1 (Orquestrador, Missão, Tarefa, DAG, máquina de
 * estados, gerenciador de agentes, decisor/scoring, persistência) — não
 * duplica nenhuma dessas estruturas, só as alimenta com um grafo real
 * decomposto automaticamente por um modelo real.
 */
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', 'orquestrador');
const { Orquestrador, ESTADOS } = require(path.join(ORQ_DIR, 'orquestrador.js'));
const { transicionar } = require(path.join(ORQ_DIR, 'core', 'maquina-estados.js'));
const persistencia = require(path.join(ORQ_DIR, 'core', 'persistencia.js'));

const { chamarLLM } = require('./core/chamar-llm');
const { montarPromptDecomposicao } = require('./core/prompt-decomposicao');
const { extrairJSON } = require('./core/json-robusto');
const { construirGrafoNaMissao, montarPlanoFinal } = require('./core/construtor-plano');
const { revisarEMelhorarPlano } = require('./core/revisor-plano');
const { replanejar } = require('./core/replanejador');
const { classificarComplexidade } = require('./core/classificador-complexidade');

class Planejador {
  /** @param {Orquestrador} [orquestrador] - injeta uma instância existente, ou cria uma nova */
  constructor(orquestrador) {
    this.orquestrador = orquestrador || new Orquestrador();
  }

  /**
   * Ponto de entrada principal. Recebe o objetivo em linguagem natural e
   * devolve um PLANO estruturado + a missão real já pronta para execução
   * (estado EXECUTANDO ou AGUARDANDO_DEPENDENCIA — "plano executável").
   *
   * @param {string} objetivo
   * @param {object} [opcoes]
   * @param {'AUTO'|'PLAN'} [opcoes.modoExecucao]
   * @param {object} [opcoes.contexto]
   * @param {boolean} [opcoes.revisar=true] - roda o ciclo de auto-revisão (seção 19)
   * @returns {Promise<{ok:boolean, plano:object|null, missao:object|null, revisao:object|null, error?:string}>}
   */
  async planejar(objetivo, opcoes = {}) {
    if (!objetivo || !objetivo.trim()) {
      return { ok: false, plano: null, missao: null, revisao: null, error: 'objetivo vazio' };
    }
    const modoExecucao = opcoes.modoExecucao || 'AUTO';

    // 1) decomposição real via LLM
    const prompt = montarPromptDecomposicao(objetivo, { modoExecucao, contexto: opcoes.contexto });
    const resp = await chamarLLM(prompt, { tipoTarefa: 'raciocinio', complexidade: 3, maxTokens: 6000 });
    if (!resp.ok) {
      return { ok: false, plano: null, missao: null, revisao: null, error: `chamada ao LLM falhou: ${resp.error}` };
    }
    const planoJSON = extrairJSON(resp.texto);
    if (!planoJSON || !Array.isArray(planoJSON.tarefas) || planoJSON.tarefas.length === 0) {
      return { ok: false, plano: null, missao: null, revisao: null, error: `LLM não devolveu um plano válido (JSON ausente ou sem tarefas). Resposta bruta: ${resp.texto.slice(0, 300)}` };
    }

    // 2) cria a missão real (FASE 1) e o grafo de tarefas real
    const missao = this.orquestrador.criarMissao(objetivo, { contexto: opcoes.contexto, requerAprovacao: modoExecucao === 'PLAN' });
    const { avisos } = construirGrafoNaMissao(missao, planoJSON);

    // 3) classificação determinística de complexidade (seção 7) — não é o
    // que o LLM "acha" que é, é calculada a partir do grafo real construído
    const classificacao = classificarComplexidade(planoJSON);
    missao.complexidade = classificacao.nivel;
    // guarda os campos de nível-plano na missão para o Revisor poder checar
    // completude (seção 3: requisitos/entregáveis/critérios são obrigatórios)
    missao.requisitos = planoJSON.requisitos || [];
    missao.entregaveis = planoJSON.entregaveis || [];
    missao.criteriosSucesso = planoJSON.criteriosSucessoGeral || [];

    // 4) avança a máquina de estados: ANALISANDO → PLANEJANDO (grafo pronto)
    transicionar(missao, ESTADOS.PLANEJANDO, `plano decomposto automaticamente via ${resp.modeloId} (${missao.subtarefas.length} tarefa(s), complexidade=${classificacao.rotulo})`);

    // 5) auto-revisão (seção 19): detecta lacunas, corrige o que dá pra
    // corrigir sozinho, adiciona o que falta estruturalmente (ex: sem QA)
    let revisao = null;
    if (opcoes.revisar !== false) {
      revisao = revisarEMelhorarPlano(missao);
    }

    // 6) fecha o planejamento — decide se já pode começar a executar
    // (EXECUTANDO) ou se tudo depende de pesquisa primeiro (AGUARDANDO_DEPENDENCIA)
    this.orquestrador.missoes.set(missao.id, missao); // garante que está registrada em memória para fecharPlanejamento
    this.orquestrador.fecharPlanejamento(missao.id);

    const plano = montarPlanoFinal(objetivo, planoJSON, missao, [...avisos, ...(revisao ? revisao.lacunasEncontradas.map((l) => `[revisão] ${l}`) : [])], resp.modeloId);
    plano.correcoesDaRevisao = revisao ? revisao.correcoes : [];

    persistencia.salvar(missao);
    return { ok: true, plano, missao, revisao };
  }

  /** Expõe o replanejamento (seção 13) sobre uma missão já em andamento. */
  async replanejar(missaoId, novaInformacao) {
    const missao = this.orquestrador.obterMissao(missaoId) || this.orquestrador.retomarMissao(missaoId);
    if (!missao) return { ok: false, error: `missão ${missaoId} não encontrada` };
    const resultado = await replanejar(missao, novaInformacao);
    if (resultado.ok) {
      // tarefas novas podem ter liberado/travado o fluxo — reavalia estado
      if (missao.estado === ESTADOS.AGUARDANDO_DEPENDENCIA || missao.estado === ESTADOS.EXECUTANDO) {
        const grafo = require(path.join(ORQ_DIR, 'core', 'grafo-tarefas.js'));
        const prontas = grafo.tarefasProntas(missao);
        if (prontas.length > 0 && missao.estado === ESTADOS.AGUARDANDO_DEPENDENCIA) {
          transicionar(missao, ESTADOS.EXECUTANDO, 'replanejamento liberou tarefa(s) pronta(s)');
        }
      }
      persistencia.salvar(missao);
    }
    return resultado;
  }
}

module.exports = { Planejador };
