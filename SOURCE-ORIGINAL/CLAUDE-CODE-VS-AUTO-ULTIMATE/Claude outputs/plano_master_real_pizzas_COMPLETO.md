# PLANO MASTER — REAL PIZZAS & ESFIRRAS
## Site Definitivo · Experiência Digital Premium
**Versão:** 1.0 — Aguardando Aprovação  
**Status:** RASCUNHO PARA REVISÃO — NÃO INICIAR DESENVOLVIMENTO  
**Data:** 2026-09-13  
**Baseado em:** Relatório de Pesquisa + Análise Jesko Jets (@webloved) + Agentes consultados

---

> ⚠️ **ATENÇÃO:** Este documento é um plano. Nenhuma linha de código foi ou deve ser escrita até aprovação formal. Dados marcados como `[DEMO]` são fictícios e devem ser substituídos por informações reais do proprietário antes do desenvolvimento.

---

## 1. VISÃO GERAL

### O Que É Este Projeto
Um site completo para a **REAL PIZZAS & ESFIRRAS**, localizada no bairro Flexal II em Cariacica/ES. O site funcionará simultaneamente como:

- **Vitrine de marca** — presença digital premium que comunica qualidade e profissionalismo
- **Cardápio digital interativo** — categorizado, navegável, visual
- **Sistema de pedido** — configuração de produto → carrinho → checkout → WhatsApp
- **Canal de conversão** — cada pixel trabalha para transformar visita em pedido

### O Que Não É Este Projeto
- Não é um template genérico de pizzaria
- Não é uma plataforma de delivery (iFood, Rappi) — é canal proprietário
- Não é um app nativo (PWA opcional no futuro)
- Não é um sistema de gestão (painel admin é fase futura)

### Premissa Central
> "O usuário deve se impressionar e pedir em menos de 3 minutos."

---

## 2. CONCEITO CRIATIVO

### Tema: **"Da Brasa ao Sabor"**
O site narra uma experiência sensorial. O usuário não "visita um cardápio" — ele **percorre o caminho de uma pizza perfeita**: do calor do forno à mesa, da escolha do sabor ao clique em pedir.

### Dualidade Visual
Inspirado na linguagem do @webloved (analisada via vídeo Jesko Jets), o site opera em dois estados:

**ESTADO 1 — ESCURIDÃO DA BRASA**
Fundo muito escuro (quase preto, com tom marrom/âmbar quente). Evoca o interior de um forno a lenha, o ambiente noturno de uma pizzaria premium. Tipografia em peso extremo. Alta dramaticidade.

**ESTADO 2 — CLARIDADE DO PRODUTO**
Fundo creme/off-white quente. O produto (pizza, esfiha) no centro. Cores reais dos ingredientes. Appetizing, convidativo, direto.

A transição entre os dois estados acontece através de uma **abertura circular** — análoga ao porthole do Jesko Jets, mas adaptada: aqui é a abertura circular de um forno de pizza, que se expande revelando o produto.

### Arquétipo de Marca
**Artesão Premium Local.** Não é fast-food. Não é gourmet fora de alcance. É o melhor da vizinhança — feito com cuidado, entregue com orgulho.

### Princípio de Design
- Escuridão = forno, brasa, calor, expectativa
- Luz = produto, sabor, entrega, satisfação
- Ouro/âmbar = o queijo derretendo, o calor, a qualidade

---

## 3. OBJETIVOS

### Objetivos de Negócio
| # | Objetivo | Métrica de Sucesso |
|---|---------|-------------------|
| 1 | Aumentar pedidos pelo canal próprio | Volume de cliques no botão WhatsApp |
| 2 | Reduzir dependência de plataformas de delivery | % pedidos diretos vs apps |
| 3 | Fortalecer identidade da marca localmente | Reconhecimento de marca em Flexal II / Cariacica |
| 4 | Facilitar processo de pedido | Tempo médio da visita até clique em "Pedir" |
| 5 | Servir como vitrine para novos clientes | Taxa de rejeição na primeira visita |

### Objetivos de UX
1. O usuário deve atingir o cardápio em **1 clique** a partir de qualquer ponto
2. A mensagem do pedido deve ser gerada **automaticamente** — zero digitação
3. A experiência mobile deve ser **idêntica em qualidade** ao desktop
4. Tempo de carregamento inicial **< 3 segundos** em 4G médio
5. Nenhum passo do fluxo de compra deve gerar dúvida

### Objetivos de Marca
1. Transmitir **profissionalismo** (primeira impressão = "essa marca é séria")
2. Transmitir **apetite** (segunda impressão = "quero pedir agora")
3. Comunicar **localidade** (sei que é do meu bairro, é acessível)

---

## 4. PÚBLICO E CONVERSÃO

### Público Primário
- **Moradores de Flexal II e região** — Cariacica/ES
- Faixa etária: 18–45 anos
- Dispositivo predominante: **smartphone Android** (dados de mercado BR)
- Conexão: 4G variável (não assumir broadband)
- Comportamento: descobre pelo Instagram, acessa o link na bio, quer pedir rápido

### Público Secundário
- Empresas e escritórios da região para pedidos corporativos
- Usuários de desktop em casa (jantar em família)

### Funil de Conversão Planejado
```
DESCOBERTA (Instagram / indicação / busca Google)
         ↓
ATERRISSAGEM (Hero — impacto em < 3 segundos)
         ↓
EXPLORAÇÃO (Cardápio — navegar, descobrir)
         ↓
DECISÃO (Produto — escolher, personalizar)
         ↓
MONTAGEM (Carrinho — conferir, ajustar)
         ↓
CHECKOUT (Dados — nome, endereço)
         ↓
CONVERSÃO (Clicar em "Pedir pelo WhatsApp")
         ↓
CONFIRMAÇÃO (WhatsApp abre com mensagem pronta)
```

### Gatilhos de Conversão a Implementar
- Produto com foto apetitosa em destaque imediato
- Preço visível antes do clique (sem surpresa)
- Promoção/combo em evidência
- Avaliações ou prova social [quando disponível]
- CTA "Pedir agora" sempre acessível

---

## 5. ARQUITETURA DO SITE

### Estrutura de Páginas
O site é **single-page application (SPA)** com scroll narrativo. Não há múltiplas páginas de produto — tudo acontece em fluxo vertical com modais/drawers sobrepostos.

```
/ (home — única rota pública)
├── #hero          — impacto inicial
├── #historia      — quem somos (opcional, curto)
├── #cardapio      — menu completo por categoria
├── #promocoes     — destaque do dia / combo
├── #instagram     — feed da marca
├── #localizacao   — endereço + mapa + área
└── #footer        — contato, links, horário

/cardapio (rota alternativa — deep link para cardápio direto)
```

**Overlays (sobre a SPA):**
- Modal de produto (configuração: tamanho, sabor, borda)
- Drawer de carrinho (lateral desktop, bottom sheet mobile)
- Bottom sheet de checkout

### Hierarquia de Informação
```
NÍVEL 1 — MARCA
  Logo + tagline + valor da marca

NÍVEL 2 — PRODUTO
  O que temos, o que é especial

NÍVEL 3 — CARDÁPIO
  Categorias → produtos → preços

NÍVEL 4 — CONVERSÃO
  Configurar → Carrinho → Pedir
```

---

## 6. JORNADA DO USUÁRIO

### Fluxo Principal — Pedido Delivery

```
1. CHEGADA
   → Vê o Hero (brasa → abertura → pizza)
   → Lê o nome da marca e tagline
   → Percebe que é uma pizzaria de qualidade
   → [Impacto: < 3 segundos]

2. NAVEGAÇÃO
   → Clica em "Ver Cardápio" OU rola a página
   → Chega ao cardápio categorizado
   → Seleciona categoria (Pizzas / Esfihas / Bebidas / etc.)
   → Filtra ou navega horizontalmente

3. SELEÇÃO
   → Clica em uma pizza
   → Modal abre com foto grande
   → Escolhe tamanho → sabor(es) → borda → adicionais
   → Preço atualiza em tempo real
   → Clica "Adicionar ao Pedido"

4. CARRINHO
   → Ícone do carrinho mostra badge com quantidade
   → Pode continuar escolhendo ou abrir o carrinho
   → Carrinho mostra itens, subtotal, entrega, total

5. CHECKOUT
   → Preenche: Nome · Tipo (entrega/retirada) · Endereço
   → Vê o resumo final
   → Clica "Pedir pelo WhatsApp"

6. WHATSAPP
   → App WhatsApp abre
   → Mensagem completa já preenchida
   → Clica "Enviar"
   → Conversa com a pizzaria se inicia

7. PÓS-PEDIDO
   → Mensagem de confirmação na tela
   → Sugestão de seguir no Instagram
```

### Fluxo Alternativo — Retirada
Idêntico ao acima, exceto que na etapa 5, ao escolher "Retirada", o campo de endereço some e aparece o endereço da pizzaria com botão "Ver no Maps".

### Fluxo Mobile-First
Em mobile (> 90% do tráfego estimado):
- Hero ocupa 100vh com scroll hint
- Cardápio: lista vertical com scroll horizontal por categoria
- Modal de produto: fullscreen bottom-to-top
- Carrinho: drawer da base da tela
- Checkout: tela fullscreen sequencial
- WhatsApp: abre o app nativo diretamente

---

## 7. HERO

### Conceito Visual
**"O Forno Abre"**

O hero é a metáfora central da experiência: o usuário está do lado de fora de um forno escuro, e ao interagir (ou apenas esperar), a porta circular do forno se abre, revelando o calor e a pizza dentro.

### Composição (Desktop)
```
┌─────────────────────────────────────────────────────┐
│  [NAV] Real Pizzas & Esfirras          [🛒] [Menu]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│    "REAL"              ◯ (círculo forno)    "PIZZAS"│
│    [ultralight]     [expandindo]        [ultralight]│
│                                                     │
│         Tagline central: "Feito com brasa.          │
│                          Entregue com orgulho."     │
│                                                     │
│              [CTA] Ver Cardápio ↓                   │
│                                                     │
│    ℹ️ Flexal II · Cariacica/ES         Tel: [DEMO]  │
└─────────────────────────────────────────────────────┘
```

### Sequência de Animação do Hero
**T=0 → 0.8s:** Fundo negro. "REAL" e "PIZZAS" aparecem em ultralight com blur-to-sharp.  
**T=0.8 → 1.6s:** Círculo central aparece pequeno (~180px) — simula a porta fechada do forno.  
**T=1.6 → 2.4s:** Círculo começa a brilhar por dentro (gradiente âmbar/laranja pulsando).  
**T=2.4 → 3.2s:** Ao primeiro scroll (ou automático após 3s): círculo EXPANDE via `clip-path: circle()` de 12% para 150% da tela.  
**T=3.2 → 4.0s:** Revela o interior — fundo creme quente + pizza 3D ou imagem profissional de pizza.  
**T=4.0+:** Hero claro: produto em destaque, tagline visível, CTA ativo.

### Elementos Técnicos do Hero
- **Background escuro:** `#0d0a08` (preto com temperatura quente)
- **Círculo do forno:** div com `border-radius: 50%`, clip-path, borda em gradiente âmbar
- **Efeito de brasa:** CSS radial-gradient pulsando suavemente + WebGL shader se viável
- **Abertura:** `clip-path: circle(12% at 50% 48%)` → `circle(150% at 50% 48%)`, GSAP `scrub: 1`
- **Pizza:** Imagem WebP otimizada OU modelo Three.js simples (ver seção 3D)
- **Tipografia:** Display ultrabold para "REAL" e "PIZZAS"; ultralight para tagline

