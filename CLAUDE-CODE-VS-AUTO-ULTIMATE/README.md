# CLAUDE CODE VS FINAL

Workspace do Claude Code no VS Code, com Ruflo, Hive Mind, 25 agentes e o
9Router local servindo o `imperion-dev`.

---

## Como abrir no VS Code

Duplo clique em:

```
CLAUDE-CODE-VS.code-workspace
```

Abra **pelo arquivo `.code-workspace`**, não pela pasta — senão as tasks e o
terminal PowerShell padrão não carregam.

---

## Onde está o Claude Code

Ícone **Claude Code** na Activity Bar (barra vertical de ícones, à esquerda).
Clique nele e o painel abre na barra lateral.

Atalho: `Ctrl+Esc`

A extensão tem interface própria — você **não** precisa digitar `claude` no
terminal.

---

## Como usar

Antes de tudo, o 9Router precisa estar rodando. Abra um terminal
(``Ctrl+` ``) e deixe aberto:

```bash
9router
```

Depois é só abrir o painel do Claude Code e pedir o que quer.

Para tarefas com partes independentes, peça a equipe:

```
Crie uma landing page de restaurante. Use uiux, frontend e seo em paralelo,
depois passe pelo reviewer.
```

O coordenador despacha os agentes sozinho e integra o resultado.

---

## Como iniciar uma nova sessão

No painel do Claude Code, clique em **New conversation** (ou `Ctrl+Alt+N` se o
atalho estiver ativo). A sessão anterior fica no histórico da barra lateral.

Para reabrir a última sessão fechada: `claudeCode.enableReopenClosedSessionShortcut`
já está ativo no workspace.

---

## Como verificar o 9Router

```bash
.\scripts\verificar-9router.ps1
```

Checa: comando instalado, porta 20128 escutando, `/api/health` e `/v1/models`.

Se der erro, abra outro terminal e rode `9router`.

---

## Como verificar o imperion-dev

```bash
.\scripts\verificar-imperion-dev.ps1
```

Checa: se o modelo aparece em `/v1/models`, se o `/v1/messages` aceita ele
(HTTP 401 é esperado — a credencial não fica aqui) e se os 4 tiers do
`settings.json` apontam para ele.

---

## Como verificar o Ruflo

```bash
.\scripts\verificar-ruflo.ps1
```

Checa: `config.json`, `FREE_ONLY=true`, `model.routing.enabled`, Queen,
Hive Mind, Swarm e o MCP declarado.

Para conferir os 25 agentes:

```bash
.\scripts\verificar-agentes.ps1
```

---

## Verificar tudo de uma vez

```bash
.\scripts\verificar-ambiente.ps1
```

Roda as 5 verificações e agrega o resultado. Exit `0` = pronto.

Pelo VS Code: `Ctrl+Shift+P` → **Tasks: Run Task** → **Verificar ambiente (tudo)**

---

## Estrutura

```
CLAUDE CODE VS FINAL\
├── .claude\
│   ├── agents\      25 subagents (formato oficial)
│   ├── rules\       políticas sempre carregadas
│   ├── skills\      capacidades sob demanda
│   ├── commands\    slash commands do projeto
│   ├── hooks\
│   ├── settings.json
│   └── settings.local.json
├── .claude-flow\    estado do Ruflo (Queen, Hive Mind, Swarm)
├── .mcp.json        claude-flow + playwright
├── CLAUDE.md        instruções que o Claude lê automaticamente
├── .gitignore
├── config\  docs\  scripts\  tests\  tools\  workspace\
└── CLAUDE-CODE-VS.code-workspace
```

Trabalhe dentro de `workspace/`. Documentação detalhada em `docs/`.

---

## Regras permanentes

- `FREE_ONLY=true` — nenhum modelo pago
- Nenhuma credencial nesta pasta (a API key vem do `%USERPROFILE%\.claude\settings.json`)
- FiveM, FXServer, txAdmin e a VPS nunca são tocados por este workspace
- Todos os scripts são **somente diagnóstico** — exceto `start-9router.ps1`,
  que só inicia o router
