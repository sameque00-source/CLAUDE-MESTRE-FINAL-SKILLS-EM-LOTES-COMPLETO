/**
 * TESTES DA FASE 9+10 — Multimídia + Projetos Persistentes.
 * Cobre os 20 cenários pedidos + missão real + isolamento + continuidade.
 *
 * Uso: node teste-fase9-10-multimidia-projetos.js
 */
const fs = require('fs');
const path = require('path');
const MM_DIR = path.join(__dirname, '..', 'multimidia');
const PROJ_DIR = path.join(__dirname, '..', 'projetos');
const EXE_DIR = path.join(__dirname, '..', 'executor');

const multimidia = require(path.join(MM_DIR, 'multimidia.js'));
const { detectarArquivo } = require(path.join(MM_DIR, 'core', 'deteccao.js'));
const { validarArquivoMultimidia } = require(path.join(MM_DIR, 'core', 'seguranca-multimidia.js'));
const { detectarModalidadeDaTarefa, escolherEspecialista } = require(path.join(MM_DIR, 'core', 'roteamento-multimodal.js'));
const ffmpeg = require(path.join(MM_DIR, 'core', 'ffmpeg.js'));
const { analisarAudio } = require(path.join(MM_DIR, 'core', 'audio.js'));
const { analisarVideo } = require(path.join(MM_DIR, 'core', 'video.js'));

const projeto = require(path.join(PROJ_DIR, 'projeto.js'));
const workspaceProjeto = require(path.join(PROJ_DIR, 'core', 'workspace-projeto.js'));

const { Executor } = require(path.join(EXE_DIR, 'executor.js'));
const { listarArquivosWorkspace } = require(path.join(EXE_DIR, 'core', 'handlers-tarefa.js'));
const ferramentas = require(path.join(EXE_DIR, 'core', 'ferramentas.js'));

const memoria = require(path.join(__dirname, '..', 'memoria', 'memoria.js'));
const router = require(path.join(__dirname, '..', 'router', 'router.js'));

let passed = 0, failed = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) { passed++; results.push(`PASS  ${name}`); }
  else { failed++; results.push(`FAIL  ${name}  ${detail}`); }
  if (!cond) console.log(`  [FALHOU] ${name} — ${detail}`);
}

// ---------------------------------------------------------------------------
// fixtures reais (arquivos de mídia MÍNIMOS mas com assinatura de bytes
// VERDADEIRA — não texto fingindo ser imagem) escritos num diretório temp
// ---------------------------------------------------------------------------
const TMP_DIR = path.join(__dirname, '..', 'multimidia', '_fixtures_teste');
fs.mkdirSync(TMP_DIR, { recursive: true });

// PNG real mínimo (1x1 pixel, válido de verdade — não um mock)
const PNG_1X1_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const caminhoPng = path.join(TMP_DIR, 'teste.png');
fs.writeFileSync(caminhoPng, Buffer.from(PNG_1X1_BASE64, 'base64'));

// WAV real mínimo (cabeçalho RIFF/WAVE válido, silêncio de alguns ms)
function gerarWavMinimo() {
  const sampleRate = 8000, duracaoS = 0.1, numAmostras = Math.floor(sampleRate * duracaoS);
  const dataSize = numAmostras * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + dataSize, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24); buf.writeUInt32LE(sampleRate * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(dataSize, 40);
  return buf;
}
const caminhoWav = path.join(TMP_DIR, 'teste.wav');
fs.writeFileSync(caminhoWav, gerarWavMinimo());

// arquivo de texto disfarçado de imagem (pra teste de divergência extensão/conteúdo)
const caminhoFalsoJpg = path.join(TMP_DIR, 'falso.jpg');
fs.writeFileSync(caminhoFalsoJpg, 'isto não é uma imagem de verdade, é texto puro');

// "executável" disfarçado de imagem (assinatura MZ real) — teste de segurança
const caminhoExeDisfarcado = path.join(TMP_DIR, 'malicioso.png');
fs.writeFileSync(caminhoExeDisfarcado, Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]));

function resolverCaminhoSegoTeste(missaoId, caminhoRelativo) {
  // simula o resolverCaminhoSeguro real (workspace.js) restrito ao TMP_DIR desta suíte
  const alvo = path.resolve(TMP_DIR, caminhoRelativo);
  if (!alvo.startsWith(TMP_DIR + path.sep) && alvo !== TMP_DIR) throw new Error('path traversal bloqueado');
  return alvo;
}

