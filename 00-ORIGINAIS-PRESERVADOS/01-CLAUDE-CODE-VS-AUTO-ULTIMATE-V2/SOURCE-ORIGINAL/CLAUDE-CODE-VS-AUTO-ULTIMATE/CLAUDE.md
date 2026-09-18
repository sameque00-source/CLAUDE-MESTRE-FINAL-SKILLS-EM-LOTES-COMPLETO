# CLAUDE CODE VS — AUTO ULTIMATE

Ambiente integrado de Claude Code + 9Router + Ruflo + Playwright + biblioteca local de Skills.

## 1. AUTO-ROUTING E VELOCIDADE

Nunca peça ao usuário para escolher "rápido/médio/forte". Classifique a tarefa automaticamente.

### Fast path
Para saudações, conversa, perguntas simples, pequenas transformações, leitura de um arquivo ou comando único:
- responda diretamente;
- não consulte `C:\Users\Administrator\Documents\Inteligencia claude`;
- não use Ruflo/swarm/hive mind;
- não abra agentes;
- não use Playwright/WebSearch/WebFetch sem necessidade;
- não faça glob/grep de todo o projeto;
- não rode verificações só por rotina.

### Adaptive path
Para tarefas médias, use somente as ferramentas e o conhecimento necessários.

### Deep path
Para arquitetura, auditoria, implementação ampla, segurança, debugging difícil, refatoração, testes extensos, deploy ou trabalho multi-módulo:
- consulte seletivamente `C:\Users\Administrator\Documents\Inteligencia claude`;
- escolha Skills específicas, não todas;
- use Ruflo/agentes apenas quando houver partes independentes;
- use 6–8 agentes no máximo por fase;
- paralelize apenas tarefas independentes;
- faça revisão e validação antes de concluir.

Objetivo: máxima qualidade por unidade de tempo. Menos passos inúteis, não menos qualidade.

## 2. MODELOS E 9ROUTER

Endpoint: `http://localhost:20128/v1`.
Perfis Opus/Sonnet/Haiku herdam `imperion-dev`, permitindo que o 9Router faça a seleção dentro do pool configurado.
Não fixe `model:` em agentes sem necessidade.
`FREE_ONLY=true` permanece obrigatório.

Não contorne o 9Router usando API oficial ou credenciais alternativas automaticamente.

## 3. BIBLIOTECA LOCAL DE INTELIGÊNCIA

Pasta central:
`C:\Users\Administrator\Documents\Inteligencia claude`

Use busca seletiva e leia apenas o domínio necessário. Nunca carregue a pasta inteira por padrão.

## 4. AGENTES

O workspace mantém os 25 agentes oficiais em `.claude/agents/`.
Use-os sob demanda. Não recrie registros do Ruflo/Hive Mind.

Fluxo complexo:
ANALISAR → PLANEJAR → DIVIDIR → PARALELO → REVISAR → INTEGRAR → TESTAR → VALIDAR

Somente um escritor por arquivo em determinado momento.

## 5. RUFLO

O runtime é iniciado pelo `.mcp.json` com `npx -y ruflo@latest`.
As Skills do Ruflo estão espelhadas em `.claude/skills/ruflo/` para descoberta local.
Uma cópia de referência dos `.agents` do Ruflo fica em `tools/ruflo/.agents/`.

MCP + agentes são usados só em tarefas que realmente se beneficiam deles.

## 6. SEGURANÇA E ESCOPO

NUNCA tocar:
- `C:\Users\Administrator\Documents\Imperiom Fivem\**`
- VPS `imperion`
- FiveM / FXServer / txAdmin / resources / server.cfg
- SSH/SCP/SFTP/rsync

Nunca ler/escrever secrets, `.env`, chaves SSH ou credenciais.
Nunca inventar segredos.

## 7. EVIDÊNCIA

Não diga "funciona" sem execução real.
Use `[CONFIRMADO]`, `[INFERIDO]`, `[PRECISA VERIFICAÇÃO]`, `[RECOMENDAÇÃO]` quando necessário.

Para qualquer mudança:
ler → localizar causa/impacto → editar o mínimo necessário → testar → revisar → validar.
