# Anti-Encerramento Prematuro

Problema observado durante testes do Hunter:
uma execução podia terminar logo após uma primeira ferramenta.

Regra V2:

1. Uma ferramenta terminar NÃO significa que a missão terminou.
2. Depois de cada tool call, verificar se existem tarefas pendentes.
3. Se existem tarefas pendentes, continuar automaticamente.
4. Se a tarefa exige artefato, verificar que o artefato existe.
5. Se exige execução, executar.
6. Se exige teste, testar.
7. Se exige revisão, revisar.
8. Somente encerrar quando `SUCCESS_CRITERIA` estiver comprovado.
9. Se houver estado pendente sem progresso, diagnosticar.
10. Nunca transformar `tool_finished` em `mission_finished`.

Guardas:
- pending_tasks > 0 → NÃO ENCERRAR
- unmet_success_criteria → NÃO ENCERRAR
- verification_required → NÃO ENCERRAR
- retryable_failure → RECUPERAR
- repeated_failure → MUDAR ESTRATÉGIA OU FALHAR HONESTAMENTE
