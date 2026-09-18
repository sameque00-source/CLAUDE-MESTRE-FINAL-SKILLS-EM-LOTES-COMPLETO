# Escopo e limites

## Fora de escopo — nunca tocar

| Alvo | Motivo |
|---|---|
| FiveM / FXServer / txAdmin / `server.cfg` / `resources` | Produção da cidade IMPERION |
| VPS `imperion` (`ssh imperion`) | Produção. A cidade reinicia sozinha por cron às 05h, 10h e 18h |
| Qualquer projeto fora desta pasta | Não é escopo deste workspace |

Essas restrições valem mesmo quando parecem convenientes de contornar.

## Credenciais

Nenhuma credencial fica neste workspace. A `ANTHROPIC_API_KEY` vem do
`%USERPROFILE%\.claude\settings.json`, que o Claude Code carrega antes do
settings do projeto.

Nunca escreva API key, token, secret, senha ou cookie em:
README, JSON, workspace, script, documento ou log.

Quando precisar referenciar uma credencial, use variável de ambiente ou
placeholder.

## Custo

`FREE_ONLY=true`. Nenhum modelo pago pode ser habilitado neste workspace.

## Antes de alterar arquivo existente

1. Backup em `backups/config-<timestamp>/`
2. `sha256sum` do original
3. Só então editar
