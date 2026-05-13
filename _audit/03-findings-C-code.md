# 03 — Findings (Agent C — Code & Component Audit)

**Auditor:** Senior Front-End Engineer (Claude). Lê código com olho de mantenedor de design system.
**Eixos cobertos:** 3 (Sistema de design & componentização) e 8 (Performance & dívida técnica).
**Data:** 2026-05-12 · **Branch:** `feature/add-marketing-services` (worktree `cranky-euclid-338b49`).

> **Régua aplicada:** A própria thesis do estúdio em `studio.html` — "judgment, technical polish, clean front-end, maintainable delivery" — é o sarrafo. Cada finding mede o gap entre o que o código entrega e o que o estúdio vende.

> **Convenção de evidência:** caminhos absolutos / `arquivo:linha`. Trechos `grep` reproduzíveis. Toda contagem foi conferida no momento da auditoria.

---

## 🔴 CRITICAL

### 🔴 26MB ZIP estático (`MMF Templates (1).zip`) servido em produção
**Página/Componente:** `Projects/Portfolio-Marketing/MMF Templates (1).zip`
**Eixo:** Performance / Dívida técnica
**Evidência:** `ls -la Projects/Portfolio-Marketing/MMF\ Templates\ \(1\).zip` → 26.131.583 bytes (24.9 MB). Não há nenhum link em HTML/CSS/JS apontando para esse arquivo — `grep -rn "MMF Templates"` retorna zero hits no código.
**Problema:** Um zip de 26 MB foi commitado no repositório e está publicamente acessível em `pickypixels.studio/Projects/Portfolio-Marketing/MMF%20Templates%20(1).zip`. Não está linkado, mas qualquer crawler que indexe o repo (ou qualquer pessoa que adivinhe a URL) consegue baixar. Se o conteúdo for material proprietário do cliente Meet My Friends Portugal, há risco de vazamento; se não for, o repo está 26 MB mais pesado sem motivo.
**Por que importa:** (1) O `git clone` do repositório passa de ~140 MB para ~167 MB sem ganho funcional. (2) GitHub Pages tem soft cap de 1 GB; cada deploy reenvia esse zip ao CDN. (3) Risco legal/contratual de servir templates de cliente sem controle de acesso. (4) Um dev que clona o repo vê esse zip e fica em dúvida do propósito (não há README).
**Recomendação:** Apagar o zip do repo (`git rm` + adicionar ao `.gitignore`). Se o conteúdo for necessário internamente, mover para Google Drive / Dropbox / armazenamento privado. Se for sample público, regerar dentro de uma página HTML que mostre o conteúdo (não zip).
**Esforço:** S

### 🔴 Pricing CSS de ~700 linhas + 145 linhas de HTML comentado em produção
**Página/Componente:** `styles.css` linhas 2648–3349, `index.html` linhas 638–782, `index.pt.html` linhas 632–771.
**Eixo:** Dívida técnica
**Evidência:**
- `grep -n "PRICING SECTION HIDDEN" index.html` → linha 638; `grep -n "END PRICING SECTION" index.html` → linha 782.
- `grep -cE "package|packages-|hosting-info|domain-note|add-ons|pricing-note" styles.css` → 66 ocorrências em ~700 linhas (toda a seção `/* Pricing Section Styles */` em `styles.css:2648–3349`).
- `grep -c "add-ons-section\|pricing-note" index.html` → 0 (essas classes nem chegam ao HTML comentado, são CSS órfão de uma versão anterior do markup).
**Problema:** O commit mais recente (`1058743 Hide pricing section and nav links temporarily`) escondeu a seção comentando o HTML. Mas **toda a CSS da seção continua sendo baixada e parseada por todo visitante**, e todo o markup commented-out continua sendo enviado pelo wire. O navegador avalia ~700 linhas de seletores que nunca casam com nada. Pior: pelo menos `add-ons-section`, `add-on-item`, `add-on-name`, `add-on-price`, `pricing-note` (28 linhas no CSS) já estavam mortas mesmo antes de esconder a seção — não há referência delas em nenhum HTML, nem comentado.
**Por que importa:** (1) Ship-on-master quebra a thesis "maintainable delivery" — código morto inflando o bundle inicial é o oposto de "judgment". (2) A próxima pessoa que encostar no CSS gasta tempo entendendo se `.packages-cta` é usado. (3) `styles.css` total 56 KB; cortar 700 linhas reduz ~14 KB, ~25% do arquivo.
**Recomendação:** Remover (a) todo o HTML comentado nas duas `index.*.html`; (b) todas as regras `.packages*`, `.package-*`, `.add-ons*`, `.add-on-*`, `.hosting-info`, `.domain-note`, `.pricing-note`, `.cta-text`, `.packages-grid`, `.packages-header`, `.packages-label`, `.packages-title`, `.packages-subtitle`, `.packages-container`, `.packages::before` (lines 2648–3349 do `styles.css`) e o bloco `@media print { .packages ... }`. Se houver intenção de voltar a seção, manter num branch / arquivo `_pricing.html.bak` fora do `<head>` da home.
**Esforço:** S

### 🔴 8 páginas órfãs `hero-N.html` deployadas publicamente — código morto reachable
**Página/Componente:** `hero-1-gradient-mesh.html` … `hero-8-cursor-trail.html`
**Eixo:** Dívida técnica / Branding
**Evidência:**
- `ls hero-*.html` → 8 arquivos, total 68 KB combinados (`du -ch hero-*.html | tail -1`).
- `grep -rn "hero-1\|hero-2\|hero-3\|hero-4\|hero-5\|hero-6\|hero-7\|hero-8" --include="*.html" --include="*.css"` (excluindo os próprios) → zero referências.
- Cada arquivo carrega `styles.css` + `pages.css` + Google Fonts + Font Awesome inteiro, então acessá-los acidentalmente paga o load completo.
- Cada um exibe `<div class="demo-label">OPTION 1 — Animated Gradient Mesh ...</div>` no topo: claramente experimentos não-comerciais que vazaram para produção.
**Problema:** O cliente está veiculando 8 protótipos abandonados em produção sob `pickypixels.studio/hero-1-gradient-mesh.html` etc. Um crawler do Google pode indexá-los (não há `robots.txt` nem `<meta name="robots" content="noindex">`). Se um lead pesquisar "Picky Pixels heart particles" o Google pode levá-lo a uma página com banner "OPTION 6 — Heart Particles".
**Por que importa:** Imagem de profissionalismo: o estúdio diz vender "execution quality" e tem 8 demos pendurados. Risco de SEO duplicate-content. Confusão para devs novos no repo.
**Recomendação:** Apagar os 8 arquivos do branch principal (estão preservados no histórico git). Se algum dia precisar de inspiração para futuros heros, recuperar via `git log -- hero-*.html`. Se quiserem deixar visível, pelo menos mover para `/_experiments/` e adicionar `<meta name="robots" content="noindex,nofollow">` em cada um.
**Esforço:** S

### 🔴 `images/favicon.png` não existe — `<link rel="icon">` 404 em todas as páginas
**Página/Componente:** Todas as 5 páginas principais.
**Eixo:** Dívida técnica
**Evidência:**
- `grep -n "favicon" *.html` → 5 páginas declaram `<link rel="icon" href="images/favicon.png" type="image/png" />` (ex. `index.html:62`).
- `ls images/favicon.png` → `No such file or directory`.
- `favicon.ico` existe na raiz e funciona (`file favicon.ico` → MS Windows icon resource).
**Problema:** O segundo `<link rel="icon">` aponta para um arquivo que não existe. O navegador faz a requisição extra, recebe 404 da GitHub Pages. Loga erro no console do visitante em toda visita.
**Por que importa:** Erro 404 reportável no DevTools de qualquer visitante; sinal pequeno mas público de descuido. Aumenta latência da TTI marginalmente (1 round-trip extra por página).
**Recomendação:** Remover a linha `<link rel="icon" href="images/favicon.png" type="image/png" />` das 5 páginas (`index.html`, `index.pt.html`, `portfolio.html`, `services.html`, `studio.html`). Ou então gerar o `favicon.png` 32×32 a partir do `favicon.ico` e colocar em `images/`. Recomendação A é o caminho de menor risco.
**Esforço:** S

### 🔴 Custom cursor: HTML + JS shipam mas o CSS está vazio — feature broken-by-default
**Página/Componente:** `index.html`, `index.pt.html` (apenas a home), `script.js:604–631`, `styles.css:57`
**Eixo:** Dívida técnica
**Evidência:**
- `index.html:133` e `index.pt.html:127` declaram `<div class="cursor"></div><div class="cursor-follower"></div>`.
- `script.js:604–631` (função `initCustomCursor`) seta `cursor.style.left/top` em `mousemove` e adiciona listeners de `mouseenter/mouseleave` em **todos** os `a, button` da página.
- `styles.css:57` contém apenas `/* Custom Cursor */` — bloco vazio. Nenhuma regra `.cursor { ... }` ou `.cursor-follower { ... }` em `styles.css` ou `pages.css` (`grep -nE '^\.cursor\b|^\.cursor-follower\b' styles.css` → 0 hits).
**Problema:** A função JS roda em toda visita à home, instala listeners em **dezenas de `a` e `button`** (cada `mouseenter` faz 2 atribuições de `style.transform`). Os divs renderizam invisíveis (sem width/height/background), então o usuário não vê nenhum cursor custom. É CPU + memória 100% desperdiçada.
**Por que importa:** Performance silenciosa: o custo é distribuído (cada hover, cada mousemove). Pior, a presença das classes em HTML/JS dá a impressão para um dev que a feature funciona — risco de ele "consertar" adicionando CSS, sem perceber que a remoção da feature foi a decisão.
**Recomendação:** Decidir: ou (a) **remover** os 2 `<div>`, a função `initCustomCursor`, e a chamada em `DOMContentLoaded` (linha 1222); ou (b) **restaurar** o CSS — mas dado que essa é a tese "Design Taste", um cursor follower é exatamente o tipo de gimmick "stock template 2017" que a thesis do estúdio rejeita. Ir de (a).
**Esforço:** S