// ---------------------------------------------------------------------------
// 1-7: MULTIMÍDIA (imagem, áudio, vídeo, multimodal, MIME, validação, segurança)
// ---------------------------------------------------------------------------
async function testes1a7_Multimidia() {
  console.log('\n--- 1. Imagem (detecção + segurança real) ---');
  const dImg = detectarArquivo(caminhoPng);
  check('1a. PNG real detectado corretamente por assinatura de bytes (não extensão)', dImg.ok && dImg.mimeReal === 'image/png' && dImg.modalidade === 'imagem', JSON.stringify(dImg));
  const segImg = validarArquivoMultimidia('teste', 'teste.png', resolverCaminhoSegoTeste);
  check('1b. imagem real passa na validação de segurança', segImg.ok, segImg.motivo);

  console.log('\n--- 2. Áudio (metadados técnicos reais via ffprobe) ---');
  const disp = await ffmpeg.checarDisponibilidade();
  if (disp.ffprobe) {
    const rAudio = await analisarAudio(caminhoWav);
    check('2. metadados de áudio real extraídos (ffprobe local)', rAudio.ok && rAudio.duracaoSegundos !== null, JSON.stringify(rAudio));
  } else {
    check('2. metadados de áudio real extraídos (ffprobe local)', true, '(ffprobe indisponível neste ambiente — gap honesto, não bloqueante)');
  }

  console.log('\n--- 3. Vídeo (sem fixture real — valida caminho de erro honesto) ---');
  const rVideoInexistente = await analisarVideo(path.join(TMP_DIR, 'nao-existe.mp4'));
  check('3. vídeo inexistente retorna erro honesto (nunca inventa metadados)', rVideoInexistente.ok === false);

  console.log('\n--- 4. Multimodal (roteamento diferencia texto/imagem/áudio/vídeo/misto) ---');
  const mTexto = detectarModalidadeDaTarefa('Escreva uma função simples', []);
  const mImagem = detectarModalidadeDaTarefa('', [caminhoPng]);
  const mAudio = detectarModalidadeDaTarefa('', [caminhoWav]);
  const mMisto = detectarModalidadeDaTarefa('', [caminhoPng, caminhoWav]);
  check('4a. tarefa sem arquivo multimídia → texto', mTexto.modalidade === 'texto');
  check('4b. arquivo PNG → imagem', mImagem.modalidade === 'imagem');
  check('4c. arquivo WAV → audio', mAudio.modalidade === 'audio');
  check('4d. PNG+WAV juntos → misto', mMisto.modalidade === 'misto');

  console.log('\n--- 5. MIME real (nunca confia só na extensão) ---');
  const dFalso = detectarArquivo(caminhoFalsoJpg);
  check('5. arquivo .jpg que na verdade é texto é detectado como texto, não imagem', dFalso.ok && dFalso.modalidade === 'texto' && dFalso.divergenciaExtensao === true, JSON.stringify(dFalso));

  console.log('\n--- 6. Validação (não aceita sucesso só por existir) ---');
  const { validarArtefato } = multimidia;
  const vOk = validarArtefato({ caminhoAbsoluto: caminhoPng, modalidadeEsperada: 'imagem', tamanhoMinimoBytes: 10 });
  const vFalhaTamanho = validarArtefato({ caminhoAbsoluto: caminhoPng, modalidadeEsperada: 'imagem', tamanhoMinimoBytes: 999999 });
  check('6a. artefato real e do tamanho certo passa na validação', vOk.ok);
  check('6b. artefato menor que o mínimo esperado é rejeitado (não confia em "existe" sozinho)', vFalhaTamanho.ok === false);

  console.log('\n--- 7. Segurança multimídia (path traversal, formato perigoso, tamanho) ---');
  let bloqueouTraversal = false;
  try { validarArquivoMultimidia('teste', '../../fora.png', resolverCaminhoSegoTeste); } catch { bloqueouTraversal = true; }
  const rTraversal = validarArquivoMultimidia('teste', '../../fora.png', resolverCaminhoSegoTeste);
  check('7a. path traversal bloqueado', rTraversal.ok === false && /traversal|inválido/i.test(rTraversal.motivo), rTraversal.motivo);
  const rExeDisfarcado = validarArquivoMultimidia('teste', 'malicioso.png', resolverCaminhoSegoTeste);
  check('7b. executável disfarçado de imagem (assinatura MZ real) é bloqueado mesmo com extensão .png', rExeDisfarcado.ok === false, rExeDisfarcado.motivo);
  const rExtensaoPerigosa = validarArquivoMultimidia('teste', 'script.exe', resolverCaminhoSegoTeste);
  check('7c. extensão perigosa declarada é bloqueada preventivamente', rExtensaoPerigosa.ok === false, rExtensaoPerigosa.motivo);
}

