# 03 — Findings — Agent E (Responsive & A11y)

Auditor: Senior front-end / WCAG 2.1 AA. Cobertura: eixos 6 (Responsividade) e 7 (Acessibilidade).
Verificação executada com `python3 -m http.server` + Claude Preview MCP em viewports 1280×800, 768×1024, 375×812. Razões de contraste calculadas pela fórmula WCAG `(L1 + 0.05) / (L2 + 0.05)` a partir dos hex em `styles.css:2-20` e dos hard-codeds detectados.

A régua aqui não é "bom o bastante para um site qualquer" — é a tese do próprio estúdio em `studio.html`: *"clean front-end… maintainable delivery."* Falhas de A11y básicas como ausência de `<label>` em formulário e zero indicador de foco contradizem isso diretamente.

---

## Resumo executivo (1 parágrafo)

O site **falha pontos elementares** de WCAG 2.1 AA — não há indicador de foco visível em **nenhum** botão/link fora dos inputs do form, dois inputs do form (Name e Email) usam apenas `placeholder` (sem `<label>` nem `aria-label`), o `nav-link-cta` "Contact" e o `portfolio-link` "Visit Website" não atingem 4.5:1 sobre o creme, o `gradient-text` da hero tem partes que ficam em **2.12:1** (falha até AAA-Large), e a tag `outline-text` na hero é praticamente um decorativo, não um título legível. Modais (`image-overlay`, `company-modal`) abrem sem `role="dialog"`, sem `aria-modal`, sem `aria-labelledby` e **sem mover o foco** para dentro deles — usuários de leitor de tela e teclado ficam órfãos. Cards de portfolio web são clicáveis no mouse mas **inacessíveis por teclado** (sem `tabindex`, sem `role="button"`). Não há `prefers-reduced-motion` em nenhum lugar do CSS — partículas do canvas, fade-ins, scale hovers e gradient animation continuam mesmo para usuários com vestibular sensitivity. No lado responsivo, a logo `120×120` extrapola um nav de `100×100` (a 1280) e `80×80` extrapola um nav de `80×80` no tablet (com `text-shadow` decorativo), e o `team-grid` no mobile fica em 2 colunas em vez de 1 por bug de ordem de media query (`max-width:1024` declarada depois de `max-width:768` em `pages.css`). Nada disso é "polish": é o conjunto de coisas que um auditor automatizado ou um usuário usando teclado nota em segundos.

---

## Findings (ordenados por severity)

---

### 🔴 CRITICAL — Zero indicador de foco visível em links, botões, filtros e cards

**Página/Componente:** Toda a aplicação — `.nav-link`, `.btn`, `.filter-btn`, `.lang-btn`, `.hamburger`, `.close-mobile-menu`, `.overlay-close`, `.company-modal-close`, `.carousel-btn`, `.portfolio-link`, `.action-btn`, `.work-link`, `.social-link`, `.nav-social-link`, `.dot`, `.slider-nav`.
**Eixo:** Acessibilidade
**Evidência:** Verificado via `getComputedStyle()`: `.btn-primary` retorna `outline: rgb(255, 255, 255) none 0px; outlineWidth: 0px; boxShadow: none`. Mesma coisa para `.nav-link` (`outline-width: 0px`). Em `styles.css` busca `:focus` retorna **APENAS** 4 ocorrências em todo o codebase: `.contact-form input:focus` (linha 1078), `.package-card:focus-within` (linha 3323) e `.add-on-item:focus-within` (linha 3328) — ambas as últimas em código de pricing comentado/escondido. Não existe um único `:focus-visible` no projeto.
**Problema:** Um usuário navegando por teclado (Tab) não consegue saber em qual elemento está. O foco existe, mas não há nenhum estilo aplicado.
**Por que importa:** WCAG 2.4.7 Focus Visible — Level AA. Bloqueia uso por teclado puro, leitor de tela com foco visível, usuários com mobilidade reduzida (TrackBall, switch), e auditorias automatizadas (axe-core, Lighthouse). ~25% da população usa teclado parcialmente.
**Recomendação:** Adicionar regra global no topo de `styles.css`:
```css
:focus-visible {
  outline: 3px solid #ff5e32;
  outline-offset: 2px;
  border-radius: 4px;
}
.btn:focus-visible,
.filter-btn:focus-visible,
.nav-link:focus-visible,
.submit-btn:focus-visible {
  outline: 3px solid #2d1f1a;
  outline-offset: 3px;
}
```
Remover `outline: none` em `.lang-btn` (`styles.css:1875`) sem substituto.
**Esforço:** S

---

### 🔴 CRITICAL — Inputs Name e Email do form sem `<label>` (e sem `aria-label`)

**Página/Componente:** `index.html:860-880` e `portfolio.html:383-402` → `#name`, `#email`
**Eixo:** Acessibilidade
**Evidência:** Verificado via `preview_eval`: `nameAriaLabel: null`, `nameLabel: undefined`, `nameAriaLabelledby: null`, `namePlaceholder: "Your Name"`. Mesmo para `#email` e `#message`. Apenas `<select id="service">` e `<input id="privacy">` têm `<label for>` apropriados.
**Problema:** Leitores de tela anunciam apenas o tipo do input ("editar texto") sem identificar o que é. O `placeholder` desaparece quando o usuário começa a digitar, perdendo o contexto.
**Por que importa:** WCAG 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions, 4.1.2 Name, Role, Value — todos Level A/AA. Esse é o erro de a11y de form mais conhecido — qualquer auditoria automatizada sinaliza imediatamente.
**Recomendação:** Substituir `placeholder` por `<label>` real (visualmente acima do input) ou no mínimo adicionar `aria-label="Your name"` / `aria-label="Your email"` em ambos. Para manter o visual minimalista, usar visually-hidden label:
```html
<label for="name" class="sr-only" data-translate="form-name-label">Your name</label>
<input type="text" id="name" name="name" required placeholder="Your Name" />
```
e adicionar utility:
```css
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
```
**Esforço:** S

---

### 🔴 CRITICAL — Modais (`image-overlay`, `company-modal`) sem `role`, `aria-modal`, `aria-labelledby` nem focus management

