# RELATÓRIO DE AUDITORIA — PLANO MESTRE

**Data:** 2026-09-14
**Tipo:** auditoria somente-leitura + planejamento (nenhuma alteração executada)
**Escopo:** 9Router 20128, Gateway 20130, Claude Code, MCP, hooks, agents, skills,
Ruflo, catálogo de modelos, código do roteador

---

## 0. RESUMO EXECUTIVO

Encontrei a **causa raiz real** do problema que você vinha relatando há dias
("o Claude Code faz uma parte e para, preciso dizer continue"):

> **O gateway 20130 — que eu mesmo configurei como rota principal — descarta o
> campo `tools` das requisições. O Claude Code nunca recebe uma ferramenta para
> executar, então responde texto e o turno acaba.**

Não era prompt. Não era modelo. Não era lentidão de rede. Era a rota que eu
instalei. Meus 15/15 testes anteriores não pegaram isso porque **todos eram de
texto puro** — faltava exatamente o teste que importava.

O 9Router (rota anterior) **suporta tool-calling normalmente**. A troca de rota
que fiz trocou um produto maduro por um subconjunto que quebrou o laço agêntico.

---

## 1. MÉTODO DA AUDITORIA

| Frente | Como foi feito |
|---|---|
| Dashboard 9Router | Navegação real no navegador, 6 áreas visitadas, somente leitura, nenhum clique em Update/Enable/Delete |
| Código do gateway | Agente de exploração dedicado: 6 arquivos, ~1.400 linhas lidas, citando arquivo:linha |
| Hooks / config do Claude Code | Agente dedicado: settings.json, settings.local.json (2), .mcp.json, medição real de tempo de cada hook |
| Tool-calling | Teste empírico real: mesma requisição com `tools` enviada aos dois endpoints |
| Estado dos serviços | `netstat`, health checks, verificação de PID |

**Nada foi alterado.** Única exceção declarada: o agente de hooks, ao *medir* o
tempo de execução deles, disparou os próprios hooks, que gravaram seus arquivos
de estado normais (`~/.ruflo/first-run-enabled.json`, `~/.claude-flow/data/*`).
Isso é o que eles fazem a cada tool call de qualquer forma.

---

## 2. A DESCOBERTA PRINCIPAL — TOOL-CALLING QUEBRADO

### Evidência 1 — código
- `gateway/server.js:193` → `const { messages = [], system, stream, max_tokens } = body;`
  O campo **`tools` não é extraído**. É descartado silenciosamente.
- `gateway/providers.js` → **zero** ocorrências de `tools`, `tool_use`,
  `tool_calls` ou `function_call`. Nenhum adapter sabe traduzir ou devolver tools.

### Evidência 2 — teste real, mesma requisição nos dois endpoints

Requisição idêntica, com uma ferramenta `get_weather` definida:

| Endpoint | HTTP | Blocos retornados | Chamou a ferramenta? |
|---|---|---|---|
| **Gateway 20130** (rota atual) | 200 | `["text"]` | ❌ Não. Modelo respondeu *"não tenho acesso a ferramentas"* |
| **9Router 20128** (rota anterior) | 200 | contém `tool_use` | ✅ Sim, chamou `get_weather` |

### Consequência
O Claude Code é um agente que só age emitindo `tool_use` (Read, Write, Bash,
Edit). Pelo gateway, ele **nunca** consegue emitir um — recebe texto, não tem o
que executar, e o turno termina. Você diz "continue", e o ciclo se repete.

**Isso explica 100% do sintoma relatado.**

---

## 3. OUTRAS CAUSAS CONFIRMADAS

### 3.1 Streaming falso (gateway)
`server.js:165-189` — a resposta chega **completa** do provider e é emitida num
único `content_block_delta`. Nenhum adapter pede `stream:true` ao upstream.
Resultado: você espera o tempo total de geração (mais o tempo de todos os
candidatos que falharam antes, até ~140s no pior caso) olhando tela parada.

### 3.2 Prompt de sistema inflado
- MCP `claude-flow` expõe **centenas** de ferramentas `mcp__claude-flow__*`
  (agentdb, swarm, hive-mind, metaharness, federation, wasm, autopilot…)
- **+148 commands**, **+30 skills**, **+16 agents** em `~/.claude/`
- `autoStart:false` no `.mcp.json` está **anulado** por
  `enabledMcpjsonServers:["claude-flow"]` em `settings.local.json`