### Headline e Copy
**Headline principal:** `REAL`  `PIZZAS`  (flanqueando o círculo)  
**Tagline:** "Feito com brasa. Entregue com orgulho." [DEMO — validar com proprietário]  
**Sub-tagline:** "Pizzas e Esfihas artesanais em Flexal II · Cariacica/ES"  
**CTA principal:** "Ver Cardápio" (âncora para #cardapio)  
**CTA secundário:** "Pedir Agora" (vai direto para WhatsApp com mensagem padrão)

### Comportamento Mobile
- Círculo ocupa 60% da largura da tela
- Texto "REAL" acima, "PIZZAS" abaixo do círculo (layout empilhado)
- Animação de abertura: mesma lógica, acionada por scroll suave
- Hero: 100svh (safe viewport height)
- Scroll hint: seta animada ou texto "Role para explorar"

### Performance do Hero
- Vídeo de background: NÃO usar no hero (muito pesado para conexões móveis BR)
- Usar imagem WebP otimizada como revelação (pizza profissional)
- 3D no hero: OPCIONAL — decisão em seção 10 (3D)
- LCP target: a imagem da pizza deve ser preloaded (`<link rel="preload">`)
- Total acima do fold: < 200KB comprimido

---

## 8. SEÇÕES

### Seção 1 — HERO (já detalhada acima)

---

### Seção 2 — NOSSA HISTÓRIA / QUEM SOMOS
**Finalidade:** Criar conexão emocional e confiança. Breve — não é sobre texto, é sobre identidade.

**Conteúdo:**
- Headline: "Nascida no Flexal. Feita com amor." [DEMO]
- 2–3 parágrafos curtos sobre a origem [DADOS PENDENTES do proprietário]
- 1 imagem forte: equipe, forno, ou o fundador [PENDENTE]
- Destaque: número de anos / pizzas entregues / clientes felizes [DEMO: "5+ anos · +50.000 pizzas · Flexal II"]

**Layout:** Duas colunas em desktop (texto + imagem). Uma coluna em mobile.

**Animações:**
- Texto: blur reveal linha por linha ao entrar no viewport
- Números: counter-up animado (0 → valor final em 1.5s)
- Imagem: scale-up de 0.92 → 1.0 com fade-in

**CTA:** "Conheça nosso cardápio" → âncora para #cardapio

---

### Seção 3 — DESTAQUE / PROMOÇÃO DO DIA
**Finalidade:** Capturar atenção com um produto ou combo em destaque. Alta conversão.

**Conteúdo:**
- Tag "HOJE" ou "PROMOÇÃO DA SEMANA"
- Nome do produto/combo em destaque [DEMO]
- Preço [DEMO]
- Imagem grande e apetitosa [DEMO/PENDENTE]
- CTA direto: "Pedir esse agora"

**Layout:** Fullwidth, fundo escuro ou âmbar, produto centralizado. Dramático.

**Comportamento scroll:** Produto com parallax leve (move 0.3x a velocidade do scroll).

**Animações:** Produto entra com scale 0.8 → 1.0 + blur-to-sharp. Preço pisca suavemente.

**Dado configurável:** Este produto/combo é trocável pelo proprietário (config.js ou painel futuro).

---

### Seção 4 — CARDÁPIO
**Finalidade:** Apresentar todos os produtos de forma navegável, visual e filtrável.

**Sub-componentes:**
1. **Tab bar de categorias** — Pizzas | Esfihas | Combos | Bebidas | Sobremesas | Promoções
2. **Grid de produtos** — Cards com foto, nome, descrição curta, preço
3. **Produto em destaque** — Card maior, primeira posição de cada categoria

**Layout Desktop:** Grid de 3 colunas.  
**Layout Tablet:** Grid de 2 colunas.  
**Layout Mobile:** 1 coluna (lista) OU 2 colunas compactas (configurável).

**Comportamento scroll:**
- Tab bar: sticky no topo após passar o hero
- Categoria muda automaticamente conforme o scroll avança (scrollspy)
- Grid: produtos aparecem com stagger animation (delay de 80ms entre cada card)

**Filtros (P1):**
- Por categoria (tab principal)
- Busca por nome [P2]
- Filtro "Promoção" [P2]
- Filtro "Sem carne" / "Vegetariano" [P3]

**Estado de produto indisponível:**
- Card com overlay cinza + badge "Indisponível hoje"
- Não remove o produto — mantém visibilidade

**Comportamento mobile:**
- Tab bar horizontal scrollável
- Cards em lista (foto à esquerda, info à direita)
- Sticky tab bar após hero

---

### Seção 5 — INSTAGRAM
**Finalidade:** Mostrar vida real da marca. Prova social visual. CTA para seguir.

**Conteúdo:** Grid de 6–9 fotos recentes do @real_pizzas_esfirras

**Implementação:** API pública do Instagram OU imagens estáticas curadas [P2 — API] [P1 — estáticas].

**Layout:** Grid 3×2 (desktop) / 2×3 (mobile). Hover mostra likes + descrição.

**CTA:** "@real_pizzas_esfirras no Instagram → Seguir"

**Animação:** Cards entram com stagger. Hover com scale 1.02 + brilho leve.

**Aviso legal:** Usar apenas conteúdo próprio da conta da pizzaria.

---

### Seção 6 — LOCALIZAÇÃO
**Finalidade:** Mostrar onde estamos, área atendida, como chegar, como pedir retirada.

**Conteúdo:**
- Endereço completo [PENDENTE — dados reais]
- Mapa (Google Maps embed ou mapbox)
- Horário de funcionamento [PENDENTE]
- Área de entrega em destaque [PENDENTE]
- CTA: "Como chegar" → Google Maps
- CTA: "Pedir para retirada" → fluxo de pedido

**Layout:** Duas colunas — mapa (esq.) + info (dir.) em desktop. Stack em mobile.

**Animações:** Mapa aparece com fade + scale. Info com stagger vertical.

---

### Seção 7 — RODAPÉ
**Conteúdo:**
- Logo
- Links de navegação
- Horário resumido
- WhatsApp direto
- Instagram
- Endereço resumido
- Copyright

**Layout:** 3 colunas desktop / 1 coluna mobile.

---

## 9. MOTION DESIGN

### Filosofia de Motion
> "Cada animação deve ter uma razão. Se não ajuda o usuário a entender ou sentir algo, corte."

Hierarquia de animações (do mais sutil ao mais cinemático):

```
NÍVEL 1 — MICRO (< 200ms)
  Hover em botão, focus em input, toggle de accordion

NÍVEL 2 — INTERFACE (200–500ms)
  Abertura de modal, drawer, tab change, badge do carrinho

NÍVEL 3 — SEÇÃO (500–1200ms)
  Reveal de elementos ao entrar em viewport, stagger de cards

NÍVEL 4 — CINEMÁTICO (1200ms+)
  Abertura do hero (forno), transição entre estados de cor
```

### Sistema de Animações por Tipo

**ENTRADAS (Scroll-triggered)**
```
Padrão:     opacity 0→1 + translateY 30→0, duration 0.8s, ease "power3.out"
Blur:       filter blur(16px)→blur(0) + opacity 0→1, duration 1.0s
Scale:      scale 0.92→1 + opacity 0→1, duration 0.7s
Stagger:    delay 80ms entre filhos
```

**HOVER (Micro)**
```
Botão CTA:  scale 1.03, duration 0.2s, ease "power2.out"
Card:       translateY -4px + shadow aumenta, duration 0.25s
Imagem:     scale 1.02, duration 0.35s (filter dentro do container)
```

**TRANSIÇÕES DE SEÇÃO**
```
Escuro→Claro:   clip-path circle expand + background transition
Claro→Escuro:   fade-out + novo background
```

**SCROLL-DRIVEN**
```
Parallax:   elementos movem a 0.3x velocidade do scroll
Sticky:     tab bar do cardápio prende após hero
Pin:        seção de destaque fica pinada enquanto produto entra
```

### Easings Definidos
```css
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1)    /* snappy, energético */
--ease-in:    cubic-bezier(0.7, 0, 0.84, 0)     /* para saídas */
--ease-inout: cubic-bezier(0.45, 0, 0.55, 1)    /* transições equilibradas */
--ease-spring:cubic-bezier(0.34, 1.56, 0.64, 1) /* overshoot suave */
```

### Adaptações Obrigatórias
```css
@media (prefers-reduced-motion: reduce) {
  /* Todas as animações substituídas por crossfade simples (opacity) */
  /* Scroll-jacking desativado — rolagem nativa retorna */
  /* 3D simplificado ou removido */
}
```

**Dispositivos fracos (JS detection):**
```javascript
const isLowPerf = navigator.hardwareConcurrency <= 2 
                 || /Android [4-7]/.test(navigator.userAgent);
if (isLowPerf) {
  // Desativar partículas, reduzir 3D, simplificar animações
}
```

---

## 10. 3D

### Filosofia 3D
> "3D existe para fazer você querer comer. Não para impressionar tecnicamente."

Cada elemento 3D tem uma justificativa de negócio.

### Elemento 3D Principal — PIZZA DO HERO

**Por que usar:** A pizza é o produto. Vê-la em 3D girando lentamente com iluminação quente ativa apetite de forma que uma foto plana não consegue. É a diferenciação visual central.

**Onde usar:** Revelada na abertura do círculo do hero (estado claro).

**Como usar:**
- Modelo GLTF/GLB de uma pizza (geometria: disco + ingredientes 3D ou heightmap)
- Material: textura PBR com albedo de pizza (queijo dourado, molho vermelho, ingredientes)
- Iluminação: `THREE.PointLight` âmbar acima + `THREE.AmbientLight` quente
- Animação: rotação lenta no eixo Y (0.4 rpm) + leve balanço no eixo X (parallax com mouse/toque)
- Posição: centralizada, escala ~60% da tela no desktop

**Performance:**
- Polígonos: < 15.000 (suficiente para visual de qualidade sem overhead)
- Textura: 1024×1024 WebP (não 4K)
- Renderer: `antialias: false` em mobile, `true` em desktop
- Target FPS: 60 desktop, 30 mobile (com `ticker.lagSmoothing`)

**Alternativa leve (fallback):**
- Imagem WebP otimizada da pizza com `object-fit: cover`
- CSS `transform: rotate()` animado para simular leve rotação
- Ativado quando `isLowPerf === true` ou WebGL não disponível

---

### Elemento 3D Secundário — INGREDIENTES FLUTUANTES

**Por que usar:** Na seção de história ou na transição para o cardápio, ingredientes (tomate, queijo, azeitona, pimentão) flutuam suavemente. Cria a sensação de frescor e artesanalidade.

**Onde usar:** Background da seção "Nossa História" ou transição hero→cardápio.

**Como usar:**
- 8–12 meshes simples (SphereGeometry, TorusGeometry para rodelas)
- Texturas simples (2D sprite ou geometria colorida sem textura complexa)
- Movimento: Noise-based float (sin/cos com offsets únicos por objeto)
- Interação com scroll: `position.y` se move levemente com scroll

**Performance:**
- Baixo custo: geometrias simples, sem sombras
- Mobile: reduzir para 4 objetos ou substituir por CSS 3D transform (`rotateX/Y`)

---

### Elemento 3D Opcional — MAPA DE ENTREGA

**Por que usar:** Na seção de localização, um globo estilizado ou plano 2.5D com a região de Cariacica destacada diferenciaria do mapa convencional.

**Decisão:** P3 — avaliar após aprovação do plano principal. Alternativa: Google Maps embed estilizado.

---

### Configuração da Cena Three.js

```javascript
// Cena unificada — um único renderer para todo o site
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl-canvas'),
  antialias: window.devicePixelRatio < 2, // antialias só se não for retina
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Iluminação para pizza
const ambientLight = new THREE.AmbientLight(0xfff0d0, 0.6); // quente
const keyLight = new THREE.PointLight(0xffb347, 3.0, 8);    // âmbar forte
keyLight.position.set(0, 3, 2);
const fillLight = new THREE.PointLight(0xff6b35, 1.0, 6);   // laranja fill
fillLight.position.set(-2, -1, 1);
```

---

## 11. CARDÁPIO

### Estrutura de Categorias [DEMO — confirmar com proprietário]
```
PIZZAS
  ├── Tradicionais
  ├── Especiais
  └── Doces

ESFIHAS
  ├── Abertas
  └── Fechadas

COMBOS
BEBIDAS
SOBREMESAS
PROMOÇÕES
```

### Cards de Produto
**Informações visíveis no card:**
- Foto (WebP, 400×300px mínimo)
- Nome do produto
- Descrição curta (1 linha, max 60 chars)
- Menor preço (ex: "A partir de R$ 29,90")
- Badge: "PROMOÇÃO" / "NOVO" / "MAIS PEDIDO"
- Disponibilidade

**Ao clicar:** Abre modal de configuração

### Navegação do Cardápio

**Desktop:** Tab bar horizontal no topo. Ao clicar em categoria, scroll suave para a seção. Ao rolar, tab ativa muda automaticamente (scrollspy).

**Mobile:** 
- Tabs horizontais scrolláveis (chip style)
- Produtos em lista (foto à esquerda 80px, info à direita)
- Tap em produto → bottom sheet fullscreen

### Sistema de Busca [P2]
```
Input de busca (sticky no mobile)
→ Filtra produtos por nome, ingrediente
→ Resultado em tempo real (debounce 300ms)
→ Zero resultados: mensagem + sugestões
```

---

## 12. CONFIGURADOR DE PRODUTO

### Fluxo de Configuração de Pizza

```
PASSO 1: TAMANHO
  ○ Pequena (6 fatias · até 2 pessoas) — R$ XX [DEMO]
  ● Média (8 fatias · 2–3 pessoas) — R$ XX [DEMO]
  ○ Grande (10 fatias · 3–4 pessoas) — R$ XX [DEMO]
  ○ Família (12 fatias · 4–6 pessoas) — R$ XX [DEMO]

PASSO 2: SABOR(ES) [dependendo do tamanho]
  Buscar sabor...
  [grid de sabores com foto]
  • 1 sabor: selecionar 1
  • 2 sabores (metade/metade): selecionar 2
  [DEMO: Mussarela, Calabresa, Frango, Portuguesa, etc.]

PASSO 3: BORDA [se a pizzaria oferece]
  ○ Sem borda
  ○ Catupiry (+R$ X) [DEMO]
  ○ Cheddar (+R$ X) [DEMO]
  ○ Chocolate (+R$ X) [pizza doce] [DEMO]

PASSO 4: ADICIONAIS [se houver]
  ☐ Bacon extra (+R$ X) [DEMO]
  ☐ Queijo extra (+R$ X) [DEMO]
  ☐ Cebola caramelizada (+R$ X) [DEMO]

PASSO 5: OBSERVAÇÃO
  [textarea] "Ex: sem cebola, borda bem assada..."

RODAPÉ DO MODAL:
  Quantidade: [−] 1 [+]
  TOTAL: R$ XX,XX
  [Adicionar ao Pedido →]
```

### Visualização em Tempo Real
- Ao selecionar sabores, a imagem da pizza muda para mostrar os ingredientes
- Se 2 sabores: imagem split verticalmente (metade/metade)
- Preço total atualiza instantaneamente

### Regras de Negócio [DEMO — confirmar com proprietário]
- Sabores por pizza: depende do tamanho (geralmente qualquer tamanho pode ter 2 sabores)
- Preço de 2 sabores: preço do mais caro OU média dos dois [A CONFIRMAR]
- Bordas: disponíveis apenas em determinados tamanhos? [A CONFIRMAR]

---

## 13. CARRINHO

### Estados do Carrinho

**VAZIO:**
```
🍕 Seu carrinho está vazio
Explore nosso cardápio e faça seu pedido!
[Ver Cardápio]
```

**COM ITENS:**
```
✓ Pedido (3 itens)
─────────────────────────
1x Pizza Grande Calabresa           R$ 45,00
   Borda Catupiry (+R$ 5)
   + Bacon extra (+R$ 3)
   [Editar] [Remover]

2x Refrigerante 2L                  R$ 19,98
   [+] [2] [−]

─────────────────────────
Subtotal:                           R$ 72,98
Entrega:                            R$ X,XX [DEMO]
─────────────────────────
TOTAL:                             R$ XX,XX
─────────────────────────
[Finalizar Pedido →]
```

### Comportamento Desktop
- Drawer lateral (direita), largura 380px
- Abre ao clicar no ícone do carrinho
- Persiste aberto enquanto usuário navega pelo cardápio
- Badge no ícone: número de itens

### Comportamento Mobile
- Bottom sheet (desliza de baixo para cima)
- Peek: barra inferior sempre visível com total e botão "Ver pedido"
- Fullscreen ao expandir
- Gesto de swipe para fechar

### Ações em Cada Item
- `+` / `−`: Aumentar/diminuir quantidade (mínimo 1)
- `Remover`: Remove o item (com confirmação via micro-animation)
- `Editar`: Reabre o configurador com as opções salvas
- `Duplicar`: [P2] Adiciona cópia idêntica do item

### Persistência
- Carrinho salvo em `localStorage`
- Persiste após fechar e reabrir o navegador
- Expira após 24h (ou ao concluir pedido)

---

## 14. CHECKOUT

### Princípio: Mínimo Indispensável

O checkout deve ter o menor número possível de campos. O usuário já está comprometido — não criar atrito.

### Campos do Formulário

**Tipo de Pedido (obrigatório):**
```
[Entrega em casa] [Retirada no local]
```

**Se Entrega:**
```
Nome *
Rua / Av. *
Número *
Complemento (opcional)
Bairro *
Referência (opcional)
```

**Se Retirada:**
```
Nome *
(mostrar endereço da pizzaria + horário)
```

**Observação geral (opcional):**
```
Alguma observação para o pedido?
```

**Forma de Pagamento (informativa, não processa):**
```
Como vai pagar?
○ Dinheiro  ○ Cartão na entrega  ○ PIX  ○ Online
[Se dinheiro: troco para R$___?]
```

> ℹ️ O site não processa pagamento. Apenas informa a forma de pagamento na mensagem do WhatsApp.

### Validação
- Campos obrigatórios validados antes de habilitar "Pedir"
- Feedback imediato (border vermelha + mensagem) ao tentar avançar com campo vazio
- CEP lookup automático [P2] para preencher rua/bairro

### Resumo Final
Antes do botão "Pedir pelo WhatsApp", mostrar resumo completo:
```
RESUMO DO PEDIDO
Itens + preços
Entrega: [tipo + endereço]
Pagamento: [forma]
Total: R$ XX,XX

[✅ Confirmar e Pedir pelo WhatsApp]
```

---

## 15. WHATSAPP

### Fluxo Técnico

```javascript
function gerarMensagemWhatsApp(pedido: Order): string {
  const { items, customer, cart } = pedido;
  
  let msg = `🍕 *NOVO PEDIDO — REAL PIZZAS & ESFIRRAS*\n\n`;
  
  // Itens
  msg += `*ITENS:*\n`;
  items.forEach((item, i) => {
    msg += `${item.quantity}x ${item.product.name}`;
    if (item.size) msg += ` (${item.size.label})`;
    msg += `\n`;
    if (item.flavors.length > 0) {
      msg += `   Sabor: ${item.flavors.map(f => f.name).join(' + ')}\n`;
    }
    if (item.edge && item.edge.id !== 'sem-borda') {
      msg += `   Borda: ${item.edge.name}\n`;
    }
    if (item.extras.length > 0) {
      msg += `   Adicionais: ${item.extras.map(e => e.name).join(', ')}\n`;
    }
    if (item.observation) {
      msg += `   Obs: ${item.observation}\n`;
    }
    msg += `   Subtotal: R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n\n`;
  });
  
  // Entrega
  msg += `\n*ENTREGA:*\n`;
  if (customer.deliveryType === 'delivery') {
    msg += `🏠 Entrega em domicílio\n`;
    msg += `${customer.address.street}, ${customer.address.number}\n`;
    if (customer.address.complement) msg += `${customer.address.complement}\n`;
    msg += `${customer.address.neighborhood} — Cariacica/ES\n`;
    if (customer.address.reference) msg += `Ref: ${customer.address.reference}\n`;
  } else {
    msg += `🏪 Retirada no local\n`;
  }
  
  // Pagamento
  msg += `\n*PAGAMENTO:*\n${customer.paymentMethod}\n`;
  if (customer.change) msg += `Troco para: R$ ${customer.change}\n`;
  
  // Totais
  msg += `\n*VALORES:*\n`;
  msg += `Subtotal: R$ ${cart.subtotal.toFixed(2).replace('.', ',')}\n`;
  if (customer.deliveryType === 'delivery') {
    msg += `Entrega: R$ ${cart.deliveryFee.toFixed(2).replace('.', ',')}\n`;
  }
  msg += `*TOTAL: R$ ${cart.total.toFixed(2).replace('.', ',')}*\n`;
  
  // Nome
  msg += `\n*Cliente:* ${customer.name}`;
  
  return msg;
}

function abrirWhatsApp(numero: string, mensagem: string): void {
  const encoded = encodeURIComponent(mensagem);
  const url = `https://wa.me/${numero}?text=${encoded}`;
  window.open(url, '_blank');
}
```

### Número do WhatsApp
**[PENDENTE — número real da pizzaria não confirmado no relatório de pesquisa]**

Configurar em: `src/config/store.ts`
```typescript
export const STORE_CONFIG = {
  whatsappNumber: 'PENDENTE', // formato: 5527XXXXXXXXX
  // ...
};
```

### Exemplo de Mensagem Gerada [DEMO]
```
🍕 *NOVO PEDIDO — REAL PIZZAS & ESFIRRAS*

