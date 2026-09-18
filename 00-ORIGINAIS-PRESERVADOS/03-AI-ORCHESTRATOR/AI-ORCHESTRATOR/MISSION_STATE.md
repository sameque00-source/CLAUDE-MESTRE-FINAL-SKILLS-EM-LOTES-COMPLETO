# MISSION_STATE — Claude Power / AI-Orchestrator

> Arquivo de estado persistente. Qualquer sessão futura deve ler isto primeiro,
> confirmar contra o sistema real (nunca assumir que o arquivo está atualizado
> sem checar), e só então continuar.

## OBJETIVO
Roteador/orquestrador local para o Claude Code: classifica a tarefa por
complexidade e escolhe automaticamente provedor + modelo gratuito, com
fallback real em cascata, mantendo o 9Router como backup nunca destruído.
Custo permanente: R$ 0,00.

## ETAPA ATUAL
**Validada e em produção.** `settings.json` do Claude Code aponta para o
gateway (`http://localhost:20130`), que substituiu o 9Router como rota ativa.
9Router segue rodando intacto como backup (é um dos 4 provedores do gateway).

## CONCLUÍDO
- Gateway Anthropic-Messages-API-compatible (`gateway/server.js` +
  `gateway/providers.js`), porta 20130: streaming, multi-turn, system prompt,
  visão, autenticação (`x-api-key`/`Bearer`), classificador por nível 0-4.
- 4 provedores com adapter real: **Google AI Studio, Groq, OpenRouter, 9Router**.
- Cloudflare **não** tem adapter direto — só é alcançável via 9Router (confirmado
  no código, não é ambíguo).
- 12 modelos realmente elegíveis (contados por código, não estimados):
  Google (4), Groq (4), OpenRouter (3), 9Router (1, combo interno de 17).
- Fallback de 4 camadas testado com falha controlada real:
  Google → Groq → OpenRouter → 9Router (log real em `logs/gateway.jsonl`).
- Roteamento por tamanho de contexto: Groq (teto 7.000 tokens/pedido, TPM real
  da conta) é automaticamente excluído quando o pedido é grande — bug real que
  travava a integração, corrigido.
- Timeout de 20s por tentativa (`GATEWAY_CALL_TIMEOUT_MS`) — provedor lento não
  trava mais o fallback inteiro.
- Autostart do gateway via tarefa agendada `AI-Orchestrator-Gateway` (onlogon),
  testado com kill real + recuperação.
- Cloudflare "cloude fire" (dentro do 9Router) corrigida: Account ID estava
  errado (continha a própria chave), token novo gerado, `valid:true` confirmado.
- OpenRouter integrado com chave dedicada, **Key limit $0 travado no próprio
  dashboard** (trava física contra qualquer gasto, mesmo sem cartão).
- Suíte de testes real em `C:\Users\Administrator\Downloads\imagens test\suite-testes.js`
  — 15/15, reproduzida 4x em sessões diferentes.
- Auditoria de consistência: relatório corrigido pra bater com código/catálogo/logs.

## PENDENTE (nada bloqueante tecnicamente)
- Nenhuma tarefa técnica em aberto no momento. O sistema está validado.
- Fica pra quando houver nova missão: escrever adapter Cloudflare Workers AI
  direto no gateway (hoje só existe dentro do 9Router) e adapter Pollinations.ai
  pra geração de imagem passar pelo mesmo roteador.

## ERROS ENCONTRADOS E CORREÇÕES (histórico, não repetir)
1. Groq recebia pedidos de 13-17k tokens (overhead real do Claude Code) contra
   teto de 8k TPM → 413 em loop. **Corrigido**: estimativa de tokens no gateway.
2. `stripSystemReminders` ausente → classificador lia o CLAUDE.md injetado como
   intenção do usuário, promovia "olá" a nível 4. **Corrigido**.
3. 9Router responde sempre em SSE mesmo sem `stream:true` → adapter tentava
   `JSON.parse` puro e engolia erro, devolvendo sucesso com texto vazio.
   **Corrigido**: parser SSE dedicado + regra "texto vazio = falha real".
4. Corte de candidatos em 4 escondia provedores novos de prioridade menor
   (OpenRouter nunca era alcançado mesmo com os outros quebrados). **Corrigido**:
   subiu pra 6.
5. `providers.js` carrega `.env` só na inicialização do processo — mudar
   credenciais no disco não afeta um gateway já rodando (diferente do catálogo,
   que recarrega por requisição). **Não é bug, é comportamento a saber**: pra
   testar troca de credencial de verdade, precisa reiniciar o processo (PID
   específico, nunca `taskkill /IM node.exe`).
6. `nex-agi/nex-n2.5-pro:free` (OpenRouter) ficou elegível sem nunca ter sido
   testado (herdou adapter genérico). Testado: HTTP 200 correto, mas 120s de
   latência. **Desabilitado** (`free:false` no catálogo, não apagado).
7. Incidente grave (sessão anterior): `taskkill /IM node.exe` matou o 9Router
   por acidente junto com um processo de teste. **Nunca mais usar `/IM` — sempre
   PID específico via `netstat -ano | grep PORTA`.**

## TESTES (última rodada validada)
15/15 na suíte automatizada + testes reais fora dela: fallback em 4 camadas
com falha controlada, `claude -p` real (binário, ambiente limpo, múltiplas
rodadas), recuperação pós-kill via tarefa agendada, código gerado executado
de verdade (não só lido).

