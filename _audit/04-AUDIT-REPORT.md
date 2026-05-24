# 04 — AUDIT REPORT — Picky Pixels Studio

**Data:** 2026-05-12 · **Branch auditado:** `feature/add-marketing-services` · **Régua:** thesis declarada no próprio `studio.html` ("Great agency websites should already feel like proof — judgment, technical polish, content hierarchy, and a clear point of view").

> Auditoria conduzida em 4 fases (inventory → plan → 5 subagents paralelos → consolidação + critique). Total: **167 findings** distribuídos em 8 eixos. Para cada finding individual com evidência completa e recomendação detalhada, ver os arquivos `03-findings-A-visual.md`, `03-findings-B-ux.md`, `03-findings-C-code.md`, `03-findings-D-copy.md`, `03-findings-E-responsive.md`.

---

## Executive Summary

O site da Picky Pixels Studio é a evidência ativa **contra** o próprio positioning que ele tenta vender. A página `studio.html` declara "Design Taste, Strategic Thinking, Technical Depth" — e cada uma das três palavras é desmentida pelo agregado: o hero é uma pilha de três clichês visuais 2017-2019 (gradient text + outline text + particle network formando um coração literal), a navegação não tem âncora própria para "home" e usa o nome "Studio" para nomear simultaneamente o estúdio inteiro e uma das páginas, dois designs de card coexistem para o mesmo tipo de conteúdo (web design vs marketing), 17 itens de form para 6 intenções reais, ~1.400 linhas de CSS morto (~42% do `styles.css`), 700 linhas de pricing apenas comentadas dentro do HTML em produção, um zip de 26 MB com arquivos de cliente servido publicamente, oito páginas órfãs `hero-1.html`-`hero-8.html` indexáveis em produção, a versão portuguesa estática (`index.pt.html`) está cheia de português **sem acentos** em meta-tags e copy ("incriveis", "estrategico", "culinaria"), e o hero PT entrega duas mensagens de positioning contraditórias dependendo se o JS rodou ou não. A acessibilidade está abaixo do mínimo legal: zero indicadores de foco visíveis, dois inputs sem `<label>`, modais sem `role="dialog"` nem focus trap, contraste de 2.12:1 no gradient text "Marketing," (falha até WCAG AA-Large), e zero `prefers-reduced-motion`. Há fundações boas isoladas — sistema de spacing tokenizado coerente, paleta de neutros agradável, hover micro-interactions corretas, estrutura editorial da `studio.html`, JSON-LD presente, formspree configurado — mas o agregado entrega "freelancer template buying his first SaaS subscription", não "studio que sabe o que faz". **Score global: 38/100.** Não é problema de polimento, é problema de coerência identitária. Antes de qualquer redesign visual, recomenda-se um inventory funcional severo (deletar tudo o que está morto: heros órfãos, pricing comentado, custom-cursor broken-by-default, blob blurs decorativos, gradient text repetido 5x, particle network, dead CSS) e só depois reconstruir hero + nav + cards-pattern com 1 ideia cada, não 3.

---

## The Big Picture

```
┌─────────────────────────────────────────────────────────────────┐
│  SCORE GLOBAL: 38/100                                            │
│  ───────────────                                                 │
│  Conversão           ███░░░░░░░ 3.0/10   (peso ×1.5)             │
│  Acessibilidade      ███░░░░░░░ 3.0/10                           │
│  Performance/débito  ███░░░░░░░ 3.0/10                           │
│  UX & IA             ███▌░░░░░░ 3.5/10   (peso ×1.5)             │
│  Identidade visual   ████░░░░░░ 4.0/10   (peso ×1.5)             │
│  Sistema de design   ████░░░░░░ 4.0/10                           │
│  Copy & i18n         ████░░░░░░ 4.0/10                           │
│  Responsividade      ██████░░░░ 6.0/10                           │
│                                                                  │
│  Distribuição de severidade:                                     │
│  🔴 CRITICAL ........ 21 findings                                │
│  🟠 HIGH ............ 57 findings                                │
│  🟡 MEDIUM .......... 60 findings                                │
│  🟢 LOW ............. 22 findings                                │
│  💡 SUGGESTION ...... 19 findings                                │
│  TOTAL .............. 167                                        │
└─────────────────────────────────────────────────────────────────┘
```

