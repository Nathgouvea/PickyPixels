# 02 — Plano de Auditoria

## A premissa que guia este plano

Antes de qualquer eixo, **a tese do próprio site dita o sarrafo**. O `studio.html` declara:

> "Great agency websites should already feel like proof. The site itself needs to demonstrate judgment, technical polish, content hierarchy, and a clear point of view. That is the standard we hold our client work to as well."
> — `studio.html` §What We Believe

Portanto a régua não é "está aceitável para um site qualquer?" — é "**este site funciona como prova de que o estúdio sabe fazer o que vende?**". Se o site exibe gradient-text Y2K, ícone-emoji decorativo nos values e um coração de partículas animado, ele mesmo está negando sua thesis. Auditar contra esse sarrafo.

---

## Eixos de avaliação (8)

Estes não são genéricos — foram escolhidos a partir do que o **inventory** revelou. Cada um amarra a um conjunto específico de achados já observáveis.

### Eixo 1 — Identidade visual & coerência de marca
**Pergunta-mestra:** A linguagem visual confirma a thesis "Design Taste, Strategic Thinking, Technical Depth"?

Critérios:
- **Paleta** — A combinação `--primary` (laranja queimado) + `--accent` (rosa pálido) + creme funciona ou produz vibe "Etsy seller 2018"? Onde o `--secondary` mostarda aparece — é intencional?
- **Tipografia** — Syne em display E body cria efeito caprichado ou compromete leitura? A escala tem 2 tamanhos display + body — suficiente para gerar hierarquia?
- **Logo** — Pink saturado com cursive serif vs. resto da paleta laranja/marrom. O lockup "Picky Pixels Studio" funciona?
- **Animações como sinal** — heart-particles, gradient-text, outline-text, cursor follower, scroll progress bar. Quais transmitem "judgment" e quais transmitem "stock template"?
- **Fotografia** — 3 fotos da equipe com cropping, fundo e mood completamente diferentes. Isso é "intentional, not generic"?
- **Iconografia** — uso pesado de Font Awesome 6.5.1 (>40 ícones diferentes). Ícones decorativos (`fa-heart`, `fa-lightbulb`, `fa-handshake`) vs. ícones utilitários (`fa-external-link-alt`).

Páginas/componentes alvo: hero da home, hero das páginas internas, owner-values cards, team-grid, footer, page-hero `::before`/`::after` blobs blur.

### Eixo 2 — Arquitetura de informação & navegação
**Pergunta-mestra:** O usuário consegue construir um mental model coerente do site em <10 segundos?

Critérios:
- **Mental model da nav** — Work / Services / Studio / Contact: o que cada um significa? Onde é a "home" no mental model do usuário?
- **Estado "active"** da nav — funciona em todas as páginas?
- **Cross-page consistency** — Os 5 nav-links são idênticos em todas as páginas? (`#contact` vs `index.html#contact` foi notado.)
- **Hierarquia** — A home tem section `#work`, mas existe portfolio.html. A home tem section `#contact`, mas portfolio.html tem `.portfolio-contact`. Por que duplicar?
- **CTAs cruzados** — studio.html → "View Work" + "See Services" (sem Contact CTA). É decisão ou esquecimento?
- **Dead-ends** — alguma página fecha o funil sem CTA claro?
- **Footer redundância** — repete os mesmos 4 nav links + social + privacy. Adiciona valor ou só ruído?

Páginas/componentes alvo: nav (todas as páginas), footer (todas), CTAs de fim de seção, link logo, `#work` section da home vs portfolio.html, fluxo de retorno após click em projeto.

### Eixo 3 — Sistema de design & componentização
**Pergunta-mestra:** Onde há padrões duplicados-mas-divergentes que deveriam ser um componente único?

