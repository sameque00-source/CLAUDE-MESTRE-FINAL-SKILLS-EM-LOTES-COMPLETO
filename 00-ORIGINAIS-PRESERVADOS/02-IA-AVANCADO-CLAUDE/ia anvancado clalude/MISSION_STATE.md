# MISSION_STATE — Evolução do Agente sobre o 9Router

> **Este é o estado desta EVOLUÇÃO específica** (Agente de IA Geral sobre o
> 9Router, `PLANO-MESTRE-AGENTE-9ROUTER.md`). O `MISSION_STATE.md` oficial da
> infraestrutura AI-ORCHESTRATOR (fallback, tool-calling, streaming, scoring)
> continua em `C:\Users\Administrator\Documents\AI-ORCHESTRATOR\MISSION_STATE.md`
> e **não foi apagado nem substituído** — esta é uma referência complementar,
> específica desta evolução, guardada aqui conforme instruído.

## FASE ATUAL
**FASE 5 + 6 — Pesquisa Web Autônoma + Memória Inteligente (combinadas).** Concluída.

## STATUS
✅ Concluída, testada, corrigida, revisada. **180/180 testes em passagens
isoladas limpas** (48 novos da FASE 5+6 + 132 de regressão de FASE 0-4).
Pesquisa web real via 3 providers gratuitos sem chave (npm registry,
Wikipedia REST, DuckDuckGo Instant Answer), com fallback, cache por
categoria, classificação de fonte, triangulação via LLM e pesquisa
adaptativa. Memória evoluída (8 tipos, expiração variável, invalidação
explícita, confiança nunca absoluta, sanitização anti-secret/anti-injeção)
com integração bidirecional real: pesquisa alimenta memória, memória evita
pesquisa redundante (demonstrado com execução real, não só teste unitário).
9Router (PID 10760) e Gateway (PID 6524) saudáveis e intocados. Relatório
completo em `RELATORIO-FASE-5-6.md`.

## CONCLUÍDO NA FASE 0
Baseline segura + curadoria de 19 agentes/3 rules/2 skills do
`CLAUDE-CODE-VS-AUTO-ULTIMATE` em `base-agente/`. 6/6 testes.

## CONCLUÍDO NA FASE 1
`orquestrador/` — Missão, Tarefa, máquina de estados, DAG, paralelismo,
decisor, gerenciador de agentes, persistência. 25/25 testes.

## CONCLUÍDO NA FASE 2
`planejador/` — decomposição automática real via LLM, classificador de
complexidade determinístico, revisor com correção de lacuna, replanejador.
31/31 testes. 2 bugs pré-existentes da FASE 1 corrigidos.

## CONCLUÍDO NA FASE 3
`executor/` — execução autônoma real: ferramentas reais (Read/Write/Edit/
Bash/testarServidor), autocorreção de código, recuperação após interrupção.
34/34 testes. 3 bugs reais corrigidos (servidor de longa duração, tipo fora
do enum, falha de processo).

## CONCLUÍDO NA FASE 4
- `agentes/` — `registro-especialistas.js` (19 especialistas mapeados:
  ferramentas, tipo p/ scoring, veto, somente-leitura), `contrato.js`
  (INPUT/CONTEXT/OBJECTIVE/TOOLS/CONSTRAINTS/EXPECTED_OUTPUT/
  SUCCESS_CRITERIA), `consolidador.js` (funde resultados paralelos,
  detecta divergência real), `memoria-agentes.js` (log de uso).
- Persona real (corpo dos `.md` da FASE 0) injetada em todo prompt de
  execução via `executor/core/handlers-tarefa.js` (estendido).
- **Veto de qualidade real**: `handleQA` roda teste real antes de julgar;
  `handleSecurity` varre o workspace com 5 padrões determinísticos reais
  (chave hardcoded, senha, comando destrutivo, eval, SQL por
  concatenação); ambos podem **reabrir** a tarefa de implementação (não só
  reprovar em log) — `grafo.reabrirTarefa()` novo, busca transitiva na
  cadeia de dependências.
- **36/36 testes novos**, incluindo as 2 missões reais obrigatórias
  (analisar app existente + missão complexa com 5 especialistas).