Fórmula do score global: média ponderada × 10. Pesos 1.5 nos eixos que afetam o propósito do site (identidade), o mental model (IA), e o resultado (conversão). Pesos 1.0 nos demais. Conta: `(6.0+5.25+4.5+4+4+6+3+3) / 9.5 × 10 = 37.6 ≈ 38/100`.

---

## Top 10 Most Critical Issues

Ranking compound — issues que atingem múltiplos eixos simultaneamente OU que sozinhos comprometem a tese do estúdio. Cada item linka para o sub-report que contém evidência e recomendação completa.

### 1. 🔴 O hero contradiz a tese do estúdio em três decisões empilhadas
Gradient-text "Marketing," (rosa→laranja) + outline-text "With Heart" + particle-network on hover formando coração literal + emoji `👋 Hey there, we're Picky Pixels!`. Quatro tropos pré-2018 em uma só tela. Cliente disse "brega". Está correto. *Eixos afetados: 1 (identidade) + 4 (voz) + 5 (conversão).* — [findings-A: hero](03-findings-A-visual.md), [findings-D: hero EN](03-findings-D-copy.md)

### 2. 🔴 Click em Web Design abre foto crua, click em Marketing abre modal organizado
Mesmo verbo do usuário ("ver mais sobre este projeto") entrega dois tratamentos opostos. O tratamento "rico" foi dado à categoria que vende menos (marketing) e o tratamento "pobre" à que vende mais (web design). Pior: `initImageOverlay` captura cliques em todos `.portfolio-image`, então o modal de marketing flicka entre os dois antes de fechar. *Eixos: 2 + 3 + 5.* — [findings-B: same content two flows](03-findings-B-ux.md), [findings-C: image-overlay vs company-modal](03-findings-C-code.md)

### 3. 🔴 `index.pt.html` está cheio de português sem acentos
A versão PT estática (servida na primeira renderização ao usuário PT) tem `incriveis`, `estrategico`, `culinaria`, `comparacoes`, `solucoes`, `Trafego` — em copy, **meta description**, OG title e Twitter card. Para Googlebot, social scrapers e o FOUC antes do JS rodar, o site PT é um português quebrado. Para um estúdio de Porto que vende "judgment" para o mercado luso, esse é o único leak de credibilidade que sozinho mata o pitch. *Eixos: 4 + 8 (SEO).* — [findings-D: PT acentos](03-findings-D-copy.md), [findings-C: i18n half-baked](03-findings-C-code.md)

### 4. 🔴 26 MB de IP de cliente servido publicamente como ZIP estático
`Projects/Portfolio-Marketing/MMF Templates (1).zip` está deployado em `pickypixels.studio/Projects/Portfolio-Marketing/MMF%20Templates%20(1).zip`. Zero referências no código, qualquer pessoa que descobrir a URL baixa. Possível leak de templates entregues a cliente — exposição legal + reputacional. *Eixo: 8.* — [findings-C: 26MB zip](03-findings-C-code.md)

### 5. 🔴 Acessibilidade abaixo do mínimo legal — 5 falhas concorrentes
(a) Zero indicador de foco visível em links, botões, filtros e cards (verificado: `outline-width: 0px` no `getComputedStyle`). (b) Inputs Name e Email sem `<label>` e sem `aria-label` — só placeholder. (c) Modais `image-overlay` e `company-modal` sem `role="dialog"`, sem `aria-modal`, sem focus trap, sem ESC handler. (d) Cards `.portfolio-image` clicáveis no mouse mas `tabindex: -1` (keyboard inacessível). (e) `gradient-text` no pixel rosa = **2.12:1** contraste — falha até AA-Large. Em mercado UE, isso é risco legal sob Diretiva 2016/2102 e EAA 2025. *Eixos: 7 + 1.* — [findings-E: a11y críticos](03-findings-E-responsive.md)

### 6. 🔴 Home não tem âncora própria na navegação + "Studio" colide com nome do estúdio
A nav tem Work/Services/Studio/Contact — nenhum deles é "Home". Na home, **nenhum link da nav fica `active`** (sinal de "onde estou" desaparece). Pior: "Studio" no menu é a página About, mas "Studio" também é a última palavra do nome do estúdio no logo lockup — duas entidades com o mesmo rótulo. Quebra mental model em <10s. *Eixos: 2 + 4.* — [findings-B: home sem âncora](03-findings-B-ux.md), [findings-D: Studio repete](03-findings-D-copy.md)

