---
name: software-engineering-ultimate
description: Conjunto consolidado de capacidades para transformar o Claude em um agente de engenharia de software, arquitetura, segurança, testes, browser, APIs, banco, IA, DevOps, SEO, performance, documentação e orquestração. Use esta habilidade quando a tarefa exigir execução completa, análise profunda, desenvolvimento, revisão e validação ponta a ponta.
---

# Software Engineering Ultimate

Esta é uma habilidade consolidada. Execute as instruções abaixo como um sistema único e coordenado. Nunca invente ferramentas, agentes, resultados, integrações ou testes. Quando uma capacidade não estiver disponível no ambiente, registre a limitação e use a melhor alternativa real. Priorize segurança, qualidade, verificabilidade e conclusão ponta a ponta.


---
## CATALOGO DE AGENTES DO PACOTE

- **3d**: Graficos 3D: WebGL, Three.js, shaders, cena, camera, iluminacao, performance de render. Use apenas quando a tarefa envolve 3D de verdade.
- **accessibility-specialist**: Use this agent when the task involves Audit and improve WCAG-oriented semantics, keyboard access, focus, contrast, labels, and motion. Examples:
- **ai-architect**: Use this agent when the task involves Design AI provider abstraction, model routing, prompts, tool use, memory, evals, and fallbacks. Examples:
- **api-architect**: Use this agent when the task involves Design and review HTTP APIs, contracts, versioning, validation, error models, and compatibility. Examples:
- **architecture**: Analisa arquitetura, dependencias e impacto ANTES de mudar codigo. Use para descobrir quem depende de que, o que quebra junto e se ja existe solucao no projeto. Somente leitura.
- **backend**: Implementa e corrige backend: API, rotas, servidor, banco, autenticacao, jobs. Use quando a mudanca e no lado servidor.
- **ci-cd-engineer**: Use this agent when the task involves Build reliable CI/CD pipelines, gates, artifacts, rollback plans, and environment promotion. Examples:
- **cli**: Ferramentas de linha de comando e scripts de automacao (bash, PowerShell, Python). Use para criar ou corrigir script operacional.
- **cloudflare-engineer**: Use this agent when the task involves Design and validate Cloudflare Pages, Workers, routes, bindings, and deployment configuration. Examples:
- **coding**: Escreve e refatora codigo de proposito geral. Use quando a tarefa e implementar ou reestruturar codigo que nao se encaixa em backend, frontend ou 3D.
- **coordinator**: Consolida os resultados JA produzidos por varios agentes numa sintese unica com veredicto. Use NO FIM, depois que os especialistas entregaram - nunca no inicio (para planejar use queen-coordinator).
- **data-quality-engineer**: Use this agent when the task involves Validate data contracts, normalization, invariants, duplication, and corruption risks. Examples:
- **database-engineer**: Use this agent when the task involves Design and review schemas, migrations, indexes, queries, transactions, and data integrity. Examples:
- **debugger**: Investiga e corrige erro concreto: stack trace, comportamento errado, teste falhando. Use quando ja existe um sintoma observado.
- **dependency-auditor**: Use this agent when the task involves Audit dependencies, lockfiles, licenses, versions, supply-chain risks, and unused packages. Examples:
- **devops**: CI/CD, deploy, containers, pipeline e configuracao de ambiente. Use para automacao de build e entrega. NAO toca em producao sem aprovacao explicita.
- **docs**: Escreve e atualiza documentacao: README, docs tecnicos, comentario de API. Use depois que o codigo esta estavel.
- **e2e-engineer**: Use this agent when the task involves Own browser-level end-to-end coverage, fixtures, journeys, screenshots, and regression checks. Examples:
- **frontend**: Implementa e corrige frontend: UI, componentes, estado, responsividade, acessibilidade. Use para mudancas no lado cliente.
- **hooks**: Hooks do Claude Code e automacao por gatilho de sessao (SessionStart, PostToolUse, etc). Use para configurar ou diagnosticar hook.
- **incident-responder**: Use this agent when the task involves Diagnose failures systematically, contain impact, identify root cause, and verify recovery. Examples:
- **infrastructure-engineer**: Use this agent when the task involves Review local/runtime infrastructure, processes, ports, environment, and reproducible setup. Examples:
- **integration**: Conecta modulos e sistemas: contratos entre camadas, formato de dados, compatibilidade de interface. Use quando frontend e backend precisam conversar.
- **mcp**: Servidores MCP, ferramentas MCP e protocolo. Use para configurar, diagnosticar ou estender integracao MCP.
- **memory**: Memoria e contexto entre sessoes: o que guardar, onde guardar, como recuperar. Use para organizar conhecimento persistente do projeto.
- **observability-engineer**: Use this agent when the task involves Design logging, metrics, tracing, health checks, alerts, and operational diagnostics. Examples:
- **optimizer**: Aplica otimizacoes JA identificadas e medidas. Use depois que performance apontou o gargalo - nao use para procurar gargalo.
- **performance**: Caca gargalo real de CPU, memoria, rede e render. Use quando algo esta lento. Mede antes de opinar. Somente leitura.
- **privacy-engineer**: Use this agent when the task involves Review collection, retention, exposure, consent, minimization, and privacy-sensitive flows. Examples:
- **product-architect**: Use this agent when the task involves Define product requirements, acceptance criteria, scope, and user journeys before implementation. Examples:
- **prompt-engineer**: Use this agent when the task involves Improve system prompts, task decomposition, agent instructions, evaluation prompts, and guardrails. Examples:
- **queen-coordinator**: Planeja a divisao de uma tarefa grande em fases e agentes. Use NO INICIO, antes de despachar qualquer especialista, para descobrir o que pode rodar em paralelo e em que ordem. Entrega um plano de execucao - nao executa nem despacha.
- **release-manager**: Use this agent when the task involves Coordinate release readiness, changelog, versioning, gates, rollback, and final sign-off. Examples:
- **requirements-analyst**: Use this agent when the task involves Turn vague requests into explicit requirements, constraints, edge cases, and verification criteria. Examples:
- **research**: Levanta opcoes, compara alternativas e busca precedente antes de decidir. Use no inicio, quando ainda nao esta claro qual caminho seguir. Somente leitura.
- **reviewer**: Revisor adversarial independente. Use por ULTIMO, antes de integrar o trabalho dos outros agentes. Procura o que passou despercebido e questiona decisoes. Nao produz codigo. TEM PODER DE VETO.
- **security-auditor**: Varredura ampla e somente-leitura em busca de vulnerabilidades no projeto inteiro. Use para auditoria periodica, nao para revisar uma mudanca especifica (para isso use security).
- **security**: Caca exploit, falta de validacao server-side, exposicao de credencial e escalada de privilegio. Use SEMPRE que a mudanca tocar autenticacao, permissao, dinheiro, dado pessoal ou operacao administrativa. TEM PODER DE VETO.
- **seo**: Conteudo textual, meta tags, estrutura semantica e copy. Use para escrever o texto da pagina e otimizar descoberta.
- **swarm**: Topologia do swarm, distribuicao de carga e coordenacao entre agentes do Ruflo. Use para diagnosticar ou ajustar a configuracao da equipe.
- **test-engineer**: Use this agent when the task involves Design comprehensive unit, integration, contract, and regression test strategies. Examples:
- **testing**: Projeta e executa testes, casos extremos e criterios de aceite. Use DEPOIS que o codigo existe e ANTES de considerar a tarefa concluida.
- **ui-design-specialist**: Use this agent when the task involves Translate brand direction into consistent components, visual hierarchy, layout, and states. Examples:
- **uiux**: Design system, paleta, tipografia, hierarquia visual e fluxo de uso. Use ANTES de implementar interface, para definir a direcao visual. Nao escreve codigo de producao.
- **ux-researcher**: Use this agent when the task involves Evaluate user flows, friction, information architecture, and task completion using evidence. Examples:

