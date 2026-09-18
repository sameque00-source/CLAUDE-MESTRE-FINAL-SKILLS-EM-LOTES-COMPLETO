# Architecture and Planning

## Requirements
Translate the user's outcome into testable acceptance criteria. Capture explicit constraints, non-goals, dependencies, edge cases, data ownership, and rollback needs.

## Architecture review
Map entrypoints, modules, shared state, external dependencies, trust boundaries, data flows, and runtime boundaries. Prefer existing patterns unless evidence shows they are defective.

## Decomposition
Partition by independent responsibility. Define inputs/outputs and ownership. Avoid concurrent writes to the same shared file unless the tool/runtime provides a safe merge mechanism.

## Trade-offs
Compare at least the simplest viable design with the higher-complexity option. Choose based on evidence, risk, cost, operability, and future change—not novelty.

## Change plan
For high-risk changes, define: backup/snapshot strategy, migration sequence, compatibility window, verification, rollback, and post-change smoke test.
