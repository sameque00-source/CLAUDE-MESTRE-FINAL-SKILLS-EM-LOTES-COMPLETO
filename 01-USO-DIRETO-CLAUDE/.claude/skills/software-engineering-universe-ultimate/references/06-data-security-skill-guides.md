

===== SOURCE: 06-data-and-security/authentication-and-authorization/SKILL.md =====

[日本語版](../../ja/06-data-and-security/authentication-and-authorization/SKILL.md)

# Authentication and Authorization

> Authentication and authorization are the cornerstones of web application security. This skill systematically covers everything about secure access control — from password management, sessions, JWT, OAuth 2.0, OpenID Connect, RBAC/ABAC, and multi-factor authentication to practical NextAuth.js implementation.

## Target Audience

- Engineers implementing authentication in web applications
- Developers who want to learn security-conscious design and implementation
- Those seeking a deep understanding of OAuth 2.0 / OIDC
- Those designing permission management with RBAC/ABAC

## Prerequisites

- HTTP fundamentals (headers, cookies, status codes)
- Basic JavaScript / TypeScript knowledge
- Understanding of web application architecture (frontend / backend)

## Study Guide

### 00-fundamentals — Authentication and Authorization Basics

| # | File | Description |
|---|------|-------------|

### 01-session-auth — Session-Based Authentication

| # | File | Description |
|---|------|-------------|

### 02-token-auth — Token-Based Authentication

| # | File | Description |
|---|------|-------------|

### 03-authorization — Authorization Design

| # | File | Description |
|---|------|-------------|

### 04-implementation — Implementation Patterns

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
Choosing an Authentication Strategy:
  Personal projects / Small-scale → NextAuth.js + social login
  B2C services → OAuth 2.0 + PKCE + email verification
  B2B SaaS → OIDC + SAML SSO + RBAC
  API services → API Key + OAuth 2.0 Client Credentials
  Mobile apps → OAuth 2.0 + PKCE + Refresh Token Rotation

Security Checklist:
  ✓ Hash passwords with bcrypt/Argon2
  ✓ Sign JWTs with RS256/ES256
  ✓ Set cookies to HttpOnly + Secure + SameSite=Lax
  ✓ Implement CSRF tokens
  ✓ Use Refresh Token rotation with revocation detection
  ✓ Apply rate limiting to login endpoints
  ✓ Require MFA for sensitive operations
```

## References

1. OWASP. "Authentication Cheat Sheet." cheatsheetseries.owasp.org, 2024.
2. RFC 6749. "The OAuth 2.0 Authorization Framework." IETF, 2012.
3. RFC 7519. "JSON Web Token (JWT)." IETF, 2015.
4. OpenID Foundation. "OpenID Connect Core 1.0." openid.net, 2014.
5. Auth.js. "Documentation." authjs.dev, 2024.



===== SOURCE: 06-data-and-security/database-design/SKILL.md =====

# Database Design

> A comprehensive collection of practical guides for database design. Covers normalization, schema design, query optimization, performance tuning, and migration strategies -- everything needed to build efficient, scalable databases.

## Target Audience

- Developers who want to design reliable, performant database schemas
- Engineers working on query optimization and performance tuning
- Teams managing database migrations and schema evolution

## Prerequisites

- Basic SQL knowledge (SELECT, INSERT, UPDATE, DELETE)
- Familiarity with at least one relational database (PostgreSQL, MySQL)

## Study Guide

### 01-schema-design -- Database Schema Design

| # | File | Content |
|---|------|---------|
| 01 | [schema-design-complete.md](docs/01-schema-design/schema-design-complete.md) | Normalization, relationships, data types, constraints, indexes |

### 02-query-optimization -- Query Optimization

| # | File | Content |
|---|------|---------|
| 01 | [query-optimization-complete.md](docs/02-query-optimization/query-optimization-complete.md) | EXPLAIN ANALYZE, index optimization, JOIN optimization, N+1 |

### 03-performance -- Performance Optimization

| # | File | Content |
|---|------|---------|
| 01 | [performance-optimization-complete.md](docs/03-performance/performance-optimization-complete.md) | Caching, partitioning, sharding, monitoring |

### 04-migrations -- Database Migrations

| # | File | Content |
|---|------|---------|
| 01 | [migration-complete.md](docs/04-migrations/migration-complete.md) | Prisma, TypeORM, Knex.js, zero-downtime deployments |

### 05-schema-evolution -- Schema Evolution

| # | File | Content |
|---|------|---------|
| 01 | [schema-evolution-complete.md](docs/05-schema-evolution/schema-evolution-complete.md) | Alembic, Flyway, Liquibase, Blue-Green deployments, disaster recovery |

### 06-algorithms -- Algorithms

| # | File | Content |
|---|------|---------|
| 01 | [btree-operations-proof.md](docs/06-algorithms/btree-operations-proof.md) | B-tree operations and correctness proofs |

### 07-checklists -- Checklists

| # | File | Content |
|---|------|---------|
| 01 | [index-design.md](docs/07-checklists/index-design.md) | Index design checklist |
| 02 | [performance-optimization.md](docs/07-checklists/performance-optimization.md) | Performance optimization checklist |

## Quick Reference

```
Database Design Cheat Sheet:

  Normalization:
    1NF  -- eliminate repeating groups
    2NF  -- eliminate partial dependencies
    3NF  -- eliminate transitive dependencies
    BCNF -- every determinant is a candidate key

  Index Types (PostgreSQL):
    B-tree  -- equality, range, ORDER BY (default)
    Hash    -- equality only
    GIN     -- full-text search, JSONB, arrays
    GiST    -- spatial data, range types

  Key Rules:
    - Index columns used in WHERE, JOIN, ORDER BY
    - Use composite indexes with equality columns first
    - Use partial indexes to reduce index size
    - Use covering indexes to avoid table access
    - Avoid indexing low-selectivity columns (flags, booleans)

  Migration Best Practices:
    - Always write a rollback (down migration)
    - Use zero-downtime patterns for production
    - Prefer additive changes (add columns, not drop)
    - Test migrations against a copy of production data
