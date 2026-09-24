# RELATÓRIO FINAL — MISSÃO NOTURNA (CLAUDE POWER)

**Executado em:** 2026-09-14 (3 rodadas: madrugada + manhã após autenticações + auditoria/correção final)
**Escopo:** infraestrutura de IA local (9Router 20128 + Gateway AI-Orchestrator 20130 + Claude Code)
**Custo total:** R$ 0,00 — nenhum cartão, cobrança, plano ou trial pago foi ativado.

---

## -1. RODADA 3 — AUDITORIA DE CONSISTÊNCIA E CORREÇÃO (definitiva)

Uma auditoria de consistência (somente leitura) encontrou 3 problemas reais no
relatório da Rodada 2. Os números abaixo são os **números corrigidos, contados
programaticamente a partir do código e do catálogo reais** — não são estimativa.

**Método de contagem:** `Object.keys(ADAPTERS)` em `providers.js` cruzado com
`catalog/models.json`, filtrando `free === true && requires_card !== true`
(exatamente o mesmo filtro que o `eligible()` do `server.js` usa em produção).

| # | Problema encontrado | Correção |
|---|---|---|
| 1 | Relatório da Rodada 2 dizia "11 modelos com adapter ativo" — a própria tabela somava 12, e o real (incluindo o nex, então elegível) era 13. | **Contagem oficial agora: 12 modelos realmente elegíveis** (ver tabela na seção 6, recontada abaixo). |
| 2 | `nex-agi/nex-n2.5-pro:free` (OpenRouter) estava no catálogo desde 2026-09-13 com `confidence: "PRECISA_VERIFICACAO"`, nunca testado, mas ficou elegível por herdar o adapter genérico do OpenRouter. | **Testado individualmente agora**: `HTTP 200`, conteúdo correto (`"NEX_OK"`), custo `$0` confirmado, **mas 120 segundos de latência em 2 tentativas consecutivas** — inadequado para roteamento interativo. **Desabilitado** (`free: false` no catálogo, registro mantido para histórico, não apagado). Backup em `NEX_DISABLE_20260914_072332`. |
| 3 | Ambiguidade sobre "Cloudflare corrigida" podia sugerir adapter direto no gateway. | **Esclarecido**: Cloudflare **não tem e nunca teve adapter no gateway** (`providers.js` não tem entrada `Cloudflare`). A correção da Rodada 2 foi só dentro do **banco de dados do 9Router** — Cloudflare só é alcançável indiretamente, através do provider `9Router` (que expõe o combo `imperion-dev`). |

**Regressão após a correção:** suíte 15/15 re-executada, `nex-n2.5-pro` confirmado
fora da lista de elegíveis (`comAdapter.some(m=>m.id==='openrouter-nex-n2.5-pro')`
→ `false`), 9Router e Gateway com os mesmos PIDs de antes da auditoria (nenhum
reinício foi necessário — o catálogo é recarregado do disco a cada requisição).

---

## 0. RODADA 2 — APÓS AUTENTICAÇÕES (resumo executivo)

Você autenticou Cloudflare e OpenRouter no navegador. Isso desbloqueou:

| Antes desta rodada | Depois desta rodada |
|---|---|
| 3 provedores com adapter (Google, Groq, 9Router) | **4 provedores** com adapter (+ OpenRouter) |
| Cloudflare "cloude fire" permanentemente quebrada (Account ID = a própria chave, erro de dados) | **Corrigida**: token novo gerado, Account ID certo, `valid:true` confirmado pela API do 9Router |
| Fallback parava em 2 camadas reais (Google→Groq) antes do 9Router | **4 camadas reais** testadas com falha controlada: Google→Groq→OpenRouter→9Router |
| 17 modelos no catálogo | **19 modelos** (2 novos do OpenRouter, `:free`, chave com Key limit **$0** travado) |
| Bug latente: lista de candidatos cortava em 4, provedor novo nunca era alcançado mesmo com os outros quebrados | **Corrigido**: corte subiu pra 6, testado e confirmado que OpenRouter agora é alcançado de verdade |

