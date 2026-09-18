/**
 * FERRAMENTAS — camada unificada de execução real (FASE 3, seção 5 do pedido).
 *
 * Read/Write/Edit/Bash aqui são operações REAIS (fs/child_process), sempre
 * restritas ao workspace da missão (workspace.js) e protegidas por lock
 * (locks.js) nas operações de escrita. Navegador/MCP ficam como stub
 * honesto (não implementado nesta fase — gap documentado, não fingido).
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { execFile, spawn } = require('child_process');
const { resolverCaminhoSeguro, garantirWorkspace } = require('./workspace');
const locks = require('./locks');

const TIMEOUT_COMANDO_MS = 30000;

function lerArquivo(missaoId, caminhoRelativo) {
  const alvo = resolverCaminhoSeguro(missaoId, caminhoRelativo);
  if (!fs.existsSync(alvo)) return { ok: false, erro: `arquivo não existe: ${caminhoRelativo}` };
  try {
    return { ok: true, conteudo: fs.readFileSync(alvo, 'utf8') };
  } catch (e) {
    return { ok: false, erro: e.message };
  }
}

function escreverArquivo(missaoId, tarefaId, caminhoRelativo, conteudo) {
  const alvo = resolverCaminhoSeguro(missaoId, caminhoRelativo);
  if (!locks.adquirir(caminhoRelativo, tarefaId)) {
    return { ok: false, erro: `conflito: "${caminhoRelativo}" está travado por outra tarefa em execução (${locks.quemSegura(caminhoRelativo)})` };
  }
  try {
    fs.mkdirSync(path.dirname(alvo), { recursive: true });
    fs.writeFileSync(alvo, conteudo, 'utf8');
    return { ok: true, caminho: caminhoRelativo, bytes: Buffer.byteLength(conteudo, 'utf8') };
  } catch (e) {
    return { ok: false, erro: e.message };
  } finally {
    locks.liberar(caminhoRelativo, tarefaId);
  }
}

function editarArquivo(missaoId, tarefaId, caminhoRelativo, buscar, substituir) {
  const alvo = resolverCaminhoSeguro(missaoId, caminhoRelativo);
  if (!fs.existsSync(alvo)) return { ok: false, erro: `arquivo não existe: ${caminhoRelativo}` };
  if (!locks.adquirir(caminhoRelativo, tarefaId)) {
    return { ok: false, erro: `conflito: "${caminhoRelativo}" está travado por outra tarefa em execução (${locks.quemSegura(caminhoRelativo)})` };
  }
  try {
    const atual = fs.readFileSync(alvo, 'utf8');
    if (!atual.includes(buscar)) return { ok: false, erro: `texto de busca não encontrado em ${caminhoRelativo}` };
    const ocorrencias = atual.split(buscar).length - 1;
    if (ocorrencias > 1) return { ok: false, erro: `texto de busca não é único em ${caminhoRelativo} (${ocorrencias} ocorrências) — edição recusada por segurança` };
    fs.writeFileSync(alvo, atual.replace(buscar, substituir), 'utf8');
    return { ok: true, caminho: caminhoRelativo };
  } catch (e) {
    return { ok: false, erro: e.message };
  } finally {
    locks.liberar(caminhoRelativo, tarefaId);
  }
}

/**
 * Executa um comando REAL (node, npm, python, etc.) dentro do workspace da
 * missão. Nunca via shell string interpolada (usa `execFile` com array de
 * args) — evita injeção e o problema de quoting aninhado do Windows/MSYS
 * já documentado nas armadilhas desta conta.
 */
function executarComando(missaoId, comando, args = [], opcoes = {}) {
  const cwd = garantirWorkspace(missaoId);
  return new Promise((resolve) => {
    const proc = execFile(comando, args, { cwd, timeout: opcoes.timeoutMs || TIMEOUT_COMANDO_MS, maxBuffer: 5 * 1024 * 1024 }, (erro, stdout, stderr) => {
      resolve({
        ok: !erro,
        codigoSaida: erro ? (erro.code ?? 1) : 0,
        stdout: String(stdout || '').slice(0, 8000),
        stderr: String(stderr || '').slice(0, 4000),
        timeout: !!(erro && erro.killed),
        erro: erro ? erro.message : null,
      });
    });
    if (opcoes.stdin) { proc.stdin.write(opcoes.stdin); proc.stdin.end(); }
  });
}