*ITENS:*
1x Pizza Grande (Grande · 10 fatias)
   Sabor: Calabresa + Mussarela
   Borda: Catupiry
   Adicionais: Bacon extra
   Subtotal: R$ 53,00

1x Refrigerante Coca-Cola 2L
   Subtotal: R$ 10,00

*ENTREGA:*
🏠 Entrega em domicílio
Rua das Palmeiras, 347
Bloco B, Apto 102
Flexal II — Cariacica/ES
Ref: Próximo à padaria

*PAGAMENTO:*
Cartão na entrega

*VALORES:*
Subtotal: R$ 63,00
Entrega: R$ 8,00
*TOTAL: R$ 71,00*

*Cliente:* João Silva
```

### Tratamento de Caracteres Especiais
- `encodeURIComponent()` nativo do browser
- Quebras de linha: `\n` → `%0A` (automático via encoding)
- Emojis: suportados nativamente (UTF-8)
- Asteriscos para negrito: `*texto*` (formatação WhatsApp)

---

## 16. PROMOÇÕES E OFERTAS

### 16.1 Tipos de Promoção Suportados

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| Desconto fixo | R$ X off no pedido | R$ 10 off acima de R$ 60 |
| Desconto percentual | X% off em categoria ou item | 20% off nas pizzas doces |
| Brinde | Item gratuito adicionado ao pedido | Borda recheada grátis |
| Combo | N itens por preço fixo | 2 pizzas médias por R$ 69 |
| Fidelidade | Após N pedidos, desconto automático | 10º pedido = 15% off |
| Horário | Promoção válida só em certo período | Happy Hour seg-sex 18-20h |

### 16.2 Interface das Promoções

**Banner Rotativo (acima do hero ou seção própria):**
- Carrossel com 1–3 banners de destaque
- Auto-play 5s, pausa on hover
- Deep-link direto para configurador com produto pré-selecionado
- CTA: "Aproveitar agora →"

**Badge nas Cards do Cardápio:**
- Badge vermelho `%OFF` ou `🔥 Promoção` no canto superior da card
- Preço original riscado + preço promocional em destaque
- Tooltip ao hover: "Promoção válida até domingo"

**Seção Dedicada "Promoções da Semana":**
- Grid de 2–3 cards especiais
- Countdown timer em casos de promoção com prazo (ex: Happy Hour)
- Animação de entrada: cards deslizam de baixo ao entrar no viewport

### 16.3 Código de Desconto (Coupon)
- Campo de cupom no step de checkout (não obrigatório, collapsible)
- Validação client-side via mapeamento JSON de cupons ativos
- Desconto aplicado e exibido no resumo do pedido antes de enviar para WhatsApp
- Mensagem WhatsApp inclui cupom usado: `Cupom: PIZZA10 (-R$ 10,00)`

### 16.4 Modelo de Dados

```typescript
interface Promocao {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'desconto_fixo' | 'desconto_pct' | 'brinde' | 'combo' | 'horario';
  valor: number;                    // R$ ou %
  condicoes?: {
    valorMinimo?: number;
    categoriaIds?: string[];
    produtoIds?: string[];
    horarioInicio?: string;         // "18:00"
    horarioFim?: string;            // "20:00"
    diasSemana?: number[];          // [1,2,3,4,5]
  };
  cupom?: string;                   // código do cupom
  ativa: boolean;
  imagemUrl?: string;
  dataExpiracao?: string;
}
```

---

## 17. INTEGRAÇÃO INSTAGRAM / REDES SOCIAIS

### 17.1 Seção "Nossas Fotos"

**Visual:**
- Grid masonry 3 colunas desktop / 2 colunas mobile
- Últimas 9–12 publicações (estáticas ou via oEmbed se disponível)
- Hover: leve scale (1.05) + ícone do Instagram + curtidas/comentários
- CTA abaixo: "@realpizzas no Instagram →"

**Implementação sem API:**
- Imagens hospedadas localmente (atualização manual ou por build hook)
- JSON estático de posts: `{ url, legenda, link, curtidas }`
- Nenhuma dependência de API externa na produção

**Implementação alternativa (futuro):**
- Instagram Basic Display API (deprecated) → substituir por solução de terceiros tipo Curator.io ou Elfsight se necessário
- Para MVP: fotos estáticas são suficientes e mais confiáveis

### 17.2 Compartilhamento Social
- Cada produto tem botão "Compartilhar" → Web Share API (iOS/Android) com fallback para copiar link
- URL canônica do produto: `realpizzas.com.br/cardapio/portuguesa` (com meta tags OpenGraph)
- OG image: foto do produto 1200×630

### 17.3 WhatsApp Share
- Botão "Indicar para amigo" no modal de produto
- Abre WhatsApp com mensagem: "Experiei a [Produto] da Real Pizzas e é incrível! Veja: [link]"

---

## 18. LOCALIZAÇÃO E INFORMAÇÕES DA LOJA

### 18.1 Seção "Onde Estamos"

**Layout:**
- Mapa estático (Google Maps Static API ou screenshot pré-renderizado)
- Endereço completo com formatação card
- Bairro/cidade em destaque (Cariacica, ES)
- Botão "Abrir no Google Maps" → deep link `https://maps.google.com/?q=...`
- Botão "Rota pelo Waze" → `https://waze.com/ul?q=...`

**Mapa Alternativo (sem API key):**
- Embed iframe do Google Maps (gratuito, sem chave)
- `<iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy">`
- Responsivo: aspect-ratio 16/9 no desktop, 4/3 no mobile

### 18.2 Informações Operacionais

```
Real Pizzas & Esfirras
Endereço: [A confirmar com proprietário]
Bairro: [A confirmar] — Cariacica, ES

Horários de Funcionamento:
Segunda a Quinta: 18h às 23h
Sexta e Sábado: 18h às 00h
Domingo: 17h às 23h

Telefone/WhatsApp: [A confirmar]
```

**Widget de Status em Tempo Real (client-side):**
```typescript
function verificarAberto(): { aberto: boolean; mensagem: string } {
  const agora = new Date();
  const dia = agora.getDay(); // 0=Dom, 1=Seg...
  const hora = agora.getHours() * 60 + agora.getMinutes();
  
  const horarios = {
    1: { abre: 18*60, fecha: 23*60 }, // Seg
    2: { abre: 18*60, fecha: 23*60 }, // Ter
    3: { abre: 18*60, fecha: 23*60 }, // Qua
    4: { abre: 18*60, fecha: 23*60 }, // Qui
    5: { abre: 18*60, fecha: 24*60 }, // Sex
    6: { abre: 18*60, fecha: 24*60 }, // Sáb
    0: { abre: 17*60, fecha: 23*60 }, // Dom
  };
  
  const hoje = horarios[dia as keyof typeof horarios];
  if (!hoje) return { aberto: false, mensagem: 'Fechado hoje' };
  
  const aberto = hora >= hoje.abre && hora < hoje.fecha;
  if (aberto) {
    const fechaEm = Math.round((hoje.fecha - hora) / 60);
    return { aberto: true, mensagem: `Aberto · fecha em ${fechaEm}h` };
  }
  const abreEm = hoje.abre - hora;
  if (abreEm > 0) return { aberto: false, mensagem: `Abre às ${hoje.abre/60}h` };
  return { aberto: false, mensagem: 'Fechado — reabre amanhã' };
}
```

