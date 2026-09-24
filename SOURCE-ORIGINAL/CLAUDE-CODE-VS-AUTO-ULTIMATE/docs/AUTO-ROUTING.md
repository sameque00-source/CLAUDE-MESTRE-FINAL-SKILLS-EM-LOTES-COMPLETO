# Auto-routing

O sistema usa duas camadas:

1. **Execução adaptativa:** o `CLAUDE.md` decide se a tarefa precisa de resposta direta, ferramentas pontuais ou orquestração Ruflo.
2. **Modelo:** o 9Router recebe `imperion-dev` como alias de sessão e faz o roteamento dentro do pool disponível.

Isso evita inicializar agentes, ler bibliotecas ou fazer varreduras para tarefas simples.
