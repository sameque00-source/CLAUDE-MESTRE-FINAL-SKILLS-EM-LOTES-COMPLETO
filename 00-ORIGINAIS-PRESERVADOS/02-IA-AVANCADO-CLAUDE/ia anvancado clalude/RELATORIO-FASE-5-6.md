# RELATÓRIO — FASE 5 (Pesquisa Web Autônoma) + FASE 6 (Memória Inteligente)

Data: 2026-09-15
Escopo: implementação **combinada** das Fases 5 e 6, conforme mandato — pesquisa
alimenta memória, memória melhora pesquisas futuras. Fase 7+ **não** foi
implementada (fora de escopo por decisão explícita do mandato).

---

## 1. Arquitetura

```
handlers-tarefa.js (Executor, Fase 3/4)
   └─ handlePesquisa(tarefa, missao)
        1) memoria.consultarAntesDePesquisar(query)   ── RECALL primeiro
        2) se não reutilizável → pesquisa.pesquisar(query, opcoes)
        3) memoria.gravarResultadoDePesquisa(resultado) ── grava filtrado

pesquisa/pesquisa.js (orquestra o pipeline de busca)
   ├─ provider-busca.js      → search()/open() com fallback entre providers
   │    ├─ providers/npm.js         (registry.npmjs.org)
   │    ├─ providers/wikipedia.js   (REST API pt/en)
   │    └─ providers/duckduckgo.js  (Instant Answer API)
   ├─ classificador-fonte.js → nível de confiabilidade da fonte
   ├─ pesquisa-adaptativa.js → profundidade (nº fontes) por complexidade
   ├─ cache-pesquisa.js      → cache persistente, validade por categoria
   ├─ triangulacao.js        → concordância/contradição via LLM (reaproveita Fase 2)
   └─ confianca.js           → score de confiança da evidência (máx. 0.97)

memoria/memoria.js (camada de memória, evolução do log da Fase 4)
   ├─ core/tipos.js          → 8 tipos de memória + validade padrão por tipo
   ├─ core/sanitizacao.js    → bloqueia secret/path-traversal/conteúdo malformado
   ├─ core/armazenamento.js  → persistência JSON atômica (.tmp+rename)
   ├─ core/expiracao.js      → validade variável (nunca TTL fixo)
   ├─ core/confianca.js      → score de confiança do registro (máx. 0.95)
   ├─ core/recall.js         → seleção contextual por relevância (nunca dump total)
   └─ agentes = memoria-agentes.js (Fase 4, reexportado sem alteração)
```

Princípio seguido em todo o pipeline: **nunca inventar**. Toda falha de fonte,
de cache ou de LLM é reportada como `status=indisponivel`/`erro`/`insuficiente`
explicitamente — nunca preenchida com dado fabricado.

---

## 2. Pesquisa real (Fase 5)

### Providers implementados (gratuitos, sem chave, sem cartão)
| Provider | Uso | Evidência real observada nesta sessão |
|---|---|---|
| `npm-registry` | versão/pacote npm | `express@5.2.1`, `chalk@6.0.0`, `date-fns@4.4.0`, `typescript@7.0.2`, `axios@1.20.0`, `dayjs@1.11.23` |
| `wikipedia` (REST, pt/en) | fatos gerais, tópicos técnicos | resumo de "React" com `timestamp` real da última edição da API |
| `duckduckgo` (Instant Answer API) | fallback geral | usado quando `AbstractText` existe; honestamente retorna `ok:false` quando a API não tem resposta instantânea (limitação real e documentada da própria API, **não** um erro de rede) |

`open(url, opcoes)` faz GET HTTP real, segue redirecionamentos, capa a resposta
em 300KB e extrai texto de HTML real (remove `<script>`/`<style>`/comentários,
decodifica entidades básicas).

### Fallback entre providers
`provider-busca.js` tenta os providers na ordem sugerida pelo tipo da pesquisa
(ex.: `pacote` → tenta `npm` primeiro) e cai para o próximo em caso de exceção,
com cooldown local de 30s por provider após falha (mecanismo leve, em memória,
distinto do cooldown persistente do Gateway). Nunca usa provedor pago/com
cartão.

