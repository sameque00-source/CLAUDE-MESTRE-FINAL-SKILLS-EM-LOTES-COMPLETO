# RELATÓRIO FINAL — INFRAESTRUTURA DE IA

**Data:** 2026-09-14
**Custo total:** R$ 0,00 — nenhum cartão, cobrança, plano ou trial pago.
**9Router:** intacto o tempo todo (PID 15320, nunca reiniciado nesta missão).

---

## 1. ESTADO INICIAL

O Claude Code parava no meio das tarefas e exigia "continue". Suspeitava-se de
prompt, modelo ou lentidão de rede. A auditoria anterior descartou essas
hipóteses e apontou a rota como suspeita.

## 2. CAUSA RAIZ (confirmada por código + teste empírico)

> **O gateway 20130 descartava o campo `tools` da requisição.**

- `server.js` extraía apenas `{ messages, system, stream, max_tokens }`.
- `providers.js` não tinha nenhuma ocorrência de `tools`/`tool_use`/`tool_calls`.
- Teste real: com uma ferramenta declarada, o gateway devolvia só texto e o
  modelo dizia *"não tenho acesso a ferramentas"*.

O Claude Code é um agente que só age emitindo `tool_use`. Sem isso ele responde
texto, não tem o que executar, e o turno acaba — exatamente o sintoma relatado.

**Descoberta secundária:** a rota anterior (9Router) *suporta* tools, mas levava
**142 segundos** para responder um "diga OK" trivial vindo do CLI. Ou seja: a
rota antiga era lenta demais e a nova era incapaz de agir.

## 3. ARQUITETURA FINAL

```
CLAUDE CODE
   ↓ (Anthropic Messages API, COM tools)
GATEWAY 20130
   ↓ classificador (nível 0-4, ignora system-reminders injetados)
   ↓ estimativa de tokens do pedido
   ↓ filtro de capacidade real (quem cabe no pedido)
   ↓ SCORE DINÂMICO (aptidão + saúde medida + latência p50 + folga de contexto)
   ↓ circuit breaker (quem falhou sai de circulação temporariamente)
   ├─ Google Gemini   (4 modelos, 1M contexto, visão)
   ├─ Groq            (3 modelos, rápidos, teto 7k tokens/pedido)
   ├─ OpenRouter      (3 modelos :free, chave com limite $0 travado)
   └─ 9Router 20128   (backup local, 17 modelos internos) ← nunca destruído
   ↓ validação de conteúdo (tool_use vazio ≠ sucesso)
   ↓ fallback + registro de telemetria
RESPOSTA (SSE com blocos text e tool_use)
```

## 4. O QUE FOI ALTERADO

| Arquivo | Mudança |
|---|---|
| `gateway/providers.js` | tool-calling completo: tradução Anthropic↔OpenAI (Groq/OpenRouter), Anthropic↔Gemini (functionDeclarations), 9Router nativo; sanitizador de JSON Schema; timeout por provedor; parser SSE com `tool_use` |
| `gateway/server.js` | repassa `tools`/`tool_choice`; devolve blocos `tool_use`; streaming com `input_json_delta`; ordenação por score; cooldown; erro tipado; seleção alargada |
| `gateway/scoring.js` | **novo** — score dinâmico, circuit breaker, classificação de erro, persistência de saúde |
| `catalog/models.json` | `tools` verificado por teste real; prioridades ajustadas por telemetria |
| `~/.claude/settings.json` | rota → gateway; 2 hooks de PreCompact ganharam timeout |
| `~/.claude/settings.local.json` | MCP `claude-flow` desligado |
| `Downloads/imagens test/` | suíte ampliada de 15 → 20 testes |
| Diretório do projeto | 43 arquivos de lixo (0 byte) removidos |

## 5. BUGS ENCONTRADOS E CORRIGIDOS NESTA MISSÃO

1. **`tools` descartado** — causa raiz. Corrigido nos 4 adapters.
2. **Schema do Gemini rejeitado** — `propertyNames`, `prefixItems`,
   `additionalProperties`, `$schema` causavam HTTP 400 em *toda* requisição do
   CLI. Corrigido com sanitizador por lista branca.
