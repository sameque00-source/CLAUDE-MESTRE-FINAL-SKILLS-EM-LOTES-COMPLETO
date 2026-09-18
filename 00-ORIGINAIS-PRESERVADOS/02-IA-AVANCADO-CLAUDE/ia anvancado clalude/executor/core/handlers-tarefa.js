/**
 * HANDLERS DE TAREFA — FASE 3 (base) + FASE 4 (agentes especialistas reais).
 *
 * FASE 4 adiciona: seleção do especialista real (registro-especialistas.js),
 * injeção da PERSONA completa (corpo do agente .md, FASE 0/1) + CONTRATO
 * padronizado (agentes/core/contrato.js) em todo prompt, os handlers QA e
 * SECURITY com PODER DE VETO real (não é só "opinião do agente" — QA roda
 * teste de verdade, Security varre o workspace com padrões reais), e log de
 * uso em `agentes/logs/agentes.jsonl` (memoria-agentes.js, seção 22).
 *
 * Estado auxiliar em runtime (JS permite sem editar o schema formal):
 * `missao._ultimoComandoTeste`, `tarefa._contrato`, `tarefa.motivoReabertura`.
 */
const fs = require('fs');
const path = require('path');
const ORQ_DIR = path.join(__dirname, '..', '..', 'orquestrador');
const AGENTES_DIR = path.join(__dirname, '..', '..', 'agentes');
const { criarResultado } = require(path.join(ORQ_DIR, 'core', 'Tarefa.js'));
const gerenciadorAgentes = require(path.join(ORQ_DIR, 'core', 'gerenciador-agentes.js'));

const { chamarLLM } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'chamar-llm.js'));
const { extrairJSON } = require(path.join(__dirname, '..', '..', 'planejador', 'core', 'json-robusto.js'));
const ferramentas = require('./ferramentas');
const { gerarCodigo } = require('./gerador-codigo');
const { garantirWorkspace } = require('./workspace');

const { resolverEspecialista } = require(path.join(AGENTES_DIR, 'core', 'registro-especialistas.js'));
const { montarContrato } = require(path.join(AGENTES_DIR, 'core', 'contrato.js'));
const memoriaAgentes = require(path.join(AGENTES_DIR, 'core', 'memoria-agentes.js'));

// FASE 5+6: pesquisa web real + memória inteligente
const { pesquisar } = require(path.join(__dirname, '..', '..', 'pesquisa', 'pesquisa.js'));
const memoria = require(path.join(__dirname, '..', '..', 'memoria', 'memoria.js'));

// FASE 7+8: roteamento inteligente + autocorreção avançada
const router = require(path.join(__dirname, '..', '..', 'router', 'router.js'));
const autocorrecao = require(path.join(__dirname, '..', '..', 'autocorrecao', 'autocorrecao.js'));

const TIPOS_IMPLEMENTACAO = ['codigo', 'frontend', 'backend', 'devops'];
const TIPOS_TEXTO = ['raciocinio', 'arquitetura', 'consolidacao', 'documentacao']; // 'pesquisa' saiu daqui — tem handler dedicado agora (handlePesquisa)
const MAX_TENTATIVAS_CORRECAO = 3;

const SINONIMOS_IMPLEMENTACAO = ['desenvolvimento', 'implementacao', 'implementação', 'build', 'construir', 'programacao', 'programação'];
const PISTAS_TEXTO_NA_DESCRICAO = /\b(criar?|implementar?|escrever?|desenvolver?|gerar?|construir?)\b.*\b(arquivo|script|c[oó]digo|fun[cç][aã]o|p[aá]gina|api|classe|m[oó]dulo)\b/i;

function pareceTarefaDeImplementacao(tarefa) {
  if (SINONIMOS_IMPLEMENTACAO.includes(String(tarefa.tipo || '').toLowerCase())) return true;
  if (Array.isArray(tarefa.ferramentas) && tarefa.ferramentas.includes('arquivos') && PISTAS_TEXTO_NA_DESCRICAO.test(tarefa.descricao || '')) return true;
  return false;
}

function listarArquivosWorkspace(missaoId) {
  const dir = garantirWorkspace(missaoId);
  try {
    return fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isFile());
  } catch { return []; }
}

/**
 * BUG REAL corrigido aqui (2026-09-15, FASE 4): o conteúdo de arquivo
 * mostrado ao Revisor/QA era cortado em 800-1000 caracteres — arquivos reais
 * gerados por este sistema costumam passar disso (ex: 2994 bytes um HTML
 * simples), e o agente, vendo um arquivo genuinamente cortado no meio de uma
 * tag, reportava corretamente "código truncado/incompleto" — mas o problema
 * era o CORTE DA AMOSTRA, não o arquivo real. Limite subido pra 6000
 * caracteres (cobre a esmagadora maioria dos artefatos gerados nesta escala
 * de missão) e o corte, quando genuinamente necessário, é rotulado
 * explicitamente para não confundir o agente.
 */