**Página/Componente:** `index.html:1045` (`#image-overlay`), `portfolio.html` (`.company-modal`), `script.js:921-955` (`initImageOverlay`), `script.js:1049-1171` (`initCompanyModal`)
**Eixo:** Acessibilidade
**Evidência:** `preview_eval` no `.company-modal` aberto: `modalAriaModal: null, modalAriaLabelledby: null, modalRole: null, focusOnOpen: ""` (focus permaneceu no body). No `image-overlay`: `tabindex: -1, ariaModal: null, role: null`. JS chama `overlay.classList.add("show")` mas nunca `.focus()` no botão de fechar nem em primeiro elemento focusável; nunca aplica focus trap. Conteúdo de fundo continua tabbable — tab pode levar foco para fora do modal (atrás do backdrop).
**Problema:** Usuário de leitor de tela não recebe sinal de que um diálogo abriu (não há `role="dialog"`/`aria-modal`). Usuário de teclado pode tabular para fora do modal e perder contexto. Nenhum dos dois consegue navegar de forma natural pelo conteúdo do modal.
**Por que importa:** WCAG 4.1.2 Name, Role, Value — Level A. WAI-ARIA Authoring Practices "Dialog (Modal) Pattern" lista 4 requisitos mínimos: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando para um título dentro do modal, mover foco para dentro ao abrir + restaurar ao fechar.
**Recomendação:**
1. Em ambos os modais no HTML: adicionar `role="dialog"` `aria-modal="true"` `aria-labelledby="company-modal-title"` (já existe `id="company-modal-title"` no portfolio).
2. Em `script.js` no `openModal`: salvar `lastFocusedElement = document.activeElement`, adicionar `closeButton.focus()` após abrir; em `closeModal`: `lastFocusedElement?.focus()`.
3. Implementar focus trap: capturar `Tab`/`Shift+Tab` dentro do modal e cycle entre primeiro/último focusável (10 linhas de JS).
4. Para `#image-overlay`: adicionar `role="dialog"` `aria-modal="true"` `aria-label="Image preview"`.
**Esforço:** M

---

### 🔴 CRITICAL — Cards `.portfolio-image` e `.company-card` clicáveis no mouse mas inacessíveis por teclado

**Página/Componente:** `index.html:303-389` (`.portfolio-image`), `portfolio.html` (`.company-card`); handlers em `script.js:926-940` e `script.js:1143-1145`
**Eixo:** Acessibilidade
**Evidência:** `preview_eval`: `.portfolio-image` retorna `tabIndex: -1, role: null` — não está em tabbing order, não tem semântica de botão. JS adiciona `addEventListener("click", ...)` em `<div class="portfolio-image">`. Mesma coisa para `.company-card` (`tabIndex: -1, role: null` em todas as 3 instâncias).
**Problema:** Um usuário só de teclado consegue chegar até a página de portfolio mas não consegue abrir nenhum modal de projeto — eles são literalmente invisíveis para o teclado.
**Por que importa:** WCAG 2.1.1 Keyboard — Level A. WCAG 4.1.2 Name, Role, Value — Level A. Falha bloqueante: o conteúdo principal da página (visualizar projetos do portfolio) é inacessível para teclado.
**Recomendação:** Trocar a `<div class="portfolio-image">` por `<button class="portfolio-image" type="button" aria-label="Open Turmeric Restaurant image">` OU adicionar `tabindex="0" role="button" aria-label="..."` + handler de `keydown` para Enter/Space. Mesma coisa em `.company-card` no `portfolio.html`. Lembrar: trocar `<div>` por `<button>` exige resetar estilo (`background: none; border: none; padding: 0; font: inherit;`).
**Esforço:** M

---

### 🔴 CRITICAL — `gradient-text` "Marketing," tem contraste de 2.12:1 no pixel rosa (falha até AA-Large)

**Página/Componente:** `index.html:246` (`.gradient-text`), `styles.css:215-222`
**Eixo:** Acessibilidade
**Evidência:** Linear-gradient `135deg, #ff5e32 60%, #ff88be 100%` em background `#fff9f0`. Cálculo:
- `#ff88be` (rosa, ponto 100% do gradiente): luminância 0.424 → ratio vs `#fff9f0` (L=0.954) = `(0.954+0.05)/(0.424+0.05)` = **2.12:1**
- `#ff5e32` (laranja, ponto 60%): luminância 0.291 → ratio = `(0.954+0.05)/(0.291+0.05)` = **2.94:1**

Texto "Marketing," é display (clamp 3rem-5rem = 48-80px), portanto qualifica como "large text" para WCAG (≥18.5pt = ~24px = AA-Large 3:1). Mesmo assim, o pixel rosa fica em **2.12:1**, falha até AA-Large.
**Problema:** Os pixels mais à direita da palavra ficam quase invisíveis sobre o fundo creme — usuários com baixa visão e em telas com brilho alto não leem.
**Por que importa:** WCAG 1.4.3 Contrast (Minimum) — Level AA. Para texto grande (≥24px ou ≥18.7px bold) o mínimo é 3:1; o gradient cai abaixo disso na metade rosa.
**Recomendação:** Trocar o gradiente para terminar em uma cor mais escura. Sugestão: `linear-gradient(135deg, #ff5e32 0%, #d63d8a 100%)` (rosa pink mais saturado/escuro) — `#d63d8a` luminância ≈ 0.155 → ratio ~4.0:1, passa AA-Large. Ou abandonar o gradient-text na hero (como recomendaria Eixo 1) e usar fill sólido `#ff5e32` (passa AA-Large 2.94:1 — ainda falha, então precisaria `#a13d18` ou similar). A solução mais limpa é fill sólido `#2d1f1a` (já usado no `.hero-title`), com 14.2:1.
**Esforço:** S

---

### 🟠 HIGH — `outline-text` "With Heart" é apenas stroke 2px sobre cream — texto efetivo é decorativo, não conteúdo

**Página/Componente:** `index.html:250-252` e `services.html:153` (`.outline-text`), `styles.css:224-227`
**Eixo:** Acessibilidade
**Evidência:** `getComputedStyle()`: `color: rgba(0, 0, 0, 0)` (transparente), `-webkit-text-stroke: 2px #2d1f1a`. Os pixels visíveis são apenas o contorno (2px). Em texto de 80px, o miolo da letra fica todo na cor do background (`#fff9f0`). WCAG mede contraste pixel-a-pixel: o stroke escuro tem 14.2:1 mas a área "interior" da letra é 1:1 (cream sobre cream). Para identificar a forma da letra a partir desse outline esticado o usuário precisa de visão central treinada.
**Problema:** Para usuários com baixa visão, dyslexia ou sob brilho alto, "With Heart" lida como linhas decorativas mais do que como palavras. O miolo das letras é invisível.
**Por que importa:** WCAG 1.4.8 Visual Presentation (AAA mas relevante), e o spirit de 1.4.3 — texto deve ser legível. WebAIM e A11y Project tratam outline-only display text como anti-pattern.
**Recomendação:** Trocar `.outline-text` para fill sólido `#2d1f1a` (14.2:1) e usar o stroke como elemento decorativo *adicional* se quiser:
```css
.outline-text {
  color: #2d1f1a;
  /* Mantém vibe display sem comprometer legibilidade */
}
```
Ou alternativamente, se a estética de "esqueleto" for inegociável, aplicar apenas a uma palavra pequena/decorativa, nunca a uma das 3 partes do `<h1>`.
**Esforço:** S

---

### 🟠 HIGH — `--primary` (#ff5e32) com texto branco no `.btn-primary` falha AA Normal (3.08:1)