---
## CAPACIDADE: analytics-instrumentation

---
name: analytics-instrumentation
description: Add privacy-aware analytics and event instrumentation with stable event contracts. Use when this capability is relevant to the current task.
---

# Analytics Instrumentation

## Objective
Add privacy-aware analytics and event instrumentation with stable event contracts.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: auditing-dependencies

---
name: auditing-dependencies
description: Audit package manifests, lockfiles, supply-chain risks, licenses, and drift. Use when this capability is relevant to the current task.
---

# Auditing Dependencies

## Objective
Audit package manifests, lockfiles, supply-chain risks, licenses, and drift.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: auditing-projects

---
name: auditing-projects
description: Audit an entire codebase and produce an evidence-based architecture, risk, and readiness report. Use when this capability is relevant to the current task.
---

# Auditing Projects

## Objective
Audit an entire codebase and produce an evidence-based architecture, risk, and readiness report.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: auditing-secrets

---
name: auditing-secrets
description: Detect secret exposure patterns without printing secret values. Use when this capability is relevant to the current task.
---

# Auditing Secrets

## Objective
Detect secret exposure patterns without printing secret values.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: building-memory-systems

---
name: building-memory-systems
description: Design memory/context strategies with relevance, privacy, compaction, and retrieval safeguards. Use when this capability is relevant to the current task.
---