- **96/96 testes de regressão** (FASE 0-3) reconfirmados.
- **3 bugs reais corrigidos**, um deles **crítico**: revisor via arquivo
  real (2994-3891 bytes) cortado numa amostra de 800-1000 caracteres e
  reportava CORRETAMENTE "truncado" — o bug era o corte da amostra, não o
  código gerado. Isso causava reprovações falsas em cascata em qualquer
  arquivo real maior que ~1KB. Corrigido (limite subido, corte rotulado
  quando genuíno). Provado ao vivo: Security vetou um secret hardcoded de
  propósito, o sistema tentou corrigir, o modelo se recusou a repetir o
  padrão inseguro, e o sistema declarou FALHA honesta em vez de fingir
  sucesso.

## CONCLUÍDO NA FASE 5+6
- `pesquisa/` (novo) — `pesquisa.js` (pipeline principal), `core/providers/`
  (npm, wikipedia, duckduckgo), `core/provider-busca.js` (fallback +
  cooldown local), `core/extrator.js` (open() real), `core/classificador-
  fonte.js`, `core/cache-pesquisa.js` (validade por categoria),
  `core/pesquisa-adaptativa.js`, `core/triangulacao.js` (reaproveita
  chamar-llm.js da FASE 2), `core/confianca.js`.
- `memoria/` (novo) — `memoria.js` (entrada principal), `core/tipos.js` (8
  tipos), `core/sanitizacao.js`, `core/armazenamento.js` (JSON atômico),
  `core/expiracao.js`, `core/confianca.js`, `core/recall.js`. Reexporta
  `agentes/core/memoria-agentes.js` (FASE 4) sem alterá-lo.
- `executor/core/handlers-tarefa.js` (modificado, backup prévio) —
  `handlePesquisa` novo (RECALL→busca web se preciso→grava em memória).
- **7 bugs reais corrigidos** (query em linguagem natural quebrando busca
  npm; memória não reutilizada entre missões — 2 causas; bug crítico de
  tokenização Unicode causando memória do pacote errado sendo reaproveitada,
  mesmo bug corrigido proativamente em `agentes/core/consolidador.js` da
  FASE 4; nomes de pacote compostos com hífen colidindo; bug no próprio
  teste 29; **regressão de cascata de cancelamento** — pesquisa sem
  resultado cancelava tarefas de código/revisão dependentes, corrigido para
  retornar `ok` com nota honesta de ausência de fonte em vez de `erro`) + 3
  bugs de robustez em testes (crash por falta de guard contra
  `missao===null`/`tempos[id]===undefined` sob variância real de LLM/quota).
- **48/48 testes novos**, incluindo os 6 cenários obrigatórios (missão real
  com pesquisa real, reutilização de memória entre missões, atualização de
  memória expirada, detecção de conflito entre fontes, segurança/sanitização,
  paralelismo real medido por timestamp).
- **132/132 testes de regressão** (FASE 0-4) reconfirmados em passagens
  isoladas limpas.
- Detalhe técnico completo em `RELATORIO-FASE-5-6.md`.

## PENDÊNCIAS
Nenhuma bloqueante. Para as fases futuras (ver
`PLANO-MESTRE-AGENTE-9ROUTER.md` seção 26):
- Fase 7+: não iniciada, conforme escopo explícito desta missão (só FASE
  5+6 autorizadas nesta rodada).
- Fase 9: Gerenciador de Multimídia (`image`/`audio`/`video` sem agente
  dedicado, gap confirmado desde a FASE 0).
- Reabertura por veto não reabre explicitamente tarefas intermediárias de
  tipo `teste` na cadeia (funciona via variável compartilhada, mas seria
  mais limpo reabrir a cadeia inteira).
- Relevância de recall usa lista fixa de stopwords-molde
  (`PALAVRAS_MOLDE_IGNORADAS`); uma abordagem TF-IDF/embeddings seria mais
  robusta a novas frases-template do Planejador (ver limitações em
  `RELATORIO-FASE-5-6.md` seção 12).