### 7. 🔴 Contact é uma anchor cross-page, não uma página
Em portfolio/services/studio, o link "Contact" leva a `index.html#contact` — full page reload + scroll automático 5.000px até o form. Studio.html não tem nenhum CTA pra contact. Conversão sangra no ponto mais "pronto-pra-converter" do funil. Plus: ID collision — `index.html` e `portfolio.html` repetem `id="contact-form"`, `id="name"`, `id="email"`, `id="form-message"` (HTML inválido). *Eixos: 2 + 5 + 8.* — [findings-B: contact anchor](03-findings-B-ux.md), [findings-B: form ID collision](03-findings-B-ux.md)

### 8. 🔴 ~1.400 linhas de CSS morto (~42% do `styles.css`) + 700 linhas de HTML pricing comentado + 8 páginas órfãs deployadas + custom-cursor broken-by-default + favicon 404
Lista somada da dívida técnica visível: pricing CSS (~700 linhas) + classes não-referenciadas em HTML (`.work-slider`, `.work-slide`, `.service-card`, `.services-carousel`, `.shape-1/2/3`, ~700 linhas adicionais) + `hero-1.html` a `hero-8.html` reachable em produção (`pickypixels.studio/hero-3-typography-reveal.html` indexável pelo Google) + `<div class="cursor">` + JS de cursor follower instalado em cada visita mas com bloco CSS `/* Custom Cursor */` vazio + `<link rel="icon" href="images/favicon.png">` aponta para arquivo que não existe (favicon 404 em 5 páginas). Para um estúdio que vende "Execution Quality, maintainable delivery", este é o argumento contra a thesis. *Eixos: 1 + 8.* — [findings-C: 5 críticos](03-findings-C-code.md)

### 9. 🔴 Cards "Personal / Strategic / Collaborative" = template Squarespace literal
Três value cards com `<i class="fas fa-heart">` + `<i class="fas fa-lightbulb">` + `<i class="fas fa-handshake">` acima de "Personal/Strategic/Collaborative" + descrições "Designs and strategies that reflect your unique story", "Creative solutions with purpose", "Fun and stress-free process". Este exato conjunto é o template padrão "About Us values" do Squarespace Bedford / Wix Aida. Aparece DEPOIS de 3 fotos de equipe com cropping, fundo, mood completamente diferentes. Para um estúdio que vende "design taste", cinco linhas de evidência contrária em sequência. *Eixos: 1 + 4.* — [findings-A: cards Squarespace](03-findings-A-visual.md), [findings-D: fortune cookie test](03-findings-D-copy.md)

### 10. 🔴 Logo cursive infantilizada + extrapolação física do nav
Logo `images/logo2.png` é uma fonte Cooper/script bouncy rosa-claro com "STUDIO" amarelo-mostarda — visual cupcake shop / Etsy storefront. Contradiz a paleta laranja queimado/marrom do site. Declarado `height: 120px` dentro de `.main-nav { height: 100px; overflow: visible }` — **logo transborda 20px verticais em desktop em 100% das páginas em 100% dos scrolls**. O `overflow: visible` é confissão técnica de que o autor sabia e desligou o crop. *Eixos: 1 + 6.* — [findings-A: logo](03-findings-A-visual.md), [findings-E: overflow](03-findings-E-responsive.md)

---

## Score breakdown by axis

### Eixo 1 — Identidade visual & marca: **4/10**
4 críticos (hero combo, logo, fotos heterogêneas, value cards Squarespace) + 9 highs (section labels, gradient text repetido 5x, outline text, border-radius caos, cores hard-coded, 2 card-patterns). Áreas sólidas explícitas: spacing scale matematicamente coerente, body text contrast AAA, backdrop blur do nav, hover micro-interactions, estrutura editorial da studio.html. **Justificativa do score:** existem fundações isoladas válidas, mas o agregado funciona como evidência ativa contra o positioning "Design Taste". → 26 findings em [03-findings-A-visual.md](03-findings-A-visual.md)

### Eixo 2 — Arquitetura de informação & navegação: **3.5/10**
4 críticos (home sem âncora, mesmos projetos com 2 nomes, contact via anchor cross-page, PT version aponta para EN-only pages) + 8 highs. Acertos: nav consistente entre as 4 páginas internas, filter state preservado via querystring `?filter=`, breadcrumb implícito via active state. **Justificativa:** fundação OK, mas erros estruturais quebram o mental model do usuário novo. → 25 findings em [03-findings-B-ux.md](03-findings-B-ux.md)

