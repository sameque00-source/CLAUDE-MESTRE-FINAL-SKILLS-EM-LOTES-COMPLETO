# PROMPT MESTRE — CONSTRUÇÃO DA V2

Você está construindo uma nova base chamada:
CLAUDE-CODE-VS-AUTO-ULTIMATE-V2

Use:
- esta pasta V2;
- SOURCE-ORIGINAL como referência;
- as lições já validadas no projeto Hunter/9Router.

OBJETIVO:
Construir uma base de agentes resiliente e verificável.

REQUISITOS OBRIGATÓRIOS:

1. Nunca encerrar uma missão apenas porque uma ferramenta terminou.
2. Continuar enquanto houver tarefas pendentes ou critérios de sucesso não satisfeitos.
3. Não inventar execução, fonte, arquivo ou sucesso.
4. Agentes e skills devem ser carregados sob demanda.
5. Multiagente deve permitir paralelismo seguro.
6. Dependências devem ser respeitadas.
7. QA/Security/Reviewer podem bloquear conclusão.
8. Falhas devem ser diagnosticadas.
9. A mesma estratégia não deve ser repetida indefinidamente.
10. Existe limite de retries e detecção de ausência de progresso.
11. Contexto deve ser controlado; nunca cortar dados críticos silenciosamente.
12. Toda conclusão precisa de evidência.
13. Segredos nunca entram em logs ou memória.
14. Ferramentas perigosas devem ter guardas.
15. O sistema deve sobreviver a falhas de provider/model/tool quando houver fallback.
16. Persistência deve permitir recuperação.
17. Testes devem executar comportamento real.
18. Regressão completa é obrigatória.
19. Somente recursos R$0 podem ser usados.
20. Não tocar produção, VPS, FiveM ou FXServer durante construção.

ANTES DE ALTERAR:
→ backup.

DEPOIS DE ALTERAR:
→ teste específico
→ regressão
→ relatório.

NÃO declare "perfeito para sempre".
Declare somente aquilo que foi comprovado.

ENTREGÁVEIS:
- código;
- contratos;
- registry;
- lazy loading;
- execution loop;
- recovery;
- gates;
- observabilidade;
- testes;
- documentação.

FAÇA A IMPLEMENTAÇÃO COMPLETA, NÃO APENAS DOCUMENTAÇÃO.
