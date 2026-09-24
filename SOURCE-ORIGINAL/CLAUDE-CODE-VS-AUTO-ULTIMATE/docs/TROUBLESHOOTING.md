# Troubleshooting

Primeiro passo para qualquer problema:

```bash
.\scripts\verificar-ambiente.ps1
```

Ele checa 22 itens e diz exatamente o que está quebrado.

---

## 9Router

### `9router: command not found`
```bash
npm install -g 9router
```

### Claude Code não conecta / respostas não chegam
1. `.\scripts\verificar-9router.ps1`
2. Se o router estiver offline, abra outro terminal: `9router`
3. Reinicie o Claude Code — ele lê o `settings.json` só na inicialização

### Porta 20128 ocupada
Provavelmente o 9Router já está rodando. Confirme:
```bash
Get-NetTCPConnection -LocalPort 20128 -State Listen
```

### `imperion-dev` não aparece em `/v1/models`
O `combo-models.json` em `%APPDATA%\9router\` define esse alias. Se ele foi
alterado, o alias some. Não edite esse arquivo sem saber o que faz.

---

## Claude Code

### Estoura contexto rápido
Esperado — o combo tem **64k tokens reais** (o menor membro define o teto).

- Leia arquivos em pedaços (`offset` + `limit` no Read)
- Use subagente para varredura ampla em vez de ler tudo na sessão principal
- Grave resultado intermediário em arquivo em vez de segurar no contexto

### Hooks falhando na inicialização
Os hooks apontam para `%USERPROFILE%\.claude\helpers\hook-handler.cjs`. Se esse
arquivo não existir, o hook cai no `ELSE (echo skip)` e não quebra nada. Para
desativar de vez, remova o bloco `hooks` do `.claude/settings.json`.

### Permissão negada em comando
Adicione o padrão em `.claude/settings.json` → `permissions.allow`.
Ex.: `"Bash(docker:*)"`.

---

## Ruflo / Agentes

### Agentes sumiram
Confira o store:
```bash
.\scripts\verificar-agentes.ps1
```
Se o arquivo `.claude-flow/agents/store.json` foi apagado, restaure de
`backups/` ou copie de outro workspace. **Não recrie os agentes manualmente** —
isso duplica registros no Hive Mind.

### Swarm mostra `maxAgents: 15` mas há 25 agentes
Comportamento conhecido e **inofensivo**. O `maxAgents` do swarm é gravado na
inicialização e não é atualizado depois. O que importa é `agentCount: 25` e
`autoScaling: true` — o limite não é aplicado. Não recrie o swarm para "corrigir"
isso: você perderia o estado.

### Workers com `status: "unknown"`
Normal quando estão idle. O que importa é `health.workers: "healthy"`.

### Ferramenta `mcp__claude-flow__*` não existe
São deferred. Carregue antes de usar:
```
ToolSearch("select:mcp__claude-flow__agent_list")
```

---

## Agentes em paralelo

### Agentes rodam em sequência, não em paralelo
Faltou `run_in_background: true`. Sem isso, cada `Agent` bloqueia o próximo.

Errado:
```javascript
Agent({ prompt: "..." })   // bloqueia
Agent({ prompt: "..." })   // só começa depois
```

Certo:
```javascript
Agent({ name: "a", run_in_background: true, prompt: "..." })
Agent({ name: "b", run_in_background: true, prompt: "..." })
```

### Dois agentes escreveram no mesmo arquivo
Violação da regra de coordenação. **Só o coordenador integra** — agentes
propõem, o coordenador aplica. Dê a cada agente um escopo de arquivo que não
sobrepõe.

---

## Playwright / navegador

### `Access to "file:" protocol is blocked`
Suba um servidor local:
```bash
cd workspace\test-project
python -m http.server 8899 --bind 127.0.0.1
```
Depois navegue para `http://127.0.0.1:8899/index.html`.

### Navegador não abre
```bash
npx playwright install chromium
```

### `favicon.ico 404` no console
Cosmético. A página não tem favicon. Ignore ou adicione um.

---

## PowerShell

### `execution of scripts is disabled on this system`
Rode com bypass (as tasks do VS Code já fazem isso):
```bash
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verificar-ambiente.ps1
```

### Script sai cedo sem erro visível
Se você editar um script, cuidado com `((VAR++))` — quando `VAR=0` isso retorna
exit code 1 e, com `set -e` / `$ErrorActionPreference='Stop'`, encerra o script.
Use `$VAR = $VAR + 1`.

---

## VS Code

### Task não aparece
`Ctrl+Shift+P` → **Tasks: Run Task**. As tasks estão dentro do
`.code-workspace`, então você precisa ter aberto **o workspace**, não só a pasta.

### Terminal abre em CMD em vez de PowerShell
O workspace define `terminal.integrated.defaultProfile.windows: "PowerShell"`.
Se não pegou, abra o workspace pelo arquivo `.code-workspace`, não pela pasta.

---

## O que nunca fazer

| Ação | Por quê |
|---|---|
| Habilitar modelo pago | `FREE_ONLY=true` é inegociável |
| Colocar API key em arquivo do workspace | Credencial vem do `%USERPROFILE%\.claude\settings.json` |
| Recriar os 25 agentes | Duplica registros no Hive Mind |
| Recriar o swarm ou o Hive Mind | Perde todo o estado persistido |
| Tocar em FiveM / FXServer / txAdmin | Fora de escopo, bloqueado na deny-list |
| Alterar a VPS `imperion` | Produção, bloqueado na deny-list |