**Página/Componente:** `.btn-primary`, `.submit-btn`, `.nav-link-cta`, `.portfolio-link`, `.category-see-all`, `.studio-step-number`, footer Privacy Policy link, todos os textos coloridos com `var(--primary)` em fundo claro.
**Eixo:** Acessibilidade
**Evidência:** Cálculo: `#ff5e32` luminância 0.291; branco luminância 1; ratio = `(1+0.05)/(0.291+0.05)` = **3.08:1**. WCAG AA Normal exige 4.5:1; AA Large 3:1. Os botões `.btn-primary` são 1rem (16px) regular ou 700 — **NÃO** qualifica como large text (large = ≥24px ou ≥18.7px bold). Os links como `.portfolio-link` (0.9rem ≈ 14.4px), `.category-see-all` e `.studio-step-number` (0.9rem) também são small text.
**Problema:** Os botões mais visíveis e os CTAs primários — exatamente os elementos que precisam de contraste para conversão — não atingem o mínimo legal.
**Por que importa:** WCAG 1.4.3 Contrast (Minimum) — Level AA. Botão de CTA principal numa página de estúdio que vende qualidade técnica não passar AA é um sinal contraditório com o posicionamento. Em jurisdições como UE (EAA 2025) é obrigatório por lei.
**Recomendação:** Escurecer o `--primary` para `#d94511` ou `#c43d0e`. `#d94511` (217,69,17) luminância ≈ 0.184 → ratio com branco = 1.05/0.234 = **4.49:1** — beira o AA. `#c43d0e` (196,61,14) luminância ≈ 0.146 → ratio = 1.05/0.196 = **5.36:1** — passa folgado. Aplicar globalmente; `#c43d0e` ainda é claramente "laranja queimado".
Alternativa cirúrgica: manter `--primary` para acentos/superfícies decorativas, mas usar uma variável `--primary-text: #c43d0e` para qualquer ocorrência de cor *no texto*.
**Esforço:** S (uma variável, recompila instantaneamente)

---

### 🟠 HIGH — Sem `@media (prefers-reduced-motion: reduce)` em nenhum lugar do CSS

**Página/Componente:** Site inteiro. Animações que precisam ser desligadas: `fadeInUp` (greeting, portfolio-item, package-card), `float` (`.shape-1/2/3` no hero, `.packages-cta::before`), `pulse`, `transform: scale/translateY` em hover, `cursor follower` (mousemove animation), `scroll-progress` width transition, `heart-particles` no canvas, `transition: 0.5s cubic-bezier ...` em `.work-slider`.
**Eixo:** Acessibilidade
**Evidência:** `grep -n "prefers-reduced-motion" styles.css pages.css` retorna zero ocorrências. As animações no `.shape-*` rodam infinitas (`animation: float 8s/12s/10s ease-in-out infinite`); o canvas `#heartCanvas` requestAnimationFrame contínuo; cursor-follower ouve `mousemove` 60Hz.
**Problema:** Usuários com vestibular disorder, ADHD, autismo, ou simplesmente com a preferência ativada no SO continuam recebendo movimento contínuo. Em casos extremos pode causar náusea ou desorientação.
**Por que importa:** WCAG 2.3.3 Animation from Interactions (AAA, mas considerada boa prática), e mais importante: 2.2.2 Pause, Stop, Hide (AA) — animações em loop que duram >5s precisam de mecanismo para pausar (as `float` rodam infinitamente). 2.3.1 Three Flashes (A) é OK pois não há flash.
**Recomendação:** Adicionar bloco no fim de `styles.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .shape-1, .shape-2, .shape-3 { animation: none; }
  .cursor, .cursor-follower { display: none; }
}
```
E em `script.js` no início do `initHeartParticles`/`initCustomCursor`:
```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```
**Esforço:** S

---

### 🟠 HIGH — Logo `120×120px` extrapola o nav `100×100` em desktop (e `80×80` extrapola nav 80px no tablet)

**Página/Componente:** `.main-nav` (`styles.css:60-79`), `.nav-brand .logo img` (`styles.css:89-93`)
**Eixo:** Responsividade
**Evidência:** A 1280px: `nav.height = 100px, logo.height = 120px, nav.bottom = 100, logo.bottom = 109.5` → logo vaza **9.5px abaixo** da borda inferior do nav. A 768px (regra `@media max-width: 768px` linha 1968-1977 baixa nav e logo para 80px): `nav.height = 80, logo.height = 80, logo.bottom = 79.5, nav.bottom = 80` — neutro mas o logo ocupa 100% da altura sem respiração; com `text-shadow` e os outros elementos, na prática o logo "encosta" no chão do nav.
**Problema:** O elemento "marca" é o que extrapola seu próprio container — sinal subliminar de descuido. Como `.main-nav { overflow: visible; backdrop-filter: blur(12px); border-bottom: 1px solid }` o vazamento é visualmente perceptível e o blur do nav é seccionado pela imagem que sai.
**Por que importa:** Não é WCAG, é polish. Mas o estúdio se posiciona como "judgment, technical polish" — o lockup do logo desalinhado contradiz isso. Em viewports menores (entre 480 e 768) o problema também é evidente.
**Recomendação:** Padronizar logo nav em `60×60px` (altura), com nav `80px`. Atualizar `styles.css:90` `.nav-brand .logo img { height: 60px }` e `styles.css:73` `.main-nav { height: 80px; }`. Reduzir `padding-top` `scroll-padding-top` em `html` para `80px`. Remover `min-height/max-height` triplicados (linhas 74-75) — usar só `height`.
**Esforço:** S

---

### 🟠 HIGH — `team-grid` no mobile (375px) renderiza em 2 colunas em vez de 1 — bug de ordem das media queries

**Página/Componente:** `pages.css:812-832, 913-923, 965-973`
**Eixo:** Responsividade
**Evidência:** `preview_eval` em 375×812: `getComputedStyle('.team-grid').gridTemplateColumns: "139.5px 139.5px"` (2 colunas, com 3ª foto orfã na linha de baixo). Causa: em `pages.css` a regra `.team-grid { grid-template-columns: 1fr }` está em `@media (max-width: 768px)` linha 913. **Depois** dela há `@media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2, 1fr) } }` linha 965. Ambas casam em 375px; pela cascata CSS (mesma especificidade, regra posterior vence), `repeat(2, 1fr)` ganha. O `max-width: 350px` salva a horizontal mas o layout fica errado.
**Problema:** No mobile vê-se 2 fotos lado a lado e a 3ª sozinha embaixo — quebra a simetria do "trio fundador".
**Por que importa:** Bug funcional + WCAG não está envolvido, mas o "rule order matters" é exatamente o tipo de coisa que deve estar correta num site que diz "judgment, technical polish, maintainable delivery". Mobile-first ou DESC ordering — o autor escolheu DESC mas não respeitou.
**Recomendação:** Reordenar as media queries em `pages.css` linhas 913 e 965 para que `max-width: 1024` venha **antes** de `max-width: 768`. Ou migrar para mobile-first (`min-width:`). Idealmente a regra do team-grid fica em UMA media query: `@media (max-width: 768px) { .team-grid { grid-template-columns: 1fr; max-width: 350px; } }`.
**Esforço:** S

---

