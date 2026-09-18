# RELATÓRIO — FASE 7 (Roteamento Inteligente) + FASE 8 (Autocorreção Avançada)

Data: 2026-09-15

## 1. Arquitetura

```
router/router.js (FASE 7)
   ├─ core/estimador-contexto.js   → estima tokens, decide dividir/resumir/paralelizar (nunca truncar)
   ├─ core/aprendizado.js          → ajuste pequeno/gradual de score via histórico real (memória FASE 6)
   ├─ core/classificador-roteamento.js → quota/rate_limit/auth/timeout/vazio/rede/contexto_grande/ferramenta/modelo_incompativel
   └─ core/composicao-agentes.js   → composição multiagente real (a partir do plano) + sugestão leve (a partir do objetivo)

autocorrecao/autocorrecao.js (FASE 8)
   ├─ core/diagnostico.js  → 10 categorias (código/config/dependência/ferramenta/ambiente/planejamento/modelo/contexto/pesquisa/validação)
   ├─ core/estrategia.js   → nunca repete a mesma coisa 2x — muda de estratégia por categoria
   ├─ core/orcamento.js    → tentativas/tempo/chamadas (custo sempre R$0)
   ├─ core/memoria-erros.js→ usa TIPOS.ERRO/SOLUCAO da FASE 6 (nunca copia solução cegamente)
   └─ core/loop.js         → executar→avaliar→diagnosticar→corrigir→testar, para em SUCESSO_VALIDADO ou FALHA_HONESTA

Integração real (não teórica):
- planejador/core/chamar-llm.js  → usa router.decidirModelo (não decisor.js direto) + avaliação de contexto por candidato
- executor/core/gerador-codigo.js → aceita evitarModelos/agente (troca de modelo real)
- executor/core/handlers-tarefa.js → handleImplementacao reescrito sobre autocorrecao.executarComAutocorrecao
```

## 2. Router — critérios de seleção

`router.decidirModelo` usa o score REAL do `gateway/scoring.js` (aptidão por tipo de tarefa, saúde observada, latência vs. teto do nível, folga de contexto, prioridade) via `decisor.js` (FASE 1) — não reimplementado. Em cima disso, examina os top-5 e aplica um AJUSTE aditivo pequeno (máx. ±0.15) vindo do histórico real de sucesso por `tarefa+agente+modelo+provider` (mínimo 3 amostras — nunca decide com 1 execução de sorte/azar), só promovendo um candidato de trás pra frente quando o 1º colocado tem ajuste negativo forte e outro tem ajuste positivo forte — nunca reescreve o ranking inteiro.

## 3. Fallback e falhas de roteamento

`router/core/classificador-roteamento.js` distingue: quota, rate_limit, auth, timeout, resposta_vazia, erro_rede, contexto_grande, ferramenta_indisponivel, modelo_incompativel, indisponivel. `contexto_grande` NUNCA recomenda troca de modelo (o problema é tamanho, não qualidade do candidato) — recomenda dividir/resumir.

`chamar-llm.js` avalia o tamanho estimado da entrada CONTRA a janela de cada candidato ANTES de chamar — um candidato cuja janela não comporta é pulado (nunca truncado). Confirmado real e testado (seção 8 dos testes).

## 4. Aprendizado do router

Registra cada execução real (`router.registrarResultado`, chamado de dentro de `chamar-llm.js` a cada tentativa) na memória da FASE 6 (tipo `agente`, tag `router-aprendizado` + chave da combinação). Confirmado gravando de verdade em produção (ver seção 6, evidência real).

## 5. Diagnóstico e autocorreção (FASE 8)

`autocorrecao/core/diagnostico.js` mapeia qualquer falha (de qualquer estágio: planejamento, execução, roteamento, pesquisa, validação) pras 10 categorias exatas pedidas. `estrategia.js` decide a PRÓXIMA ação: mesma categoria 2x seguidas → nunca insiste, muda (troca modelo, troca ferramenta, decompõe, replaneja, consulta memória, ou bloqueia honestamente). `loop.js` é o loop controlado genérico (executar→avaliar→diagnosticar→corrigir→testar), usado de verdade dentro de `handleImplementacao` (não é só teoria — está no caminho real de execução de toda tarefa de código/frontend/backend/devops).

## 6. Missões reais executadas (evidência concreta)