# Building Memory Systems

## Objective
Design memory/context strategies with relevance, privacy, compaction, and retrieval safeguards.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: coordinating-agents

---
name: coordinating-agents
description: Coordinate multiple agents with ownership, conflict avoidance, synthesis, and verification. Use when this capability is relevant to the current task.
---

# Coordinating Agents

## Objective
Coordinate multiple agents with ownership, conflict avoidance, synthesis, and verification.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: cost-optimization

---
name: cost-optimization
description: Reduce infrastructure and model costs without sacrificing critical quality. Use when this capability is relevant to the current task.
---

# Cost Optimization

## Objective
Reduce infrastructure and model costs without sacrificing critical quality.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: debugging-systematically

---
name: debugging-systematically
description: Diagnose bugs using reproduction, evidence, hypotheses, isolation, fix, and regression checks. Use when this capability is relevant to the current task.
---

# Debugging Systematically

## Objective
Diagnose bugs using reproduction, evidence, hypotheses, isolation, fix, and regression checks.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: decomposing-tasks

---
name: decomposing-tasks
description: Decompose large work into independent, agent-ready subtasks with integration boundaries. Use when this capability is relevant to the current task.
---

# Decomposing Tasks

## Objective
Decompose large work into independent, agent-ready subtasks with integration boundaries.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: deploying-cloudflare

---
name: deploying-cloudflare
description: Configure and validate Cloudflare Pages/Workers deployments and runtime settings. Use when this capability is relevant to the current task.
---

# Deploying Cloudflare

## Objective
Configure and validate Cloudflare Pages/Workers deployments and runtime settings.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-agent-workflows

---
name: designing-agent-workflows
description: Design tool-using agent workflows with loops, stop conditions, verification, and recovery. Use when this capability is relevant to the current task.
---

# Designing Agent Workflows

## Objective
Design tool-using agent workflows with loops, stop conditions, verification, and recovery.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-apis

---
name: designing-apis
description: Design API contracts, validation, versioning, pagination, errors, and compatibility. Use when this capability is relevant to the current task.
---

# Designing Apis

## Objective
Design API contracts, validation, versioning, pagination, errors, and compatibility.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-architecture

---
name: designing-architecture
description: Create maintainable system architecture with explicit boundaries and trade-offs. Use when this capability is relevant to the current task.
---

# Designing Architecture

