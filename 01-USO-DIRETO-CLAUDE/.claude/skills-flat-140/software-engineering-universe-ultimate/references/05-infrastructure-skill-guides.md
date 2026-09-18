

===== SOURCE: 05-infrastructure/aws-cloud-guide/SKILL.md =====

[日本語版](../../ja/05-infrastructure/aws-cloud-guide/SKILL.md)

# AWS Cloud Guide

> AWS is the de facto standard in cloud computing. This guide systematically covers everything from the basics of EC2, S3, and Lambda to network design, database selection, serverless architecture, container operations, security, and cost optimization.

## Target Audience

- Engineers looking to learn AWS infrastructure
- Professionals pursuing AWS certifications (SAA/SAP)
- Teams planning migrations from on-premises to the cloud

## Prerequisites

- Basic Linux operations
- Networking fundamentals (TCP/IP, DNS, HTTP)
- Basic container knowledge (Docker)

## Study Guide

### 00-fundamentals — AWS Fundamentals

| # | File | Description |
|---|------|-------------|

### 01-compute — Compute

| # | File | Description |
|---|------|-------------|

### 02-storage — Storage

| # | File | Description |
|---|------|-------------|

### 03-database — Database

| # | File | Description |
|---|------|-------------|

### 04-networking — Networking

| # | File | Description |
|---|------|-------------|

### 05-serverless — Serverless

| # | File | Description |
|---|------|-------------|

### 06-containers — Container Services

| # | File | Description |
|---|------|-------------|

### 07-devops — DevOps Services

| # | File | Description |
|---|------|-------------|

### 08-security — Security Services

| # | File | Description |
|---|------|-------------|

### 09-cost-management — Cost Management

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
AWS Service Selection Chart:

  Compute:
    Containers → ECS Fargate (recommended) or EKS
    Serverless → Lambda + API Gateway
    VMs → EC2 + Auto Scaling
    PaaS → Elastic Beanstalk

  Database:
    Relational → Aurora (recommended) or RDS
    NoSQL → DynamoDB
    Cache → ElastiCache Redis
    Full-text search → OpenSearch

  Storage:
    Object → S3
    File → EFS
    Block → EBS

  Networking:
    DNS → Route 53
    CDN → CloudFront
    Load Balancer → ALB

  Cost Reduction:
    ✓ Savings Plans / Reserved Instances
    ✓ Spot Instances (for fault-tolerant workloads)
    ✓ S3 Lifecycle policies (transition to Glacier)
    ✓ Lambda (for low-traffic periods)
```

## References

1. AWS. "Documentation." docs.aws.amazon.com, 2024.
2. AWS. "Well-Architected Framework." aws.amazon.com/architecture, 2024.
3. AWS. "Pricing Calculator." calculator.aws, 2024.



===== SOURCE: 05-infrastructure/development-environment-setup/SKILL.md =====

[日本語版](../../ja/05-infrastructure/development-environment-setup/SKILL.md)

# Development Environment Setup

> Productive development starts with a well-configured environment. This guide covers editor configuration, runtime management, package managers, Docker-based development environments, and team-wide standardization -- everything you need to build a modern development setup.

## Target Audience

- Engineers setting up development environments for new projects
- Tech leads looking to standardize their team's development environment
- Developers who want to learn Docker-based development environments

## Prerequisites

- Basic terminal operations
- Fundamental Git knowledge

## Study Guide

### 00-editor-and-tools — Editors and Development Tools

| # | File | Description |
|---|------|-------------|

### 01-runtime-and-package — Runtime and Package Management

| # | File | Description |
|---|------|-------------|

### 02-docker-dev — Docker Development Environment

| # | File | Description |
|---|------|-------------|

### 03-team-setup — Team-Wide Configuration

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
Recommended Development Stack:
  Editor:       VS Code + extensions or Cursor
  Terminal:     Warp (macOS) / Windows Terminal
  Shell:        zsh + starship prompt
  Node.js:      fnm (recommended) or mise
  Packages:     pnpm (recommended)
  Linter:       Biome (recommended) or ESLint + Prettier
  Git Hooks:    husky + lint-staged
  Docker:       Docker Desktop or OrbStack (macOS)
  DB GUI:       TablePlus or DBeaver
  API:          Bruno or Hoppscotch
  AI:           GitHub Copilot + Claude Code
```

