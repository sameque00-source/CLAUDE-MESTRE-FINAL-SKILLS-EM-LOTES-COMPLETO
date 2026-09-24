# PLANO MESTRE — 9ROUTER COMO NÚCLEO DE UM AGENTE DE IA GERAL

**Data:** 2026-09-15
**Tipo:** PLAN MODE — auditoria + arquitetura. **Nada foi implementado nesta etapa.**
**Custo:** R$0 — nenhuma decisão aqui depende de serviço pago, cartão ou cobrança.
**9Router preservado:** PID 10760 intacto durante toda a auditoria, nenhuma alteração.

---

## 1. VISÃO GERAL

Hoje existem três peças que não conversam como um sistema único:

1. **9Router** (`localhost:20128`) — produto maduro, instalado globalmente, com 40
   providers, combo com fallback, Quota Tracker, Token Saver, Vision/Audio Adapter.
   Usado hoje só como "mais um provedor" dentro do Gateway — um desperdício do que
   ele já sabe fazer.
2. **Gateway AI-ORCHESTRATOR** (`localhost:20130`, este projeto) — um roteador de
   modelos fino que criei nas últimas sessões: classificador por nível, 4 adapters
   com tool-calling e streaming reais, score dinâmico com cooldown. É bom no que
   faz, mas é **só roteamento** — não planeja, não pesquisa, não decide paralelismo,
   não tem memória além de telemetria de latência/sucesso.
3. **Claude Code** — hoje é o único "cérebro agêntico" do sistema. Todo o
   planejamento, decisão de ferramentas e orquestração acontece dentro da sessão do
   Claude Code, não no roteador.

**O pedido desta missão inverte a hierarquia**: o 9Router deixa de ser só um
backend de modelo e passa a ser o **núcleo de decisão** de um agente de IA geral
capaz de receber um objetivo amplo ("crie um app de edição de vídeo") e
conduzi-lo sozinho — entender, pesquisar, planejar, paralelizar, executar,
testar, corrigir, revisar, entregar — usando Claude Code (e outros executores)
como *ferramentas*, não como o próprio cérebro.

Isso não é uma reescrita do zero. É uma **composição** de três bases já
existentes e já validadas nesta conta:
- o **motor de execução de modelo** (9Router) — reaproveitado quase integralmente;
- o **motor de roteamento/scoring/streaming** (Gateway) — reaproveitado e
  expandido para virar a "camada de decisão de modelo por subtarefa";
- o **catálogo de padrões de orquestração de agentes** (CLAUDE-CODE-VS-AUTO-ULTIMATE)
  — parcialmente reaproveitado (25 agentes bem desenhados, 3 arquivos de regras),
  com a parte inflada/duplicada (135 skills espelhadas do ruflo, 4 skills de
  engenharia quase idênticas) explicitamente **descartada**.

---

## 2. ARQUITETURA ATUAL (mapa completo, auditado nesta sessão)

```
┌─────────────────────────────────────────────────────────────────────┐
│ CLAUDE CODE (sessão interativa OU claude -p headless)                │
│   - único "cérebro" agêntico hoje                                    │
│   - MCP: playwright (ativo); claude-flow (agora desligado de fato)   │
│   - Agents: subagentes internos do Claude Code (Agent tool)          │
│   - hooks locais: 16 configurados, com bug de quoting no Windows     │
│     (cmd /c mal interpretado pelo MSYS/Git-Bash — diagnosticado e    │
│     documentado em RELATORIO-DIAGNOSTICO-CLAUDE-CODE-TOOLS.md)       │
└───────────────────────────┬────────────────────────────────────────┘
                             │ Anthropic Messages API (com tools)
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ GATEWAY 20130 (AI-ORCHESTRATOR) — camada de roteamento               │
│   classifier/classify.js → nível 0-4 (heurística por regex, só PT)   │
│   gateway/scoring.js → score dinâmico + cooldown + circuit breaker   │
│   gateway/providers.js → 4 adapters: Groq, OpenRouter, Google, 9Router│
│     - tool-calling traduzido nos 3 formatos (Anthropic/OpenAI/Gemini)│
│     - streaming real incremental (SSE) nos 4                         │
│   gateway/server.js → fallback em cascata, validação de conteúdo     │
│   catalog/models.json → 19 modelos, telemetria real acumulada        │
│   logs/gateway.jsonl + health-state.json → telemetria persistida     │
└───────────────────────────┬────────────────────────────────────────┘
                             │ 1 dos 19 modelos é o "9Router/imperion-dev"
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 9ROUTER 20128 — motor de execução de modelo (produto externo, maduro)│
│   40 providers cadastrados, 5 conectados (OpenCode Free, Gemini CLI,  │
│   NVIDIA NIM, Cloudflare x2, Groq)                                    │
│   combo "imperion-dev": 17 modelos, estratégia Fallback               │
│   Token Saver: RTK (compressão de saída de ferramenta) ON;            │
│     Headroom (compressão de contexto) e Caveman (compressão de saída  │
│     do LLM) OFF                                                       │
│   Quota Tracker: auto-refresh 60s, auto-disable/auto-restore nativo   │
│   Vision Adapter ON; Audio Adapter ON mas sem nenhum modelo (lacuna)  │
│   Estratégias de combo disponíveis: Fallback, Round Robin, Fusion     │
│     (paralelo + juiz) — Fusion nunca usada até hoje                   │
│   v0.5.69 instalado, v0.5.75 disponível (não atualizado)              │
│   Banco: ~/.9router/db/data.sqlite (histórico completo de uso)        │
└─────────────────────────────────────────────────────────────────────┘
```

Hoje o Gateway trata o 9Router como **"mais um dos 19 modelos"**, priority 25,
usado só como backup de último recurso (2/20 de taxa de sucesso na telemetria
real — não porque é ruim, mas porque quase nunca chega a ser tentado, os outros
3 provedores diretos costumam resolver antes).

---

## 3. PROBLEMAS ATUAIS (auditoria consolidada)

