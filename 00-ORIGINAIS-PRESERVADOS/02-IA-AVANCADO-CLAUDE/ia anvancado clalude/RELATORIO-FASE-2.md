# RELATÓRIO — FASE 2: PLANEJADOR AUTOMÁTICO DO AGENTE 9ROUTER

**Data:** 2026-09-15
**Escopo:** `PLANO-MESTRE-AGENTE-9ROUTER.md`, Fase 2 — decomposição automática de
objetivo amplo em plano executável
**Resultado:** ✅ Fase 2 concluída — 31/31 testes aprovados, 3 bugs reais
encontrados e corrigidos durante o próprio desenvolvimento, 9Router e Gateway
intocados e saudáveis.

---

## 1. OBJETIVO

Construir o Planejador que recebe um objetivo amplo em linguagem natural
("Crie um aplicativo profissional de edição de vídeo") e o transforma
automaticamente — sem o usuário montar nada manualmente — em: interpretação,
requisitos, entregáveis, tarefas, subtarefas, dependências, tarefas
paralelas, agentes necessários, ferramentas necessárias, metadados para o
roteador de modelos, ordem de execução, critérios de teste e critérios de
conclusão.

## 2. ARQUITETURA DO PLANNER

```
planejador/
├── planejador.js               — classe Planejador (ponto de entrada: planejar/replanejar)
└── core/
    ├── prompt-decomposicao.js   — contrato de saída JSON que o LLM precisa respeitar
    ├── chamar-llm.js             — ponte real com decisor+ADAPTERS (integra scoring.registrar)
    ├── json-robusto.js           — extração/REPARO de JSON truncado
    ├── classificador-complexidade.js — nível 0-4 por SINAIS reais do plano, não por keyword
    ├── construtor-plano.js       — JSON do LLM → Missão/Tarefas reais da FASE 1
    ├── criterios.js              — garante critério de conclusão em toda tarefa
    ├── revisor-plano.js          — detecção de lacunas + correção automática
    └── replanejador.js           — nova informação → atualiza DAG sem apagar histórico
```

### Fluxo real implementado
```
objetivo (texto livre)
  → prompt estruturado → chamada REAL ao LLM (via decisor+adapters da FASE 1)
  → JSON decomposto (interpretação, requisitos, entregáveis, riscos, tarefas)
  → construção do grafo REAL na Missão (FASE 1: criarMissao, adicionarTarefa,
     adicionarDependencia — dependências em 2 passos porque os ids do LLM são
     locais e precisam ser traduzidos pros ids reais da missão)
  → classificação de complexidade DETERMINÍSTICA (conta sinais do grafo já
     construído: nº de tarefas, dependências, ferramentas, agentes distintos,
     tarefas que precisam pesquisa, riscos, multimodalidade)
  → transição de estado ANALISANDO → PLANEJANDO (máquina de estados da FASE 1)
  → auto-revisão: detecta lacuna → corrige o que dá pra corrigir sozinho →
     adiciona tarefa de validação se faltar
  → fecharPlanejamento (FASE 1): PLANEJANDO → EXECUTANDO ou AGUARDANDO_DEPENDENCIA
  → PLANO estruturado devolvido, "executável" de verdade (testado: dá pra
     rodar via orquestrador.executarProntas sem nenhum ajuste manual)
```

## 3. ARQUIVOS CRIADOS