**Indicador visual:**
- Ponto verde pulsante + "Aberto agora" quando em funcionamento
- Ponto cinza + "Fechado · abre às 18h" fora do horário
- Atualiza a cada minuto via `setInterval`

### 18.3 Área de Entrega
- Raio de entrega: [A confirmar com proprietário]
- Taxa de entrega: [A confirmar]
- Tempo estimado: [A confirmar]
- Mapa visual do raio de entrega (círculo no mapa estático) — opcional

---

## 19. DESIGN SYSTEM COMPLETO

### 19.1 Paleta de Cores (Tokens)

```css
:root {
  /* === BRAND CORES PRIMÁRIAS === */
  --color-brasa: #C0392B;          /* vermelho fogo — ação principal */
  --color-brasa-dark: #96281B;     /* hover/pressed */
  --color-brasa-light: #E74C3C;    /* destaque, badges */
  --color-brasa-glow: rgba(192,57,43,0.15); /* glow effects */

  /* === NEUTROS QUENTES === */
  --color-carvao: #1A1208;         /* background dark mode */
  --color-fumo: #2C2016;           /* superfícies dark elevadas */
  --color-cinza-quente: #4A3F35;   /* texto secundário dark */
  --color-bege: #F5EDD7;           /* background light mode */
  --color-bege-claro: #FEFAF4;     /* superfícies light elevadas */
  --color-bege-escuro: #E8DCC4;    /* bordas, separadores light */

  /* === DOURADO (acentos premium) === */
  --color-ouro: #D4AF37;           /* estrelas, premium badge */
  --color-ouro-light: #F0D060;     /* hover no dourado */

  /* === TEXTO === */
  --color-text-primary: #1A1208;   /* body light mode */
  --color-text-secondary: #6B5B4E; /* meta, captions light */
  --color-text-inverse: #F5EDD7;   /* texto em dark */
  --color-text-muted: #9C8878;     /* placeholder, disabled */

  /* === SEMÂNTICO === */
  --color-success: #27AE60;
  --color-warning: #F39C12;
  --color-error: #C0392B;          /* mesmo que brasa — intencional */
  --color-info: #2980B9;

  /* === SUPERFÍCIES (modo claro por padrão) === */
  --surface-bg: var(--color-bege-claro);
  --surface-elevated: #FFFFFF;
  --surface-border: var(--color-bege-escuro);
  --surface-overlay: rgba(26,18,8,0.6);
}

/* === DARK MODE === */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --surface-bg: var(--color-carvao);
    --surface-elevated: var(--color-fumo);
    --surface-border: rgba(255,255,255,0.08);
    --surface-overlay: rgba(0,0,0,0.75);
    --color-text-primary: var(--color-bege);
    --color-text-secondary: var(--color-cinza-quente);
  }
}

:root[data-theme="dark"] {
  --surface-bg: var(--color-carvao);
  --surface-elevated: var(--color-fumo);
  --surface-border: rgba(255,255,255,0.08);
  --surface-overlay: rgba(0,0,0,0.75);
  --color-text-primary: var(--color-bege);
  --color-text-secondary: var(--color-cinza-quente);
}
```

### 19.2 Tipografia

```css
/* === FAMÍLIAS === */
/* Display: Playfair Display — elegância italiana, serifa alto contraste */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* === ESCALA TIPOGRÁFICA (Major Third 1.25) === */
  --text-xs:   0.64rem;   /* 10.24px — labels, badges */
  --text-sm:   0.8rem;    /* 12.8px  — captions, meta */
  --text-base: 1rem;      /* 16px    — corpo principal */
  --text-md:   1.25rem;   /* 20px    — subtítulos, lead */
  --text-lg:   1.563rem;  /* 25px    — h3 */
  --text-xl:   1.953rem;  /* 31.25px — h2 seções */
  --text-2xl:  2.441rem;  /* 39px    — h1 páginas */
  --text-3xl:  3.052rem;  /* 49px    — hero sections */
  --text-4xl:  4rem;      /* 64px    — hero principal */
  --text-hero: clamp(3.5rem, 8vw, 6rem); /* hero adaptativo */

  /* === ALTURAS DE LINHA === */
  --leading-tight:  1.15;
  --leading-snug:   1.35;
  --leading-normal: 1.6;
  --leading-loose:  1.8;

  /* === ESPAÇAMENTO ENTRE LETRAS === */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-wider:   0.1em;
  --tracking-widest:  0.2em; /* labels uppercase */
}
```

### 19.3 Espaçamento (8px Grid)

```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px — base unit */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Gutter padrão */
  --gutter: var(--space-6);       /* 24px desktop */
  --gutter-mobile: var(--space-4); /* 16px mobile */
  --section-gap: var(--space-24); /* 96px entre seções */
}
```

### 19.4 Bordas e Sombras

```css
:root {
  /* === RADIUS === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* === SOMBRAS === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.1);

  /* Sombra de elevação dark mode */
  --shadow-dark-sm: 0 1px 3px rgba(0,0,0,0.4);
  --shadow-dark-md: 0 4px 12px rgba(0,0,0,0.5);
  --shadow-dark-lg: 0 8px 32px rgba(0,0,0,0.6);

  /* Sombra colorida (brasa) */
  --shadow-brasa: 0 8px 32px rgba(192,57,43,0.3);
}
```

### 19.5 Componentes de Interface

**Botões:**
```css
/* Primário (ação principal — pedir, adicionar) */
.btn-primary {
  background: var(--color-brasa);
  color: white;
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  font-weight: 600;
  font-size: var(--text-base);
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: var(--shadow-brasa);
}
.btn-primary:hover {
  background: var(--color-brasa-dark);
  transform: translateY(-1px);
  box-shadow: 0 12px 40px rgba(192,57,43,0.4);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Secundário (outline) */
.btn-secondary {
  background: transparent;
  border: 1.5px solid var(--color-brasa);
  color: var(--color-brasa);
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
}

/* Ghost (ações terciárias) */
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-4);
}
```

**Cards de Produto:**
```css
.card-produto {
  background: var(--surface-elevated);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
}
.card-produto:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-brasa-glow);
}
```

**Inputs:**
```css
.input {
  background: var(--surface-elevated);
  border: 1.5px solid var(--surface-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  font-size: var(--text-base);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input:focus {
  outline: none;
  border-color: var(--color-brasa);
  box-shadow: 0 0 0 3px var(--color-brasa-glow);
}
.input::placeholder { color: var(--color-text-muted); }
```

**Modais:**
```css
.modal-backdrop {
  position: fixed; inset: 0;
  background: var(--surface-overlay);
  backdrop-filter: blur(4px);
  z-index: 100;
}
.modal {
  background: var(--surface-elevated);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0; /* mobile: bottom sheet */
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-6);
}
@media (min-width: 768px) {
  .modal {
    border-radius: var(--radius-2xl);
    max-width: 520px;
    margin: auto;
  }
}
```

### 19.6 Iconografia
- Biblioteca: Lucide React (MIT, tree-shakeable, 1.5px stroke uniforme)
- Tamanhos: 16px (inline), 20px (botões), 24px (navegação), 32px (features)
- Nunca escalar SVGs com CSS scale — usar size prop
- Ícones customizados (chama, forno, pizza) como SVG components inline

### 19.7 Imagens e Mídia
- Formato: WebP primário, JPEG fallback via `<picture>`
- Lazy loading: `loading="lazy"` nativo + IntersectionObserver para animações
- Aspect ratios fixos para evitar CLS: `aspect-ratio: 4/3` nos containers
- Placeholder: blur hash SVG inline (gera via `sqip` no build)
- Fotografia: fundo escuro + iluminação cálida + textura rústica (madeira, pedra)

---

## 20. RESPONSIVIDADE

### 20.1 Breakpoints

```typescript
// tailwind.config.ts
screens: {
  'xs':  '375px',   // iPhone SE
  'sm':  '480px',   // telefones grandes
  'md':  '768px',   // tablets portrait
  'lg':  '1024px',  // tablets landscape / laptops
  'xl':  '1280px',  // desktop padrão
  '2xl': '1440px',  // desktop grande
  '3xl': '1920px',  // fullHD / ultrawide
}
```

### 20.2 Adaptações por Breakpoint

| Componente | Mobile (≤480px) | Tablet (481-1023px) | Desktop (≥1024px) |
|---|---|---|---|
| Nav | Hamburger (bottom sheet) | Hamburger ou inline | Horizontal completo |
| Hero | Texto full-width, 3D reduzido | 60/40 split | Full cinematic |
| Cardápio | 1 coluna, grid compacto | 2 colunas | 3-4 colunas |
| Carrinho | Bottom sheet 100vw | Side drawer 380px | Side drawer 420px |
| Configurador | Fullscreen modal | Modal centrado | Modal centrado |
| Checkout | Fullscreen flow | Centrado 480px | Centrado 480px |
| Modal Produto | Fullscreen | 90vw max 600px | 600px max-width |
| Mapa | Aspect 4/3 | Aspect 16/9 | Aspect 16/9 com info lateral |

### 20.3 Estratégia Mobile-First
- Estilos base = mobile
- Breakpoints adicionam complexidade progressivamente
- 3D pizza: desativado em `navigator.hardwareConcurrency <= 4` + `window.innerWidth < 768`
- Animações GSAP: reduzidas em mobile (duração ×0.7, parallax desativado)
- Touch: swipe gestures no cardápio (carousel) via touch events nativos ou Swiper.js

### 20.4 Tipografia Fluida
```css
/* Escala fluida para headings principais */
.hero-title {
  font-size: clamp(2.5rem, 6vw + 1rem, 6rem);
  line-height: var(--leading-tight);
}
.section-title {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 3rem);
}
```

---

## 21. PERFORMANCE

### 21.1 Metas
| Métrica | Target | Crítico |
|---|---|---|
| LCP | < 2.5s | < 4s |
| FID / INP | < 100ms | < 200ms |
| CLS | < 0.1 | < 0.25 |
| FCP | < 1.5s | < 3s |
| TTI | < 3.5s | < 5s |
| Bundle JS (inicial) | < 150KB gzip | < 300KB |
| Above-fold total | < 200KB | < 500KB |

### 21.2 Estratégias de Otimização

**Imagens:**
```html
<picture>
  <source srcset="pizza.avif" type="image/avif">
  <source srcset="pizza.webp" type="image/webp">
  <img src="pizza.jpg" alt="Pizza Portuguesa" loading="lazy" decoding="async"
       width="400" height="300">
</picture>
```

**Critical CSS:**
- Inline o CSS above-fold (< 14KB) no `<head>`
- Demais estilos carregados via `link rel="preload"`

**JavaScript:**
```typescript
// Code splitting automático por rota (Next.js App Router)
// Dynamic imports para componentes pesados
const Configurador = dynamic(() => import('./Configurador'), {
  loading: () => <ConfiguradorSkeleton />,
  ssr: false // 3D nunca no server
});
const PizzaModel3D = dynamic(() => import('./PizzaModel3D'), {
  ssr: false,
  loading: () => <PizzaPlaceholder />
});
```

**Preload estratégico:**
```html
<!-- No <head> -->
<link rel="preload" href="/fonts/playfair.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-pizza.webp" as="image">
<link rel="prefetch" href="/api/cardapio.json">
```

**Cardápio:**
- JSON estático gerado no build (não fetch em runtime)
- Servido via CDN com cache-control: max-age=3600
- Rehidratado no client sem re-fetch se não houver stale

**Three.js:**
- Lazy loaded somente quando IntersectionObserver dispara
- Fallback: imagem PNG estática enquanto carrega
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` para limitar em telas de alta densidade

**Service Worker (fase futura):**
- Cache do cardápio e assets estáticos
- Estratégia: StaleWhileRevalidate para assets, NetworkFirst para dados

### 21.3 Build Pipeline

```
Next.js build
├── Static generation: Landing + Cardápio
├── Image optimization: next/image (WebP/AVIF automático)
├── Bundle analysis: @next/bundle-analyzer
├── Tree shaking: automático via webpack
└── Deploy: Vercel (Edge CDN global)
```

---

## 22. ACESSIBILIDADE

### 22.1 Conformidade Alvo
- WCAG 2.1 Nível AA
- ARIA 1.2 para componentes customizados

### 22.2 Contraste de Cores
| Combinação | Ratio | Aprovação |
|---|---|---|
| Brasa (#C0392B) sobre bege (#FEFAF4) | 5.2:1 | ✅ AA |
| Texto escuro (#1A1208) sobre bege | 18.2:1 | ✅ AAA |
| Texto claro (#F5EDD7) sobre carvão (#1A1208) | 15.8:1 | ✅ AAA |
| Texto muted (#9C8878) sobre bege | 4.6:1 | ✅ AA |
| Ouro (#D4AF37) sobre carvão | 6.1:1 | ✅ AA |

### 22.3 Navegação por Teclado
- Skip link: "Ir para o conteúdo principal" (primeiro elemento focável)
- Trap de foco em modais, drawers e bottom sheets
- Ordem de tab lógica: nav → hero → seções → footer
- Escape fecha modais e drawers
- Enter/Space ativa botões e seletores customizados

### 22.4 ARIA
```html
<!-- Carrinho -->
<button aria-label="Carrinho de pedidos (3 itens)" aria-haspopup="dialog">
  <CartIcon /> <span aria-hidden="true">3</span>