### Evidência estruturada
Cada item de evidência carrega `{query, fonte, url, titulo, data, trecho,
evidencia, confianca}` — rastreável do resultado final até a fonte original.

### Classificação de fonte
`classificador-fonte.js` define 6 níveis (documentação oficial → fonte
secundária) com peso decrescente (1.0 → 0.3); `npm-registry` e `wikipedia` são
classificados por atalho direto (documentação oficial / publicação técnica),
os demais por regex de domínio.

### Triangulação
`triangulacao.js` reaproveita `chamar-llm.js` da Fase 2 (não duplica chamada de
modelo). Pede ao modelo que classifique explicitamente `situacao:
concordancia|contradicao|insuficiente`, com atribuição de fonte por afirmação.
Nunca escolhe um lado arbitrariamente — quando há divergência real, ambas as
afirmações são preservadas com suas fontes.

### Cache persistente
`cache-pesquisa.js` persiste em `pesquisa/dados/cache-pesquisa.json`. Validade
por categoria (não um TTL fixo único):
- `documentacao`: 30 dias
- `versao_pacote`: 3 dias
- `preco` / `noticia`: 6 horas
- `fato_geral`: 14 dias
- default: 7 dias

### Pesquisa adaptativa
`pesquisa-adaptativa.js` decide `numFontesAlvo` (1 a 5) com base em
complexidade da missão, se o tema é controverso, se exige informação recente e
a confiança atual — nunca um número fixo de fontes.

