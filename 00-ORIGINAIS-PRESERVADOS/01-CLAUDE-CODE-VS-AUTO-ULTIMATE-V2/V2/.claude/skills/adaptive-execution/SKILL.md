---
name: adaptive-execution
description: Escolhe automaticamente a quantidade de raciocínio, ferramentas, agentes e contexto necessária para cada tarefa, priorizando respostas rápidas em tarefas simples e profundidade apenas quando a tarefa exige.
---

# Execução adaptativa

- Simples: responda diretamente; não use agentes, Ruflo, Playwright, web ou biblioteca local sem necessidade.
- Média: use apenas as ferramentas e Skills necessárias.
- Complexa: use Skills, agentes e Ruflo quando houver ganho real.

Nunca faça varredura global, leia toda a biblioteca ou inicialize swarm por uma pergunta simples.
Não confunda qualidade com quantidade de ferramentas: use o mínimo necessário para obter evidência suficiente.
