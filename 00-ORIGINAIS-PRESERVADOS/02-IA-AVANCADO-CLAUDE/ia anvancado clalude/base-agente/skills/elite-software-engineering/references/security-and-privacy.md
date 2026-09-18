# Security and Privacy

Use threat modeling proportional to risk.

## Review
Check authentication, authorization, input validation, output encoding, secrets, session handling, CORS/CSRF where relevant, webhooks, SSRF-sensitive integrations, file uploads, dependency risk, and sensitive logs.

## Secrets
Never reveal values. Prefer environment variables or secret managers. Do not commit credentials or session material.

## Privacy
Collect the minimum sensitive data required. Define purpose, retention, access boundaries, and deletion behavior. Avoid using private user content outside the requested purpose.

## High-risk changes
Require explicit authorization before touching production credentials, financial systems, destructive operations, or private messaging/session stores.