</button>

<!-- Configurador de tamanho -->
<div role="radiogroup" aria-labelledby="size-label">
  <span id="size-label">Tamanho da pizza</span>
  <button role="radio" aria-checked="true">Média</button>
  <button role="radio" aria-checked="false">Grande</button>
</div>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Portuguesa</h2>
</div>

<!-- Carousel/Slider -->
<div role="region" aria-label="Promoções em destaque">
  <div aria-live="polite" aria-atomic="true">Slide 1 de 3</div>
</div>
```

### 22.5 Motion Reduzido
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .parallax { transform: none !important; }
  .scroll-driven { opacity: 1 !important; transform: none !important; }
}
```

JavaScript:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  // Inicializar GSAP ScrollTrigger, Three.js animations
}
```

### 22.6 Touch Targets
- Mínimo 44×44px para todos os elementos interativos (Apple HIG / WCAG 2.5.5)
- Botões de incremento/decremento do carrinho: 48×48px com padding
- Cards: área de clique = card inteiro (não só o botão)

### 22.7 Imagens Alternativas
- Todas as imagens de produto: `alt="Pizza Portuguesa — molho de tomate, presunto, ovos, azeitona"`
- Imagens decorativas: `alt=""` (aria-hidden via next/image)
- Ícones com texto: `aria-hidden="true"` no SVG

---

## 23. SEO E DADOS ESTRUTURADOS

### 23.1 Metadados por Página

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://realpizzas.com.br'),
  title: { default: 'Real Pizzas & Esfirras', template: '%s | Real Pizzas' },
  description: 'As melhores pizzas e esfirras de Cariacica, ES. Peça pelo WhatsApp ou monte seu pedido online.',
  keywords: ['pizza Cariacica', 'pizzaria ES', 'esfirra Cariacica', 'pizza delivery Cariacica'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Real Pizzas & Esfirras',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

### 23.2 Schema.org (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Real Pizzas & Esfirras",
  "image": "https://realpizzas.com.br/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Endereço]",
    "addressLocality": "Cariacica",
    "addressRegion": "ES",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[lon]"
  },
  "url": "https://realpizzas.com.br",
  "telephone": "[número]",
  "servesCuisine": "Pizza, Esfirra, Árabe",
  "menu": "https://realpizzas.com.br/cardapio",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"],
      "opens": "18:00", "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Friday","Saturday"],
      "opens": "18:00", "closes": "00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "17:00", "closes": "23:00"
    }
  ],
  "priceRange": "$$",
  "hasMenu": {
    "@type": "Menu",
    "hasMenuSection": [
      { "@type": "MenuSection", "name": "Pizzas Tradicionais" },
      { "@type": "MenuSection", "name": "Pizzas Especiais" },
      { "@type": "MenuSection", "name": "Esfirras" }
    ]
  }
}
```

### 23.3 SEO Local
- Google Business Profile: [pendente criação/atualização com proprietário]
- Citações locais: Apontamento nome/endereço/telefone consistente
- Reviews: Schema AggregateRating quando houver avaliações
- Página de áreas atendidas: `/entrega` com bairros listados (texto + mapa)

### 23.4 Performance como Fator SEO
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 100ms
- Sitemap: `/sitemap.xml` gerado automaticamente pelo Next.js
- Robots.txt: permitir rastreamento de todas páginas públicas
- Canonical URLs em todas as páginas

---

## 24. ARQUITETURA TÉCNICA DETALHADA

### 24.1 Stack Final

```
Frontend:
├── Next.js 14 (App Router)         — SSG + ISR para cardápio, SSR para SEO
├── TypeScript 5.x                  — type safety completa
├── React 18                        — Concurrent Mode, Suspense
├── Tailwind CSS 3.x                — utilitários + CSS custom properties
├── GSAP 3.x + ScrollTrigger        — animações cinematográficas
├── Lenis 1.x                       — smooth scroll
├── Three.js r160+                  — pizza 3D no hero
├── Zustand 4.x                     — estado global (carrinho)
└── Lucide React                    — ícones

Deploy:
├── Vercel                          — hosting, CDN, Edge Functions
├── Domain: realpizzas.com.br       — [a adquirir/configurar]
└── Analytics: Vercel Analytics     — sem cookies, LGPD-friendly

Dados:
├── cardapio.json                   — estático no repositório (SSG)
├── promocoes.json                  — estático no repositório (ISR 1h)
└── localStorage                    — carrinho no cliente

Qualidade:
├── ESLint + Prettier               — formatação e linting
├── TypeScript strict: true         — sem any implícito
├── Lighthouse CI                   — CWV em cada PR
└── Jest + Testing Library          — testes unitários (fase 2)
```

### 24.2 Estrutura de Pastas

```
real-pizzas/
├── app/
│   ├── layout.tsx                  # Root layout + metadata
│   ├── page.tsx                    # Landing page (SSG)
│   ├── cardapio/
│   │   └── page.tsx                # Página do cardápio
│   └── globals.css                 # CSS tokens + resets
├── components/
│   ├── ui/                         # Primitivos (Button, Input, Modal, Badge)
│   ├── layout/                     # Nav, Footer, PageWrapper
│   ├── home/                       # Hero, Sections, Sobre, Localizacao
│   ├── cardapio/                   # CardProduto, CategoriaNav, BuscaCardapio
│   ├── configurador/               # ConfiguradorModal, StepTamanho, etc.
│   ├── carrinho/                   # CarrinhoDrawer, ItemCarrinho, ResumoPrecos
│   ├── checkout/                   # CheckoutForm, EntregaSelector
│   └── 3d/                         # PizzaScene, PizzaMesh, IngredientParticles
├── lib/
│   ├── store/                      # Zustand stores (carrinho, ui)
│   ├── hooks/                      # useScrollProgress, useDevicePerf, usePizzaConfig
│   ├── utils/                      # formatPreco, gerarMensagemWhatsApp, verificarAberto
│   ├── animations/                 # GSAP configs, ScrollTrigger setups
│   └── three/                      # Three.js scene setup, model loaders
├── data/
│   ├── cardapio.json               # Dados do cardápio
│   └── promocoes.json              # Promoções ativas
├── public/
│   ├── images/                     # Fotos dos produtos
│   ├── models/                     # pizza.glb (3D model)
│   ├── fonts/                      # Preloaded web fonts
│   └── og-image.jpg                # Open Graph image
├── types/
│   └── index.ts                    # Todos TypeScript interfaces
└── styles/
    └── tokens.css                  # Design system tokens
```

### 24.3 Renderização por Rota

| Rota | Estratégia | Revalidação |
|---|---|---|
| `/` (landing) | SSG | Deploy |
| `/cardapio` | ISR | 1 hora |
| Modais/Drawers | Client-side only | N/A |
| API WhatsApp | Não existe (client-side) | N/A |

### 24.4 Estado Global (Zustand)

```typescript
// lib/store/cartStore.ts
interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: number; // computed
  itemCount: number; // computed
}

// lib/store/uiStore.ts
interface UIStore {
  theme: 'light' | 'dark' | 'system';
  configuradorOpen: boolean;
  configuradorProduto: Produto | null;
  openConfigurador: (produto: Produto) => void;
  closeConfigurador: () => void;
  checkoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}
```

---

## 25. COMPONENTES — ÁRVORE COMPLETA

### 25.1 Hierarquia de Componentes

```
<App>
├── <Nav>
│   ├── <Logo>
│   ├── <NavLinks>
│   ├── <CartButton> → abre CarrinhoDrawer
│   ├── <ThemeToggle>
│   └── <MobileMenu> (hamburger → bottom sheet)
│
├── <main>
│   ├── <HeroSection>
│   │   ├── <PizzaScene3D>          # Three.js canvas
│   │   │   ├── <PizzaMesh>
│   │   │   └── <IngredientParticles>
│   │   ├── <HeroContent>
│   │   │   ├── <HeroEyebrow>       # "Feitas na brasa desde [ano]"
│   │   │   ├── <HeroTitle>         # "Real Pizzas" + outline variant
│   │   │   ├── <HeroSubtitle>
│   │   │   └── <HeroCTAs>
│   │   └── <ScrollIndicator>
│   │
│   ├── <SobreSection>
│   │   ├── <SobreImagem>
│   │   ├── <SobreTexto>
│   │   └── <DiferenciaisGrid>
│   │
│   ├── <CardapioPreviewSection>
│   │   ├── <CategoriaNavScroll>
│   │   ├── <ProdutosGrid>
│   │   │   └── <CardProduto> ×n
│   │   │       ├── <ProdutoImagem>
│   │   │       ├── <ProdutoInfo>
│   │   │       ├── <ProdutoPreco>
│   │   │       └── <BtnAdicionarCarrinho>
│   │   └── <VerTodosLink>
│   │
│   ├── <PromocoesSection>
│   │   ├── <PromocarouselBanner>
│   │   └── <PromoGrid>
│   │       └── <PromoCard> ×n
│   │
│   ├── <ProcessoSection>           # "Como fazemos" — narrativa da pizza
│   │   └── <ProcessoTimeline>
│   │       └── <ProcessoStep> ×5
│   │
│   ├── <InstagramSection>
│   │   ├── <InstagramGrid>
│   │   │   └── <InstagramPhoto> ×9
│   │   └── <InstagramCTA>
│   │
│   └── <LocalizacaoSection>
│       ├── <MapaEmbed>
│       ├── <InfoLoja>
│       │   ├── <EnderecoCard>
│       │   ├── <HorarioCard>
│       │   │   └── <StatusAberto>  # ponto pulsante
│       │   └── <ContatoCard>
│       └── <MapaCTAs>
│
├── <Footer>
│   ├── <FooterLogo>
│   ├── <FooterLinks>
│   ├── <FooterSocial>
│   └── <FooterCopyright>
│
├── <CarrinhoDrawer>                # Portal → fixed overlay
│   ├── <CarrinhoHeader>
│   ├── <CarrinhoItens>
│   │   └── <ItemCarrinho> ×n
│   │       ├── <ItemImagem>
│   │       ├── <ItemDetalhes>
│   │       └── <ItemQuantidade>
│   ├── <CarrinhoVazio>             # Estado vazio
│   ├── <ResumoPrecos>
│   │   ├── <Subtotal>
│   │   ├── <Taxa Entrega>
│   │   └── <Total>
│   └── <FinalizarBtn> → abre CheckoutModal
│
├── <ConfiguradorModal>             # Portal → fullscreen ou centered
│   ├── <ConfiguradorHeader>
│   ├── <ConfiguradorProgress>      # 5 etapas visuais
│   ├── <StepTamanho>
│   ├── <StepSabor>
│   │   └── <SaborSelectorGrid>
│   ├── <StepBorda>
│   ├── <StepAdicionais>
│   ├── <StepObservacao>
│   ├── <PrecoRealtimeDisplay>
│   └── <ConfiguradorFooter>
│
└── <CheckoutModal>                 # Portal
    ├── <CheckoutHeader>
    ├── <TipoEntregaSelector>
    ├── <EnderecoForm>              # Condicional: delivery
    ├── <PagamentoInfoSelector>
    ├── <ResumoFinal>
    └── <EnviarWhatsAppBtn>
```


---

## 26. MODELO DE DADOS COMPLETO (TYPESCRIPT INTERFACES)