### 3.1 Arquiteturais (o que este plano resolve)
| Problema | Evidência |
|---|---|
| Não existe planejador — o "plano" é o raciocínio ad-hoc do Claude Code a cada turno | Nenhum módulo em `gateway/` ou `9router` decompõe objetivo em tarefas |
| Não existe execução paralela de subtarefas independentes fora do Claude Code | `Agent`/subagentes do Claude Code paralelizam, mas só dentro de UMA sessão de Claude Code — o roteador não sabe disso |
| Não existe memória além de telemetria de latência/sucesso por modelo | `logs/gateway.jsonl` é write-mostly (só lido para score); não há memória de projeto, preferência ou erro corrigido |
| Não existe pesquisa autônoma no roteador | Pesquisa web só acontece se o Claude Code decidir usar WebSearch/WebFetch dentro da sessão |
| 9Router é subutilizado como motor — Fusion, Token Saver completo, Quota Tracker, Vision/Audio Adapter não são acionados pelo fluxo principal | Rota atual (Claude Code → Gateway) só usa o 9Router como 1 modelo de fallback |
| Roteamento é por REQUISIÇÃO inteira, não por SUBTAREFA | O Gateway escolhe 1 modelo para a mensagem inteira; não separa "isto é pesquisa" de "isto é coding" dentro do mesmo objetivo |

### 3.2 Técnicos, já documentados em auditorias anteriores desta sessão
- Classificador só reconhece português (`classifier/classify.js`) — falha em objetivos em inglês.
- `router/route.js` e `router/execute.js` são código morto com lógica de diversidade de provider e roteamento de imagem/áudio enterrada, nunca importados.
- Adapters Groq/OpenRouter descartam imagem silenciosamente.
- `image_gen`/`audio`/`video` são classificados pelo classifier mas **nunca roteados** — não há adapter de execução para Cloudflare (Flux), Pollinations ou ElevenLabs apesar de estarem no catálogo.
- 14 campos do catálogo (`coding_score`, `reasoning_score`, `speed_tps`, `daily_limit`, `agent_capable`...) ainda maioria `"nao confirmado"` — dados reais só existem via telemetria acumulada, não via pesquisa declarada.
- Hooks do Claude Code têm um bug de quoting real (`cmd /c` interpretado errado pelo MSYS/Git-Bash) — tentativa de correção causou regressão e foi revertida (ver `RELATORIO-DIAGNOSTICO-CLAUDE-CODE-TOOLS.md`). **Achado independente**: o próprio `CLAUDE-CODE-VS-AUTO-ULTIMATE` já tinha removido hooks por esse EXATO motivo (`backups/pre-claude-code-stability-fix/INICIO-SEGURO.md`: "Hooks locais frágeis foram desativados no workspace"). Confirma que não é acidente de configuração local, é um padrão frágil de verdade no Windows.
- MCP `claude-flow` estava mal desligado (bug de config já corrigido nesta sessão).

### 3.3 O que já está bom (não recriar)
- Tool-calling multi-formato (Anthropic↔OpenAI↔Gemini) — maduro, testado.
- Streaming real incremental nos 4 adapters — implementado e validado (TTFT medido).
- Score dinâmico com cooldown/circuit breaker por tipo de erro — boa base para "roteador de modelo por subtarefa" (seção 9).
- Fallback em cascata com validação de conteúdo (não aceita HTTP 200 vazio como sucesso).
- 25 agentes do `CLAUDE-CODE-VS-AUTO-ULTIMATE` — bem desenhados, formato enxuto, dois padrões valiosos: separação planejar/executar/consolidar, e agentes com poder de veto/somente-leitura.
- 3 arquivos de `rules/` do mesmo projeto — captura de conhecimento operacional real (armadilhas pagas), disciplina de coordenação (1 escritor por arquivo, barreiras de fase).

---

## 4. ARQUITETURA FUTURA — VISÃO DE ALTO NÍVEL

```
                         OBJETIVO DO USUÁRIO (amplo, ambíguo)
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │      ORQUESTRADOR CENTRAL         │  (módulo 1 — novo, no 9Router)
                    │  entende intenção, decide MODE     │
                    │  (AUTO vs PLAN), aciona os módulos │
                    └───────────────┬───────────────────┘
              ┌──────────┬──────────┼──────────┬───────────┐
              ▼          ▼          ▼          ▼           ▼
        PLANEJADOR   PESQUISADOR  MEMÓRIA   GERENC. DE   MONITOR DE
        (módulo 2)   (módulo 3)  (módulo 9) TAREFAS(4)   SAÚDE (16)
              │          │          │          │
              └────┬─────┴────┬─────┘          │
                   ▼           ▼                │
          GERENC. DE CONTEXTO (5)      GERENC. DE AGENTES (8)
                   │                            │
                   ▼                            ▼
          ROTEADOR DE MODELOS (6) ◄───► GERENC. DE FERRAMENTAS (7)
          [Gateway existente,                  │
           expandido por subtarefa]             ▼
                   │                    AGENTES ESPECIALIZADOS
                   ▼                    (Claude Code, subagentes,
             EXECUTOR (10)              navegador, terminal, etc.)
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
      TESTADOR  REVISOR  AUTOCORRETOR
       (11)      (12)      (13)
          │        │        │
          └────────┴────────┘
                   ▼
       GERENC. DE PROJETOS (14) ──► MISSION_STATE persistente
                   │
                   ▼
              ENTREGA AO USUÁRIO

    Transversais a tudo acima:
    SISTEMA DE FALLBACK (17) · SISTEMA DE QUOTA (18) · SISTEMA DE
    SEGURANÇA (19) · SISTEMA DE RECUPERAÇÃO (20) · GERENC. DE
    MULTIMÍDIA (15) · OBSERVABILIDADE (parte 22)
```