Critérios:
- **Cards de projeto** — `portfolio-item` (web) vs `company-card` (marketing): 2 designs para a mesma categoria conceitual ("trabalho que fizemos"). Justificável ou ruído?
- **Modais** — `image-overlay` (simples) vs `company-modal` (rico). Confirmado: web → foto crua, marketing → carousel organizado.
- **Forms** — form da home vs form da portfolio.html. São idênticos? Diferentes? (Inputs, optgroups, mensagens.)
- **Contact sections** — `.contact` (home) vs `.portfolio-contact` (portfolio) vs `.services-cta` (services/studio). 3 variantes para a mesma intenção.
- **Hero** — `.hero` (home, com canvas) vs `.page-hero` (com blobs `::before/::after`). 2 patterns.
- **Tokens** — `--border-radius: 12px` é o token, mas o código tem 12/16/18/32 hardcoded. Categorizar onde e por quê.
- **Cor hard-coded** — `#2d1f1a`, `rgb(255,243,193)`, `rgb(122,59,0)` aparecem sem tokenização.
- **Footer.css 0 bytes** — arquivo morto importado em produção? Verificar referências.
- **Naming** — `service-card-full` vs `service-card` vs `company-card` vs `portfolio-item` — padrão de naming inconsistente.

Páginas/componentes alvo: portfolio.html, services.html, todos os modais, formulários, footer.

### Eixo 4 — Copywriting, microcopy & i18n
**Pergunta-mestra:** O texto tem voz consistente, evita clichê, e a versão PT é uma tradução real ou uma reescrita parcial?

Critérios:
- **Voz** — "We're Nathielle, Rebeca and Marcos" (we) vs "Connect with me:" (singular) vs "Connect with us:" (no portfolio). Inconsistência sistemática.
- **Clichê detection** — "creative solutions with purpose", "designs that reflect your unique story", "fun and stress-free process". Cada frase passa um teste de especificidade?
- **Redundâncias de title** — "Some of Our Favorite Projects" (home) + "Work We're Proud Of" (portfolio). Mesmo conteúdo, 2 nomes.
- **Voice na hero** — "Marketing, Design & Dev With Heart" + greeting `👋 Hey there, we're Picky Pixels!`. Vibes (casual + emoji) vs. thesis (Design Taste). Quão alinhado?
- **CTAs** — "View Our Work", "Let's Chat", "Book a Free Call", "Send a Message", "See All Services", "Explore the Studio", "View Work". Inventariar e ver duplicações/divergências.
- **Alertas** — "Hosting and domain registration are not included..." em destaque vermelho. Tom defensivo. Existem outras notes similares? ("Available in Porto District only" — comparar).
- **i18n EN→PT** — A subtitle da home PT (`Criamos experiências digitais para marcas criativas...`) é totalmente diferente da EN (`We help creatives and small businesses grow online...`). Outras divergências similares?
- **PT-BR vs PT-PT** — site é português de Porto, mas algumas strings usam "você", outras "tu", outras "esteja". Padrão de variante?
- **i18n completude** — `nav-about` traduzido como "Studio" (não traduzido). `Connect with me` em PT também aparece como "Connect with me" (literal EN). Mapear chaves não-traduzidas / mal-traduzidas.
- **Microcopy de form** — labels, placeholders, mensagens de erro/sucesso, privacy checkbox.

Páginas/componentes alvo: hero, section headers, CTAs, alertas, forms, traduções PT inteiras (`script.js:73+`).

### Eixo 5 — UX de conversão & funis
**Pergunta-mestra:** Um visitante que chega numa página interna em 5 minutos consegue: (a) entender o que o estúdio faz, (b) ver prova, (c) iniciar contato — sem fricção?

Critérios:
- **Path para conversão** — Quantos cliques separam visitante → form submetido em cada cenário (home, portfolio, services, studio)?
- **CTA primário por página** — Cada página tem um CTA dominante claro?
- **Form da home** — Posição (fim da página, depois de 5000+px de scroll), número de campos, friction.
- **Calendly** — Aparece em 2 lugares: contact section (linka `Schedule a Call`) e services-cta (`Book a Free Call`). Por que 2 entradas?
- **WhatsApp** — Linkado na nav (`fab fa-whatsapp`) mas sem indicador de "preferred channel". Confunde?
- **Email** — `nathielle@pickypixels.studio` — endereço pessoal de 1 dos 3 founders. É o canal "do estúdio" ou "da Nathielle"?
- **Click em projeto** — Web → image-overlay (foto). Marketing → company-modal (rich). Qual destes incentiva conversão? Qual frustra?
- **Trust signals** — Onde há prova social, depoimentos, contadores de clientes, logos? (Spoiler: aparentemente em lugar nenhum.)
- **Form errors / success** — UX de envio do form. O que o usuário vê depois de submit?

Páginas/componentes alvo: nav CTAs, hero CTAs, fim de página CTAs, form, links de portfolio.

