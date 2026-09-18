# Evidência e honestidade técnica

## Nunca inventar

Não invente API, comando, evento, export, permissão, caminho, versão nem teste.
Se não leu, diga que não leu. Se não executou, diga que não executou.

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

Se parte ficou de fora, diga qual e por quê. Pendência escondida vira problema
depois.

## Armadilhas já pagas neste ambiente

| Armadilha | Detalhe |
|---|---|
| `((VAR++))` com `set -e` | Sai do script quando `VAR=0` (resultado 0 é falso). Use `VAR=$((VAR+1))` |
| Heredoc grande no shell | Come contrabarra. Escreva o arquivo local e envie, em vez de heredoc com `\` |
| `/c/Users/...` do Git Bash | Não funciona no Python. Use `C:/Users/...` |
| Playwright + `file://` | Bloqueado. Suba `python -m http.server` e use `http://127.0.0.1:porta` |
| Subagente com `model:` fixo | Se o modelo não existir no backend ativo, o agente falha com 404. Omita `model:` para herdar da sessão |
| Tool de subagente | Chama-se `Agent`, não `Task` |
