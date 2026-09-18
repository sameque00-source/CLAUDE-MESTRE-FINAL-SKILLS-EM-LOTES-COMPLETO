# AI Engineering

## Provider abstraction
Keep provider/model selection separate from business logic. Make timeouts, retries, fallbacks, and structured output behavior explicit.

## Prompts
Define role, goal, context, constraints, tools, evidence requirements, stop conditions, and output schema. Prefer testable prompts over vague persona text.

## Evaluation
Create representative, edge, and adversarial cases. Track correctness, tool success, latency, cost, and failure modes. Compare model changes on the same cases.

## Agents
Define each agent's purpose, trigger conditions, tools, boundaries, and output format. Use inherited/default model selection when portability matters unless a fixed model is genuinely required.

## MCP
Validate server connectivity, tool contracts, permissions, timeouts, and error behavior before relying on an integration.