**Achado real que não escondo:** a conta Cloudflare recém-corrigida está com a cota diária de 10.000 neurons **já esgotada hoje** (uso anterior, não desta sessão). A correção é válida e vai funcionar sozinha quando a cota resetar (diariamente) — não é um problema resolvido pela metade, é uma cota temporariamente cheia.

**Testes desta rodada:** suíte completa 15/15 rodada 2×, mais 3 testes de fallback em camadas (Google quebrado→Groq; +Groq quebrado→OpenRouter; +OpenRouter quebrado→9Router) e teste real do `claude -p` após kill+recuperação do gateway. Tudo aprovado.

---

## 1. ESTADO INICIAL

| Item | Situação no começo |
|---|---|
| 9Router (20128) | Saudável, rota **ativa** do Claude Code, combo `imperion-dev` |
| Gateway (20130) | Rodando, mas **isolado** — nunca integrado ao Claude Code |
| Integração Claude Code → Gateway | **Falhava** (timeout); revertida 2× em sessão anterior |
| Provedores no gateway | 2 (Groq, Google AI Studio) |
| Fallback | Parcial — sem consciência de tamanho de contexto |
| Autenticação no gateway | Existente (x-api-key / Bearer) |
| Persistência do gateway | **Nenhuma** — morria e não voltava |

### Divergências plano × realidade encontradas
O plano da missão citava três caminhos que **não existem** no sistema real:
- `C:\Users\Administrator\Documents\ruflo-main` — **não existe**
- `C:\Users\Administrator\Documents\Inteligencia claude` — **não existe**
- `C:\Users\Administrator\Downloads\imagens test` — existia, porém **vazia**

O Ruflo real está apenas como cópia de referência dentro de
`CLAUDE-CODE-VS-AUTO-ULTIMATE\tools\ruflo` e como pacote MCP npm (`ruflo@latest`).

---

## 2. ESTADO FINAL

```
Claude Code
   ↓  (ANTHROPIC_BASE_URL = http://localhost:20130)
Gateway AI-Orchestrator 20130   ← rota principal
   ↓  classificador (nível 0-4, ignora system-reminders)
   ↓  estimativa de tokens do pedido
   ↓  seleção de candidatos que CABEM no pedido
   ├─ Google AI Studio (Gemini)   ← contexto grande, visão
   ├─ Groq                        ← rápido, só pedidos < 7k tokens
   └─ 9Router 20128 (imperion-dev) ← backup final, cota independente
   ↓  validação de conteúdo (resposta vazia = falha)
   ↓  fallback automático com timeout por tentativa
resposta
```

| Item | Situação final |
|---|---|
| 9Router (20128) | **Intacto**, PID 15320 o tempo todo, saudável, 33 modelos |
| Gateway (20130) | **Rota principal**, com autostart no logon |
| Claude Code | **Funcionando pelo gateway** (validado com o binário real) |
| Provedores ativos | 3 (Google, Groq, 9Router) — 9 modelos com adapter |
| Fallback | 3 camadas, testado com falha controlada real |
| Persistência | Tarefa agendada `AI-Orchestrator-Gateway` (onlogon) |

---

## 3. O QUE FOI ALTERADO