### Eixo 3 — Sistema de design & componentização: **4/10**
2 das 4 marcas críticas do Agent C atingem este eixo (~1.400 linhas de dead CSS, custom-cursor broken). Cards portfolio-item vs company-card como dois designs para a mesma intenção. 6 valores diferentes de border-radius coexistindo. 9 cores hardcoded fora do token system. Token `--bg` referenciado 6× mas nunca declarado (silently broken). **Justificativa:** tokens existem, mas são bypassed pelo próprio site — sintoma público de "não temos design system". → ~30 findings relevantes em [03-findings-C-code.md](03-findings-C-code.md) + complementos em A

### Eixo 4 — Copy, microcopy & i18n: **4/10**
3 críticos (PT sem acentos, hero PT contradiz EN positioning, "Connect with me/us" inconsistente) + 12 highs (clichê em values + service descriptions + footer tagline, founder roles em 3 registros diferentes, hosting alert com peso visual invertido, 16 labels de CTA para 6 intenções, register PT-PT vs PT-BR no mesmo site). **Justificativa:** existem duas vozes no site (strategic de studio.html vs friendly-startup de index.html) e elas brigam entre si. → 32 findings em [03-findings-D-copy.md](03-findings-D-copy.md)

### Eixo 5 — UX de conversão & funis: **3/10**
4 críticos que atingem o funil (click em projeto fragmentado, contact via anchor, PT broken, home sem âncora). 8 highs: trust signals praticamente zero (nenhum testimonial, nenhum logo strip, nenhuma métrica de outcome), form com 17 opções gerando paralisia (Software/Mobile faltando ironicamente), form aparece após 5.000px de scroll sem CTAs intermediários, studio.html é dead-end sem CTA de contato, Calendly+form+WhatsApp+email duplicados sem hierarquia, footer redundante. **Justificativa:** o funil de conversão é frágil em quase todos os pontos críticos. → analisado em [03-findings-B-ux.md](03-findings-B-ux.md)

### Eixo 6 — Responsividade: **6/10**
Apesar do logo overflow do nav e do team-grid bug em mobile (renderiza 2 colunas em vez de 1 por ordem errada das media queries), os 3 viewports funcionam razoavelmente. Acertos: hero-split colapsa pra coluna única, tabs/menu mobile presentes, breakpoints declarados (mesmo que ad-hoc — 37 blocos `@media`). **Justificativa:** o pior eixo dos 8 não está aqui — o site é responsivo, com bugs cosméticos. → 11 findings responsive em [03-findings-E-responsive.md](03-findings-E-responsive.md)

### Eixo 7 — Acessibilidade: **3/10**
5 críticos (foco zero, inputs sem label, modais sem role/aria/focus, cards sem tabindex, contraste 2.12:1 no gradient). 11 highs (outline text mal pintado, btn-primary contraste 3.08:1 falha AA, zero `prefers-reduced-motion`, logo overflow, team-grid bug, custom cursor JS dead-code, heart canvas com false affordance e sem `aria-hidden`, toggle EN/PT some no mobile menu, lang button 20×17px abaixo de WCAG 2.5.5, `--text-light` passa AA por 0.15 de folga). **Justificativa:** o site está abaixo do mínimo legal para mercado UE (Diretiva 2016/2102, EAA 2025). → 37 findings em [03-findings-E-responsive.md](03-findings-E-responsive.md)

### Eixo 8 — Performance & dívida técnica: **3/10**
4 críticos (26MB zip público, pricing dead code, 8 orphan pages, favicon 404, custom cursor broken). 17 highs: script.js monolítico 1237 linhas render-blocking, two-files-per-language já driftaram, distributeColumns reimplementa em JS o que CSS column-count resolveria, logo 1.5MB preloaded (LCP), portfolio images 1-3.5MB cada, Font Awesome inteira via CDN, 37 blocos `@media` repetidos sem mobile-first, token `--bg` undeclared, dead functions `initParallax`/`initInViewAnimations` referenciando classes inexistentes. **Justificativa:** o site técnico só sobrevive porque é estático. Em qualquer crescimento de conteúdo, colapsa. → ~30 findings em [03-findings-C-code.md](03-findings-C-code.md)