## References

1. VS Code. "Documentation." code.visualstudio.com, 2024.
2. Docker. "Docker Desktop." docs.docker.com, 2024.
3. pnpm. "Documentation." pnpm.io, 2024.



===== SOURCE: 05-infrastructure/devops-and-github-actions/SKILL.md =====

[日本語版](../../ja/05-infrastructure/devops-and-github-actions/SKILL.md)

# DevOps and GitHub Actions

> DevOps automates the build, test, and deploy lifecycle, breaking down the wall between development and operations. This guide covers CI/CD fundamentals, hands-on GitHub Actions, deployment strategies, and monitoring/alerting -- providing a complete picture of modern DevOps.

## Target Audience

- Engineers looking to build CI/CD pipelines
- Developers who want to fully leverage GitHub Actions
- Teams aiming to establish deployment automation and monitoring infrastructure

## Prerequisites

- Basic Git operations
- Fundamental Docker knowledge
- YAML syntax

## Study Guide

### 00-devops-basics — DevOps Fundamentals

| # | File | Description |
|---|------|-------------|

### 01-github-actions — GitHub Actions

| # | File | Description |
|---|------|-------------|

### 02-deployment — Deployment

| # | File | Description |
|---|------|-------------|

### 03-monitoring — Monitoring and Observability

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
GitHub Actions Syntax Cheat Sheet:

  Triggers:
    on: push / pull_request / schedule / workflow_dispatch
    branches: [main] / paths: ['src/**']

  Jobs:
    runs-on: ubuntu-latest
    strategy: matrix (node-version: [18, 20, 22])
    needs: [build, test]

  Commonly Used Actions:
    actions/checkout@v4
    actions/setup-node@v4
    actions/cache@v4
    docker/build-push-action@v5
    aws-actions/configure-aws-credentials@v4

  Deployment Strategy Selection:
    Low risk, small scale → Rolling Update
    Medium risk → Blue-Green
    High risk, large scale → Canary
    Experimental features → Feature Flag
```

## References

1. GitHub. "Actions Documentation." docs.github.com/actions, 2024.
2. Forsgren, N. et al. "Accelerate." IT Revolution Press, 2018.
3. HashiCorp. "Terraform Documentation." terraform.io/docs, 2024.



===== SOURCE: 05-infrastructure/docker-container-guide/SKILL.md =====

[日本語版](../../ja/05-infrastructure/docker-container-guide/SKILL.md)

# Docker Container Guide

> Docker is a foundational piece of modern development infrastructure. This guide systematically covers container fundamentals, Dockerfile best practices, multi-service orchestration with Docker Compose, networking, production operations, orchestration, and security.

## Target Audience

- Engineers looking to learn Docker-based development and operations
- Developers deploying containerized applications to production
- Teams building multi-service environments with Docker Compose

## Prerequisites

- Basic Linux commands
- Fundamental understanding of web application architecture
- Basic networking knowledge

## Study Guide

### 00-fundamentals — Container Fundamentals

| # | File | Description |
|---|------|-------------|

### 01-dockerfile — Dockerfile Best Practices

| # | File | Description |
|---|------|-------------|

### 02-compose — Docker Compose

| # | File | Description |
|---|------|-------------|

### 03-networking — Networking

| # | File | Description |
|---|------|-------------|

### 04-production — Production Operations

| # | File | Description |
|---|------|-------------|

### 05-orchestration — Orchestration

| # | File | Description |
|---|------|-------------|

### 06-security — Security

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
Docker Command Cheat Sheet:
  docker build -t app:latest .        — Build an image
  docker run -d -p 3000:3000 app      — Start a container
  docker compose up -d                — Start Compose services
  docker compose down -v              — Stop Compose and remove volumes
  docker logs -f <container>          — Follow container logs
  docker exec -it <container> sh      — Open a shell inside a container
  docker system prune -a              — Remove unused resources

Dockerfile Best Practices:
  ✓ Use multi-stage builds to reduce image size
  ✓ Run as a non-root user
  ✓ Optimize build context with .dockerignore
  ✓ Set file ownership with COPY --chown
  ✓ Configure health checks (HEALTHCHECK)
  ✓ Pin base image versions
```