```typescript
// types/index.ts

// === CARDÁPIO ===

export type TamanhoPizza = 'pequena' | 'media' | 'grande' | 'familia';
export type TipoProduto = 'pizza' | 'esfirra' | 'bebida' | 'sobremesa' | 'adicional';
export type StatusProduto = 'ativo' | 'inativo' | 'esgotado';

export interface Tamanho {
  id: TamanhoPizza;
  label: string;               // "Média (8 fatias)"
  cm: number;                  // 30
  fatias: number;              // 8
  preco: number;               // 42.90
  servePessoas: string;        // "2-3 pessoas"
}

export interface Ingrediente {
  id: string;
  nome: string;
  emoji?: string;
  categoria: 'proteina' | 'queijo' | 'vegetal' | 'molho' | 'outro';
}

export interface Borda {
  id: string;
  nome: string;               // "Catupiry", "Sem borda"
  precoAdicional: number;     // 5.00 ou 0
  disponivel: boolean;
}

export interface Adicional {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}

export interface Produto {
  id: string;
  slug: string;               // "portuguesa"
  nome: string;
  descricao: string;
  tipo: TipoProduto;
  categoria: string;          // "Tradicionais", "Especiais", "Doces"
  ingredientes: string[];     // lista de ingredientes em texto
  ingredientesIds?: string[];
  tamanhos: Tamanho[];        // array com preços por tamanho
  precoUnico?: number;        // para esfirras e itens sem variação de tamanho
  imagemUrl: string;
  imagemAlt: string;
  tags?: string[];            // ["vegetariana", "mais pedida", "nova"]
  status: StatusProduto;
  disponibilidade?: {
    diasSemana?: number[];    // [5,6,0] = sex/sáb/dom apenas
    horarioInicio?: string;
    horarioFim?: string;
  };
  destaque?: boolean;
  ordem: number;              // para ordenação no cardápio
}

export interface Categoria {
  id: string;
  nome: string;
  emoji: string;
  descricao?: string;
  ordem: number;
}

export interface Cardapio {
  categorias: Categoria[];
  produtos: Produto[];
  versao: string;             // "2024-01-15T10:00:00"
}

// === CONFIGURAÇÃO E CARRINHO ===

export interface ConfiguracaoPizza {
  produtoId: string;
  tamanhoId: TamanhoPizza;
  metade1?: string;           // slug do sabor — se pizza meio a meio
  metade2?: string;
  bordaId: string;
  adicionais: string[];       // array de adicional IDs
  observacao: string;
  quantidade: number;
}

export interface CartItem {
  id: string;                 // UUID único do item no carrinho
  produtoId: string;
  produtoNome: string;
  imagemUrl: string;
  configuracao?: ConfiguracaoPizza;
  quantidade: number;
  precoUnitario: number;      // preço calculado com adicionais/borda
  precoTotal: number;         // precoUnitario × quantidade
  descricaoResumida: string;  // "Grande, Catupiry, + Bacon"
}

export interface Cart {
  items: CartItem[];
  versao: number;
  expiresAt: number;          // timestamp — 24h
}

// === PEDIDO E CHECKOUT ===

export type TipoEntrega = 'entrega' | 'retirada';
export type FormaPagamento = 'dinheiro' | 'cartao_credito' | 'cartao_debito' | 'pix';

export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  referencia?: string;
}

export interface Pedido {
  id: string;                 // gerado client-side (UUID)
  itens: CartItem[];
  tipoEntrega: TipoEntrega;
  endereco?: Endereco;        // apenas se tipoEntrega = 'entrega'
  formaPagamento: FormaPagamento;
  troco?: number;             // apenas se pagamento = dinheiro
  cupom?: string;
  descontoAplicado?: number;
  subtotal: number;
  taxaEntrega: number;
  total: number;
  observacaoGeral?: string;
  timestamp: string;          // ISO
  nomeCliente?: string;
}

// === PROMOÇÕES ===

export interface Promocao {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'desconto_fixo' | 'desconto_pct' | 'brinde' | 'combo' | 'horario';
  valor: number;
  condicoes?: {
    valorMinimo?: number;
    categoriaIds?: string[];
    produtoIds?: string[];
    horarioInicio?: string;
    horarioFim?: string;
    diasSemana?: number[];
  };
  cupom?: string;
  ativa: boolean;
  imagemUrl?: string;
  dataExpiracao?: string;
  ordem: number;
}

// === CONFIGURAÇÃO DA LOJA ===

export interface HorarioLoja {
  diaSemana: number;          // 0=Dom, 1=Seg...
  abre: string;               // "18:00"
  fecha: string;              // "23:00"
  fechado?: boolean;
}

export interface ConfiguracaoLoja {
  nome: string;
  whatsapp: string;           // "5527999999999"
  telefone?: string;
  endereco: Endereco & { cidade: string; estado: string; cep: string };
  horarios: HorarioLoja[];
  taxaEntrega: number;
  tempoEstimadoEntrega: string; // "30-45 min"
  raioEntregaKm: number;
  pedidoMinimo: number;
}
```

---

## 27. SEGURANÇA E BOAS PRÁTICAS

### 27.1 Superfície de Ataque
- **Sem backend próprio**: toda lógica no client. Sem banco de dados, sem autenticação, sem API.
- **WhatsApp como canal de ordem**: a pizzaria valida o pedido ao receber — nenhum dado sensível trafega pelo site.
- **Sem pagamento no site**: informativo apenas. Zero risco PCI DSS.

### 27.2 Práticas de Segurança Aplicáveis

**Headers de Segurança (via next.config.js):**
```javascript
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // necessário para GSAP inline
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
    ].join('; ')
  },
];
```

**Sanitização de Input:**
- Campo de observação: `maxLength={280}`, trim de espaços, remoção de caracteres de controle
- `encodeURIComponent` obrigatório em todas as strings que vão para a URL do WhatsApp

**localStorage:**
- Nunca armazenar dados sensíveis (endereço, telefone)
- Carrinho: apenas IDs de produtos + quantidades + configuração
- Expiração: 24h (verificar timestamp ao reidratar)

**Dependências:**
- `npm audit` em cada release
- Renovate ou Dependabot para atualizações automáticas de segurança
- Zero dependências de terceiros não auditados para lógica crítica

---

## 28. ESTADOS DE ERRO E FEEDBACK

### 28.1 Inventário de Estados

| Estado | Componente | Behavior |
|---|---|---|
| Produto esgotado | CardProduto | Badge "Esgotado", botão desabilitado, tom acinzentado |
| Fora do horário | Nav/Hero | Banner "Abrimos às 18h" + CTA agendamento (sem efeito) |
| Carrinho vazio | CarrinhoDrawer | Ilustração + copy "Sua pizza está esperando..." + CTA cardápio |
| Máx de adicionais | ConfiguradorAdicionais | Toast "Máximo de 5 adicionais atingido" |
| Campo obrigatório vazio | CheckoutForm | Borda vermelha + mensagem inline |
| CEP inválido | EnderecoForm | Mensagem "Fora da área de entrega" |
| WhatsApp bloqueado | Checkout | Instruções: copiar mensagem manualmente |
| Imagem não carrega | CardProduto | Placeholder com emoji da categoria |
| Three.js não suportado | HeroSection | Fallback: imagem estática da pizza |
| JavaScript desabilitado | Geral | Página estática funcional (SSG) — cardápio legível |
| localStorage indisponível | Carrinho | Sessão sem persistência, aviso mínimo |

### 28.2 Mensagens de Feedback (Toasts)

```typescript
interface Toast {
  tipo: 'sucesso' | 'erro' | 'aviso' | 'info';
  mensagem: string;
  duracao?: number; // ms, default 3000
}

// Exemplos:
{ tipo: 'sucesso', mensagem: 'Pizza adicionada ao carrinho! 🍕' }
{ tipo: 'sucesso', mensagem: 'Cupom PIZZA10 aplicado com sucesso!' }
{ tipo: 'aviso', mensagem: 'Fora do raio de entrega. Oferecemos retirada.' }
{ tipo: 'erro', mensagem: 'Preencha o endereço completo para continuar.' }
{ tipo: 'info', mensagem: 'Pedido enviado! Aguarde a confirmação por WhatsApp.' }
```

### 28.3 Skeleton Loaders
- CardProduto: skeleton com shimmer animation enquanto imagens carregam
- Grid do cardápio: 6 skeletons ao inicializar
- Seção Instagram: 9 quadrados cinzas enquanto carregam

---

## 29. MODO DEMO → MODO REAL

### 29.1 Problema
Durante o desenvolvimento, o cardápio e promoções são dados fictícios. Na entrega ao proprietário, precisa ser fácil trocar para dados reais sem tocar no código.

### 29.2 Solução: Arquivos JSON Editáveis

```
data/
├── cardapio.json          ← edita aqui para mudar cardápio
├── promocoes.json         ← edita aqui para mudar promoções
└── config-loja.json       ← edita aqui para dados da loja
```

**config-loja.json:**
```json
{
  "nome": "Real Pizzas & Esfirras",
  "whatsapp": "5527XXXXXXXXX",
  "endereco": {
    "rua": "Rua [A confirmar]",
    "numero": "[A confirmar]",
    "bairro": "[A confirmar]",
    "cidade": "Cariacica",
    "estado": "ES",
    "cep": "[A confirmar]"
  },
  "horarios": [
    { "diaSemana": 1, "abre": "18:00", "fecha": "23:00" },
    ...
  ],
  "taxaEntrega": 5.00,
  "pedidoMinimo": 30.00,
  "tempoEstimadoEntrega": "30-45 min"
}
```

**Documentação de Onboarding (README para o proprietário):**
- Como editar o cardápio (sem código)
- Como ativar/desativar promoções
- Como alterar horários
- Como mudar o número do WhatsApp

### 29.3 Flags de Feature
```typescript
// lib/flags.ts
export const FLAGS = {
  MODO_DEMO: process.env.NEXT_PUBLIC_MODO_DEMO === 'true',
  INSTAGRAM_API: false,    // true quando tiver API key
  AVALIACAO_ESTRELAS: false, // true quando integrar reviews
  FIDELIDADE: false,       // true quando implementar loyalty
} as const;
```

---

## 30. PAINEL ADMINISTRATIVO (FASE FUTURA)

### 30.1 Escopo do Painel (pós-MVP)
- Edição do cardápio sem editar JSON
- Ativação/desativação de promoções
- Gestão de pedidos recebidos via WhatsApp (apenas visualização)
- Configuração dos horários de funcionamento
- Upload de fotos dos produtos

### 30.2 Stack Sugerida
- Payload CMS 3.x (headless, TypeScript, self-hosted ou cloud)
- Ou: interface simples no próprio site com autenticação local (senha master)
- Dados: Payload → REST API → Next.js ISR regenera cardápio a cada 1h

### 30.3 Não Implementar no MVP
- Sem painel no escopo atual
- Dados via JSON estáticos é suficiente para lançamento
- Painel é prioridade P3 (pós-validação do produto)

---

## 31. O QUE PEGAR DO WEBLOVE/JESKO JETS (INSPIRAÇÃO TÉCNICA)

### 31.1 Animações a Replicar (adaptadas)
| Técnica Jesko Jets | Adaptação Real Pizzas |
|---|---|
| Expansão de círculo (porthole → fullscreen) | Expansão do forno: círculo de brasas → seção do cardápio |
| Scroll-driven video currentTime | Scroll-driven animation da pizza girando |
| Text stutter/glitch na entrada do hero | Estático (não aplicável a uma pizzaria) |
| Text blur reveal em seções | Aplicar em títulos de seções de conteúdo |
| Nav color switching (dark ↔ light) via ScrollTrigger | Aplicar: hero dark → seções light → footer dark |
| 3D model com PBR materials | Pizza 3D com texturas realistas (molho, queijo, ingredientes) |
| Parallax nos elementos de fundo | Ingredientes flutuantes em parallax no hero |
| Smooth scroll Lenis | Aplicar integralmente |
| Fullpage cinematic sections | Aplicar nas seções principais do storytelling |
| GSAP timeline orquestrada | Aplicar na sequência de entrada do hero |

### 31.2 O que NÃO Pegar
| Elemento Jesko Jets | Motivo para não replicar |
|---|---|
| Paleta monocromática (preto/branco) | Pizzaria precisa de calor, cor, apetite |
| Tipografia ultra-fina | Precisa ser legível para cardápio digital |
| Estética "ultra luxo corporativo" | Tom deve ser premium mas acolhedor |
| Interface sem preços visíveis | Cardápio digital precisa de preços claros |
| Sem CTA de conversão acima da dobra | Pizzaria precisa de "Pedir agora" imediato |
| Globe 3D com rotas | Não há equivalente relevante para pizzaria |

---

## 32. O QUE SUPERAR

### 32.1 Superar o Weblove/Jesko Jets em:

**Calor e emoção:**
- Jesko: frio, calculado, ultra-premium
- Real Pizzas: quente, sensorial, apetitoso — precisa fazer a pessoa sentir fome

**Funcionalidade:**
- Jesko: site vitrine/institucional
- Real Pizzas: produto digital funcional (menu + pedido completo)

**Conversão:**
- Jesko: CTA único "Book your charter"
- Real Pizzas: fluxo completo de 5 etapas com carrinho e checkout

**Acessibilidade:**
- Jesko: animações pesadas sem consideração de a11y
- Real Pizzas: prefers-reduced-motion + WCAG AA completo

**Performance em mobile:**
- Jesko: three.js pesado sem degradação graceful
- Real Pizzas: detecção de hardware → fallback elegante em devices fracos

### 32.2 Inovações Únicas da Real Pizzas
- Gerador automático de mensagem WhatsApp (inexistente em pizzarias locais)
- Configurador de pizza com preview de preço em tempo real
- Status de abertura/fechamento em tempo real (sem backend)
- 3D de pizza com ingredientes interativos (inédito para o segmento local)
- Circle expansion "forno → cardápio" como transição narrativa original

---

## 33. IDEIAS ADICIONAIS (BACKLOG CRIATIVO)

### 33.1 Funcionalidades Futuras (P2/P3)
- **"Monte sua pizza"**: configurador livre (não só sabores pré-definidos) — cliente escolhe cada ingrediente e monta do zero
- **Pedido Favorito**: salvar combinações no localStorage para repetir rápido
- **Modo Escuro Total**: hero completamente dark + cardápio dark — toggle no nav
- **Compartilhar Pedido**: gerar link do carrinho para enviar para amigo
- **Calculadora de Fatias**: "Quantas pessoas? → recomendamos X pizzas tamanho Y"
- **Cardápio com Filtros Avançados**: vegetariano, sem glúten (futuro), sem carne
- **Mapa de Entrega Interativo**: cliente vê se seu endereço está na área
- **Horário Mais Movimentado**: "Nossas pizzas ficam prontas mais rápido nas terças" — visual tipo Google Popular Times
- **Notificação de Promoção**: usuário cadastra email para receber promoções (Mailchimp free tier)

### 33.2 Efeitos Visuais Exploratórios
- **Vapor animado saindo da pizza** (CSS animation com SVG blur filter)
- **Textura de madeira do forno** como background da seção Sobre
- **Contador animado de pizzas entregues** (milestone social proof)
- **Parallax de ingredientes** em cada scroll: tomate cai de cima, queijo derrete de baixo
- **Cursor personalizado** no desktop: cursor virou uma fatia de pizza mini

### 33.3 Micro-interações
- Ao adicionar item ao carrinho: ícone do carrinho bounce + counter animado
- Ao aumentar/diminuir quantidade: número faz flip vertical (CSS perspective)
- Ao aplicar cupom válido: confetti mini de pequenas pizzas 🍕
- Ao enviar pedido pelo WhatsApp: animação de checkmark + "Bom apetite!"
- Ao selecionar sabor favorito: coração pulsando (favoritar produto)