| Arquivo | Alteração |
|---|---|
| `gateway/server.js` | Estimativa de tokens; filtro de candidatos por capacidade real; só provedores com adapter; 9Router sempre como backup final; validação de resposta vazia; captura de exceção por candidato |
| `gateway/providers.js` | Adapter do **9Router** (novo); parser de SSE Anthropic; timeout por tentativa (`fetchWithTimeout`) |
| `catalog/models.json` | `max_request_tokens` real da Groq (7000); entrada do 9Router; Groq habilitada no nível 4 |
| `classifier/classify.js` | `stripSystemReminders` — ignora contexto injetado do Claude Code na classificação |
| `~/.claude/settings.json` | `ANTHROPIC_BASE_URL` → `http://localhost:20130`; modelos padrão → `claude-sonnet-5` |
| `start-gateway.cmd` | **Novo** — inicialização desanexada e idempotente |
| Tarefa agendada | **Nova** — `AI-Orchestrator-Gateway` (onlogon) |
| `Downloads\imagens test\` | **Nova** suíte de testes + imagens + resultados |

---

## 4. O QUE FOI CORRIGIDO (bugs reais, com evidência)

1. **Classificação envenenada pelo contexto do Claude Code** — o CLI injeta o
   `CLAUDE.md` como turno `user`; o classificador lia isso como a intenção e
   promovia tarefas triviais a nível 4. *Corrigido: blocos `<system-reminder>`
   são removidos antes de classificar.*
2. **Groq recebendo pedidos impossíveis** — teto real de 8.000 tokens/minuto vs.
   13-17k tokens que o Claude Code manda por turno → `HTTP 413` em loop.
   *Corrigido: estimativa de tokens + exclusão automática da Groq em pedidos grandes.*
3. **9Router nunca alcançado no fallback** — vagas da lista de candidatos eram
   ocupadas por provedores **sem adapter** (Cloudflare/OpenRouter).
   *Corrigido: só entram provedores com adapter; 9Router sempre fecha a cadeia.*
4. **Falso positivo de sucesso** — 9Router responde sempre em SSE; o adapter
   fazia `JSON.parse`, falhava em silêncio e devolvia `ok:true` com texto vazio.
   *Corrigido: parser SSE + regra "texto vazio = falha".*
5. **Provedor lento consumindo todo o orçamento** — Gemini levava 18,5s para
   retornar 503 antes do fallback. *Corrigido: timeout de 20s por tentativa.*
6. **Recursão infinita** introduzida durante a própria correção anterior
   (`fetchWithTimeout` chamando a si mesmo). *Detectada e corrigida antes de subir.*
7. **Script de autostart travando o chamador** — `start /b` mantinha stdout preso.
   *Corrigido com `Start-Process` desanexado.*

---

## 5. TESTES E RESULTADOS

Suíte automatizada: `C:\Users\Administrator\Downloads\imagens test\suite-testes.js`
Resultados: `resultado-testes.json` / `resultado-testes.md`

**15/15 aprovados** (executada 2× — antes e depois das mudanças finais):

| Teste | Resultado |
|---|---|
| health gateway 20130 | PASS |
| health 9Router 20128 | PASS |
| 9Router `/v1/models` (33 modelos) | PASS |
| auth sem chave → 401 | PASS |
| tarefa simples | PASS |
| matemática (17×4=68) | PASS |
| coding — **código executado de verdade**, retorna 42 | PASS |
| multi-turn mantendo contexto de código | PASS |
| system prompt respeitado | PASS |
| streaming SSE (6 eventos + conteúdo) | PASS |
| visão (verde) | PASS |
| visão (azul) | PASS |
| roteamento por tamanho (pedido grande não vai pra Groq) | PASS |
| sem travamento | PASS |
| nenhuma credencial exposta | PASS |

### Testes adicionais de falha controlada
- **Fallback 3 camadas:** Google **e** Groq invalidados de propósito →
  cascateou → **9Router respondeu corretamente**. Credenciais restauradas depois.
- **Timeout:** com `GATEWAY_CALL_TIMEOUT_MS=1`, os 4 candidatos falharam em
  **212ms** com erro claro — sem travar, sem loop infinito.
- **Recuperação:** gateway morto de propósito → tarefa agendada acionada →
  voltou saudável.
- **Claude Code real (`claude -p`), ambiente limpo:** 6 execuções, todas `exit 0`
  (simples, matemática, explicação, código Python, código JS/validarCPF).
- **Validação de qualidade:** a função `validarCPF` gerada pelo gateway foi
  **executada** contra 5 casos de teste — 5/5 corretos.

---

## 6. PROVEDORES E MODELOS VÁLIDOS

**Contagem oficial (Rodada 3, recontada programaticamente):**
**4 provedores com adapter real** no gateway · **12 modelos realmente elegíveis**
de **19 entradas no catálogo** (6 catalogadas sem adapter/inertes + 1 desabilitada
por latência = 7 fora da seleção).

| Provedor | Modelo | Níveis | Teto por pedido | Status |
|---|---|---|---|---|
| Google AI Studio | `gemini-flash-lite-latest` | 0, 1 | — | validado |
| Google AI Studio | `gemini-3.1-flash-lite` | 0, 1 | — | validado |
| Google AI Studio | `gemini-flash-latest` | 2, 3, visão | — | validado |
| Google AI Studio | `gemini-3.6-flash` | 3, 4 | — | validado |
| Groq | `qwen/qwen3.8-27b` | 0, 1, 2 | 7.000 tokens | validado |
| Groq | `openai/gpt-oss-120b` | 2, 3, 4 | 7.000 tokens | validado |
| Groq | `groq/compound` | 3, 4 | 7.000 tokens | validado |
| Groq | `whisper-large-v3-turbo` | áudio (STT) | — | validado |
| OpenRouter | `nvidia/nemotron-3.5-lightning:free` | 3, 4 | Key limit $0 | validado |
| OpenRouter | `nvidia/nemotron-3-ultra-550b-a55b:free` | 3, 4 | Key limit $0 | validado |
| OpenRouter | `nvidia/nemotron-3-super-120b-a12b:free` | 3, 4 | Key limit $0 | **validado — usado de verdade no teste de fallback** (log real) |
| 9Router | `imperion-dev` (combo 17 modelos internos) | 0-4 (backup final) | — | validado |

**Desabilitado nesta rodada** (não conta nos 12 acima):
`nex-agi/nex-n2.5-pro:free` (OpenRouter) — testado individualmente 2×, sempre
**HTTP 200 com conteúdo correto**, mas **120 segundos de latência**. Marcado
`free: false` no catálogo (elegibilidade fechada), registro preservado.

**Cloudflare — esclarecimento definitivo:** não é provedor do gateway. Não existe
`Cloudflare` em `Object.keys(ADAPTERS)` de `providers.js`. A correção feita na
Rodada 2 (Account ID + token novos) foi **dentro do banco do 9Router**, e só
importa porque o 9Router é um dos 4 provedores do gateway — Cloudflare em si
nunca é chamado diretamente pelo gateway.

**Fallback real, comprovado por log** (`gateway.jsonl`, não simulado):
```
Google (quebrado de propósito) → Groq (quebrado de propósito)
  → OpenRouter: {"candidate":"openrouter-nemotron-3-super-120b","ok":true}
  → (OpenRouter também quebrado) → 9Router: {"used":"imperion-dev","ok":true}