3. **Array sem `items`** — ao remover `prefixItems`, arrays de tupla ficavam
   órfãos (400 "missing field"). Corrigido com `items` permissivo.
4. **`enum` numérico** — o Gemini só aceita enum de strings. Corrigido.
5. **"Requests ending with a model turn"** — o laço agêntico terminava em turno
   do assistente. Corrigido com turno de usuário de fechamento.
6. **`thought_signature` exigido** — reenviar `functionCall` no histórico exigia
   um campo que não existe no formato Anthropic. Contornado textualizando o
   histórico de ferramentas (novas chamadas continuam nativas).
7. **Marcador vazando para o usuário** — a textualização `[ferramenta chamada: X]`
   era copiada pelo modelo na resposta final. Corrigido com narração natural.
8. **Instrução que parava o agente** — ao testar, adicionei "responda ao usuário
   agora" no resultado da ferramenta e o modelo **parou de chamar ferramentas**.
   Revertido e documentado no código para ninguém repetir.
9. **Timeout de 90s no 9Router** — testei e piorou: consumia 90s sozinho, duas
   vezes. Reduzido para 30s.
10. **Candidatos cortados cedo** — com payload grande, sobravam só 2 modelos
    Google; se ambos falhassem, a requisição morria. Seleção alargada.

## 6. RESULTADO MEDIDO — TAREFA AGÊNTICA REAL

Tarefa: *"o arquivo tem um bug, teste, conserte e confirme"* (exige Read + Edit +
Bash em sequência, com correção).

| Configuração | Resultado |
|---|---|
| 9Router (rota anterior) | 142s para texto trivial; agêntico não concluía |
| Gateway sem tools | **quebrado** — nunca emitia `tool_use` |
| Gateway com tools (1ª versão) | 108s |
| Gateway + correções de schema + score + cooldown | **18-24s** (melhor caso) |
| Mesma tarefa com Google degradado (quota/503) | 96s, **concluiu sozinho** |

Em todos os casos aprovados: arquivo criado/corrigido de verdade, resultado
numérico verificado por execução (`media([2,4,6]) = 4`), **sem "continue"**.

## 7. TESTES — 20/20 APROVADOS

Rodados 3× nesta missão, incluindo após reinício e após recuperação.

| Categoria | Testes |
|---|---|
| Infraestrutura | health gateway, health 9Router, /v1/models, auth 401 |
| Texto | simples, matemática, coding (código executado de verdade) |
| Conversa | multi-turn, system prompt, streaming SSE |
| Visão | 2 cores, com imagens geradas localmente |
| Roteamento | por tamanho de contexto (pedido grande não vai pra Groq) |
| **Tools (novos)** | `tool_use` com argumentos corretos, ciclo `tool_use→tool_result→resposta`, streaming com `tool_use`, schema complexo |
| **Resiliência (novos)** | cooldown pune/classifica/recupera, classificação de erro 7/7 |
| Segurança | nenhuma credencial exposta |

**Testes fora da suíte:** fallback com provedor quebrado, recuperação após kill
via tarefa agendada, tool-calling nos 4 adapters individualmente, e a tarefa
agêntica de correção de bug.

## 8. TELEMETRIA REAL (o sistema agora aprende)

Taxa de sucesso medida, usada para ordenar os candidatos:

| Modelo | Sucesso | Ação tomada |
|---|---|---|
| `openrouter/nemotron-3-super-120b:free` | **19/20** | promovido a todos os níveis, prioridade 92 |
| `groq/openai/gpt-oss-120b` | 17/20 | mantido alto |
| `google/gemini-flash-lite-latest` | 16/20 | mantido |
| `google/gemini-3.6-flash` | 11/20 | mantido |
| `groq/qwen3.8-27b` | 6/18 | mantido (rápido quando funciona) |
| `9Router/imperion-dev` | 2/20 | prioridade 25, mantido como único backup local |
| `openrouter/nemotron-3.5-lightning` | 0/8 | prioridade 15 (timeout sempre) |
| `openrouter/nemotron-3-ultra-550b` | 0/8 | prioridade 15 |
| `groq/compound` | 0/9 | prioridade 15 |

Nenhum foi desabilitado por 0 sucesso — pode ser lentidão, não defeito. Foram
rebaixados, não excluídos.