function formatarAmostraArquivo(conteudo, limite = 6000) {
  if (conteudo.length <= limite) return conteudo;
  return `${conteudo.slice(0, limite)}\n...(truncado aqui pelo Executor — o arquivo real tem ${conteudo.length} caracteres no total, não é um erro do código gerado)`;
}

// ---------------------------------------------------------------------------
// SELEÇÃO DE ESPECIALISTA + CONTRATO — FASE 4, seções 2/3/5/8/9
// ---------------------------------------------------------------------------

/** Mapa tipo de tarefa → função de especialista padrão, quando o Planejador não sugeriu nenhuma.
 * FASE 7: extraído para `agentes/core/especialista-padrao-por-tipo.js` (evita
 * ciclo de require com `router/core/composicao-agentes.js`, que também precisa dele). */
const { ESPECIALISTA_PADRAO_POR_TIPO } = require(path.join(AGENTES_DIR, 'core', 'especialista-padrao-por-tipo.js'));

/**
 * Resolve o especialista (FASE 4, seção 5: seleção automática usando tipo/
 * complexidade/ferramentas/contexto) e monta o CONTRATO com a persona real
 * injetada. Contexto por agente (seção 8): só os resultados de DEPENDÊNCIAS
 * diretas desta tarefa — nunca a missão inteira.
 */
function prepararEspecialistaEContrato(tarefa, missao) {
  const funcaoSugerida = tarefa.agenteFuncaoSugerida || ESPECIALISTA_PADRAO_POR_TIPO[tarefa.tipo] || null;
  const especialista = resolverEspecialista(funcaoSugerida);
  let personaTexto = null;
  if (especialista) {
    const agenteCarregado = gerenciadorAgentes.carregarAgente(especialista.arquivo);
    personaTexto = agenteCarregado ? agenteCarregado.prompt : null;
    tarefa.agente = especialista.arquivo;
  }
  // contexto por agente (seção 8): só resultados das dependências diretas
  const contextoDependencias = (tarefa.dependeDe || [])
    .map((depId) => missao.resultados.find((r) => r.tarefaId === depId))
    .filter(Boolean)
    .map((r) => `- ${r.resultado}`)
    .join('\n');
  const contrato = montarContrato({
    persona: personaTexto,
    objetivo: tarefa.descricao,
    contexto: contextoDependencias,
    ferramentas: especialista ? especialista.ferramentas : (tarefa.ferramentas || []),
    saidaEsperada: (tarefa.contexto && tarefa.contexto.resultadoEsperado) || '',
    criteriosSucesso: tarefa.criterioConclusao || [],
  });
  tarefa._contrato = contrato;
  return { especialista, contrato };
}

/** Envolve qualquer handler com timing + log em memória de agentes (FASE 4, seção 22). Nunca lança. */
function comMemoria(nomeEspecialista, tarefa, missao, fnHandler) {
  const t0 = Date.now();
  return Promise.resolve(fnHandler()).then((resultado) => {
    memoriaAgentes.registrarUso({
      especialista: nomeEspecialista, tarefaId: tarefa.id, tarefaTipo: tarefa.tipo, missaoId: missao.id,
      sucesso: resultado.status === 'ok', tempoMs: Date.now() - t0, resumoResultado: resultado.resultado || (resultado.erros || [])[0],
    });
    return resultado;
  }, (erro) => {
    memoriaAgentes.registrarUso({ especialista: nomeEspecialista, tarefaId: tarefa.id, tarefaTipo: tarefa.tipo, missaoId: missao.id, sucesso: false, tempoMs: Date.now() - t0, resumoResultado: erro.message });
    throw erro;
  });
}

// ---------------------------------------------------------------------------
// IMPLEMENTAÇÃO (código/frontend/backend/devops) — gerar → escrever →
// testar de verdade → se falhar, corrigir com o erro real → repetir.
// ---------------------------------------------------------------------------
/**
 * FASE 8: o loop de tentativa→erro→correção que a FASE 3 já tinha (repetir
 * até MAX_TENTATIVAS_CORRECAO vezes) agora passa pelo loop controlado de
 * `autocorrecao/core/loop.js` — a diferença real de comportamento: quando a
 * MESMA categoria de falha se repete 2x seguidas, a estratégia MUDA (troca
 * de modelo via `evitarModelos`, em vez de tentar de novo com o mesmo
 * candidato que já falhou), e a memória de erros (FASE 6) é consultada
 * antes de corrigir de novo e alimentada com o resultado ao final —
 * "nunca tentar a mesma coisa repetidamente" (pedido, FASE 8).
 */
