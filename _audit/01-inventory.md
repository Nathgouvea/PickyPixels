# 01 — Inventory & Discovery

Auditoria visual & UX do site **Picky Pixels Studio**. Esta fase é apenas mapeamento — nenhum julgamento ou recomendação ainda. Apenas registro do que existe.

Data: 2026-05-12 · Branch auditado: `feature/add-marketing-services` · Auditor: Sr. Product Designer (Claude).

---

## 1. Stack & Build

- **Tipo**: Site estático HTML/CSS/JS puro. Sem framework, sem bundler, sem build step.
- **Servido por**: GitHub Pages (CNAME presente apontando para `pickypixels.studio`).
- **Dependências externas**:
  - Google Fonts: `Syne` weights 400-800 (única família tipográfica).
  - Font Awesome 6.5.1 via CDN cloudflare (uso pesado de ícones).
  - Google Analytics: `G-JKRYFKT1B4`.
  - Formspree: `formspree.io/f/mpwaajew` (handler de form).
  - Calendly: `calendly.com/nathielle-pickypixels/30min`.
- **Sem package.json, README, CLAUDE.md ou qualquer doc estrutural.**
- **`.gitignore`**: 11 bytes (provavelmente só `.DS_Store`).

## 2. Páginas e rotas

| Rota | Arquivo | Linhas HTML | Função |
|---|---|---|---|
| `/` | `index.html` | 1059 | Home EN — hero + work + about + how-we-help + contact (form) |
| `/index.pt.html` | `index.pt.html` | 1045 | Home PT — versão duplicada em vez de i18n por JS |
| `/portfolio.html` | `portfolio.html` | 558 | Lista de trabalhos (Work) |
| `/services.html` | `services.html` | 604 | 3 categorias de serviço (Marketing/Web/Software) |
| `/studio.html` | `studio.html` | 440 | Sobre o estúdio — manifesto, team, processo |
| `/privacy-policy.html` | 169 | Privacy policy EN |
| `/privacy-policy.pt.html` | 177 | Privacy policy PT |

### Páginas órfãs (presentes no repo, não linkadas em produção):
- `hero-1-gradient-mesh.html` .. `hero-8-cursor-trail.html` — **8 experimentos abandonados** de hero (~6KB cada). O atual (`hero-6-heart-particles.html`) virou a versão produção. Os outros 7 são código morto deployado publicamente.
- `heart-particles.js` (5.2KB) — referenciado pelos heros experimentais; no `index.html` produção a lógica está inline em `script.js`.

## 3. Tokens de design (CSS variables em `styles.css:2-20`)

| Token | Valor | Uso observado |
|---|---|---|
| `--primary` | `#ff5e32` | Laranja queimado — CTAs, links, hovers |
| `--secondary` | `#b9ac38` | Mostarda — usado quase só no canvas heart-particles |
| `--text` | `#5c4033` | Marrom escuro — corpo de texto |
| `--text-light` | `#8b6b5c` | Marrom claro — subtítulos |
| `--background` | `#fff9f0` | Creme — body |
| `--surface` | `#fffaf5` | Creme alt — sections alternadas |
| `--accent` | `#ffd1d9` | Rosa pálido — overlays |
| `--title` | `#ff88be` | Rosa pink — definido mas raramente usado |
| `--spacing-xs..xl` | `0.5/1/2/4/8 rem` | Escala 5 níveis |
| `--border-radius` | `12px` | Definido mas inconsistente no código (12/16/18/32 coexistem) |
| `--transition` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Padrão único |

### Cores hard-coded fora do token system (achadas no `styles.css`)
- `#2d1f1a` (marrom quase-preto) — usado em `.hero-title`, repetido 4+ vezes.
- `rgb(255, 243, 193)` (amarelo creme) — fundo do greeting badge.
- `rgb(122, 59, 0)` (mostarda escura) — cor texto do greeting.
- `rgba(92, 64, 51, 0.06)`, `rgba(92, 64, 51, 0.1)`, `rgba(255, 94, 50, 0.15)` — borders e shadows escritos como rgba do `--text` / `--primary`, sem tokens.
- `linear-gradient(135deg, #ff5e32 60%, #ff88be 100%)` na `.gradient-text` — não tokenizado.

## 4. Tipografia