---

## 34. PRIORIZAÇÃO COMPLETA (P0 → P3)

### P0 — BLOQUEADOR DE LANÇAMENTO (MUST HAVE)
| Feature | Complexidade | Impacto |
|---|---|---|
| Cardápio completo com fotos | Média | ★★★★★ |
| Configurador de pizza (tamanho + borda) | Alta | ★★★★★ |
| Carrinho funcional | Alta | ★★★★★ |
| Checkout com tipo de entrega + pagamento | Média | ★★★★★ |
| Gerador de mensagem WhatsApp | Média | ★★★★★ |
| Hero cinematográfico (sem 3D) | Média | ★★★★★ |
| Responsividade mobile | Alta | ★★★★★ |
| Status aberto/fechado | Baixa | ★★★★☆ |
| Localização e horários | Baixa | ★★★★☆ |
| Dados da loja via config-loja.json | Baixa | ★★★☆☆ |

### P1 — ALTA PRIORIDADE (SHOULD HAVE)
| Feature | Complexidade | Impacto |
|---|---|---|
| Pizza 3D no hero (Three.js) | Alta | ★★★★☆ |
| Animações GSAP completas | Alta | ★★★★☆ |
| Busca no cardápio | Média | ★★★☆☆ |
| Seção Promoções | Média | ★★★★☆ |
| Seção Sobre | Baixa | ★★★☆☆ |
| SEO + Schema.org | Média | ★★★★☆ |
| Smooth scroll (Lenis) | Baixa | ★★★☆☆ |
| Dark/Light mode toggle | Média | ★★★☆☆ |
| prefers-reduced-motion | Baixa | ★★★★☆ |

### P2 — DESEJÁVEL (NICE TO HAVE)
| Feature | Complexidade | Impacto |
|---|---|---|
| Instagram estático | Baixa | ★★☆☆☆ |
| Favoritar produto (localStorage) | Média | ★★☆☆☆ |
| Compartilhar produto (Web Share) | Baixa | ★★★☆☆ |
| Cupom de desconto | Média | ★★★☆☆ |
| Animações de entrada em scroll | Média | ★★★☆☆ |
| Web Share API para pedido | Baixa | ★★☆☆☆ |
| PWA básico (manifest + icon) | Baixa | ★★☆☆☆ |

### P3 — BACKLOG (WON'T HAVE NO MVP)
| Feature | Complexidade | Impacto |
|---|---|---|
| Painel administrativo | Muito Alta | — |
| Integração Instagram API | Alta | ★★☆☆☆ |
| Monte sua pizza (ingredientes livres) | Muito Alta | ★★★☆☆ |
| Sistema de fidelidade | Muito Alta | ★★★☆☆ |
| App mobile | Muito Alta | ★★★★☆ |
| Pagamento online | Muito Alta | ★★★★★ |
| Rastreamento de entrega | Muito Alta | ★★★★☆ |

---

## 35. PLANO DE DESENVOLVIMENTO (FASES)

### Fase 0 — Setup (Dia 1)
- [ ] Criar repositório Next.js 14 + TypeScript
- [ ] Configurar Tailwind + design tokens CSS
- [ ] Configurar ESLint + Prettier
- [ ] Configurar GSAP, Lenis
- [ ] Deploy inicial no Vercel (blank)
- [ ] Criar estrutura de pastas completa
- [ ] Criar types/index.ts com todas as interfaces
- [ ] Criar data/cardapio.json e data/config-loja.json com dados demo

### Fase 1 — Core UI (Dias 2-4)
- [ ] Componentes primitivos (Button, Badge, Input, Modal base)
- [ ] Nav (desktop + mobile hamburger)
- [ ] Footer
- [ ] Design system tokens aplicados globalmente
- [ ] HeroSection (estático, sem Three.js ainda)
- [ ] SobreSection

### Fase 2 — Cardápio (Dias 5-7)
- [ ] CategoriaNav com scroll sticky
- [ ] Grid de CardProduto (todas as variações de estado)
- [ ] Página /cardapio
- [ ] Busca básica client-side
- [ ] Preview de produto em modal

### Fase 3 — Configurador + Carrinho (Dias 8-11)
- [ ] Zustand store (cart + ui)
- [ ] ConfiguradorModal (5 steps)
- [ ] Cálculo de preço em tempo real
- [ ] CarrinhoDrawer (desktop + mobile)
- [ ] Persistência localStorage com expiração

### Fase 4 — Checkout + WhatsApp (Dias 12-14)
- [ ] CheckoutModal
- [ ] Formulário de endereço com validação
- [ ] Seletor de tipo de entrega
- [ ] Gerador de mensagem WhatsApp
- [ ] Abertura do WhatsApp (wa.me URL)
- [ ] Feedback pós-envio

### Fase 5 — Animações (Dias 15-18)
- [ ] Lenis smooth scroll
- [ ] Hero entrance sequence (GSAP timeline)
- [ ] Scroll-triggered animations em todas as seções
- [ ] Parallax de ingredientes
- [ ] Nav color switching
- [ ] Prefers-reduced-motion

### Fase 6 — 3D (Dias 19-21)
- [ ] Three.js setup no hero
- [ ] Pizza 3D model (GLB)
- [ ] Textura da pizza (molho, queijo, ingredientes)
- [ ] Animação idle (girar lentamente)
- [ ] Fallback para devices fracos

### Fase 7 — Seções Restantes (Dias 22-24)
- [ ] PromocoesSection
- [ ] InstagramSection (fotos estáticas)
- [ ] LocalizacaoSection + Mapa + Status

### Fase 8 — SEO + Performance (Dias 25-26)
- [ ] Schema.org JSON-LD
- [ ] Meta tags Open Graph
- [ ] Sitemap + robots.txt
- [ ] next/image otimizado em todas as imagens
- [ ] Preload de fontes e hero image
- [ ] Bundle analysis + otimizações

### Fase 9 — Acessibilidade (Dias 27-28)
- [ ] Revisão de contraste em toda a paleta
- [ ] Skip link
- [ ] Trap de foco em modais
- [ ] ARIA em componentes customizados
- [ ] Teste com leitor de tela (NVDA/VoiceOver)
- [ ] Touch targets 44px em mobile

### Fase 10 — QA e Ajustes (Dias 29-30)
- [ ] Testes cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Testes em devices reais (Android Chrome, iOS Safari)
- [ ] Lighthouse audit e correções
- [ ] Troca de dados demo → dados reais do proprietário
- [ ] Onboarding: documentação de edição do cardápio

### Fase 11 — Lançamento
- [ ] DNS: apontar domínio para Vercel
- [ ] HTTPS (automático Vercel)
- [ ] Google Analytics / Vercel Analytics
- [ ] Submeter sitemap no Google Search Console
- [ ] Configurar Google Business Profile
- [ ] Deploy final e verificação

---

## 36. TESTES

### 36.1 Testes Unitários (Jest + Testing Library)
- `gerarMensagemWhatsApp()` — cobrir todos os casos de tipo de entrega + pagamento
- `verificarAberto()` — cobrir todos os dias da semana e horários
- `calcularTotalCarrinho()` — cobrir promoções, cupons, taxa de entrega
- `validarFormularioCheckout()` — campos obrigatórios, CEP
- Formatação de preço (`R$ 42,90`) — locale pt-BR

### 36.2 Testes de Integração
- Fluxo completo: Cardápio → Configurador → Carrinho → Checkout → WhatsApp
- Persistência do carrinho: adicionar → recarregar página → carrinho recuperado
- Expiração: simular timestamp > 24h → carrinho limpo

### 36.3 Testes E2E (Playwright — fase 2)
- Happy path: mobile (375px) + desktop (1440px)
- Fluxo de pedido completo em ambos os viewports
- Acessibilidade: navegação completa por teclado
- Redução de motion: verificar que animações são desativadas

### 36.4 Testes de Performance (Lighthouse CI)
- Executar em cada PR (GitHub Actions)
- Falhar se LCP > 3s ou CLS > 0.15
- Relatório de bundle size a cada PR

---

## 37. CRITÉRIOS DE APROVAÇÃO PARA LANÇAMENTO

### 37.1 Funcionais (PASS/FAIL)
- [ ] Todos os produtos do cardápio exibidos com foto e preço
- [ ] Configurador completa os 5 passos sem erro
- [ ] Carrinho persiste após recarregar a página (< 24h)
- [ ] Mensagem WhatsApp gerada corretamente para cada tipo de pedido
- [ ] WhatsApp abre com o número correto da pizzaria
- [ ] Status aberto/fechado correto nos horários de funcionamento
- [ ] Formulário de checkout valida campos obrigatórios
- [ ] Funciona em iPhone (Safari) e Android (Chrome)

### 37.2 Visuais (revisão manual)
- [ ] Hero cinematográfico carrega em < 3s (4G)
- [ ] Animações suaves (sem jank)
- [ ] Dark mode e light mode ambos legíveis
- [ ] Responsivo de 375px a 1920px sem quebra de layout
- [ ] Imagens de pizza apetitosas e bem iluminadas
- [ ] Tipografia hierárquica e legível em todos os tamanhos

### 37.3 Acessibilidade (axe DevTools)
- [ ] Zero erros críticos de acessibilidade
- [ ] Navegação completa por teclado funcional
- [ ] Contraste mínimo AA em todos os textos

### 37.4 Performance (Lighthouse)
- [ ] Performance ≥ 85 em mobile
- [ ] SEO ≥ 95
- [ ] Acessibilidade ≥ 90
- [ ] Best Practices ≥ 90

---

## 38. DADOS PENDENTES DO PROPRIETÁRIO

> **ATENÇÃO:** Os itens abaixo precisam ser fornecidos pelo proprietário para substituir os dados demo antes do lançamento.

### Dados Críticos (sem eles, não é possível lançar)
- [ ] **Número do WhatsApp** completo com DDI: +55 27 XXXXX-XXXX
- [ ] **Cardápio completo**: lista de todas as pizzas (nome + ingredientes + preços por tamanho)
- [ ] **Cardápio de esfirras**: tipos, preços
- [ ] **Endereço completo** da loja
- [ ] **Horários de funcionamento** definitivos

### Dados Importantes (para qualidade)
- [ ] **Fotos profissionais** dos produtos (mínimo: as 8 mais vendidas)
- [ ] **Logo em alta resolução** (SVG preferencial, PNG 1000px mínimo)
- [ ] **Bordas disponíveis** com preços
- [ ] **Adicionais disponíveis** (bacon, cheddar, etc.) com preços
- [ ] **Taxa de entrega** por bairro ou valor fixo
- [ ] **Raio/bairros de entrega**
- [ ] **Pedido mínimo**
- [ ] **Tempo estimado de entrega**

### Dados Desejáveis (para contextualização)
- [ ] **Ano de fundação** (para "Feitas desde [ano]")
- [ ] **História curta** para a seção Sobre (3-5 linhas)
- [ ] **Diferenciais únicos** para destacar
- [ ] **Redes sociais**: @ do Instagram, Facebook
- [ ] **Fotos da loja** (forno, ambiente, equipe)
- [ ] **Coordenadas GPS** para mapa preciso

---

## 39. RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Proprietário sem fotos profissionais | Alta | Alto | Placeholders de alta qualidade até ter fotos; oferecer referências de fotografia de food |
| WhatsApp bloqueando abertura automática em alguns browsers | Média | Alto | Fallback: botão "Copiar mensagem" + instrução manual |
| Three.js muito pesado em mobile | Média | Médio | Feature detection + fallback estático; performance budget monitorado |
| Cardápio mudando frequentemente (sem painel) | Alta | Médio | Documentação clara de como editar JSON; instruções simples |
| Domínio não disponível ou demora DNS | Baixa | Alto | Verificar disponibilidade antecipadamente; Vercel subdomain como fallback |
| Safari iOS incompatibilidade | Média | Alto | Testar em iOS real durante desenvolvimento, não apenas emulador |
| Número do WhatsApp errado → pedidos perdidos | Baixa | Crítico | Verificação dupla antes do deploy; teste de pedido real pela equipe |
| GSAP licença (trial) | Baixa | Alto | Usar versão open source (GSAP 3 é grátis para uso pessoal/comercial não-SaaS) |
| Dados de demo indo para produção | Média | Alto | Checklist de deploy que inclui validação dos JSONs |

---

## 40. CONCLUSÃO E VISÃO

### 40.1 O que este site é

A Real Pizzas & Esfirras será o primeiro site de pizzaria local em Cariacica, ES, que trata o pedido online como uma **experiência**, não uma obrigação. Enquanto outras pizzarias locais usam sistemas genéricos (iFood, cardápio.com.br), este site posiciona a marca como referência de qualidade e cuidado.

### 40.2 O que este plano garante

Este PLANO MASTER define:
- **Experiência cinematográfica**: herdada da linguagem do @webloved, adaptada para o mundo da gastronomia
- **Produto funcional completo**: cardápio → configuração → carrinho → checkout → WhatsApp, sem backend próprio, sem custos de infraestrutura além do hosting
- **Escalabilidade**: arquitetura que cresce com o negócio — de JSON estático para CMS, de WhatsApp para pagamento online, de site para app
- **Identidade única**: paleta quente, 3D da pizza, expansão do forno como transição — nenhum template, nenhuma solução genérica
- **Baixo custo de manutenção**: proprietário pode editar cardápio sem saber programar

