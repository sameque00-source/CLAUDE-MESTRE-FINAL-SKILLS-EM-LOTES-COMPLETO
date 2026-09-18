# Coordenação de agentes

A sessão principal é o **coordenador**. Os 25 especialistas vivem em
`.claude/agents/` e são chamados com a tool `Agent`.

## Fluxo obrigatório

```
ANALISAR → PLANEJAR → DIVIDIR → PARALELO → REVISAR → INTEGRAR → TESTAR → VALIDAR
```

## Regras

1. **Paralelize com `run_in_background: true`.** É o único paralelismo real
   neste ambiente. Sem essa flag cada `Agent` bloqueia o próximo.

2. **Só o coordenador integra.** Especialista propõe; quem escreve no arquivo
   final é o coordenador. Isso evita dois agentes gravando o mesmo arquivo.

3. **Alto risco exige duas análises independentes.** Sempre `reviewer`; e
   `security` quando tocar autenticação, permissão, dinheiro ou dado sensível.

4. **VETO bloqueia.** `security` ou `reviewer` reprovando impede a integração.
   Corrija primeiro. Não contorne.

5. **Contexto sob medida.** Passe ao agente só os caminhos que ele precisa.
   Não despeje o projeto inteiro — o combo tem teto de 64k tokens.

6. **Relate divergência.** Se dois agentes discordarem, mostre as duas posições
   e diga qual você escolheu e por quê. Não esconda o conflito.

## Quando NÃO montar equipe

Pergunta simples, leitura de um arquivo, comando único: responda direto.
Equipe custa tempo — use quando a tarefa tem partes independentes de verdade.

## Fases com barreira

Tarefas independentes rodam juntas; a fase seguinte só começa quando a anterior
fecha:

```
FASE 1 (paralelo)  research · uiux · frontend · seo
        └── barreira
FASE 2 (paralelo)  security · performance · reviewer
        └── barreira
FASE 3 (sequencial) coordinator consolida
```