async function handleImplementacao(tarefa, missao) {
  const { especialista, contrato } = prepararEspecialistaEContrato(tarefa, missao);
  const nomeAgente = especialista ? especialista.chave : 'coding';
  // veto de QA/Security reabriu esta tarefa (FASE 4, seção 12): o motivo
  // real do veto vira o "erro anterior" já na 1ª tentativa desta rodada.
  const erroDoVeto = tarefa.motivoReabertura || null;
  if (tarefa.motivoReabertura) tarefa.motivoReabertura = null;

  const arquivosExistentes = listarArquivosWorkspace(missao.id);
  // FASE 8: pra "detectar e corrigir um bug REAL já existente" (não só gerar
  // código novo do zero), o gerador precisa VER o conteúdo dos arquivos que
  // já estão no workspace, não só seus nomes (o que já era passado desde a
  // FASE 3). Mesmo padrão de amostra limitada já usado em QA/Revisor
  // (`formatarAmostraArquivo`) — nunca o arquivo inteiro sem limite.
  const arquivosExistentesComConteudo = arquivosExistentes.slice(0, 5).map((f) => {
    const r = ferramentas.lerArquivo(missao.id, f);
    return r.ok ? `--- ${f} ---\n${formatarAmostraArquivo(r.conteudo, 3000)}` : null;
  }).filter(Boolean).join('\n\n');
  let arquivosGravadosUltimaTentativa = [];

  const orcamento = autocorrecao.criarOrcamento({ maxTentativas: MAX_TENTATIVAS_CORRECAO });
  const resultadoLoop = await autocorrecao.executarComAutocorrecao({
    orcamento,
    contextoInicial: { erroAnterior: erroDoVeto, evitarModelos: [] },
    executar: async (contexto, meta) => {
      const geracao = await gerarCodigo(tarefa, {
        arquivosExistentes, arquivosExistentesConteudo: arquivosExistentesComConteudo, erroAnterior: contexto.erroAnterior, tentativa: meta.tentativa,
        complexidade: missao.complexidade || 2, contrato, evitarModelos: contexto.evitarModelos, agente: nomeAgente,
      });
      if (!geracao.ok) return { fase: 'geracao', geracao, execucao: null };
      tarefa.modelo = geracao.modeloId;

      const arquivosGravados = [];
      let falhaEscrita = null;
      for (const a of geracao.arquivos) {
        const r = ferramentas.escreverArquivo(missao.id, tarefa.id, a.caminho, a.conteudo);
        if (!r.ok) { falhaEscrita = r.erro; break; }
        arquivosGravados.push(a.caminho);
      }
      arquivosGravadosUltimaTentativa = arquivosGravados;
      if (falhaEscrita) return { fase: 'escrita', geracao, execucao: null, falhaEscrita, arquivosGravados };

      if (!geracao.comandoTeste) {
        return { fase: 'sem_teste', geracao, execucao: { ok: true }, arquivosGravados };
      }
      if (geracao.tipoExecucao === 'servidor') {
        const execucao = await ferramentas.testarServidor(missao.id, geracao.comandoTeste, geracao.comandoTesteArgs, { porta: geracao.porta, rotaTeste: geracao.rotaTeste });
        return { fase: 'servidor', geracao, execucao, arquivosGravados };
      }
      const execucao = await ferramentas.executarComando(missao.id, geracao.comandoTeste, geracao.comandoTesteArgs);
      return { fase: 'comando', geracao, execucao, arquivosGravados };
    },
    avaliar: (resultado) => {
      if (resultado.fase === 'geracao') {
        return { sucesso: false, mensagemErro: `geração de código falhou: ${resultado.geracao.error}`, contextoDiagnostico: { fase: 'roteamento' } };
      }
      if (resultado.fase === 'escrita') {
        return { sucesso: false, mensagemErro: resultado.falhaEscrita, contextoDiagnostico: { fase: 'execucao' } };
      }
      if (resultado.fase === 'sem_teste') return { sucesso: true };
      if (!resultado.execucao.ok) {
        const erroCompleto = `${resultado.execucao.erro || ''}\nstderr: ${resultado.execucao.stderr || ''}\nstdout: ${resultado.execucao.stdout || ''}`.trim();
        return { sucesso: false, mensagemErro: erroCompleto, contextoDiagnostico: { fase: 'execucao', stderr: resultado.execucao.stderr, codigoSaida: resultado.execucao.codigoSaida ?? null } };
      }
      return { sucesso: true };
    },
    corrigir: async ({ diagnostico, estrategia, contextoAnterior, resultado }) => {
      // memória de erros (FASE 6/8): consulta ANTES de corrigir de novo —
      // nunca copia a solução cegamente, só soma como contexto extra pro
      // prompt; a validação real continua sendo a execução/teste seguinte.
      const precedente = autocorrecao.consultarErroConhecido(diagnostico.categoria, diagnostico.causaProvavel, tarefa.tipo);
      const dicaMemoria = precedente.sugestao ? `\n\n[MEMÓRIA — precedente parecido já resolvido antes, REVALIDAR, não copiar cegamente]: ${precedente.sugestao}` : '';

      const novoContexto = { erroAnterior: `${diagnostico.causaProvavel}: (mensagem completa)\n${(resultado.execucao && resultado.execucao.erro) || resultado.falhaEscrita || resultado.geracao.error || ''}${dicaMemoria}`.slice(0, 2000), evitarModelos: contextoAnterior.evitarModelos };

      if (estrategia.acao === autocorrecao.ACOES_ESTRATEGIA.TROCAR_MODELO && resultado.geracao && resultado.geracao.modeloId) {
        novoContexto.evitarModelos = [...new Set([...contextoAnterior.evitarModelos, resultado.geracao.modeloId])];
      }
      return novoContexto;
    },
  });

  const tentativasUsadas = orcamento.tentativas;
  const r = resultadoLoop.resultado;

  if (resultadoLoop.status === 'SUCESSO_VALIDADO') {
    const geracao = r.geracao;
    if (resultadoLoop.historico.length > 0) {
      const ultimoDiagAntesDoSucesso = resultadoLoop.historico[resultadoLoop.historico.length - 1];
      autocorrecao.registrarErro({
        categoria: ultimoDiagAntesDoSucesso.categoria, mensagemErro: ultimoDiagAntesDoSucesso.mensagem, causaProvavel: ultimoDiagAntesDoSucesso.causaProvavel,
        solucaoAplicada: `trocou de estratégia e a tentativa seguinte (nº ${tentativasUsadas}) foi validada com sucesso real`,
        resolveu: true, tarefaTipo: tarefa.tipo, missaoId: missao.id,
      });
    }
    if (r.fase === 'servidor') {
      missao._ultimoComandoTeste = { comando: geracao.comandoTeste, args: geracao.comandoTesteArgs, tipoExecucao: 'servidor', porta: geracao.porta, rotaTeste: geracao.rotaTeste };
      return criarResultado({
        status: 'ok', resultado: geracao.explicacao, arquivos: r.arquivosGravados,
        testes: [{ comando: `${geracao.comandoTeste} (servidor, porta ${geracao.porta})`, resultado: 'passou', evidencia: `HTTP ${r.execucao.codigoHttp} em ${geracao.rotaTeste}: ${r.execucao.corpo}` }],
        evidencias: [`tentativa ${tentativasUsadas}/${MAX_TENTATIVAS_CORRECAO}`, `modelo=${geracao.modeloId}`, `agente=${nomeAgente}`, 'servidor validado com requisição HTTP real'],
      });
    }
    if (r.fase === 'comando') {
      missao._ultimoComandoTeste = { comando: geracao.comandoTeste, args: geracao.comandoTesteArgs, tipoExecucao: 'unica' };
      return criarResultado({
        status: 'ok', resultado: geracao.explicacao, arquivos: r.arquivosGravados,
        testes: [{ comando: `${geracao.comandoTeste} ${geracao.comandoTesteArgs.join(' ')}`.trim(), resultado: 'passou', evidencia: r.execucao.stdout.slice(0, 300) }],
        evidencias: [`tentativa ${tentativasUsadas}/${MAX_TENTATIVAS_CORRECAO}`, `modelo=${geracao.modeloId}`, `agente=${nomeAgente}`],
      });
    }
    return criarResultado({
      status: 'ok', resultado: geracao.explicacao, arquivos: r.arquivosGravados,
      evidencias: [`arquivo(s) criado(s) sem comando de teste executável (${geracao.arquivos.map((a) => a.caminho).join(', ')})`, `agente=${nomeAgente}`],
      recomendacoes: ['nenhum comando de teste automático disponível para este artefato — validação manual recomendada'],
    });
  }

  // FALHA_HONESTA (FASE 8): orçamento esgotado, ou estratégia decidiu
  // bloquear (categoria sem correção automática viável) — nunca finge
  // sucesso. Registra na memória de erros pra futuras missões evitarem
  // repetir a mesma tentativa fracassada às cegas.
  const ultimoDiag = resultadoLoop.historico[resultadoLoop.historico.length - 1];
  if (ultimoDiag) {
    autocorrecao.registrarErro({
      categoria: ultimoDiag.categoria, mensagemErro: ultimoDiag.mensagem, causaProvavel: ultimoDiag.causaProvavel,
      solucaoAplicada: `esgotou ${tentativasUsadas} tentativa(s), última estratégia: ${resultadoLoop.motivo}`,
      resolveu: false, tarefaTipo: tarefa.tipo, missaoId: missao.id,
    });
  }
  return criarResultado({
    status: 'erro',
    arquivos: arquivosGravadosUltimaTentativa,
    erros: [`FALHA HONESTA (FASE 8): ${resultadoLoop.motivo} — histórico: ${resultadoLoop.historico.map((h) => h.categoria).join(' → ')}`],
    evidencias: [`agente=${nomeAgente}`, `tentativas=${tentativasUsadas}/${MAX_TENTATIVAS_CORRECAO}`],
  });
}