**Decisão arquitetural central**: o Orquestrador, Planejador, Gerenciador de
Tarefas/Contexto/Agentes e a Memória vivem **no lado do 9Router** (Node.js,
mesmo runtime do Gateway atual — pode literalmente crescer dentro do
`AI-ORCHESTRATOR`, ao lado de `gateway/`). O Claude Code deixa de ser "o
cérebro" e passa a ser **um dos Executores** que o Orquestrador aciona — junto
de outros executores possíveis (chamada direta a um modelo via Gateway,
navegador via Playwright, scripts diretos). Isso é coerente com o pedido
explícito do usuário ("Claude Code é só a ferramenta usada para desenvolver o
9Router" e, no alvo final, o 9Router decide sozinho).

---

## 5. OS 20 MÓDULOS — DEFINIÇÃO E COMUNICAÇÃO

Cada módulo é definido por: responsabilidade, entrada, saída, e com quem fala.
Comunicação interna via **eventos + estado compartilhado em disco** (mesmo
padrão já usado por `scoring.js`: JSON em `logs/`, sem dependência de banco
externo — R$0, sem infra nova). Um `MISSION_STATE.json` por missão ativa é o
"quadro branco" que todos os módulos leem/escrevem (com lock otimista simples,
um escritor por vez — o mesmo princípio de `10-coordenacao.md` do projeto de
referência).

| # | Módulo | Responsabilidade | Entrada | Saída | Fala com |
|---|---|---|---|---|---|
| 1 | **Orquestrador Central** | Recebe o objetivo, decide AUTO/PLAN, aciona o Planejador, monitora o `MISSION_STATE`, decide quando a missão terminou | objetivo em linguagem natural | eventos de início/fim de fase | todos |
| 2 | **Planejador** | Decompõe objetivo em tarefas/subtarefas, marca dependência vs. independência, replaneja quando o Pesquisador traz fato novo | objetivo + achados do Pesquisador | grafo de tarefas (DAG) no `MISSION_STATE` | Pesquisador, Gerenc. de Tarefas |
| 3 | **Pesquisador** | Web search, docs, comparação de bibliotecas/versões, investigação de erro | pergunta específica | achados estruturados (fonte + resumo + confiança) | Planejador, Memória |
| 4 | **Gerenciador de Tarefas** | Fila de tarefas, estado (pendente/em progresso/bloqueada/concluída/erro), decide o que pode rodar em paralelo agora | grafo de tarefas do Planejador | lista de tarefas prontas para execução | Executor, Gerenc. de Agentes |
| 5 | **Gerenciador de Contexto** | Decide o que cada chamada de modelo/agente recebe (arquivo, memória, resultado de ferramenta anterior), comprime quando necessário | histórico da missão + tarefa atual | payload otimizado por chamada | Roteador de Modelos, Memória |
| 6 | **Roteador de Modelos** | *(Gateway atual, expandido)* escolhe o melhor modelo **por subtarefa** (não por requisição inteira) | tipo de subtarefa + score + cooldown | modelo escolhido + fallback ordenado | Executor, Sistema de Fallback/Quota |
| 7 | **Gerenciador de Ferramentas** | Decide quais ferramentas uma subtarefa precisa (navegador, terminal, git, compilador...) e evita carregar as que não precisa | subtarefa | lista mínima de ferramentas habilitadas | Gerenc. de Agentes, Executor |
| 8 | **Gerenciador de Agentes** | Escolhe qual agente especializado (dos catalogados na seção 6 abaixo) executa cada subtarefa, evita rodar agentes desnecessários | subtarefa + tipo | agente designado | Executor, Gerenc. de Ferramentas |
| 9 | **Memória** | Ver seção 12 — 7 tipos de memória, persistência e consulta | escrita: eventos da missão / leitura: consulta por tópico | fatos relevantes recuperados | todos os módulos |
| 10 | **Executor** | Roda a subtarefa de fato: chama Claude Code (`claude -p`), chama um modelo direto via Roteador, roda um script, aciona o navegador | tarefa + agente + ferramentas + modelo | resultado bruto | Testador |
| 11 | **Testador** | Roda testes reais (nunca aceita "parece certo"), valida contra critério de aceite da tarefa | resultado do Executor + critério | passou/falhou + evidência | Revisor, Autocorretor |
| 12 | **Revisor** | Revisão adversarial — busca o que passou despercebido, questiona decisão (papel de veto, como `reviewer`/`security` do projeto de referência) | resultado testado | aprovado/reprovado + motivo | Autocorretor, Gerenc. de Projetos |
| 13 | **Autocorretor** | Ciclo gerar→executar→verificar→corrigir→executar de novo | falha do Testador/Revisor | nova tentativa ou escalonamento | Executor |
| 14 | **Gerenciador de Projetos** | Mantém o `MISSION_STATE` (objetivo, fase, tarefas, bloqueios, próxima ação), permite retomar após interrupção | eventos de todos os módulos | estado persistente em disco | Orquestrador |
| 15 | **Gerenciador de Multimídia** | Detecta necessidade de imagem/áudio/vídeo/visão e roteia para o adapter certo (Cloudflare Flux, Pollinations, ElevenLabs, Vision Adapter do 9Router) | subtarefa multimodal | mídia gerada/analisada | Roteador de Modelos |
| 16 | **Monitor de Saúde** | Observa 9Router, Gateway, providers, processos — o que já existe em `scoring.js` + health checks, expandido | pings periódicos | estado de saúde por componente | Sistema de Recuperação |
| 17 | **Sistema de Fallback** | *(já existe no Gateway)* cascata de candidatos por score, nunca falha silenciosamente | falha de um candidato | próximo candidato | Roteador de Modelos |
| 18 | **Sistema de Quota** | Integra com o Quota Tracker nativo do 9Router em vez de reimplementar; adiciona verificação para os 3 providers diretos (Groq/Google/OpenRouter) | erro 429/cota | provider marcado indisponível até reset | Sistema de Fallback |
| 19 | **Sistema de Segurança** | Isolamento de secrets, permissões por ferramenta, sandbox para código gerado antes de rodar sem supervisão | ação proposta | aprovada/bloqueada/precisa sandbox | Executor |
| 20 | **Sistema de Recuperação** | Reinicia processo específico por PID (nunca `/IM`), retoma `MISSION_STATE` após crash/interrupção | falha de processo/sessão | processo restaurado + missão retomada | Monitor de Saúde, Gerenc. de Projetos |

---

## 6. EXECUÇÃO PARALELA

### Mecanismo de decisão dependência vs. independência
O Planejador constrói um **DAG (grafo acíclico dirigido)** de tarefas: cada
tarefa declara `depends_on: [ids]`. Duas tarefas são candidatas a paralelo
quando:
1. Nenhuma depende da saída da outra (não há aresta entre elas no DAG);
2. Não escrevem no mesmo arquivo/recurso (regra "um escritor por arquivo" já
   estabelecida em `10-coordenacao.md` do projeto de referência — reaproveitada
   diretamente);
3. Não competem pelo mesmo provider/modelo em quota apertada (o Gerenciador de
   Tarefas consulta o Sistema de Quota antes de despachar em paralelo).

### Exemplo do próprio pedido do usuário, aplicado
```
OBJETIVO: "Crie um aplicativo de edição de vídeo profissional"
   │
   ▼ Planejador decompõe:
   ├─ T1 pesquisar tecnologias de edição de vídeo         [sem dependência]
   ├─ T2 pesquisar UX de editores existentes                [sem dependência]
   ├─ T3 pesquisar codecs/formatos                          [sem dependência]
   ├─ T4 avaliar bibliotecas (ffmpeg.wasm, remotion, etc.)  [sem dependência]
   ├─ T5 analisar concorrentes (Capcut, Premiere, DaVinci)  [sem dependência]
   └─ T6 definir arquitetura                     [depende de T1,T3,T4]
        │
        ▼ (T1-T5 em paralelo real, cada uma vira 1 Executor com o modelo
           mais adequado para pesquisa — ver seção 9)
        ▼ consolidação (Planejador reavalia com os achados)
        ▼ T7 implementação (pode dividir em paralelo de novo: frontend vs.
           engine de vídeo vs. exportação, se não colidirem em arquivo)
        ▼ T8 testes
        ▼ T9 revisão
        ▼ T10 entrega
```
T1-T5 despacham como **5 Executores concorrentes** (mesmo padrão já usado
nesta própria sessão do Claude Code: `Agent` com `run_in_background: true`,
recolhidos depois). No nível do 9Router, isso mapeia diretamente para a
estratégia de combo **Fusion** (paralelo + juiz) que já existe e nunca foi
usada — ótimo candidato para tarefas de pesquisa onde comparar 2-3 respostas
paralelas melhora a qualidade.

---

## 7. AGENTES ESPECIALIZADOS — REAPROVEITAMENTO DO CLAUDE-CODE-VS-AUTO-ULTIMATE

### Decisão: aproveitar, adaptar, descartar

**APROVEITAR quase integralmente** (adaptar caminhos/domínio, remover o que é
específico do FiveM/Imperion):
- Os **25 agentes** de `.claude/agents/*.md` — formato, papéis, e
  principalmente os dois padrões estruturais:
  - separação **planejar → executar → consolidar** (`queen-coordinator` só
    planeja, `coordinator` só consolida no fim — mapeia diretamente para os
    módulos 2/Planejador e 14/Gerenciador de Projetos deste plano);
  - **poder de veto** em `security` e `reviewer`, e agentes deliberadamente
    somente-leitura (`architecture`, `performance`, `research`,
    `security-auditor`) — vira a base do módulo 12/Revisor e do Sistema de
    Segurança (módulo 19).
- Os 3 arquivos de `.claude/rules/`:
  - `20-evidencia.md` — os rótulos `[CONFIRMADO]/[INFERIDO]/[PRECISA
    VERIFICAÇÃO]/[RECOMENDAÇÃO]/[PENDENTE — NÃO TESTADO]` e a tabela de
    "armadilhas já pagas" — adotar o MESMO formato para o novo sistema,
    começando pelas armadilhas já descobertas nesta própria sessão (bug do
    `cmd /c`, MSYS path translation, etc.).
  - `10-coordenacao.md` — barreiras de fase, "só um escritor por arquivo",
    exigência de dupla análise em mudança de risco — vira a política de
    paralelismo do módulo 4/Gerenciador de Tarefas (seção 6 acima).
- A skill `adaptive-execution` (13 linhas) — a meta-regra de não acionar
  ferramentas/agentes pesados para tarefa trivial. Mapeia para o classificador
  de nível que o Gateway já tem (níveis 0-4) — **unificar os dois** em vez de
  ter duas heurísticas paralelas.
- Uma **única** skill de engenharia consolidada: preferir `elite-software-engineering`
  como base (mais enxuta, sem o catálogo de ~45 agentes fictícios que
  `software-engineering-ultimate` inclui e que violam a própria regra de "nunca
  inventar agente").

**NÃO REAPROVEITAR** (achado explícito do agente de exploração, com
justificativa técnica):
- As 135 skills espelhadas do ruflo em `.claude/skills/ruflo/` E duplicadas de
  novo em `tools/ruflo/.agents/skills/` — peso morto confirmado, a maioria sem
  relação com o objetivo (`agent-trading-predictor`, `agent-agentic-payments`,
  `agent-app-store`...).
- `software-engineering-ultimate`, `software-engineering-universe`,
  `software-engineering-universe-ultimate` — sobreposição confirmada,
  conteúdo majoritariamente redundante ou fora de escopo (RH/legal/vendas).
- `tools/ruflo/v3-agent-templates/*.yaml` — placeholders rasos sem
  comportamento real, os `.claude/agents/*.md` são muito superiores.
- Qualquer hook no padrão `cmd /c "IF EXIST ... (node ...) ELSE (node ...)"` —
  confirmado frágil em DOIS projetos independentes agora (este e o de
  referência, que já removeu por instabilidade). Se o novo sistema precisar de
  hooks, usar invocação direta de `.cjs`/`.js` sem passar por `cmd.exe`
  aninhado, ou `cmd //c` com teste de regressão completo antes de confiar.
- Tudo específico do domínio anterior (FiveM/FXServer/VPS "imperion",
  `INICIO-SEGURO.md`, `MANIFEST-AUTO.md`, scripts de verificação amarrados a
  caminhos daquele workspace).

### Lista final de agentes especializados propostos (adaptados)
Arquiteto · Pesquisador · Programador (geral) · Frontend · Backend · Banco de
Dados · DevOps · Segurança (veto) · QA/Testes · UX/UI · Documentação · Imagem ·
Áudio · Vídeo · Análise/Performance · Revisor (veto) · Otimizador ·
Coordenador-de-plano (só planeja) · Consolidador (só no fim) — **19 papéis**,
não 25: removidos os específicos de domínio antigo (`3d`/WebGL como agente
dedicado vira parte de Frontend; `cli` vira parte de DevOps; `swarm` vira
parte do Monitor de Saúde/Sistema de Recuperação; `mcp`, `hooks`, `integration`
viram responsabilidade do próprio Orquestrador/Gerenciador de Ferramentas, não
agentes separados — simplificação deliberada para não recriar o problema de
"25 papéis para tudo" quando o Orquestrador já decide automaticamente quais
usar).

**O orquestrador decide quais ativar por tarefa** — nunca todos de uma vez
(mesmo princípio do projeto de referência: "Não quero todos rodando sempre").

---

## 8. PESQUISA AUTÔNOMA

O módulo Pesquisador usa, por ordem de preferência (tudo R$0):
1. **WebSearch/WebFetch** já disponíveis via Claude Code quando o Executor
   escolhido é o Claude Code.
2. **Navegador (Playwright)** já configurado como MCP — para comparação visual,
   documentação interativa, ou quando busca simples não basta.
3. **Modelos com contexto grande + conhecimento próprio** (Gemini 1M de
   contexto) para sintetizar/comparar informação já obtida, evitando gastar
   busca real quando não é necessário.

O Pesquisador NUNCA depende do usuário apontar onde pesquisar — recebe a
pergunta do Planejador ("qual biblioteca de edição de vídeo em JS é mais
madura hoje?") e decide sozinho a estratégia (busca web → ler 2-3 fontes →
resumir com confiança declarada). Resultado sempre rotulado
(`[CONFIRMADO]` o que foi lido de fato, `[INFERIDO]` o que foi deduzido) —
reaproveitando o padrão de `20-evidencia.md`.

---

## 9. MEMÓRIA — 7 TIPOS

| Tipo | Onde guardar | Quando atualizar | Quando consultar | Controle de explosão |
|---|---|---|---|---|
| **Sessão** | Em memória do processo Orquestrador, descartada ao fim da missão | a cada evento | a cada decisão dentro da mesma missão | nunca persiste — grátis por natureza |
| **Projeto** | `MISSION_STATE.json` por projeto, em `AI-ORCHESTRATOR/missions/<id>/` | a cada mudança de fase/tarefa | ao retomar projeto interrompido | 1 arquivo por projeto, tamanho limitado (resumo, não log bruto) |
| **Longo prazo** | `memory/long-term.jsonl` (append-only, revisado periodicamente) | decisão explícita do usuário ou padrão repetido 3x+ | início de nova missão relacionada | poda periódica: só entra o que passou no filtro "vai ser útil de novo?" |
| **Tarefas** | Dentro do `MISSION_STATE` (DAG de tarefas) | a cada mudança de status | Gerenciador de Tarefas a cada ciclo | descartado ao concluir a missão (some para longo prazo só o resumo) |
| **Erros** | `memory/erros-conhecidos.jsonl` | toda vez que o Autocorretor resolve um erro | antes de tentar algo que já falhou antes | dedup por assinatura do erro, não por texto exato |
| **Preferências** | `memory/preferencias.json` (ex: "usuário prefere X framework", decisões explícitas passadas) | só quando o usuário decide algo que não é óbvio (regra da seção 15/AUTO MODE) | Planejador, antes de decidir algo "opinável" | pequeno por natureza — só decisões reais, não suposições |
| **Desempenho de modelos** | **Já existe**: `logs/gateway.jsonl` + `logs/health-state.json` (scoring.js) | a cada chamada de modelo | Roteador de Modelos a cada escolha | já tem poda (`MAX_AMOSTRAS=20` por modelo) |

Princípio geral (igual ao já aplicado no scoring.js): **memória é otimização,
nunca pode derrubar a missão** — toda leitura/escrita de memória é best-effort,
com fallback para "sem memória" se o arquivo estiver corrompido/ausente.

Evitar explosão de contexto: o Gerenciador de Contexto (módulo 5) só injeta
memória relevante ao tópico atual (busca por palavra-chave/tag, não injeção
cega do arquivo inteiro) — mesmo espírito do "contexto sob medida" de
`10-coordenacao.md`.

---

## 10. PLANEJAMENTO DINÂMICO

```
OBJETIVO → PLANO INICIAL (Planejador, com o que já sabe)
    → EXECUÇÃO das tarefas sem dependência de pesquisa
    → PESQUISA (paralela) alimenta achados novos
    → REPLANEJAMENTO: Planejador recebe achados, decide se o plano muda
        (ex: "a biblioteca X que eu ia usar está descontinuada, uso Y")
    → EXECUÇÃO ajustada
    → TESTE (módulo 11)
    → se falhar: AUTOCORREÇÃO (módulo 13), volta pra EXECUÇÃO
    → se passar: REVISÃO (módulo 12, veto disponível)
    → se aprovado: ENTREGA
    → se reprovado: volta pro PLANEJADOR (não só correção pontual —
       pode exigir replanejamento maior se o problema for estrutural)
```
O replanejamento é **automático quando uma descoberta muda a estratégia
ótima** — o Planejador recalcula o DAG de tarefas restantes, preserva o que já
foi concluído, e o Gerenciador de Projetos registra a mudança no
`MISSION_STATE` (auditável: por que o plano mudou, com base em quê).

---

## 11. ROTEAMENTO DE MODELOS POR SUBTAREFA (expansão do Gateway atual)

Hoje `gateway/server.js` escolhe **1 modelo para a requisição inteira**. A
mudança central desta arquitetura: cada **subtarefa** do DAG carrega um
`tipoTarefa` (o campo já existe em `scoring.js`: `'texto' | 'codigo' |
'raciocinio' | 'visao'` — só precisa de mais granularidade) e o Roteador de
Modelos escolhe o candidato ótimo PARA AQUELA subtarefa especificamente:

```
planejamento    → modelo com melhor reasoning_score + contexto grande (ex: Gemini)
pesquisa/síntese → modelo com contexto grande, tolerante a texto longo
coding          → modelo com melhor coding_score medido (hoje: nemotron-3-super-120b, 19/20 real)
visão           → único critério eliminatório: vision=true (Gemini ou 9Router Vision Adapter)
revisão/QA      → modelo diferente do que gerou o código (evita viés de "concordar consigo mesmo")
fallback        → 9Router (combo de 17 modelos internos, ainda mais fallback embutido)
```
Isso é uma **extensão direta de `scoring.js`**, não uma reescrita: já existe
`tipoTarefa` no contexto de score; falta (a) mais granularidade de tipos, (b)
uma regra explícita de "não repetir o mesmo modelo para gerar e revisar", e
(c) uma chamada de score por SUBTAREFA em vez de uma por requisição HTTP
inteira do Claude Code.

---

## 12. SCORE INTELIGENTE (expansão do `scoring.js` atual)

Fórmula atual (já implementada e testada):
```
score = aptidão×peso + saúde×peso + prioridade − penalidade_latência − penalidade_contexto
```
Expansão proposta, mantendo a mesma filosofia (pesos por nível/tipo, nunca
ML pesado):
```
score = aptidão_por_tipo_de_subtarefa      (já existe, generalizar tipos)
      + saúde_medida                        (já existe)
      + confiabilidade_recente               (novo: peso extra pra quem NÃO
                                               mudou de comportamento — reduz
                                               risco de regressão silenciosa
                                               de um provider)
      + disponibilidade_de_ferramentas       (novo: tools=true pesa mais
                                               quando a subtarefa é agêntica)
      + modalidade_correta                   (já existe como filtro eliminatório
                                               pra visão; formalizar p/ áudio/vídeo)
      − penalidade_latência                  (já existe)
      − penalidade_contexto                  (já existe)
      − penalidade_quota_proxima_do_limite   (novo: usar o Quota Tracker do
                                               9Router como fonte de verdade
                                               em vez de só reagir a 429)
```
O score já muda com o tempo (telemetria real, `MAX_AMOSTRAS=20` por modelo) —
a expansão só adiciona dimensões, não troca o mecanismo.

---

## 13. QUOTA (integração, não reimplementação)

**Decisão explícita**: não recriar um sistema de quota do zero para os
providers que já passam pelo 9Router — o Quota Tracker nativo dele já faz
auto-refresh e auto-disable/restore. Para os 3 providers diretos do Gateway
(Groq/Google/OpenRouter), manter a classificação de erro já existente em
`scoring.js` (`quota`, `rate_limit` com cooldowns diferenciados) — já é
equivalente em efeito prático ao que o 9Router faz nativamente para os dele.

---

## 14. FALLBACK

Já resolvido em duas camadas independentes e complementares (nenhuma muda):
1. **Gateway**: cascata de candidatos por score, streaming com o design "só
   compromete a resposta após primeiro conteúdo real" (já implementado e
   testado nesta sessão).
2. **9Router**: combo "imperion-dev" com 17 modelos internos em fallback
   próprio — funciona como uma "segunda rede de segurança" quando os 3
   providers diretos falham todos.

A única mudança: o Roteador de Modelos por subtarefa (seção 11) decide
**quando vale a pena ir direto pro 9Router** em vez de tentar os 3 diretos
primeiro — por exemplo, para modalidades que só o 9Router resolve hoje
(áudio, quando tiver modelo cadastrado; Fusion para tarefas de pesquisa onde
comparar respostas vale o custo de latência extra).

---

## 15. FERRAMENTAS

O Gerenciador de Ferramentas (módulo 7) decide por subtarefa, nunca carrega
tudo de uma vez (mesmo princípio de `adaptive-execution`):

| Tipo de subtarefa | Ferramentas habilitadas |
|---|---|
| Pesquisa | WebSearch/WebFetch, navegador (só se precisar interação) |
| Coding | Read/Write/Edit/Bash/Glob/Grep (Claude Code como executor) |
| Revisão de código | Read/Grep apenas (somente-leitura, como `architecture`/`reviewer` do projeto de referência) |
| Build/deploy | Bash + compilador/builder específico da stack escolhida |
| Multimídia | adapter específico (Cloudflare Flux, Pollinations, ElevenLabs, Vision Adapter) |
| Git | Bash com escopo restrito a comandos git |

---

## 16. MULTIMÍDIA

```
TEXTO/CODING → Roteador de Modelos padrão (já implementado)
IMAGEM (gerar) → Cloudflare Flux-1-schnell OU Pollinations (ambos já no
                  catálogo, SEM adapter de execução — gap a fechar na FASE 9)
VISÃO (entender) → Gemini (vision=true, já funcional) OU 9Router Vision
                    Adapter (oc/mimo-v2.5-free, ainda não acionado pelo fluxo)
ÁUDIO (falar) → ElevenLabs free tier (catálogo já tem entrada, sem adapter)
ÁUDIO (ouvir) → Groq Whisper (já no catálogo como `groq-whisper-large-v3-turbo`,
                sem adapter de execução ainda)
VÍDEO → nenhuma solução gratuita madura identificada ainda — fica como
         pesquisa ativa da FASE 9, não inventar capacidade que não existe
```
O Gerenciador de Multimídia detecta a modalidade pela subtarefa (já há
classificação parcial em `classify.js` para `image_gen`/`audio`/`video` — hoje
classificada mas não roteada; a FASE 9 fecha esse gap específico).

---

## 17. AUTOCORREÇÃO

Ciclo único, aplicado a qualquer artefato (código, arquivo, build, config):
```
GERAR → EXECUTAR → VERIFICAR (critério de aceite explícito, nunca "parece
certo") → se falhou: DIAGNOSTICAR causa raiz → CORRIGIR → EXECUTAR DE NOVO
→ se passou N vezes seguidas o mesmo tipo de erro: ESCALAR (parar de tentar
cegamente, replanejar ou pedir decisão do usuário se for uma decisão real de
preferência, não técnica)
```
Isso já é o padrão usado manualmente nesta sessão (ex: correção do bug de
streaming, correção do bug de hooks com rollback quando piorou) — a mudança é
formalizar como módulo reutilizável em vez de disciplina manual do
Claude Code a cada sessão.

---

## 18. TESTES E QUALIDADE

Antes de qualquer entrega complexa: **Testador → Revisor**, nunca pular.
- Testador roda testes reais (não "deveria funcionar") — mesmo padrão exigido
  em toda esta sessão (`CLAUDE.md`: "Prova é: log, hash, contagem, medição ou
  execução real").
- Revisor tem poder de **veto** (padrão herdado de `security`/`reviewer` do
  projeto de referência) — reprovação manda de volta pro Autocorretor ou,
  se for estrutural, pro Planejador.
- Para projetos com UI: adicionar um passo de revisão visual (screenshot via
  navegador) antes de considerar "pronto" — nenhum "pronto" sem evidência.

---

## 19. PROJETOS PERSISTENTES (`MISSION_STATE`)

Schema por missão (`AI-ORCHESTRATOR/missions/<id>/MISSION_STATE.json`):
```json
{
  "objetivo": "",
  "fase_atual": "",
  "tarefas": [{"id":"", "descricao":"", "depende_de":[], "status":"pendente|em_progresso|bloqueada|concluida|erro", "agente":"", "modelo_usado":""}],
  "concluido": [],
  "pendente": [],
  "bloqueado": [{"tarefa":"", "motivo":""}],
  "erros_e_correcoes": [{"erro":"", "diagnostico":"", "correcao":"", "resultado":""}],
  "testes": [{"o_que":"", "resultado":"", "evidencia":""}],
  "arquivos_tocados": [],
  "proxima_acao": ""
}
```
Em caso de interrupção (sessão fechada, processo morto, PC reiniciado): o
Orquestrador, ao subir, **lê todo `missions/*/MISSION_STATE.json` com
`fase_atual` != "concluída"** e oferece retomar automaticamente a partir de
`proxima_acao` — sem o usuário precisar reexplicar o objetivo.

---

## 20. AUTONOMIA — AUTO MODE vs. PLAN MODE

| | AUTO MODE | PLAN MODE |
|---|---|---|
| Quando | tarefa técnica dentro do escopo, decisão tem resposta tecnicamente melhor | decisão realmente depende de gosto/preferência do usuário, ou é destrutiva/irreversível/cara |
| Comportamento | decide e executa, pesquisa e escolhe sozinho (ex: "React ou Electron" → pesquisa, compara, escolhe) | analisa, apresenta opções, **espera aprovação** |
| Pergunta ao usuário? | só o que é genuinamente ambíguo de negócio (ex: "esse app é para uso pessoal ou para publicar numa loja?" muda arquitetura de verdade) | sempre, antes de agir |

Regra herdada diretamente do padrão já estabelecido nas missões anteriores
desta sessão ("NÃO ME FAÇA PERGUNTAS PARA DECISÕES TÉCNICAS NORMAIS") — e
agora formalizada como propriedade do Orquestrador, não como instrução ad-hoc
repetida a cada prompt.

---

## 21. SEGURANÇA

- **Isolamento**: código gerado por uma tarefa autônoma roda primeiro num
  diretório de trabalho isolado da missão (`missions/<id>/workspace/`), nunca
  direto em produção/VPS/FiveM — reforça a regra absoluta já vigente.
- **Permissões**: Gerenciador de Ferramentas nunca habilita mais do que a
  subtarefa precisa (seção 15).
- **Secrets**: continuam em `config/.env`, nunca em log, nunca em
  `MISSION_STATE`, nunca em relatório — padrão já seguido rigorosamente nesta
  sessão (varredura automática de vazamento a cada entrega).
- **Sandbox**: para código que vai EXECUTAR (não só compilar), considerar rodar
  em processo filho com timeout e sem acesso de rede desnecessário quando a
  origem for uma tarefa gerada automaticamente e ainda não revisada.
- **Rollback**: mantém o padrão já estabelecido (backup + SHA256 + script antes
  de qualquer alteração destrutiva) — se estende a qualquer coisa que o Agente
  crie/altere em nome do usuário.

---

## 22. RESILIÊNCIA

| Falha | Recuperação |
|---|---|
| Provider fora do ar | Sistema de Fallback (já existe) |
| Quota estourada | Sistema de Quota (integração com 9Router, seção 13) |
| Rate limit | cooldown já classificado e diferenciado (`scoring.js`) |
| Timeout | já implementado (watchdog de inatividade no streaming, `CALL_TIMEOUT_MS`) |
| Modelo indisponível | cai pro próximo candidato do score (já existe) |
| Ferramenta falhando | Autocorretor tenta alternativa, ou Gerenciador de Ferramentas troca de ferramenta |
| Processo travado | Sistema de Recuperação reinicia **só o PID específico** (nunca `/IM`, regra absoluta já em vigor) |
| Gateway parado | tarefa agendada `AI-Orchestrator-Gateway` já existe (autostart) |
| Interrupção de sessão | `MISSION_STATE` persistente + retomada automática (seção 19) |

---

## 23. OBSERVABILIDADE

Expandir `logs/gateway.jsonl` (já existe, já funciona) para incluir, por
evento: missão, tarefa, agente usado, modelo, provider, tempo, sucesso/falha,
motivo de fallback, quota restante conhecida — **nunca secrets** (já é regra
seguida hoje, manter). Um painel simples (pode ser a própria interface futura
da seção 24, ou um relatório Markdown gerado sob demanda no curto prazo) lendo
esse log já dá observabilidade suficiente sem inventar infraestrutura nova.

---

## 24. INTEGRAÇÃO COM CLAUDE CODE

Claude Code passa de "cérebro único" a **um dos Executores possíveis**,
acionado pelo Orquestrador quando a subtarefa é: (a) edição de código real em
arquivos, (b) uso de ferramentas de terminal/git, ou (c) quando nenhum modelo
direto resolve sozinho e vale o overhead de uma sessão agêntica completa.
Continua sendo chamado via `claude -p --permission-mode bypassPermissions`
apontando pro Gateway (`ANTHROPIC_BASE_URL=http://localhost:20130`) — mecanismo
já validado em múltiplas tarefas agênticas reais nesta sessão.

---

## 25. REAPROVEITAMENTO DO CLAUDE-CODE-VS-AUTO-ULTIMATE — RESUMO DA DECISÃO

Já detalhado nas seções 3.3 e 7. Resumo executivo do veredito:
- **Aproveitar**: 25 agentes (formato + 2 padrões estruturais), 3 arquivos de
  rules (evidência + coordenação + escopo, adaptado), 1 skill de engenharia
  consolidada, a skill `adaptive-execution`, a ideia de documentação curta e
  específica (`ARQUITETURA.md`/`AUTO-ROUTING.md` como modelo).
- **Descartar**: 135 skills ruflo duplicadas (2x), 3 skills de engenharia
  redundantes, templates YAML rasos, qualquer hook no padrão `cmd /c`
  aninhado, tudo específico do domínio FiveM/Imperion anterior.

---

## 26. FASES DE IMPLEMENTAÇÃO

| Fase | Objetivo | Depende de |
|---|---|---|
| **0** | Baseline e segurança: backup completo do estado atual (Gateway, catálogo, settings), congelar uma versão "conhecida boa" antes de qualquer mudança estrutural | — |
| **1** | Orquestrador Central mínimo: recebe objetivo, decide AUTO/PLAN, cria `MISSION_STATE` vazio | Fase 0 |
| **2** | Planejador: decompõe objetivo em DAG de tarefas, sem execução ainda (só planeja e mostra) | Fase 1 |
| **3** | Execução paralela: Gerenciador de Tarefas + despacho paralelo real de subtarefas independentes (usando o padrão `Agent` + `run_in_background` já comprovado nesta sessão) | Fase 2 |
| **4** | Agentes especialistas: portar e adaptar os 19 papéis da seção 7 para este projeto, com o Gerenciador de Agentes escolhendo automaticamente | Fase 3 |
| **5** | Pesquisa: módulo Pesquisador funcional, alimentando replanejamento automático | Fase 2 |
| **6** | Memória: implementar os 7 tipos (seção 9), começando pelos mais baratos (projeto, erros) | Fase 1 |
| **7** | Roteamento inteligente por subtarefa: expandir `scoring.js`/`server.js` para score por subtarefa em vez de por requisição (seção 11-12) | Fase 3 |
| **8** | Autocorreção: formalizar o ciclo gerar→testar→corrigir como módulo (seção 17) | Fase 4 |
| **9** | Multimídia: fechar o gap de adapters (Cloudflare Flux, Pollinations, ElevenLabs, Whisper, Vision Adapter do 9Router) — hoje classificado mas não executado | Fase 7 |
| **10** | Projetos persistentes: `MISSION_STATE` completo + retomada automática após interrupção (seção 19) | Fase 6 |
| **11** | Observabilidade: expandir telemetria (seção 23) | Fase 3 |
| **12** | Testes extremos: rodar objetivos amplos reais de ponta a ponta (ex: o próprio exemplo do usuário, "app de edição de vídeo"), medir onde quebra | Fases 1-11 |
| **13** | Validação final: regressão completa (9Router, Gateway, Claude Code, tudo que já funciona hoje continua funcionando), relatório final | Fase 12 |
| **14** *(nova, identificada nesta auditoria)* | Higiene e integração do reaproveitamento do CLAUDE-CODE-VS-AUTO-ULTIMATE: portar os 25→19 agentes adaptados, as 3 rules, a 1 skill consolidada — como uma fase própria, não misturada com a Fase 4, porque é trabalho de "curadoria e adaptação de conteúdo existente", não de "construir módulo novo" | Fase 4 |
| **15** *(nova)* | Fusion do 9Router: ativar e testar a estratégia de combo Fusion (paralelo + juiz) para tarefas de pesquisa/comparação — hoje disponível no 9Router e nunca usada | Fase 5 |

---

## 27. DEPENDÊNCIAS

- Node.js (já instalado, v24.18.0) — todo o sistema roda no mesmo runtime do
  Gateway atual, sem nova linguagem/stack.
- 9Router já instalado e saudável — nenhuma dependência nova de infraestrutura.
- Claude Code CLI (já instalado, 2.1.272) — usado como um dos Executores.
- Nenhuma dependência de serviço pago, API paga, ou biblioteca com cobrança —
  confirmado nesta auditoria em cada seção.

---

## 28. RISCOS

| Risco | Mitigação |
|---|---|
| Complexidade do Orquestrador crescer sem controle | Implementação faseada (26), cada fase testada isoladamente antes da próxima |
| Regressão do que já funciona (tool-calling, streaming, fallback) | Regra já em vigor: backup+rollback antes de qualquer mudança, regressão completa a cada fase (padrão já seguido em todas as missões anteriores desta sessão, incluindo um rollback real já executado) |
| Reaproveitar hook frágil do projeto de referência | Explicitamente descartado na seção 7 — dois projetos independentes já sofreram com o mesmo padrão `cmd /c` |
| Copiar peso morto (135 skills, 3 skills redundantes) | Explicitamente descartado, com justificativa técnica documentada |
| Autonomia excessiva tomando decisão que devia ser do usuário | AUTO MODE vs PLAN MODE formalizado (seção 20) com critério claro de quando parar |
| 9Router atualizar (v0.5.75) e mudar comportamento | Não faz parte deste plano — permanece decisão separada, com backup do SQLite antes, como já documentado |
| Quota dos 3 providers diretos esgotar durante testes extensos | Sistema de Quota (13) + 9Router como rede de segurança adicional |

---

## 29. ROLLBACK

Mesmo padrão já validado em todas as fases anteriores desta missão: backup
datado em `Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/<FASE>_<data>/` com
`SHA256SUMS.txt` e `ROLLBACK.sh` **antes** de qualquer alteração, nunca depois.
Cada fase da seção 26 tem seu próprio checkpoint de rollback — uma fase que
piorar o sistema é revertida imediatamente (como já aconteceu de forma real
nesta sessão com o fix de hooks) e documentada, nunca escondida.

---

## 30. CRITÉRIOS DE SUCESSO

O sistema estará pronto quando conseguir, **sem intervenção passo a passo do
usuário**, receber um objetivo amplo como *"crie um aplicativo de edição de
vídeo profissional"* e:
1. Entender o objetivo (Orquestrador decide AUTO MODE, sem perguntar o óbvio);
2. Pesquisar tecnologias/concorrentes/bibliotecas em paralelo real;
3. Planejar e decompor em tarefas com dependência mapeada;
4. Escolher modelo certo por subtarefa (não 1 modelo pra tudo);
5. Escolher agente certo por subtarefa;
6. Escolher ferramentas mínimas necessárias;
7. Executar (programar de verdade, arquivos reais);
8. Testar de verdade (execução real, não "deveria funcionar");
9. Corrigir automaticamente o que falhar;
10. Revisar com poder de veto antes de considerar pronto;
11. Entregar com evidência real do que foi feito;
12. Persistir estado o suficiente para sobreviver a uma interrupção de horas/dias;
13. Nunca ter custado um único real.

---

## 31. AUTORREVISÃO FINAL (checklist pedido na PARTE FINAL do prompt)

1. ✅ **Lacunas procuradas e incluídas**: adicionei 2 fases não pedidas
   explicitamente (14 — curadoria do reaproveitamento, 15 — ativar Fusion do
   9Router) porque a auditoria mostrou que são necessárias e específicas o
   suficiente para não ficarem diluídas dentro de outras fases.
2. ✅ **Nenhuma dependência de serviço pago** — confirmado seção por seção
   (27); tudo roda sobre 9Router + os 3 providers gratuitos já validados +
   Claude Code já instalado.
3. ✅ **Preserva o 9Router atual** — nenhuma ação desta auditoria alterou o
   9Router (PID 10760 intacto o tempo todo); o plano trata o 9Router como
   motor de execução a ser mais bem aproveitado, não substituído.
4. ✅ **Aproveita o CLAUDE-CODE-VS-AUTO-ULTIMATE** — seções 3.3, 7 e 25
   detalham exatamente o quê, com justificativa técnica para cada decisão de
   aproveitar/descartar (baseada em exploração real do projeto, não suposição).
5. ✅ **Suporta execução paralela** — seção 6, com exemplo concreto derivado
   do próprio pedido do usuário, e mecanismo explícito de dependência vs.
   independência.
6. ✅ **Suporta autocorreção** — seção 17, formalizando um padrão já usado
   manualmente nesta sessão em pelo menos duas missões anteriores.
7. ✅ **Suporta projetos grandes** — seção 19, com schema concreto de
   `MISSION_STATE` e mecanismo de retomada automática após interrupção.
8. ✅ **Permite construir a interface própria no futuro** — seção 24 trata o
   Claude Code como Executor plugável, não como dependência estrutural; a
   arquitetura de módulos (5) já separa estado (`MISSION_STATE`) de
   apresentação, o que é pré-requisito para qualquer interface futura (CHAT,
   PROJETOS, ARQUIVOS, TERMINAL, etc. da PARTE 23 do pedido) ler o mesmo
   estado sem precisar do Claude Code como intermediário.
9. ✅ **Nenhuma credencial exposta neste documento** — revisado, nenhuma chave,
   token ou senha aparece em nenhuma seção.
10. ✅ **Este documento é só o plano** — nenhum código foi escrito, nenhum
    módulo foi implementado, nenhuma configuração foi alterada como parte desta
    entrega (as únicas ações desta sessão foram leitura/auditoria + a tentativa
    de login no dashboard do 9Router, que foi bloqueada pelo próprio ambiente e
    abandonada sem insistir).

---

**Entrega concluída. Aguardando aprovação explícita antes de iniciar a
FASE 0 de implementação — conforme instrução: "NÃO EXECUTE O PLANO."**