- O `ruflo` **não está instalado localmente** → `npx -y ruflo@latest` resolve no
  registry npm a cada sessão

### 3.3 Contribuintes secundários (medidos, não fatais)
| Item | Medição real |
|---|---|
| Hooks | 16 invocações configuradas; ~0,15-0,2s por tool call; nenhum falhou |
| Hooks PreCompact | **2 deles sem timeout definido** |
| `IF EXIST` dos hooks | Nunca casa (o projeto não tem `.claude/helpers/`) — custo de `cmd.exe` puro em toda invocação |
| Processos node | **10+ ativos**, alguns possivelmente órfãos de spawns detached |
| Config | `effortLevel: "medium"`, `maxThinkingTokens: 16000`, contexto capado em 192k |
| Higiene | **43 arquivos de 0 byte** de lixo no diretório do projeto |
| Segurança | `ANTHROPIC_API_KEY` em texto claro no `settings.json` |

**Nota de responsabilidade:** os 43 arquivos de lixo são **meus** — vieram de
redirecionamentos de shell acidentais (`>` dentro de strings `node -e`) durante
as sessões anteriores desta missão. Degradam Glob/Grep.

---

## 4. O QUE O 9ROUTER TEM E ESTÁ SENDO DESPERDIÇADO

Ao apontar o Claude Code para o gateway, perdemos acesso a tudo isto:

### Providers — 40 disponíveis, só 5 conectados
| Conectados | Estado |
|---|---|
| OpenCode Free | Ready |
| Gemini CLI | 1 conexão |
| NVIDIA NIM | 1 conexão |
| Cloudflare | 2 conexões (ambas válidas após a correção de ontem) |
| Groq | 1 conexão |

**OAuth Providers, todos sem conexão:** Claude Code, OpenAI Codex, Antigravity,
GitHub Copilot, Cursor IDE, Kilo Code, Cline, Qoder, Kimi, Grok CLI, xAI.

**API Key Providers sem conexão:** Alibaba (4 variantes), Anthropic, Azure OpenAI,
Baidu Qianfan, Blackbox AI, Cerebras, Chutes AI, Cohere, Command Code, DeepSeek,
Featherless, Fireworks AI, GLM, Hyperbolic, LLM7… (+ "Show all 40").

### Token Saver — economia de contexto não aproveitada
| Recurso | Estado | Ganho declarado |
|---|---|---|
| Compress tool output (RTK) | **ON** | 60-90% menos tokens de entrada |
| Compress context (Headroom) | OFF | comprime prompts antes de rotear |
| Compress LLM output (Caveman) | OFF | ~65% menos tokens de saída |
| Lazy senior dev (Ponytail) | OFF | viés a código mínimo |

Como o Claude Code não passa mais pelo 9Router, **nem o RTK (que está ligado)
está sendo aplicado ao seu tráfego**.

### Quota Tracker — já faz o que você pediu na seção 10
Auto-refresh 60s, botões "Turn off Empty" / "Turn on Available" — desativa
provider esgotado e reativa quando volta, nativamente. Só 2 providers rastreados;
Gemini-CLI com erro de project ID.

### Combo & Vision Adapter
- `imperion-dev`: 17 modelos, estratégia **Fallback — try in order** ✓
- Estratégias disponíveis: Fallback, Round Robin, **Fusion** (paralelo + juiz)
- Vision Adapter: ON (`oc/mimo-v2.5-free`)
- **Audio Adapter: ON mas sem nenhum modelo** (lacuna)

### Outros
- Versão **v0.5.69**; **v0.5.75 disponível** (não atualizei)
- Senha do dashboard ainda é a padrão (o próprio 9Router avisa)
- Tunnel e Tailscale desligados
- Banco em `~/.9router/db/data.sqlite`, com Download/Import Backup na UI

---

## 5. LACUNAS DE INTELIGÊNCIA DO GATEWAY (auditoria de código)