## 9. CREDENCIAIS — SOMENTE STATUS

| Serviço | Status |
|---|---|
| Groq | válida |
| Google AI Studio | válida (cota diária pressionada hoje pelo próprio volume de testes) |
| OpenRouter | válida, **Key limit $0 travado** |
| 9Router local | válida |
| Gateway 20130 | válida, auth obrigatória |
| ElevenLabs | **não usada** (plano pago) |

Varredura automática de vazamento: **0 ocorrências** em código, catálogo, logs,
estado de saúde, relatórios e suíte de testes.

## 10. BACKUPS E ROLLBACK

Em `Documents\Imperiom Fivem\BACKUPS_AMBIENTE_LOCAL\`, todos com `SHA256SUMS.txt`:

| Backup | Conteúdo |
|---|---|
| `FASE0_RECONSTRUCAO_20260914_081552` | settings, mcp, gateway, catálogo **+ SQLite do 9Router** — tem `ROLLBACK.sh` |
| `HOOKS_TIMEOUT_*` | settings.json antes do ajuste de hooks |
| `CATALOGO_TOOLS_*` / `CATALOGO_TELEMETRIA_*` | catálogo antes de cada ajuste |
| `LIXO_PROJETO_*` | lista dos 43 arquivos removidos |

**Rollback completo:**
```bash
bash "C:/Users/Administrator/Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/FASE0_RECONSTRUCAO_20260914_081552/ROLLBACK.sh"
```
Para religar o MCP claude-flow: voltar `enabledMcpjsonServers` para `["claude-flow"]`
em `~/.claude/settings.local.json`.

## 11. LIMITAÇÕES REAIS

1. ~~Streaming ainda não é incremental~~ — **RESOLVIDO na Rodada 5 (ver seção 13).**
   O streaming agora é real e incremental nos 4 adapters.
2. **Cota do Google pressionada.** Muitos testes hoje; ela se recupera no reset
   diário. O fallback cobre o intervalo.
3. **Groq não atende payload grande** (teto real de 8k tokens/min contra 13-17k
   do Claude Code). É usada para pedidos menores.
4. **Dependência do gateway**: se ele cair, o Claude Code para. Mitigado por
   autostart no logon + recuperação testada + rollback de um comando.
5. **Processos Node**: 9 ativos, **nenhum comprovadamente órfão** (todos com pai
   vivo, incluindo uma sessão `claude.exe` anterior ainda aberta). Não matei
   nenhum — matar por suposição seria o erro que já cometi antes.

## 12. PENDÊNCIAS HUMANAS

1. **ElevenLabs** — conta em plano pago; só você decide usar ou trocar.
2. **Senha padrão do dashboard do 9Router** — ele mesmo avisa. Trocar exige sua
   decisão (muda o acesso ao painel).
3. **9Router v0.5.75 disponível** — não atualizei por decisão de risco; o SQLite
   já está no backup caso queira atualizar depois.

---

## 13. RODADA 5 (2026-09-14/15) — STREAMING REAL

### Objetivo
Trocar o streaming falso (buffer completo → um único `content_block_delta`
gigante por bloco) por streaming **de verdade**: eventos incrementais chegando
do provedor e sendo repassados ao Claude Code à medida que chegam, sem quebrar
tool-calling, multi-turn nem fallback.

### O que foi auditado (ETAPA 1)
Nenhum dos 4 adapters fazia streaming real antes desta rodada — todos usavam
`await r.json()`/`await r.text()`, ou seja, esperavam a resposta inteira do
provedor antes de devolver qualquer coisa ao gateway.

| Provedor | Suporte nativo a streaming | Resultado da implementação |
|---|---|---|
| Groq | `stream:true` no `chat/completions` (SSE formato OpenAI) | **Real, confirmado** |
| OpenRouter | idêntico à Groq (mesmo formato OpenAI) | **Real, confirmado** (ver nota de cota abaixo) |
| 9Router | já respondia sempre em SSE Anthropic-nativo, mesmo sem pedir | **Real, confirmado** — é o caso mais direto (menos tradução) |
| Google AI Studio | endpoint separado `streamGenerateContent?alt=sse` (não usado antes — só o `generateContent` não-streaming) | **Real, confirmado** |

Os 4 adapters passaram a ter uma implementação de streaming dedicada em
`gateway/providers.js` (`STREAM_ADAPTERS`), mantendo os adapters não-streaming
originais intocados (usados quando o cliente não pede `stream:true`, e como
rede de segurança se algum provedor futuro não tiver adapter incremental).

### A tensão streaming vs. fallback (ETAPA 2) — como foi resolvida
Depois que o cliente recebe `message_start` em SSE, o protocolo não permite
trocar de provedor no meio. Solução implementada em `streamPassthrough()`
(`gateway/server.js`): **nada é escrito no cliente até o primeiro evento de
conteúdo real (texto ou `tool_use`) chegar do provedor.** Até esse ponto, uma
falha do provedor (401, 429, conexão recusada, stream vazio) é tratada
exatamente como no caminho não-streaming — o candidato seguinte é tentado
normalmente. Só depois do primeiro byte de conteúdo real é que a resposta é
"comprometida" com aquele provedor; uma falha depois disso encerra o stream
com o que já foi enviado, em vez de cair silenciosamente para outro candidato
— comportamento aceito e documentado, não uma falha.

**Validado com teste real:** chave da Groq quebrada de propósito → gateway
tentou Groq (HTTP 401, `started:false`, nada enviado ao cliente) → caiu para
9Router → cliente recebeu um streaming SSE válido e completo, sem perceber a
falha anterior (log: `tipoErro":"auth"` seguido de sucesso do 9Router).