- **Família única**: `Syne` (display sans serif, com cara de "wonky-grotesque").
- **Pesos carregados**: 400-800 (faixa completa).
- **Escala**: `hero-title` usa `clamp(3rem, 7vw, 5rem)`, `page-hero-title` usa `clamp(2.2rem, 5vw, 3.5rem)` — só dois tamanhos de display. `h2` herda do contexto. `h3` em 1rem (cards). Não há escala tipográfica documentada.
- **`Syne` é usada para body também** — o que dá um efeito de display-text em texto corrido (legibilidade afetada em parágrafos longos).
- **Custom font effects**:
  - `.gradient-text` — webkit-text-fill-color transparent + linear-gradient laranja→rosa.
  - `.outline-text` — webkit-text-stroke 2px + color transparent.
- **Sem fallback declarado**: `font-family: "Syne", sans-serif;` (genérico apenas).

## 5. Estrutura de componentes (identificados via classnames)

### Globais (presentes em todas as páginas)
- `.main-nav` — top fixed 100px height, logo + 4 nav-links + social + lang-switch + hamburger.
- `.mobile-menu` — overlay aberto pelo hamburger.
- `.footer` — logo + tagline + nav repetido + social + copyright + privacy link.
- `.scroll-progress` — progress bar laranja no topo.
- `.cursor` + `.cursor-follower` — custom cursor (presente só na home).

### Home (`index.html` / `index.pt.html`)
- `.hero` + `.hero-split` (1fr 1fr grid) — texto à esquerda + `#heartCanvas` à direita.
- `.section-header` — label + título + subtítulo (padrão das sections).
- `.portfolio-filters` + `.filter-btn` — tabs All / Web Design / Marketing.
- `.portfolio-grid.home-portfolio-grid` — grid de 6 cards (3 web + 3 marketing).
- `.portfolio-item` — card com imagem + badge + h3 + descrição + link "Visit Website".
- `.team-grid` + `.team-member` + `.owner-photo-wrapper` — 3 fotos da equipe.
- `.team-message` + `.owner-values` — bloco texto + 3 cards Personal/Strategic/Collaborative.
- `.services-help` + `.services-grid` (2 colunas) + `.service-category-preview` — preview de 3 categorias com bullets.
- `.contact` section + `.contact-form` Formspree.

### Portfolio (`portfolio.html`)
- `.page-hero` (variante de hero com `::before` e `::after` blobs blur).
- `.portfolio-section` + `.portfolio-grid` — agora com 6 web design items.
- `.company-groups-grid` + `.company-card` — 3 marketing cards (formato DIFERENTE dos web design).
- `.company-modal` + `.company-carousel` + `.carousel-thumbnails` — modal organizado que se abre ao clicar nos cards marketing.
- `.image-overlay` — overlay simples que abre ao clicar nas imagens dos cards web design.
- `.portfolio-contact` — seção contato repetida (variante visual diferente da home).

### Services (`services.html`)
- `.services-category` (3 instâncias, alternando `.services-category-alt`).
- `.category-header` com `.category-icon` (gradient laranja-rosa 64x64).
- `.services-grid-full` + `.service-card-full` — cards redistribuídos por JS em colunas (3/2/1 conforme viewport).
- `.services-note` — alerta amarelo/salmão (1 instância, na seção Web).
- `.service-detail.location-badge` — badges "Available in Porto District only" (3 ocorrências).
- `.services-cta` — CTA final "Not Sure What You Need?".

### Studio (`studio.html`)
- `.page-hero`.
- `.studio-manifesto` + `.studio-note` (card "Great agency websites should already feel like proof.") + `.studio-principles` (3 itens: Taste First / Systems Thinking / Execution Quality).
- `.about` + `.team-grid` — **REPETIÇÃO** da team da home (mesmas 3 fotos, mesmas legendas).
- `.studio-process` + `.studio-steps` — 4 cards numerados 01-04 (Position / Design / Build / Refine).
- `.services-cta` (compartilhada com services.html).

## 6. JavaScript

