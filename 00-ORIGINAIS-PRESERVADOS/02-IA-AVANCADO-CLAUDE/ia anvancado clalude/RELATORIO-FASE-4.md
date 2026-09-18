# RELATÓRIO — FASE 4: AGENTES ESPECIALISTAS AVANÇADOS

**Data:** 2026-09-15
**Escopo:** `PLANO-MESTRE-AGENTE-9ROUTER.md`, Fase 4 — TAREFA → AGENTE
ESPECIALISTA → PERSONA → CONTEXTO ESPECÍFICO → FERRAMENTAS → MODELO →
EXECUÇÃO → VALIDAÇÃO → RESULTADO
**Resultado:** ✅ Fase 4 concluída — **132/132 testes** (36 novos da FASE 4 +
96 de regressão de FASE 0-3). Os agentes deixaram de ser rótulo/classificação
e passaram a **executar de verdade com persona própria, veto real de QA e
Security, colaboração e consolidação de resultados**. 9Router e Gateway
intocados.

---

## 1. OBJETIVO

Transformar os 19 agentes curados na FASE 0 (até então só arquivos de
referência) em especialistas que efetivamente conduzem a execução: cada
tarefa passa a carregar a PERSONA real do agente (o corpo do arquivo `.md`)
dentro de um CONTRATO padronizado, com ferramentas e modelo escolhidos por
especialidade, e agentes críticos (QA, Security, Reviewer) com **poder de
veto real** — capaz de mandar o trabalho de volta pra correção, não só opinar.

## 2. AGENTES ANALISADOS (auditoria da seção 1)

Os 19 agentes da base curada (FASE 0) foram lidos e mapeados um a um —
nome, ferramentas do frontmatter, especialidade, se é somente-leitura, se
tem poder de veto (já documentado no próprio corpo de `security` e
`reviewer`: "TEM PODER DE VETO"). Tabela completa em
`agentes/core/registro-especialistas.js`. Nenhum agente foi inventado: os
19 nomes do registro são exatamente os 19 arquivos reais de
`base-agente/agents/`.

