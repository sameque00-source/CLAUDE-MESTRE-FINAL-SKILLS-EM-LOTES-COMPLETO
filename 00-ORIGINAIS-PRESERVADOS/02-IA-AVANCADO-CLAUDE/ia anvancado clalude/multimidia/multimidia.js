/**
 * MULTIMÍDIA — FASE 9 (PLANO-MESTRE-AGENTE-9ROUTER.md), entry point único.
 *
 * arquivo/tarefa → detectar modalidade → identificar capacidade necessária
 * → escolher especialista → escolher ferramenta/modelo/provider → executar
 * → validar → registrar resultado.
 *
 * Integra com o que já existe, sem duplicar:
 * - segurança de caminho → `executor/core/workspace.js:resolverCaminhoSeguro` (injetado, nunca reimplementado)
 * - roteamento de modelo → `router/router.js` (via `chamar-llm.js`, usado por `visao.js`)
 * - autocorreção → `autocorrecao/autocorrecao.js` (loop controlado real em cima de qualquer falha de processamento)
 */
const path = require('path');
const { detectarArquivo } = require('./core/deteccao');
const { validarArquivoMultimidia } = require('./core/seguranca-multimidia');
const { detectarModalidadeDaTarefa, escolherEspecialista } = require('./core/roteamento-multimodal');
const { validarResultadoProcessamento } = require('./core/validacao');
const { analisarImagem } = require('./core/visao');
const { analisarAudio, transcreverAudio } = require('./core/audio');
const { analisarVideo, analisarConteudoVisual } = require('./core/video');
const autocorrecao = require(path.join(__dirname, '..', 'autocorrecao', 'autocorrecao.js'));

/**
 * Ponto de entrada único: analisa um arquivo multimídia já presente no
 * workspace, com autocorreção real (diagnóstico → estratégia alternativa →
 * execução → validação) quando a primeira tentativa falha.
 *
 * @param {object} p
 * @param {string} p.missaoId
 * @param {string} p.caminhoRelativo
 * @param {function} p.resolverCaminhoSeguro - injeta a checagem de path traversal já existente (workspace.js ou equivalente de projeto)
 * @param {string} [p.pergunta] - pra imagem/vídeo, o que perguntar ao modelo de visão
 * @param {string} [p.pastaTemp] - onde extrair frame temporário (obrigatório pra análise visual de vídeo)
 * @returns {Promise<{ok:boolean, modalidade:string, especialista:string, resultado?:object, erro?:string, evidencias:string[]}>}
 */
async function analisarArquivo({ missaoId, caminhoRelativo, resolverCaminhoSeguro, pergunta, pastaTemp }) {
  const seguranca = validarArquivoMultimidia(missaoId, caminhoRelativo, resolverCaminhoSeguro);
  if (!seguranca.ok) {
    return { ok: false, modalidade: 'desconhecida', especialista: null, erro: seguranca.motivo, evidencias: [`seguranca_bloqueou=true`] };
  }

  const { modalidade } = detectarModalidadeDaTarefa('', [seguranca.caminhoAbsoluto]);
  const especialista = escolherEspecialista(modalidade, 'analise');

  const orcamento = autocorrecao.criarOrcamento({ maxTentativas: 2 }); // multimídia: menos tentativas — a maioria das falhas aqui é ferramenta/gap indisponível, não algo que retry resolve
  const resultadoLoop = await autocorrecao.executarComAutocorrecao({
    orcamento,
    contextoInicial: {},
    executar: async () => {
      if (modalidade === 'imagem') return { tipo: 'imagem', r: await analisarImagem(seguranca.caminhoAbsoluto, pergunta) };
      if (modalidade === 'audio') {
        const meta = await analisarAudio(seguranca.caminhoAbsoluto);
        const transcricao = await transcreverAudio(seguranca.caminhoAbsoluto);
        return { tipo: 'audio', r: { ok: meta.ok, metadados: meta, transcricao } };
      }
      if (modalidade === 'video') {
        const meta = await analisarVideo(seguranca.caminhoAbsoluto);
        let visual = null;
        if (pastaTemp) visual = await analisarConteudoVisual(seguranca.caminhoAbsoluto, pastaTemp, 1, pergunta);
        return { tipo: 'video', r: { ok: meta.ok, metadados: meta, visual } };
      }
      return { tipo: modalidade, r: { ok: false, error: `modalidade "${modalidade}" não tem processamento multimídia definido (gap real)` } };
    },
    avaliar: (resultado) => {
      if (resultado.r.ok) return { sucesso: true };
      return { sucesso: false, mensagemErro: resultado.r.error || 'falha desconhecida no processamento multimídia', contextoDiagnostico: { fase: 'execucao' } };
    },
    corrigir: async ({ diagnostico }) => {
      // estratégia alternativa real (pedido, seção "Autocorreção" da FASE 9):
      // se a análise técnica (metadados) já funcionou mas uma parte opcional
      // falhou (ex: transcrição sem chave configurada), a 2ª tentativa não
      // teria como corrigir sozinha — mas o diagnóstico fica registrado pra
      // decisão humana/futura, nunca finge sucesso.
      return { diagnosticoAnterior: diagnostico.categoria };
    },
  });

  const evidencias = [`modalidade=${modalidade}`, `especialista=${especialista}`, `tentativas=${orcamento.tentativas}`];
  if (resultadoLoop.status !== 'SUCESSO_VALIDADO') {
    autocorrecao.registrarErro({
      categoria: resultadoLoop.historico.length ? resultadoLoop.historico[resultadoLoop.historico.length - 1].categoria : 'erro_ferramenta',
      mensagemErro: resultadoLoop.motivo, causaProvavel: 'processamento multimídia esgotou tentativas ou bloqueou',
      solucaoAplicada: null, resolveu: false, tarefaTipo: `multimidia_${modalidade}`, missaoId,
    });
    return { ok: false, modalidade, especialista, erro: `FALHA HONESTA: ${resultadoLoop.motivo}`, evidencias };
  }

  return { ok: true, modalidade, especialista, resultado: resultadoLoop.resultado.r, evidencias };
}

/**
 * Valida um artefato multimídia já produzido (ex: gerado por uma tarefa de
 * implementação) — "não considerar sucesso só por código 0".
 */
function validarArtefato({ caminhoAbsoluto, modalidadeEsperada, tamanhoMinimoBytes }) {
  return validarResultadoProcessamento({ caminhoAbsoluto, modalidadeEsperada, tamanhoMinimoBytes });
}

module.exports = {
  analisarArquivo, validarArtefato, detectarArquivo, detectarModalidadeDaTarefa, escolherEspecialista,
};