```

## References

1. PostgreSQL Global Development Group. "PostgreSQL Documentation." postgresql.org/docs, 2024.
2. Winand, M. "SQL Performance Explained." use-the-index-luke.com, 2024.
3. Karwin, B. "SQL Antipatterns." Pragmatic Programmers, 2010.
4. Kleppmann, M. "Designing Data-Intensive Applications." O'Reilly, 2017.



===== SOURCE: 06-data-and-security/security-fundamentals/SKILL.md =====

[日本語版](../../ja/06-data-and-security/security-fundamentals/SKILL.md)

# Security Fundamentals

> Security is the foundation of software development. This skill systematically covers the essential security knowledge every engineer needs — from the OWASP Top 10 and cryptography to network security, application security, cloud security, and security operations.

## Target Audience

- Engineers who want to build a systematic understanding of security fundamentals
- Developers aiming to build secure applications
- Those responsible for security audits and incident response

## Prerequisites

- Basic understanding of web application architecture
- Foundational networking knowledge (TCP/IP, HTTP)
- Basic Linux command-line skills

## Study Guide

### 00-basics — Security Fundamentals

| # | File | Description |
|---|------|-------------|

### 01-web-security — Web Security

| # | File | Description |
|---|------|-------------|

### 02-cryptography — Cryptography

| # | File | Description |
|---|------|-------------|

### 03-network-security — Network Security

| # | File | Description |
|---|------|-------------|

### 04-application-security — Application Security

| # | File | Description |
|---|------|-------------|

### 05-cloud-security — Cloud Security

| # | File | Description |
|---|------|-------------|

### 06-operations — Security Operations

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
Security Checklist:

  Web Applications:
    ✓ Input validation (server-side is mandatory)
    ✓ Parameterized queries (prevent SQL Injection)
    ✓ CSP header configuration (prevent XSS)
    ✓ CSRF tokens or SameSite=Lax
    ✓ HttpOnly + Secure cookies
    ✓ Enforce HTTPS (HSTS)

  Authentication & Authorization:
    ✓ Password hashing with bcrypt/Argon2
    ✓ MFA (TOTP or WebAuthn)
    ✓ JWT signature verification (ES256 recommended)
    ✓ Principle of least privilege

  Infrastructure:
    ✓ Dependency vulnerability scanning
    ✓ Container image scanning
    ✓ Secret management (never commit .env files)
    ✓ Log retention and audit trails

  OWASP Top 10 (2021):
    A01: Broken Access Control
    A02: Cryptographic Failures
    A03: Injection
    A04: Insecure Design
    A05: Security Misconfiguration
    A06: Vulnerable Components
    A07: Auth Failures
    A08: Software/Data Integrity
    A09: Logging Failures
    A10: SSRF
```

## References

1. OWASP. "Top 10 Web Application Security Risks." owasp.org, 2021.
2. NIST. "Cybersecurity Framework." nist.gov, 2024.
3. Mozilla. "Web Security Guidelines." infosec.mozilla.org, 2024.



===== SOURCE: 06-data-and-security/sql-and-query-mastery/SKILL.md =====

[日本語版](../../ja/06-data-and-security/sql-and-query-mastery/SKILL.md)

# SQL and Query Mastery

> SQL is the universal language of data manipulation. This skill systematically covers everything from basic syntax to advanced window functions, query optimization, execution plan analysis, and database-specific features.

## Target Audience

- Engineers who want to learn SQL systematically
- Developers looking to optimize query performance
- Those involved in database design and operations

## Prerequisites

- Foundational understanding of relational databases
- Basic SQL knowledge (SELECT/INSERT/UPDATE/DELETE)

## Study Guide

### 00-basics — SQL Fundamentals

| # | File | Description |
|---|------|-------------|

### 01-advanced — Advanced SQL

| # | File | Description |
|---|------|-------------|

### 02-optimization — Query Optimization

| # | File | Description |
|---|------|-------------|

### 03-specific — Database-Specific Features

| # | File | Description |
|---|------|-------------|

## Quick Reference

```
SQL Performance Checklist:
  ✓ Verify execution plans with EXPLAIN ANALYZE
  ✓ Create appropriate indexes
  ✓ Avoid SELECT *; query only the columns you need
  ✓ Resolve N+1 queries with JOINs
  ✓ For large datasets, use cursor-based pagination instead of LIMIT/OFFSET
  ✓ Perform aggregations on the database side
```

## References

1. PostgreSQL. "Documentation." postgresql.org/docs, 2024.
2. Winand, M. "SQL Performance Explained." use-the-index-luke.com, 2012.
3. Molinaro, A. "SQL Cookbook." O'Reilly, 2020.

