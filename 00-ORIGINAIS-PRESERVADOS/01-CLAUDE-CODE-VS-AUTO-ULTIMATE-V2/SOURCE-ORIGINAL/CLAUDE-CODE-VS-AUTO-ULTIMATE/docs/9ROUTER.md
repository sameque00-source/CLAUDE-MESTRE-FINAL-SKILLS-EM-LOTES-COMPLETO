# 9Router + imperion-dev

O 9Router é o gateway local que expõe modelos gratuitos como se fossem a API da
Anthropic. O Claude Code fala com ele em `localhost:20128` em vez de falar com a
API oficial.

---

## Instalação atual

| Item | Valor |
|---|---|
| Versão | 0.5.69 |
| Instalado via | npm global |
| Binário | `%APPDATA%\npm\9router.cmd` |
| Dados | `%APPDATA%\9router\` |
| Porta | `20128` |
| Bind | `0.0.0.0:20128` |

O 9Router **não faz parte deste workspace** — ele é global no Windows. Este
workspace apenas o consome.

---

## Como iniciar

```bash
9router
```

Deixe o terminal aberto. O serviço fica escutando na 20128.

Pela task do VS Code: `Ctrl+Shift+P` → **Tasks: Run Task** → **1. Iniciar 9Router**

---

## Endpoints

| Endpoint | Retorno |
|---|---|
| `http://localhost:20128/api/health` | `{"ok":true}` |
| `http://localhost:20128/v1/models` | lista de modelos (29 no último teste) |
| `http://localhost:20128/v1` | base URL usada pelo Claude Code |

Testar rápido:

```bash
.\scripts\verificar-9router.ps1
```

---

## imperion-dev

`imperion-dev` **não é um modelo real** — é um alias virtual criado pelo 9Router
a partir de `%APPDATA%\9router\combo-models.json`. Esse arquivo lista IDs de
modelos gratuitos, e o 9Router os agrupa sob um único nome.

O pool inclui modelos gratuitos de Cloudflare AI Workers e OpenCode
(qwen, mistral, llama, deepseek, glm, nemotron, entre outros).

**Contexto real: 64k tokens** — o menor membro do combo define o teto. Sessões
longas estouram rápido: leia arquivos em pedaços, use subagente para varredura
ampla e grave resultado intermediário em arquivo.

---

## Como o Claude Code usa

Em `.claude/settings.json` deste workspace:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128/v1",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "imperion-dev",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "imperion-dev",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "imperion-dev",
    "ANTHROPIC_DEFAULT_FABLE_MODEL": "imperion-dev"
  }
}
```

Todos os tiers apontam para o mesmo alias — não importa se o Claude Code pede
opus, sonnet ou haiku, o 9Router entrega `imperion-dev`.

A **API key não está aqui**. Ela vem do `%USERPROFILE%\.claude\settings.json`,
que o Claude Code carrega antes do settings do workspace. Isso mantém o
workspace portátil e sem credenciais.

---

## FREE_ONLY

`FREE_ONLY=true` está em dois lugares:

- `.claude/settings.json` → `env.FREE_ONLY`
- `.claude-flow/config.json` → `scopes.project.FREE_ONLY`

**Nunca altere para false.** Nenhum modelo pago deve ser habilitado neste
workspace.

---

## Problemas comuns

**`9router: command not found`**
```bash
npm install -g 9router
```

**Porta 20128 já em uso**
O 9Router provavelmente já está rodando. Confira:
```bash
.\scripts\verificar-9router.ps1
```

**Claude Code não conecta**
1. Confirme que o 9Router responde: `curl http://localhost:20128/api/health`
2. Confirme que `imperion-dev` aparece em `/v1/models`
3. Reinicie o Claude Code (ele lê o settings na inicialização)

**`imperion-dev` sumiu da lista de modelos**
O `combo-models.json` pode ter sido alterado. Ele fica em
`%APPDATA%\9router\combo-models.json` — **não edite** sem saber o que está fazendo.