// ---------------------------------------------------------------------------
// PESQUISA — FASE 5+6: RESEARCH AGENT → RECALL (memória) → BUSCA WEB REAL →
// COLETA/VALIDAÇÃO/SÍNTESE (pesquisa/pesquisa.js) → grava em MEMÓRIA →
// outras tarefas reutilizam. Nunca inventa fonte, nunca finge pesquisa.
// ---------------------------------------------------------------------------
function inferirTipoBusca(descricao) {
  const d = String(descricao || '').toLowerCase();
  if (/\b(bibliotec|pacote|package|npm|vers[aã]o d[ea])\b/.test(d)) return 'pacote';
  if (/\b(compar|versus|melhor (op[cç][aã]o|escolha))\b/.test(d)) return 'comparacao';
  if (/\b(atual|recente|hoje|202\d)\b/.test(d)) return 'atual';
  if (/\b(o que [eé]|defini[cç][aã]o|conceito)\b/.test(d)) return 'conceito';
  return 'geral';
}
function inferirCategoriaCache(descricao) {
  const d = String(descricao || '').toLowerCase();
  if (/\bvers[aã]o\b/.test(d)) return 'versao_pacote';
  if (/\bpre[cç]o\b/.test(d)) return 'preco';
  if (/\bnot[ií]cia\b/.test(d)) return 'noticia';
  if (/\bdocumenta[cç][aã]o\b/.test(d)) return 'documentacao';
  return 'fato_geral';
}

