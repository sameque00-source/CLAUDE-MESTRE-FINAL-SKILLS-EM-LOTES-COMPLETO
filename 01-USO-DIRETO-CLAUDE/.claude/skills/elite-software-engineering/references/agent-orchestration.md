# Agent Orchestration

Treat skills as contextual guidance and agents as autonomous subprocesses only when the runtime actually supports them. Do not confuse the two.

## Routing
Select specialists based on task evidence. Prefer a small set of relevant specialists over broadcasting every task to every role.

## Parallelism
Parallelize truly independent work. Give each worker an owned surface. Integrate after workers return. If a tool cannot execute parallel agents, report that limitation rather than simulating a swarm.

## Tool discipline
Use tool search/loading selectively when many tools exist. Keep intermediate tool output out of the main context when scripts can aggregate deterministic results.

## Recovery
On agent/tool failure: classify the failure, retry with a changed strategy when reasonable, preserve partial results, and never declare an unverified success.
