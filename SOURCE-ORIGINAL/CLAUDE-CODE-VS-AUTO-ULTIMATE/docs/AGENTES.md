# Os 25 Agentes

Persistidos em `.claude-flow/agents/store.json`. **Nunca recrie** — eles já estão
registrados no Hive Mind e sobrevivem a reinícios.

Verifique a qualquer momento:

```bash
.\scripts\verificar-agentes.ps1
```

---

## Queen

| Agente | Tipo | Papel |
|---|---|---|
| `queen-coordinator` | hierarchical-coordinator | Orquestrador. Divide a tarefa, decide o que roda em paralelo, consolida resultados. |

---

## Workers (24)

### Arquitetura e código

| Agente | Domínio | Quando chamar |
|---|---|---|
| `agent-architecture` | arquitetura | Antes de mudar algo: quem depende de quê, o que quebra junto |
| `agent-coding` | código geral | Escrever ou refatorar código de propósito geral |
| `agent-backend` | backend | API, servidor, banco, autenticação |
| `agent-frontend` | frontend | UI, componentes, estado, responsividade |
| `agent-3d` | gráficos 3D | WebGL, Three.js, shaders, cena 3D |

### Qualidade e segurança

| Agente | Domínio | Quando chamar |
|---|---|---|
| `agent-security` | segurança | **VETO** — tocou auth, permissão, dinheiro ou dado sensível |
| `agent-security-auditor` | auditoria | Varredura ampla de vulnerabilidades |
| `agent-reviewer` | revisão | **VETO** — revisão adversarial antes de integrar |
| `agent-testing` | testes | Criar e rodar testes, critérios de aceite |
| `agent-debugger` | debugging | Investigar e corrigir erro concreto |

### Performance

| Agente | Domínio | Quando chamar |
|---|---|---|
| `agent-performance` | performance | Caçar gargalo real, medir antes de otimizar |
| `agent-optimizer` | otimização | Aplicar otimizações já identificadas |

### Conteúdo e experiência

| Agente | Domínio | Quando chamar |
|---|---|---|
| `agent-uiux` | UI/UX | Design system, paleta, tipografia, fluxo |
| `agent-seo` | SEO e conteúdo | Meta tags, copy, estrutura semântica |
| `agent-docs` | documentação | README, docs técnicos, comentários |
| `agent-research` | pesquisa | Levantar opções, comparar stacks, buscar precedente |

### Infra e plataforma

| Agente | Domínio | Quando chamar |
|---|---|---|
| `agent-devops` | devops | CI/CD, deploy, containers, pipeline |
| `agent-integration` | integração | Conectar módulos, contratos entre sistemas |
| `agent-mcp` | MCP | Servidores MCP, ferramentas, protocolo |
| `agent-cli` | CLI | Ferramentas de linha de comando, scripts |
| `agent-hooks` | hooks | Automação por hook, gatilhos de sessão |

### Coordenação

| Agente | Domínio | Quando chamar |
|---|---|---|
| `agent-coordinator` | gestão de projeto | Consolidar resultados, roadmap, síntese final |
| `agent-swarm` | swarm | Topologia, distribuição de carga entre agentes |
| `agent-memory` | memória | Armazenar e recuperar contexto entre sessões |

---

## Como usar

Você **não chama os agentes diretamente**. Peça a tarefa ao Claude Code e ele
(como coordenador) decide quem despachar:

```
Refatore o módulo de autenticação. Use arquitetura e segurança em paralelo,
depois passe pelo reviewer antes de aplicar.
```

O coordenador vai:

1. Despachar `agent-architecture` e `agent-security` com `run_in_background: true`
2. Aguardar as duas notificações
3. Despachar `agent-reviewer` com o resultado das duas
4. Integrar ele mesmo no arquivo final

---

## Regras de coordenação

1. **Paralelize com `run_in_background: true`.** É o único paralelismo real neste ambiente.
2. **Só o coordenador integra.** Dois agentes nunca escrevem no mesmo arquivo.
3. **Alto risco exige 2 análises.** Sempre `agent-reviewer`; e `agent-security` quando tocar auth, permissão ou dado sensível.
4. **VETO bloqueia.** Se `agent-security` ou `agent-reviewer` reprovar, não integre — corrija primeiro.
5. **Contexto sob medida.** Passe ao agente só os caminhos que ele precisa, não o projeto inteiro.
6. **Relate divergência.** Se dois agentes discordarem, mostre as duas posições e diga qual você escolheu e por quê.

---

## Quando NÃO montar equipe

Pergunta simples, leitura de um arquivo, comando único: responda direto.
Equipe custa tempo — use quando a tarefa tem partes independentes de verdade.

---

## Agentes locais adicionais

Além dos 25 do Ruflo, existem agentes especializados em `%USERPROFILE%\.claude\agents\`
(arquiteto, seguranca, revisor, qa-testes, performance, fivem-lua, banco-sql,
ui-nui, auditor-imperion). Esses são específicos do projeto IMPERION/FiveM e
**não** devem ser usados neste workspace.