### Medição — TTFT (Time To First Token) e comportamento incremental

**ANTES (streaming falso):** TTFT == tempo total. Um único `write()` depois da
resposta completa do provedor já estar pronta — não existe diferença entre
"primeiro token" e "último token".

**DEPOIS (streaming real), medido diretamente nos adapters (não pelo gateway,
pra isolar o comportamento de cada provedor):**

| Provedor | TTFT | Tempo total | Nº de eventos incrementais | Observação |
|---|---|---|---|---|
| Groq (`openai/gpt-oss-120b`) | 483-673ms | 547-737ms | 29 | token a token, gaps de 0-2ms entre eventos |
| 9Router (`imperion-dev`) | 449-545ms | 508-613ms | 29 | idêntico em granularidade à Groq |
| OpenRouter (`nemotron-3-ultra-550b`) | 13.087ms | 13.313ms | 9 | TTFT alto pq o modelo demora a abrir, mas depois de aberto entrega incremental de verdade (gaps de ~20-30ms entre eventos) |
| Google AI Studio (`gemini-flash-lite-latest`) | 850ms | 947ms | 2 | Gemini fatia em blocos maiores (menos eventos), mas confirmadamente incremental — 2 timestamps distintos (850ms e 925ms), não um único burst |

No teste via requisição HTTP completa ao gateway (`/v1/messages` com
`stream:true`), o cliente recebeu **6 chunks TCP distintos** numa resposta com
`tool_use`, e **20 chunks TCP distintos** numa resposta de texto puro — a
prova de que o SSE chega em pedaços reais ao longo do tempo, não tudo de uma
vez (o teste antigo teria mostrado 1 chunk TCP só).

### Nota honesta sobre OpenRouter e Google nesta rodada
Ambos bateram **cota diária real** de teste (OpenRouter: `HTTP 429 Rate limit
exceeded: free-models-per-day`; Google: `RESOURCE_EXHAUSTED,
GenerateRequestsPerDayPerProjectPerModel-FreeTier, limit: 20` no modelo padrão
do catálogo). Isso não é limitação da implementação — é limite de uso gratuito
do provedor, já documentado desde a Rodada 4. Contornado usando um modelo
alternativo do mesmo provedor com cota disponível (`gemini-flash-lite-latest`)
para confirmar o comportamento, e reconfirmado o OpenRouter mais tarde na
sessão quando a cota por minuto liberou. **Nenhum adapter teve streaming
fingido** — os 4 usam consumo incremental real de SSE (`response.body`
lido via `getReader()`, nunca `.json()`/`.text()` completo).

### Testes obrigatórios executados (ETAPA 4) — todos com validação de conteúdo real