## CRITÉRIO DE CONCLUSÃO
Já atendido: gateway saudável, 9Router intacto, Claude Code respondendo por
ele, fallback de 4 camadas comprovado, 0 vazamento de credencial, backups com
rollback para cada mudança relevante, relatório batendo com o código real.

## PRÓXIMA ETAPA
Nenhuma pendente. Se uma nova sessão retomar isto, o primeiro passo é sempre
**reconfirmar o estado real** (health checks, PIDs, `settings.json`) antes de
assumir que algo aqui ainda é verdade — processos podem ter caído, cotas diárias
mudam, chaves podem expirar.


## RODADA 4 (2026-09-14) — RECONSTRUÇÃO COM TOOLS

**CAUSA RAIZ RESOLVIDA:** o gateway descartava o campo `tools`; o Claude Code nunca
recebia um `tool_use` e parava no meio. Implementado tool-calling completo.

### Feito nesta rodada
- tools/tool_choice repassados; tradução Anthropic<->OpenAI (Groq/OpenRouter),
  Anthropic<->Gemini (functionDeclarations), 9Router nativo.
- tool_use e tool_result no ciclo completo, validado nos 4 adapters.
- Sanitizador de JSON Schema para Gemini (lista branca): resolveu 400 de
  propertyNames/prefixItems, array sem items, e enum numérico.
- Histórico de ferramentas textualizado para Gemini (evita exigência de
  thought_signature).
- gateway/scoring.js NOVO: score dinâmico + circuit breaker + classificação de
  erro por tipo (quota/rate_limit/auth/payload/indisponivel/timeout/vazio).
- Timeout por provedor (9Router 30s; 90s foi testado e piorou).
- Seleção de candidatos alargada quando o nível tem poucos viáveis.
- MCP claude-flow DESLIGADO; 43 arquivos de lixo removidos.

### Resultado medido (tarefa agêntica real: criar+ler+confirmar arquivo)
| Configuração | Tempo |
|---|---|
| 9Router (rota antiga) | 142s para texto trivial; agêntico não funcionava |
| Gateway sem tools | quebrado (nunca emitia tool_use) |
| Gateway com tools (1a versão) | 108s |
| Gateway + schema fix + scoring + cooldown | **18s** |

### Rollback
`BACKUPS_AMBIENTE_LOCAL/FASE0_RECONSTRUCAO_20260914_081552/ROLLBACK.sh`

## RODADA 5 (2026-09-14/15) — STREAMING REAL

**Streaming deixou de ser fake.** Antes: `streamBlocks()` montava a resposta
inteira e mandava um único `content_block_delta` gigante por bloco (TTFT ==
tempo total). Agora: `STREAM_ADAPTERS` em `gateway/providers.js` consome SSE
incremental de verdade dos 4 provedores (Groq/OpenRouter via `stream:true`
formato OpenAI, 9Router via SSE Anthropic-nativo já usado por padrão, Google
via `streamGenerateContent?alt=sse`), e `streamPassthrough()` em
`gateway/server.js` repassa ao cliente à medida que chega.

- TTFT medido: Groq ~483-673ms, 9Router ~449-545ms, Google ~850ms (todos
  bem menores que o tempo total, confirmando entrega incremental real).
- Tensão streaming-vs-fallback resolvida: só "compromete" a resposta ao
  cliente no primeiro evento de conteúdo real; antes disso, falha do
  provedor cai pro próximo candidato normalmente (testado com chave da Groq
  quebrada de propósito → caiu pro 9Router sem o cliente perceber).
- Watchdog de inatividade por chunk (`GATEWAY_STREAM_IDLE_MS`, 25s) evita
  travar se o provedor parar de responder no meio do stream.
- tool_use funciona em streaming (`input_json_delta` chega incrementalmente).
- Tarefa agêntica real (bug → achar → consertar → rodar → confirmar) validada
  por execução: `media.js` corrigido, `node media.js` imprimiu `4`.
- Suíte de testes **recriada** (o arquivo original sumiu do disco entre
  sessões) em `Downloads\imagens test\suite-testes.js`, agora com os testes
  de streaming incremental incluídos — 15/15, 2 rodadas.
- 9Router: PID 10760, nunca reiniciado nesta rodada.
- Detalhe completo, números de TTFT por provedor e a nota honesta sobre cota
  diária do Google/OpenRouter durante os testes: `docs/RELATORIO-FINAL-INFRAESTRUTURA-IA.md`, seção 13.

### Rollback desta rodada
`BACKUPS_AMBIENTE_LOCAL/STREAMING_REAL_20260914_104406/ROLLBACK.sh`

## LOCAIS IMPORTANTES
- Gateway: `C:\Users\Administrator\Documents\AI-ORCHESTRATOR\gateway\`
- Catálogo: `C:\Users\Administrator\Documents\AI-ORCHESTRATOR\catalog\models.json`
- Credenciais: `C:\Users\Administrator\Documents\AI-ORCHESTRATOR\config\.env` (nunca versionar, nunca imprimir)
- Logs: `C:\Users\Administrator\Documents\AI-ORCHESTRATOR\logs\gateway.jsonl`
- Testes: `C:\Users\Administrator\Downloads\imagens test\suite-testes.js`
- Relatório completo: `C:\Users\Administrator\Documents\AI-ORCHESTRATOR\docs\RELATORIO-MISSAO-NOTURNA.md`
- Backups+rollback: `C:\Users\Administrator\Documents\Imperiom Fivem\BACKUPS_AMBIENTE_LOCAL\`
- 9Router: `http://127.0.0.1:20128` (combo `imperion-dev`) — **nunca destruir/recriar**
