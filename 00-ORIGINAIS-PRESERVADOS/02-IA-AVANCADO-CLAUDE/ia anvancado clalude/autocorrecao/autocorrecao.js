/**
 * AUTOCORREÇÃO AVANÇADA — FASE 8 (PLANO-MESTRE-AGENTE-9ROUTER.md), entry point único.
 *
 * DETECTAR → CLASSIFICAR → DIAGNOSTICAR → PLANEJAR CORREÇÃO → EXECUTAR →
 * TESTAR → REVISAR, com orçamento (nunca loop infinito), memória de erros
 * (FASE 6) e replanejamento real quando a estratégia manda.
 */
const diagnostico = require('./core/diagnostico');
const estrategia = require('./core/estrategia');
const orcamento = require('./core/orcamento');
const memoriaErros = require('./core/memoria-erros');
const { executarComAutocorrecao } = require('./core/loop');

module.exports = {
  diagnosticar: diagnostico.diagnosticar,
  CATEGORIAS_DIAGNOSTICO: diagnostico.CATEGORIAS,
  decidirProximaEstrategia: estrategia.decidirProximaEstrategia,
  ACOES_ESTRATEGIA: estrategia.ACOES,
  criarOrcamento: orcamento.criarOrcamento,
  dentroDoOrcamento: orcamento.dentroDoOrcamento,
  registrarErro: memoriaErros.registrarErro,
  consultarErroConhecido: memoriaErros.consultarErroConhecido,
  executarComAutocorrecao,
};
