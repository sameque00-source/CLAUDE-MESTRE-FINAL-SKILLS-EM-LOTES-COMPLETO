# Início seguro — Claude Code VS FINAL

1. Abra o VS Code pelo arquivo `CLAUDE-CODE-VS.code-workspace`.
2. Confirme que o 9Router está em execução:
   `9router`
3. Abra o Claude Code pela extensão oficial.
4. Use uma nova sessão.

## Estabilização aplicada

- O Agent Teams experimental foi removido do workspace porque não é necessário para o fluxo Ruflo/MCP e adiciona uma camada extra de execução.
- O campo de modelo hard-coded foi removido; o roteamento gratuito continua sendo definido pelos `ANTHROPIC_DEFAULT_*` para `imperion-dev`.
- Hooks locais frágeis foram desativados no workspace; os hooks do Ruflo permanecem via MCP.
- A configuração original está em `backups/pre-claude-code-stability-fix/`.

## Agentes

Os 25 agentes do projeto continuam em `.claude/agents/`.
O Ruflo/claude-flow continua declarado em `.mcp.json`.

## Importante

Este pacote não contém o projeto da pizzaria. A pasta `workspace/pizzaria` pode ser recriada sem alterar a infraestrutura do Claude Code.