---

## 🟠 HIGH

### 🟠 `script.js` monolítico de 1237 linhas — i18n + dataset + UI tudo num arquivo
**Página/Componente:** `script.js`
**Eixo:** Dívida técnica / escalabilidade
**Evidência:** `wc -l script.js` → 1237. Responsabilidades misturadas:
- `companyProjects` dataset (linhas 1–69)
- `translations` dict EN+PT (linhas 73–579) — ~500 linhas, 240 chaves × 2 idiomas
- `applyTranslations`, `switchLanguage`, `initLanguageSwitcher` (linhas 582–717)
- `initCustomCursor`, `initParallax`, `initSmoothScroll` (linhas 604–685)
- `initInViewAnimations`, `initScrollProgress`, `initWorkSlider` (linhas 719–846)
- `initMobileMenu`, `submitContactForm`, `initContactForms` (linhas 848–910)
- `initImageOverlay`, `initPortfolioPreviewFilter`, `initPortfolioPageFilter`, `initCompanyModal` (linhas 912–1171)
- `initServicesColumns` (`distributeColumns()`) (linhas 1173–1213)
- `updateCopyrightYear` + DOMContentLoaded boot (linhas 1215–1237).
**Problema:** Um único arquivo render-blocking de 57 KB carregado em **todas** as páginas — mesmo que `studio.html` e `services.html` não usem 80% das funções. `studio.html` carrega `initCompanyModal`, `initImageOverlay`, `initWorkSlider`, `initPortfolioPageFilter` etc, todos abortam no primeiro `if (!modal) return;` mas o parsing custa o mesmo. Toda alteração em qualquer feature exige editar o monólito; risco de conflito de merge alto se mais de 1 dev tocar.
**Por que importa:** O dicionário de traduções (~25 KB) é parseado JS-engine cada visita. A simples adição de uma 3ª língua dobraria isso. Manutenção de copy PT obriga edit em arquivo JS — não dá para terceirizar tradução para alguém não-técnico.
**Recomendação:** Quebrar em módulos ES e usar `<script type="module">`:
- `data/translations.en.json` + `data/translations.pt.json` carregados via `fetch` ou inline minimo apenas das chaves visíveis na página atual.
- `data/companyProjects.json`.
- `modules/i18n.js`, `modules/portfolio-filter.js`, `modules/company-modal.js`, `modules/image-overlay.js`, `modules/services-columns.js`, `modules/mobile-menu.js`, `modules/contact-form.js`.
- `main.js` faz boot condicional (só importa o que a página precisa, baseado em presença de selectors).
- Carregar `<script type="module" src="main.js" defer>`.
- Sem build step: HTTP/2 multiplexing torna múltiplos scripts pequenos OK em GitHub Pages.
**Esforço:** L

### 🟠 `script.js` carregado sem `defer` nem `async` — render-blocking 57 KB
**Página/Componente:** `index.html:1057`, `index.pt.html:1042`, `portfolio.html:556`, `services.html:559`, `studio.html:438`
**Eixo:** Performance
**Evidência:**
- `grep -n 'script src='` mostra que todas as 5 páginas declaram `<script src="script.js"></script>` no fim do `<body>` **sem** atributos `defer` ou `async`. Apenas o gtag tem `async` (linhas 26-27 dos 4 arquivos não-home).
- Como está no fim do body, o HTML termina de parsear antes — mas o navegador ainda bloqueia a renderização final no parsing+execução do JS (1237 linhas, sem minify).
**Problema:** O script puro é 57 KB de fonte. Sem `defer`, o LCP chega depois do JS terminar de executar (que inclui parsing dos 25 KB de translations + setup de 12+ listeners). `defer` permite ao parser HTML continuar, executa só depois do parsing, mas em ordem.
**Por que importa:** Páginas internas (`studio.html`) só precisam de language switcher, mobile menu e copyright year — mas pagam o custo total. Em conexão 4G ruim a thesis "execution quality" cai por causa de uma flag faltando.
**Recomendação:** Adicionar `defer` em todas as 5 ocorrências. Ainda melhor combinado com a refatoração modular acima (`<script type="module" defer>`). Para `heart-particles.js` (que toca `<canvas id="heartCanvas">`), também `defer` — não há motivo para ser síncrono.
**Esforço:** S

### 🟠 Two-files-per-language strategy: `index.html` e `index.pt.html` divergem silenciosamente
**Página/Componente:** `index.html` (1059 linhas) vs `index.pt.html` (1045 linhas)
**Eixo:** Dívida técnica / i18n
**Evidência:**
- `diff index.html index.pt.html | wc -l` → 705 linhas de diferença.
- A versão PT já tem o copy traduzido in-place (não depende de `data-translate` para mostrar PT), o que **redundantiza o sistema de translations.pt** para o caso de carregar `index.pt.html`.
- No `index.pt.html` o nav-link "Serviços" (linha ~76) **falta `data-translate="nav-services"`** — ao alternar idioma para EN dentro do `index.pt.html`, o link continua "Serviços" em vez de virar "Services". Drift de i18n confirmado.
- Form drift confirmado: `index.html:918` placeholder = `"Tell me about your project..."`; `portfolio.html:439` placeholder = `"Tell us about your project..."`. Cópia já está fora de sincronia.
**Problema:** Cada mudança tem que ser feita 2× (EN + PT). O `data-translate` system existe e funciona — mas **só está ativo se você abrir `index.html` e clicar PT no toggle**. Quem chega direto em `index.pt.html` (via link interno ou Google PT) carrega copy estático já traduzido + ainda baixa todo o translations.pt para nada. Pior dos dois mundos.
**Por que importa:** Cada divergência futura — copy do contact form, novos projetos, novos botões — vai apresentar PT vs EN inconsistente. A 3ª pessoa que mexer no site vai duplicar bug que a 2ª já resolveu.
**Recomendação:** Eliminar `index.pt.html`. Servir só `index.html` (com markup EN como default) e usar exclusivamente o `data-translate` runtime via `script.js`. Para SEO PT, configurar `<link rel="alternate" hreflang="pt" href="https://pickypixels.studio/?lang=pt">` e ler `?lang=pt` em `initLanguageSwitcher`. Isto reduz pages duplicadas de 5×2 para 5 e elimina a classe inteira de bugs de drift.
**Esforço:** M

### 🟠 `portfolio-item` (web) e `company-card` (marketing) — dois componentes para "trabalho que fizemos"
**Página/Componente:** `pages.css:503` (`.portfolio-item`) vs `pages.css:1069` (`.company-card`); `portfolio.html` (ambos coexistem)
**Eixo:** Sistema de design
**Evidência:** Diff conceitual:

| Aspecto | `.portfolio-item` (web) | `.company-card` (marketing) |
|---|---|---|
| Border-radius | `18px` | `18px` |
| Aspect ratio cover | `4/3` (`pages.css:523`) | `16/10` (`pages.css:1086`) |
| Background | `white` | `var(--surface)` |
| Border | `1px solid rgba(92,64,51,0.08)` | `1px solid rgba(0,0,0,0.06)` |
| Hover translateY | `-6px` | `-4px` |
| Hover shadow | `0 16px 48px rgba(92,64,51,0.12)` | `0 12px 32px rgba(0,0,0,0.1)` |
| Click action | abre `image-overlay` (foto crua) | abre `company-modal` (carousel completo) |
| Badge | inline `<span class="portfolio-category-badge web/marketing>` | overlay `.company-badge` no canto inferior |
| Conteúdo extra | `<a class="portfolio-link">Visit Website</a>` | `<div class="company-tags">` |

Note `var(--bg)` em `.company-card-info .company-tags span` (`pages.css:1139`) — **token `--bg` não existe**, fallback é `unset`. Essa regra está silenciosamente quebrada.
**Problema:** Dois componentes para a mesma intenção semântica ("este é trabalho que fizemos"). Hover-velocity diferente, sombra diferente, aspecto diferente, badge diferente. O usuário interpreta como "duas categorias de credibilidade desigual" sem que o estúdio tenha intenção disso.
**Por que importa:** Sistema de design fragmentado é o sintoma clássico de "judgment ausente" que a thesis condena. Cada novo trabalho marketing/web requer copiar markup diferente — propenso a erro. Já gerou bug latente (`var(--bg)`).
**Recomendação:** Unificar num componente `.work-card` com modificadores: `<article class="work-card" data-variant="web|marketing">`. Variant escolhe (a) o handler de click — `image-overlay` ou `company-modal` —, (b) badge color via `data-variant`. Um único bloco CSS com tokens. Para o aspecto da imagem use uma variável CSS `--work-card-aspect` que cada variant sobreescreve. Resolver o `var(--bg)` substituindo por `var(--surface)` no caminho.
**Esforço:** M

### 🟠 `image-overlay` vs `company-modal` — dois modais com UX completamente diferente
**Página/Componente:** `styles.css:2503` (`.image-overlay`) e `pages.css:1147` (`.company-modal`); `script.js:912` e `script.js:1048`
**Eixo:** Sistema de design
**Evidência:**
- `.image-overlay` (`styles.css:2503–2596`): Z-index `10000`, fundo preto, mostra **só** uma `<img>` em `max-width: 60%`. Sem título, sem caption, sem navegação, sem keyboard arrows.
- `.company-modal` (`pages.css:1147–1320`): Z-index `9999`, backdrop com `blur(6px)`, conteúdo branco com `border-radius: 20px`, header com título dinâmico, carousel com prev/next, dots, thumbnails, suporta `Escape`, `ArrowLeft`, `ArrowRight`.
- Mesma intenção do usuário ("ver mais detalhes desse projeto") gera duas experiências radicalmente diferentes.
- Duas implementações de modal com z-indices conflitantes (`9999` e `10000`) — risco de stacking-context bug se algum dia abrirem ambos.
**Problema:** O modal marketing parece um produto polido; o overlay web parece "deu pra ver a screenshot, agora se vira". O usuário aprende via primeira interação que clicar num card abre algo rico, depois fica frustrado quando o segundo card não tem caption. A inconsistência transmite "não achamos importante explicar o trabalho web".
**Por que importa:** Conversão (Eixo 5 - não meu, mas óbvio): cards web são supostamente o produto principal do estúdio (já que vendem Web Design + Software). Eles recebem o pior tratamento de modal.
**Recomendação:** Unificar num componente `WorkModal` que aceita `{title, subtitle, items: [{src, caption, label}]}`. Para web cards passa um único item; o componente esconde nav/dots/thumbnails se `items.length === 1`. Lógica + CSS deduplicada. Z-index único.
**Esforço:** M

