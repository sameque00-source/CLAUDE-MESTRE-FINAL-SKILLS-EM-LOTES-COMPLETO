# Arquitetura

## Visão geral

```
┌─────────────────────────────────────────┐
│  VS Code                                │
│  workspace: CLAUDE-CODE-VS              │
└──────────────┬──────────────────────────┘
               │ terminal integrado (PowerShell)
               ▼
┌─────────────────────────────────────────┐
│  Claude Code (CLI 2.1.267)              │
│  lê: .claude/settings.json + CLAUDE.md  │
│  sessão principal = COORDENADOR         │
└──────────────┬──────────────────────────┘
               │ MCP stdio
        ┌──────┴───────┐
        ▼              ▼
┌──────────────┐  ┌──────────────┐
│ Ruflo        │  │ Playwright   │
│ (claude-flow)│  │ (navegador)  │
└──────┬───────┘  └──────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Queen  (queen-coordinator)             │
│  topologia: hierarchical | raft         │
└──────────────┬──────────────────────────┘
               │ delega
               ▼
┌─────────────────────────────────────────┐
│  24 workers especializados              │
│  swarm: hierarchical-mesh               │
└──────────────┬──────────────────────────┘
               │ requisições de modelo
               ▼
┌─────────────────────────────────────────┐
│  9Router local  —  127.0.0.1:20128      │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  imperion-dev  (combo virtual)          │
│  → pool de modelos gratuitos            │
└─────────────────────────────────────────┘
```

## Camadas

| Camada | Responsabilidade | Onde vive |
|---|---|---|
| **VS Code** | Editor, terminal, tasks | `CLAUDE-CODE-VS.code-workspace` |
| **Claude Code** | Executor: lê/escreve arquivos, roda comandos, despacha agentes | `.claude/settings.json` |
| **Ruflo (MCP)** | Coordenação: swarm, memória, hooks, roteamento | `.mcp.json` + `.claude-flow/` |
| **Queen** | Orquestrador: divide tarefa, decide paralelismo | `.claude-flow/hive-mind/state.json` |
| **Agentes** | Especialistas: cada um com um domínio | `.claude-flow/agents/store.json` |
| **9Router** | Gateway de modelos, cria o alias `imperion-dev` | `%APPDATA%\9router\` (fora do workspace) |

## Divisão de responsabilidade

**Claude Code executa. Ruflo coordena.**

- Ferramentas do **Agent** fazem o trabalho (arquivos, código, git, terminal)
- Ferramentas **MCP** (`mcp__claude-flow__*`) fazem coordenação (swarm, memória, hooks)
- O **coordenador** (sessão principal) é quem integra — agentes propõem, o coordenador aplica

## Paralelismo

O combo `imperion-dev` emite **um tool_use por mensagem**. Portanto:

- ❌ Várias chamadas `Agent` numa mensagem só **não** dão concorrência
- ✅ Cada `Agent` com `run_in_background: true` **dá** concorrência real

Padrão validado neste workspace:

```javascript
Agent({ name: "a", run_in_background: true, prompt: "..." })
Agent({ name: "b", run_in_background: true, prompt: "..." })
Agent({ name: "c", run_in_background: true, prompt: "..." })
// notificações chegam conforme cada um termina
```

Medição real do teste de aceitação: 10.7s / 19.6s / 29.4s executados em paralelo
(se fosse sequencial teria somado ~60s).

## Fases com barreira de sincronização

Tarefas independentes rodam juntas; a fase seguinte só começa quando a anterior fecha:

```
FASE 1 (paralelo)  research · uiux · frontend · seo
        └── barreira ──┐
FASE 2 (paralelo)      security · performance · reviewer
        └── barreira ──┐
FASE 3 (paralelo)          testing · docs
        └── barreira ──┐
FASE 4 (sequencial)            coordinator integra
```

## Persistência

Tudo em `.claude-flow/`:

| Arquivo | Conteúdo |
|---|---|
| `config.json` | topologia, maxAgents, FREE_ONLY, model.routing |
| `agents/store.json` | os 25 agentes registrados |
| `hive-mind/state.json` | Queen, workers, consenso raft |
| `swarm/swarm-state.json` | estado do swarm |
| `policy/state.json` | políticas de segurança |

Esses arquivos são relidos automaticamente quando o MCP sobe — por isso os
agentes **sobrevivem a reinícios** e nunca precisam ser recriados.

## Isolamento

Este workspace **não toca**:

- FiveM / FXServer / txAdmin (`Write` bloqueado em `Documents/Imperiom Fivem/**`)
- VPS `imperion` (`Bash(ssh imperion:*)` na deny-list)
- Nenhum projeto fora desta pasta

Credenciais **nunca** ficam aqui. A `ANTHROPIC_API_KEY` vem do
`%USERPROFILE%\.claude\settings.json`, que o Claude Code carrega antes do
`settings.json` do workspace.
