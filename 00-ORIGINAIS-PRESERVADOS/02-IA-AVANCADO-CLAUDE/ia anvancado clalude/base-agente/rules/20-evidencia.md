# Evidência e honestidade técnica

> Adaptado de `CLAUDE-CODE-VS-AUTO-ULTIMATE/.claude/rules/20-evidencia.md` em
> 2026-09-15 (FASE 0). Conteúdo original mantido; adicionadas as armadilhas
> reais descobertas nas sessões do AI-ORCHESTRATOR/9Router (marcadas com
> origem), conforme recomendado no `PLANO-MESTRE-AGENTE-9ROUTER.md` seção 7.

## Nunca inventar

Não invente API, comando, evento, export, permissão, caminho, versão nem
teste. Se não leu, diga que não leu. Se não executou, diga que não executou.

**"Deve funcionar" não é validação.** Prova é: log, hash, contagem, medição ou
execução real.

## Rótulos

Use ao afirmar algo não trivial:

| Rótulo | Significado |
|---|---|
| `[CONFIRMADO]` | Li ou executei |
| `[INFERIDO]` | Deduzi a partir de outra coisa |
| `[PRECISA VERIFICAÇÃO]` | Não sei |
| `[RECOMENDAÇÃO]` | Opinião |
| `[PENDENTE — NÃO TESTADO]` | Escrito mas não validado |

## Não parar na primeira falha

Investigue a causa, pesquise, tente outra abordagem, teste de novo.
Só declare impossível depois de provar tecnicamente que a limitação é externa.

## Não entregar pela metade

Se parte ficou de fora, diga qual e por quê. Pendência escondida vira
problema depois.

## Armadilhas já pagas (herdadas do projeto de referência)

| Armadilha | Detalhe |
|---|---|
| `((VAR++))` com `set -e` | Sai do script quando `VAR=0` (resultado 0 é falso). Use `VAR=$((VAR+1))` |
| Heredoc grande no shell | Come contrabarra. Escreva o arquivo local e envie, em vez de heredoc com `\` |
| `/c/Users/...` do Git Bash | Não funciona no Python. Use `C:/Users/...` |
| Playwright + `file://` | Bloqueado. Suba `python -m http.server` e use `http://127.0.0.1:porta` |
| Subagente com `model:` fixo | Se o modelo não existir no backend ativo, o agente falha com 404. Omita `model:` para herdar da sessão |
| Tool de subagente | Chama-se `Agent`, não `Task` |

## Armadilhas já pagas (descobertas nas sessões do AI-ORCHESTRATOR/9Router)

| Armadilha | Detalhe | Quando |
|---|---|---|
| `cmd /c "..."` a partir de Git Bash/MSYS | `/c` é interpretado como letra de unidade (`C:\`) em vez de flag do `cmd.exe`; o processo abre banner interativo em vez de executar. Use `cmd //c` OU `MSYS_NO_PATHCONV=1`. **Mas atenção**: corrigir isso nos hooks do Claude Code expôs um SEGUNDO bug (path do `hook-handler.cjs` perdendo barras invertidas sob certas invocações) que abortou uma tarefa agêntica real — a correção foi revertida. Não reaplicar sem também corrigir o segundo bug e testar com tarefa agêntica completa | Diagnóstico de "hooks nunca executam de verdade", 2026-09-15 |
| Groq: teto real de ~7-8k tokens/minuto por conta, não só por request | Pedidos grandes (13-17k tokens, comuns vindos do Claude Code) precisam ser excluídos da Groq por estimativa de tokens ANTES de tentar, senão HTTP 413 em loop | Integração de tool-calling, 2026-09-14 |
| 9Router sempre responde em SSE, mesmo sem `stream:true` | Um adapter que faz `JSON.parse` puro na resposta engole o erro e devolve sucesso com texto vazio. Precisa de parser SSE dedicado | Integração do adapter 9Router, 2026-09-14 |
| Gemini rejeita JSON Schema com `propertyNames`/`prefixItems`/`$schema`/`additionalProperties` | HTTP 400 em toda chamada com tools. Sanitizar com lista branca antes de enviar | Tool-calling Gemini, 2026-09-14 |
| Gemini exige `thought_signature` ao reenviar `functionCall` nativo no histórico | Contornado textualizando o histórico de tool_use/tool_result em vez de reenviar blocos nativos (chamadas novas continuam nativas) | Tool-calling Gemini, 2026-09-14 |
| Instrução tipo "responda ao usuário agora" após um `tool_result` | Testado e comprovado: faz o modelo PARAR de chamar mais ferramentas no meio da tarefa — o próprio sintoma que motivou reconstruir o gateway. Nunca reintroduzir | Loop agêntico, 2026-09-14 |
| Streaming real: só comprometer a resposta ao cliente no primeiro evento de conteúdo real | Depois que o cliente recebe `message_start` em SSE não dá mais pra trocar de provedor no meio sem quebrar o protocolo. Adiar o "compromisso" até o primeiro `text`/`tool_use` chegar preserva o fallback | Streaming real, 2026-09-14 |
| Ambiente com `ANTHROPIC_BASE_URL` herdado apontando pra API real | Ao invocar `claude -p` como subprocesso, o shell pode já ter essa env var setada por fora, sobrescrevendo o roteamento local pretendido — sempre passar `ANTHROPIC_BASE_URL`/`ANTHROPIC_API_KEY` explicitamente na invocação quando o objetivo é testar o roteador local | Diagnóstico de tools, 2026-09-15 |