## Objective
Create maintainable system architecture with explicit boundaries and trade-offs.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-auth

---
name: designing-auth
description: Design secure authentication and authorization flows. Use when this capability is relevant to the current task.
---

# Designing Auth

## Objective
Design secure authentication and authorization flows.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-databases

---
name: designing-databases
description: Review data models, constraints, migrations, indexes, and transaction boundaries. Use when this capability is relevant to the current task.
---

# Designing Databases

## Objective
Review data models, constraints, migrations, indexes, and transaction boundaries.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-design-systems

---
name: designing-design-systems
description: Create scalable tokens and reusable UI primitives with consistent states. Use when this capability is relevant to the current task.
---

# Designing Design Systems

## Objective
Create scalable tokens and reusable UI primitives with consistent states.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-mcp

---
name: designing-mcp
description: Design and troubleshoot MCP server integrations, tool contracts, permissions, and connectivity. Use when this capability is relevant to the current task.
---

# Designing Mcp

## Objective
Design and troubleshoot MCP server integrations, tool contracts, permissions, and connectivity.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-responsive-ui

---
name: designing-responsive-ui
description: Design intentional experiences across mobile, tablet, and desktop. Use when this capability is relevant to the current task.
---

# Designing Responsive Ui

## Objective
Design intentional experiences across mobile, tablet, and desktop.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-ui

---
name: designing-ui
description: Build cohesive visual systems for typography, color, spacing, components, and states. Use when this capability is relevant to the current task.
---

# Designing Ui

## Objective
Build cohesive visual systems for typography, color, spacing, components, and states.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-ux

---
name: designing-ux
description: Optimize user flows, hierarchy, affordances, error recovery, and task completion. Use when this capability is relevant to the current task.
---

# Designing Ux

## Objective
Optimize user flows, hierarchy, affordances, error recovery, and task completion.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-webhooks

---
name: designing-webhooks
description: Design reliable webhook handling, idempotency, retries, signatures, and observability. Use when this capability is relevant to the current task.
---

# Designing Webhooks

## Objective
Design reliable webhook handling, idempotency, retries, signatures, and observability.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: designing-websockets

---
name: designing-websockets
description: Review real-time channels, reconnect behavior, ordering, backpressure, and failure handling. Use when this capability is relevant to the current task.
---

# Designing Websockets

## Objective
Review real-time channels, reconnect behavior, ordering, backpressure, and failure handling.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: documenting-apis

---
name: documenting-apis
description: Generate API reference documentation from observed endpoints and schemas. Use when this capability is relevant to the current task.
---

# Documenting Apis

## Objective
Generate API reference documentation from observed endpoints and schemas.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-cd

---
name: engineering-cd
description: Design deployment promotion, verification, rollback, and environment separation. Use when this capability is relevant to the current task.
---

# Engineering Cd

## Objective
Design deployment promotion, verification, rollback, and environment separation.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-ci

---
name: engineering-ci
description: Design CI checks and fail-fast gates for build, lint, tests, security, and quality. Use when this capability is relevant to the current task.
---

# Engineering Ci

## Objective
Design CI checks and fail-fast gates for build, lint, tests, security, and quality.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-content

---
name: engineering-content
description: Create clear product, brand, and UX copy consistent with the product voice. Use when this capability is relevant to the current task.
---

# Engineering Content

## Objective
Create clear product, brand, and UX copy consistent with the product voice.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-data-quality

---
name: engineering-data-quality
description: Detect invalid, duplicated, inconsistent, or stale data and define invariants. Use when this capability is relevant to the current task.
---

# Engineering Data Quality

## Objective
Detect invalid, duplicated, inconsistent, or stale data and define invariants.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-privacy

---
name: engineering-privacy
description: Minimize sensitive-data exposure and improve privacy boundaries and retention. Use when this capability is relevant to the current task.
---

# Engineering Privacy