## References

1. Docker. "Documentation." docs.docker.com, 2024.
2. Docker. "Dockerfile Best Practices." docs.docker.com, 2024.
3. Kubernetes. "Documentation." kubernetes.io/docs, 2024.



===== SOURCE: 05-infrastructure/linux-cli-mastery/SKILL.md =====

[日本語版](../../ja/05-infrastructure/linux-cli-mastery/SKILL.md)

# Linux CLI Mastery

A comprehensive, hands-on guide to mastering the Linux command line. Covers everything from file operations, text processing, and process management to networking, shell scripting, and system administration.

## Skill Overview

| Item | Details |
|------|---------|
| Category | OS / CLI |
| Difficulty | Beginner to Intermediate |
| Prerequisites | operating-system-guide (foundational level) |
| Estimated Study Time | 40-60 hours |
| Number of Guides | 22 files |

## Learning Objectives

- [ ] Perform basic shell operations and customize the shell environment
- [ ] Handle file operations and permission management with confidence
- [ ] Use text processing tools (grep, sed, awk) proficiently
- [ ] Monitor and manage processes effectively
- [ ] Understand and use networking-related commands
- [ ] Write shell scripts for automation
- [ ] Work with systemd, cron, and package managers in production

## Directory Structure

```
docs/
├── 00-introduction/          # CLI Introduction
│   ├── 00-terminal-basics.md    # Terminal and shell fundamentals
│   ├── 01-shell-config.md       # Shell configuration (.bashrc, .zshrc)
│   └── 02-man-and-help.md       # Using manuals and help systems
├── 01-file-operations/       # File Operations
│   ├── 00-navigation.md         # Directory navigation and listing
│   ├── 01-file-crud.md          # Creating, copying, moving, and deleting files
│   ├── 02-permissions.md        # Permissions and ownership
│   └── 03-find-and-locate.md    # File searching
├── 02-text-processing/       # Text Processing
│   ├── 00-cat-less-head-tail.md # Viewing file contents
│   ├── 01-grep-ripgrep.md       # Pattern searching
│   ├── 02-sed.md                # Stream editor
│   ├── 03-awk.md                # Text processing language
│   └── 04-sort-uniq-cut-wc.md   # Sorting and aggregation
├── 03-process-management/    # Process Management
│   ├── 00-ps-top-htop.md        # Process monitoring
│   └── 01-jobs-signals.md       # Job control and signals
├── 04-networking/            # Networking
│   ├── 00-curl-wget.md          # HTTP communication
│   └── 01-ssh-scp.md            # Remote connections
├── 05-shell-scripting/       # Shell Scripting
│   ├── 00-basics.md             # Variables, conditionals, and loops
│   └── 01-advanced-scripting.md # Functions, error handling, and practical patterns
├── 06-system-admin/          # System Administration
│   ├── 00-systemd.md            # systemd and service management
│   └── 01-package-management.md # Package management
└── 07-advanced/              # Advanced Techniques
    ├── 00-tmux-screen.md        # Terminal multiplexers
    └── 01-productivity.md       # Productivity tips and tricks
```

## Prerequisite Skills

## Next Steps

## References
1. Shotts, W. "The Linux Command Line." 2nd Ed, No Starch Press, 2019.
2. Barrett, D. "Efficient Linux at the Command Line." O'Reilly, 2022.
3. Robbins, A. & Beebe, N. "Classic Shell Scripting." O'Reilly, 2005.