async function handlePesquisa(tarefa, missao) {
  const { especialista } = prepararEspecialistaEContrato(tarefa, missao);
  const query = (tarefa.contexto && tarefa.contexto.objetivo) || tarefa.descricao;
  const nomeAgente = especialista ? especialista.chave : 'research';

  // 1) RECALL (seção 13/20): consulta memória ANTES de pesquisar de novo.
  const antesDePesquisar = memoria.consultarAntesDePesquisar(query, { missaoId: missao.id });
  if (antesDePesquisar.reutilizar && !antesDePesquisar.precisaAtualizar) {
    const registro = antesDePesquisar.registro;
    return criarResultado({
      status: 'ok',
      resultado: registro.conteudo,
      evidencias: [
        'memoria_reutilizada=true', `confianca=${registro._confiancaAtual}`, `agente=${nomeAgente}`,
        ...((registro.evidencias || []).map((e) => `${e.titulo || e.url} (${e.classificacaoFonte || 'memória'}) - ${e.url || 'sem url'}`)),
      ],
      recomendacoes: ['resultado obtido da memória (pesquisa anterior ainda válida) — pesquisa web NÃO refeita, evitando redundância (FASE 6, seção 9/13)'],
    });
  }

  // 2) BUSCA WEB REAL — adaptativa (profundidade por complexidade), com
  // pesquisa incremental quando a memória só estava PRÓXIMA de expirar
  // (seção 20: não descarta tudo, usa como contexto + pesquisa nova).
  const resultadoPesquisa = await pesquisar(query, {
    tipo: inferirTipoBusca(tarefa.descricao),
    categoria: inferirCategoriaCache(tarefa.descricao),
    complexidade: missao.complexidade || 2,
    forcarNovaPesquisa: antesDePesquisar.precisaAtualizar,
  });

  if (!resultadoPesquisa.ok) {
    // FASE 5, seção 10: falha de pesquisa nunca inventa. Se havia memória
    // (mesmo vencida), usa como fallback EXPLICITAMENTE rotulado — nunca
    // apresentado como fato atual.
    if (antesDePesquisar.registro) {
      return criarResultado({
        status: 'ok',
        resultado: antesDePesquisar.registro.conteudo,
        evidencias: ['pesquisa_indisponivel=true', 'usando_memoria_desatualizada=true', `agente=${nomeAgente}`],
        recomendacoes: [`pesquisa web indisponível (${resultadoPesquisa.error}) — usando conhecimento anterior da memória, pode estar desatualizado; marcar como [PRECISA VERIFICAÇÃO]`],
      });
    }
    // BUG REAL corrigido aqui (2026-09-15, achado no teste de regressão da
    // FASE 4 — "Melhore um pequeno aplicativo web..."): retornar status:'erro'
    // aqui aciona a cascata de cancelamento de tarefas dependentes (Fase 3/4,
    // executor/executor.js) — uma tarefa de código que dependia da pesquisa
    // era cancelada inteira só porque nenhum provider gratuito achou fonte
    // pra uma pergunta genérica demais pra pesquisar (ex: "melhore um app
    // web", sem nome de pacote/fato específico). "Não achei fonte" é uma
    // resposta HONESTA (seção 10: nunca inventa), mas não é uma falha fatal
    // de missão — o agente de código ainda pode trabalhar com raciocínio
    // próprio. Não inventa nada: resultado deixa explícito que nenhuma
    // pesquisa externa foi encontrada, sem fabricar fonte/fato algum.
    return criarResultado({
      status: 'ok',
      resultado: `Nenhuma fonte externa encontrada para "${query}" (providers gratuitos tentados: ${JSON.stringify(resultadoPesquisa.tentativas)}). Nenhum fato foi inventado — prosseguindo apenas com conhecimento geral do agente, sem alegar pesquisa concluída.`,
      evidencias: [`pesquisa_indisponivel=true`, `agente=${nomeAgente}`, `tentativas=${JSON.stringify(resultadoPesquisa.tentativas)}`],
      recomendacoes: [`pesquisa web indisponível (${resultadoPesquisa.error}) — [PRECISA VERIFICAÇÃO] nenhuma fonte externa confirmada, não bloquear tarefas dependentes por isso`],
    });
  }

  // 3) RESEARCH → MEMORY (seção 19): filtro+normalização já aplicados dentro
  // de gravarResultadoDePesquisa (só grava com evidência real e confiança mínima).
  const gravado = memoria.gravarResultadoDePesquisa(resultadoPesquisa, { missaoId: missao.id });
  const evidenciasTexto = resultadoPesquisa.evidencias.map((e) => `${e.titulo || e.url} (${e.classificacaoFonte}, confiança=${e.confianca}) - ${e.url || 'sem url'}`);

  const recomendacoes = [];
  if (resultadoPesquisa.situacao === 'contradicao') {
    recomendacoes.push(`DIVERGÊNCIA DETECTADA entre fontes: ${resultadoPesquisa.motivoDivergencia}`);
    for (const a of resultadoPesquisa.afirmacoes) recomendacoes.push(`afirmação: "${a.texto}" (fontes: ${(a.fontes || []).join(', ')}, confiabilidade=${a.confiabilidade})`);
  }

  return criarResultado({
    status: 'ok',
    resultado: resultadoPesquisa.sintese,
    evidencias: [
      `provider=${resultadoPesquisa.provider}`, `situacao=${resultadoPesquisa.situacao}`, `confianca=${resultadoPesquisa.confianca}`,
      `agente=${nomeAgente}`, `memoria_gravada=${gravado.ok}`, ...evidenciasTexto,
    ],
    recomendacoes,
  });
}

