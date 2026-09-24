# MCP — Servidores e Ferramentas

MCP (Model Context Protocol) é como o Claude Code ganha ferramentas extras.
Este workspace declara dois servidores em `.mcp.json`.

---

## Servidores configurados

### claude-flow (Ruflo)

```json
{
  "command": "cmd",
  "args": ["/c", "npx", "-y", "ruflo@latest", "mcp", "start"],
  "env": {
    "CLAUDE_FLOW_MODE": "v3",
    "CLAUDE_FLOW_TOPOLOGY": "hierarchical-mesh",
    "CLAUDE_FLOW_MAX_AGENTS": "25",
    "CLAUDE_FLOW_MEMORY_BACKEND": "hybrid"
  }
}
```

Expõe 200+ ferramentas de coordenação. Prefixo: `mcp__claude-flow__*`

| Categoria | Ferramentas principais |
|---|---|
| Swarm | `swarm_init`, `swarm_status`, `swarm_health` |
| Agentes | `agent_spawn`, `agent_list`, `agent_status` |
| Hive Mind | `hive-mind_status`, `hive-mind_consensus`, `hive-mind_join` |
| Memória | `memory_store`, `memory_search`, `memory_stats` |
| Hooks | `hooks_route`, `hooks_post-task`, `hooks_worker-dispatch` |
| Config | `config_get`, `config_set`, `config_list` |
| Sistema | `system_health`, `system_metrics`, `system_status` |

Como as ferramentas são **deferred** (carregadas sob demanda), use `ToolSearch`
para descobri-las:

```
ToolSearch("select:mcp__claude-flow__agent_list,mcp__claude-flow__swarm_status")
```

### playwright

```json
{
  "command": "node",
  "args": [
    "C:/Users/Administrator/AppData/Roaming/npm/node_modules/@playwright/mcp/cli.js",
    "--isolated",
    "--headless"
  ]
}
```

Versão instalada: `@playwright/mcp@0.0.80`. Prefixo: `mcp__playwright__*`

| Ferramenta | O que faz |
|---|---|
| `browser_navigate` | Abre uma URL |
| `browser_snapshot` | Árvore de acessibilidade da página |
| `browser_take_screenshot` | Captura de tela |
| `browser_evaluate` | Roda JS na página (inspeção) |
| `browser_console_messages` | Lê erros do console |
| `browser_network_requests` | Lista requisições |
| `browser_resize` | Emula viewport (testar responsivo) |
| `browser_click` / `browser_type` | Interação |

**Flags:** `--isolated` (perfil descartável, nada persiste) e `--headless`
(sem janela visível).

---

## Limitação: protocolo `file:`

O Playwright MCP **bloqueia `file://`**. Para testar um HTML local, suba um
servidor:

```bash
cd workspace\test-project
python -m http.server 8899 --bind 127.0.0.1
```

Depois navegue para `http://127.0.0.1:8899/index.html`.

---

## Verificar status

```bash
claude mcp list
```

Saída esperada:

```
playwright: node .../cli.js --isolated --headless - ✔ Connected
claude-flow: cmd /c npx -y ruflo@latest mcp start - ✔ Connected
```

Se um servidor aparecer como **Pending approval**, rode `claude` e aprove na
primeira execução.

---

## Ordem de carregamento

O Claude Code lê configs MCP nesta ordem (a mais específica ganha):

1. `%USERPROFILE%\.mcp.json` — global
2. `<workspace>\.mcp.json` — este workspace

Como os dois declaram `claude-flow`, o do workspace prevalece quando você abre
esta pasta. A diferença: aqui `CLAUDE_FLOW_MAX_AGENTS` é `25` (no global é `15`).

---

## Problemas comuns

**MCP não aparece**
1. Feche e reabra o Claude Code
2. Verifique o `.mcp.json` com `python -m json.tool .mcp.json`
3. Confirme internet (o `npx` baixa o `ruflo` na primeira vez)

**Playwright falha ao abrir navegador**
```bash
npx playwright install chromium
```

**Ferramenta MCP não encontrada**
As ferramentas do claude-flow são deferred. Use `ToolSearch` antes de chamar.