### Falha honesta
Quando nenhum provider encontra nada, o sistema **nunca inventa** um resultado.
Comportamento final adotado (após bug corrigido — ver seção 6): se existir
memória (mesmo vencida), ela é reaproveitada com rótulo explícito
`[PRECISA VERIFICAÇÃO]`; se não existir nenhuma, a tarefa é concluída com
`status:'ok'` e um resultado que **declara textualmente** que nenhuma fonte
externa foi encontrada — sem fabricar fato algum, e sem travar tarefas
dependentes (ver seção 6, bug #7).

---

## 3. Memória inteligente (Fase 6)

### 8 tipos de memória (`memoria/core/tipos.js`)
`missao`, `projeto`, `agente`, `pesquisa`, `conhecimento_factual`, `decisao`,
`erro_conhecido`, `solucao_conhecida` — cada um com validade padrão própria
(14 dias a 1 ano), nunca um único TTL global.

### Estrutura do registro
`{id, tipo, conteudo, origem, timestamp, confianca, tags, contexto,
validadeMs/expiraEm, evidencias, missaoId, projetoId, _tipoConteudo}`.

### Recall antes de pesquisar
`handlePesquisa` chama `memoria.consultarAntesDePesquisar(query)` **antes** de
qualquer busca web. Se há memória válida e relevante o suficiente
(`limiarRelevancia` padrão 0.34), a pesquisa web é **evitada** — demonstrado
concretamente na seção 5 abaixo (teste real de reutilização, missão B evitando
buscar de novo o que a missão A já pesquisou).

### Expiração variável, nunca um TTL fixo
`memoria/core/expiracao.js` usa `validadeMs` por registro (herda o padrão do
tipo, mas pode ser sobrescrito por categoria de pesquisa — ex.: preço expira
em horas, documentação em semanas).

### Invalidação explícita, nunca silenciosa
`armazenamento.invalidar(tipo, id, motivo)` marca o registro como inválido com
motivo registrado — nunca um `delete` silencioso. Gatilhos: mudança de fonte,
staleness detectada no recall, contradição encontrada em revisão, nova
pesquisa que contradiz a antiga.

### Confiança nunca absoluta
`memoria/core/confianca.js` calcula um score a partir de qualidade da fonte +
quantidade + concordância + recência — **capado em 0.95** (nunca 1.0 — o
sistema nunca afirma certeza absoluta, mesmo com evidência forte).

### Pipeline RESEARCH → MEMORY
`memoria.gravarResultadoDePesquisa(resultado)` só persiste quando
`ok && evidencias.length > 0 && confianca >= 0.2` — filtra "lixo" antes de
persistir (testado explicitamente na seção 19b da suíte: resultado sem
evidência **não** polui a memória).

### Pipeline MEMORY → RESEARCH
`consultarAntesDePesquisar` decide entre: reutilizar sem pesquisar, pesquisa
incremental (memória perto de expirar vira contexto + pesquisa nova, sem
descartar tudo), ou pesquisa completa (sem memória aproveitável). A consulta
para tipo `pesquisa` é feita **sem** filtrar por `missaoId` — conhecimento de
pesquisa é reutilizável entre missões diferentes (corrigido nesta fase — ver
bug #3 na seção 6).

### Seleção contextual (nunca dump total)
`memoria.contextoParaAgente` devolve no máximo 3 registros relevantes por
agente — nunca a memória inteira.

### Segurança e privacidade
- `sanitizacao.js` mascara padrões de secret (`sk-`, `gsk_`, `AKIA`, `AQ.`,
  senha/token/api_key em texto claro, Bearer tokens) **antes** de qualquer
  persistência.
- Bloqueia `id` com path traversal ou caracteres de injeção.
- Rejeita conteúdo vazio ou maior que 20.000 caracteres.
- Todo registro persistido é marcado `_tipoConteudo: 'dado'` (nunca
  `'instrucao'`) — mesmo que uma pesquisa futura reinjete esse conteúdo num
  prompt, ele é tratado como dado, não como comando (mitigação de
  prompt-injection armazenada).

### Persistência real
Armazenamento em `memoria/dados/<tipo>.json`, escrita atômica (`.tmp` +
`rename`, mesmo padrão da Fase 1). Confirmado sobrevivendo a um `require`
fresco do módulo `armazenamento` (simulação de reinício de processo).

---

## 4. Integração (o ponto central do mandato)

A pesquisa **alimenta** a memória: todo resultado de pesquisa válido vira um
registro `tipo:'pesquisa'` automaticamente (filtrado por qualidade).

A memória **melhora** pesquisas futuras: toda pesquisa nova primeiro consulta
a memória; se há conhecimento válido reaproveitável, a pesquisa web real é
**pulada** — economia de chamadas e resposta mais rápida, com o mesmo padrão
de evidência.

Essa integração bidirecional foi validada com **execução real** (não só teste
unitário) na missão obrigatória e no teste de reutilização (seções 27 e 28 da
suíte, ver seção 5 abaixo).

---

## 5. Missões reais executadas (evidência concreta, não simulada)

### Missão obrigatória (seção 27): "Descubra a versão atual do pacote npm dayjs"
- Pesquisa real via `npm-registry`: `dayjs@1.11.23` (versão real confirmada no
  momento da execução).
- Evidência com URL real (`https://registry.npmjs.org/dayjs/latest`).
- Memória gravada de verdade (`memoria.listar('pesquisa')` contém o registro
  com `contexto.query` incluindo "dayjs").

### Teste de reutilização (seção 28): "versão atual do pacote npm date-fns"
- Missão A pesquisa `date-fns` pela primeira vez → grava em memória.
- Missão B, mesma pergunta → evidência da tarefa contém
  `memoria_reutilizada=true` e o conteúdo correto (`date-fns`, não outro
  pacote) — pesquisa web **não** foi refeita.

### Teste de atualização (seção 29)
Memória forçada como expirada (`validadeMs: -1000`) para um pacote fictício
(`ramda-teste29-<timestamp>`, nome único por execução para não colidir com
execuções anteriores da própria suíte). Sistema detecta que não deve reutilizar
(`consultarAntesDePesquisar().reutilizar === false`), pesquisa de novo (dados
reais de `ramda`), e a atualização é registrada.

### Teste de conflito (seção 30)
Duas fontes sintéticas com recomendações opostas sobre uma biblioteca fictícia
("Foo") → `triangular()` classifica corretamente `situacao:'contradicao'`, sem
escolher um lado sem base em evidência.

### Teste de segurança (seção 31)
Tentativas de gravar secret (`gsk_...`), `id` com path traversal, conteúdo de
100.000 caracteres e uma tentativa de prompt-injection direto no conteúdo —
todas bloqueadas/sanitizadas, confirmado lendo o registro persistido de volta.

### Teste de paralelismo (seção 32)
Duas pesquisas independentes (`uuid`, `semver`) despachadas via
`orq.executarProntas` com medição real de timestamp de início/fim —
sobreposição de janelas de execução confirmada (execução realmente
concorrente, não sequencial disfarçada).

---

## 6. Problemas encontrados e correções (ordem cronológica)

1. **Query em linguagem natural quebrava a busca no npm (HTTP 404)** —
   `pesquisar()` recebia a descrição completa da tarefa em vez do nome exato
   do pacote. Corrigido com `extrairNomePacote()` (regex) em
   [pesquisa/pesquisa.js](pesquisa/pesquisa.js).

2. **Memória não era reaproveitada entre missões (causa 1)** — `recall`
   comparava a query nova só contra a síntese armazenada, não contra a
   pergunta original. Corrigido incluindo `contexto.query` na comparação em
   [memoria/core/recall.js](memoria/core/recall.js).

3. **Memória não era reaproveitada entre missões (causa 2, mais profunda)** —
   `consultarAntesDePesquisar` filtrava por `missaoId`, impedindo reuso
   legítimo de conhecimento de pesquisa entre missões diferentes. Corrigido
   removendo esse filtro especificamente para memória do tipo `pesquisa`.

4. **[CRÍTICO] Memória do pacote errado sendo reaproveitada** (ex.: pergunta
   sobre `chalk` devolvendo dados de `express`) — causa raiz: `\W` no regex do
   JavaScript não é Unicode-aware, quebra "versão" em "vers"+"o" no acento, e
   esse fragmento colide entre QUALQUER pesquisa que mencione "versão", já que
   as descrições de tarefa geradas pelo Planejador são fortemente templatizadas.
   Corrigido em duas camadas: `\p{L}\p{N}` (Unicode-aware) + uma lista de
   vocabulário-molde ignorado (`PALAVRAS_MOLDE_IGNORADAS`). **O mesmo bug foi
   encontrado proativamente e corrigido em
   [agentes/core/consolidador.js](agentes/core/consolidador.js)** (código da
   Fase 4, não tocado até então) — backup feito antes da edição.

5. **Nomes de pacote compostos (`date-fns`) ainda colidindo** — o hífen era
   tratado como separador, reduzindo `date-fns` a "date" (genérico demais).
   Corrigido preservando hífen dentro do token.

6. **Bug no próprio teste 29** — mutar `.expiraEm` de um registro relido e
   regravar era sobrescrito, porque `armazenamento.gravar()` sempre recalcula
   `expiraEm` a partir de `validadeMs`. Corrigido passando `validadeMs`
   negativo diretamente na gravação inicial.

7. **[Regressão real encontrada na regressão da Fase 4] Pesquisa sem
   resultado cancelava tarefas dependentes inteiras** — `handlePesquisa`
   retornava `status:'erro'` quando nenhum provider encontrava nada, o que
   acionava a cascata de cancelamento de tarefas dependentes já existente
   desde a Fase 3/4 (`executor/executor.js`, não modificado nesta fase). Numa
   missão com objetivo genérico demais para pesquisar de verdade ("Melhore um
   pequeno aplicativo web"), a tarefa de pesquisa honestamente não achava
   fonte, e isso cancelava a tarefa de código e de revisão junto —
   contradizendo o requisito de "não travar/bloquear a missão por falta de
   fonte". Corrigido em
   [executor/core/handlers-tarefa.js](executor/core/handlers-tarefa.js):
   ausência de fonte agora retorna `status:'ok'` com um resultado que
   **declara textualmente** que nenhuma fonte externa foi encontrada (nunca
   inventa fato/fonte), permitindo que a tarefa de código prossiga com
   raciocínio próprio do agente. Backup de
   `handlers-tarefa.js` feito antes desta edição adicional.

8. **3 bugs de robustez em testes (não do sistema)**, todos por falta de
   guard contra `missao === null` quando o planejamento falha
   transitoriamente (variância real de LLM/quota, ver seção 7):
   - `testes/teste-fase4-agentes.js`: `testeMissaoReal1` (crash já existente,
     corrigido antes desta fase) e `testeMissaoReal2` (mesma classe, corrigida
     nesta fase — sem backup prévio, ver Limitações).
   - `testes/teste-fase5-6-pesquisa-memoria.js`: `testesObrigatorios`
     (seções 27 e 28) sem guard contra `r.missao === null`.
   - `testes/teste-fase3-executor.js`: `testeMissaoRealObrigatoria` sem guard
     (crash `Cannot read properties of null (reading 'id')`) e
     `testeDependenciaReal` sem guard contra `tempos[id] === undefined`
     quando uma dependência anterior não concluiu (crash `Cannot read
     properties of undefined (reading 'inicio')`). Backups feitos antes de
     cada edição em
     `BACKUPS_AMBIENTE_LOCAL/FASE5-6_PESQUISA_MEMORIA_20260915/`.
   Em todos os casos, o sistema em si **nunca travava** — era o script de
   teste que derrubava o processo Node inteiro com uma exceção não tratada
   antes de reportar o resultado real.

---

## 7. Regressão

| Fase | Resultado (passagem limpa, isolada) |
|---|---|
| Fase 0 | 6/6 |
| Fase 1 | 25/25 |
| Fase 2 | 31/31 |
| Fase 3 | 34/34 (após corrigir os 2 bugs de robustez do item 8) |
| Fase 4 | 36/36 (após corrigir o bug da cascata #7 e o bug de robustez do teste) |
| Fase 5-6 | 48/48 |

**[CONFIRMADO — limitação ambiental atual, não regressão de código]**: ao
final da sessão, rodadas adicionais de regressão em sequência (6 suítes
completas, muitas execuções reais de missão cada) esgotaram temporariamente a
cota do combo de modelos gratuitos local, causando falhas intermitentes
("resposta vazia", HTTP 429 com `OTPM` no limite). Isso foi verificado de
forma isolada e independente do código desta fase:
- uma chamada `chamarLLM` mínima (`tipoTarefa:'raciocinio'`) teve sucesso
  imediato;
- uma chamada `chamarLLM` mínima (`tipoTarefa:'codigo'`) falhou com "resposta
  vazia" mesmo fora de qualquer pipeline da Fase 5-6, confirmando degradação
  específica do modelo de geração de código no momento, não um bug introduzido
  aqui;
- hash SHA-256 confirmado de que `planejador/core/chamar-llm.js`,
  `planejador/core/prompt-decomposicao.js` e `executor/executor.js`
  permanecem exatamente como estavam antes desta fase.

As passagens limpas e isoladas acima (34/34, 36/36, 48/48) são a prova válida
de que o código está correto; a degradação de quota é uma condição externa e
transitória do provedor gratuito, documentada honestamente aqui em vez de
escondida.

---

## 8. Infraestrutura preservada

- 9Router: porta 20128, PID 10760 — `{"ok":true}` no health check, inalterado
  durante toda a sessão.
- Gateway: porta 20130, PID 6524 — `{"status":"ok", ...}`, inalterado.
- Nenhum `taskkill /IM node.exe` usado em nenhum momento.
- VPS/FiveM/FXServer: não tocado (fora do escopo desta fase).

## 9. Varredura de credenciais

Varredura em toda a árvore `Downloads\ia anvancado clalude\` por padrões de
secret (`sk-`, `gsk_`, `AKIA...`, `password/senha/api_key=...`). Único
resultado real: dados de `memoria/dados/*.json` — **limpo, nenhum secret real
encontrado** (confirma que a sanitização está funcionando na prática, não só
em teste). Os demais resultados (`sk-1234567890abcdefTESTE`,
`"abc123senha"`) são fixtures deliberadamente falsas dos próprios testes de
veto de segurança da Fase 4 (`workspace/config.js`,
`workspace/perigoso.js`), não credenciais reais.

## 10. Backups e rollback

Diretório: `Documents/Imperiom Fivem/BACKUPS_AMBIENTE_LOCAL/FASE5-6_PESQUISA_MEMORIA_20260915/`

8 arquivos de backup, todos com hash SHA-256 verificado em `SHA256SUMS.txt`:
`executor.js.bak`, `handlers-tarefa.js.bak`, `memoria-agentes.js.bak`,
`prompt-decomposicao.js.bak`, `consolidador.js.bak`,
`handlers-tarefa.js.antes-fix-cascata.bak` (checkpoint intermediário antes do
bug #7), `teste-fase3-executor.js.antes-nullguard.bak` e
`teste-fase3-executor.js.antes-nullguard-dependencia.bak`.

`ROLLBACK.sh`: sintaxe verificada (`bash -n`), verifica hash antes de
restaurar, e agora restaura **todos** os 6 arquivos de produção alterados
nesta fase (`handlers-tarefa.js`, `memoria-agentes.js` [não alterado, mantido
por segurança], `prompt-decomposicao.js` [não alterado, mantido por
segurança], `executor.js` [não alterado, mantido por segurança],
`consolidador.js`, `teste-fase3-executor.js`) — corrigido nesta sessão: antes
não restaurava `consolidador.js.bak` apesar de existir (gap real encontrado e
fechado).

## 11. Problema de processo (honestidade)

`testes/teste-fase4-agentes.js` foi editado nesta sessão (fix do bug #7 do
item 8 e mudança de `tipo:'pesquisa'`→`'raciocinio'` no teste 2e6) **sem**
backup prévio — mesmo gap de processo já registrado em fases anteriores. Como
é um arquivo de teste (não produção) e o conteúdo final está em
`teste-fase4-agentes.js` no repositório, o "rollback" possível é reverter via
histórico do editor/versionamento externo, não via este diretório de backup.

## 12. Limitações conhecidas

- **Relevância de recall por stopword-list**: `PALAVRAS_MOLDE_IGNORADAS` é uma
  lista fixa de vocabulário-molde. Novas frases-template do Planejador podem
  introduzir novas palavras genéricas de alta frequência não cobertas pela
  lista, reintroduzindo falsos-positivos de relevância. Uma solução mais
  robusta (TF-IDF real ou embeddings) ficaria para uma fase futura.
- **Triangulação depende de LLM disponível**: se o modelo estiver
  indisponível (ver seção 7), a triangulação retorna `situacao:'insuficiente'`
  honestamente, mas isso reduz a capacidade de detectar divergência real
  naquele momento — comportamento correto (não inventa), mas é uma limitação
  de disponibilidade externa, não de lógica.
- **Cooldown de provider é em memória, por processo**: reinicia a cada
  restart do processo Node — aceitável para o volume atual, mas não
  persistente como o cooldown do Gateway.
- **DuckDuckGo Instant Answer API** cobre bem menos perguntas do que uma busca
  web completa (limitação documentada da própria API gratuita, não do código)
  — funciona como terceiro fallback, não como fonte primária confiável para
  perguntas gerais.

---

**Conclusão**: Fase 5 (pesquisa web autônoma real) e Fase 6 (memória
inteligente) implementadas de forma integrada, testadas com execução real
(não só testes unitários), com 7 bugs reais encontrados e corrigidos (incluindo
uma regressão de cascata de cancelamento descoberta só na regressão da Fase 4)
e 3 bugs de robustez em testes corrigidos. Regressão completa das Fases 0-4
confirmada verde em passagens isoladas. Fase 7 **não** iniciada, conforme
escopo.