## ARQUIVOS (acumulado FASE 0-6, todos em `Downloads\ia anvancado clalude\`)
```
ia anvancado clalude/
├── MISSION_STATE.md
├── RELATORIO-FASE-0.md / -1.md / -2.md / -3.md / -4.md / -5-6.md
├── base-agente/          (FASE 0 — 19 agentes, 3 rules, 2 skills)
├── orquestrador/          (FASE 1, estendido FASE 2/4)
├── planejador/             (FASE 2, estendido FASE 4)
├── executor/                (FASE 3, estendido FASE 4/5-6)
├── agentes/                  (FASE 4 — especialistas reais, consolidador
│   │                          corrigido na FASE 6)
│   ├── core/ (registro-especialistas, contrato, consolidador, memoria-agentes)
│   └── logs/agentes.jsonl
├── pesquisa/                  (FASE 5 — pesquisa web real)
│   ├── pesquisa.js
│   ├── core/ (providers/, provider-busca, extrator, classificador-fonte,
│   │          cache-pesquisa, pesquisa-adaptativa, triangulacao, confianca)
│   └── dados/cache-pesquisa.json
├── memoria/                    (FASE 6 — memória inteligente)
│   ├── memoria.js
│   ├── core/ (tipos, sanitizacao, armazenamento, expiracao, confianca, recall)
│   └── dados/*.json (por tipo)
└── testes/
    ├── suite-regressao-fase0.js
    ├── teste-fase1-orquestrador.js
    ├── teste-fase2-planejador.js
    ├── teste-fase3-executor.js
    ├── teste-fase4-agentes.js
    └── teste-fase5-6-pesquisa-memoria.js
```

## ARQUIVOS EXISTENTES DO SISTEMA (fora desta pasta) ALTERADOS
**Nenhum.** `gateway/scoring.js`, `gateway/providers.js`,
`catalog/models.json` — hashes idênticos ao baseline em todas as fases,
incluindo 5+6.

## BACKUPS
- `FASE0_AGENTE_9ROUTER_20260915\` — baseline geral.
- `FASE2_PLANEJADOR_20260915\` — Tarefa.js, grafo-tarefas.js, decisor.js.
- `FASE3_EXECUTOR_20260915\` — prompt-decomposicao.js (checkpoint tardio).
- `FASE4_AGENTES_20260915\` — handlers-tarefa.js, gerador-codigo.js,
  executor.js, classificador-falha.js, grafo-tarefas.js,
  prompt-decomposicao.js (todos com backup prévio à alteração).
- `FASE5-6_PESQUISA_MEMORIA_20260915\` — 8 arquivos de backup com
  `SHA256SUMS.txt` verificado e `ROLLBACK.sh` (sintaxe validada,
  restaura os 6 arquivos de produção tocados nesta fase, incluindo
  `consolidador.js`): `handlers-tarefa.js.bak` (original pré-fase),
  `handlers-tarefa.js.antes-fix-cascata.bak` (checkpoint intermediário),
  `memoria-agentes.js.bak`, `prompt-decomposicao.js.bak`, `executor.js.bak`
  (preemptivos, arquivos não tocados de fato), `consolidador.js.bak`,
  `teste-fase3-executor.js.antes-nullguard.bak`,
  `teste-fase3-executor.js.antes-nullguard-dependencia.bak`.

## TESTES
- `suite-regressao-fase0.js`: **6/6**
- `teste-fase1-orquestrador.js`: **25/25**
- `teste-fase2-planejador.js`: **31/31**
- `teste-fase3-executor.js`: **34/34**
- `teste-fase4-agentes.js`: **36/36**
- `teste-fase5-6-pesquisa-memoria.js`: **48/48**
- **Total acumulado: 180/180** (todas em passagens isoladas limpas — ver
  `RELATORIO-FASE-5-6.md` seção 7 para a nota honesta sobre degradação
  transitória de quota do LLM observada em reruns em sequência ao final da
  sessão, confirmada como condição externa, não regressão de código)

## PROBLEMAS
Nenhum bloqueante. 7 bugs reais + 3 bugs de robustez em testes da FASE 5+6
foram todos corrigidos dentro da própria fase (ver `RELATORIO-FASE-5-6.md`
seção 6). Limitação conhecida e não-bloqueante: relevância de recall via
lista fixa de stopwords-molde (seção 12 do relatório).

## CORREÇÕES
Ver `RELATORIO-FASE-5-6.md` seção 6 para o detalhe técnico completo dos 10
bugs corrigidos nesta fase.

## PRÓXIMO BLOCO
**FASE 7+** — não iniciada nesta rodada, conforme escopo explícito do
mandato (concluir apenas FASE 5+6). Aguardando aprovação explícita antes de
iniciar qualquer fase seguinte (ver `PLANO-MESTRE-AGENTE-9ROUTER.md` seção
26 para o roteiro completo).