### 🟠 HIGH — Cursor custom (`.cursor` + `.cursor-follower`) é JS dead-code visualmente (positions static, sem dimensões) e degrada performance

**Página/Componente:** `index.html:133-134`, `script.js:604-631`, CSS — não há classes `.cursor` ou `.cursor-follower` definidas em `styles.css` (apenas comentário `/* Custom Cursor */` linha 57)
**Eixo:** Responsividade + A11y
**Evidência:** `preview_inspect`: `.cursor-follower` retorna `width: 1265px, height: 0px, position: static, pointer-events: auto` — o elemento existe no DOM, recebe handlers de `mousemove` (60Hz) que escrevem `.style.left/.top` continuamente, e adicionalmente `mouseenter/mouseleave` em **cada `<a>` e `<button>`** da página (`script.js:620-630`) que fazem `.style.transform = 'scale(1.5)'`. Mas como os elementos não têm CSS `position: fixed`, `width`, `height` ou `background`, **nada aparece visualmente**. Pure performance overhead.
**Problema:** JS executando sem benefício. Em desktop sem reduced-motion, mousemove 60Hz multiplicado por 30+ event listeners = micro-jank desnecessário. Em touch device, `mouseenter`/`mouseleave` ainda assim disparam em iOS/Android com touch.
**Por que importa:** Eixo Performance + Eixo Code Quality. Para A11y: cursor custom geralmente esconde o cursor do SO (`html { cursor: none }`) e quebra usuários que dependem do cursor visual nativo (low vision, magnifier users). No caso aqui, como nada é renderizado, a acessibilidade não é prejudicada — mas o code é morto.
**Recomendação:** Remover os elementos `<div class="cursor">` e `<div class="cursor-follower">` do HTML (em `index.html`, `index.pt.html`, e qualquer outra página). Remover `initCustomCursor()` de `script.js` (linhas 604-631 + chamada em 1222). Remover comentário `/* Custom Cursor */` de `styles.css:57`.
**Esforço:** S

---

### 🟠 HIGH — Heart canvas com `cursor: pointer` mas não é clicável (false affordance) e sem `aria-hidden`

**Página/Componente:** `index.html:271` (`#heartCanvas`), `styles.css:241-248`
**Eixo:** Acessibilidade
**Evidência:** `preview_eval`: `canvasCursor: "pointer", canvasAriaHidden: null, canvasRole: null, canvasTabindex: undefined`. CSS `#heartCanvas { cursor: pointer }` mas em `script.js`/`heart-particles.js` o canvas só responde a `mousemove` (atrai partículas). Nenhum `click` handler. No DOM o canvas está apenas para visual.
**Problema:** O cursor-pointer cria expectativa de ação em mouse users — eles clicam, nada acontece. Para leitores de tela, o `<canvas>` vazio sem `aria-hidden` pode ser anunciado como "canvas" sem contexto.
**Por que importa:** WCAG 3.2.4 Consistent Identification (AA) — cursor-pointer deveria sinalizar interatividade real. Para a11y: 1.1.1 Non-text Content (A) — canvas decorativo precisa de `aria-hidden="true"`.
**Recomendação:** Em `styles.css:241-248`: trocar `cursor: pointer` por `cursor: default` (ou remover a regra). No HTML adicionar `aria-hidden="true" role="presentation"`:
```html
<canvas id="heartCanvas" aria-hidden="true" role="presentation"></canvas>
```
**Esforço:** S

---

### 🟠 HIGH — Toggle EN/PT desaparece dentro do mobile menu (apenas no nav top fica)

**Página/Componente:** `index.html:198-236` (`.mobile-menu`), `styles.css:2248-2250` (`.mobile-language-switch { display: none !important }`)
**Eixo:** Responsividade + UX
**Evidência:** `preview_eval` no mobile menu aberto: `mobileLangPresent: false, mobileSocialPresent: true`. No HTML do `.mobile-menu-content` há `.mobile-nav-links` e `.mobile-nav-social`, mas **não há language-switch**. A regra CSS `.mobile-language-switch { display: none !important }` confirma intenção de esconder, e o elemento sequer existe no DOM.
**Problema:** Ao abrir o menu em mobile, o usuário perde o seletor EN/PT (que continua visível no nav top mas comprimido junto com o hamburger). A intenção pareceria ser duplicá-lo dentro do menu — não foi implementado, e a regra CSS de esconder está sem efeito.
**Por que importa:** UX — usuário que abriu o menu para procurar a opção de idioma não encontra. Acessibilidade: usuários de teclado dentro do menu mobile não têm acesso ao toggle sem fechar o menu.
**Recomendação:** Adicionar dentro de `.mobile-menu-content` no HTML (após `.mobile-nav-social`):
```html
<div class="language-switch mobile-lang-inline">
  <button class="lang-btn active" data-lang="en">EN</button>
  <button class="lang-btn" data-lang="pt">PT</button>
</div>
```
e remover a regra inútil `.mobile-language-switch { display: none !important }` em `styles.css:2248-2250`.
**Esforço:** S

---

### 🟠 HIGH — Lang button inativo é 20×17px — muito abaixo do mínimo WCAG 2.5.5

**Página/Componente:** `.lang-btn:not(.active)` (`styles.css:1865-1877`)
**Eixo:** Acessibilidade + Responsividade
**Evidência:** `preview_inspect` em mobile: `boundingBox: {width: 20.4375, height: 17}`. WCAG 2.5.5 Target Size (AAA) recomenda 44×44; AA 2.5.8 (WCAG 2.2) Target Size (Minimum) exige 24×24px. Falha ambos.
**Problema:** Em mobile, mudar idioma exige toque preciso num retângulo de 20×17px — fácil errar e tocar no botão ativo (que não faz nada).
**Por que importa:** WCAG 2.5.8 Target Size (Minimum) — Level AA na WCAG 2.2. Usuários com motor impairment, em mobilidade, em telas menores ou com touchscreen impreciso falham.
**Recomendação:** Aumentar padding de `.lang-btn`. Atual: `padding: 0.35rem 1.1rem` (5.6px vertical). Trocar para `padding: 0.6rem 1rem` mínimo (~24px de altura final). Ou explicitar `min-width: 32px; min-height: 32px;`. Ainda melhor: usar dois botões separados de 44×44 em mobile.
**Esforço:** S

---

### 🟠 HIGH — `--text-light` (#8b6b5c) só passa AA com folga de 0.15 (4.65:1 vs 4.50)