```
Cadeia **Google → Groq → OpenRouter → 9Router** confirmada ponta a ponta.

Imagem: **Pollinations.ai** (sem conta, validado gerando uma maçã real).

---

## 7. CREDENCIAIS — SOMENTE STATUS

| Serviço | Status | Observação |
|---|---|---|
| Groq | **Válida** | Camada gratuita, sem cartão |
| Google AI Studio | **Válida** | Projeto confirmado em "Nível gratuito", sem faturamento |
| 9Router (local) | **Válida** | Chave local do próprio roteador |
| Gateway 20130 | **Válida** | Mesma chave local, autenticação obrigatória |
| OpenRouter | **Válida (nova)** | Conta sem cartão, sem método de pagamento; chave dedicada criada com **Key limit $0** — fisicamente não pode gastar |
| Cloudflare "9router" (principal) | **Válida** | Sempre esteve OK |
| Cloudflare "cloude fire" (backup) | **Corrigida** | Tinha Account ID errado (bug de dados: campo continha a própria chave); token novo gerado e vinculado à conta certa; `valid:true` confirmado. Cota diária de hoje já esgotada (recupera sozinha amanhã) |
| ElevenLabs | **Não utilizada** | Conta em plano `payg` (pago) — bloqueada por regra de R$0 |

Nenhum valor de credencial aparece neste relatório, nos logs, no código ou nos
arquivos de teste — verificado por varredura automática (0 vazamentos).
As chaves ficam apenas em `AI-ORCHESTRATOR\config\.env`, protegido por `.gitignore`.

---

## 8. PENDÊNCIAS HUMANAS INEVITÁVEIS

1. ~~Cloudflare "cloude fire" quebrada~~ — **resolvida nesta rodada** (você autenticou,
   corrigi o Account ID e gerei token novo). Sem pendência.
2. ~~OpenRouter sem login~~ — **resolvida nesta rodada**. Sem pendência.
3. **ElevenLabs** — a conta está em plano pago (`payg`). Usar exigiria autorizar
   gasto. Deixado sem uso por decisão de regra (R$0). Só você pode decidir trocar
   de conta ou autorizar o gasto.
4. **Cota diária Cloudflare (conta única, ambas conexões)** — esgotada hoje por uso
   anterior à missão. Reseta sozinha amanhã, sem ação necessária.
5. **Cota diária do Gemini** — pode esgotar com uso intenso; recupera sozinha no
   reset diário, e o fallback (Groq → OpenRouter → 9Router) cobre o intervalo.

---

## 9. BACKUPS E ROLLBACK

Todos em `C:\Users\Administrator\Documents\Imperiom Fivem\BACKUPS_AMBIENTE_LOCAL\`:

| Backup | Conteúdo | Rollback |
|---|---|---|
| `CLAUDE_SETTINGS_SWITCH_20260914_002401` | `settings.json` antes da troca | `ROLLBACK.sh` (volta ao 9Router) |
| `CLAUDE_SETTINGS_GATEWAY_20260913_215609` | `settings.json` anterior | `ROLLBACK.sh` |
| `GATEWAY_CATALOG_20260914_000732` | catálogo + código do gateway | cópia manual dos `.bak` |
| `9ROUTER_FIX_20260913_202740` | combos do 9Router | `ROLLBACK.sh` |
| `OPENROUTER_ADAPTER_20260914_070540` | gateway + catálogo antes do adapter OpenRouter | cópia manual dos `.bak` |

Todos com `SHA256SUMS.txt` verificável.

**Rollback rápido (volta o Claude Code para o 9Router):**
```bash
bash "C:/Users/Administrator/Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/CLAUDE_SETTINGS_SWITCH_20260914_002401/ROLLBACK.sh"
```

Para remover o autostart do gateway:
```cmd
schtasks /delete /tn "AI-Orchestrator-Gateway" /f
```

---

## 10. PROBLEMAS RESTANTES / LIMITAÇÕES REAIS

1. **Dependência do gateway:** com o Claude Code apontando para a 20130, se o
   gateway cair o Claude Code para. Mitigado por autostart + idempotência, mas
   não é redundância real. O rollback de 1 comando é a rede de segurança.
2. **Latência da visão:** 17-21s em alguns casos (modelos Gemini sob demanda).
   Funciona, mas não é rápido.
3. **Sem geração de vídeo gratuita** — não existe opção confirmada em 2026-09.
4. **Cloudflare e OpenRouter sem adapter** no gateway — estão no catálogo mas
   são ignorados pelo seletor até que um adapter seja escrito.
5. **Groq é limitada para uso real do Claude Code** — o teto de 8k tokens/minuto
   é menor que o overhead típico de um turno; serve para tarefas curtas e como
   acelerador, não como rota principal.

---

## 11. PRÓXIMOS PASSOS SUGERIDOS

1. Escrever adapters para Cloudflare Workers AI e OpenRouter (aumenta a
   diversidade de cota gratuita).
2. Usar os logs de `logs/gateway.jsonl` para ajustar `priority` automaticamente
   por latência e taxa de sucesso (aprendizado já previsto na arquitetura).
3. Reconectar a conta Cloudflare inválida quando houver acesso ao painel.