## Objective
Minimize sensitive-data exposure and improve privacy boundaries and retention.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-prompts

---
name: engineering-prompts
description: Design robust prompts with explicit goals, constraints, tools, checks, and output formats. Use when this capability is relevant to the current task.
---

# Engineering Prompts

## Objective
Design robust prompts with explicit goals, constraints, tools, checks, and output formats.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-seo

---
name: engineering-seo
description: Improve metadata, structured data, indexing, canonicalization, and semantic hierarchy. Use when this capability is relevant to the current task.
---

# Engineering Seo

## Objective
Improve metadata, structured data, indexing, canonicalization, and semantic hierarchy.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: engineering-tools

---
name: engineering-tools
description: Design deterministic helper scripts and tools that reduce ambiguity and repeated work. Use when this capability is relevant to the current task.
---

# Engineering Tools

## Objective
Design deterministic helper scripts and tools that reduce ambiguity and repeated work.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: evaluating-models

---
name: evaluating-models
description: Evaluate model outputs with task-specific rubrics, adversarial cases, and repeatable tests. Use when this capability is relevant to the current task.
---

# Evaluating Models

## Objective
Evaluate model outputs with task-specific rubrics, adversarial cases, and repeatable tests.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: feature-flags

---
name: feature-flags
description: Design safe rollout, targeting, kill switches, and flag lifecycle management. Use when this capability is relevant to the current task.
---

# Feature Flags

## Objective
Design safe rollout, targeting, kill switches, and flag lifecycle management.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: final-validation

---
name: final-validation
description: Run a final multi-discipline readiness review and report only verified facts. Use when this capability is relevant to the current task.
---

# Final Validation

## Objective
Run a final multi-discipline readiness review and report only verified facts.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: handling-incidents

---
name: handling-incidents
description: Respond to production failures with containment, diagnosis, recovery, and postmortem evidence. Use when this capability is relevant to the current task.
---

# Handling Incidents

## Objective
Respond to production failures with containment, diagnosis, recovery, and postmortem evidence.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: integrating-ai

---
name: integrating-ai
description: Integrate model providers through stable abstractions, fallbacks, timeouts, and structured outputs. Use when this capability is relevant to the current task.
---

# Integrating Ai

## Objective
Integrate model providers through stable abstractions, fallbacks, timeouts, and structured outputs.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: integrating-whatsapp

---
name: integrating-whatsapp
description: Design and troubleshoot WhatsApp session, messaging, media, reconnect, and multi-session flows. Use when this capability is relevant to the current task.
---

# Integrating Whatsapp

## Objective
Design and troubleshoot WhatsApp session, messaging, media, reconnect, and multi-session flows.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: localizing-apps

---
name: localizing-apps
description: Design i18n/l10n support, formatting, text expansion, and locale correctness. Use when this capability is relevant to the current task.
---

# Localizing Apps

## Objective
Design i18n/l10n support, formatting, text expansion, and locale correctness.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: managing-databases

---
name: managing-databases
description: Operate database changes safely with backups, migrations, verification, and rollback thinking. Use when this capability is relevant to the current task.
---

# Managing Databases

## Objective
Operate database changes safely with backups, migrations, verification, and rollback thinking.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: managing-git

---
name: managing-git
description: Use safe Git workflows for status, diffs, branches, commits, and rollback planning. Use when this capability is relevant to the current task.
---

# Managing Git

## Objective
Use safe Git workflows for status, diffs, branches, commits, and rollback planning.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: migration-engineering

---
name: migration-engineering
description: Plan and execute data/code migrations with compatibility and rollback safety. Use when this capability is relevant to the current task.
---

# Migration Engineering

## Objective
Plan and execute data/code migrations with compatibility and rollback safety.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: monitoring-apps

---
name: monitoring-apps
description: Define operational checks, watchdogs, alerts, and failure thresholds. Use when this capability is relevant to the current task.
---