**Página/Componente:** `--text-light` usado em: `.hero-subtitle`, `.section-description`, `.section-subtitle`, `.contact-info p`, `.work-content p`, `.copyright`, `.services-help-content p`, `.studio-note p`, `.studio-step p`, `.portfolio-content p`, `.team-message p`, dezenas de outros parágrafos. (`styles.css:6`)
**Eixo:** Acessibilidade
**Evidência:** Cálculo: `#8b6b5c` (139,107,92) luminância 0.166; `#fff9f0` luminância 0.954. Ratio = `(0.954+0.05)/(0.166+0.05)` = **4.65:1**. Passa AA Normal (≥4.5) por 0.15. Em `--surface (#fffaf5)` ratio cai para **4.62:1**. Em rgba(255,243,193,0.3) blend = ~#fff7d7 → ratio ~4.55:1. Margem é mínima — qualquer ajuste de luminância (image overlay, semi-transparent backgrounds, theme switch) facilmente derruba abaixo de 4.5.
**Problema:** Tecnicamente passa. Mas a margem de erro é tão pequena que qualquer iteração de design pode quebrar — é frágil.
**Por que importa:** WCAG 1.4.3 Contrast (Minimum) — Level AA. Pessoas com baixa visão precisam de margem.
**Recomendação:** Escurecer `--text-light` de `#8b6b5c` para `#6b4f3a` (107, 79, 58) — luminância 0.0855 → ratio com `#fff9f0` = 1.004/0.135 = **7.4:1**. Mantém a "vibe marrom claro" mas com folga AA + começa a passar AAA Normal (≥7).
**Esforço:** S

---

### 🟡 MEDIUM — Logo Picky Pixels Studio anunciado 2x por leitor de tela em cada página (nav + footer)

**Página/Componente:** `.nav-brand .logo img alt="Picky Pixels Studio Logo"` (`index.html:147`), `.footer-brand .logo img alt="Picky Pixels Studio Logo"` (`index.html:987`). Repetido nas 5 páginas.
**Eixo:** Acessibilidade
**Evidência:** `preview_eval`: `logoAltCount: 2` por página; total nas 5 páginas = 10 ocorrências do mesmo `alt`.
**Problema:** Leitor de tela anuncia "Picky Pixels Studio Logo, link" no nav e novamente "Picky Pixels Studio Logo, image" no footer. Ruidoso.
**Por que importa:** WCAG 1.1.1 Non-text Content — Level A. Imagem que duplica info que já é texto adjacente (no footer há também `<p>Helping small brands...`) ou cuja função já é nav (logo no nav é o link "home") deve ter alt vazio ou complementar.
**Recomendação:**
- Logo do nav: como o `<a>` envolve só o `<img>` e atua como "ir para home", trocar para `alt=""` e adicionar `aria-label="Picky Pixels Studio - Home"` no `<a>`. Resultado: SR diz "Picky Pixels Studio - Home, link".
- Logo do footer: é decorativo (já há `<p>` de descrição abaixo). Trocar para `alt=""`.
**Esforço:** S

---

### 🟡 MEDIUM — Nav "Contact" com `var(--primary)` em fundo cream falha contraste (3.05:1)

**Página/Componente:** `.nav-link-cta` (`styles.css:126-138`), `index.html:156-158`
**Eixo:** Acessibilidade
**Evidência:** Cor `--primary #ff5e32` em background `rgba(255,249,240,0.97)` ≈ `#fff9f0`. Ratio **3.08:1** (mesmo cálculo do `.btn-primary` solid). Font-size do nav-link é 1rem regular (16px) — small text. AA Normal exige 4.5:1.
**Problema:** O CTA do menu — o link mais importante para conversão — não passa contraste para texto small.
**Por que importa:** WCAG 1.4.3. CTA de contato afeta diretamente conversão.
**Recomendação:** Resolver junto com a recomendação de escurecer `--primary` (HIGH acima). Alternativa local: aumentar peso para `font-weight: 700` E aumentar font-size para 1.1rem nesse link específico — não resolve contraste mas melhora "large text" qualifications. A solução real é trocar a cor.
**Esforço:** S (junto com `--primary`)

---

### 🟡 MEDIUM — Botão hover `#e54d1a` em pricing CTA falha AA Normal (3.89:1)

**Página/Componente:** `.cta-buttons .btn-primary:hover` (`styles.css:3024-3029`) — código atualmente comentado/escondido (`<!-- PRICING SECTION HIDDEN -->` em `index.html:638`) mas presente no CSS.
**Eixo:** Acessibilidade
**Evidência:** Cor `#e54d1a` (229, 77, 26) sobre branco. Luminância 0.220 → ratio = 1.05/0.270 = **3.89:1** falha AA Normal.
**Problema:** Se a seção de pricing voltar (referido em `index.html:638` "uncomment to restore"), o estado hover vai falhar.
**Por que importa:** WCAG 1.4.3. Hover state também precisa passar contraste.
**Recomendação:** Quando descomentar pricing, trocar hover para `#c43d0e` (5.36:1).
**Esforço:** S

---

### 🟡 MEDIUM — `rgb(122, 59, 0)` greeting badge passa contraste mas está hard-coded (não tokenizado)

**Página/Componente:** `.greeting`, `.section-label`, `.contact-label`, `.packages-label`, `.contact-form .form-group label` — todos usam `color: rgb(122, 59, 0)` ou `#7a3b00` em fundo `rgb(255, 243, 193)` / `#fff3c1`.
**Eixo:** Acessibilidade (passa) + Code Quality
**Evidência:** Cálculo: ratio `7.69:1`. Passa AA Normal e AAA Normal. Mas a cor está hard-coded em **8+ lugares**.
**Problema:** Padrão funcional de a11y mas frágil — se alguém alterar uma das ocorrências do hex sem entender o cálculo, contraste pode quebrar.
**Por que importa:** Manutenibilidade. Estúdio que vende "maintainable delivery" precisa demonstrar isso.
**Recomendação:** Tokenizar como `--badge-bg: #fff3c1; --badge-text: #7a3b00;` em `:root` e substituir todas as ocorrências.
**Esforço:** S

---

### 🟡 MEDIUM — `<a href="#">` no logo com `onclick="window.scrollTo()"` em vez de `<a href="#top">` ou `<a href="/">`

**Página/Componente:** `index.html:142-150` (e demais páginas)
**Eixo:** Acessibilidade
**Evidência:** `<a href="#" class="logo" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">`. `href="#"` adiciona `#` na URL (history pollution); o `onclick` faz o scroll mas não previne o default behavior.
**Problema:** Usuários de teclado pressionam Enter no logo, o link sobe a página, mas o URL ganha um `#` extra. Em páginas internas (services, studio, portfolio) o logo com `href="#"` não vai para home — fica na mesma página com `#` no fim.
**Por que importa:** WCAG 2.1.1 Keyboard, 4.1.2 Name/Role/Value (link sem destino real). Padrão UX universal: logo do header **sempre vai para a home**.
**Recomendação:** Em todas as páginas trocar para `<a href="/" class="logo">` (sem o `onclick`). Em `index.html`/`index.pt.html` (que são a "home"), o `<a href="/">` retorna ao topo naturalmente — ou usar `<a href="#top">` se quiser smooth-scroll, com `<div id="top"></div>` na top da `<body>`.
**Esforço:** S

---

### 🟡 MEDIUM — Filter buttons (.filter-btn) sem keyboard arrow navigation no role="tablist"

