/**
 * GERADOR DE CÓDIGO — FASE 3, seção 1/11 do pedido.
 *
 * Reaproveita 100% a ponte de LLM já construída na FASE 2
 * (`planejador/core/chamar-llm.js` e `json-robusto.js`) — não duplica
 * chamada de modelo nem extração de JSON.
 */
const path = require('path');
const PLAN_DIR = path.join(__dirname, '..', '..', 'planejador');
const { chamarLLM } = require(path.join(PLAN_DIR, 'core', 'chamar-llm.js'));
const { extrairJSON } = require(path.join(PLAN_DIR, 'core', 'json-robusto.js'));

function montarPrompt(tarefa, { arquivosExistentes = [], arquivosExistentesConteudo = null, erroAnterior = null, tentativa = 1, contrato = null } = {}) {
  // FASE 4: quando há um contrato de especialista (persona + INPUT/CONTEXT/
  // TOOLS/CONSTRAINTS/SUCCESS_CRITERIA), ele abre o prompt — o agente
  // "fala" antes das regras técnicas de formato de saída.
  let p = contrato ? `${contrato}\n\n---\n\n` : '';
  p += `Você é o módulo Executor de um agente de IA autônomo, em modo IMPLEMENTAÇÃO. Gere o(s) arquivo(s) necessários para cumprir esta tarefa real — o código será REALMENTE escrito em disco e REALMENTE executado.

TAREFA: "${tarefa.descricao}"
CRITÉRIO DE CONCLUSÃO: ${JSON.stringify(tarefa.criterioConclusao || [])}
`;
  if (arquivosExistentesConteudo) {
    // FASE 8: conteúdo real (não só nome) — necessário pra "detectar e
    // corrigir um bug já existente" em vez de só gerar código novo do zero.
    p += `\nARQUIVOS JÁ EXISTENTES NO WORKSPACE, COM CONTEÚDO REAL (leia antes de decidir o que mudar — se a tarefa pede correção de um bug, o bug pode estar literalmente aqui):\n${arquivosExistentesConteudo}\n`;
  } else if (arquivosExistentes.length > 0) {
    p += `\nARQUIVOS JÁ EXISTENTES NO WORKSPACE (para contexto/compatibilidade — não repita o que não precisa mudar):\n${arquivosExistentes.map((a) => `- ${a}`).join('\n')}\n`;
  }
  if (erroAnterior) {
    p += `\nATENÇÃO — TENTATIVA ${tentativa}: a versão anterior deste código FALHOU DE VERDADE ao rodar. Corrija o problema real abaixo, não repita o mesmo erro:\n${erroAnterior.slice(0, 1500)}\n`;
  }
  p += `\nUse tecnologia simples e SEM dependência externa que precise de "npm install" (o ambiente de execução não roda instalação de pacotes) — prefira Node.js puro (built-ins), HTML/CSS/JS puro, ou Python puro (stdlib), o que for mais adequado à tarefa.

Responda APENAS com JSON válido, sem texto antes ou depois, neste formato:
{
  "arquivos": [{"caminho": "index.html", "conteudo": "..."}],
  "comandoTeste": "node index.js",
  "comandoTesteArgs": [],
  "tipoExecucao": "unica",
  "porta": null,
  "rotaTeste": "/",
  "explicacao": "1-2 frases do que foi feito"
}
Se "tipoExecucao" for "servidor", preencha "porta" (número da porta que o servidor escuta) e "rotaTeste" (caminho HTTP que deve responder 200, ex: "/").
"comandoTeste" é o comando pra verificar que o resultado funciona de verdade (ex: "node" com args ["arquivo.js"]), ou null se o artefato não for executável por comando (ex: um HTML puro que só abre no navegador — nesse caso use "comandoTeste": null).
"tipoExecucao": "unica" se o comando termina sozinho e imprime o resultado (script comum); "servidor" se o comando NUNCA termina sozinho por natureza (ex: \`http.createServer(...).listen(...)\`, qualquer servidor web/API que fica escutando pra sempre) — isso muda como o resultado é validado, nunca use "unica" para um servidor.`;
  return p;
}

/**
 * @returns {Promise<{ok:boolean, arquivos:Array<{caminho,conteudo}>, comandoTeste:string|null, comandoTesteArgs:string[], explicacao:string, modeloId:string|null, error?:string}>}
 */
async function gerarCodigo(tarefa, opcoes = {}) {
  const prompt = montarPrompt(tarefa, opcoes);
  // FASE 7/8: `evitarModelos` permite ao loop de autocorreção excluir o
  // modelo que já falhou 2x seguidas na mesma tarefa (estratégia
  // "trocar_modelo", em vez de tentar de novo com o mesmo candidato);
  // `agente` alimenta a chave de aprendizado do router (FASE 7).
  const resp = await chamarLLM(prompt, { tipoTarefa: 'codigo', complexidade: opcoes.complexidade || 2, maxTokens: 4096, evitarModelos: opcoes.evitarModelos || [], agente: opcoes.agente || null });
  if (!resp.ok) {
    return { ok: false, arquivos: [], comandoTeste: null, comandoTesteArgs: [], explicacao: '', modeloId: null, error: resp.error, categoriaFalha: resp.categoriaFalha };
  }
  const json = extrairJSON(resp.texto);
  if (!json || !Array.isArray(json.arquivos) || json.arquivos.length === 0) {
    return { ok: false, arquivos: [], comandoTeste: null, comandoTesteArgs: [], explicacao: '', modeloId: resp.modeloId, error: `LLM não devolveu arquivos válidos. Resposta: ${resp.texto.slice(0, 300)}` };
  }
  return {
    ok: true,
    arquivos: json.arquivos.filter((a) => a && a.caminho && typeof a.conteudo === 'string'),
    comandoTeste: json.comandoTeste || null,
    comandoTesteArgs: Array.isArray(json.comandoTesteArgs) ? json.comandoTesteArgs : [],
    tipoExecucao: json.tipoExecucao === 'servidor' ? 'servidor' : 'unica',
    porta: typeof json.porta === 'number' ? json.porta : null,
    rotaTeste: json.rotaTeste || '/',
    explicacao: json.explicacao || '',
    modeloId: resp.modeloId,
  };
}

module.exports = { gerarCodigo, montarPrompt };