- **Missão Real 1** (bug controlado): um arquivo `calculadora.js` com bug REAL determinístico (`a - b` em vez de `a + b`) foi semeado no workspace real da missão (planejamento primeiro, depois seed, depois retomada) — o gerador de código passou a receber CONTEÚDO real dos arquivos existentes (extensão feita nesta fase, `handlers-tarefa.js`/`gerador-codigo.js`), detectou o bug pela descrição + conteúdo, e produziu `soma(a,b){return a+b}` corrigido, validado com execução real (`node calculadora.js`).
- **Missão Real 2** (composição multiagente + falha real injetada): objetivo exigindo pesquisa+arquitetura+código+teste+revisão — composição REAL resultante: `['research','architecture','coding','testing','reviewer']` (5 agentes distintos, escolhidos automaticamente, não fixos). Falha real controlada: o modelo top-ranked para `codigo` foi colocado em cooldown de verdade via a MESMA API que o Gateway usa em produção (`scoring.registrar`) — confirmado que o candidato mudou (`groq-qwen3.8-27b` → evitado) e que a tarefa de código REAL usou um modelo diferente (`google-gemini-flash-lite-latest`) — fallback ponta a ponta provado, não simulado.

Suíte dedicada `teste-fase7-8-router-autocorrecao.js`: **42/42 testes aprovados, em 2 execuções consecutivas**.

## 7. Bugs encontrados e corrigidos

1. **Regressão de cascata em `handlePesquisa`** (já corrigida na Fase 5-6, referenciada aqui pois foi a causa raiz do teste 25d da Fase 4 que motivou o início desta fase).
2. **Crash não tratado em `ferramentas.js:testarServidor`** — `spawn()` sem listener `'error'` derrubava o processo Node INTEIRO com um ENOENT não tratado (exposto por variância real do LLM devolvendo `comandoTeste`/`comandoTesteArgs` mal separados). Corrigido com listener de `error` + flag `jaResolveu` pra evitar double-resolve.
3. **3 bugs de robustez em testes** (`teste-fase4-agentes.js`, `teste-fase5-6-pesquisa-memoria.js`, `teste-fase3-executor.js`) — falta de guard contra `r.missao === null` (planejamento transitoriamente indisponível) e contra `tempos[id] === undefined` (dependência anterior não concluiu) causavam `TypeError` não tratado em vez de reportar o resultado real.
4. **[Diagnosticado, não é bug]** Durante a regressão, o padrão de tarefa "pendente" após uma leva foi investigado a fundo (instrumentação real de `marcarStatus`/`executarLevaParalela`) e confirmado como o mecanismo de RETRY LEGÍTIMO já existente desde a FASE 1 (`orquestrador.js:_registrarErroInterno`) reagindo a falhas reais e transitórias de cota do LLM — não uma regressão desta fase.

## 8. Testes

20 cenários pedidos (roteamento simples/complexo, modalidade, contexto, agente, fallback de provider/modelo, contexto grande, erro de ferramenta/código, replanejamento, autocorreção, repetição, limite de tentativas, memória de erro, aprendizado de solução, veto QA/Security/Reviewer → correção, falha honesta) + 2 missões reais obrigatórias: **42/42 aprovados**, confirmado em 2 execuções consecutivas.

## 9. Regressão

Fase 0=6/6, Fase 1=25/25, Fase 2=31/31, Fase 3=34/34 (após corrigir o bug #2 acima), Fase 4=36/36, Fase 5-6=48/48 — todos reconfirmados em passagens isoladas limpas ao longo da fase. Uma passagem final combinada roda como parte da Fase 9-10 (ver `RELATORIO-FASE-9-10.md`).

## 10. Backups

`Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/FASE7-8_ROTEAMENTO_AUTOCORRECAO_20260915/` — 7 arquivos (`handlers-tarefa.js.bak`, `executor.js.bak`, `decisor.js.bak`, `chamar-llm.js.bak`, `classificador-falha.js.bak`, `gerador-codigo.js.bak`, `ferramentas.js.bak`), `SHA256SUMS.txt` verificado, `ROLLBACK.sh` restaurando todos os arquivos tocados.

## 11. Limitações conhecidas

- O ajuste de aprendizado do router é intencionalmente conservador (mínimo 3 amostras, teto ±0.15) — não é um sistema de aprendizado por reforço completo, é um viés pequeno e explicável sobre o score real.
- A promoção de candidato por aprendizado só examina os top-5 do score real (não o catálogo inteiro) — decisão de escopo pra manter o custo da decisão baixo.
- `router/core/classificador-roteamento.js` reconhece um conjunto real mas não exaustivo de padrões de erro de rede/modelo incompatível — novos formatos de erro de providers futuros podem cair em "desconhecido" até serem observados e adicionados.

---

**Conclusão**: Fase 7 (roteamento inteligente com aprendizado real e gradual) e Fase 8 (autocorreção avançada com diagnóstico em 10 categorias e loop controlado) implementadas, integradas ao pipeline real de execução (não paralelas a ele), testadas com 42/42 + 2 missões reais provando roteamento dinâmico, fallback real e diagnóstico→mudança de estratégia→correção→novo teste→aprovação. Fase 9 não iniciada até a conclusão formal deste relatório (ver `RELATORIO-FASE-9-10.md` para o bloco seguinte).