/**
 * Testa um processo de SERVIDOR (que nunca termina sozinho por natureza):
 * inicia via spawn (não execFile, que esperaria o fim do processo pra
 * sempre), aguarda um tempo pro processo subir, faz uma requisição HTTP
 * REAL contra a porta declarada, e SÓ ENTÃO encerra o processo.
 *
 * BUG REAL corrigido aqui (2026-09-15, teste da FASE 3): antes disso, um
 * servidor HTTP gerado corretamente (comprovadamente funcional — respondia
 * a requisições reais) era classificado como "falha" porque `execFile`
 * esperava o processo terminar sozinho, nunca terminava (é um servidor),
 * batia no timeout, e isso virava erro — mesmo o servidor tendo subido e
 * funcionado perfeitamente. A missão real obrigatória desta fase (seção 19)
 * expôs esse bug ao vivo.
 */
function testarServidor(missaoId, comando, args, { porta, rotaTeste = '/', tempoSubidaMs = 1200, timeoutReqMs = 3000 } = {}) {
  const cwd = garantirWorkspace(missaoId);
  return new Promise((resolve) => {
    if (!porta) { resolve({ ok: false, erro: 'tipoExecucao="servidor" mas nenhuma "porta" foi declarada pelo gerador — não dá pra testar sem saber a porta' }); return; }
    const proc = spawn(comando, args, { cwd });
    let stdoutAcumulado = '';
    let stderrAcumulado = '';
    let processoMorreuCedo = false;
    let jaResolveu = false;
    // BUG REAL corrigido aqui (2026-09-15, achado na regressão da FASE 7+8):
    // `spawn()` sem listener de 'error' faz o Node lançar uma exceção NÃO
    // TRATADA (derruba o processo inteiro) quando o comando não existe de
    // verdade (ENOENT) — ex: o gerador de código às vezes devolve
    // comandoTeste/comandoTesteArgs mal separados (variância real do LLM).
    // Isso é exatamente um "erro_ambiente" (FASE 8) e deve virar um
    // resultado normal de falha, nunca crashar a missão inteira (ou, como
    // aconteceu aqui, a suíte de regressão inteira).
    proc.on('error', (e) => {
      if (jaResolveu) return;
      jaResolveu = true;
      resolve({ ok: false, erro: `falha ao iniciar o processo do servidor (${e.code || 'erro'}): ${e.message}`, stdout: stdoutAcumulado.slice(0, 500), stderr: stderrAcumulado.slice(0, 500) });
    });
    proc.stdout.on('data', (d) => { stdoutAcumulado += d; });
    proc.stderr.on('data', (d) => { stderrAcumulado += d; });
    proc.on('exit', (code) => {
      if (!requisicaoFeita) processoMorreuCedo = true;
      void code;
    });
    let requisicaoFeita = false;

    setTimeout(() => {
      if (jaResolveu) return; // spawn já falhou (evento 'error' acima) — nada a testar

      const req = http.get({ hostname: 'localhost', port: porta, path: rotaTeste, timeout: timeoutReqMs }, (res) => {
        let corpo = '';
        res.on('data', (c) => { corpo += c; });
        res.on('end', () => {
          requisicaoFeita = true;
          try { proc.kill(); } catch { /* já pode ter morrido */ }
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, codigoHttp: res.statusCode, corpo: corpo.slice(0, 300), stdout: stdoutAcumulado.slice(0, 500), stderr: stderrAcumulado.slice(0, 500) });
        });
      });
      req.on('error', (e) => {
        try { proc.kill(); } catch { /* já pode ter morrido */ }
        resolve({ ok: false, erro: `servidor não respondeu na porta ${porta}: ${e.message}${processoMorreuCedo ? ' (processo morreu antes da requisição — provável erro de inicialização)' : ''}`, stdout: stdoutAcumulado.slice(0, 500), stderr: stderrAcumulado.slice(0, 500) });
      });
      req.on('timeout', () => { req.destroy(); });
    }, tempoSubidaMs);
  });
}

/** Stub honesto — não implementado nesta fase (gap real, não fingido). */
function navegador() {
  return { ok: false, erro: 'ferramenta de navegador não implementada nesta fase (gap conhecido, ver relatório) — use executarComando com um servidor local + curl como alternativa de validação' };
}
function mcp() {
  return { ok: false, erro: 'chamada a MCP externo não implementada nesta fase (gap conhecido) — o Executor roda como processo Node autônomo, fora da sessão do Claude Code' };
}

module.exports = { lerArquivo, escreverArquivo, editarArquivo, executarComando, testarServidor, navegador, mcp };