### Eixo 6 — Responsividade
**Pergunta-mestra:** Em qual viewport o site quebra primeiro, e qual é o pior viewport observado?

Critérios:
- **Breakpoints declarados** — `968px`, `768px`, `480px` (detectados no `distributeColumns` JS). Mapear todos em CSS.
- **Mobile (375px)** — greeting badge cortado? Hero CTAs empilhados/lado a lado? Heart canvas posicionamento? Touch targets?
- **Tablet (768px)** — nav esconde os 4 links e mostra hamburger? Hero quebra para 1 coluna? Cards de projeto quantas colunas?
- **Logo extrapolando nav** — `<img width=120 height=120>` dentro de `.main-nav { height: 100px }`. Verificar overflow em todos os viewports.
- **Menu mobile** — overlay semi-transparente deixa hero visível atrás (legibilidade), e o toggle EN/PT some no menu mobile.
- **Services columns** — `distributeColumns()` redistribui via JS no resize. Tem `setTimeout 250ms` debounce — há flicker?
- **Form mobile** — 2 colunas (Name + Email) collapse?
- **Tipografia mobile** — `clamp(3rem, 7vw, 5rem)` em 375px = 26.25px. Boa em mobile?

Páginas/componentes alvo: todas as 4 páginas principais nos 3 viewports + portrait mobile + estados de menu aberto.

### Eixo 7 — Acessibilidade (WCAG 2.1 AA mínimo)
**Pergunta-mestra:** Um usuário com leitor de tela ou só com teclado consegue navegar e converter?

Critérios:
- **Contraste de cor**:
  - `.outline-text` (transparent + stroke 2px `#2d1f1a` em fundo creme `#fff9f0`) — passa AA para texto pequeno? Para grandes?
  - `.gradient-text` (laranja→rosa em creme) — passa AA?
  - `--text-light` (`#8b6b5c`) em `--background` (`#fff9f0`) — passa?
  - Badge greeting (`rgb(122, 59, 0)` em `rgb(255, 243, 193)`) — passa?
  - Botão `--primary` com texto branco — passa?
- **Form labels** — Inputs Name/Email só têm `placeholder` (sem `<label>` visível). Select tem `<label>` mas é antes do select.
- **Keyboard nav** — Tab order, foco visível, escape fecha modal?
- **ARIA** — `role="tablist"`, `aria-selected`, `aria-label` presentes nos filtros e botões. Outros lugares?
- **Imagens** — Todas têm `alt`? Os `alt` são descritivos ou só decorativos?
- **Animações** — `prefers-reduced-motion` é respeitado? (Vou checar styles.css em busca de `@media`.)
- **Heart canvas** — É decorativo. Tem `aria-hidden`? `cursor: pointer` sugere ação mas não há ação clara.
- **Heading hierarchy** — H1 → H2 → H3 sem pulos? Studio.html tem 1 H1 e múltiplos H2/H3.

Páginas/componentes alvo: home, forms, modais (image-overlay e company-modal), menu mobile, todos os botões interativos.

### Eixo 8 — Performance & dívida técnica
**Pergunta-mestra:** O site carrega rápido, e quando ele crescer (mais projetos, mais idiomas), o código vai escalar ou colapsar?

Critérios:
- **Asset weight**:
  - `images/`: 3 fotos team. Otimizadas?
  - `Projects/Portfolio-Web /`: 6 imagens, 13MB no total (média 2MB).
  - `Projects/Portfolio-Marketing/`: 40+ PNGs, ~150MB no total. **Inclui um zip de 26MB.**
  - Font Awesome via CDN — carrega ícones inteira (>900 KB unminified, ~70 KB minified).
- **Render-blocking** — CSS+JS no `<head>`, ordem de preload, `defer`/`async`.
- **LCP** — Provavelmente o logo `images/logo2.png` (preloaded) ou heart-canvas.
- **CLS** — Imagens com width/height declarados? Animações que causam shift?
- **Code morto**:
  - 8 heros experimentais (`hero-1.html` a `hero-8.html`) — 56KB total.
  - `footer.css` 0 bytes.
  - `heart-particles.js` 5KB referenciado só pelos heros mortos.
  - `--secondary` token usado em 1 lugar.
  - Chaves de tradução não-usadas em `translations.pt`.