Todos em `C:\Users\Administrator\Downloads\ia anvancado clalude\`:
```
planejador/planejador.js
planejador/core/prompt-decomposicao.js
planejador/core/chamar-llm.js
planejador/core/json-robusto.js
planejador/core/classificador-complexidade.js
planejador/core/construtor-plano.js
planejador/core/criterios.js
planejador/core/revisor-plano.js
planejador/core/replanejador.js
testes/teste-fase2-planejador.js
RELATORIO-FASE-2.md                     (este arquivo)
```
9 módulos de código + 1 suíte de testes.

## 4. ARQUIVOS ALTERADOS (extensões aditivas à FASE 1, com backup prévio)

| Arquivo | Mudança | Por quê |
|---|---|---|
| `orquestrador/core/Tarefa.js` | +`STATUS.CANCELADA`; +6 campos opcionais (`ferramentas`, `criterioConclusao`, `precisaPesquisa`, `justificativaPesquisa`, `decisaoUsuario`, `motivoDecisaoUsuario`, `agenteFuncaoSugerida`) | seção 13 do pedido (replanejamento nunca apaga, só cancela) e seção 12 (critério de conclusão obrigatório) |
| `orquestrador/core/grafo-tarefas.js` | +`cancelarTarefa()` (com cascata conservadora); `tarefaEstaPronta`/`missaoCompleta` passam a tratar `CANCELADA` como dependência resolvida | mesma seção 13 |
| `orquestrador/core/decisor.js` | **2 correções de bug real**, ver seção 14 abaixo | descobertos em teste real desta fase |

**Nenhuma dessas mudanças é reescrita** — são extensões aditivas testadas
contra a suíte da FASE 1 antes e depois (25/25 em ambas as rodadas).

## 5. ARQUIVOS NÃO ALTERADOS

`gateway/server.js`, `gateway/providers.js`, `gateway/scoring.js`,
`gateway/classify.js`, `catalog/models.json`, `settings.json`,
`settings.local.json`. Hashes de `scoring.js`/`models.json` conferidos
idênticos ao baseline da FASE 0/1.

## 6. INTEGRAÇÃO COM A FASE 1

Total, sem duplicação:
- **Missão/Tarefa**: o Planner só chama `criarMissao`/`criarTarefa` já
  existentes, com os campos novos passados como opções.
- **DAG**: `grafo.adicionarTarefa`/`adicionarDependencia` (detecção de ciclo
  da FASE 1 reaproveitada sem alteração).
- **Máquina de estados**: `transicionar()` chamado diretamente, respeitando a
  tabela de transições já validada.
- **Paralelismo**: testado executando o plano de vídeo real via
  `orquestrador.executarProntas()` — não reimplementado.
- **Gerenciador de agentes**: `getAgentePorFuncao()` chamado para cada tarefa
  com `agenteFuncao` sugerido pelo LLM.
- **Decisor/scoring**: `chamar-llm.js` usa `decisor.decidirModelo()` para
  escolher o modelo de CADA chamada de planejamento, e agora também chama
  `scoring.registrar()` a cada tentativa (ver bug corrigido, seção 14).
- **Persistência**: `persistencia.salvar()`/`carregar()` reaproveitados sem
  alteração — testado: a missão produzida pelo Planner sobrevive a um "novo
  processo" como qualquer outra.

## 7. DECOMPOSIÇÃO AUTOMÁTICA

Real, via LLM (não lista fixa) — confirmado com objetivos de natureza bem
diferente gerando planos estruturalmente diferentes:
- *"Corrija a ortografia..."* → 3-5 tarefas, nível 0-1.
- *"Crie um pequeno projeto web de demonstração"* → 2-6 tarefas, nível 1-3
  (calibrado após correção de proporcionalidade, seção 11 abaixo).
- *"Crie um aplicativo profissional de edição de vídeo"* → 8-11 tarefas,
  nível 4, 2+ tarefas paralelas de pesquisa, 6-8 agentes distintos.

## 8. GRAFO DE TAREFAS (DAG)

Construção em 2 passos (necessária porque o LLM usa ids locais `t1, t2...`):
cria todas as tarefas sem dependência, mapeia local→real, depois aplica as
dependências reais via `grafo.adicionarDependencia` (que já valida ciclo).
Dependência para um id que o LLM inventou e não existe no próprio plano é
descartada com aviso registrado em `plano.validacoes` — nunca derruba o
planejamento inteiro por causa de uma aresta inválida.

## 9. PARALELISMO

Confirmado real no teste de integração: o plano de "app de edição de vídeo"
gerado automaticamente foi executado de ponta a ponta pelo
`orquestrador.executarProntas()` da FASE 1, e tarefas sem dependência entre
si rodaram na mesma leva paralela — o Planner não teve que fazer nada
especial para isso, só construir o DAG corretamente; o paralelismo real já
era da FASE 1.

## 10. AGENTES

`agenteFuncao` sugerido pelo LLM por tarefa (`researcher`, `architect`,
`developer`, `frontend`, `backend`, `qa`, `reviewer`, `security`, `devops`,
...) é resolvido para o agente real da base curada via
`gerenciadorAgentes.getAgentePorFuncao()`. Quando a função pedida não tem
agente correspondente (gap real, ex: `multimedia`), o Planner **não
inventa** — registra aviso em `plano.validacoes` e segue sem agente
designado para aquela tarefa.

## 11. FERRAMENTAS

Cada tarefa carrega `ferramentas` (lista estimada pelo LLM, dentre
navegador/terminal/arquivos/git/compilador/testes/multimidia/mcp/api) —
consolidadas em `plano.ferramentasRecomendadas`. Nenhuma ferramenta é
habilitada por padrão; a lista reflete só o que a tarefa realmente precisa.

## 12. CLASSIFICAÇÃO DE COMPLEXIDADE

Determinística (seção 7 do pedido: "não classifique apenas por
palavras-chave"). Fórmula pontua 8 sinais reais extraídos do plano JÁ
decomposto: número de etapas, número de dependências, ferramentas distintas,
agentes distintos, tarefas que precisam pesquisa, número de riscos,
multimodalidade, presença de decisão pendente do usuário. Testado e
calibrado: "corrigir ortografia" cai em nível 0-1, "app de edição de vídeo"
cai em nível 4, de forma consistente entre execuções (mesmo com variação
normal do LLM na decomposição em si).

## 13. CRITÉRIOS DE CONCLUSÃO

Nenhuma tarefa fica sem critério (seção 12: "não permitir tarefas sem
critério de término"). Preferência: usar o `criterioConclusao` que o LLM já
devolveu (mais específico); se vier vazio, cai num template por `tipo`
(pesquisa, código, arquitetura, teste, revisão, documentação, devops...).
Testado: `garantirCriteriosEmTodasAsTarefas` roda em todo plano antes de
construir o grafo — 0 tarefas sem critério em todos os testes.

## 14. PROBLEMAS ENCONTRADOS E CORRIGIDOS (durante o desenvolvimento desta fase)

Todos encontrados em teste REAL, não hipotéticos — a suíte falhou de
verdade, foi diagnosticada, corrigida, testada de novo:

1. **JSON truncado em planos grandes** — `max_tokens` de 2500 era
   insuficiente para planos com muitas tarefas + prosa longa, cortando o
   JSON no meio. **Corrigido em duas frentes**: (a) `max_tokens` elevado
   para 6000 na chamada de decomposição; (b) `json-robusto.js` ganhou um
   reparador de truncamento (`repararJSONTruncado`) que recupera os objetos
   de tarefa que fecharam completos antes do corte, em vez de descartar o
   plano inteiro.
2. **Modalidade multimodal não detectada** — o schema de exemplo no prompt
   mostrava `"modalidade": ["texto"]` como único exemplo, e modelos mais
   fracos copiavam esse valor literalmente em vez de raciocinar sobre a
   necessidade real. **Corrigido**: exemplo trocado para `["texto","visao"]`
   com instrução explícita listando as 5 modalidades possíveis e
   proibindo copiar o exemplo ao pé da letra.
3. **Planos desproporcionalmente grandes para objetivos pequenos** — "crie
   um pequeno projeto web de demonstração" gerou 10 tarefas e 9 agentes
   (incluindo DevOps e Segurança dedicados) na primeira versão do prompt.
   **Corrigido**: adicionada regra explícita de proporcionalidade
   (objetivo "pequeno/demonstração" → 3-6 tarefas, sem agentes
   especializados demais) — resultado caiu para 2-6 tarefas nos testes
   seguintes.
4. **Paralelismo raso em planos complexos** — o "app de edição de vídeo"
   às vezes encadeava pesquisas sequencialmente em vez de paralelizá-las
   (o próprio exemplo do pedido original pede paralelismo aqui).
   **Corrigido**: regra explícita no prompt pedindo uma tarefa de pesquisa
   separada e SEM dependência para cada assunto distinto a investigar.
5. **Cooldown/score não aprendia com as falhas do Planner** — `chamar-llm.js`
   nunca chamava `scoring.registrar()`, então um provedor com cota
   estourada continuava sendo escolhido de novo a cada chamada, mesmo
   dentro da mesma sessão de testes. **Corrigido**: toda tentativa (sucesso
   ou falha) agora é registrada no scoring real do Gateway — reaproveitado,
   não reimplementado.
6. **[BUG REAL NA FASE 1, exposto só agora] Decisor sem filtro de
   modalidade de texto** — `orquestrador/core/decisor.js` nunca filtrava
   `modality.includes('text')`; um modelo de transcrição de áudio
   (`groq-whisper-large-v3-turbo`) foi escolhido para uma tarefa de
   raciocínio, e o adapter tentou chamar o endpoint de chat completions
   num modelo que só existe no endpoint de transcrição → HTTP 404 real em
   teste. **Corrigido**: filtro de `modality.includes('text')` adicionado
   (mesma regra que `gateway/server.js` sempre teve).
7. **[BUG REAL NA FASE 1, exposto pela correção do #6] Decisor sem filtro
   de adapter disponível** — corrigir o #6 expôs que o Decisor também
   nunca filtrava por `Object.hasOwnProperty(ADAPTERS, m.provider)`;
   candidatos do catálogo sem adapter implementado (Cloudflare Workers AI,
   Pollinations.ai, ElevenLabs — gap já documentado desde a Rodada 4 da
   infraestrutura) passaram a ser escolhidos e travavam a execução real.
   **Corrigido**: mesmo filtro que `gateway/server.js` (`eligible()`)
   sempre usou, replicado no Decisor.

Os bugs #6 e #7 são particularmente importantes: eram falhas **pré-existentes
na FASE 1** que os testes daquela fase nunca pegaram (porque o score sempre
favorecia candidatos válidos por coincidência), e só apareceram quando a
FASE 2 gerou um padrão de chamada diferente o suficiente para expor a lacuna
de filtro. Corrigidos com backup prévio e reconfirmados contra a suíte
completa da FASE 1 (25/25 antes e depois).

## 15. REPLANEJAMENTO

Testado real: uma missão já planejada (o "app de edição de vídeo") recebeu
uma nova informação real ("ffmpeg.wasm tem suporte limitado no Safari") via
`planejador.replanejar()`, chamou o LLM de novo só com esse contexto
específico, e o DAG foi atualizado sem remover nenhuma tarefa existente.
Garantia dura testada e confirmada no código, não só no prompt:
`grafo.cancelarTarefa()` **recusa** cancelar uma tarefa já `CONCLUIDA` — testado
simulando uma tarefa concluída e tentando cancelá-la, resultado
`cancelada:false`.

## 16. TESTES EXECUTADOS

**31/31 aprovados**, cobrindo os 13 cenários pedidos + missão real + teste de
qualidade:

| # | Cenário | Resultado |
|---|---|---|
| 1-2 | Trivial/simples | ✅ (poucas tarefas, nível 0-1) |
| 3-4 | Complexa/muito complexa | ✅ (exemplo real do pedido: app de vídeo, nível 4) |
| 5 | Cobertura real (múltiplas subtarefas) | ✅ |
| 6 | Dependências | ✅ |
| 7 | Paralelismo | ✅ (tarefas independentes reais) |
| 8 | Pesquisa | ✅ (`precisaPesquisa` marcado pelo LLM) |
| 9 | Múltiplos agentes | ✅ |
| 10-11 | Ferramenta | ✅ |
| 12 | Informação insuficiente | ✅ (mecanismo testado deterministicamente) |
| 13 | Multimodal | ✅ (com retry por variância real do LLM) |
| — | AUTO MODE não pergunta o óbvio | ✅ |
| — | Qualidade/auto-revisão (seção 19) | ✅ (4 sub-testes, detecção + correção de lacuna real) |
| — | Replanejamento | ✅ (5 sub-testes, incluindo a garantia dura de nunca cancelar concluída) |
| — | Integração real Fase 1↔2 | ✅ (3 sub-testes: execução via Orquestrador, resolução completa, persistência) |

Regressão: suíte da FASE 0 (6/6) e FASE 1 (25/25) reconfirmadas **depois**
das correções dos bugs #6/#7 no Decisor.

### O teste real obrigatório (seção 18)
*"Crie um pequeno projeto web de demonstração"* → interpretado corretamente,
decomposto em 2-6 tarefas (variação normal entre execuções), DAG real
construído, tarefas paralelas identificadas quando existiam, agente e
ferramentas designados, critérios de conclusão presentes em 100% das
tarefas, plano entregue em estado `EXECUTANDO` (pronto pra rodar de
verdade, não só "documento de plano").

## 17. PROBLEMAS NÃO RESOLVIDOS / VARIÂNCIA CONHECIDA

O LLM (modelo gratuito, variável entre chamadas) nem sempre marca
`precisaPesquisa`/modalidade/paralelismo da forma ideal na primeira
tentativa — os testes 13 e o de trivial toleram até 1 retry documentado no
próprio teste, porque forçar 100% de determinismo de um LLM real seria
fingir uma garantia que não existe. Isso é diferente de um bug: é a natureza
de decompor com modelos gratuitos pequenos, e fica registrado honestamente
em vez de escondido atrás de um mock.

## 18. BACKUPS

`C:\Users\Administrator\Documents\Imperiom Fivem\BACKUPS_AMBIENTE_LOCAL\FASE2_PLANEJADOR_20260915\`:
`Tarefa.js.bak`, `grafo-tarefas.js.bak`, `decisor.js.bak` (backup feito
**antes** de cada uma das 3 alterações na FASE 1), `SHA256SUMS.txt`
(conferido íntegro), `ROLLBACK.sh`.

## 19. ROLLBACK

```bash
bash "C:/Users/Administrator/Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/FASE2_PLANEJADOR_20260915/ROLLBACK.sh"
```
Restaura `Tarefa.js`, `grafo-tarefas.js` e `decisor.js` ao estado exato do
fim da FASE 1. Para desfazer só o Planner (sem tocar nas extensões da FASE
1): apagar `Downloads\ia anvancado clalude\planejador\`.

## 20. LIMITAÇÕES CONHECIDAS

- O Planner ainda não usa navegador/pesquisa web de verdade para resolver
  `precisaPesquisa` — só marca a necessidade (a resolução da pesquisa em si
  é Fase 5 do plano mestre).
- Revisão por LLM (crítica de conteúdo, além da detecção estrutural de
  lacunas) não foi implementada — a auto-revisão desta fase é 100%
  determinística por regras, o que é mais confiável e testável, mas menos
  "criativo" do que uma segunda passada de LLM criticando o próprio plano.
  Fica como possível refinamento futuro, não bloqueante.
- Gap de agente `multimedia` (já conhecido desde a FASE 0) continua sem
  solução — reportado honestamente quando ocorre, não inventado.

## 21. ESTADO FINAL

- 9Router: saudável, **PID 10760**, nunca reiniciado nesta fase.
- Gateway: saudável, **PID 6524**, nunca reiniciado nesta fase.
- Nenhuma credencial exposta em nenhum arquivo criado ou alterado.
- 31/31 testes da FASE 2 aprovados; 25/25 FASE 1 e 6/6 FASE 0 reconfirmados.
- 2 bugs reais e pré-existentes na FASE 1 encontrados e corrigidos como
  consequência direta de testar a FASE 2 de ponta a ponta com dados reais.

## 22. PRÓXIMA FASE

**FASE 3 — Execução paralela real**: Gerenciador de Tarefas dedicado +
despacho paralelo de subtarefas independentes usando o padrão `Agent` +
`run_in_background` (hoje o "executor" que roda cada subtarefa ainda é
injetado por quem chama o Orquestrador — a FASE 3 formaliza um Executor
padrão), conforme `PLANO-MESTRE-AGENTE-9ROUTER.md` seção 26. Aguardando
aprovação explícita para iniciar.