**Página/Componente:** `.portfolio-filters [role="tablist"]` em `index.html:294-298` e `portfolio.html:165-169`
**Eixo:** Acessibilidade
**Evidência:** HTML tem `role="tablist"` e cada button tem `role="tab" aria-selected="true|false"`. No JS (`script.js:989-991`) há apenas `addEventListener("click", ...)` — nenhum `keydown` para Arrow Left/Right/Home/End.
**Problema:** WAI-ARIA Authoring Practices (Tabs Pattern) exige que tablist responda a Arrow keys para navegar entre tabs. Atualmente o usuário precisa fazer Tab para sair do "All" e ir até "Web Design", o que viola o padrão tablist (Tab deveria mover para fora do tablist; Arrow keys deveriam mover entre tabs).
**Por que importa:** Inconsistência semântica: declarar role="tablist" implica contrato com AT que não está cumprido. Pode ser pior que não declarar.
**Recomendação:** Duas opções:
1. **Implementar keyboard nav** (mais correto): em `script.js`, no `applyFilter`, adicionar `keydown` listener para `ArrowRight` (próximo botão), `ArrowLeft` (anterior), `Home` (primeiro), `End` (último), com gerenciamento de `tabindex="0"` apenas no tab ativo.
2. **Remover role="tablist"** se não for implementar — passar a usar `<div role="group" aria-label="Filter projects">` com botões normais.
Recomendação: implementar (opção 1) — 20 linhas de JS.
**Esforço:** M

---

### 🟡 MEDIUM — `nav-social-link` 32×32px abaixo do recomendado AAA (44px) — passa AA mínimo (24px)

**Página/Componente:** `.nav-social-link`, `.footer-social a` (`styles.css:154-165, 1421-1432`)
**Eixo:** Acessibilidade + Responsividade
**Evidência:** `preview_inspect` em desktop: `width: 32px, height: 32px`. WCAG 2.5.8 (AA) mínimo é 24×24 — passa. AAA 2.5.5 recomenda 44×44 — não atinge. Em mobile (768px) `nav-social-link` cai para 28×28px (`styles.css:1991-1995`) — ainda passa AA mínimo.
**Problema:** Não é falha bloqueante, mas em mobile com 28×28px e ícones de 1.1rem (17.6px), o tap precision é apertado (especialmente no triplete WhatsApp + Email + Instagram colado).
**Por que importa:** UX em mobile. Não é fail WCAG AA mas afeta usuários com motor impairment.
**Recomendação:** Aumentar para 40×40px (mais perto de AAA 44 sem deformar o nav) ou aceitar 32×32 e adicionar `padding` invisible ao redor. Como já são `border-radius: 50%`, expandir mantendo o ícone visualmente do mesmo tamanho.
**Esforço:** S

---

### 🟡 MEDIUM — `prefers-color-scheme` não tratado — site sempre claro mesmo em dark mode do SO

**Página/Componente:** Site inteiro
**Eixo:** Acessibilidade + Responsividade
**Evidência:** `grep prefers-color-scheme` retorna zero. Não há suporte a dark mode.
**Problema:** Usuários que preferem dark mode no SO recebem o tema claro com "flash" branco. Não é fail WCAG, mas é prática esperada em 2026.
**Por que importa:** UX consistency. Usuários com fotofobia / sensibilidade a brilho dependem de dark mode.
**Recomendação:** Não obrigatório, mas se for endereçar: definir variáveis dark em `@media (prefers-color-scheme: dark) { :root { --background: #1a1410; --text: #e8d8c8; ... } }`. Esforço grande pois cada hex hard-coded precisa de variant. **Recomendação realista**: deixar para v2; documentar como decisão consciente.
**Esforço:** L (não fazer agora)

---

### 🟡 MEDIUM — Mobile menu overlay 98% opaco — texto do hero "vaza" minimamente atrás

**Página/Componente:** `.mobile-menu` (`styles.css:2200, 2389`)
**Eixo:** Responsividade + UX
**Evidência:** `preview_eval` no menu aberto: `menuBg: "rgba(255, 249, 240, 0.98)"`. 2% de transparência sobre o hero (com `outline-text` de stroke escuro) cria percepção sutil de bleeding.
**Problema:** Pequena perda de legibilidade do texto branco sobre fundo creme com hero atrás. Nada crítico, mas o usuário "sente" o nervosismo do fundo.
**Por que importa:** Detalhe de UX. Se a intenção era "modal opaco completo", deveria ser 100%; se era "overlay translúcido com blur", deveria ter `backdrop-filter: blur(20px)` adicional.
**Recomendação:** Trocar `rgba(255, 249, 240, 0.98)` por `rgb(255, 249, 240)` (sólido) — ou manter rgba e adicionar `backdrop-filter: blur(20px) saturate(1.2)` para um glassmorphism intencional. As duas opções são defensáveis. Para um estúdio sério: **opaco sólido é mais limpo**.
**Esforço:** S

---

### 🟡 MEDIUM — `<i class="fas fa-...">` ícones sem `aria-hidden="true"` (34 ocorrências em index.html)

**Página/Componente:** `<i class="fas|far|fab fa-*">` em todos arquivos HTML
**Eixo:** Acessibilidade
**Evidência:** `preview_eval`: `totalFAIcons: 34, withAriaHidden: 0`. FontAwesome usa pseudo-elementos `::before` com `content: "\f..."` — esse texto técnico **não** é exposto a AT pela maioria dos screen readers, mas pode aparecer em audits e em alguns SR (NVDA antigos, JAWS configurações específicas).
**Problema:** Verbose, baixo risco. Padrão recomendado pela documentação oficial do FontAwesome é incluir `aria-hidden="true"`.
**Por que importa:** Boa prática WCAG 1.1.1. Auditorias automatizadas frequentemente sinalizam.
**Recomendação:** Adicionar `aria-hidden="true"` em todos os `<i class="fa..."`. Em códigos com muito ícone, o `<i>` é puramente decorativo (sempre acompanhado de texto adjacente como "View Our Work" ou `aria-label` no parent). Substituir em batch:
```bash
# regex: <i class="(fab|far|fas) → <i aria-hidden="true" class="$1
```
Aplicar em `index.html`, `index.pt.html`, `portfolio.html`, `services.html`, `studio.html`.
**Esforço:** S

---

### 🟡 MEDIUM — `lang-btn` sem `aria-pressed` ou indicador semântico de estado ativo

**Página/Componente:** `.lang-btn` (`index.html:189-192`), JS em `script.js:687-717`
**Eixo:** Acessibilidade
**Evidência:** HTML: `<button class="lang-btn active" data-lang="en">EN</button>` — apenas a classe `.active` indica estado. Sem `aria-pressed` nem `aria-current`. Para AT, ambos os botões parecem idênticos.
**Problema:** Usuário de leitor de tela não sabe qual idioma está ativo.
**Por que importa:** WCAG 4.1.2 Name, Role, Value — Level A. Estado de toggle precisa ser anunciado.
**Recomendação:** No HTML inicial e no JS `switchLanguage`: adicionar `aria-pressed="true|false"` nos botões. Ex: `<button class="lang-btn active" data-lang="en" aria-pressed="true">EN</button>`. No JS, em vez de `btn.classList.toggle("active", ...)`, também `btn.setAttribute("aria-pressed", String(isActive))`.
**Esforço:** S