### 40.3 Proposta de Valor Final

> Não é um site de pizzaria. É a pizza na tela — quente, fumegante, irresistível — e a sensação de que aquele pedido vai chegar perfeito.

Este plano está completo. O próximo passo é a aprovação e a instrução de desenvolvimento.


---

## MATRIZ FINAL — INVENTÁRIO COMPLETO DO PROJETO

| Recurso | Prioridade | Complexidade | Impacto no Negócio | Impacto na Performance | Status |
|---|:---:|:---:|:---:|:---:|:---:|
| Cardápio visual completo | P0 | Média | ★★★★★ | Neutro | 🔴 Pendente |
| Configurador de pizza | P0 | Alta | ★★★★★ | Neutro | 🔴 Pendente |
| Carrinho com persistência | P0 | Alta | ★★★★★ | Neutro | 🔴 Pendente |
| Checkout (entrega/retirada) | P0 | Média | ★★★★★ | Neutro | 🔴 Pendente |
| Gerador mensagem WhatsApp | P0 | Média | ★★★★★ | Neutro | 🔴 Pendente |
| Hero cinematográfico | P0 | Média | ★★★★☆ | Médio | 🔴 Pendente |
| Responsividade mobile-first | P0 | Alta | ★★★★★ | Alto | 🔴 Pendente |
| Status aberto/fechado | P0 | Baixa | ★★★★☆ | Nenhum | 🔴 Pendente |
| Seção localização + mapa | P0 | Baixa | ★★★★☆ | Nenhum | 🔴 Pendente |
| Nav responsivo | P0 | Média | ★★★★☆ | Neutro | 🔴 Pendente |
| Design system + tokens | P0 | Média | ★★★☆☆ | Nenhum | 🔴 Pendente |
| Pizza 3D (Three.js) | P1 | Alta | ★★★★☆ | Alto ⚠️ | 🔴 Pendente |
| Animações GSAP (hero + scroll) | P1 | Alta | ★★★★☆ | Médio | 🔴 Pendente |
| Smooth scroll (Lenis) | P1 | Baixa | ★★★☆☆ | Neutro | 🔴 Pendente |
| Nav color switching | P1 | Baixa | ★★★☆☆ | Nenhum | 🔴 Pendente |
| Busca no cardápio | P1 | Média | ★★★☆☆ | Neutro | 🔴 Pendente |
| Seção Promoções | P1 | Média | ★★★★☆ | Nenhum | 🔴 Pendente |
| Seção Sobre | P1 | Baixa | ★★★☆☆ | Nenhum | 🔴 Pendente |
| SEO + Schema.org | P1 | Média | ★★★★☆ | Nenhum | 🔴 Pendente |
| prefers-reduced-motion | P1 | Baixa | ★★★★☆ | Nenhum | 🔴 Pendente |
| Dark/Light mode toggle | P1 | Média | ★★★☆☆ | Nenhum | 🔴 Pendente |
| Seção Instagram (estático) | P2 | Baixa | ★★☆☆☆ | Nenhum | 🔴 Pendente |
| Favoritar produto | P2 | Média | ★★☆☆☆ | Nenhum | 🔴 Pendente |
| Cupom de desconto | P2 | Média | ★★★☆☆ | Nenhum | 🔴 Pendente |
| Web Share API (produto) | P2 | Baixa | ★★☆☆☆ | Nenhum | 🔴 Pendente |
| PWA (manifest) | P2 | Baixa | ★★☆☆☆ | Neutro | 🔴 Pendente |
| Painel administrativo | P3 | Muito Alta | ★★★☆☆ | Nenhum | ⚫ Backlog |
| Monte sua pizza (livre) | P3 | Muito Alta | ★★★☆☆ | Nenhum | ⚫ Backlog |
| Sistema de fidelidade | P3 | Muito Alta | ★★★★☆ | Nenhum | ⚫ Backlog |
| Pagamento online | P3 | Muito Alta | ★★★★★ | Nenhum | ⚫ Backlog |

**Legenda:** 🔴 Não iniciado | 🟡 Em progresso | 🟢 Concluído | ⚫ Fora do escopo MVP

---

## DECISÕES ARQUITETURAIS

### DA-01: Next.js 14 App Router (não Pages Router)
**Decisão:** App Router  
**Motivo:** SSG nativo para landing + ISR para cardápio + Server Components para performance. O Pages Router está em modo legado e não recebe novos recursos.  
**Trade-off:** Curva de aprendizado maior; Server vs. Client Components precisa de atenção. Mitigado: componentes 3D e animações são sempre Client Components.

### DA-02: WhatsApp como canal de pedidos (não backend próprio)
**Decisão:** WhatsApp via wa.me URL  
**Motivo:** Zero custo de infraestrutura, zero complexidade de backend, zero gestão de banco de dados, zero risco de pedidos perdidos por falha de servidor. Proprietário já usa WhatsApp — zero mudança de processo.  
**Trade-off:** Não há histórico de pedidos automático no sistema; dependente do proprietário confirmar manualmente. Aceitável para MVP e para o volume de negócio atual.

### DA-03: Dados estáticos em JSON (não CMS)
**Decisão:** JSON no repositório  
**Motivo:** Simplicidade máxima, sem dependência de serviço externo, zero custo, zero API calls em runtime. Cardápio muda raramente (semanal/mensal).  
**Trade-off:** Proprietário precisa editar JSON para atualizar cardápio. Mitigado: documentação clara + guia de edição em PT-BR.  
**Evolução:** Fase futura → Payload CMS ou Contentful para edição visual.

### DA-04: Zustand para estado global (não Redux, Context)
**Decisão:** Zustand  
**Motivo:** API mínima (sem boilerplate), TypeScript nativo, devtools integrado, performance superior ao Context para atualizações frequentes (carrinho).  
**Trade-off:** Menor ecossistema que Redux. Não é relevante para o escopo.

### DA-05: Three.js puro (não React Three Fiber)
**Decisão:** Three.js com dynamic import  
**Motivo:** Maior controle sobre o bundle size. R3F adiciona ~50KB de overhead. Para um único elemento 3D (pizza no hero), o overhead não se justifica.  
**Trade-off:** Código mais verboso. Aceitável dado o escopo limitado do 3D.

### DA-06: GSAP versão gratuita (não Club GreenSock)
**Decisão:** GSAP 3 versão pública  
**Motivo:** GSAP 3 é totalmente gratuito para uso comercial (incluindo ScrollTrigger, desde 2022). Não é necessário licença paga para este projeto.  
**Confirmação:** Verificar termos em greensock.com/licensing/ antes de usar em produção.

### DA-07: Vercel para deploy (não AWS, não Netlify)
**Decisão:** Vercel  
**Motivo:** Integração nativa com Next.js (mesma empresa), free tier suficiente para este volume, CI/CD automático via GitHub, Edge CDN global, Analytics sem cookies.  
**Trade-off:** Vendor lock-in parcial. Mitigado: Next.js pode ser exportado para qualquer hosting.

### DA-08: Tailwind CSS + CSS Custom Properties (não CSS-in-JS)
**Decisão:** Tailwind + tokens CSS nativos  
**Motivo:** Zero runtime overhead (ao contrário de styled-components/Emotion), build-time purge, consistência com design system via custom properties, melhor DX.  
**Trade-off:** Verbosidade de classes no JSX. Mitigado: componentes abstraem as classes; design tokens via CSS vars cobrem casos dinâmicos.

### DA-09: Sem TypeScript strict any exceptions
**Decisão:** `strict: true`, zero `@ts-ignore`, zero `as any`  
**Motivo:** O modelo de dados é claro e completamente tipável. Atalhos de TypeScript em projetos pequenos criam débito técnico desproporcional.

### DA-10: LocalStorage para carrinho (não Cookie, não Server Session)
**Decisão:** localStorage com expiração de 24h  
**Motivo:** Sem backend, sem servidor, LGPD-friendly (dado pessoal não sai do device). Solução mais simples possível.  
**Trade-off:** Não compartilha carrinho entre dispositivos. Não relevante para o use case (usuário pede de um device por vez).

---

## PERGUNTAS E PONTOS QUE PRECISAM DE APROVAÇÃO

> Os itens abaixo requerem decisão antes ou durante o desenvolvimento. Marcados por categoria.

### 🔑 Críticos (bloqueia desenvolvimento se não definidos antes)

**P.01 — Número do WhatsApp**  
Qual é o número completo (com DDI +55 e DDD) que receberá os pedidos? Este número vai hardcoded no `config-loja.json` e em todos os testes de integração.

**P.02 — Domínio**  
Qual será o domínio do site? `realpizzas.com.br` está disponível? Quem fará o registro e configuração do DNS?

**P.03 — Cardápio completo**  
Qual é a lista definitiva de pizzas, esfirras e demais produtos — com nomes, ingredientes e preços por tamanho? (Pode ser enviada por foto de cardápio físico)

**P.04 — Paleta de cores — aprovação do tom**  
A paleta proposta usa vermelho brasa (#C0392B) + carvão (#1A1208) + bege quente (#F5EDD7) + dourado (#D4AF37). O proprietário aprova essa identidade visual? Há preferência por outras cores?

**P.05 — Logo existente**  
Existe uma logo da Real Pizzas? Se sim, em que formatos está disponível? Se não: será necessário criar uma como parte deste projeto?

### ⚠️ Importantes (definir até a Fase 5)

**P.06 — Fotos dos produtos**  
Como serão obtidas as fotos dos produtos? Opções:
- a) Fotografia profissional (custo adicional)
- b) Fotos do proprietário (smartphone, boa iluminação)
- c) Fotos de banco de imagens (genéricas, não ideais)
- d) IA generativa de pizza (risco de não parecer real)

**P.07 — Taxa de entrega e área de cobertura**  
Qual é a taxa de entrega? É fixa ou por bairro? Quais bairros/raio é atendido? O checkout precisa bloquear endereços fora da área?

**P.08 — Pedido mínimo**  
Há valor mínimo de pedido? Qual?

**P.09 — Promoções no lançamento**  
Haverá promoção de lançamento do site? (Ex: "10% off no primeiro pedido via site") Se sim, precisa ser implementada antes do lançamento.

**P.10 — Bordas disponíveis**  
Quais bordas recheadas estão disponíveis e a que preço adicional cada uma?

### 💡 Decisões de produto (podem mudar depois, mas afetam o plano)

**P.11 — Pizza meio a meio**  
O configurador deve suportar pizza meio a meio (dois sabores)? Isso aumenta a complexidade do configurador (precisará de seletor de dois sabores e lógica de preço — geralmente cobra-se o mais caro dos dois). Recomendar: **SIM** para a versão P0, pois é funcionalidade padrão esperada.

**P.12 — Bebidas e outros itens**  
O cardápio inclui bebidas, sobremesas ou outros itens além de pizzas e esfirras? Se sim, devem ter configurador (não faz sentido) ou apenas "adicionar ao carrinho" direto?

**P.13 — Nomes e textos do site**  
Os textos da seção Sobre, da tagline do hero e demais conteúdos serão escritos pelo proprietário ou pela equipe de desenvolvimento? Defina responsabilidade antes da Fase 7.

**P.14 — Agendamento de entrega**  
O cliente pode especificar hora de entrega ou é sempre "o mais rápido possível"? Se houver agendamento, adiciona campo de data/hora ao checkout.

**P.15 — Instagram**  
O @ do Instagram da Real Pizzas é qual? As fotos do Instagram podem ser usadas no site?

### 🎨 Estéticas (preferências do proprietário)

**P.16 — Tom da comunicação**  
Preferência entre: (a) formal/premium — "Nossas pizzas são elaboradas com ingredientes selecionados"; (b) informal/próximo — "Feitas com amor e muito queijo, do jeito que você gosta"; (c) misto.

**P.17 — 3D da pizza: sim ou não?**  
A pizza 3D no hero é um diferencial visual marcante mas aumenta o tempo de carregamento em ~1s e pode não renderizar bem em celulares antigos. Confirmar que o proprietário quer esse recurso mesmo com esse trade-off.

**P.18 — Modo escuro como padrão**  
A home page terá fundo escuro (carvão) por padrão, com transição para fundo claro nas seções de cardápio. O proprietário aprova essa escolha estética?

---

## RESUMO EXECUTIVO PARA APROVAÇÃO

**Projeto:** Site completo Real Pizzas & Esfirras — Cariacica, ES  
**Classificação:** Produto digital de alta complexidade visual com funcionalidade de pedidos  
**Prazo estimado de desenvolvimento:** 30 dias (full-time, 1 desenvolvedor sênior)  

**O que será entregue:**
1. Site one-page cinematográfico com animações premium
2. Cardápio digital interativo completo
3. Configurador de pizza com 5 etapas
4. Carrinho persistente + checkout
5. Integração WhatsApp (zero backend, zero custo de servidor)
6. Responsivo para todos os dispositivos
7. SEO otimizado para busca local (Cariacica, ES)
8. Acessível (WCAG AA)
9. Performance lighthouse ≥ 85

**O que NÃO será entregue (MVP):**
- Painel administrativo
- Pagamento online
- Integração com iFood/outros
- App mobile
- Sistema de fidelidade

**Custo estimado de infraestrutura mensal:** R$ 0 – R$ 50 (Vercel free tier + domínio)  
**Custo de desenvolvimento:** [a negociar]

---

*Plano Master elaborado em setembro de 2026.*  
*Aguardando aprovação para início do desenvolvimento.*