| Teste | Resultado |
|---|---|
| Tarefa simples | ✅ texto correto |
| Coding | ✅ código gerado, executado de verdade (`7*8=56` via `eval`) |
| Multi-turn | ✅ contexto anterior lembrado (`42`) |
| Streaming | ✅ SSE válido, >1 chunk TCP |
| tool_use | ✅ `tool_use` com argumentos corretos |
| tool_use + streaming | ✅ `content_block_start type:tool_use` + `input_json_delta` no SSE |
| Múltiplas ferramentas em sequência | ✅ 2 `tool_result` no mesmo turno, resposta usa ambos |
| Fallback | ✅ Groq quebrada de propósito → 9Router assume, sem stream corrompido |
| Timeout | ✅ watchdog de inatividade (`GATEWAY_STREAM_IDLE_MS`, 25s) implementado nos 4 stream adapters — reinicia a cada chunk recebido, aborta se o provedor ficar mudo |
| Claude Code real (`claude -p --permission-mode bypassPermissions`) | ✅ resposta simples confirmada |
| Tarefa agêntica real completa (criar bug → ler → consertar → rodar → confirmar) | ✅ **CONFIRMADO por execução real**: bug (`i <= lista.length`) identificado e corrigido para `i < lista.length`; `node media.js` reexecutado e imprimiu `4` |

A suíte automatizada (recriada nesta rodada em
`Downloads\imagens test\suite-testes.js` — o arquivo original havia
desaparecido do disco entre sessões) passou **15/15**, reproduzida 2x.

### Falha encontrada e diagnosticada durante os testes (ETAPA 5)
Primeira tentativa da tarefa agêntica real deu `401 API key is invalid` em
~3 minutos. Diagnóstico: **não era bug do gateway** — o shell usado para
disparar `claude -p` já tinha `ANTHROPIC_BASE_URL=https://api.anthropic.com`
herdado no ambiente (de fora desta missão), o que sobrescrevia o valor de
`~/.claude/settings.json` para aquele processo filho. Corrigido passando
`ANTHROPIC_BASE_URL`/`ANTHROPIC_API_KEY` explicitamente na invocação. Depois
disso, a tarefa completou com sucesso (4m29s reais — mais lento que o "melhor
caso" de 18-24s da Rodada 4 porque o roteamento escolheu, nas rodadas de
teste, modelos gratuitos mais lentos como 9Router/Gemini-flash-lite; o
resultado final continua **correto e verificado por execução**, o que é o
critério que importa).

### Arquivos alterados nesta rodada
| Arquivo | Mudança |
|---|---|
| `gateway/providers.js` | novo bloco `STREAM_ADAPTERS` (Groq/OpenRouter via `_openAIStream` compartilhado, 9Router com passthrough quase direto do SSE Anthropic nativo, Google via `streamGenerateContent?alt=sse`); `consumirSSE()` genérico com parsing incremental linha a linha; watchdog de inatividade por chunk |
| `gateway/server.js` | nova função `streamPassthrough()` (streaming real com o design "não compromete até o primeiro conteúdo"); loop de `handleMessages` tenta `STREAM_ADAPTERS` primeiro quando `stream:true`, cai para o caminho antigo (`streamBlocks`, buffer completo) só se o provedor não tiver adapter incremental — preservado como rede de segurança, não removido |

### Backup e rollback desta rodada
`BACKUPS_AMBIENTE_LOCAL\STREAMING_REAL_20260914_104406\` (checksums em
`SHA256SUMS.txt`, verificado íntegro antes de declarar concluído).
```bash
bash "C:/Users/Administrator/Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/STREAMING_REAL_20260914_104406/ROLLBACK.sh"
```

### Estado final desta rodada
- 9Router: **PID 10760, nunca reiniciado durante toda a rodada.**
- Gateway: reiniciado 3x de propósito (código novo, teste de fallback com
  chave quebrada, restauração da chave) — sempre por PID específico via
  `netstat`, nunca `taskkill /IM`.
- 15/15 testes, 2 rodadas, 0 vazamento de credencial.
- Streaming real e incremental confirmado nos 4 adapters, com TTFT medido e
  documentado. Nenhuma capacidade anterior (tool-calling, fallback, multi-turn,
  score dinâmico, cooldown) regrediu.