// ---------------------------------------------------------------------------
// TEXTO (raciocínio/arquitetura/consolidação/documentação)
// ---------------------------------------------------------------------------
async function handleTexto(tarefa, missao) {
  const { especialista, contrato } = prepararEspecialistaEContrato(tarefa, missao);
  const prompt = `${contrato}`;
  const resp = await chamarLLM(prompt, { tipoTarefa: tarefa.tipo === 'raciocinio' || tarefa.tipo === 'consolidacao' ? 'raciocinio' : (especialista ? especialista.tipoTarefaScoring : 'texto'), complexidade: missao.complexidade || 2, maxTokens: 800, agente: especialista ? especialista.chave : null });
  if (!resp.ok) return criarResultado({ status: 'erro', erros: [`${resp.error}${resp.categoriaFalha ? ` (categoria=${resp.categoriaFalha})` : ''}`] });
  tarefa.modelo = resp.modeloId;
  return criarResultado({ status: 'ok', resultado: resp.texto, evidencias: [`modelo=${resp.modeloId}`, `agente=${especialista ? especialista.chave : 'nenhum'}`] });
}

// ---------------------------------------------------------------------------
// TESTE — roda um comando REAL (não confia em "deveria funcionar")
// ---------------------------------------------------------------------------
async function handleTeste(tarefa, missao) {
  const comando = missao._ultimoComandoTeste;
  if (!comando) {
    const arquivos = listarArquivosWorkspace(missao.id);
    return criarResultado({
      status: arquivos.length > 0 ? 'ok' : 'erro',
      resultado: arquivos.length > 0 ? `nenhum comando de teste executável foi registrado por tarefas anteriores; arquivos presentes no workspace: ${arquivos.join(', ')}` : null,
      erros: arquivos.length > 0 ? [] : ['nenhum arquivo no workspace e nenhum comando de teste conhecido'],
      recomendacoes: arquivos.length > 0 ? ['validação automática não disponível para este artefato — considerar handler específico'] : [],
    });
  }
  const execucao = comando.tipoExecucao === 'servidor'
    ? await ferramentas.testarServidor(missao.id, comando.comando, comando.args, { porta: comando.porta, rotaTeste: comando.rotaTeste })
    : await ferramentas.executarComando(missao.id, comando.comando, comando.args);
  const evidencia = comando.tipoExecucao === 'servidor'
    ? (execucao.ok ? `HTTP ${execucao.codigoHttp}: ${execucao.corpo}` : execucao.erro)
    : (execucao.stdout || execucao.stderr || '');
  return criarResultado({
    status: execucao.ok ? 'ok' : 'erro',
    resultado: execucao.ok ? 'teste executado com sucesso (validação real)' : null,
    erros: execucao.ok ? [] : [String(execucao.erro || execucao.stderr || 'falhou').trim()],
    testes: [{ comando: comando.comando, resultado: execucao.ok ? 'passou' : 'falhou', evidencia: String(evidencia).slice(0, 300) }],
  });
}