### 🟠 Forms duplicados: `index.html` `#contact` vs `portfolio.html` `.portfolio-contact` já driftaram
**Página/Componente:** `index.html:851–953` vs `portfolio.html:374–476`
**Eixo:** Sistema de design
**Evidência:** `diff <(sed -n '851,955p' index.html) <(sed -n '374,475p' portfolio.html)`:
- Index usa `placeholder="Tell me about your project..."`; portfolio usa `placeholder="Tell us about your project..."`.
- Index e portfolio têm copy "Connect with me:" vs "Connect with us:" — drift confirmado.
- Mesma `<form action="https://formspree.io/f/mpwaajew">` em ambas — mesma backend.
- Ambos têm o mesmo `id="contact-form"` — se algum dia uma página tiver os dois (ex: `<iframe>`), violação de id duplicado.
- A label do checkbox usa `style="..."` inline em ambos os arquivos — mesma propriedades duplicadas.
**Problema:** Dois forms idênticos em propósito, diferentes em copy. Mais uma regressão futura garantida (alguém vai mudar opções de `optgroup` num arquivo só).
**Por que importa:** Forms são o ponto de conversão crítico do site. Drift silencioso aqui = mensagens que falam para o lead "este estúdio não revisa o próprio site".
**Recomendação:** Extrair o `<form>` para um partial ou (a) carregar via JS template literal injetado em ambos lugares; (b) [se virem framework no futuro] componente reutilizável; (c) curto prazo: criar um arquivo `_contact-form.html` e copiá-lo idêntico nas duas páginas + um teste manual para verificar paridade. Eliminar os `id="contact-form"` duplicados (usar `class` para seleção).
**Esforço:** M

### 🟠 `distributeColumns()` — JS-driven layout para o que `column-count` resolveria nativamente
**Página/Componente:** `script.js:1173–1213` (função `initServicesColumns`), `services.html:170` etc (`.services-grid-full`)
**Eixo:** Performance / dívida técnica
**Evidência:** O código:
```js
const columnCount = width > 768 ? 3 : width > 480 ? 2 : 1;
// remove existing .services-column elements
// create N new .services-column children
// distribute cards round-robin across columns
```
Roda no boot e a cada `resize` (debounced 250ms). Cada resize **remove e recria todo o subtree DOM** dos cards — invalida CSS cache, remove event listeners (e re-anexar não acontece porque os cards não têm listeners próprios, mas qualquer addon JS perderia state).
**Problema:** CSS multi-column (`column-count: 3; column-gap: 1rem;`) ou Grid com `grid-auto-flow: column dense` resolve o mesmo problema sem JS. O motivo declarado no comentário é "Each column is independent - expanding a card only affects its own column" (`pages.css:135`), o que é exatamente o comportamento de `column-count` (cada coluna é uma block formatting context independente).
**Por que importa:** (1) FOUC: até `distributeColumns` rodar, os cards ficam empilhados em 1 coluna. (2) `resize` debounce de 250ms causa flicker em janelas redimensionadas. (3) JS-driven layout falha sem JS (acessibilidade). (4) "Maintainable delivery" promete o oposto disso.
**Recomendação:** Substituir `.services-grid-full` por `column-count: 3; column-gap: 1rem;` em desktop, `2` em tablet, `1` em mobile via CSS media queries. Com `break-inside: avoid;` nos cards. Apagar `initServicesColumns` e `.services-column`. Se a expansão de cards no hover precisar de comportamento por-coluna, é exatamente o que multi-column entrega.
**Esforço:** M

### 🟠 Pricing translation keys ainda no dicionário, ~30 chaves desperdiçadas × 2 idiomas
**Página/Componente:** `script.js:73–579` (translations dict)
**Eixo:** Dívida técnica
**Evidência:** Após esconder a seção pricing, as chaves `package*`, `hosting-info-*`, `pricing-*` (se houver) deveriam ter sido removidas. Verificação:
- `python3 ... compara EN keys vs HTML keys` mostra apenas `form-error`, `form-success` como "definidas mas não usadas" — porque a auditoria acima ignora HTML comentado. Os refs a `package-name`, `package-description`, `package-features`, `hosting-info`, etc dentro do `<!-- PRICING SECTION HIDDEN ... -->` são contados como "usados" pelo regex de `data-translate` mesmo dentro do comment.
- Verificação extra: `grep -E 'data-translate=' index.html | grep -E 'package|hosting|pricing|domain' | head -5` retorna 0 hits no arquivo todo — então **as translation keys de pricing nunca existiram**, o que é até bom (não há key órfã). Mas o markup pricing comentado **inclui copy hardcoded EN** ("Most Popular", "From €250", "✅ 1-page layout..."), portanto se algum dia a seção for re-ativada, ela será EN-only — outra forma de drift.
**Problema:** O markup commented-out contém ~50 strings hardcoded ("Hosting: €15/month", "Domain not included", etc) sem `data-translate`. No PT toggle, se reativada, serviria EN. Sinaliza que pricing nunca foi internacionalizada.
**Por que importa:** Ressuscitar pricing requer o trabalho de i18n; manter comentado disfarça essa dívida.
**Recomendação:** (já coberto pelo finding 2 do CRITICAL: remover o markup comentado). Se voltar, tradução de cada string deve ser obrigatória.
**Esforço:** S

### 🟠 Cores hardcoded fora do design token system: `#2d1f1a`, `#fff3c1`, `#7a3b00`, `#fff9f0`, `#3a2200`, `#b93a00`, `#e54d1a`
**Página/Componente:** `styles.css` (~28 hex literals fora dos `--*` definitions), `pages.css` (~14 hex literals).
**Eixo:** Sistema de design
**Evidência:** `grep -nE "#[0-9a-fA-F]{3,6}\b" styles.css | grep -v ":\s*--"`:
- `#2d1f1a` aparece em styles.css 211, 220, 225, 740 + pages.css 53, 1190, 1210, 1244, 1258 — é "marrom quase-preto" usado para hero-title, role badges, modal text. Deveria ser token `--text-strong` ou similar.
- `#fff3c1` (creme amarelado) em styles.css 635, 908, 1255, 2687 — fundo de section-label. Token candidato `--surface-highlight`.
- `#7a3b00` (mostarda escura) em styles.css 634, 909, 1150, 1151, 1256, 2474, 2688 — texto do section-label + hover do btn-primary. Token candidato `--primary-deep`.
- `#fff9f0` (creme do `--background`) em styles.css 212, 221, 742 dentro de `text-shadow` — ou seja repetindo o `--background` literalmente em vez de `var(--background)`.
- `#3a2200`, `#b93a00`, `#e54d1a` — variantes do `--primary` (`#ff5e32`) usadas como darken/hover.

Adicionalmente em `pages.css:1170, 1190, 1195, 1205, 1210, 1244, 1248, 1258, 1264, 1280, 1288, 1314` há fallbacks `var(--bg, #f5f0eb)`, `var(--text, #2d1f1a)`, `var(--text-light, #666)`, `var(--primary, #c75b39)` — **e `--bg` nem existe** (`grep -n "--bg:" styles.css` retorna apenas `--background:`). Isso significa que `.company-modal` está usando `#f5f0eb` (uma cor não-tokenizada) em produção. E `var(--primary, #c75b39)` cria uma terceira cor "fallback" que nunca seria usada hoje — mas quem ler o código fica em dúvida sobre qual é o "primary real".
**Problema:** O sistema de tokens promete consistência mas o código contraria. Mudar a paleta exige caçar literais por arquivo. Tons "darken hover" do primary não são derivados, são chutes de cor (`#7a3b00`, `#e54d1a`, `#b93a00` — três escolhas distintas para "primary mais escuro").
**Por que importa:** Eixo 3 do plano de auditoria mede exatamente isso. O estúdio vende design system; entrega ad-hoc. Próxima rebrand vira projeto de migração de cor a cor.
**Recomendação:** Adicionar tokens:
```css
--text-strong: #2d1f1a;
--primary-deep: #7a3b00;
--primary-darker: #b93a00;
--primary-hover: #e54d1a;
--surface-highlight: #fff3c1;
--surface-highlight-text: #7a3b00;
```
Substituir `var(--bg, ...)` em `pages.css:1139, 1170, 1195, 1248, 1280` por `var(--surface)` (intent original). Substituir todos os `text-shadow: 0 2px 8px #fff9f0;` por `text-shadow: 0 2px 8px var(--background);`. Remover fallbacks bizarros tipo `var(--primary, #c75b39)` — se `--primary` nunca falha, fallback gera dúvida.
**Esforço:** M

