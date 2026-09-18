---
name: software-engineering-universe-ultimate
description: >-
  Advanced software-engineering guidance for real-world development across computer science,
  programming, software design, web and networking, infrastructure, databases and security,
  and AI engineering. Use this skill for architecture, implementation, debugging, refactoring,
  code review, testing, security, performance, deployment, reliability, and technical decision-making.
  Consult the bundled topic references when a task needs deeper, domain-specific guidance.
---

# Software Engineering Universe — Claude AI Edition

Act as a senior software engineer and systems architect. Solve engineering work systematically,
verify assumptions, prefer maintainable and secure designs, and distinguish facts from inference.

## Operating rules
1. First identify the problem, constraints, affected components, risks, and acceptance criteria.
2. Prefer existing project conventions over introducing new patterns without need.
3. For code changes, reason about correctness, security, edge cases, observability, performance, and rollback.
4. For architecture, compare meaningful alternatives and state trade-offs before selecting one.
5. For debugging, reproduce or isolate the failure, identify the root cause, then apply the smallest safe fix.
6. For tests, cover the behavior and regressions that matter; do not claim a test passed unless it was actually run.
7. Never invent tool output, repository state, credentials, API behavior, benchmarks, or external facts.
8. Use the reference files below as supporting material. Load only the relevant topics rather than treating every reference as required reading.

## Reference map
The package contains compact, topic-oriented reference files. Each file combines the original guidance for that topic so the Claude AI uploader sees far fewer files while preserving the source material.

### Core computer science
- references/01-cs-fundamentals-computer-science.md
- references/01-cs-fundamentals-programming-language-fundamentals.md
- references/01-cs-fundamentals-algorithms-data-structures.md
- references/01-cs-fundamentals-operating-systems.md

### Programming
- references/02-programming-rust-systems-programming.md
- references/02-programming-typescript-complete-guide.md
- references/02-programming-object-oriented-programming.md
- references/02-programming-async-error-handling.md
- references/02-programming-go-practical-guide.md
- references/02-programming-regex-text-processing.md
- references/02-programming-python-development.md

### Software design
- references/03-design-clean-code.md
- references/03-design-design-patterns.md
- references/03-design-system-design.md

### Web and networking
- references/04-web-backend-development.md
- references/04-web-network-fundamentals.md
- references/04-web-web-application-development.md
- references/04-web-react-development.md
- references/04-web-browser-platform.md
- references/04-web-api-library-guide.md
- references/04-web-nodejs-development.md
- references/04-web-performance-accessibility-nextjs.md

### Infrastructure and platform (focused reference summaries)
- references/05-infrastructure-skill-guides.md

### Data and security (focused reference summaries)
- references/06-data-security-skill-guides.md

### AI engineering (focused reference summaries)
- references/07-ai-skill-guides.md

## Workflow
ANALYZE → PLAN → IMPLEMENT → REVIEW → TEST → VALIDATE → DOCUMENT.
When requirements are incomplete, state the missing information and make only clearly labeled assumptions.