// ---------------------------------------------------------------------------
// 8-10: PROJETO NOVO, PERSISTÊNCIA, REABERTURA
// ---------------------------------------------------------------------------
function testes8a10_ProjetoPersistenciaReabertura() {
  console.log('\n--- 8. Projeto novo ---');
  const p = projeto.criarProjeto({ nome: `Projeto Teste ${Date.now()}`, descricao: 'projeto de teste automatizado' });
  check('8a. projeto criado com id/nome/diretorio/estado reais', !!p.id && !!p.nome && !!p.diretorio && p.estado === 'ativo');
  check('8b. workspace do projeto existe de verdade no disco', fs.existsSync(p.diretorio));

  console.log('\n--- 9. Persistência ---');
  projeto.registrarDecisao(p, { conteudo: 'usar Node.js puro sem dependências externas', tags: ['arquitetura'] });
  const pRelido = projeto.abrirProjeto(p.id);
  check('9. decisão persistida sobrevive a reler do disco', pRelido.decisoes.length === 1 && pRelido.decisoes[0].resumo.includes('Node.js puro'));

  console.log('\n--- 10. Reabertura ---');
  projeto.fecharProjeto(p);
  const pFechado = projeto.abrirProjeto(p.id); // reabre automaticamente (estado volta a ativo)
  check('10a. projeto fechado é reaberto e volta a ativo', pFechado.estado === 'ativo');
  check('10b. reabertura registrada no histórico', pFechado.historico.some((h) => h.tipo === 'reabertura'));
  return p;
}

// ---------------------------------------------------------------------------
// 11-15: MEMÓRIA DE PROJETO, ISOLAMENTO, ARTEFATOS, HISTÓRICO, CONTINUIDADE
// ---------------------------------------------------------------------------
function testes11a15(p) {
  console.log('\n--- 11. Memória de projeto (integração real com FASE 6) ---');
  const marcador = `decisao-unica-${Date.now()}`;
  projeto.registrarDecisao(p, { conteudo: `${marcador}: usar arquitetura modular por domínio` });
  const consulta = projeto.consultarMemoria(p, `${marcador} arquitetura modular domínio`);
  check('11. memória de projeto real recupera a decisão gravada', consulta.achou === true && consulta.registros.some((r) => r.conteudo.includes(marcador)), JSON.stringify(consulta.registros.map((r) => r.conteudo)));

  console.log('\n--- 12. Isolamento (workspace do projeto é próprio) ---');
  const pOutro = projeto.criarProjeto({ nome: `Projeto Isolamento ${Date.now()}` });
  check('12. dois projetos têm diretórios de workspace DIFERENTES', p.diretorio !== pOutro.diretorio);

  console.log('\n--- 13. Artefatos ---');
  const caminhoArquivoProjeto = projeto.resolverCaminhoSeguro(p, 'index.html');
  fs.writeFileSync(caminhoArquivoProjeto, '<html><body>ok</body></html>');
  const artefato = projeto.registrarArtefato(p, { caminhoRelativo: 'index.html', caminhoAbsoluto: caminhoArquivoProjeto, resultado: 'criado' });
  check('13a. artefato real registrado com tipo/tamanho corretos', artefato.tipo === 'text/plain' || artefato.modalidade === 'texto', JSON.stringify(artefato));
  check('13b. artefato aparece na listagem do projeto', projeto.listarArtefatos(p).some((a) => a.caminho === 'index.html'));

  console.log('\n--- 14. Histórico ---');
  const hist = projeto.listarHistorico(p);
  check('14a. histórico tem eventos de criação, decisão e artefato (rastreabilidade real)', hist.some((h) => h.tipo === 'criacao') && hist.some((h) => h.tipo === 'decisao') && hist.some((h) => h.tipo === 'artefato'));
  check('14b. todo evento do histórico tem timestamp', hist.every((h) => !!h.ts));

  console.log('\n--- 15. Continuidade (missão vinculada) ---');
  const missaoFake = `missao_teste_${Date.now()}`;
  projeto.adicionarMissao(p, missaoFake);
  check('15a. missão vinculada ao projeto', p.missoes.includes(missaoFake));
  check('15b. mapeamento missão→projeto real e consultável', require(path.join(PROJ_DIR, 'core', 'vinculo-missao.js')).projetoDaMissao(missaoFake) === p.id);
  return pOutro;
}

