# Escopo e limites

> Adaptado de `CLAUDE-CODE-VS-AUTO-ULTIMATE/.claude/rules/00-escopo.md` em
> 2026-09-15 (FASE 0). A linha de "fora de escopo" foi trocada pelo escopo
> real deste ambiente (AI-ORCHESTRATOR / 9Router) — as demais seções já eram
> genéricas e foram mantidas.

## Fora de escopo — nunca tocar

| Alvo | Motivo |
|---|---|
| VPS de produção | Fora do escopo desta evolução do agente; qualquer VPS é produção real |
| FiveM / FXServer / txAdmin / `server.cfg` / `resources` | Produção de terceiros — nunca tocar |
| `taskkill /IM node.exe` | Já matou um processo errado antes (9Router). Reiniciar sempre por PID específico via `netstat -ano` |
| Qualquer projeto fora do escopo desta missão | Não é escopo deste workspace |

Essas restrições valem mesmo quando parecem convenientes de contornar.

## Credenciais

Nenhuma credencial fica em texto claro em relatório, log ou documento novo.
As chaves reais vivem em `AI-ORCHESTRATOR/config/.env` (fora do controle de
versão), carregadas em runtime.

Nunca escreva API key, token, secret, senha ou cookie em:
README, JSON, workspace, script, documento ou log.

Quando precisar referenciar uma credencial, use variável de ambiente ou
placeholder.

## Custo

`FREE_ONLY=true`. Nenhum modelo pago, cartão ou cobrança automática pode ser
habilitado nesta evolução do agente.

## Antes de alterar arquivo existente

1. Backup em `Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/<FASE>_<data>/`
2. `sha256sum` do original
3. Escrever o `ROLLBACK.sh` **antes** da alteração
4. Só então editar