# Monitoring Apps

## Objective
Define operational checks, watchdogs, alerts, and failure thresholds.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: observing-systems

---
name: observing-systems
description: Design structured logs, metrics, traces, health checks, and diagnostics. Use when this capability is relevant to the current task.
---

# Observing Systems

## Objective
Design structured logs, metrics, traces, health checks, and diagnostics.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: optimizing-images

---
name: optimizing-images
description: Plan responsive image pipelines, formats, loading behavior, and asset fallbacks. Use when this capability is relevant to the current task.
---

# Optimizing Images

## Objective
Plan responsive image pipelines, formats, loading behavior, and asset fallbacks.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: optimizing-web-performance

---
name: optimizing-web-performance
description: Optimize network, rendering, script, fonts, images, and interaction performance. Use when this capability is relevant to the current task.
---

# Optimizing Web Performance

## Objective
Optimize network, rendering, script, fonts, images, and interaction performance.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: planning-implementations

---
name: planning-implementations
description: Turn a request into a sequenced implementation plan with dependencies and acceptance criteria. Use when this capability is relevant to the current task.
---

# Planning Implementations

## Objective
Turn a request into a sequenced implementation plan with dependencies and acceptance criteria.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: preparing-releases

---
name: preparing-releases
description: Prepare release candidates with gates, versioning, artifacts, and rollback plans. Use when this capability is relevant to the current task.
---

# Preparing Releases

## Objective
Prepare release candidates with gates, versioning, artifacts, and rollback plans.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: product-discovery

---
name: product-discovery
description: Translate business goals into user problems, outcomes, and measurable hypotheses. Use when this capability is relevant to the current task.
---

# Product Discovery

## Objective
Translate business goals into user problems, outcomes, and measurable hypotheses.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: quality-gates

---
name: quality-gates
description: Define objective release gates and evidence requirements before declaring done. Use when this capability is relevant to the current task.
---

# Quality Gates

## Objective
Define objective release gates and evidence requirements before declaring done.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: refactoring-safely

---
name: refactoring-safely
description: Refactor code while preserving behavior, minimizing blast radius, and validating changes. Use when this capability is relevant to the current task.
---

# Refactoring Safely

## Objective
Refactor code while preserving behavior, minimizing blast radius, and validating changes.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: reliability-engineering

---
name: reliability-engineering
description: Improve fault tolerance, timeouts, retries, idempotency, and graceful degradation. Use when this capability is relevant to the current task.
---

# Reliability Engineering

## Objective
Improve fault tolerance, timeouts, retries, idempotency, and graceful degradation.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: requirements-engineering

---
name: requirements-engineering
description: Resolve ambiguity into testable requirements and acceptance criteria. Use when this capability is relevant to the current task.
---

# Requirements Engineering

## Objective
Resolve ambiguity into testable requirements and acceptance criteria.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: reviewing-auth

---
name: reviewing-auth
description: Audit authentication, authorization, sessions, secrets, and privilege boundaries. Use when this capability is relevant to the current task.
---

# Reviewing Auth

## Objective
Audit authentication, authorization, sessions, secrets, and privilege boundaries.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: reviewing-code

---
name: reviewing-code
description: Perform senior-level code review for correctness, maintainability, security, and regressions. Use when this capability is relevant to the current task.
---

# Reviewing Code

## Objective
Perform senior-level code review for correctness, maintainability, security, and regressions.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: risk-management

---
name: risk-management
description: Identify, prioritize, mitigate, and track technical and product risks. Use when this capability is relevant to the current task.
---

# Risk Management

## Objective
Identify, prioritize, mitigate, and track technical and product risks.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: routing-ai-models

---
name: routing-ai-models
description: Route AI workloads across providers/models according to capability, latency, and cost. Use when this capability is relevant to the current task.
---

# Routing Ai Models

## Objective
Route AI workloads across providers/models according to capability, latency, and cost.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-accessibility

