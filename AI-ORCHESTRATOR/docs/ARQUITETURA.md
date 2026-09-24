# AI Orchestrator — Arquitetura (rascunho v0.1)

Status: **EM CONSTRUÇÃO — não ativo.** O 9Router (`localhost:20128`) continua sendo o
roteador em produção enquanto este sistema não for validado (ver `docs/9ROUTER.md`
em `CLAUDE-CODE-VS-AUTO-ULTIMATE`). Nada aqui altera a configuração existente.

## Objetivo
Substituir a escolha manual de "rápido/médio/forte" por um classificador automático
de tarefa + catálogo de modelos gratuitos + fallback em cadeia, custo total R$0.

## Princípio de design
- **Custo zero é regra dura, não preferência.** Nenhum modelo entra no catálogo sem
  confirmação de que o free tier não exige cartão e não tem cobrança automática.
- **Effort proporcional à tarefa.** Nível 0 (saudação) nunca aciona agentes, Ruflo,
  Skills ou reasoning alto. Só nível 3-4 justifica isso.
- **Isolado do sistema atual até validação.** Este orquestrador não escreve em
  `.mcp.json` nem `settings.json` do workspace existente na Fase de construção.
  A troca é uma ação explícita e reversível no final.

## Pipeline

```
entrada do usuário
      ↓
[1] CLASSIFICADOR DE TAREFA  (classifier/)
      → nível 0-4 (heurística leve: tamanho, palavras-chave, presença de código,
        menção a arquitetura/debug/projeto grande, multimodalidade pedida)
      → modalidade requerida: texto | visão | imagem | vídeo | áudio
      ↓
[2] SELETOR DE MODELO  (router/)
      → consulta catalog/models.json (só entradas com free=true e health=ok)
      → filtra por modalidade + capacidade exigida (coding/reasoning/vision/tools)
      → ordena por priority (aprendida) dentro do nível escolhido
      → nível 0-1 nunca aciona agentes/Ruflo/Skills
      → nível 2 pode consultar 1 Skill específica se o tópico bater
      → nível 3-4 pode acionar agentes/Ruflo/paralelismo
      ↓
[3] EXECUÇÃO
      → chama modelo escolhido
      → timeout curto + circuito de fallback (máx. 3 tentativas em provedores
        diferentes, todos free, depois erro claro — nunca cai em pago)
      ↓
[4] REGISTRO  (logs/)
      → latência, sucesso/erro, modelo, nível, effort
      → alimenta priority em catalog/models.json (aprendizado simples, sem ML pesado)
      ↓
resposta
```

## Escada de níveis (ver seção 7 do pedido original)

| Nível | Gatilho (heurística) | Effort | Ferramentas permitidas |
|---|---|---|---|
| 0 | saudação/pergunta trivial, <~15 palavras, sem código | mínimo | nenhuma |
| 1 | pergunta factual/normal, sem código complexo | baixo | leitura simples se pedido |
| 2 | pedido de código pontual, correção, explicação técnica | médio | 1 Skill relevante, sem agentes |
| 3 | arquitetura, debug difícil, pesquisa multi-fonte | alto | agentes pontuais (1-3), Skills relevantes |
| 4 | projeto grande, múltiplas etapas, multimodal complexo | máximo | agentes + Ruflo + paralelismo + Skills + navegador |

A heurística inicial é baseada em regras (palavras-chave + estrutura), não em outro
modelo — para não gastar uma chamada de IA só para classificar. Pode evoluir depois
para um classificador leve treinado com os logs.

## Catálogo de modelos (`catalog/models.json`)
Schema por entrada (ver seção 10 do pedido):
```json
{
  "provider": "",
  "model": "",
  "modality": ["text"],
  "context_window": 0,
  "coding_score": null,
  "reasoning_score": null,
  "vision": false,
  "tools": false,
  "agent_capable": false,
  "speed_tps": null,
  "free": true,
  "requires_card": false,
  "daily_limit": "",
  "health": "unknown",
  "priority": 0,
  "endpoint": "",
  "docs_url": "",
  "source_checked_at": ""
}
```
Populado a partir da pesquisa em andamento (provedores/modelos gratuitos reais,
setembro/2026). Nenhuma entrada é aceita sem `requires_card: false` confirmado.

## Fallback
```
nível decidido → lista ordenada de candidatos (mesmo nível, mesma modalidade)
tenta candidato 1 → falhou/timeout → candidato 2 (provedor diferente) → candidato 3
→ se todos falharem: erro explícito ao usuário, NUNCA fallback silencioso para pago
```

## Integração futura (não feita ainda)
- Agentes (`.claude/agents/*.md` do workspace atual): acionados só a partir do
  nível 3, escolha automática por palavra-chave/domínio (frontend→frontend+uiux,
  backend→backend+architecture, etc. — já documentado em `docs/AGENTES.md`).
- Ruflo/Claude Flow: só nível 4, quando houver benefício real de paralelismo.
- Skills: progressive disclosure — só carrega a Skill cujo tópico bate com a tarefa.
- MCP Playwright: acionado só quando a tarefa pedir navegação/teste real.

## Segurança
- Nenhuma API key em código. Ficam em `config/.env` (fora do controle de versão),
  lido em runtime.
- Logs (`logs/`) nunca gravam token/chave completa.

## Próximos passos
1. Consolidar `catalog/models.json` com o resultado da pesquisa de provedores.
2. Implementar `classifier/` (heurística de níveis).
3. Implementar `router/` (seleção + fallback).
4. Testar os 8 casos da seção 27 do pedido, comparando latência/qualidade com o 9Router.
5. Só então avaliar a troca do padrão.