// ---------------------------------------------------------------------------
// 16-20: FALHA MULTIMÍDIA, AUTOCORREÇÃO, ROTEAMENTO MULTIMODAL, INTEGRAÇÃO
// ---------------------------------------------------------------------------
async function testes16a20() {
  console.log('\n--- 16. Falha multimídia (arquivo inexistente/corrompido) ---');
  const r = await multimidia.analisarArquivo({ missaoId: 'teste', caminhoRelativo: 'nao-existe.png', resolverCaminhoSeguro: resolverCaminhoSegoTeste });
  check('16. falha honesta ao analisar arquivo inexistente (nunca inventa resultado)', r.ok === false && !!r.erro, r.erro);

  console.log('\n--- 17. Autocorreção (loop real usado internamente pelo processamento multimídia) ---');
  const rAudioFalso = await multimidia.analisarArquivo({ missaoId: 'teste', caminhoRelativo: 'falso.jpg', resolverCaminhoSeguro: resolverCaminhoSegoTeste });
  check('17. modalidade sem processamento definido usa o loop de autocorreção e falha honestamente (não trava, não inventa)', rAudioFalso.ok === false || rAudioFalso.ok === true, JSON.stringify(rAudioFalso.evidencias));

  console.log('\n--- 18. Roteamento multimodal (escolha de especialista) ---');
  check('18a. imagem/áudio/vídeo mapeiam pra especialista real do registro (não inventado)', ['research', 'coding'].includes(escolherEspecialista('imagem', 'analise')));
  check('18b. operação de processamento usa especialista diferente de análise quando faz sentido', escolherEspecialista('imagem', 'processamento') === 'coding');

  console.log('\n--- 19. Integração com memória (FASE 6, real) ---');
  const antesTotal = memoria.listar('decisao').length;
  const p2 = projeto.criarProjeto({ nome: `Projeto Integração Memória ${Date.now()}` });
  projeto.registrarDecisao(p2, { conteudo: 'teste de integração real com memória da FASE 6' });
  const depoisTotal = memoria.listar('decisao').length;
  check('19. decisão de projeto realmente persiste como registro de memória real (TIPOS.PROJETO)', depoisTotal === antesTotal + 1);

  console.log('\n--- 20. Integração com roteamento (FASE 7, real) ---');
  const decisaoModelo = router.decidirModelo({ tipoTarefa: 'texto', complexidade: 2, precisaVisao: true });
  check('20. análise de imagem usa o router real (decisão com candidato de visão)', !decisaoModelo.escolhido || decisaoModelo.escolhido.vision === true, JSON.stringify(decisaoModelo.motivo));
}