### 🟠 `--bg` token referenciado mas nunca definido — silently broken color in production
**Página/Componente:** `pages.css:1139, 1170, 1195, 1248, 1280, 1306` (todas inside Marketing Portfolio + Company Modal blocks)
**Eixo:** Sistema de design / Bug
**Evidência:**
- `grep -n "var(--bg" pages.css` → 6 hits.
- `grep -n "^\s*--bg:" styles.css pages.css` → 0 hits. O token nunca foi declarado em `:root`.
- Resultado: `background: var(--bg)` (sem fallback) → CSS vazio (browser ignora). Com fallback `var(--bg, #f5f0eb)` → cor crua `#f5f0eb` aplicada (não-tokenizada).
**Problema:** Bug latente: a `.company-card-info .company-tags span` (linha 1139) faz `background: var(--bg);` sem fallback → tag pills marketing renderizam com **background transparente** em vez do creme planejado. Um teste visual em portfolio.html confirmaria. Os outros 5 hits têm fallback `#f5f0eb` então renderizam, mas é uma 3ª cor creme não-documentada além de `--background` (#fff9f0) e `--surface` (#fffaf5).
**Por que importa:** Bug visual real. Demonstra que ninguém revisou pages.css linha por linha — outro sintoma de "judgment ausente".
**Recomendação:** Renomear ocorrências para `var(--surface)` (intent provável) e remover fallbacks `#f5f0eb`. Esforço pequeno.
**Esforço:** S

### 🟠 Função `initParallax()` é completamente dead code — sem `data-parallax` em HTML algum
**Página/Componente:** `script.js:633–664`
**Eixo:** Dívida técnica / performance
**Evidência:**
- `grep -n "data-parallax" *.html` → zero hits.
- `script.js:634`: `Array.from(document.querySelectorAll("[data-parallax]"));` — sempre retorna lista vazia.
- Mesmo retornando vazio, a função chega a registrar `mousemove` e `scroll` listeners (`script.js:640, 652`) **antes** do early return — mas espera, na verdade tem `if (!parallaxElements.length) return;` na linha 636 → ok, não registra listeners. Mas o boot continua chamando uma função inútil em todas as páginas.
**Problema:** 32 linhas de dead code carregadas em todas as páginas. Confunde leitor (parece que parallax está implementado).
**Por que importa:** Pequeno, mas cumulativo: vários sintomas como esse compõem a impressão de descuido.
**Recomendação:** Remover `initParallax` e a chamada em `DOMContentLoaded:1223`.
**Esforço:** S

### 🟠 Função `initInViewAnimations` referencia 4 classes inexistentes em HTML (`large-text`, `stat-item`, `stat-number`, `section-title`)
**Página/Componente:** `script.js:719–740`
**Eixo:** Dívida técnica
**Evidência:**
- `script.js:721`: `".portfolio-item, .section-title, .section-header, .large-text, .stat-item, .stat-number"`
- `grep -c "stat-item\|stat-number\|large-text" *.html` → 0 hits em qualquer HTML.
- `section-title` aparece em `index.html:283` (sim) e `pages.css` referencia, mas `.large-text`, `.stat-item`, `.stat-number` referenciam um sistema de "stats" que nunca foi implementado (ou foi removido).
- O `IntersectionObserver` ainda assim é criado (overhead pequeno) mas observa só `portfolio-item` + `section-header` + `section-title`.
**Problema:** Sinal de copy-paste de outro template ou de intent abandonada. Quem ler o código não sabe se vai aparecer um stats-grid no futuro ou se é dead.
**Recomendação:** Limpar a string de seletor para apenas as classes vivas (`.portfolio-item, .section-title, .section-header`). Idealmente extrair para constante nomeada.
**Esforço:** S

### 🟠 ~700 linhas de CSS dead — classes de slider/carousel/services/work não existem no HTML produção
**Página/Componente:** `styles.css` (múltiplos blocos)
**Eixo:** Dívida técnica
**Evidência:** Confirmação programática — para cada classe, contagem em HTML produção vs CSS:
- `.work-slider` — CSS=3, HTML=0 (`styles.css:307–315`)
- `.work-slide` — CSS=9, HTML=0 (`styles.css:316–325, 521, 533, 560, 1927, 2080`)
- `.work-item` — CSS=6, HTML=0 (`styles.css:327–419`)
- `.work-image` — CSS=9, HTML=0 (incl. `::after` zoom indicator `styles.css:2600–2645`)
- `.work-content`, `.work-category`, `.work-link` — CSS=13, HTML=0
- `.slider-nav`, `.slider-dots`, `.slider-navigation`, `.dot`, `.nav-text`, `.nav-arrow` — CSS=20+, HTML=0
- `.service-card` (sem `-full`), `.service-icon`, `.service-title`, `.service-desc`, `.services-carousel`, `.carousel-controls`, `.carousel-nav`, `.carousel-dots`, `.carousel-dot` — CSS=20+, HTML=0
- `.category-filter`, `.category-filter:hover`, `.category-filter .filter-count` — CSS=7, HTML=0
- `.shape-1, .shape-2, .shape-3` — CSS=22 (linhas 250–288), HTML=0
- `.stats-grid`, `.service-item` — CSS=3, HTML=0

Estimativa total de CSS órfão: lines 290–518 (work-section), 520–608 (work responsive), 1281–1354 (work-categories/category-filter), 1324–1335 (slider-navigation #2), 1545–1851 (services-carousel/service-card/carousel-*), 2600–2646 (work-image::after), além de regras dispersas. **Aproximadamente 700 linhas de CSS dead** (que somadas às 700 linhas de pricing = ~1400 linhas dead em styles.css de 3349; ~42% morto).
**Problema:** O CSS shipped é dominado por código que não casa nada. Browser parseia, não pinta. Carrega no wire, ocupa cache.
**Por que importa:** Bundle size: 56 KB → ~30 KB se limpar (>40% redução). LCP melhora. Manutenção: dev novo gasta tempo entendendo o que `.work-slide` faz (resposta: nada).
**Recomendação:** Pass programático com PurgeCSS / UnCSS contra os 5 HTMLs principais para gerar uma styles.css limpa. Ou rev manualmente bloco por bloco. Ranges suspeitos de dead code (a confirmar):
- `styles.css:290–608` (todo o `/* Work Section */` bloco)
- `styles.css:1281–1354` (work-categories duplicate)
- `styles.css:1545–1851` (services-carousel)
- `styles.css:2600–2646` (work-image::after zoom)
- `styles.css:250–288` (.shape-1/2/3 floats — não estão em HTML)
- `styles.css:2648–3349` (pricing — já no CRITICAL).
**Esforço:** M

### 🟠 5 viewports de responsivo declarados, **37 blocos `@media` em styles.css** — sem nenhum sistema mobile-first
**Página/Componente:** `styles.css`
**Eixo:** Sistema de design
**Evidência:**
- `grep -n "@media" styles.css | wc -l` → 37 blocos em styles.css; 6 em pages.css = 43 total.
- Breakpoints únicos: `320, 480, 600, 768, 1024, 1025, 1440` → 7 pontos. Sem variável CSS / token (ex: `--bp-md: 768px` não existe).
- Repetições: `(max-width: 768px)` aparece em **14 blocos diferentes** em styles.css; `(max-width: 480px)` em **11 blocos**. Cada feature foi adicionada como bloco isolado em vez de consolidados.
- Há até `@media (max-width: 1024px)` aparecer 4 vezes (linhas 520, 820, 1917, 2360) — ou seja a mesma media query repetida em 4 lugares no arquivo.
**Problema:** Manutenção: ajustar comportamento "tablet" exige editar 14 blocos. Sem garantia de não-regressão (sobrescritas em cascata). O CSS é desktop-first (`max-width:`) o que aumenta especificidade no caso mais comum (mobile-first ganharia por simplicidade).
**Por que importa:** "Maintainable delivery" depende de sistema. Hoje cada nova section gera N novos `@media` blocks dispersos.
**Recomendação:** (a) Consolidar todos os `@media` por breakpoint num grupo (todas as regras 768px num só bloco no fim do arquivo, ordenadas). (b) Adicionar tokens CSS custom — embora media queries não aceitem `var()`, pode-se usar PostCSS / Sass; sem build step, viável é apenas comentar `/* breakpoint: tablet (768px) */`. (c) Migrar para mobile-first (`min-width: 768px`) reduzindo overrides.
**Esforço:** L

### 🟠 4 valores diferentes de `border-radius` (12/14/16/18/20px + 32px) sem sistema
**Página/Componente:** `styles.css`, `pages.css`
**Eixo:** Sistema de design
**Evidência:** `grep -nE "border-radius:" styles.css pages.css`:
- `12px` (token `--border-radius`): 6 usos com `var()`, mas há 4 hardcodes adicionais.
- `14px` (1×) — `pages.css:1042` (.portfolio-item mobile override).
- `16px` (2×) — `service-card-full`, `pricing-note`.
- `18px` (8×) — `service-card`, `category-icon`, `studio-principle`, `studio-step`, `portfolio-item` (default), `service-category-preview`, `company-card`.
- `20px` (4×) — `package-card`, `studio-note`, `add-ons-section`, `company-modal-content`.
- `32px` (1×) — `#heartCanvas`.
- Border-radius pílula: `100px`, `999px` — também coexistem (idênticos visualmente em sizes pequenos).
**Problema:** `--border-radius: 12px` declarado mas usado quase só em legacy (work-item, owner-photo-wrapper). O resto do site usa 18px e 20px sem token. Não há linguagem semântica ("o que é 18 vs 20"). Cards inicialmente eram 18, alguns viraram 20 — sem justificativa.
**Por que importa:** Eixo 3: o sistema de design promete consistência mas as variantes brigam.
**Recomendação:** Definir 3 tokens semânticos:
```css
--radius-sm: 8px;  /* inputs */
--radius-md: 16px; /* cards */
--radius-lg: 24px; /* hero canvas, modals */
--radius-pill: 999px;
```
Migrar todos os hardcodes. Decidir se hero canvas justifica `radius-lg` ou se vai tudo para `--radius-md`. Apagar `--border-radius` (genérico demais).
**Esforço:** M

### 🟠 Logo `images/logo2.png` (1.5 MB) preloaded em todas as páginas — LCP lento
**Página/Componente:** `index.html:130` (preload), 5 páginas usam `<img src="images/logo2.png">`
**Eixo:** Performance
**Evidência:**
- `ls -la images/logo2.png` → 1.555.116 bytes (1.5 MB).
- `<link rel="preload" as="image" href="images/logo2.png" />` em `index.html:130`.
- Renderizado em 120×120px (`<img width=120 height=120>`).
- Em footer renderizado a 150px de altura (`styles.css:1402`).
- Preconnect ao Google Fonts feito **antes** do preload do logo — competindo por bandwidth no critical path.
**Problema:** PNG de 1.5 MB para exibir 120 px. Ratio de >12.000:1 — ou seja, 12 KB serviria. O preload garante que essa monstruosidade entra no critical path antes do CSS.
**Por que importa:** Lighthouse LCP/Performance score cai. Em 4G mobile, o logo sozinho atrasa first paint.
**Recomendação:** Re-exportar `logo2.png` em 240×240 (para retina 2× de 120) com optimization (`tinypng`/`oxipng`). Resultado esperado: 5–15 KB. Manter preload (agora barato). Gerar versão SVG do logo se possível — escala perfeita, ~3 KB.
**Esforço:** S

### 🟠 Imagens de portfolio sem otimização — 6 arquivos / ~13 MB no Web; 80 MB total Marketing
**Página/Componente:** `Projects/Portfolio-Web /`, `Projects/Portfolio-Marketing/`
**Eixo:** Performance
**Evidência:**
- `du -sh Projects/Portfolio-Web\ /` → 12 MB (6 arquivos, média 2 MB; pior `FazUmCafezim.jpeg` 3.5 MB jpeg sem .webp twin).
- `du -sh Projects/Portfolio-Marketing/` → 80 MB inclusive zip (sem zip ~54 MB).
- `images/Rebeca.JPG` → **2.6 MB** para uma foto de equipe renderizada em 200×200 (ratio 13.000:1).
- `images/Nathielle.jpg` → 300 KB; `marcos.jpeg` → 333 KB. Inconsistência de extensão (`.jpg`, `.JPG`, `.jpeg`).
- `Calendario Cynergia (Energia) - post 1.png` → 438 KB; `Flyer A3 Soluções v2.png` → 4.5 MB; `Sobre nós.png` → 2.5 MB.
- Todas marketing são PNGs (lossless, gigantes); deveriam ser jpg/webp para fotografia/posters.
**Problema:** Carregar `portfolio.html` baixa pelo menos 6 imagens web (~12 MB) + thumbnails de 1 marketing. Em 4G são 30+ segundos.
**Por que importa:** O site que **vende** otimização web é ele próprio um caso de pessimização extrema. Lighthouse Performance < 30 garantido em mobile.
**Recomendação:**
1. Re-exportar todas as imagens em `.webp` com qualidade 80, max-width 1600px (retina 2× para card 800px). Esperado: 100–300 KB cada.
2. Adicionar `<picture>` com fallback `<img>` para browsers antigos (raro em 2026).
3. Imagens de equipe: gerar 400×400 webp (~30 KB cada).
4. Marketing: re-export PNG → WebP.
5. Considerar `loading="lazy"` (já presente, ok).
**Esforço:** M

### 🟠 Font Awesome 6.5.1 inteiro carregado via CDN — ~80 KB para 50 ícones
**Página/Componente:** Todas as 5 páginas: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />`
**Eixo:** Performance
**Evidência:**
- `grep -nE "fab fa-|fas fa-|far fa-" *.html | sed -E 's/.*(fa-[a-z-]+).*/\1/' | sort -u | wc -l` → 50 ícones únicos.
- Font Awesome 6.5.1 `all.min.css` é ~80 KB minified e referencia ~650 KB em font files (`*.woff2` lazy-loaded por `fa-` family).
**Problema:** 50 ícones de uma library de ~10.000 ícones. >99% do payload é desperdício. Pior: alguns ícones são puramente decorativos (fa-heart, fa-handshake, fa-lightbulb) — questão de design (não meu) mas piora o ratio de carga útil.
**Por que importa:** Render-blocking CSS extra. Lighthouse penaliza unused CSS. Um estúdio que vende performance web shipping uma kitchen-sink icon library é o tipo de incoerência que a thesis condena.
**Recomendação:**
1. (Curto prazo) Continuar com Font Awesome mas usar **subset SVG** — ferramenta como `subfont` ou criar SVG sprite com apenas os 50 ícones (~20 KB).
2. (Melhor) Migrar para SVG inline / `<svg use href=...>` com sprite local. Lucide / Phosphor / Heroicons são alternativas tree-shakeable.
3. (Imediato) Para ícones de marca (`fa-instagram`, `fa-whatsapp`, `fa-github`, `fa-linkedin-in`) usar SVG inline — já são 4 ícones que justificam evitar dependência.
**Esforço:** M

---

## 🟡 MEDIUM

### 🟡 `footer.css` 0 bytes — arquivo morto no repo (mas não importado em produção)
**Página/Componente:** `/footer.css` (0 bytes)
**Eixo:** Dívida técnica
**Evidência:**
- `ls -la footer.css` → `0 Mar 24 17:05 footer.css`
- `grep -rn "footer.css" --include="*.html" --include="*.css" --include="*.js"` → 0 hits.
- Não está referenciado em nenhum lugar, então não é "broken import" — só lixo no repo.
**Problema:** Arquivo zero-byte misterioso. Sinaliza intent abandonada (provavelmente refator que nunca aconteceu).
**Por que importa:** Pequeno, mas o tipo de detalhe que um auditor cético nota e que mina credibilidade.
**Recomendação:** `git rm footer.css`.
**Esforço:** S

### 🟡 `.section-label` definido 2× com regras divergentes (`styles.css:629` e `styles.css:1252`)
**Página/Componente:** `styles.css`
**Eixo:** Sistema de design
**Evidência:**
- `styles.css:629–638`: `.section-label { display: block; font-size: 1rem; ... margin-bottom: 1rem; }`
- `styles.css:1252–1262`: `.section-label { display: inline-block; padding: 0.5rem 1.25rem; background: #fff3c1; color: #7a3b00; ... text-transform: capitalize; }`
- A segunda definição vence pelo source-order. A primeira fica obsoleta (mas não removida).
**Problema:** Duas declarações da mesma classe em arquivos não-isolados é red flag. Specificity confusa para quem debugar.
**Recomendação:** Apagar `styles.css:629–638` (o bloco anterior) ou consolidar em uma única regra com todas as propriedades necessárias.
**Esforço:** S

### 🟡 `.slider-navigation` definido 2× (`styles.css:438` e `styles.css:1325`)
**Página/Componente:** `styles.css`
**Eixo:** Dívida técnica
**Evidência:** `grep -nE "^\.slider-navigation\b" styles.css` → linhas 438 e 1325.
- Linha 438: `.slider-navigation { display: flex; align-items: center; justify-content: center; gap: 2rem; margin-top: 3rem; padding: 0 var(--spacing-md); }`
- Linha 1325: idem mas sem `padding`.
- Ambos dead code (`.slider-navigation` não existe em HTML produção, vide finding maior acima), mas duplicação é independente.
**Recomendação:** Apagar ambos junto com a faxina geral de slider/work code.
**Esforço:** S

### 🟡 `.cursor` e `.cursor-follower` divs escondidos em viewport mobile? Não — ficam sem estilo nenhum
**Página/Componente:** `index.html:133–134`
**Eixo:** Dívida técnica (cobertura no CRITICAL acima, este é o aspecto responsive)
**Evidência:** `<div class="cursor">` é touch-incompatible (pointer events não disparam mousemove em iOS/Android). Mesmo se o CSS fosse implementado, mobile não veria.
**Problema:** Mesmo num futuro fix do CSS, a feature seria desktop-only, exigindo `@media (hover: hover) and (pointer: fine)` para evitar custo em mobile.
**Recomendação:** Manter o veredito do CRITICAL (remover). Se reativar, gate atrás de `@media (hover: hover) and (pointer: fine)` e early-return em `initCustomCursor` se `matchMedia('(hover: hover)').matches === false`.
**Esforço:** S

### 🟡 5 ocorrências de `!important` — todas em `display: none` mobile, mas sinalizam specificity issues
**Página/Componente:** `styles.css:2152, 2160, 2249, 2363, 2482`
**Eixo:** Dívida técnica
**Evidência:** `grep -nE "!important" styles.css`:
- `2152`: `.nav-links, .nav-cta > .nav-social { display: none !important; }` (em `@media max-width:480`)
- `2160`: `.language-switch { display: flex !important; }`
- `2249`: `.mobile-language-switch { display: none !important; }`
- `2363`: `.nav-links, .nav-cta > .nav-social { display: none !important; }` (em `@media max-width:1024` — duplicação)
- `2482`: `.hamburger { display: none !important; }` em `@media min-width:1025`.
**Problema:** Os `!important` são todos para esconder/mostrar nav em breakpoints. Sinaliza que outras regras (não-`!important`) também tentam controlar `display` desses mesmos elementos — guerra de specificity vencida com força bruta.
**Por que importa:** Um único `!important` em produção é OK para overrides de framework; 5 num site sem framework indica que a cascata foi mal pensada.
**Recomendação:** Refatorar a navegação mobile/desktop com uma única source of truth: `.nav-links`, `.hamburger`, `.mobile-menu` com `display: none` no estado base + `display: flex` no breakpoint correto. Sem `!important`. Conjugado com mobile-first refactor.
**Esforço:** M

### 🟡 `.shape-1, .shape-2, .shape-3` (~40 linhas) — código morto, eram blobs decorativos do hero antigo
**Página/Componente:** `styles.css:250–288`
**Eixo:** Dívida técnica
**Evidência:**
- `grep -nE "\.shape-[123]" styles.css` → linhas 255, 266, 278.
- `grep -E "class=\"shape" *.html` → 0 hits.
- O hero atual usa `<canvas id="heartCanvas">`; as `.shape-*` blobs eram do hero anterior (vide hero-N.html experiments — `hero-2-morphing-blobs.html`).
**Problema:** 40 linhas de animation `float` para nada. As `keyframes float` (`styles.css:1165–1173`) são compartilhadas com `.packages-cta::before` (também dead).
**Recomendação:** Apagar `.shape, .shape-1, .shape-2, .shape-3`. Verificar se `@keyframes float` ainda tem outros consumidores antes de deletar.
**Esforço:** S

### 🟡 17 transitions usam `var(--transition)` mas 50+ outras usam strings literais inconsistentes
**Página/Componente:** `styles.css`, `pages.css`
**Eixo:** Sistema de design
**Evidência:**
- `grep -cE "transition: var\(--transition\)" styles.css pages.css` → 17 hits.
- `grep -cE "transition" styles.css pages.css` → 68 hits totais.
- Strings literais variam: `transition: all 0.3s ease`, `transition: transform 0.3s ease`, `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`, `transition: opacity 0.3s ease`, `transition: width 0.1s ease`, `transition: opacity 0.28s ease`, `transition: background 0.2s, color 0.2s` etc.
- Não há `--transition-fast`, `--transition-slow`, `--transition-base` para opções.
**Problema:** O token `--transition` cobre só o caso default. Para alternativas, devs cunharam strings ad-hoc — variantes nunca documentadas.
**Recomendação:** Adicionar tokens:
```css
--transition-fast: 0.2s ease;
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* atual --transition */
--transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```
Migrar gradualmente. Aceitar `transition: <prop> var(--transition-base)` em vez do all+timing.
**Esforço:** M

### 🟡 Naming inconsistente: `service-card` vs `service-card-full` vs `services-card-content`
**Página/Componente:** `styles.css`, `pages.css`, `services.html`
**Eixo:** Sistema de design
**Evidência:**
- `.service-card` (`styles.css:1635`) — variant carousel (dead, não usado em HTML)
- `.service-card-full` (`pages.css:145`) — variant na services.html (vivo)
- `.service-card-content` (`pages.css:188`) — child de `.service-card-full`
- `.service-card-full` vs `.service-icon-full` vs `.service-icon` — sufixo `-full` aparece e some.
- `.services-grid` (40%/60% layout) vs `.services-grid-full` (flex columns) — naming pluralizando-singularizando.
- Outros: `.service-detail`, `.service-category-preview`, `.services-help`, `.services-overview-categories`, `.services-cta`. Pluralização e modificadores ad-hoc.
**Problema:** Sem convenção (BEM, SUIT, ad-hoc?). `card-full` sugere "tem foto" mas não tem. `services-grid-full` sugere "tem todos os services" mas é só layout. Naming não comunica intent.
**Por que importa:** Onboarding de novos devs. Risk de criar `.service-card-extended` no futuro porque `card-full` já está pego com semântica obscura.
**Recomendação:** Definir convenção (sugiro BEM-lite):
- Container plural: `.services` (a section), `.services__grid` (layout)
- Item singular: `.service-card` (componente)
- Modifiers via `data-*` ou suffix `--`: `.service-card--detailed`, `.service-card--compact`
- Children: `.service-card__icon`, `.service-card__title`
Refator gradual.
**Esforço:** L

### 🟡 Inline `<style>` na home com 5 propriedades — efetivamente inútil
**Página/Componente:** `index.html:73–96`, `index.pt.html:73–94`
**Eixo:** Performance / dívida técnica
**Evidência:** O `<style>` "critical CSS" inline define apenas:
- `body { margin: 0; font-family: "Syne", sans-serif; }`
- `.hero { min-height: 100vh; display: flex; align-items: center; }`
- `.hero-title { font-size: 2.5rem; }` ← contradiz `styles.css:208` que tem `clamp(3rem, 7vw, 5rem)`
- `#heartCanvas { ... border-radius: 32px; }` ← exata cópia de `styles.css:241–248`
**Problema:** "Critical CSS" geralmente é um bloco de várias dúzias de regras para evitar FOUC. Aqui são 5 regras, sendo 2 redundantes com styles.css e 1 conflitante (`hero-title 2.5rem` vs `clamp(3rem...)`). Em desktop o `clamp` ganha (cascade source-order do styles.css que vem depois). Em SSR sem styles.css, hero-title estaria 2.5rem temporariamente.
**Por que importa:** Inline CSS sem propósito é noise. Se for para FOUC mitigation, deveria cobrir o nav/header inteiro.
**Recomendação:** Ou (a) remover o inline `<style>` (styles.css cobre tudo); ou (b) expandir para um critical-CSS real (extraído via tooling como `critical` npm package). Opção (a) é o caminho mais simples.
**Esforço:** S

### 🟡 Inline `style="..."` attributes em form labels e checkbox — copy-pasta entre `index.html` e `portfolio.html`
**Página/Componente:** `index.html:925, 933, 935, 940, 952, 1032; portfolio.html:447, 454, 456, 461, 473, 532`
**Eixo:** Sistema de design
**Evidência:** `grep -cE 'style="' index.html portfolio.html` → 6 cada.
- Mesmo `style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0"` no privacy checkbox container.
- Mesmo `style="width: auto; margin: 0; flex-shrink: 0"` no `<input type="checkbox">`.
- Mesmo `style="font-size: 0.95rem; line-height: 1.2; margin: 0"` na `<label>`.
- Mesmo `style="color: var(--primary); text-decoration: underline"` no link interno.
- Mesmo `style="margin-top: 1rem; font-size: 1rem"` no `#form-message` div.
**Problema:** Inline styles repetidos = micro-componentes não-extraídos. Específico do checkbox de privacy mas reutilizado em 2 forms idênticos. Manutenção duplicada.
**Recomendação:** Extrair para CSS em `styles.css`:
```css
.form-privacy { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0; }
.form-privacy input[type=checkbox] { width: auto; margin: 0; flex-shrink: 0; }
.form-privacy label { font-size: 0.95rem; line-height: 1.2; margin: 0; }
.form-privacy a { color: var(--primary); text-decoration: underline; }
.form-message-out { margin-top: 1rem; font-size: 1rem; }
```
Aplicar classes; remover inline.
**Esforço:** S

### 🟡 Privacy policy CSS duplicada — inline em privacy-policy.html + regras em styles.css mobile
**Página/Componente:** `privacy-policy.html:8–92` (84 linhas inline), `styles.css:2103–2113`, `styles.css:2266–2293`
**Eixo:** Dívida técnica
**Evidência:** O privacy-policy.html tem `<style>` inline com `.privacy-policy-container, .privacy-policy-card, .privacy-title, .privacy-back-btn` etc. Mas styles.css **também** tem regras `.privacy-policy-container, .privacy-policy-card, .privacy-title, .privacy-policy-card h2, .privacy-policy-card p, .privacy-back-btn` em blocos responsive (linhas 2103, 2266). Ou seja, parte do CSS do privacy fica num arquivo, parte noutro.
**Problema:** Quem quiser ajustar o privacy precisa olhar 2 lugares. O privacy.html não importa o `pages.css` (ok, não usa) mas importa o `styles.css` inteiro (56 KB) para usar talvez 5 KB de regras genéricas (`body`, `*, ::before, ::after`, alguns resets).
**Recomendação:** (a) Mover as regras de privacy do styles.css para o `<style>` inline do privacy-policy.html (consolida em 1 lugar); (b) ou criar `privacy.css` separado. Opção (a) é mais simples dado o site sem build.
**Esforço:** S

### 🟡 Inconsistência de `lang` attribute entre páginas EN e PT
**Página/Componente:** `index.html:2`, `index.pt.html:2`, `privacy-policy.pt.html`
**Eixo:** Dívida técnica
**Evidência:**
- `index.html` → `<html lang="en">`
- `index.pt.html` → `<html lang="pt-BR">` (Brasil, não Portugal — embora o estúdio seja em Porto, Portugal)
- `script.js:601`: `document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";` — hardcoded `pt-BR`.
**Problema:** O estúdio é em **Porto**, Portugal. Português europeu usa `pt-PT`. Marcar como `pt-BR` confunde:
- Screen readers podem usar pronúncia brasileira em vez de portuguesa.
- SEO Google: tagging errado afeta resultados em buscas regionais.
- Voice strings: o conteúdo PT mistura "você" (mais BR) com construções PT-PT — consistente com Agent D scope, mas o `lang` errado piora.
**Recomendação:** Trocar para `pt-PT` em todos os arquivos PT + na função JS.
**Esforço:** S

### 🟡 Email pessoal `nathielle@pickypixels.studio` em todos os mailto: e markup — domain knowledge leakage
**Página/Componente:** Várias ocorrências em `index.html`, `portfolio.html`, `services.html`, `studio.html`, `privacy-policy.*`, `script.js` (não), JSON-LD em `index.html:965`
**Eixo:** Dívida técnica
**Evidência:** `grep -c "nathielle@pickypixels.studio" *.html` → ~35 ocorrências.
**Problema:** Caso a Nathielle saia do estúdio ou queira separar inbox pessoal do estúdio, todo o repo precisa ser refatorado. Email "do estúdio" deveria ser `hello@`, `contact@` ou `studio@`.
**Por que importa:** Single point of failure / coupling. Hoje o site declara que "we are 3 founders" mas todos os contatos vão para 1 só.
**Recomendação:** Criar alias `hello@pickypixels.studio` (ou `contact@`) que encaminha para o trio. Refatorar HTML (search-replace). Mais robusto a churn de equipe.
**Esforço:** S

### 🟡 Calendly hardcoded em `nathielle-pickypixels` em ~3 lugares — mesmo domain leak
**Página/Componente:** `index.html:818, 767`; `portfolio.html:342`; `services.html` (search se existe), comentário pricing
**Eixo:** Dívida técnica
**Evidência:** `grep -c "calendly.com" *.html` → 4+ hits, todos `https://calendly.com/nathielle-pickypixels/30min`.
**Problema:** Mesmo issue do email. Se outro membro do estúdio quiser receber chamadas, link continua direcionando para Nathielle.
**Recomendação:** Criar conta Calendly de "team" no plano correspondente OU centralizar a URL numa constante JS / data-attr para mudar em 1 lugar.
**Esforço:** S

### 🟡 `applyTranslations` não trata `<title>`, OG meta tags, ou canonical — SEO half-baked PT
**Página/Componente:** `script.js:582–602`
**Eixo:** Dívida técnica / i18n
**Evidência:** A função aplica translations apenas em `[data-translate]`, `[data-translate-placeholder]`, `[data-translate-label]`. Não toca em:
- `<title>Picky Pixels Studio</title>` — fica EN mesmo no PT toggle.
- `<meta name="description">` — não traduz.
- `<meta property="og:title">`, `<meta property="og:description">` — não traduz.
- `<link rel="canonical">` — não há (pior, porque dois arquivos `index.html` e `index.pt.html` competem por canonicidade).
**Problema:** Toggle EN→PT na home **não muda** o título da aba do browser, nem os metadados sociais. Para SEO PT-PT, faltam `<link rel="alternate" hreflang="pt-PT">` e canonical.
**Recomendação:** Estender `applyTranslations` para suportar `[data-translate-attr="title"]` etc., e adicionar `<link rel="alternate" hreflang="en" href="...">` + `<link rel="alternate" hreflang="pt-PT" href="?lang=pt">` em todas as páginas.
**Esforço:** M

### 🟡 Stale `<meta property="og:image:width" content="1200">` — mas `logo2.png` não é 1200×630
**Página/Componente:** `index.html:25-26`
**Eixo:** Dívida técnica / SEO
**Evidência:**
- `<meta property="og:image:width" content="1200" />` + `height="630"`.
- `og:image` aponta para `https://pickypixels.studio/images/logo2.png` (logo quadrado). Logo no repo: aspect quadrado (1.5 MB PNG, conferir dimensões reais).
**Problema:** Facebook/LinkedIn recortarão o logo para `1200×630` ratio. Resultado: logo distorcido ou cortado em previews.
**Recomendação:** Criar `images/og-image.png` 1200×630px com logo + tagline + paleta da marca. Apontar `og:image` para isso.
**Esforço:** S

### 🟡 Falta `<link rel="canonical">` em todas as páginas
**Página/Componente:** Todas
**Eixo:** SEO / dívida técnica
**Evidência:** `grep -c "rel=\"canonical\"" *.html` → 0.
**Problema:** Sem canonical, search engines podem indexar `pickypixels.studio/index.html`, `pickypixels.studio/`, `pickypixels.studio/index.pt.html` como páginas distintas (duplicate content). Cookies / query strings também viram URLs separadas.
**Recomendação:** Adicionar `<link rel="canonical" href="https://pickypixels.studio/" />` na home, `.../portfolio` na portfolio, etc.
**Esforço:** S

### 🟡 Diretório `Projects/Portfolio-Web /` com **trailing space** — fonte de bugs URL-encoding
**Página/Componente:** `Projects/Portfolio-Web /`
**Eixo:** Dívida técnica
**Evidência:**
- `ls Projects/` → `Portfolio-Marketing/  Portfolio-Web /` (note o espaço antes da `/`).
- `grep -n "Portfolio-Web /" *.html` mostra 9 referências hardcoded com espaço.
- URL final: `Projects/Portfolio-Web%20/Turmeric...` — funciona em servers HTTP modernos (GitHub Pages aceita `%20`), mas é frágil:
  - Cache invalidation: alguns CDNs normalizam `%20` para `+` ou removem trailing slash.
  - Scripts de build/deploy futuros podem reordenar caracteres.
  - Linters de URL alertam.
- O nome "Portfolio-Web " tem espaço onde deveria ser "Portfolio-Web".
**Problema:** Alta probabilidade de quebrar em algum momento (CDN mudança, tooling) sem motivo. Foi criado por engano no Finder/macOS provavelmente.
**Recomendação:** Renomear `Projects/Portfolio-Web /` → `Projects/Portfolio-Web/` (`git mv`), ajustar todos os src= em HTML. Aproveitar para padronizar capitalização (`portfolio-web/`, lowercase, kebab) — todos os assets web.
**Esforço:** S

### 🟡 Inline `<script>` Google Tag Manager duplicado em 5 páginas (sem fonte única)
**Página/Componente:** `index.html:44–57`, `index.pt.html:44–57`, `portfolio.html:25–37`, `services.html:25–37`, `studio.html:21–34`
**Eixo:** Dívida técnica
**Evidência:** O bloco gtag é copiado verbatim 5 vezes. Mudar GA-ID requer editar 5 arquivos.
**Recomendação:** Mover o snippet para `gtag.js` (arquivo separado), incluir via `<script src="gtag.js" async></script>` em todas as páginas.
**Esforço:** S

### 🟡 `transition-property: transform, box-shadow` em `.portfolio-item` (`pages.css:509`) — anti-pattern de hover
**Página/Componente:** `pages.css:507–513`
**Eixo:** Performance
**Evidência:**
```css
.portfolio-item {
  transition: var(--transition);
  transition-property: transform, box-shadow;
  ...
}
```
A 2ª linha **sobrescreve** a `transition` shorthand da linha anterior. Resultado: a duração `0.3s` e easing `cubic-bezier` definidos em `--transition` são preservados (porque shorthand mantém duration/easing) — mas é confuso para ler. E `box-shadow` é caro de animar (causa repaint da box-shadow toda).
**Problema:** Quem lê pode achar que a property final é `all`. Hover de cards triggers shadow recompute em todas as portfolio cards (animado em paralelo se hover muda).
**Recomendação:** Animar apenas `transform` (composited, GPU). Para sombra, usar overlay com `opacity` transition (sombra estática em pseudo-element + fade). Performance > polidez decorativa.
**Esforço:** S

### 🟡 Nenhum `prefers-reduced-motion` honrado — animações 100% obrigatórias
**Página/Componente:** Toda CSS + JS
**Eixo:** Acessibilidade (Eixo E também) / dívida técnica
**Evidência:** `grep -n "prefers-reduced-motion" styles.css pages.css *.js` → 0 hits.
**Problema:** Heart canvas, fade-in animations, hover transforms, gradient animations rodam mesmo se o usuário tem WebKit/OS configurado para `reduce motion`. Para usuários com vestibular issues / motion sensitivity, isso é doloroso.
**Por que importa:** WCAG 2.1 SC 2.3.3 (Animation from Interactions, AAA) recomenda. Não é blocker AA mas é boas-práticas. Um estúdio de design que ignora preferências de motion sinaliza falta de cuidado.
**Recomendação:** Adicionar:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
E early-return em `initParallax`, `initInViewAnimations`, heart-particles canvas se `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
**Esforço:** S

---

## 🟢 LOW

### 🟢 `style="..."` inline em `<a class="copyright">Privacy Policy</a>` em 4 páginas
**Página/Componente:** `index.html:1032`, `portfolio.html:532`, `services.html` (similar), `studio.html:426`
**Evidência:** Mesmo style block `color: var(--primary); text-decoration: underline; font-size: 0.95rem;` repetido inline.
**Recomendação:** Adicionar regra `.copyright a { ... }` em styles.css. Remover inlines.
**Esforço:** S

### 🟢 `Rebeca.JPG` (extensão maiúscula) — inconsistência case-sensitivity em URLs
**Página/Componente:** `images/Rebeca.JPG`
**Evidência:** `ls images/` mostra `.jpg`, `.JPG`, `.jpeg` — 3 convenções diferentes para fotos JPEG.
**Problema:** GitHub Pages é case-sensitive. URL incorreta = 404. Padrão consistente reduz risco.
**Recomendação:** Renomear todas para `.jpg` minúsculo. Ajustar refs HTML.
**Esforço:** S

### 🟢 `script.js` IIFE não-explícito — variáveis `companyProjects`, `currentLang`, `translations` ficam globais
**Página/Componente:** `script.js:1, 71, 73`
**Evidência:** O arquivo declara `const companyProjects = ...`, `let currentLang = "en"`, `const translations = ...` no top-level. Como `<script>` (não module) carrega com escopo global, essas variáveis ficam acessíveis via `window.companyProjects`, `window.translations` para qualquer outro script ou console.
**Problema:** Pollution do `window`. Conflito potencial com bibliotecas terceiras (improvável mas possível). Vazamento de dados (tradução é pública, sem segredo, então pequeno).
**Recomendação:** Wrapping em `(function () { ... })()` ou converter para `<script type="module">` (recomendado se forem para refatoração modular).
**Esforço:** S

### 🟢 `setTimeout(applyTranslations, 280)` em `switchLanguage` mas a transição CSS é `0.28s` — race condition possível em low-FPS devices
**Página/Componente:** `script.js:696–701`, `styles.css:48`
**Evidência:**
- `styles.css:48`: `[data-translate] { transition: opacity 0.28s ease; }`
- `script.js:696`: `setTimeout(() => { applyTranslations(lang); ... }, 280);`
- `setTimeout` no JS roda em milissegundos arbitrários (event loop, throttling). A transição CSS dura **exatamente** 280ms (`0.28s`).
- Problema: em devices com main-thread bloqueada, o setTimeout pode disparar antes do final visual da transition → texto muda enquanto opacidade ainda não chegou em 0 → flash visível.
**Recomendação:** Usar `transitionend` event:
```js
const target = document.body;
target.addEventListener('transitionend', function once() {
  applyTranslations(lang);
  target.removeEventListener('transitionend', once);
}, { once: true });
target.classList.add('lang-switching');
```
**Esforço:** S

### 🟢 `text-shadow: 0 2px 8px #fff9f0;` em vários hero text — efeito praticamente invisível
**Página/Componente:** `styles.css:212, 221, 742; pages.css:54, 64`
**Evidência:** A cor `#fff9f0` é a mesma do `--background`. Aplicar text-shadow com a cor do fundo gera um halo "branco-em-creme" quase imperceptível. Custo: render extra (segunda passada de paint).
**Problema:** Decorativo sem efeito visual real. Removível.
**Recomendação:** Remover. Se o intento era contraste sobre canvas particles, deveria ser `text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)`.
**Esforço:** S

### 🟢 `js gtag` declarações têm `function gtag() { dataLayer.push(arguments); }` sem `'use strict'` ou ES6 rest params
**Página/Componente:** `index.html:51`, etc.
**Evidência:** Função clássica com `arguments`. Funciona, mas é o snippet padrão do Google de 2018.
**Recomendação:** Manter (é o copy oficial). Apenas centralizar em arquivo único como sugerido em finding anterior.
**Esforço:** S

### 🟢 `--secondary` token usado em 8 lugares mas em metade são gradientes que não mostram a cor isolada
**Página/Componente:** `styles.css:271, 283, 430, 2755`; `pages.css:38, 270, 606, 756`
**Evidência:**
- Standalone usage: `color: var(--secondary)` em `.work-link:hover` (`styles.css:430`), `.location-badge` (`pages.css:270`), `.portfolio-category-badge.marketing` (`pages.css:606`), `.category-preview-icon.marketing` (`pages.css:756`).
- Gradients: 4 lugares (shape-2, shape-3, page-hero::after, package-card.pro).
- O token mostarda `#b9ac38` aparece de fato como cor de marketing (badges) — uma decisão de design (Eixo 1, não meu) — mas a maioria dos usos no styles.css é em contextos dead.
**Problema:** Inventário do plano marcou `--secondary` como "usada em 1 lugar" (no canvas heart-particles); na real está em 8 mas alguns são dead. Falsa percepção de underuse.
**Recomendação:** Manter token. Avaliar se a "marketing color = mostarda" decisão pega — é menor.
**Esforço:** -

### 🟢 `companyProjects` dataset no JS com `src` paths relativos sem `loading="lazy"` ou `decoding="async"` quando renderizados
**Página/Componente:** `script.js:1130–1135` (criação dinâmica de `<img class="carousel-thumb">`)
**Evidência:**
```js
const thumbnail = document.createElement("img");
thumbnail.className = "carousel-thumb";
thumbnail.src = item.src;
```
Não seta `thumbnail.loading = "lazy"` nem `thumbnail.decoding = "async"`. As thumbs (até 8 por modal) carregam imediatamente quando o modal abre, em sequência blocking de decode.
**Recomendação:** Adicionar `thumbnail.loading = "lazy"; thumbnail.decoding = "async";`. Pequeno mas sensível em mobile.
**Esforço:** S

### 🟢 `submitContactForm` não previne double-submit nem desabilita o botão durante request
**Página/Componente:** `script.js:873–910`
**Evidência:** A função `submitContactForm` faz `fetch`, mas durante o `await response = await fetch(...)`, o botão `submit-btn` continua clicável. Se o usuário clica 2× rápido, dispara 2 requests (potencial 2 mensagens no Formspree).
**Recomendação:** Adicionar `submitBtn.disabled = true;` no início; `submitBtn.disabled = false;` no `finally`. Bonus: trocar texto para "Enviando..." durante.
**Esforço:** S

### 🟢 `/* Custom Cursor */` comment órfão na styles.css é um sinal de "estava aqui mas removeram"
**Página/Componente:** `styles.css:57`
**Evidência:** Já abordado no CRITICAL — apenas o aspecto "comentário sem regras é ruído".
**Recomendação:** Junto com a remoção da feature, remover o comentário.
**Esforço:** -

### 🟢 `<canvas id="heartCanvas">` sem `aria-hidden="true"` — flag a11y (não é meu eixo, mas evidente)
**Página/Componente:** `index.html:271`, `index.pt.html:265`
**Evidência:** O canvas é puramente decorativo (heart particles), mas `cursor: pointer` (`styles.css:247`) sugere clickable. Não tem `aria-label` nem `aria-hidden`.
**Recomendação:** Agent E confirma — adicionar `aria-hidden="true"` ao `<canvas>` e remover `cursor: pointer` (nada acontece on click).
**Esforço:** S

### 🟢 `script.js:1217`: `element.innerHTML.replace(/\d{4}/, ...)` para atualizar copyright year — usa innerHTML em vez de textContent
**Página/Componente:** `script.js:1215–1219`
**Evidência:** `updateCopyrightYear` faz regex sobre innerHTML. Funciona para o copyright mas é overkill (innerHTML invoca parser HTML). Para uma string sem markup, `textContent` é mais rápido e seguro.
**Recomendação:** Trocar por `element.textContent = element.textContent.replace(/\d{4}/, new Date().getFullYear())`. Bonus: o ano "2026" hardcoded em todas as 5 páginas pode ficar como "&copy; 2024 Picky Pixels Studio." e o JS atualiza ao carregar — mas se JS falhar mostra ano antigo. Trade-off menor.
**Esforço:** S

### 🟢 `<title>` tags inconsistentes entre páginas
**Página/Componente:** Todas
**Evidência:**
- `index.html`: `Picky Pixels Studio`
- `index.pt.html`: `Picky Pixels Studio` (mesmo título — não diferenciado por idioma para SEO)
- `portfolio.html`: `Our Work - Picky Pixels Studio`
- `services.html`: `Our Services - Picky Pixels Studio`
- `studio.html`: `About Us - Picky Pixels Studio` (provavelmente — confirmar)
- `privacy-policy.html`: `Privacy Policy | Picky Pixels Studio` (separador `|` em vez de `-`)
**Problema:** Mistura de separators (`-` vs `|`), padrão "Sobre" inconsistente (Studio vs About Us vs ...).
**Recomendação:** Padronizar: `[Page] | Picky Pixels Studio` ou `[Page] — Picky Pixels Studio`. Atualizar via i18n.
**Esforço:** S

---

## 💡 SUGGESTION

### 💡 Adotar Lightning CSS / esbuild minify (zero-config) sem mudar arquitetura
**Eixo:** Performance
**Sugestão:** Sem build step pesado, é viável usar `npx lightningcss-cli` em GitHub Actions pre-deploy para minificar CSS / JS sem alterar fluxo. styles.css 56 KB → ~30 KB minified; script.js 57 KB → ~25 KB. Combinado com gzip do GitHub Pages, ~80% redução wire.
**Esforço:** S (Action setup)

### 💡 Service Worker para offline / repeat-visit boost
**Eixo:** Performance
**Sugestão:** Site é estático, sem dados sensíveis em runtime. Um SW simples com cache-first para CSS/JS/images garante repeat-visit instantâneo + offline page. Tools: Workbox, ou ~30 linhas de SW manual.
**Esforço:** M

### 💡 Subset Google Fonts via `unicode-range` ou self-host — Syne é só Latin
**Eixo:** Performance
**Sugestão:** Atualmente: `https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap` — carrega 5 weights. Self-host com `font-display: swap` + apenas `weights 400, 700, 800` (que efetivamente são usados) reduz round-trips. Precarregar apenas weight 400 (body).
**Esforço:** M

### 💡 Remover IIFE `(function () { ... })()` do `heart-particles.js` e converter para módulo importado lazy
**Eixo:** Performance
**Sugestão:** O canvas heart só anima na home, lado direito do hero. Carregar `heart-particles.js` (~5 KB) sob `IntersectionObserver` no `#heartCanvas` evita custo nas outras páginas. Hoje só `index.*.html` carregam, então OK — mas a feature é "below the fold" em mobile (hero stack). Valor: diferimento.
**Esforço:** S

### 💡 Adicionar `robots.txt` + `sitemap.xml` (não há)
**Eixo:** SEO / dívida
**Evidência:** `ls *.txt *.xml` retorna nada.
**Sugestão:** `robots.txt` para `Disallow: /hero-*` (pelo menos enquanto eles existirem) e `sitemap.xml` declarando as 5 páginas de produto + 2 privacy.
**Esforço:** S

### 💡 Adicionar GitHub Actions workflow `.github/workflows/lint.yml` para HTMLHint, Stylelint, ESLint
**Eixo:** Dívida técnica
**Sugestão:** Hoje não há linting. Um workflow simples que roda em PR pegaria muitos dos issues acima (cores hardcoded, !important abuse, JS sem `defer`, alts faltando) automaticamente.
**Esforço:** M

### 💡 Documentar tokens em CLAUDE.md ou DESIGN.md — onboarding zero hoje
**Eixo:** Sistema de design
**Sugestão:** Não existe README, CLAUDE.md, ou DESIGN.md. Para um estúdio que vende "systems thinking", a falta de docs de seu próprio sistema é incongruente. Mesmo um arquivo de 50 linhas listando: "Tokens (`--primary`, `--text`, ...), Components (`work-card`, `service-card-full`, ...), Naming convention" reduziria muito o atrito futuro.
**Esforço:** M

---

## Scores

**Sistema de design axis score: 4/10**
Tokens existem mas são bypassados (~40 hardcodes hex; `--bg` referenciado e nunca declarado). Border-radius com 5+ valores ad-hoc. Naming inconsistente (`service-card` vs `service-card-full` vs `services-card-content`). Componentes que deveriam ser um (`portfolio-item` + `company-card`; `image-overlay` + `company-modal`) são dois com drift visual e funcional. CSS multi-arquivo (styles.css + pages.css + 0-byte footer.css) sem boundaries claras. ~700 linhas de CSS dead. Não há documentação. O sistema "funciona" no sentido superficial mas não escala — exatamente o oposto do que a thesis do estúdio promete.

**Performance/Dívida técnica axis score: 3/10**
Render-blocking CSS+JS sem `defer`. Logo de 1.5 MB preloaded. Imagens de portfolio entre 1-4.5 MB cada (PNGs sem WebP). Font Awesome inteiro via CDN para 50 ícones. ZIP de 26 MB servido publicamente. 8 páginas órfãs deployadas (`hero-N.html`). 145 linhas de HTML comentado + 700 linhas de pricing CSS dead. JS monolítico de 1237 linhas misturando i18n + dataset + UI. `distributeColumns()` reimplementa em JS o que CSS multi-column faz nativamente. Custom cursor com HTML+JS shipped mas CSS vazio (feature broken-by-default). `initParallax` sem `data-parallax` em HTML algum. Two-files-per-language strategy já driftou (`form-message`: "Tell me" vs "Tell us", nav-link "Serviços" sem `data-translate`). Translation system half-implemented (não atualiza title/meta). 37 blocos `@media` em styles.css com mesmos breakpoints repetidos 14× cada. Five `!important` num site sem framework. `images/favicon.png` 404 em todas as páginas. CNAME aponta para domain mas não há build/deploy script nem linting. O site tecnicamente funciona — mas está a um redesign de distância de colapsar sob a própria dívida.

---

**Total findings:** 47 (4 CRITICAL, 17 HIGH, 19 MEDIUM, 11 LOW, 6 SUGGESTION).