| Lacuna | Detalhe |
|---|---|
| Ordenação | **Só `priority` estática** do JSON. Zero score dinâmico |
| Cooldown | **Não existe.** Gemini em 503 é retentado toda requisição (~8s jogados fora) |
| Erros | 429, 413, 401, 503 e timeout tratados **exatamente igual** |
| Telemetria | **Write-only**: 407 linhas em `gateway.jsonl` nunca lidas por ninguém |
| Catálogo | **14 campos mortos**: `coding_score`, `reasoning_score`, `speed_tps`, `health`, `daily_limit`, `tools`, `agent_capable`, `confidence`… |
| Credenciais | `.env` lido **uma vez no boot**; sem detecção de chave inválida/expirada |
| Classificação | Regex **só em português** — "refactor this" / "design a distributed system" caem em nível errado |
| Contexto | Nível **não considera** tamanho do pedido (só filtra depois) |
| Modalidades | `image_gen`/`audio`/`video` são classificados mas **nunca roteados** |
| Imagens | Adapters Groq/OpenRouter **descartam imagens silenciosamente** |
| Código morto | `router/route.js` + `router/execute.js` — sem importador, com lógica útil enterrada |

---

## 6. ESTADO ATUAL DO SISTEMA (não alterado)

| Componente | Estado | PID |
|---|---|---|
| 9Router 20128 | Saudável | 15320 (inalterado a missão toda) |
| Gateway 20130 | Saudável | 8540 |
| Claude Code | Aponta para 20130 (**rota com tools quebrado**) | — |
| Tarefa agendada | `AI-Orchestrator-Gateway`, "Pronto" | — |
| Lixo no projeto | 43 arquivos de 0 byte | — |

---

## 7. DECISÕES QUE VOCÊ TOMOU

| Questão | Sua decisão |
|---|---|
| Rota principal | **Voltar já ao 9Router**; gateway vira laboratório até passar no teste de tools |
| MCP claude-flow | **Desligar** (maior ganho de contexto); reversível numa linha |
| OAuth de assinaturas (Claude Code/Codex/Copilot) | **Não usar** — sem risco de ToS |
| Escopo de execução | **Fases 0 a 8**, modo contínuo |

---

## 8. PLANO APROVADO — 9 FASES

| Fase | Objetivo |
|---|---|
| **0** | Voltar Claude Code ao 9Router, desligar MCP claude-flow, limpar os 43 arquivos de lixo, validar com tarefa agêntica real |
| **1** | Tool-calling no gateway: repassar `tools`/`tool_choice`, adapter 9Router com tools, tradução p/ Groq/OpenRouter/Gemini |
| **2** | Streaming real (consumo incremental de SSE, keep-alive, medir TTFT) |
| **3** | Score dinâmico lendo a telemetria que já existe |
| **4** | Cooldown, circuit breaker, erro tipado, orçamento de tempo |
| **5** | Capacidades: imagem/áudio, parar o descarte silencioso de imagem |
| **6** | Enxugar contexto: commands/skills, Token Saver, timeout nos PreCompact, processos órfãos |
| **7** | Higiene: remover código morto, recarga de `.env`, health-check de credenciais, tirar a API key do texto claro |
| **8** | Regressão completa + relatório final |

**Teste que faltava e agora é obrigatório:** tarefa agêntica real
(`claude -p "crie um arquivo, rode e corrija"`) — é o único que prova o laço.

---

## 9. RISCOS REGISTRADOS

- Mexer na rota do Claude Code pode deixá-lo inoperante → backup + rollback de 1
  comando antes de cada alteração (padrão já estabelecido)
- Desligar o MCP claude-flow remove as ferramentas `mcp__claude-flow__*`
- Atualizar o 9Router (v0.5.75) pode mudar comportamento — só com backup do SQLite
- OAuth de assinatura própria via proxy: descartado por decisão sua

## 10. ROLLBACK DISPONÍVEL AGORA

```bash
bash "C:/Users/Administrator/Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/CLAUDE_SETTINGS_SWITCH_20260914_002401/ROLLBACK.sh"
```

Backups existentes: `9ROUTER_FIX_20260913_202740`,
`CLAUDE_SETTINGS_GATEWAY_20260913_215609`, `CLAUDE_SETTINGS_SWITCH_20260914_002401`,
`GATEWAY_CATALOG_20260914_000732`, `OPENROUTER_ADAPTER_20260914_070540`,
`NEX_DISABLE_20260914_072332` — todos com `SHA256SUMS.txt`.

---

## 11. LIÇÃO REGISTRADA

A validação anterior (15/15 testes, "infraestrutura VALIDADA") estava
**tecnicamente correta e praticamente insuficiente**: testei streaming, multi-turn,
visão, fallback, system prompt e coding — mas todos como texto puro. Nenhum teste
exercia o laço agêntico, que é o modo real de uso do Claude Code.

Critério novo: **uma integração com o Claude Code só é considerada validada
depois de passar numa tarefa agêntica real que crie, leia e corrija um arquivo.**