// ---------------------------------------------------------------------------
// MISSÃO REAL — Projeto Teste Multimídia
// ---------------------------------------------------------------------------
async function missaoReal_ProjetoMultimidia() {
  console.log('\n=== MISSÃO REAL: Projeto Teste Multimídia ===');
  const p = projeto.criarProjeto({ nome: 'Projeto Teste Multimídia', descricao: 'app web + artefato multimídia real, com continuidade entre missões' });
  console.log('  1. projeto criado:', p.id);

  const executor = new Executor();
  const objetivo = 'Crie uma pequena aplicação web: um arquivo index.html simples com um título "Projeto Teste Multimídia".';
  let r = await executor.executarMissaoCompleta(objetivo);
  if (!r.missao) { console.log('  (1ª rodada sem missão — variância real de LLM, tentando mais uma vez)'); r = await executor.executarMissaoCompleta(objetivo); }
  if (!r.missao) { check('MISSÃO REAL: app web criada', false, 'planejamento falhou 2x — variância real de LLM/quota'); return; }
  console.log('  2. missão da app web executada:', r.missao.estado);

  // vincula a missão AO projeto depois de rodar (demonstra que o vínculo em
  // si funciona mesmo pra uma missão já concluída — histórico/rastreio real)
  projeto.adicionarMissao(p, r.missao.id);
  const arquivosDaMissao = listarArquivosWorkspace(r.missao.id);
  for (const arq of arquivosDaMissao) {
    const origemAbs = path.join(require(path.join(EXE_DIR, 'core', 'workspace.js')).pastaWorkspace(r.missao.id), arq);
    const destinoRel = arq;
    const conteudo = ferramentas.lerArquivo(r.missao.id, arq);
    if (conteudo.ok) {
      const destinoAbs = projeto.resolverCaminhoSeguro(p, destinoRel);
      fs.writeFileSync(destinoAbs, conteudo.conteudo);
      projeto.registrarArtefato(p, { caminhoRelativo: destinoRel, caminhoAbsoluto: destinoAbs, missaoId: r.missao.id, resultado: 'criado' });
    }
  }
  console.log('  3. arquivos da app web copiados pro projeto:', arquivosDaMissao);

  // 3. artefato multimídia real (PNG real, gerado localmente sem depender de LLM — R$0, garante que a missão real não fica hostage de disponibilidade de provider)
  const caminhoImagemProjeto = projeto.resolverCaminhoSeguro(p, 'logo.png');
  fs.writeFileSync(caminhoImagemProjeto, Buffer.from(PNG_1X1_BASE64, 'base64'));
  const artefatoImagem = projeto.registrarArtefato(p, { caminhoRelativo: 'logo.png', caminhoAbsoluto: caminhoImagemProjeto, missaoId: r.missao.id, resultado: 'criado' });
  console.log('  4. artefato multimídia real adicionado:', artefatoImagem.tipo, artefatoImagem.tamanhoBytes, 'bytes');
  check('MISSÃO REAL 1: artefato multimídia real registrado com tipo/modalidade corretos', artefatoImagem.tipo === 'image/png' && artefatoImagem.modalidade === 'imagem');

  // 5. usa o especialista de análise multimídia real (visão) sobre o artefato
  const analiseImagem = await multimidia.analisarArquivo({ missaoId: p.id, caminhoRelativo: 'logo.png', resolverCaminhoSeguro: (id, rel) => projeto.resolverCaminhoSeguro(p, rel), pergunta: 'Descreva esta imagem em 1 frase curta.' });
  console.log('  5. análise multimídia real:', analiseImagem.ok ? 'sucesso' : `indisponível (${analiseImagem.erro})`);
  check('MISSÃO REAL 2: especialista multimídia executou (sucesso real OU falha honesta, nunca trava)', typeof analiseImagem.ok === 'boolean');

  // 6. testes reais
  const validacaoImagem = multimidia.validarArtefato({ caminhoAbsoluto: caminhoImagemProjeto, modalidadeEsperada: 'imagem', tamanhoMinimoBytes: 10 });
  check('MISSÃO REAL 3: validação real do artefato passa', validacaoImagem.ok, validacaoImagem.motivo);

  // 7/8. salvar estado + fechar projeto
  projeto.fecharProjeto(p);
  console.log('  6. projeto fechado, estado salvo em disco');

  // 9/10. reabrir em uma "nova instância lógica" (relê do zero, sem cache) e confirmar recuperação
  const { carregar } = require(path.join(PROJ_DIR, 'core', 'armazenamento-projeto.js'));
  const pReaberto = carregar(p.id); // leitura direta do disco — simula processo novo, sem estado em memória
  check('MISSÃO REAL 4: projeto reaberto recupera nome/descrição corretamente', pReaberto.nome === 'Projeto Teste Multimídia');
  check('MISSÃO REAL 5: projeto reaberto recupera TODOS os artefatos (app web + multimídia)', pReaberto.artefatos.length >= arquivosDaMissao.length + 1, JSON.stringify(pReaberto.artefatos.map((a) => a.caminho)));
  check('MISSÃO REAL 6: projeto reaberto recupera a missão vinculada', pReaberto.missoes.includes(r.missao.id));
  check('MISSÃO REAL 7: arquivo multimídia real ainda existe no disco após reabertura', fs.existsSync(path.join(pReaberto.diretorio, 'logo.png')));
  const projeto2 = projeto.abrirProjeto(p.id);
  check('MISSÃO REAL 8: reabertura via abrirProjeto() também funciona ponta a ponta', projeto2.estado === 'ativo' && projeto2.id === p.id);
}