- **`script.js` monolítico** — 1237 linhas misturando i18n, modal, filter, cursor, scroll, form, dataset. Manutenibilidade.
- **`distributeColumns()` JS-driven layout** — usa JS para o que CSS Grid + `grid-auto-flow: column dense` ou CSS Columns resolveria. Hidden cost.
- **`MMF Templates (1).zip` 26MB** servido publicamente — quem baixa? É necessário?
- **2 arquivos HTML por idioma** (`index.html` + `index.pt.html`) — não-DRY. Toda mudança precisa ser feita 2x (4 páginas × 2 idiomas = 8 arquivos).
- **Hard-coded translations** dentro do `script.js` em vez de JSON externo — git diffs ruins, hard to outsource translation work.

Páginas/componentes alvo: todos os assets, `script.js`, `styles.css`, `pages.css`, ordem de carregamento das tags `<link>` e `<script>`.

---

## Severity rubric

Cada achado terá um nível:

- 🔴 **CRITICAL** — Bloqueia conversão, prejudica credibilidade da marca, ou é bug funcional. Precisa ser corrigido antes de qualquer outra coisa.
- 🟠 **HIGH** — Degrade significativo da experiência ou da percepção de qualidade. Resolver antes do próximo ciclo de marketing.
- 🟡 **MEDIUM** — Melhoria perceptível, justificada por padrão da indústria ou pela própria thesis do estúdio.
- 🟢 **LOW** — Polimento, esforço pequeno, ganho marginal.
- 💡 **SUGGESTION** — Ideia opcional, dependendo de prioridades.

## Score rubric (por eixo, 0–10)

| Score | Significado |
|---|---|
| 9-10 | Estado da arte; melhor que 90% dos sites de estúdio comparáveis |
| 7-8 | Sólido, com pequenos ajustes de polimento |
| 5-6 | Funcional mas com gaps perceptíveis de qualidade |
| 3-4 | Vários problemas estruturais; degrade da experiência ou da marca |
| 0-2 | Compromete seriamente a percepção do estúdio |

Score global: média ponderada dos 8 eixos com pesos:
- Eixo 1 (Identidade) ×1.5 — o site é o portfólio do estúdio
- Eixo 2 (IA/Nav) ×1.5 — afeta toda a experiência
- Eixo 5 (Conversão) ×1.5 — propósito do site
- Demais eixos ×1.0

Conversão para 0-100: (soma ponderada / soma dos pesos) × 10.

---

## Plano de execução em 5 subagents paralelos (Fase 3)

| Agent | Foco | Eixos cobertos | Output |
|---|---|---|---|
| **A — Visual Critic** | Análise página por página dos screenshots + decisões estéticas | 1, 3 (visual), 6 (visual) | `03-findings-A-visual.md` |
| **B — UX & IA** | Mental model, fluxos, navegação, redundâncias | 2, 5 | `03-findings-B-ux.md` |
| **C — Code & Component** | Leitura do HTML/CSS/JS — duplicações, débito técnico, naming, dead code | 3, 8 | `03-findings-C-code.md` |
| **D — Copy & Brand Voice** | Microcopy, voz, CTAs, traduções PT, clichês | 4 | `03-findings-D-copy.md` |
| **E — Responsive & A11y** | Quebras nos 3 viewports + WCAG + form a11y + keyboard | 6, 7 | `03-findings-E-responsive.md` |

**Briefing comum a todos:**
- Severity classificada conforme rubric.
- Cada achado: Título / Página & Componente / Eixo / Evidência (seletor CSS + scroll position OU número da captura no inventory) / Problema (1-3 frases) / Por que importa / Recomendação acionável (não vaga) / Esforço S/M/L.
- Honestidade > volume. Se algo está sólido, dizer "sólido, nada a apontar".
- Citar referência concreta quando recomendar mudança (ex: "ver hero Linear.app" não vale, "ver hero do `linear.app` — uso de mono space monogramado em vez de outline-text" vale).

## Fase 4 (Sintetizar + critique)

1. Consolidar os 5 reports em `04-AUDIT-REPORT.md` com:
   - Executive summary (1 parágrafo brutalmente honesto)
   - Top 10 issues ordenados por severity
   - Score por eixo + score global
   - Lista completa de achados agrupados por eixo
2. Critique step: reler como Design Director cético — eliminar findings vagos, recomendações genéricas, viés de confirmação, gaps de viewport.

---

**PAUSA OBRIGATÓRIA AQUI** — Aguardo aprovação do plano antes de executar a Fase 3.