---
name: testing-accessibility
description: Audit and test keyboard, focus, semantics, labels, contrast, and reduced motion. Use when this capability is relevant to the current task.
---

# Testing Accessibility

## Objective
Audit and test keyboard, focus, semantics, labels, contrast, and reduced motion.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-browsers

---
name: testing-browsers
description: Use browser automation for visual and functional validation, screenshots, and console/network checks. Use when this capability is relevant to the current task.
---

# Testing Browsers

## Objective
Use browser automation for visual and functional validation, screenshots, and console/network checks.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-code

---
name: testing-code
description: Design and implement unit and integration tests with meaningful behavioral coverage. Use when this capability is relevant to the current task.
---

# Testing Code

## Objective
Design and implement unit and integration tests with meaningful behavioral coverage.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-contracts

---
name: testing-contracts
description: Validate API and service contracts for compatibility and error behavior. Use when this capability is relevant to the current task.
---

# Testing Contracts

## Objective
Validate API and service contracts for compatibility and error behavior.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-e2e

---
name: testing-e2e
description: Design and execute end-to-end tests for critical user journeys. Use when this capability is relevant to the current task.
---

# Testing E2E

## Objective
Design and execute end-to-end tests for critical user journeys.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-performance

---
name: testing-performance
description: Measure and improve load time, responsiveness, rendering cost, and asset behavior. Use when this capability is relevant to the current task.
---

# Testing Performance

## Objective
Measure and improve load time, responsiveness, rendering cost, and asset behavior.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: testing-regressions

---
name: testing-regressions
description: Prevent regressions with focused replay of previously failing scenarios. Use when this capability is relevant to the current task.
---

# Testing Regressions

## Objective
Prevent regressions with focused replay of previously failing scenarios.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: threat-modeling

---
name: threat-modeling
description: Model trust boundaries, attack surfaces, misuse cases, and mitigations. Use when this capability is relevant to the current task.
---

# Threat Modeling

## Objective
Model trust boundaries, attack surfaces, misuse cases, and mitigations.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: verificar-ambiente

---
name: verificar-ambiente
description: Diagnostica o ambiente deste workspace quando algo nao funciona - Claude Code sem resposta, 9Router offline, imperion-dev ausente, MCP desconectado ou agentes faltando. Use quando o usuario relatar erro de conexao, modelo nao encontrado, ou quiser confirmar que tudo esta operacional.
---

# Verificar o ambiente

Diagnóstico do workspace CLAUDE CODE VS FINAL: 9Router, imperion-dev, MCP, Ruflo e os
25 agentes.

## Ordem do diagnóstico

Rode nesta ordem e pare no primeiro que falhar — cada passo depende do anterior.

### 1. Verificação completa (22 checagens)

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verificar-ambiente.ps1
```

Exit code: `0` tudo OK · `1` parcial · `2` erro crítico.

Se passar tudo, o ambiente está bom — o problema é outro.

### 2. 9Router

```bash
curl -sf http://localhost:20128/api/health
```

Esperado: `{"ok":true}`

**Se falhar:** o 9Router está offline. Suba num terminal separado:

```bash
9router
```

Deixe esse terminal aberto. Sem ele o Claude Code não tem backend.

### 3. imperion-dev disponível

```bash
curl -sf http://localhost:20128/v1/models
```

Procure `imperion-dev` na lista.

**Se sumiu:** o alias é criado pelo 9Router a partir de
`%APPDATA%\9router\combo-models.json`. Se esse arquivo foi alterado, o alias
some. Não edite esse arquivo — ele é global, fora deste workspace.

### 4. MCP conectado

```bash
claude mcp list
```

Esperado: `claude-flow` e `playwright` como `✔ Connected`.

**Se aparecer "Pending approval":** o `.claude/settings.json` deste workspace já
tem `enableAllProjectMcpServers: true`. Se ainda pedir, aprove uma vez na
primeira execução.

**Se falhar ao conectar:** confira que `.mcp.json` é JSON válido:

```bash
python -m json.tool .mcp.json
```

### 5. Os 25 agentes

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verificar-agentes.ps1
```

