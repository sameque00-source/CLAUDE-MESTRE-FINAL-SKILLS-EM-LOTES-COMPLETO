/**
 * Classificador de tarefa — heurística por regras (sem chamar IA para classificar,
 * pra não gastar uma requisição só pra decidir o nível).
 *
 * Retorna: { level: 0-4, modality: [...], useAgents: bool, useRuflo: bool, useSkills: bool }
 *
 * Regra de ouro: nível 0-1 NUNCA aciona agentes/Ruflo/Skills. Isso resolve
 * diretamente o "problema do xhigh" descrito no pedido original.
 */

// \b do JS só reconhece [A-Za-z0-9_] como "palavra" — falha com acento (ex: "olá").
// Por isso usamos (?![\p{L}]) (lookahead: não seguido de mais uma letra Unicode).
const GREETINGS = /^(oi|ol[áa]|hey|hi|hello|bom dia|boa tarde|boa noite|e a[íi]|tudo bem|blz)(?![\p{L}])/iu;
const TRIVIAL_MATH = /^\s*[\d\s+\-*/().]+\s*[=?]?\s*$/;
// pergunta em linguagem natural mas aritmética trivial, ex: "quanto é 2+2?"
const NATURAL_TRIVIAL_MATH = /^(quanto\s+(é|eh|e)|qual\s+(é|eh|e)\s+o\s+resultado\s+de)\s*[\d\s+\-*/().]+\??\s*$/i;
const CODE_MARKERS = /```|function\s|class\s|def\s|import\s|const\s|let\s|var\s|=>|;\s*$/m;
const ARCH_MARKERS = /\barquitetur|\bdebug|\bdepura[çc][ãa]o|\bdif[íi]cil\s+de\s+reproduzir|\bpesquis(e|a)\s+complex|\brefator(ar|a[çc][ãa]o)\s+grande|\bmicroservi[çc]|\bescal(a|abilidade)|\brace\s+condition|\bsistema\s+distribu[íi]do|\bcausa\s+raiz|\bdeadlock/i;
const BIG_PROJECT_MARKERS = /\bprojeto\s+(grande|completo|inteiro)|\bm[uú]ltiplas?\s+etapas|\bde\s+ponta\s+a\s+ponta|\bfull[- ]?stack|\borquestr(e|ar|a[çc][ãa]o)/i;
const CODE_TASK_MARKERS = /\bcri(e|ar)\s+(um\s+|uma\s+)?(\w+\s+){0,2}(script|fun[çc][ãa]o|componente|endpoint|classe|programa)|\bcorrij(a|ir)\s+(este|esse|o)\s+c[óo]digo|\bimplement(e|ar)|\brefator(e|ar)\b/i;
const IMAGE_GEN_MARKERS = /\b(ger(e|ar)|cri(e|ar)|desenh(e|ar)|fa[çc]a)\s+(uma?\s+)?(imagem|ilustra[çc][ãa]o|foto)\b/i;
const VIDEO_MARKERS = /\bv[íi]deo\b|\bgerar\s+v[íi]deo/i;
const AUDIO_MARKERS = /\b[áa]udio\b|\btranscrever\b|\btexto[- ]para[- ]fala|\bfala[- ]para[- ]texto|\bTTS\b|\bSTT\b/i;
const VISION_HINT = /\banalis(e|ar)\s+(esta|essa|a)\s+imagem|\bo\s+que\s+tem\s+(nessa|nesta)\s+imagem|\bdescrev(a|er)\s+(esta|essa|a)\s+imagem/i;

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

// LIMITAÇÃO CONHECIDA (encontrada em teste real via gateway, 2026-09-14):
// classify() só olha a mensagem atual, não o histórico da conversa. Num
// multi-turno tipo "crie função X" -> "agora adicione tratamento pra Y", a
// segunda mensagem sozinha não tem marcador de código e cai pra nível 1,
// mesmo sendo continuação óbvia de tarefa de código. O resultado ainda saiu
// correto no teste (o modelo escolhido deu conta), mas a escolha de nível
// não foi ideal. Melhoria futura: aceitar o histórico recente e herdar o
// nível da tarefa em andamento quando a mensagem atual for curta/ambígua.
function classify(input, { hasImageAttachment = false } = {}) {
  const text = (input || '').trim();
  const wc = wordCount(text);

  const modality = ['text'];
  if (hasImageAttachment || VISION_HINT.test(text)) modality.push('vision');
  if (IMAGE_GEN_MARKERS.test(text)) modality.push('image_gen');
  if (VIDEO_MARKERS.test(text)) modality.push('video_gen');
  if (AUDIO_MARKERS.test(text)) modality.push('audio');

  // Nível 0: só saudação pura ou matemática trivial — NUNCA por tamanho isolado
  // (uma pergunta curta como "explique recursão" não é trivial)
  if (GREETINGS.test(text) || TRIVIAL_MATH.test(text) || NATURAL_TRIVIAL_MATH.test(text)) {
    return finalize(0, modality);
  }

  // Nível 4: projeto grande / múltiplas etapas
  if (BIG_PROJECT_MARKERS.test(text)) {
    return finalize(4, modality);
  }

  // Nível 3: arquitetura, debug difícil, pesquisa complexa
  if (ARCH_MARKERS.test(text)) {
    return finalize(3, modality);
  }

  // Nível 2: tarefa de código pontual
  if (CODE_MARKERS.test(text) || CODE_TASK_MARKERS.test(text)) {
    return finalize(2, modality);
  }

  // Nível 1: pergunta normal (padrão para tudo que não caiu nos casos acima)
  if (wc <= 40) {
    return finalize(1, modality);
  }

  // Texto longo sem marcador específico: tratar como nível 2 (mais seguro que nível 0/1
  // para um pedido longo, mas sem escalar para agentes automaticamente)
  return finalize(2, modality);
}

function finalize(level, modality) {
  return {
    level,
    modality,
    useAgents: level >= 3,
    useRuflo: level >= 4,
    useSkills: level >= 2,       // nível 2 pode consultar 1 Skill específica; ver router
    useBrowser: modality.includes('video_gen') === false && level >= 3, // navegador só se fizer sentido
    effort: ['minimo', 'baixo', 'medio', 'alto', 'maximo'][level],
  };
}

/**
 * Versão ciente de histórico: classifica a mensagem atual normalmente, mas
 * nunca deixa o nível cair abaixo do nível do turno anterior se a mensagem
 * atual for curta/ambígua (ex: "agora adicione X", "e sobre Y?") — evita
 * rebaixar uma continuação óbvia de tarefa técnica pra nível 0/1.
 * `messages` no formato Anthropic: [{role:'user'|'assistant', content}].
 */
// Bug real encontrado (2026-09-14, teste com o CLI de verdade do Claude Code):
// o CLI manda o prompt real do usuário E, como um turno "user" separado extra
// (sem assistant entre os dois), um bloco de contexto injetado começando com
// "<system-reminder>" (CLAUDE.md, lembretes do harness). Isso NÃO é intenção
// do usuário — classificar em cima desse texto fazia tarefas triviais virarem
// nível 4 (o texto injetado é longo e cheio de palavras como "coordenação",
// "paralelo" etc). Por isso ignoramos blocos de system-reminder ao escolher
// qual mensagem "user" representa a intenção real a classificar.
// Remove blocos inteiros <system-reminder>...</system-reminder> de dentro do texto
// (não só no início — eles podem vir antes, no meio ou depois do prompt real,
// e às vezes há mais de um bloco na mesma mensagem "user").
function stripSystemReminders(text) {
  return (text || '').replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, ' ').trim();
}

function classifyConversation(messages, opts = {}) {
  const flatten = (c) => (typeof c === 'string' ? c : Array.isArray(c) ? c.filter((b) => b.type === 'text').map((b) => b.text).join('\n') : '');
  const userMsgs = messages.filter((m) => m.role === 'user');
  // pra cada msg "user", usa só o texto que sobra depois de remover reminders injetados
  const stripped = userMsgs.map((m) => stripSystemReminders(flatten(m.content)));
  // prefere a última mensagem "user" cujo texto real (pós-strip) não é vazio;
  // se todas ficarem vazias (caso raro, só reminders), cai pra última mesmo.
  let lastUserIdx = -1;
  for (let i = stripped.length - 1; i >= 0; i--) {
    if (stripped[i].length > 0) { lastUserIdx = i; break; }
  }
  if (lastUserIdx === -1) lastUserIdx = stripped.length - 1;
  const lastUserText = stripped[lastUserIdx] || '';
  const current = classify(lastUserText, opts);

  // mensagem curta (<=8 palavras) sem marcador próprio: olha pra trás
  const wc = wordCount(lastUserText);
  if (wc <= 8 && lastUserIdx > 0) {
    // pega o nível do turno anterior (última msg de usuário REAL antes desta)
    const priorText = stripped.slice(0, lastUserIdx).filter((t) => t.length > 0).slice(-1)[0] || '';
    const priorAssistant = messages.filter((m) => m.role === 'assistant').slice(-1)[0];
    const priorHadCode = /```/.test(flatten(priorAssistant?.content));
    if (priorText) {
      const priorClass = classify(priorText, opts);
      if (priorClass.level > current.level || priorHadCode) {
        return finalize(Math.max(current.level, priorClass.level, priorHadCode ? 2 : 0), current.modality);
      }
    }
  }
  return current;
}

module.exports = { classify, classifyConversation, stripSystemReminders };

// Auto-teste rápido (rodar `node classify.js` diretamente)
if (require.main === module) {
  const casos = [
    'olá',
    'quanto é 2+2?',
    'explique o que é recursão',
    'crie um pequeno script em python que soma dois números',
    'corrija este código: function foo() { retun 1 }',
    'analise esta arquitetura de microsserviços e aponte gargalos',
    'crie um projeto completo de e-commerce full-stack com múltiplas etapas',
    'analise esta imagem e me diga o que tem nela',
    'gere uma imagem de um gato astronauta',
  ];
  for (const c of casos) {
    console.log(JSON.stringify({ input: c, ...classify(c) }));
  }
}