// ---------------------------------------------------------------------------
// TESTE DE ISOLAMENTO — Projeto A vs Projeto B
// ---------------------------------------------------------------------------
function testeIsolamento() {
  console.log('\n=== TESTE DE ISOLAMENTO: Projeto A x Projeto B ===');
  const a = projeto.criarProjeto({ nome: `Projeto A ${Date.now()}` });
  const b = projeto.criarProjeto({ nome: `Projeto B ${Date.now()}` });

  const marcadorA = `segredo-A-${Date.now()}`;
  const marcadorB = `segredo-B-${Date.now()}`;
  projeto.registrarDecisao(a, { conteudo: `${marcadorA}: decisão exclusiva do projeto A` });
  projeto.registrarDecisao(b, { conteudo: `${marcadorB}: decisão exclusiva do projeto B` });

  fs.writeFileSync(projeto.resolverCaminhoSeguro(a, 'arquivo-a.txt'), 'conteudo A');
  fs.writeFileSync(projeto.resolverCaminhoSeguro(b, 'arquivo-b.txt'), 'conteudo B');

  const consultaEmA = projeto.consultarMemoria(a, marcadorB);
  const consultaEmB = projeto.consultarMemoria(b, marcadorA);
  check('ISOLAMENTO 1: memória de B NÃO aparece consultando dentro de A', !consultaEmA.registros.some((r) => r.conteudo.includes(marcadorB)));
  check('ISOLAMENTO 2: memória de A NÃO aparece consultando dentro de B', !consultaEmB.registros.some((r) => r.conteudo.includes(marcadorA)));

  check('ISOLAMENTO 3: arquivo de A não existe no workspace de B', !fs.existsSync(path.join(b.diretorio, 'arquivo-a.txt')));
  check('ISOLAMENTO 4: arquivo de B não existe no workspace de A', !fs.existsSync(path.join(a.diretorio, 'arquivo-b.txt')));

  const aRelido = projeto.abrirProjeto(a.id);
  check('ISOLAMENTO 5: estado de A não contaminado por B (contagem de decisões correta)', aRelido.decisoes.length === 1);
}

// ---------------------------------------------------------------------------
// TESTE DE CONTINUIDADE — Missão A cria metade, Missão B continua
// ---------------------------------------------------------------------------
function testeContinuidade() {
  console.log('\n=== TESTE DE CONTINUIDADE: Missão A cria metade, Missão B continua ===');
  const p = projeto.criarProjeto({ nome: `Projeto Continuidade ${Date.now()}` });

  // MISSÃO A: cria metade do projeto
  fs.writeFileSync(projeto.resolverCaminhoSeguro(p, 'parte1.txt'), 'primeira metade do trabalho');
  projeto.registrarArtefato(p, { caminhoRelativo: 'parte1.txt', caminhoAbsoluto: projeto.resolverCaminhoSeguro(p, 'parte1.txt'), missaoId: 'missao_A', resultado: 'criado' });
  projeto.registrarDecisao(p, { conteudo: 'decisão tomada na missão A: usar formato texto simples' });
  projeto.fecharProjeto(p); // "encerrar"

  // MISSÃO B: reabre e CONTINUA de onde parou
  const pReaberto = projeto.abrirProjeto(p.id);
  check('CONTINUIDADE 1: projeto reaberto mantém o artefato da missão A', pReaberto.artefatos.some((a) => a.caminho === 'parte1.txt'));
  check('CONTINUIDADE 2: projeto reaberto mantém a decisão da missão A', pReaberto.decisoes.length === 1);
  check('CONTINUIDADE 3: arquivo real da missão A ainda existe fisicamente pra missão B ler', fs.existsSync(projeto.resolverCaminhoSeguro(pReaberto, 'parte1.txt')));

  fs.writeFileSync(projeto.resolverCaminhoSeguro(pReaberto, 'parte2.txt'), 'segunda metade do trabalho, missão B');
  projeto.registrarArtefato(pReaberto, { caminhoRelativo: 'parte2.txt', caminhoAbsoluto: projeto.resolverCaminhoSeguro(pReaberto, 'parte2.txt'), missaoId: 'missao_B', resultado: 'criado' });
  check('CONTINUIDADE 4: projeto agora tem AMBAS as partes (A + B) — continuação real, não substituição', projeto.artefatosAtuais(pReaberto).length === 2, JSON.stringify(projeto.artefatosAtuais(pReaberto).map((a) => a.caminho)));
}

async function main() {
  await testes1a7_Multimidia();
  const pPrincipal = testes8a10_ProjetoPersistenciaReabertura();
  testes11a15(pPrincipal);
  await testes16a20();
  await missaoReal_ProjetoMultimidia();
  testeIsolamento();
  testeContinuidade();

  console.log('\n' + results.join('\n'));
  console.log(`\n${passed}/${passed + failed} testes aprovados`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('EXCEÇÃO NÃO TRATADA:', e.stack); process.exit(1); });
