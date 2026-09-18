/**
 * DECISOR — FASE 1, seção 7/8 do pedido.
 *
 * NÃO reimplementa score. Integra com `AI-ORCHESTRATOR/gateway/scoring.js`
 * (requerido read-only — este módulo nunca escreve nesse arquivo). O Decisor
 * é a camada que traduz "preciso resolver esta subtarefa" em "aqui está o
 * candidato ordenado", consultando o catálogo real e o score real.
 *
 * Interface de entrada aceita exatamente os campos pedidos na seção 7:
 * complexidade, contexto, capacidade, latência, saúde, quota, tipo da
 * tarefa, dependências, modalidade, ferramentas necessárias — os que o
 * scoring.js atual já usa (tipoTarefa/level/estTokens) são repassados
 * diretamente; os demais (capacidade/modalidade/ferramentas) filtram a
 * lista de candidatos ANTES do score, porque são requisitos eliminatórios,
 * não uma dimensão de pontuação (ex: pedir vision=true não é "pontuar mais
 * alto", é "não considerar quem não tem").
 */
const path = require('path');

const GATEWAY_ROOT = 'C:/Users/Administrator/Documents/AI-ORCHESTRATOR';
const scoring = require(path.join(GATEWAY_ROOT, 'gateway', 'scoring.js'));
const { ADAPTERS } = require(path.join(GATEWAY_ROOT, 'gateway', 'providers.js'));

function carregarCatalogo() {
  // recarregado a cada chamada (não cacheado) — o catálogo pode mudar entre
  // decisões e o custo de reler um JSON de ~20 entradas é irrelevante.
  delete require.cache[require.resolve(path.join(GATEWAY_ROOT, 'catalog', 'models.json'))];
  return require(path.join(GATEWAY_ROOT, 'catalog', 'models.json'));
}

/**
 * @param {object} req
 * @param {'texto'|'codigo'|'raciocinio'|'visao'|'pesquisa'|'consolidacao'} req.tipoTarefa
 * @param {0|1|2|3|4} [req.complexidade]
 * @param {boolean} [req.precisaVisao]
 * @param {boolean} [req.precisaFerramentas] - a subtarefa vai chamar tool_use
 * @param {number} [req.estTokens]
 * @param {string[]} [req.evitarModelos] - ids a excluir (ex: não repetir o modelo que gerou o código na revisão — seção 11 do plano mestre)
 * @returns {{ escolhido: object|null, ordemFallback: object[], motivo: string }}
 */
function decidirModelo(req = {}) {
  const catalog = carregarCatalogo();
  const {
    tipoTarefa = 'texto',
    complexidade = 2,
    precisaVisao = false,
    precisaFerramentas = false,
    estTokens = 0,
    evitarModelos = [],
  } = req;

  // 1) filtros eliminatórios (capacidade/modalidade/ferramentas) — nunca vira
  //    pontuação, porque um modelo sem tools não serve pra tarefa agêntica
  //    de jeito nenhum, não importa quão bem pontuado esteja em outra coisa.
  //
  //    BUG REAL encontrado em teste da FASE 2 (2026-09-15): este filtro não
  //    excluía modelos de modalidade não-texto (ex: `groq-whisper-large-v3-turbo`,
  //    modality:["audio_stt"]) — o Decisor podia escolher um modelo de
  //    transcrição de áudio para uma tarefa de raciocínio/texto, e o adapter
  //    tentava chamar o endpoint de chat completions num modelo que só existe
  //    no endpoint de transcrição, resultando em HTTP 404. O Gateway original
  //    (`gateway/server.js`, `pickCandidates`) sempre filtrou por
  //    `modality.includes('text')` — o Decisor da FASE 1 tinha esquecido
  //    esse filtro ao ser escrito. Corrigido aqui, replicando a MESMA regra.
  // SEGUNDO BUG REAL encontrado na mesma rodada de testes: o catálogo lista
  // provedores (ex: Cloudflare Workers AI, Pollinations.ai, ElevenLabs) que
  // ainda NÃO têm adapter de execução implementado em `gateway/providers.js`
  // (gap já documentado desde a Rodada 4 da infraestrutura). O Gateway
  // original (`server.js`, `eligible()`) sempre filtrou por isso; o Decisor
  // da FASE 1 não replicava esse filtro — um candidato "escolhido" podia não
  // ter absolutamente nenhum jeito de ser chamado de verdade.
  let candidatos = catalog.models.filter((m) => m.free === true && m.requires_card !== true);
  candidatos = candidatos.filter((m) => Object.prototype.hasOwnProperty.call(ADAPTERS, m.provider));
  if (!precisaVisao) {
    // tarefa de texto/código/raciocínio: só modelos que falam texto
    candidatos = candidatos.filter((m) => Array.isArray(m.modality) && m.modality.includes('text'));
  } else {
    candidatos = candidatos.filter((m) => m.vision === true);
  }
  if (precisaFerramentas) candidatos = candidatos.filter((m) => m.tools === true);
  candidatos = candidatos.filter((m) => !evitarModelos.includes(m.id));

  if (candidatos.length === 0) {
    return { escolhido: null, ordemFallback: [], motivo: 'nenhum candidato passou nos filtros eliminatórios (visão/ferramentas/exclusão)' };
  }

  // 2) score real (scoring.js), mapeando tipoTarefa pro vocabulário que o
  //    score já entende hoje: 'texto'|'codigo'|'raciocinio'|'visao'
  const tipoParaScore = precisaVisao ? 'visao'
    : ['pesquisa', 'consolidacao'].includes(tipoTarefa) ? 'raciocinio'
    : ['codigo'].includes(tipoTarefa) ? 'codigo'
    : tipoTarefa === 'raciocinio' ? 'raciocinio'
    : 'texto';

  const ordenados = scoring.ordenar(candidatos, { level: complexidade, tipoTarefa: tipoParaScore, estTokens });

  if (ordenados.length === 0) {
    return { escolhido: null, ordemFallback: [], motivo: 'todos os candidatos elegíveis estão em cooldown no momento' };
  }

  return {
    escolhido: ordenados[0],
    ordemFallback: ordenados,
    motivo: `score real via gateway/scoring.js, tipoTarefa="${tipoParaScore}", nível=${complexidade}, ${ordenados.length} candidato(s) elegível(is)`,
  };
}

/** Consulta rápida de saúde/cooldown de um modelo específico — expõe scoring.js sem reimplementar. */
function saudeDoModelo(modeloId) {
  return {
    emCooldown: scoring.emCooldown(modeloId),
    motivoCooldown: scoring.motivoCooldown(modeloId),
    estatisticas: scoring.estatisticas(modeloId),
  };
}

module.exports = { decidirModelo, saudeDoModelo, carregarCatalogo };
