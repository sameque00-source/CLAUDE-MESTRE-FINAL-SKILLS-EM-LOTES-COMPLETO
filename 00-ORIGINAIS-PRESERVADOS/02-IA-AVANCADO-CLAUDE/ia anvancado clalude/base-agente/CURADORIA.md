# Curadoria — o que foi trazido do CLAUDE-CODE-VS-AUTO-ULTIMATE e por quê

Origem: `C:\Users\Administrator\Documents\CLAUDE-CODE-VS-AUTO-ULTIMATE\CLAUDE-CODE-VS-AUTO-ULTIMATE`
Decisão registrada em: `PLANO-MESTRE-AGENTE-9ROUTER.md` (seções 3.3, 7, 25),
executada nesta FASE 0. **Cópia, não movimentação** — o projeto original
permanece intacto, nada foi apagado dele.

## Trazido (19 agentes)

`architecture`, `backend`, `coding`, `coordinator`, `debugger`, `devops`,
`docs`, `frontend`, `memory`, `optimizer`, `performance`, `queen-coordinator`,
`research`, `reviewer`, `security-auditor`, `security`, `seo`, `testing`,
`uiux`.

Critério: papel genérico e reutilizável, sem overlap com outro agente da
lista, e sem depender de nenhuma peça de infraestrutura específica do projeto
de origem.

## Absorvidos em outro papel (não copiados como agente separado)

| Excluído | Absorvido por |
|---|---|
| `3d` | `frontend` (3D/WebGL é um caso específico de UI) |
| `cli` | `devops` (scripts de automação fazem parte de DevOps) |
| `swarm` | módulo Monitor de Saúde / Sistema de Recuperação do agente futuro (não é um "especialista de domínio", é infraestrutura de orquestração) |
| `mcp` | responsabilidade do Orquestrador/Gerenciador de Ferramentas |
| `hooks` | idem |
| `integration` | idem — contratos entre camadas é decisão do Orquestrador, não um agente à parte |

## Trazido (3 regras, adaptadas)

`rules/00-escopo.md`, `rules/10-coordenacao.md`, `rules/20-evidencia.md` — ver
cada arquivo para o diff exato do que mudou. Resumo: `00-escopo.md` trocou a
linha de "fora de escopo" (era FiveM/Imperion, virou VPS/FiveM/taskkill-IM,
que são as regras absolutas REAIS já em vigor nesta conta); `10-coordenacao.md`
ajustou "25 especialistas" para "19"; `20-evidencia.md` manteve tudo e
**adicionou** uma segunda tabela de armadilhas com bugs reais descobertos nas
sessões do AI-ORCHESTRATOR/9Router (não inventados — cada um tem data e
contexto de onde foi encontrado).

## Trazido (2 skills, sem alteração de conteúdo)

- `adaptive-execution` — meta-regra de proporcionalidade (não usar ferramenta
  pesada pra tarefa trivial). 13 linhas, sem overlap com outra skill.
- `elite-software-engineering` — contrato operacional de engenharia
  (DISCOVER→...→RELEASE) + 8 arquivos de referência. Escolhida como a ÚNICA
  skill de engenharia trazida.

## Explicitamente NÃO trazido (com justificativa)

| Item | Por que não |
|---|---|
| `software-engineering-ultimate` | Redundante com `elite-software-engineering` (mesmo contrato) + contém um catálogo de ~45 "agentes" que não existem como arquivos reais — risco de o modelo alegar ter despachado um especialista fictício |
| `software-engineering-universe` / `universe-ultimate` | Pacotes de referência massivos (3.9M / 27M) cobrindo RH/legal/vendas ou fundamentos de CS genéricos — fora do escopo de um agente enxuto, dilui contexto sem ganho proporcional |
| `.claude/skills/ruflo/` (135 subpastas) | Peso morto confirmado — duplicado byte-a-byte com `tools/ruflo/.agents/skills/` no mesmo projeto de origem; maioria sem relação com o objetivo (ex: `agent-trading-predictor`, `agent-agentic-payments`) |
| `tools/ruflo/v3-agent-templates/*.yaml` | Placeholders rasos (poucas linhas de metadados, sem comportamento real) — os agentes `.md` copiados acima são muito superiores |
| `.claude/hooks/` (vazio no original) | Nada para trazer — e o próprio projeto de origem já tinha removido hooks por instabilidade (`cmd /c` aninhado), o mesmo bug encontrado independentemente nesta conta |
| `.claude/commands/` (vazio no original) | Nada para trazer |
| `INICIO-SEGURO.md`, `MANIFEST-AUTO.md`, scripts `verificar-*.ps1` | Amarrados a caminhos e a instalação específica daquele workspace, não reutilizáveis sem reescrita completa |
| `tools/ruflo/.agents/config.toml` | Configuração do Codex CLI (OpenAI), não do Claude Code — ferramenta diferente |

## Status desta curadoria

Os arquivos estão **prontos e organizados**, mas **não estão ligados a nada
ainda** — nenhum `settings.json`, nenhum `.claude/agents/` oficial, nenhuma
configuração viva foi alterada por esta cópia. Ligar isso ao Orquestrador é
trabalho de fases futuras (ver `PLANO-MESTRE-AGENTE-9ROUTER.md`, Fase 4/14).