---

## Cross-cutting themes (que aparecem em múltiplos eixos)

Padrões que emergiram quando os 5 reports foram lidos lado a lado:

### Tema A — "Repetição mecânica de tropo visual sem hierarquia"
Aparece em A (gradient text 5×, blob blurs, outline text), C (border-radius 6 valores, 5 recipes de shadow). Sintoma de ausência de design system real. Resolução: tokenizar shadows, radii, gradients; usar gradient como UMA accent em UM lugar; eliminar blob blurs.

### Tema B — "Singular vs plural" (me vs us)
Aparece em B, D. "Connect with me:" (home), "Connect with us:" (portfolio), "Tell me about your project..." (home), "Tell us about your project..." (portfolio), email único `nathielle@pickypixels.studio`. Sintoma de ambiguidade sobre se é estúdio de 3 ou freela de 1. Resolução: padronizar tudo em "us", trocar email para `hello@pickypixels.studio` (alias).

### Tema C — "Componentes duplicados-mas-divergentes"
Aparece em A (2 card patterns), B (2 modals, 2 forms, 2 contact sections, 3 contact CTAs), C (forms já driftaram entre index.html e portfolio.html). Sintoma de copy-paste em vez de componentização. Resolução: consolidar para 1 card-pattern + 1 modal-pattern + 1 form + 1 contact source-of-truth.

### Tema D — "i18n half-baked"
Aparece em B (PT links to EN), C (translations partially applied, no `<title>` translation, no canonical, no hreflang), D (PT sem acentos no estático, hero PT diverge do EN). Sintoma de implementação i18n iniciada mas não terminada. Resolução: decidir entre arquivos completos por idioma OU pivot para data-translate JS-driven em todas as páginas, e completar.

### Tema E — "Dead code visível em produção"
Aparece em A (`.category-filter` órfão, `--secondary` token órfão), C (~1.400 linhas CSS, 8 heros, pricing comentado, custom-cursor, dead JS functions). Sintoma de ausência de processo de cleanup. Resolução: deletar tudo o que está provadamente morto antes de qualquer redesign.

### Tema F — "Visual decisions sem propósito funcional"
Aparece em A (cursor follower, scroll progress bar, blob blurs, heart canvas com cursor:pointer mas sem ação), E (heart canvas false affordance, custom cursor broken). Sintoma de "ornamento confundido com taste". Resolução: cada elemento visual precisa justificar custo cognitivo + GPU + acessibilidade.

---

## Critique step (auto-review como Design Director cético)

Reli o report e os 5 sub-reports fazendo as perguntas obrigatórias do plano. Issues encontrados e revisados:

