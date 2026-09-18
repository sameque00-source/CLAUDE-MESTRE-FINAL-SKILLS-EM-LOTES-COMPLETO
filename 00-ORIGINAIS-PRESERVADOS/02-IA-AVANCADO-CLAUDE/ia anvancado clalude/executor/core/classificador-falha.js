/**
 * CLASSIFICADOR DE FALHA DE EXECUÇÃO — FASE 3, seção 10 do pedido.
 *
 * Estende (não substitui) `gateway/scoring.js:classificarErro`, que já
 * cobre erros de PROVIDER (quota/rate_limit/auth/payload/indisponivel/
 * timeout/vazio). Aqui adicionamos as categorias que só fazem sentido no
 * nível de EXECUÇÃO de tarefa (código, ambiente, teste, ferramenta,
 * dependência) — reusando o classificador de provider como último recurso
 * quando nenhum padrão de execução bate.
 */
const scoring = require('C:/Users/Administrator/Documents/AI-ORCHESTRATOR/gateway/scoring.js');

const TIPOS = Object.freeze({
  CODIGO: 'erro_codigo',       // SyntaxError, ReferenceError, stack trace de JS/Python
  AMBIENTE: 'erro_ambiente',    // ENOENT, comando não encontrado, permissão
  TESTE: 'erro_teste',          // asserção falhou, saída inesperada
  FERRAMENTA: 'erro_ferramenta',// conflito de lock, caminho fora do workspace
  DEPENDENCIA: 'erro_dependencia', // módulo/pacote ausente
  TIMEOUT: 'timeout',
  PROVIDER: 'erro_provider',    // delega pro classificador do scoring (quota/auth/etc)
  VETO: 'veto_qualidade',       // FASE 4: QA/Security/Reviewer reprovou o resultado
  DESCONHECIDO: 'desconhecido',
});

function classificarFalhaExecucao(mensagem = '', { stderr = '', codigoSaida = null } = {}) {
  const m = String(mensagem || '') + ' ' + String(stderr || '');

  if (/^veto:/i.test(String(mensagem || ''))) return TIPOS.VETO;
  if (/timeout|timed out/i.test(m)) return TIPOS.TIMEOUT;
  if (/SyntaxError|ReferenceError|TypeError|IndentationError|Unexpected token/i.test(m)) return TIPOS.CODIGO;
  if (/ENOENT|not recognized as an internal|command not found|EACCES|permission denied/i.test(m)) return TIPOS.AMBIENTE;
  if (/Cannot find module|ModuleNotFoundError|No module named|npm ERR!.*missing/i.test(m)) return TIPOS.DEPENDENCIA;
  if (/assert|expected .* but got|teste falhou|test failed/i.test(m)) return TIPOS.TESTE;
  if (/conflito:.*travado|fora do workspace/i.test(m)) return TIPOS.FERRAMENTA;
  if (/HTTP 4\d\d|HTTP 5\d\d|quota|rate.?limit|API key/i.test(m)) return TIPOS.PROVIDER;
  if (codigoSaida !== null && codigoSaida !== 0) return TIPOS.CODIGO; // saída != 0 sem padrão claro: assume bug de código

  // fallback: usa a classificação de provider já existente (não duplica lógica)
  const tipoProvider = scoring.classificarErro(m);
  return tipoProvider === 'desconhecido' ? TIPOS.DESCONHECIDO : TIPOS.PROVIDER;
}

/** Decide a estratégia de recuperação por tipo — nunca "repetir cegamente". */
function estrategiaParaTipo(tipo) {
  switch (tipo) {
    case TIPOS.CODIGO: return 'corrigir'; // regenerar com o erro no prompt
    case TIPOS.TESTE: return 'corrigir';
    case TIPOS.DEPENDENCIA: return 'corrigir'; // tentar sem a dependência ausente, ou substituir
    case TIPOS.AMBIENTE: return 'bloquear'; // ambiente não é algo que o Executor pode consertar sozinho
    case TIPOS.FERRAMENTA: return 'retry'; // lock pode liberar na próxima leva
    case TIPOS.TIMEOUT: return 'retry';
    case TIPOS.PROVIDER: return 'fallback'; // troca de modelo/provider via scoring
    case TIPOS.VETO: return 'corrigir'; // reabre a tarefa que produziu o resultado reprovado
    default: return 'retry';
  }
}

module.exports = { TIPOS, classificarFalhaExecucao, estrategiaParaTipo };