Gaps reais confirmados (não inventados): `image`/`audio`/`video` não têm
agente dedicado (aguardam Fase 9 — Multimídia); `database` foi
deliberadamente absorvido por `backend` (mesma decisão de "não recriar
papel pra cada sub-fatia" já tomada na FASE 0).

## 3. AGENTES IMPLEMENTADOS — ARQUITETURA

```
agentes/
└── core/
    ├── registro-especialistas.js  — 19 especialistas: ferramentas, tipo p/
    │                                 scoring, veto, somente-leitura, sinônimos
    ├── contrato.js                 — INPUT/CONTEXT/OBJECTIVE/TOOLS/
    │                                 CONSTRAINTS/EXPECTED_OUTPUT/
    │                                 SUCCESS_CRITERIA (persona + regras)
    ├── consolidador.js             — funde resultados de agentes paralelos,
    │                                 detecta divergência real, decide
    └── memoria-agentes.js          — log append-only de uso (seção 22)
```
Integrado ao `executor/core/handlers-tarefa.js` (FASE 3, estendido):
`prepararEspecialistaEContrato()` resolve o especialista, carrega a
PERSONA real (reaproveitando `gerenciadorAgentes.carregarAgente`, FASE
0/1 — sem duplicar), monta o contrato, e injeta no prompt de TODA chamada
de LLM do handler (geração de código, texto, QA, security, revisão).

## 4. PERSONA REAL

Não copiada sem análise (seção 2 do pedido) — cada persona já existia
desde a FASE 0 com comportamento próprio documentado (ex: `research` é
somente-leitura e produz evidência com fonte; `reviewer` "não produz
código"; `security`/`reviewer` "TEM PODER DE VETO"). A FASE 4 não reescreve
essas personas — só passou a **usá-las de verdade**, injetando o corpo
inteiro do agente no prompt antes de qualquer instrução técnica de formato.
Confirmado por teste: `research` carregado corretamente, `reviewer` produz
veredito sem gerar código (seu contrato explicitamente pede isso).

## 5. CONTRATO PADRONIZADO

Implementado literalmente conforme a seção 3 do pedido:
`INPUT/CONTEXT/OBJECTIVE/TOOLS/CONSTRAINTS/EXPECTED_OUTPUT/SUCCESS_CRITERIA`
na entrada (`agentes/core/contrato.js`), e
`STATUS/RESULTADO/ARQUIVOS/TESTES/ERROS/EVIDÊNCIAS/RECOMENDAÇÕES` na saída
— este último já existia desde a FASE 1 (`Tarefa.criarResultado`), não
duplicado, só documentado e validado (`validarResultadoPadrao`).

## 6. FERRAMENTAS POR AGENTE

Cada especialista no registro declara suas ferramentas permitidas (seção 9):
`research`→navegador/arquivos/api; `backend`/`frontend`/`coding`→
arquivos/terminal; `uiux`→só arquivos (não escreve código de produção,
confirmado por teste); `security-auditor`→somente-leitura. Testado
explicitamente (4 casos).

## 7. MODELO POR AGENTE (via scoring, sem nome fixo)

Cada especialista declara um `tipoTarefaScoring` (`texto`/`codigo`/
`raciocinio`) que alimenta o `decisor`/`scoring` já existente (FASE 1) —
nenhum agente tem modelo hardcoded em lugar nenhum do código. Confirmado
por teste: o modelo real escolhido para uma tarefa de `research` veio do
catálogo real, não de uma string fixa.

## 8. SELEÇÃO AUTOMÁTICA E MÚLTIPLOS AGENTES

`prepararEspecialistaEContrato` resolve automaticamente o especialista a
partir de `agenteFuncaoSugerida` (vindo do Planejador, FASE 2) ou de um
mapa `tipo→especialista padrão`, sem exigir que TODA missão declare
agente explicitamente. Testado: uma missão com 2 tarefas de tipos
diferentes (pesquisa + security) designou 2 especialistas distintos — nunca
os 19 de uma vez.

## 9. COLABORAÇÃO E CONSOLIDAÇÃO

`agentes/core/consolidador.js`: recebe resultados de agentes paralelos,
detecta divergência (heurística de similaridade de vocabulário +
confirmação por LLM), e decide comparando evidência — nunca escolhe
arbitrariamente (seção 21). Testado com 2 pesquisas reais e paralelas
(PostgreSQL vs. MongoDB) que produziram uma decisão consolidada coerente, e
com um caso de convergência total (2 resultados idênticos) confirmando que
divergência nunca é apontada sem motivo real.

## 10. CONTEXTO POR AGENTE

Cada agente recebe só o resultado das suas **dependências diretas** — nunca
a missão inteira (seção 8). Testado explicitamente: uma tarefa C, que
depende só de A (não de B), teve o resultado de A no seu contrato e
**confirmadamente não** teve o de B.

## 11. VETO DE QUALIDADE (seções 12/13/18/19) — O CORAÇÃO DESTA FASE

Implementado como mecanismo real, não flag de log:
- **QA** (`handleQA`): roda o teste REAL primeiro (mesmo mecanismo da FASE
  3); só considera "aprovado tecnicamente" quem passa de verdade; depois
  aplica julgamento de casos extremos via persona. Reprovação vira
  `erros: ["veto: ..."]`.
- **Security** (`handleSecurity`): varredura DETERMINÍSTICA com 5 padrões
  reais (chave de API hardcoded, senha hardcoded, comando destrutivo,
  eval de entrada não confiável, SQL por concatenação) — não é opinião de
  LLM, é regex sobre o conteúdo real dos arquivos do workspace. Testado com
  um secret genuíno (bloqueou) e um arquivo limpo (não bloqueou — sem falso
  positivo).
- **Reviewer** (`handleRevisao`, já existia na FASE 3, agora com persona
  real injetada): aprovado/reprovado, nunca produz código.

**O veto realmente reabre o trabalho** (não é só um log de reprovação):
`orquestrador/core/grafo-tarefas.js` ganhou `reabrirTarefa()` (aditivo,
nunca mexe em tarefa `CONCLUIDA` de outra forma que não seja reabrir pra
nova tentativa), e `executor.js` detecta o veto (mensagem `veto:`), percorre
a cadeia de dependências (inclusive transitivamente — ver bug #2, seção 14)
até achar a(s) tarefa(s) de implementação, e as reabre com o motivo real do
veto alimentando a próxima geração.

## 12. TESTE DE QUALIDADE — RESULTADO REAL, NÃO SIMULADO

Provado ao vivo (não só em teste automatizado): pedi deliberadamente a
geração de um arquivo com uma chave de API hardcoded. **Security vetou
corretamente**, o Executor reabriu a tarefa de código, o modelo (ao ser
confrontado de novo com o mesmo pedido inseguro) **se recusou a repetir o
padrão perigoso**, a geração corrigida falhou por outro motivo (recusa do
modelo), e o sistema **declarou FALHA honesta** em vez de fingir sucesso —
exatamente o comportamento exigido pela filosofia de todo este projeto.

## 13. PROBLEMAS ENCONTRADOS E CORRIGIDOS (reais, em teste)

1. **Revisão a nível de MISSÃO reprovava em loop sem nunca corrigir** — ao
   contrário do veto a nível de TAREFA (que já reabria corretamente), a
   reprovação da revisão final da missão (`_revisarMissaoReal`) ia pro
   estado `CORRIGINDO` mas não havia mecanismo nenhum reabrindo as tarefas
   de implementação — a próxima leva não tinha nada pra fazer, voltava pra
   `TESTANDO`→`REVISANDO`, reprovava pelo MESMO motivo, e assim até a
   proteção de "sem progresso" declarar `FALHA` — sem nunca tentar
   corrigir de verdade. **Corrigido**: reabre as tarefas de implementação
   com o motivo real da reprovação, com teto de 2 rodadas.
2. **Dependência de implementação nem sempre é direta** — QA/Security às
   vezes dependem de um "teste" que por sua vez depende do "codigo" (cadeia
   transitiva). A checagem original só olhava `dependeDe` direto, nunca
   achava o que reabrir, e a tarefa era cancelada em vez de corrigida.
   **Corrigido**: busca em profundidade por toda a cadeia de dependências
   até achar tarefas de implementação concluídas.
3. **[CRÍTICO] Revisor via arquivo "truncado" que na verdade só estava
   cortado pela AMOSTRA mostrada a ele** — o corte de conteúdo de arquivo
   pro Revisor/QA era de 800-1000 caracteres; arquivos reais gerados por
   este sistema costumam passar disso (ex: HTML de ~3KB), e o
   agente reportava CORRETAMENTE (do ponto de vista dele) "código
   truncado/incompleto" — o problema não era o código gerado, era o corte
   da amostra que eu mesmo impus. **Corrigido**: limite subido pra 6000
   caracteres, e quando o corte é genuinamente necessário, ele é rotulado
   explicitamente ("truncado aqui pelo Executor, não é erro do código
   gerado") pra nunca mais confundir o agente. Este bug causava
   **reprovações falsas em cascata** — provavelmente o achado mais valioso
   desta fase.

## 14. TESTES EXECUTADOS

**36/36 aprovados**, cobrindo os 13 cenários (seção 23) + as 2 missões
reais obrigatórias (seções 24/25):

| # | Cenário | Resultado |
|---|---|---|
| 1 | Seleção de agente (+ nunca inventa) | ✅ |
| 2/6 | Execução de 1 agente + modelo via scoring | ✅ |
| 3 | Múltiplos agentes numa missão | ✅ |
| 4 | Contexto específico (só dependência direta) | ✅ |
| 5 | Ferramenta específica por especialidade | ✅ 4 sub-testes |
| 7 | Paralelo (medido, sobreposição real) | ✅ |
| 8 | Consolidação (divergência real + convergência) | ✅ |
| 9 | Veto QA (teste real falhando) | ✅ |
| 10 | Veto Security (secret real + sem falso positivo) | ✅ |
| 11 | Revisão com persona real | ✅ |
| 12 | Recuperação de falha preservando agente | ✅ |
| 13 | Memória de agentes (log real) | ✅ |
| 24 | **Missão real**: analisar app + propor melhorias | ✅ |
| 25 | **Missão real complexa**: researcher+architect+developer+qa+reviewer | ✅ |

**Regressão completa**: FASE 0 (6/6), FASE 1 (25/25), FASE 2 (31/31), FASE
3 (34/34) — todas reconfirmadas depois das mudanças. **Total: 132/132.**

## 15. RESULTADOS

O sistema evoluiu de "classifica backend/frontend" (rótulo) para "executa
com persona real, é reprovado de verdade quando o trabalho é ruim, corrige
com base no motivo real, e só declara sucesso quando genuinamente
verificado" — a mudança mais estrutural desde a FASE 3.

## 16. ARQUIVOS CRIADOS

```
agentes/core/registro-especialistas.js
agentes/core/contrato.js
agentes/core/consolidador.js
agentes/core/memoria-agentes.js
agentes/logs/agentes.jsonl          (gerado em runtime pelos testes)
testes/teste-fase4-agentes.js
RELATORIO-FASE-4.md
```

## 17. ARQUIVOS ALTERADOS (com backup prévio)

| Arquivo | Mudança |
|---|---|
| `executor/core/handlers-tarefa.js` | Persona/contrato injetados em todo handler; +`handleQA`, +`handleSecurity`; log de memória de agentes |
| `executor/core/gerador-codigo.js` | Aceita e prepend `contrato` no prompt |
| `executor/executor.js` | Detecção de veto + reabertura de tarefa (com busca transitiva); reabertura na reprovação de revisão da missão |
| `executor/core/classificador-falha.js` | +tipo `veto_qualidade` |
| `orquestrador/core/grafo-tarefas.js` | +`reabrirTarefa()` (aditivo) |
| `planejador/core/prompt-decomposicao.js` | +tipos `qa`/`security` no enum |

Nenhum arquivo de produção (`gateway/`, `catalog/models.json`) alterado —
hashes conferidos idênticos ao baseline.

## 18. BACKUPS

`BACKUPS_AMBIENTE_LOCAL\FASE4_AGENTES_20260915\`: `handlers-tarefa.js.bak`,
`gerador-codigo.js.bak`, `executor.js.bak`, `classificador-falha.js.bak`,
`grafo-tarefas.js.bak`, `prompt-decomposicao.js.bak` — todos capturados
**antes** de qualquer alteração desta fase, `SHA256SUMS.txt` conferido.

## 19. ROLLBACK

```bash
bash "C:/Users/Administrator/Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/FASE4_AGENTES_20260915/ROLLBACK.sh"
```
Restaura todos os 6 arquivos estendidos ao estado exato do fim da FASE 3.
Para remover só a camada de agentes: apagar `Downloads\ia anvancado
clalude\agentes\`.

## 20. LIMITAÇÕES CONHECIDAS

- Reabertura por veto/revisão não reabre explicitamente tarefas
  intermediárias de tipo `teste` na cadeia (só a implementação em si) — o
  mecanismo ainda funciona corretamente porque `missao._ultimoComandoTeste`
  é uma variável compartilhada atualizada pela implementação mais recente,
  mas arquiteturalmente seria mais limpo reabrir a cadeia inteira.
- Teto de 2 rodadas de correção a nível de missão (revisão) é fixo, não
  configurável por complexidade da missão.
- `image`/`audio`/`video` continuam sem especialista dedicado (gap
  conhecido desde a FASE 0, fica pra Fase 9 do plano mestre).
- Memória de agentes é só log append-only (seção 22 explicitamente pediu
  isso, não mais) — sem análise/aprendizado sobre os dados ainda.

## 21. ESTADO FINAL

- 9Router: saudável, **PID 10760**, nunca reiniciado nesta fase.
- Gateway: saudável, **PID 6524**, nunca reiniciado nesta fase.
- Nenhuma credencial exposta em nenhum arquivo criado ou alterado.
- **132/132 testes aprovados** (36 novos + 96 de regressão acumulada).
- 3 bugs reais encontrados e corrigidos, incluindo um crítico (truncamento
  de amostra causando reprovações falsas em cascata) que teria comprometido
  silenciosamente a confiabilidade de QUALQUER revisão/QA em arquivos
  maiores que ~1KB se não tivesse sido pego em teste real.

## 22. PRÓXIMA FASE

**FASE 5 — Pesquisa Web Real**: implementar a camada de pesquisa de verdade
para o especialista `research` (hoje ele raciocina com o conhecimento do
próprio modelo; a interface já está pronta — `precisaPesquisa` no plano da
FASE 2 — para receber busca web real), conforme
`PLANO-MESTRE-AGENTE-9ROUTER.md` seção 26. Aguardando aprovação explícita
para iniciar.