- **`script.js`** — 1237 linhas, sem módulos, sem comentários estruturais. IIFE de fato. Responsabilidades misturadas:
  - `companyProjects` — dataset hardcoded de Cynergia/Scriptai/MMF (linhas 1-69).
  - `translations` — dicionário EN/PT inteiro inline (linhas 73-~800). Provavelmente >500 chaves.
  - Lógica de language switching baseada em `data-translate` attributes.
  - Filtros de portfolio (`filter-btn` click → mostra/esconde `.portfolio-item`).
  - `image-overlay` handler (linha 913) — abre overlay com a imagem ao clicar nos web cards.
  - `company-modal` handler (linha 1049) — abre carousel com dataset ao clicar nos company cards marketing.
  - `distributeColumns()` (linha 1180) — redistribui cards de service em colunas a cada resize.
  - Cursor follower, scroll progress, fade-in animations.
  - Form Formspree submit handler.
- **`heart-particles.js`** — 173 linhas, IIFE separado. Carregado nos heros experimentais; no production a mesma lógica está embutida no `script.js`.

## 7. Assets / Imagens

### `images/`
- `Nathielle.jpg`, `Rebeca.JPG` *(extensão maiúscula — inconsistente)*, `marcos.jpeg` — fotos da equipe.
- `logo2.png` — logo principal (usado em todas as páginas com `width=120 height=120`).
- Sem `images/favicon.png` referenciado no `<link>` (existe `favicon.ico` na raiz mas o `<link>` aponta para `images/favicon.png` que não existe).

### `Projects/Portfolio-Web /` (note o **espaço no fim do nome do diretório**)
6 imagens entre 1MB-3.5MB — Turmeric (2.4MB), FazUmCafezim (3.5MB jpeg), Gabriella-Tattoo (1.1MB), livingleaving (1.6MB), stegel.pt_ (2MB), isabelvieira.pt_ (1.9MB).

### `Projects/Portfolio-Marketing/`
~40 PNGs entre 100KB-4.5MB. Inclui:
- **`MMF Templates (1).zip` — 26MB sendo servido estaticamente em produção.**
- Nomes inconsistentes: mistura de inglês ("Calendario"), espanhol ("Mesa de trabajo 1"), português ("Prancheta", "Sobre nós"), e numeração crua ("4.png", "5.png", ..., "13.png").
- Vários arquivos com espaços, parênteses e acentos nos nomes (problema potencial de URL encoding).

## 8. Inventário de estados capturados (Claude Preview MCP)

Capturados nos viewports 1280×800 (desktop), 768×1024 (tablet), 375×812 (mobile) + estados interativos.

| # | Página | Viewport | Estado | Achados-chave imediatos |
|---|---|---|---|---|
| 1 | index.html | 1280 | Hero (scroll 0) | "Marketing, Design & Dev With Heart" — Marketing rosa salmão, "With Heart" outline. Lado direito vazio inicialmente (heart particles sem hover). Logo extrapola altura do nav (logo 120px / nav 100px). |
| 2 | index.html | 1280 | Hero + heart hover ativo | Coração formado por web de partículas + linhas conectoras (estilo particles.js / particle network 2017). |
| 3 | index.html | 1280 | Work section (scroll ~900) | Cards "Some of Our Favorite Projects" — 3 web + (3 marketing abaixo). Mesmos cards/textos que aparecem na portfolio.html. |
| 4 | index.html | 1280 | About section (scroll ~2600) | Team "We Think and Build" — 3 fotos com cropping/background/mood totalmente diferentes entre Nathielle (foto-ambiente cortada), Rebeca (foto solo arrumada), Marcos (foto outdoor). |
| 5 | index.html | 1280 | Owner values (scroll ~3400) | 3 cards "Personal / Strategic / Collaborative" com ícones FA heart/lightbulb/handshake — copy genérica ("Designs and strategies that reflect your unique story" / "Creative solutions with purpose" / "Fun and stress-free process"). |
| 6 | index.html | 1280 | How Can We Help (scroll ~4200) | 3 colunas (Marketing/Web/Software) com bullets selecionados. Ícones de categoria com cores diferentes. |
| 7 | index.html | 1280 | Contact form (scroll ~5200) | Form 2-col à direita, "Get in Touch" + email/Schedule à esquerda. Logo bate na borda do nav. "Connect with me:" (singular — "me", não "us"). |
| 8 | index.pt.html | 1280 | Hero PT | "Marketing, Design & Dev com Alma". **Subtítulo PT não é tradução do EN — é mensagem completamente diferente.** "Studio" não traduzido. |
| 9 | portfolio.html | 1280 | Hero | "Work We're Proud Of" — title em 3 partes, "Proud" gradient. |
| 10 | portfolio.html | 1280 | Web cards grid | 6 cards web. Stegel Nails e Isabel Vieira **não têm link "Visit Website"** — assimetria com os outros 4. |
| 11 | portfolio.html | 1280 | Marketing cards | 3 company cards com badge "X projects" + tags — formato visual completamente diferente dos web cards. |
| 12 | portfolio.html | 1280 | Click em Web card | `image-overlay` abre **só a imagem crua**, sem título/descrição/CTA/navegação. X de fechar. |
| 13 | portfolio.html | 1280 | Click em Marketing card (Cynergia) | `company-modal` abre **bem organizada** — título "Grupo Cynergia", carousel com setas prev/next, caption ("Website"), dots, thumbnails strip. |
| 14 | services.html | 1280 | Hero | "Creative Services For Your Brand" — Creative gradient, Brand outline. |
| 15 | services.html | 1280 | Web Design + alerta hosting | Alerta de hosting ocupa quase toda largura, background salmão claro, ícone laranja — visualmente o elemento mais chamativo da seção. |
| 16 | studio.html | 1280 | Hero | "Design Taste, Strategic Thinking, Technical Depth" — last line em gradient. |
| 17 | index.html | 375 | Hero mobile | Greeting badge não aparece no screenshot (animation timing). Lado direito do hero vazio (heart canvas abaixo). |
| 18 | index.html | 375 | Menu mobile aberto | Overlay semi-transparente — texto do hero **visível através**. **Toggle EN/PT some no menu mobile.** Hamburger vira X. |
| 19 | index.html | 768 | Hero tablet | Nav links somem nesse breakpoint — só logo + EN/PT + hamburger. Heart particles centralizado abaixo. |