===== SOURCE: 05-infrastructure/version-control-and-jujutsu/SKILL.md =====

[日本語版](../../ja/05-infrastructure/version-control-and-jujutsu/SKILL.md)

# Version Control and Jujutsu

> Git is the foundation of modern development, yet few truly understand its internals. This guide dives deep into Git's internal object model, advanced operations, and the next-generation VCS Jujutsu (jj) -- exploring the depths of version control.

## Target Audience

- Engineers who want to understand Git's internal architecture
- Developers looking to master advanced Git operations (rebase, bisect, reflog, etc.)
- Those interested in the next-generation VCS, Jujutsu

## Prerequisites

- Basic Git operations (add, commit, push, pull, branch)
- Basic terminal operations

## Study Guide

### 00-git-internals — Git Internals

| # | File | Description |
|---|------|-------------|

### 01-advanced-git — Advanced Git Operations

| # | File | Description |
|---|------|-------------|

### 02-jujutsu — Jujutsu (jj)

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
Git Internal Objects:
  blob   — File contents
  tree   — Directory structure
  commit — Snapshot + metadata
  tag    — Named reference

Advanced Git Commands:
  git rebase -i HEAD~5        — Interactively edit the last 5 commits
  git bisect start/bad/good   — Identify the commit that introduced a bug
  git reflog                  — View HEAD movement history
  git worktree add ../feature — Work on a branch in a separate directory
  git log -S "keyword"        — Search for code changes

Jujutsu (jj) Basics:
  jj init                     — Initialize a repository
  jj status                   — Check status
  jj describe -m "message"    — Set commit message
  jj new                      — Create a new change set
  jj squash                   — Squash into parent
  jj git push                 — Push to Git remote
```

## References

1. Chacon, S. & Straub, B. "Pro Git." git-scm.com/book, 2024.
2. Git. "Git Internals." git-scm.com/book/en/v2/Git-Internals, 2024.
3. Jujutsu. "Documentation." martinvonz.github.io/jj, 2024.



===== SOURCE: 05-infrastructure/windows-application-development/SKILL.md =====

[日本語版](../../ja/05-infrastructure/windows-application-development/SKILL.md)

# Windows Application Development

> Desktop app development using web technologies has become the mainstream approach. This guide covers the characteristics and selection criteria for Electron, Tauri, and WPF/WinUI, along with cross-platform support, native feature integration, distribution, and updates -- providing a complete picture of Windows desktop application development.

## Target Audience

- Engineers who want to build desktop apps using web technologies (React/TypeScript)
- Developers evaluating and implementing Electron or Tauri
- Those looking to leverage Windows-native features (notifications, system tray, file system, etc.)

## Prerequisites

- HTML/CSS/JavaScript fundamentals
- Basic React/TypeScript development experience
- Foundational Node.js knowledge

## Study Guide

### 00-fundamentals — Desktop App Fundamentals

| # | File | Description |
|---|------|-------------|

### 01-wpf-and-winui — Windows Native

| # | File | Description |
|---|------|-------------|

### 02-electron-and-tauri — Web Technology-Based

| # | File | Description |
|---|------|-------------|

### 03-distribution — Distribution and Updates

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
Technology Selection Guide:

  Lightweight + security-focused → Tauri (recommended)
  Rich ecosystem + proven track record → Electron
  Windows-only + native feel → WinUI 3
  Cross-platform + .NET → MAUI

  Bundle Size Comparison:
    Electron: ~150MB (includes Chromium)
    Tauri:    ~5MB (uses OS WebView)
    WinUI 3:  ~20MB (.NET runtime)

  Memory Usage:
    Electron: ~200MB+
    Tauri:    ~50MB
    WinUI 3:  ~100MB
```

## References

1. Electron. "Documentation." electronjs.org, 2024.
2. Tauri. "Documentation." tauri.app, 2024.
3. Microsoft. "WinUI 3 Documentation." learn.microsoft.com, 2024.

