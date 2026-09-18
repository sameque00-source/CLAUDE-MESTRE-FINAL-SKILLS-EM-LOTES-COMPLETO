# Esqueleto conceitual das camadas futuras

> Esta FASE 0 não implementa nenhuma destas camadas. Este documento existe
> para fixar, num só lugar, a interface conceitual que cada camada terá
> quando for construída (fases 1+ do `PLANO-MESTRE-AGENTE-9ROUTER.md`), para
> que a implementação futura tenha um contrato claro desde já — evitando que
> cada fase reinvente a forma de conversar com as outras.

Todas as camadas conversam através de um único estado compartilhado em disco
por missão (`MISSION_STATE.json`, schema definido no plano mestre seção 19) —
mesmo padrão já usado e validado por `gateway/scoring.js`
(`logs/health-state.json`): JSON simples, leitura/escrita best-effort, nunca
derruba a missão se falhar.

```
ORQUESTRADOR
  entrada:  objetivo em linguagem natural (string)
  saida:    decisao AUTO|PLAN + cria MISSION_STATE
  chama:    PLANEJADOR

PLANEJADOR
  entrada:  objetivo + MISSION_STATE (+ achados do PESQUISADOR, se houver)
  saida:    DAG de tarefas (id, descricao, depende_de[], tipo)
  chama:    PESQUISADOR (se precisar de fato novo antes de decompor)

PESQUISADOR
  entrada:  pergunta especifica
  saida:    achados rotulados ([CONFIRMADO]/[INFERIDO]/...)
  chama:    nada (folha da arvore); devolve pro PLANEJADOR

AGENTES (19 especialistas em base-agente/agents/)
  entrada:  1 tarefa do DAG + contexto minimo necessario
  saida:    resultado da tarefa + status
  chamados por: EXECUCAO PARALELA / GERENCIADOR DE AGENTES

EXECUCAO PARALELA
  entrada:  lista de tarefas prontas (sem dependencia pendente entre si)
  saida:    despacha N Agents com run_in_background:true, recolhe resultados
  regra:    nunca 2 tarefas escrevendo no mesmo arquivo ao mesmo tempo

ROTEAMENTO (gateway/scoring.js + gateway/server.js, JA EXISTE)
  entrada:  tipo de subtarefa (texto|codigo|raciocinio|visao|...)
  saida:    modelo escolhido + ordem de fallback
  status:   ja implementado por requisicao; falta granularizar por subtarefa (Fase 7)

FERRAMENTAS
  entrada:  tipo de tarefa
  saida:    lista minima de ferramentas habilitadas para aquela tarefa
  regra:    nunca carregar tudo por padrao (mesmo principio de adaptive-execution)

TESTES
  entrada:  resultado de uma tarefa + criterio de aceite
  saida:    passou/falhou + evidencia real (nunca "deveria funcionar")

AUTOCORRECAO
  entrada:  falha do TESTES
  saida:    nova tentativa corrigida, ou escalonamento se repetir demais
  ciclo:    gerar -> executar -> verificar -> corrigir -> executar de novo

REVISAO (agentes reviewer/security com poder de VETO)
  entrada:  resultado ja testado
  saida:    aprovado -> ENTREGA | reprovado -> volta pra AUTOCORRECAO ou PLANEJADOR

ENTREGA
  entrada:  resultado aprovado
  saida:    resposta final ao usuario + MISSION_STATE marcado concluido
```

## O que já existe hoje e pode virar a base de cada camada

| Camada futura | Base já existente para crescer a partir dela |
|---|---|
| Roteamento | `AI-ORCHESTRATOR/gateway/scoring.js` + `server.js` (score dinâmico, cooldown, fallback, streaming real — tudo testado) |
| Ferramentas | Gerenciamento de tools/tool_choice já implementado nos 4 adapters do Gateway |
| Agentes | `base-agente/agents/` (19 especialistas curados nesta FASE 0) |
| Coordenação/paralelismo | `base-agente/rules/10-coordenacao.md` (padrão `run_in_background:true` já comprovado) |
| Evidência/qualidade | `base-agente/rules/20-evidencia.md` (rótulos + armadilhas reais) |
| Memória de desempenho de modelo | `AI-ORCHESTRATOR/logs/gateway.jsonl` + `health-state.json` (já em produção) |
| Fallback/execução via 9Router | 9Router já rodando (`localhost:20128`), combo `imperion-dev`, 17 modelos internos |

Nenhuma dessas bases precisa ser recriada — a implementação das fases futuras
é **composição**, não reescrita.
