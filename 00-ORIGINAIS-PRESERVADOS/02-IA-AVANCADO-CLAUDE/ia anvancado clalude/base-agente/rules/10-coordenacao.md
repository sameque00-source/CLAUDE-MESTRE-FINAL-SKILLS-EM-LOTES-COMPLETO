# Coordenação de agentes

> Adaptado de `CLAUDE-CODE-VS-AUTO-ULTIMATE/.claude/rules/10-coordenacao.md`
> em 2026-09-15 (FASE 0). "25 especialistas" virou "19 especialistas" (ver
> `PLANO-MESTRE-AGENTE-9ROUTER.md` seção 7 para a lista curada e o porquê de
> 6 papéis terem sido absorvidos por outros em vez de mantidos separados).
> Teto de contexto mantido em 64k porque é o teto real medido no backend
> `combo/modelos-gratuitos` deste ambiente.

A sessão principal é o **coordenador**. Os 19 especialistas vivem em
`base-agente/agents/` e serão chamados com a tool `Agent` quando esta camada
for ligada ao Orquestrador (fases futuras — não ligado ainda na FASE 0).

## Fluxo obrigatório

```
ANALISAR → PLANEJAR → DIVIDIR → PARALELO → REVISAR → INTEGRAR → TESTAR → VALIDAR
```

## Regras

1. **Paralelize com `run_in_background: true`.** É o paralelismo real
   comprovado nesta conta (usado em missões anteriores desta mesma sessão).
   Sem essa flag cada `Agent` bloqueia o próximo.

2. **Só o coordenador integra.** Especialista propõe; quem escreve no arquivo
   final é o coordenador (ou, na arquitetura do agente futuro, o módulo
   Executor). Isso evita dois agentes gravando o mesmo arquivo.

3. **Alto risco exige duas análises independentes.** Sempre `reviewer`; e
   `security` quando tocar autenticação, permissão, dinheiro, credencial ou
   dado sensível.

4. **VETO bloqueia.** `security` ou `reviewer` reprovando impede a integração.
   Corrija primeiro. Não contorne.

5. **Contexto sob medida.** Passe ao agente só os caminhos que ele precisa.
   Não despeje o projeto inteiro — o combo tem teto real de ~64k tokens.

6. **Relate divergência.** Se dois agentes discordarem, mostre as duas
   posições e diga qual foi escolhida e por quê. Não esconda o conflito.

## Quando NÃO montar equipe

Pergunta simples, leitura de um arquivo, comando único: responda direto.
Equipe custa tempo — use quando a tarefa tem partes independentes de verdade.

## Fases com barreira

Tarefas independentes rodam juntas; a fase seguinte só começa quando a
anterior fecha:

```
FASE 1 (paralelo)  research · uiux · frontend · seo
        └── barreira
FASE 2 (paralelo)  security · performance · reviewer
        └── barreira
FASE 3 (sequencial) coordinator consolida
```