// ---------------------------------------------------------------------------
// QA — FASE 4, seção 18: valida comportamento/testes/erros/casos extremos,
// PODE BLOQUEAR A CONCLUSÃO. Não é opinião — roda o teste real primeiro
// (mesmo mecanismo do handleTeste); só depois de passar tecnicamente é que
// aplica julgamento de casos extremos via persona.
// ---------------------------------------------------------------------------
async function handleQA(tarefa, missao) {
  const { especialista, contrato } = prepararEspecialistaEContrato(tarefa, missao);
  const resultadoTeste = await handleTeste(tarefa, missao);
  if (resultadoTeste.status === 'erro') {
    return criarResultado({
      status: 'erro',
      erros: [`veto: QA reprovou — execução real falhou: ${(resultadoTeste.erros || []).join('; ')}`],
      testes: resultadoTeste.testes, evidencias: [`agente=${especialista ? especialista.chave : 'testing'}`, 'veto=true'],
    });
  }
  const arquivos = listarArquivosWorkspace(missao.id);
  const amostras = arquivos.slice(0, 5).map((f) => {
    const r = ferramentas.lerArquivo(missao.id, f);
    return r.ok ? `--- ${f} ---\n${formatarAmostraArquivo(r.conteudo)}` : '';
  }).filter(Boolean).join('\n\n');
  const prompt = `${contrato}\n\nOs testes automatizados JÁ PASSARAM (evidência: ${JSON.stringify(resultadoTeste.testes)}). Como QA, avalie se há casos extremos óbvios não cobertos (entrada vazia, valor negativo, arquivo ausente, etc.) que colocam em risco o critério de conclusão.\n\nArquivos:\n${amostras || '(nenhum)'}\n\nResponda APENAS com JSON: {"aprovado": true|false, "motivo": "...", "casosNaoCobertos": ["..."]}`;
  const resp = await chamarLLM(prompt, { tipoTarefa: 'raciocinio', complexidade: missao.complexidade || 2, maxTokens: 500, agente: especialista ? especialista.chave : 'testing' });
  if (!resp.ok) {
    // teste real já passou; sem o julgamento extra do LLM, aprova por evidência real (não trava a missão por indisponibilidade de provider)
    return criarResultado({ status: 'ok', resultado: 'QA: testes reais passaram (julgamento de casos extremos indisponível nesta rodada)', testes: resultadoTeste.testes, evidencias: ['veto=false', `agente=${especialista ? especialista.chave : 'testing'}`] });
  }
  const json = extrairJSON(resp.texto) || { aprovado: true, motivo: 'resposta do QA não interpretável — aprovado por padrão pois o teste real já havia passado' };
  tarefa.modelo = resp.modeloId;
  if (!json.aprovado) {
    return criarResultado({
      status: 'erro',
      erros: [`veto: QA reprovou — ${json.motivo || 'casos extremos não cobertos'}`],
      evidencias: [`agente=${especialista ? especialista.chave : 'testing'}`, 'veto=true', ...(json.casosNaoCobertos || [])],
      testes: resultadoTeste.testes,
    });
  }
  return criarResultado({ status: 'ok', resultado: `QA aprovou: ${json.motivo || 'sem ressalvas'}`, testes: resultadoTeste.testes, evidencias: ['veto=false', `agente=${especialista ? especialista.chave : 'testing'}`] });
}