---

### 🟡 MEDIUM — `.greeting` badge usa `opacity: 0` + `animation: forwards fadeInUp` — se JS/CSS falhar, fica invisível para sempre

**Página/Componente:** `.greeting` (`styles.css:193-205`), `index.html:242-244`
**Eixo:** Acessibilidade + Responsividade
**Evidência:** CSS: `opacity: 0; animation: 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards fadeInUp;`. Se animation não rodar (CSP bloqueando, browser antigo, motion-reduced sem fallback no estado final), o badge fica em `opacity: 0` para sempre.
**Problema:** Estado padrão "invisível" com fallback dependente de animação completar. Se houver erro de timing ou de browser support, o `👋 Hey there, we're Picky Pixels!` simplesmente não aparece. Conteúdo **não** essencial, mas é o primeiro elemento visível na hero.
**Por que importa:** WCAG 1.3.1 Info and Relationships, principle Robust. Conteúdo deve estar acessível independente de animação.
**Recomendação:** Mover `opacity: 0; transform: translateY(30px)` para dentro de `@keyframes fadeInUp from {...}` apenas — e definir o estado base como `opacity: 1`. Garantir que mesmo sem animação rodar o conteúdo apareça.
```css
.greeting {
  /* opacity: 1; default */
  animation: 0.8s cubic-bezier(0.4, 0, 0.2, 1) fadeInUp;
}
```
**Esforço:** S

---

### 🟡 MEDIUM — Imagens grandes (1MB-3.5MB) entregues a mobile sem `srcset`/`sizes`

**Página/Componente:** Todas as `<img>` em `index.html:305-389`, `portfolio.html`. Ex: `Projects/Portfolio-Web /Turmeric-Pakistani-Indian Restaurant-Porto-Portugal.webp` declarada `width="800" height="600"` mas o arquivo é 2.4MB.
**Eixo:** Responsividade + Performance
**Evidência:** No HTML, cada `<img>` tem só `src=` (uma versão única). Em mobile 375px o card ocupa ~280px e ainda assim baixa o arquivo full-size.
**Problema:** Usuários de mobile com 4G/3G recebem dezenas de MB de imagens. WCAG 1.4.10 Reflow não é violado mas a UX em data limitada é ruim.
**Por que importa:** Performance afeta acessibilidade indiretamente — usuários com cognitive disability e em conexões lentas abandonam.
**Recomendação:** Implementar `srcset` + `sizes`:
```html
<img
  src="Projects/Portfolio-Web/turmeric-800w.webp"
  srcset="Projects/Portfolio-Web/turmeric-400w.webp 400w,
          Projects/Portfolio-Web/turmeric-800w.webp 800w,
          Projects/Portfolio-Web/turmeric-1600w.webp 1600w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="..." />
```
Gerar 3 sizes via `cwebp` no build (mesmo sem build step, gerar manual com sharp/cwebp CLI). Espaço no nome do diretório `Portfolio-Web /` precisa ser corrigido (URL encoding `%20` quebra alguns CDNs).
**Esforço:** M

---

### 🟡 MEDIUM — `text-shadow: 0 2px 8px #fff9f0` no hero-title é ruído (sombra invisível em fundo da mesma cor)

**Página/Componente:** `.hero-title`, `.gradient-text`, `.owner-role`, `.page-hero-title` (`styles.css:212, 221, 743, 753`; `pages.css:54`)
**Eixo:** Responsividade + Code Quality
**Evidência:** `text-shadow: 0 2px 8px #fff9f0` — cor da sombra é igual ao `--background`. Resultado visual: zero sombra perceptível.
**Problema:** Provavelmente uma tentativa de criar "halo" leve para legibilidade do gradient — mas usar a mesma cor do background neutraliza o efeito. Code morto visualmente.
**Por que importa:** Maintainability. Quando alguém quiser mudar background, o text-shadow vira problema oculto.
**Recomendação:** Remover as 4-5 ocorrências de `text-shadow: 0 2px 8px #fff9f0`. Se a intenção era contraste do gradient (resolvido via Eixo 1 já), substituir por `text-shadow: 0 1px 2px rgba(0,0,0,0.1)` em hero-title se necessário.
**Esforço:** S

---

### 🟢 LOW — `cursor: pointer` em `.package-features li` e `.add-on-item` (pricing) sugere ação que não existe

**Página/Componente:** `styles.css:3314-3320`
**Eixo:** Acessibilidade
**Evidência:** `.package-features li { cursor: pointer; }` e `.add-on-item { cursor: pointer; }`. Nenhum handler de click associado em `script.js`. Há hover effect (`transform: translateX(5px); color: var(--primary)`) mas sem ação real.
**Problema:** False affordance similar ao do canvas. Como pricing está atualmente comentado, baixo impacto.
**Por que importa:** WCAG 3.2.4 Consistent Identification.
**Recomendação:** Quando descomentar pricing: trocar `cursor: pointer` por `cursor: default`, ou adicionar handlers reais que abrem detalhes do feature.
**Esforço:** S

---

### 🟢 LOW — Form submit message (`#form-message`) sem `role="status"` ou `aria-live`

**Página/Componente:** `index.html:950-953`, `script.js:889-893`
**Eixo:** Acessibilidade
**Evidência:** `<div id="form-message">` recebe `textContent` de sucesso/erro via JS (`script.js:889 messageElement.style.color = "green"; messageElement.textContent = "..."`). Sem `role="status"` (cordial) ou `role="alert"` (assertivo) nem `aria-live`.
**Problema:** Quando o form é enviado, a mensagem aparece mas leitor de tela não anuncia.
**Por que importa:** WCAG 4.1.3 Status Messages — Level AA. Status changes precisam ser anunciados sem mover foco.
**Recomendação:** Trocar `<div id="form-message">` por `<div id="form-message" role="status" aria-live="polite" aria-atomic="true">`.
**Esforço:** S

---

### 🟢 LOW — Foco do form input só altera border de `rgba(92,64,51,0.1)` para `var(--primary)` — efeito sutil

**Página/Componente:** `.contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus` (`styles.css:1078-1084`)
**Eixo:** Acessibilidade
**Evidência:** `outline: none; border-color: var(--primary); box-shadow: 0 5px 15px rgba(255, 94, 50, 0.1);`. Border fina (1px) + box-shadow 10% opacity — visualmente leve.
**Problema:** Existe foco visível, mas é discreto demais. Combinado com a remoção do `outline` default, usuários com baixa visão podem ter dificuldade.
**Por que importa:** WCAG 2.4.7 Focus Visible — passa tecnicamente mas margem.
**Recomendação:** Aumentar contraste do focus state: `outline: 2px solid var(--primary); outline-offset: 2px; box-shadow: 0 0 0 4px rgba(255, 94, 50, 0.2);`. Garante 3:1 sobre background.
**Esforço:** S