> **Observação metodológica**: Claude Preview MCP retorna as imagens só em runtime — elas não persistem em disco. O relatório master vai referenciar cada captura por número + seletor CSS / scroll position para que o cliente possa reproduzir.

## 9. Achados macro pré-Fase-2 (para guiar o planning)

Sinais que aparecem em múltiplas dimensões e merecem virar eixos de auditoria:

1. **Inconsistência de tratamento entre categorias** — Web vs Marketing têm card-format, modal-format, link-format diferentes.
2. **Redundância de conteúdo entre páginas** — team aparece na home E no studio com fotos idênticas; cards de projeto aparecem na home E na portfolio com descrições levemente diferentes.
3. **Navegação ambígua** — Logo leva à home, mas "home" não está no menu. "Contact" no menu vira um anchor da home (`index.html#contact`).
4. **Decisões de animação "vintage 2017"** — heart-particles é particle-network, gradient-text é Y2K, outline-text é display gimmick. Coexistem.
5. **Code morto significativo** — 8 heros experimentais, `footer.css` 0 bytes, `--secondary` mostarda usada só num lugar, dezenas de chaves de tradução possivelmente nunca usadas.
6. **Performance — assets gigantes** — múltiplas imagens >1MB sem otimização, um zip de 26MB servido publicamente, Font Awesome inteira via CDN.
7. **i18n meio acabada** — strings traduzidas no `translations.pt` mas algumas seções têm "Connect with me:" em ambos idiomas (não foi traduzido para "Conecte-se comigo:"); subtítulo do hero PT é mensagem completamente diferente do EN.
8. **Acessibilidade — labels de form** — inputs só com `placeholder`, sem `<label>` visível para Your Name / Your Email; outline-text com contraste baixo; greeting badge com `opacity:0` por padrão (acessibilidade da animação).
9. **Hierarquia disfuncional** — alerta de hosting com peso visual maior que os cards de serviço; section labels ("Selected Work", "Meet The Studio") em estilo idêntico ao body text com background pílula pequenina, não criam hierarquia clara.
10. **Branding incongruente com posicionamento** — Studio declara "Design Taste, Strategic Thinking, Technical Depth" mas a página tem 3 ícones FA decorativos sob "Personal/Strategic/Collaborative", emoji `👋` no greeting, "With Heart" outline cursive, e um coração de partículas animado. O site contraria sua própria thesis.

---

**Próximo passo:** Fase 2 — `02-plan.md` com os eixos de auditoria detalhados, e PAUSA para aprovação antes da execução em subagents.