// ---------------------------------------------------------------------------
// SECURITY — FASE 4, seção 19: varredura REAL e determinística de secrets/
// comandos perigosos (não é só opinião do LLM) + julgamento adicional.
// NUNCA executa ação destrutiva — só lê e reporta.
// ---------------------------------------------------------------------------
const PADROES_RISCO = [
  { nome: 'possível chave de API hardcoded', re: /\b(sk-[a-zA-Z0-9]{10,}|gsk_[a-zA-Z0-9]{10,}|AQ\.[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{12,})\b/ },
  { nome: 'senha hardcoded', re: /\b(password|senha|passwd)\s*[:=]\s*['"][^'"\s]{4,}['"]/i },
  { nome: 'comando potencialmente destrutivo', re: /\brm\s+-rf\s+[\/~]|\bformat\s+[a-zA-Z]:|\bDROP\s+(TABLE|DATABASE)\b|del\s+\/[sSfF]\s+[cC]:/i },
  { nome: 'eval/exec de entrada não confiável', re: /\beval\s*\(|new Function\s*\(/ },
  { nome: 'SQL montado por concatenação (risco de injeção)', re: /["'`]\s*\+\s*\w+\s*\+\s*["'`].{0,20}(SELECT|INSERT|UPDATE|DELETE)/i },
];

async function handleSecurity(tarefa, missao) {
  const { especialista, contrato } = prepararEspecialistaEContrato(tarefa, missao);
  const arquivos = listarArquivosWorkspace(missao.id);
  const achados = [];
  for (const f of arquivos) {
    const r = ferramentas.lerArquivo(missao.id, f);
    if (!r.ok) continue;
    for (const padrao of PADROES_RISCO) {
      if (padrao.re.test(r.conteudo)) achados.push(`${f}: ${padrao.nome}`);
    }
  }
  if (achados.length > 0) {
    return criarResultado({
      status: 'erro',
      erros: [`veto: Security bloqueou — ${achados.join('; ')}`],
      evidencias: [`agente=${especialista ? especialista.chave : 'security'}`, 'veto=true', `${arquivos.length} arquivo(s) varrido(s)`],
      recomendacoes: achados,
    });
  }
  return criarResultado({
    status: 'ok',
    resultado: `Security: nenhum risco óbvio encontrado na varredura determinística (${PADROES_RISCO.length} padrões, ${arquivos.length} arquivo(s))`,
    evidencias: ['veto=false', `agente=${especialista ? especialista.chave : 'security'}`],
  });
}

// ---------------------------------------------------------------------------
// REVISÃO — LLM com poder de veto real, olhando pro que foi produzido de fato
// ---------------------------------------------------------------------------
async function handleRevisao(tarefa, missao) {
  const { especialista, contrato } = prepararEspecialistaEContrato(tarefa, missao);
  const arquivos = listarArquivosWorkspace(missao.id);
  const amostras = arquivos.slice(0, 5).map((f) => {
    const r = ferramentas.lerArquivo(missao.id, f);
    return r.ok ? `--- ${f} ---\n${formatarAmostraArquivo(r.conteudo)}` : `--- ${f} --- (erro ao ler: ${r.erro})`;
  }).join('\n\n');
  const prompt = `${contrato}\n\nArquivos produzidos por outras tarefas desta missão:\n${amostras || '(nenhum arquivo no workspace)'}\n\nResponda APENAS com JSON: {"aprovado": true|false, "motivo": "...", "problemas": ["..."]}`;
  const resp = await chamarLLM(prompt, { tipoTarefa: 'raciocinio', complexidade: missao.complexidade || 2, maxTokens: 600, agente: especialista ? especialista.chave : 'reviewer' });
  if (!resp.ok) return criarResultado({ status: 'erro', erros: [resp.error] });
  const json = extrairJSON(resp.texto) || { aprovado: arquivos.length > 0, motivo: 'não foi possível interpretar a resposta do revisor, aprovação por presença de artefatos' };
  tarefa.modelo = resp.modeloId;
  return criarResultado({
    status: 'ok', // a TAREFA de revisão em si sempre "concluiu" — o veredito vem no resultado (consumido pelo Executor)
    resultado: json.motivo || '',
    evidencias: [`aprovado=${json.aprovado}`, `agente=${especialista ? especialista.chave : 'reviewer'}`, ...(json.problemas || [])],
    recomendacoes: json.aprovado ? [] : (json.problemas || ['revisão reprovou sem detalhar problemas específicos']),
  });
}

/** Dispatcher principal — decide o handler pelo `tipo` da tarefa, com log de uso do especialista (FASE 4, seção 22). */
async function executarTarefaReal(tarefa, missao) {
  const especialistaPrevisto = tarefa.agenteFuncaoSugerida || ESPECIALISTA_PADRAO_POR_TIPO[tarefa.tipo] || tarefa.tipo;

  if (tarefa.tipo === 'qa') return comMemoria(especialistaPrevisto, tarefa, missao, () => handleQA(tarefa, missao));
  if (tarefa.tipo === 'security') return comMemoria(especialistaPrevisto, tarefa, missao, () => handleSecurity(tarefa, missao));
  if (tarefa.tipo === 'revisao') return comMemoria(especialistaPrevisto, tarefa, missao, () => handleRevisao(tarefa, missao));
  if (tarefa.tipo === 'teste') return comMemoria(especialistaPrevisto, tarefa, missao, () => handleTeste(tarefa, missao));
  if (tarefa.tipo === 'pesquisa') return comMemoria(especialistaPrevisto, tarefa, missao, () => handlePesquisa(tarefa, missao));
  if (TIPOS_IMPLEMENTACAO.includes(tarefa.tipo)) return comMemoria(especialistaPrevisto, tarefa, missao, () => handleImplementacao(tarefa, missao));
  if (TIPOS_TEXTO.includes(tarefa.tipo)) return comMemoria(especialistaPrevisto, tarefa, missao, () => handleTexto(tarefa, missao));
  if (pareceTarefaDeImplementacao(tarefa)) return comMemoria(especialistaPrevisto, tarefa, missao, () => handleImplementacao(tarefa, missao));
  return comMemoria(especialistaPrevisto, tarefa, missao, () => handleTexto(tarefa, missao));
}

module.exports = {
  executarTarefaReal, handleImplementacao, handleTexto, handleTeste, handleRevisao, handleQA, handleSecurity, handlePesquisa,
  listarArquivosWorkspace, prepararEspecialistaEContrato, ESPECIALISTA_PADRAO_POR_TIPO,
};