---

### 🟢 LOW — `.scroll-progress` barra é puramente decorativa mas tem `z-index: 1001`, sobreposto a `aria-hidden`

**Página/Componente:** `.scroll-progress` (`styles.css:1199-1214`)
**Eixo:** Acessibilidade
**Evidência:** Barra fixed top, sem `aria-hidden`. Não recebe foco mas leitor de tela pode anunciar como "região vazia".
**Problema:** Conteúdo decorativo sem semântica.
**Por que importa:** WCAG 1.3.1.
**Recomendação:** Adicionar `aria-hidden="true"` no wrapper `<div class="scroll-progress">`.
**Esforço:** S

---

### 🟢 LOW — `<form role="form">` é redundante (forma já tem semântica)

**Página/Componente:** `index.html:854`, `portfolio.html:377`
**Eixo:** Acessibilidade
**Evidência:** `<form class="contact-form" role="form">`. WAI-ARIA states que `<form>` only takes `role="form"` se o form **tiver** um nome accessível (`aria-label` ou `aria-labelledby`). Sem nome, o role fica "implicit landmark = form" sem benefício.
**Problema:** Cosmético — alguns auditores marcam.
**Por que importa:** Boa prática.
**Recomendação:** Remover `role="form"` OU adicionar `aria-labelledby="contact-title"` apontando para o `<h2 id="contact-title">`.
**Esforço:** S

---

### 🟢 LOW — `.dot` inativo opacity 0.3 em `--text-light` = ratio decorativo de ~1.4:1 — passa por ser controle não-textual

**Página/Componente:** `.dot` (`styles.css:498-508`)
**Eixo:** Acessibilidade
**Evidência:** Background `--text-light (#8b6b5c)` com `opacity: 0.3`. Cor efetiva ≈ rgb(218,210,205) sobre cream `#fff9f0` — ratio próximo de 1.3:1.
**Problema:** WCAG 1.4.11 Non-text Contrast (AA) exige 3:1 para componentes de UI. Dots de slider falham.
**Por que importa:** Componente de paginação precisa de 3:1 contra adjacente.
**Recomendação:** Aumentar opacity para 0.6 mínimo, ou aumentar saturação. `opacity: 0.6` no `--text-light` → ratio ~3.1:1 mínimo.
**Esforço:** S

---

### 🟢 LOW — Logo do footer 150px de altura — desproporcional ao restante do footer

**Página/Componente:** `.footer-brand .logo img` (`styles.css:1402-1406`)
**Eixo:** Responsividade
**Evidência:** `height: 150px` no logo do footer vs 120px (nav desktop), 80px (nav tablet/mobile). No mobile o footer-brand é center e o logo de 150px ocupa muito espaço vertical.
**Problema:** Inconsistência. Logo do footer maior que o do nav é visualmente estranho.
**Por que importa:** Polish.
**Recomendação:** Trocar para `height: 80px` ou `60px`. Padronizar logo em uma única regra global.
**Esforço:** S

---

### 💡 SUGGESTION — Adicionar `<a href="#main" class="skip-link">Skip to content</a>` no top do `<body>`

**Página/Componente:** Todas as páginas
**Eixo:** Acessibilidade
**Evidência:** Não há skip-link. O `<main>` existe mas usuários de teclado precisam tabular pelo nav inteiro (5+ links) em cada página.
**Problema:** Usuários só de teclado fazem ~10 tabs antes de chegar no conteúdo.
**Por que importa:** WCAG 2.4.1 Bypass Blocks — Level A. Skip link é o padrão.
**Recomendação:** No início de `<body>` em todas as páginas:
```html
<a href="#main" class="skip-link">Skip to main content</a>
```
e CSS:
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 0.75rem 1rem;
  text-decoration: none;
  z-index: 9999;
}
.skip-link:focus { top: 0; }
```
Garantir que `<main>` tenha `id="main"`.
**Esforço:** S

---

### 💡 SUGGESTION — `html { scroll-padding-top: 100px }` quebra com nav 80px no mobile

**Página/Componente:** `styles.css:33`
**Eixo:** Responsividade
**Evidência:** `scroll-padding-top: 100px` é fixo, mas a `.main-nav` em tablet/mobile cai para 80px (linha 1968).
**Problema:** Anchor scroll para `#contact` no mobile deixa 20px de espaço vazio acima do título da seção.
**Por que importa:** Pequeno detalhe.
**Recomendação:** Tornar o scroll-padding responsivo:
```css
html { scroll-padding-top: 100px; }
@media (max-width: 768px) {
  html { scroll-padding-top: 80px; }
}
```
**Esforço:** S

---

### 💡 SUGGESTION — Considerar `font-display: swap` em Google Fonts para evitar FOIT

**Página/Componente:** `index.html:65-72` (Google Fonts link)
**Eixo:** Responsividade + Performance
**Evidência:** Verificar se a URL do Google Fonts inclui `&display=swap`.
**Problema:** Sem `display=swap`, o texto fica invisível ("flash of invisible text") até o Syne carregar — degradação em conexões lentas.
**Por que importa:** UX e WCAG 1.4.4 Resize Text indiretamente.
**Recomendação:** Adicionar `&display=swap` à URL da Google Fonts (provavelmente já está).
**Esforço:** S

---

### 💡 SUGGESTION — `.heart-particles` canvas é renderizado mesmo no mobile onde não está visível

**Página/Componente:** `index.html:271`, `script.js`/`heart-particles.js`
**Eixo:** Responsividade + Performance
**Evidência:** No mobile, o canvas está abaixo do fold (height 400px após hero-left). RequestAnimationFrame contínuo mesmo sem visibilidade.
**Problema:** Bateria/CPU em mobile.
**Por que importa:** Performance. Não é fail mas afeta usuários com motor impairment usando devices low-end.
**Recomendação:** Em `script.js` (init heart-particles), usar `IntersectionObserver` para pausar animation quando canvas sai do viewport. Ou abreviadamente: parar quando viewport < 768.
**Esforço:** M

---

## Scores

**Responsividade axis score: 6/10** — Os breakpoints `1024/768/480` estão consistentes na maior parte e o form/portfolio/owner-values colapsam corretamente; mas há 3 bugs claros (logo overflow no nav em desktop e tablet, team-grid 2 cols no mobile por ordem de media query, lang-toggle sumiu no mobile menu) e a entrega de imagens não-responsivas (1-3MB para 375px) é caro para usuários de mobile. Funciona mas não tem polimento.

**Acessibilidade axis score: 3/10** — Falhas múltiplas e sérias: zero focus indicator, inputs sem label, modais sem ARIA nem focus management, cards de portfolio inacessíveis por teclado, gradient-text falha contraste até em large text, sem `prefers-reduced-motion`. As partes que funcionam (alt em imagens, aria-label em ícones de social, role="tablist" parcial) são contrabalançadas pelas falhas bloqueantes. Site precisa de retrabalho de a11y antes de qualquer claim sobre "clean front-end".