**P1: Algum finding é vago demais?** Sim — 2 issues encontradas.
- O finding sobre "fotos da equipe" (Top 10 #9, agent A) inicialmente dizia "fotos sem coesão"; refinado com 3 atributos específicos (crop, fundo, tom de cor) + 2 opções concretas de remediação (€300 refoto vs €0 filtro mono).
- O finding sobre "cursor follower" (agent A, MEDIUM) inicialmente listava só "decoração sem benefício"; refinado com 4 razões específicas (não comunica info, invisível em touch, 2017-2019, broken em pages internas).

**P2: Alguma recomendação é genérica?** Sim — encontradas e marcadas. Os agents foram bem (citam linear.app, vercel, pentagram, basement.studio, instrument.com, raw.studio em recomendações). Casos limítrofes que apertei:
- "Melhorar a hierarquia de section labels" (agent A) → especificado em "monoespaço IBM Plex Mono em 12px, ou eliminar 100% e usar numeração 01/02/03 como studio.html já faz".
- "Adicionar trust signals" (agent B) → especificado em 3 itens com prioridade (testimonials, logo strip, métricas concretas) + alerta para não inventar quote.

**P3: Faltou olhar algum estado/página/breakpoint?**
- Privacy-policy.html (EN + PT) só ganhou auditoria leve. Agents pegaram apenas que existem e que devem cobrir GDPR — não auditaram o texto. **Adicionado** abaixo um item no roadmap explicitando isso como gap de auditoria.
- Form submitted/success/error state não foi capturado ao vivo nos screenshots (depende de submit real). Agent D notou os textos das mensagens, agent E notou ausência de `role="status"` no `#form-message`. **Suficiente para report** mas pode ser auditado em segundo passe se necessário.
- Estado "filter applied" no portfolio em mobile (375px) não foi capturado ao vivo. **Suficiente para report** (o filter é o mesmo componente já auditado).

**P4: Há viés de confirmação (só achei o que o cliente já apontou)?**
Os 5 problemas do cliente:
1. Hero brega → confirmado e ampliado (4 sub-issues empilhados, não 1)
2. Nav confusa → confirmado e ampliado (3 sub-issues: sem âncora home, colisão "Studio", contact-as-anchor)
3. Trabalhos duplicados com 2 nomes → confirmado e ampliado (3 inventários incompatíveis, não 2)
4. Inconsistência Web vs Marketing click → confirmado + descoberto bug adicional (initImageOverlay flicker antes do company-modal abrir)
5. Alerta hosting desproporcional → confirmado e ampliado (comparação com location badges mostra inversão de peso visual)

Achados que **NÃO estavam na calibração do cliente** (escape de viés confirmado):
- 26MB zip público (legal/IP)
- PT sem acentos em meta tags (SEO)
- Form ID collision (HTML inválido)
- ~1.400 linhas dead CSS
- 8 heros órfãos deployados
- Custom cursor broken-by-default
- 17-option form sem Software/Mobile
- Studio.html dead-end de conversão
- Trust signals zero
- Acessibilidade abaixo do mínimo legal
- Logo 1.5MB preloaded
- Instagram handle inconsistente
- "Connect with me/us" inconsistente
- Founder roles em 3 registros
- Filter "All" vs "All Projects"
- Stegel/Isabel sem "Visit Website"
- Calendly duplicado com 2 textos
- Footer redundante sem informação institucional
- Pricing comentado dentro do HTML

Total: 19 categorias de problema independentes do briefing original. Cobertura saudável.

---

## Recommended next steps

Em ordem de impacto vs esforço, agrupados em 3 ondas:

### Onda 1 — Limpeza & quick wins (~1-2 dias, S/M)
*Resolve 5 critical issues + ~25 highs/mediums com efeito multiplicador de "atenção a detalhe" alinhado à thesis.*

1. **Deletar tudo o que está morto:** 8 heros órfãos (`hero-1.html`..`hero-8.html`), pricing CSS+HTML comentado, custom cursor (HTML + JS + comment órfão), 26MB ZIP do MMF, `heart-particles.js` (não usado pela home produção), dead CSS de slider/carousel/services/shapes, `.category-filter` orphan, `initParallax`, `initInViewAnimations`. Esperar redução de ~70KB no JS+CSS combinado e remover risco legal do ZIP.
2. **Renomear "Studio" para "About"** no nav das 4 páginas + ambos idiomas. Resolve Top 10 #6 imediatamente.
3. **Adicionar CTA de contato no fim da studio.html.** "Want to work together? — Book a Free Call + Send a Message". Resolve Top 10 #7 parcial.
4. **Padronizar "us" em todas as instâncias** ("Connect with us:", "Tell us about your project...", checkbox PT). Padronizar Calendly em "Book a Free 30-min Call". Padronizar Instagram handle em `pickypixelsstudio`. Padronizar filter "All" / "Todos".
5. **Corrigir `favicon.png` 404** (incluir o arquivo ou apontar para `favicon.ico` existente).
6. **Adicionar acentos a `index.pt.html`** (e meta-tags PT). Resolve Top 10 #3 imediatamente.
7. **Adicionar `aria-hidden="true"` ao `#heartCanvas`** e remover seu `cursor: pointer`.
8. **Adicionar `<label>` aos inputs Name/Email** (visually-hidden se preferir manter design).
9. **Adicionar focus indicators** (1 regra global `:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }`).
10. **Adicionar `@media (prefers-reduced-motion: reduce)`** que desliga heart canvas, fadeInUp, cursor follower (se ainda existir), scroll-behavior smooth.
11. **Remover gradient-text das 4 ocorrências secundárias** (contact-title, page-hero-titles). Manter no máximo 1 uso.
12. **Remover blob blurs `::before/::after`** das page-heros.

### Onda 2 — Componentização & coerência (1-2 semanas, M)
*Resolve os componentes duplicados-mas-divergentes e tokenize o sistema.*

13. **Consolidar `portfolio-item` + `company-card` em UM `work-card`** com variante (web/marketing) — mesmo aspect ratio, mesmo CTA pattern.
14. **Consolidar `image-overlay` + `company-modal` em UM `project-modal`** com hero, contexto, 1 frase problema + 1 solução, galeria condicional. Mover dataset do `script.js` para `projects.js`.
15. **Tokenizar** radii (`--radius-sm: 8`, `--radius-md: 16`, `--radius-lg: 24`, `--radius-pill: 999`), shadows (3 níveis), gradients (1 ou nenhum). Substituir todos os hardcoded.
16. **Adicionar fonte body neutra** (Inter / Geist / General Sans) + manter Syne só para display headings.
17. **Reduzir logo nav para 64px** + nav height para 72px (resolve overflow).
18. **Criar página `contact.html` dedicada** + 1 form único + eliminar `index.html#contact` anchors cross-page.
19. **Reduzir form de 17 opções para 3-chips** (Marketing / Web / Software & Mobile) + textarea aberta.
20. **Reescrever owner-values** (deletar ou substituir por manifesto 2-3 frases sem ícones).
21. **Refazer fotos de equipe** (sessão única OU filtro mono uniforme).
22. **Reescrever section copy genérica** (13 marketing descriptions + 7 web descriptions, conforme findings-D).
23. **Adicionar trust signals** (testimonials reais, logo strip, métricas concretas onde existirem).

### Onda 3 — Repositioning & SEO multilingual (4-6 semanas, L)
*Mudanças estratégicas mais profundas. Recomenda discussão antes de execução.*

24. **Refazer o hero do zero** com 1 ideia visual única (vídeo de processo, frame estático de projeto real, ou ilustração custom) — sem particle network, sem gradient text, sem outline text, sem emoji.
25. **Refazer o logo** (wordmark sóbria que dialogue com a paleta laranja/marrom).
26. **Criar 1-3 case-study pages reais** (`/work/turmeric.html` etc.) com contexto, processo, decisões, métricas.
27. **i18n completa**: criar `portfolio.pt.html`, `services.pt.html`, `studio.pt.html`, `contact.pt.html`, `<title>` PT, meta PT, `hreflang` cross-links, JSON-LD multilingual.
28. **Decidir pricing strategy** (mostrar packages OU dizer "starts from €X" OU campo budget no form).
29. **Reagrupar 27 serviços** em 3 sections × 4-5 cards âncora cada.

### Gap explícito desta auditoria (não coberto)
- **Privacy-policy text content** (EN+PT) não foi auditado contra requisitos GDPR/RGPD. Recomenda-se passe legal específico.
- **SEO técnico aprofundado** (estrutura de URLs, schema completo, sitemap.xml, robots.txt) auditado superficialmente — pode merecer um specialist em SEO.
- **Analytics / GA4 implementação** auditado apenas pela presença do snippet — não pelos eventos rastreados, conversão tracking, ou compliance ePrivacy.
- **Performance real (LCP/CLS/INP medidos)** estimado a partir do markup, não rodado em Lighthouse/PageSpeed. Recomenda-se rodar em produção pós-Onda 1.

---

## Onde os findings detalhados vivem

Cada finding individual tem evidência (file:line ou seletor CSS), problema descrito em 1-3 frases, por-que-importa, recomendação acionável com referência concreta, e esforço S/M/L.

- 🎨 **Visual identity** — 26 findings → [03-findings-A-visual.md](03-findings-A-visual.md)
- 🧭 **UX & Information Architecture** — 25 findings → [03-findings-B-ux.md](03-findings-B-ux.md)
- 🛠 **Code & Components** — 47 findings → [03-findings-C-code.md](03-findings-C-code.md)
- ✍️ **Copy & Brand Voice** — 32 findings → [03-findings-D-copy.md](03-findings-D-copy.md)
- ♿ **Responsive & Accessibility** — 37 findings → [03-findings-E-responsive.md](03-findings-E-responsive.md)

Fase 1 também documentada:
- [01-inventory.md](01-inventory.md) — mapeamento de stack, tokens, componentes, screenshots
- [02-plan.md](02-plan.md) — eixos de avaliação, severity rubric, scoring methodology

---

*Auditoria concluída em 4 fases, 5 subagents paralelos, total 167 findings. Sem nenhuma alteração ao código-fonte feita por esta auditoria.*