Esperado: `25 / 25`, exit `0`.

**Se faltar agente:** restaure `.claude-flow/agents/store.json` de `backups/`.
**Nunca recrie os agentes manualmente** — duplica registro no Hive Mind.

## Erros específicos conhecidos

### `model_not_found: imperion-dev` (HTTP 404)

Um subagente com `model:` fixo no frontmatter tentou resolver um modelo que o
backend ativo não conhece.

**Causa:** o agente foi criado com `model: imperion-dev` (ou similar) e a
requisição foi para a API oficial em vez do 9Router.

**Correção:** remova a linha `model:` do frontmatter do agente em
`.claude/agents/<nome>.md`. Sem essa linha o agente herda o modelo da sessão,
que é o comportamento correto e portátil.

Confira se algum agente fixa modelo:

```bash
grep -l "^model:" .claude/agents/*.md
```

Saída vazia = nenhum fixa. É o estado desejado.

### Contexto estourando rápido

Esperado: o combo tem **64k tokens reais**, não 200k. Leia arquivos em pedaços
(`offset` + `limit`), use subagente para varredura ampla, e grave resultado
intermediário em arquivo.

### `Access to "file:" protocol is blocked` (Playwright)

O Playwright MCP bloqueia `file://`. Suba um servidor:

```bash
python -m http.server 8899 --bind 127.0.0.1
```

Depois navegue para `http://127.0.0.1:8899/<arquivo>.html`.

### Script PowerShell sai cedo sem erro

Se você editou um script: `((VAR++))` com `set -e` sai quando `VAR=0`, porque o
resultado `0` é falso. Use `$VAR = $VAR + 1`.

## O que nunca fazer no diagnóstico

- Recriar o swarm ou o Hive Mind para "corrigir" número de display —
  perde todo o estado persistido
- Recriar os 25 agentes — duplica registro
- Habilitar modelo pago — `FREE_ONLY=true` é inegociável
- Tocar em FiveM, FXServer, txAdmin ou na VPS `imperion`

## Falsos alarmes

Estes **não** são problemas:

| Sintoma | Por quê é normal |
|---|---|
| Swarm mostra `maxAgents: 15` com 25 agentes | Campo gravado na inicialização, não atualiza. O que vale é `agentCount` e `autoScaling: true` |
| Workers com `status: "unknown"` | Normal quando idle. O que vale é `health.workers: "healthy"` |
| `favicon.ico 404` no console do navegador | Cosmético |
| Porta 20128 em `0.0.0.0` e não `127.0.0.1` | É o bind padrão do 9Router no Windows |


---
## CAPACIDADE: writing-changelogs

---
name: writing-changelogs
description: Create factual release notes based on diffs, tests, and user-visible changes. Use when this capability is relevant to the current task.
---

# Writing Changelogs

## Objective
Create factual release notes based on diffs, tests, and user-visible changes.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.


---
## CAPACIDADE: writing-documentation

---
name: writing-documentation
description: Write accurate developer and user documentation from actual project behavior. Use when this capability is relevant to the current task.
---

# Writing Documentation

## Objective
Write accurate developer and user documentation from actual project behavior.

## Operating rules
- Inspect existing evidence before acting.
- Prefer the smallest safe change that satisfies the requirement.
- Preserve project conventions and local rules.
- Use deterministic tools/scripts for repeatable checks when available.
- Never invent execution results.
- State blockers precisely.
- Validate critical work before declaring it complete.

## Workflow
1. Discover context and constraints.
2. Identify inputs, dependencies, and acceptance criteria.
3. Execute or review the task.
4. Run the strongest available verification.
5. Record facts, remaining risks, and next actions.
