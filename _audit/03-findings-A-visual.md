# 03 — Findings A — Visual Critic

Auditor: Senior Product Designer (Pentagram / IDEO / Linear lineage). Date: 2026-05-12. Scope: identidade visual, paleta, tipografia, animação, iconografia, fotografia, hierarquia visual. Pesquisa, evidências em screenshots ao vivo (1280x800 / 375x812) + leitura de `styles.css`, `pages.css`, `index.html`, `studio.html`, `portfolio.html`, `services.html`, `heart-particles.js`.

A régua é a tese declarada no próprio `studio.html`:
> "Great agency websites should already feel like proof. The site itself needs to demonstrate judgment, technical polish, content hierarchy, and a clear point of view."

Findings ordenados por severidade.

---

## CRITICAL

### 🔴 O hero contradiz a tese inteira do estúdio em três decisões empilhadas
**Página/Componente:** `/index.html` → `.hero-title` + `#heartCanvas` + `.greeting`
**Eixo:** Identidade visual & coerência de marca
**Evidência:** `styles.css:215-227` (gradient-text + outline-text), `heart-particles.js:1-173`, `index.html:242-273`, screenshot live do hero com hover ativo (heart-shape-network formado).
**Problema:** Três efeitos clichê pré-2018 coexistem na primeira tela: (1) **particle-network on hover** formando um **coração literal** — particles.js + Y2K rom-com em uma só decisão; (2) **gradient text 135deg laranja-rosa** na palavra "Marketing", padrão que dominou portfolios de freelancer entre 2017-2019; (3) **outline text** (-webkit-text-stroke) na frase "With Heart" — gimmick display anos 2010 que aqui pesa duplo porque a palavra "Heart" também está sendo desenhada literalmente como animação ao lado. O greeting "👋 Hey there, we're Picky Pixels!" com emoji wave fecha o quadro: hero MailChimp 2019 / Squarespace template.
**Por que importa:** O hero é o veredicto do visitante em <2s. A tese do estúdio diz "design taste, judgment, point of view" — o hero entrega "stack de efeitos sem editor". Studios que vendem taste (Linear, Vercel, Basement, Raw, Rauno) NÃO usam mais nenhuma dessas três técnicas em hero há 5+ anos. Um lead técnico que abre este site fecha a aba antes do scroll.
**Recomendação:** Refazer o hero do zero com 1 ideia, não 3. Padrão atual de studios que sobrevivem ao escrutínio (basement.studio, raw.studio, work.co, ueno-defunct-but-archive): tipografia display em peso/tamanho extremo + grid editorial vazio + UMA peça visual única (vídeo curto de processo, frame estático de um projeto real, ou uma única ilustração custom). Não usar particle network, gradient text na H1, outline text na H1, ou emoji no greeting. Se tiver que escolher um único accent visual, escolher ou o gradient OU o outline — nunca os dois — e aplicá-lo a 1 palavra de accent, não ao primeiro e ao terceiro line do H1.
**Esforço:** L

### 🔴 Logo brega contradiz a paleta e o positioning
**Página/Componente:** Global → `.nav-brand .logo img` (`images/logo2.png`)
**Eixo:** Identidade visual & coerência de marca
**Evidência:** Arquivo `images/logo2.png` lido diretamente — duas linhas "Picky Pixels" em script bouncy rosa-claro com contorno laranja, mais "STUDIO" em sans serif marrom mostarda abaixo. Logo aparece em 100% das páginas via `width=120 height=120`.
**Problema:** O logo é uma fonte Cooper/Sniglet-style script bouncy infantilizada com contorno chunky — visual de cupcake shop, doceria artesanal, ou Etsy storefront. Não dialoga com a paleta laranja queimado/marrom do resto do site (a única conexão é o contorno laranja); o "STUDIO" amarelo-mostarda é o ÚNICO uso do `--secondary` em todo o site fora do canvas. Para um estúdio que vende **Software Engineering, Mobile Development, marketing estratégico para small business, websites de €475-950**, o logo sinaliza "wedding stationery" / "custom illustration on Instagram". O cliente que paga €950 por um Soulful Shop confia mais em uma logo wordmark sóbria.
**Por que importa:** Logo é o token de marca mais reusado do sistema — aparece em 100% das páginas em 2 lugares (nav + footer), é o OG image (`images/logo2.png`), está no `<title>` favicon. O conflito entre logo (cupcake) e site (sober beige + orange) cria uma rachadura cognitiva permanente: o usuário não sabe se o estúdio é cute-craft ou sério-técnico. Pentagram, em qualquer cliente, alinharia esses dois ou redesenharia um deles.
**Recomendação:** Refazer wordmark. Referência concreta: Linear (wordmark geométrica em peso único, 1 cor), Basement (wordmark sans grotesque), Pentagram-house (Helvetica wordmark), ou Vercel (▲ + sans uppercase). Manter "Studio" se for parte do nome legal, mas em mesma família e mesmo peso. Se a ambição for guardar algo do "heart" no logo, fazer como o Notion fez com o glyph N: 1 forma geométrica simples + wordmark neutro. Custo: 4-8h com designer ou usar Fontshare + alinhamento simples.
**Esforço:** M

### 🔴 Foto da equipe quebra coesão visual catastroficamente
**Página/Componente:** `/index.html` → `.team-grid` (e `/studio.html` mesma sessão repetida)
**Eixo:** Identidade visual / fotografia
**Evidência:** Screenshot live scroll ~2400px, `images/Nathielle.jpg`, `images/Rebeca.JPG`, `images/marcos.jpeg`. Inventory item #4.
**Problema:** Três fotos com **zero atributos compartilhados**: (a) Nathielle — recorte de foto noturna de festa, fundo marrom borrado, blusa coral, iluminação flash; (b) Rebeca — retrato diurno em ambiente claro, fundo cinza/azul, blusa preta, iluminação natural difusa; (c) Marcos — retrato outdoor com fundo verde de árvores e arquitetura amarela atrás, casaco de inverno azul. Os três se parecem ter sido tiradas em três cidades, três anos, três fotógrafos diferentes (provavelmente foram). Para um estúdio cuja tese é "intentional, not generic", isto é evidência empírica oposta no scroll mais visto da página.
**Por que importa:** Team page é onde o visitante decide se confia no fornecedor. Fotos heterogêneas dizem ao recruiter / lead "este time não conversou nem 30 minutos sobre como se apresenta". Studios sérios alinham 3 atributos mínimos: (1) crop (rosto+ombros, mesma altura de busto), (2) fundo (mesma cor sólida ou mesma textura), (3) tom de cor (warm/cool/neutral consistente). Pentagram team page, IDEO team page, Linear team page — todas usam fotos batidas no mesmo dia ou normalizadas em pós (B&W, ou desaturadas, ou mesmo background gradient).
**Recomendação:** Opção A (€300, 3h): contratar 1 sessão fotográfica conjunta no estúdio físico em Porto, mesma luz, mesmo fundo, dress code combinado. Opção B (€0, 1h): converter as 3 fotos atuais para preto-e-branco ou mono-tone laranja/sépia em pós (Photoshop / Affinity), normalizar contraste e crop a 1:1 com mesmo headroom. Referência: github.com/team página, basement.studio/about — ambas alinharam com filtro consistente. NÃO ACEITÁVEL: deixar como está e chamar de "personal".
**Esforço:** S (filtro mono) ou M (refoto)

### 🔴 Cards "Personal / Strategic / Collaborative" são template Squarespace literal
**Página/Componente:** `/index.html` → `.owner-values .value-item` (3 instâncias)
**Eixo:** Identidade visual / iconografia
**Evidência:** `index.html:530-546`, `styles.css:777-812`, screenshot live scroll ~3200px.
**Problema:** Três value cards com `<i class="fas fa-heart">` + `<i class="fas fa-lightbulb">` + `<i class="fas fa-handshake">` acima de títulos genéricos ("Personal", "Strategic", "Collaborative") + descrições genéricas ("Designs and strategies that reflect your unique story", "Creative solutions with purpose", "Fun and stress-free process"). Este conjunto exato — heart/bulb/handshake + os mesmos três adjetivos — é o **template padrão "About Us values"** que aparece em Squarespace Bedford, Wix Aida, Wordpress Astra theme. É o "Lorem Ipsum" das about pages SMB.
**Por que importa:** Studios que vendem taste **não usam icone genérico em valores** porque o ícone genérico DESCREVE genericamente — "lightbulb=ideia" é a definição literal de "lugar-comum visual". Pior: este bloco aparece logo depois das fotos heterogêneas e do "We're Nathielle, Rebeca and Marcos" — três sinais consecutivos de que o estúdio não passou pela própria fricção que recomenda aos clientes.
**Recomendação:** Deletar este bloco inteiro. Substituir por um único parágrafo de 2-3 frases assinado pelos três (ou cada um escreve uma linha), sem ícones decorativos. Referência: studio.tonik.com/about ("a manifesto, not a values bullet list"), pentagram.com/profile (Pentagram nunca lista values). Se precisar de contraste visual, usar uma quote pull em tipografia grande (1 frase, 4rem), não 3 cards. Se manter cards, então: ícones custom feitos especificamente, NÃO Font Awesome decorativo; ou números (01/02/03) sem ícone nenhum, como o `studio.html` já faz no process.
**Esforço:** S (delete) ou M (replace com manifesto)

---

## HIGH

### 🟠 Section labels (pílulas amarelas pequenas) não criam hierarquia
**Página/Componente:** Global → `.section-label`, `.contact-label`, `.studio-note-label`
**Eixo:** Hierarquia visual / sistema tipográfico
**Evidência:** `styles.css:629-638` e `styles.css:1252-1262` (definidas duas vezes), screenshots: section "Some of Our Favorite Projects" sem badge visível no desktop (label provavelmente cortado por padding negativo), section "Meet The Studio" com badge `#fff3c1` background + `#7a3b00` text.
**Problema:** A pílula amarela com texto marrom pequeno tipo `font-size: 1rem` (originalmente) ou `0.9rem` (na 2ª definição) em `text-transform: uppercase letter-spacing: 2px` é o **Squarespace eyebrow label clássico** — não cria contraste suficiente com o background `#fff9f0`/`#fffaf5` para funcionar como ancoragem visual, e desaparece da hierarquia quando contrastado contra um H2 de 3rem. Pior: a class `.section-label` é redefinida 2x em `styles.css` (linhas 629 e 1252) com valores ligeiramente diferentes, indicando que ninguém auditou o sistema. No screenshot da seção "Work" da home, o label "Selected Work" não aparece visível acima do title — está lá no DOM mas é completamente apagado pelo título.
**Por que importa:** Eyebrow labels existem para ancorar o leitor ("você está lendo a seção X"). Quando são pequenos demais, com cor neutra demais, e com tipografia idêntica às outras micro-cópias do site, eles viram ruído sem função. Em studios sérios o eyebrow é tratado como uma decisão tipográfica forte — Linear usa monospace IBM Plex Mono em peso médium 12px com 1px tracking; Vercel usa um simples `text-sm uppercase` mas em cor `text-zinc-400` num site dark, criando contraste alto.
**Recomendação:** (1) Consolidar definição em uma só. (2) Trocar para um padrão monoespaço (IBM Plex Mono ou JetBrains Mono via Fontshare) para criar contraste de família contra o Syne do resto, sem o background pílula. (3) Ou eliminar 100% dos eyebrows e usar numeração sequencial (01, 02, 03) como o `studio.html` já faz no process — assim o site adota um único sistema de "ankering" em vez de dois.
**Esforço:** S

### 🟠 Gradient text laranja→rosa é a marca registrada da era 2017-2019
**Página/Componente:** `.gradient-text` (hero-title em /index, .contact-title, .page-hero-title em /portfolio + /services + /studio)
**Eixo:** Identidade visual / animação taste
**Evidência:** `styles.css:215-222`, `styles.css:919-924` (`.contact-title`), `pages.css:59-61`. Screenshots de "Marketing" no hero, "Proud" no portfolio hero, "Creative" no services hero, "Technical Depth" no studio hero, "Let's Create Something You're Proud Of" no contact.
**Problema:** Linear-gradient `135deg, #ff5e32 60%, #ff88be 100%` aplicado a texto via `-webkit-background-clip: text` é o tropo visual mais associado à era SaaS-startup-landing-page de 2017-2019 (Stripe-clones, primeiras versões do Linear, todos os portfolios bootcamp dev em react). Aparece em 4 títulos de hero diferentes, criando um padrão repetitivo de "1 palavra colorida" em cada page-hero — um tique visual em vez de uma decisão. Pior: o gradiente vai de saturação alta (`#ff5e32` punchy) para baixa (`#ff88be` pastel), criando um washout no fim da palavra que parece descolorido em telas com brilho médio.
**Por que importa:** Em 2026 gradient text é equivalente visual a `<marquee>` em 2010 — funciona, é familiar, mas data o site instantaneamente. Estúdios que querem demonstrar visual taste evitam isso há anos. Linear hoje usa cor sólida em wordmark/H1 e reserva gradient para borders sutis; Vercel usa gradient só em background mesh, nunca em texto; Basement faz só weight extremo.
**Recomendação:** Remover `.gradient-text` 100%. Trocar por: (a) cor sólida `var(--primary)` quando precisar de accent color, ou (b) tipografia em peso extra-bold com tracking ajustado para criar contraste sem cor. Se ABSOLUTAMENTE precisar de gradient como signature visual, usar UMA VEZ no site inteiro (apenas no hero da home), e fazer um gradient direcional bem mais sutil (10-15deg, 2 tons da mesma família) — não 135deg de cor primária para cor accent.
**Esforço:** S

### 🟠 Outline text (-webkit-text-stroke) é gimmick display que sangra a leitura
**Página/Componente:** `.outline-text` em hero index, services hero ("Brand")
**Eixo:** Identidade visual / tipografia
**Evidência:** `styles.css:224-227`, screenshot live mostra "With Heart" em outline 2px sobre creme `#fff9f0`.
**Problema:** `-webkit-text-stroke: 2px #2d1f1a` com `color: transparent` em uma tipografia display heavy como Syne em peso 700+ produz um efeito vazio-com-borda que (a) é truque hero clichê 2014-2018, (b) reduz radicalmente o contraste da palavra contra o fundo creme — o stroke 2px não consegue pintar área suficiente para criar massa visual à distância, então a palavra mais importante da frase "With Heart" parece **mais fraca** que as outras duas linhas, invertendo a hierarquia desejada, (c) some completamente em mobile pequeno onde 2px de stroke num glyph de 26px parece quase invisível. Combinado com o gradient-text na linha 1 e a literalidade do "Heart" sendo formado em particles ao lado, o efeito é "três truques em três linhas".
**Por que importa:** O hero é onde o estúdio precisa parecer mais confiante, não mais decorativo. Outline text na frase principal é a versão display da gravata-borboleta do garçom — sinaliza esforço, não classe. Studios sérios (Pentagram, Hassan, Mubien) usam tipografia em peso forte + cor sólida + tracking ajustado, sem efeitos.
**Recomendação:** Remover `.outline-text` da hero. Trocar "With Heart" por mesmo peso + cor sólida em `var(--text)`, OU se quiser destacar 1 palavra, escolher 1 dos 3 efeitos (gradient OU outline OU sublinhado custom) — nunca 2 — e aplicá-lo a 1 palavra ÚNICA do hero, não a uma frase inteira. Referência: Vercel.com hero (cor sólida, 1 palavra accent), Linear product page (sem accent visual, só weight).
**Esforço:** S

### 🟠 Logo extrapola altura do nav e cria desalinhamento visual constante
**Página/Componente:** `.main-nav .nav-brand .logo img`
**Eixo:** Composição / responsividade visual
**Evidência:** `styles.css:73-75` (`height: 100px; min-height: 100px; max-height: 100px;` mais `overflow: visible`) + `styles.css:90-92` (`.nav-brand .logo img { height: 120px }`). Screenshot mobile e desktop.
**Problema:** O logo é declarado com `height: 120px` dentro de um nav cuja altura **fixa** é 100px e tem `overflow: visible`. O logo, portanto, **transborda 20px verticais** do nav em todas as páginas. No desktop screenshot fica visível: o card branco do logo "encosta" no border bottom do nav e desce de leve. Em mobile o ajuste já foi feito (`80px` logo / `80px` nav), mas no desktop continua. O `overflow: visible` é uma admissão de que o autor sabia que o logo não cabe e desligou o crop. Em uma identidade que se quer "judgment", isto é o equivalente visual de uma camisa com a etiqueta para fora.
**Por que importa:** Esse desalinhamento aparece em 100% das páginas, em 100% dos scrolls, em 100% das viewports >768px. É talvez o problema visual mais visto do site inteiro depois do hero.
**Recomendação:** Decidir uma das duas: (a) reduzir logo para 64-72px de altura e nav para 72px (padrão de site profissional moderno: linear.app=64px, vercel=64px, stripe=72px), ou (b) aumentar nav para 130px e manter logo em 120px com padding interno consistente. Recomendação A — sites de studio modernos usam navs MAIS finos, não mais grossos. O backdrop-filter blur já está aplicado, então a fina barra de 64px ainda sinaliza a presença sem comer espaço.
**Esforço:** S

### 🟠 Border-radius caótico em 6 valores diferentes coexiste sem sistema
**Página/Componente:** Global → tokens
**Eixo:** Sistema de design
**Evidência:** `styles.css:18` define `--border-radius: 12px`; uso real em `pages.css` e `styles.css`: 8px (form inputs), 12px (services-note, services-icon-full), 14px (portfolio-item mobile), 16px (service-card-full), 18px (portfolio-item, studio-step, company-card, service-category-preview), 20px (studio-note, company-modal-content), 32px (#heartCanvas), 50%/100px (botões pílula).
**Problema:** Seis valores de border-radius diferentes em uso, sem sistema discernível. O token oficial (12px) só é usado em 3-4 lugares; o resto é hardcoded. Por que cards de portfolio usam 18px mas cards de studio-step usam 18px e cards de service são 16px e modal é 20px? Não há resposta — é entropia. O canvas do heart usa 32px, criando uma curvatura mais forte que tudo ao redor. Em uma página, o usuário vê 4-5 raios diferentes lado a lado.
**Por que importa:** Border-radius é uma das micro-decisões mais visíveis de design system. Tata Consultancy, Tailwind, Material Design — todos publicam sistemas escalonados (sm/md/lg). Quando um site tem entropia de raio, ele anuncia "não temos design system, fizemos cada componente isolado". Para um estúdio que vende "Systems Thinking" como princípio (`studio.html`), isso é contradição direta com a thesis.
**Recomendação:** Definir 3-4 raios no token system: `--radius-sm: 8px` (inputs), `--radius-md: 16px` (cards, modals, buttons regulares), `--radius-lg: 24px` (heroes, large containers), `--radius-pill: 999px` (badges, pílulas). Eliminar 100% dos hardcoded. Pode usar Tailwind defaults como referência, ou Linear's design system docs (`linear.app/method`). Custo: 1h de refactor + 30min de QA visual.
**Esforço:** S

### 🟠 Cards Web vs Marketing: dois designs distintos para o mesmo conceito
**Página/Componente:** `/portfolio.html` → `.portfolio-item` (web) vs `.company-card` (marketing)
**Eixo:** Sistema de design / componentização visual
**Evidência:** `pages.css:503-640` (.portfolio-item) vs `pages.css:1063-1145` (.company-card). Screenshot portfolio.
**Problema:** Os dois patterns visuais coexistem na mesma página, sem justificativa visual: web cards têm aspect-ratio 4/3, badge `Web Design` colorido em rosa pálido + `Visit Website` link com ícone external — marketing cards têm aspect-ratio 16/10, badge "X projects" em white-pill no canto da imagem, nada de link. Quando o usuário olha a página, percebe imediatamente "estes dois grupos foram feitos por dois designers diferentes". Nada nos dois designs comunica que a categoria semântica é a mesma ("trabalho do estúdio") — eles parecem dois tipos de produto diferentes.
**Por que importa:** A página de portfolio é a prova de "Systems Thinking" do estúdio. Quando dois designs coexistem para o mesmo conceito, o estúdio anuncia a falta de framework próprio. Studios sérios (basement.studio/work, raw.studio/works) usam UM card pattern com variantes mínimas (categoria como tag, não como pattern visual completamente diferente).
**Recomendação:** Adotar UM card pattern só. Variantes possíveis: badge de categoria pode mudar de cor (web=laranja, marketing=mostarda), aspect ratio pode ficar igual (4:3 funciona para os dois), e o CTA pode adaptar (web=link externo "visit", marketing=botão "view case"). O detalhe que diferencia (1 imagem vs múltiplas imagens) deve viver no MODAL ou em um sub-componente do mesmo card, não em um redesign visual completo.
**Esforço:** M

### 🟠 Cores hardcoded fora do token system criam paleta paralela
**Página/Componente:** Global → várias regras CSS
**Eixo:** Sistema de design / paleta
**Evidência:** `styles.css:211` (`#2d1f1a`), `styles.css:196` (`rgb(255, 243, 193)`), `styles.css:198` (`rgb(122, 59, 0)`), `pages.css:1188-1190`, `styles.css:634-635` (`#7a3b00` + `#fff3c1`), `pages.css:534-535`, `styles.css:400` (`#b93a00`), `styles.css:372` (`#3a2200`), `styles.css:1150` (`#7a3b00` em `.btn-primary:hover`), `pages.css:1170` (`#fff` fallback `var(--surface, #fff)`).
**Problema:** Existem **9 cores hardcoded fora do token system**, formando uma paleta paralela invisível. `#2d1f1a` aparece em hero-title, owner-role, page-hero-title, modal text como "marrom-quase-preto" — mas nunca virou um token `--text-strong`. `#fff3c1` aparece em pelo menos 3 componentes distintos como background pílula. `#7a3b00` aparece em pelo menos 3 lugares como text-on-pill. `#3a2200`, `#b93a00`, `#3a2200` são marrons aleatórios sem token. Isso significa que mudar a paleta exige um find-and-replace em todos os arquivos — exatamente o oposto do que tokens existem para fazer.
**Por que importa:** Quando um cliente pede "podemos testar uma paleta mais sóbria?", o desenvolvedor descobre que o rebranding leva 3x mais tempo do que deveria. Para um estúdio que se vende como "Systems Thinking", ter um sistema de tokens **ignorado pelo próprio site** é confissão pública. Esta é a menor severidade técnica entre os HIGH mas a maior severidade simbólica.
**Recomendação:** Auditoria de paleta. Definir tokens semânticos: `--text` `--text-strong` `--text-light` `--accent-bg` `--accent-fg` `--brand-primary` `--brand-primary-hover` `--brand-secondary`. Substituir 100% dos hardcoded por tokens. Onde houver dúvida, escolher o token semanticamente correto, não o visualmente próximo. Custo: 2-3h.
**Esforço:** M

---

## MEDIUM

### 🟡 Page-hero ::before/::after blob blurs são datados (era Stripe 2018-2019)
**Página/Componente:** `/portfolio.html`, `/services.html`, `/studio.html` → `.page-hero::before` + `.page-hero::after`
**Eixo:** Animação taste / decoração visual
**Evidência:** `pages.css:17-41` — dois círculos 400px e 300px com `border-radius: 50%`, `background: linear-gradient(135deg, var(--primary), var(--accent))`, `opacity: 0.08/0.06`, `filter: blur(80px/60px)`.
**Problema:** Background blob blurs gradient são quintessencialmente "Stripe-clone landing 2018-2020". Funcionavam quando a indústria estava migrando de gradientes flat para gradientes mesh — em 2026 é tropo cansado, especialmente em opacity tão baixa (0.06-0.08) que mal se vê no creme `#fff9f0`. A função visual atual é praticamente nula: o usuário não vê os blobs, mas o markup carrega 2 pseudo-elementos com `filter: blur(80px)` em cada page-hero, o que custa GPU em mobile.
**Por que importa:** Em sites de studio modernos, decoração de hero é tratada de duas formas opostas: (1) zero ornamento, hero clean — Linear, Vercel, Pentagram; ou (2) ornamento autoral muito forte e único — Basement.studio, Raw.studio. Blob blur 0.06 opacity é o "default Bootstrap landing": presente, ineficaz, marcado como "fizemos esforço em 2018".
**Recomendação:** Remover ambos os pseudo-elementos. Substituir por: nada (hero limpo) ou por uma decoração custom — uma SVG geométrica autoral, uma escultura tipográfica gigante (palavra de fundo com opacity 0.04), ou um marker visual real (linha vertical com timestamp/número).
**Esforço:** S

### 🟡 Iconografia mistura Font Awesome decorativo + utilitário sem sistema
**Página/Componente:** Global
**Eixo:** Iconografia / sistema visual
**Evidência:** Inventory item — "uso pesado de Font Awesome (>40 ícones diferentes)". Lista de ícones decorativos: `fa-heart`, `fa-lightbulb`, `fa-handshake`, `fa-compass-drafting`, `fa-layer-group`, `fa-code`, `fa-bullhorn`, `fa-laptop-code`, `fa-microchip`, `fa-mobile-screen`, `fa-palette`, `fa-video`, `fa-gift`, `fa-paper-plane`, `fa-check`. Lista de utilitários: `fa-external-link-alt`, `fa-arrow-right`, `fa-times`, `fa-envelope`, `fa-calendar-check`, `fa-whatsapp`, `fa-instagram`, `fa-github`, `fa-linkedin-in`, `fa-chevron`.
**Problema:** O site usa Font Awesome de duas maneiras conflitantes: (a) **decorativa**, onde o ícone é a "ilustração" do bloco (heart, lightbulb, handshake nos values; compass, layers, code nos princípios; palette, video, microchip nos serviços) — uma escolha que sempre soa genérica porque FA é uma biblioteca de tropos universais; (b) **utilitária** (envelope, arrow-right, external-link), onde os ícones cumprem função real. Misturar os dois usos sem hierarquia visual cria ruído: o `fa-bullhorn` (decorativo) e o `fa-envelope` (utilitário) recebem o mesmo peso visual.
**Por que importa:** Studios que vendem visual taste **não usam Font Awesome decorativo** porque uma biblioteca compartilhada com 5 milhões de outros sites é o oposto de "intentional". Eles usam: ícones custom desenhados (basement, ueno), Lucide ou Phosphor (linha mais sóbria, comunitária mas menos cliché), ou simplesmente sem ícones.
**Recomendação:** (1) Trocar Font Awesome por **Lucide** (lucide.dev) — biblioteca outline minimalista, peso de stroke consistente, pesa 80% menos que FA quando tree-shaken. (2) Reservar ícones APENAS para função utilitária (UI controls, social, link external). (3) Eliminar TODOS os ícones decorativos dos values, princípios, services-cards, services-overview-categories — substituir por números (01/02/03) ou por nada. Para o studio.html principles, o número da posição já serve de marker.
**Esforço:** M

### 🟡 Cursor follower + scroll progress bar = ornamento sem benefício
**Página/Componente:** `/index.html` → `.cursor-follower` + `.scroll-progress`
**Eixo:** Animação taste / utilidade vs ornamento
**Evidência:** `index.html:133-137`, `styles.css:1198-1214`. Cursor follower só está na home (não nas páginas internas). Scroll progress bar em todas as páginas como barra laranja 3px no topo.
**Problema:** **Cursor follower** custom é decoração que: (a) não comunica nenhuma informação adicional ao usuário, (b) só aparece em desktop com mouse — invisível em touch (que é >50% do tráfego), (c) é mais um efeito 2017-2019 (era de Awwwards), (d) está implementado SÓ na home — quando o usuário navega para `/portfolio` o cursor desaparece, evidência de que não é um sistema, é um enfeite. **Scroll progress bar** é útil em artigos longos (Medium-style), mas em landing pages onde a página tem 5-7 sections de altura razoável, não há benefício de UX — o usuário sabe rolando que está progredindo. Pior: a barra está no topo, sobreposta ao nav, e em laranja-puro `var(--primary)` cria distração visual constante durante o scroll.
**Por que importa:** Cada elemento visual no site é uma decisão e custa cognitive bandwidth. Quando esses elementos não cumprem função, eles diluem a percepção de polimento. Studios sóbrios deixaram de usar cursor follower antes de 2022.
**Recomendação:** Remover cursor follower 100% (e o `cursor-follower` do DOM). Remover scroll progress bar do nav, ou movê-la para a borda inferior do nav apenas quando estiver em pages longas (privacy-policy, services). Em homepage e portfolio, deletar.
**Esforço:** S

### 🟡 Tipografia única (Syne em display + body) compromete legibilidade
**Página/Componente:** Global → `font-family: "Syne", sans-serif`
**Eixo:** Sistema tipográfico
**Evidência:** `styles.css:37` (`body { font-family: "Syne", sans-serif }`), única família carregada via `<link>` Google Fonts.
**Problema:** Syne é uma display sans-serif "wonky-grotesque" — desenhada para títulos com personalidade, especificamente NÃO para parágrafos longos. Quando aplicada a body text de 1rem-1.2rem em block paragraphs (subtítulos, descrições, body do contato, copy do studio.html), produz: (a) micro-fricção de leitura por causa das idiossincrasias de Syne (terminais slanted, contadores irregulares), (b) sensação de "tudo é display, nada é hierarquicamente body". O leitor não tem descanso visual entre headlines e prose.
**Por que importa:** Tipografia é a decisão visual mais barata de mudar e a mais visível. Studios sérios usam **2 famílias mínimo**: 1 display para headings + 1 sans/serif neutra para body. Linear: Söhne (body) + Inter Display; Vercel: Geist Sans + Geist Mono; Stripe: stripe-display + stripe-text. A escolha de família única em uma display fonte é exatamente o sintoma de "alguém escolheu uma fonte legal e jogou em tudo".
**Recomendação:** Manter Syne para `h1`, `h2`, `h3`, `.hero-title`, `.section-title`, `.page-hero-title`. Adicionar uma neutra para body — sugestão: **Inter** (variável, gratuita, padrão da indústria), **Geist Sans** (Vercel, gratuita), ou **General Sans** (Fontshare, gratuita, mais editorial). Setar `font-family` no body para a neutra, e override via classes para os displays. Custo: 30min de implementação + 1h de QA tipográfico.
**Esforço:** S

### 🟡 Greeting badge "👋 Hey there" inverte o registro do hero
**Página/Componente:** `/index.html` → `.greeting`
**Eixo:** Identidade visual / voz
**Evidência:** `index.html:242-244`, `styles.css:193-205`, screenshot live.
**Problema:** O eyebrow do hero é literalmente "👋 Hey there, we're Picky Pixels!" — emoji wave + interjeição casual. Em um hero que está vendendo "Software Engineer & Mobile Developer", "Marketing Strategist", "design taste / strategic thinking / technical depth", o registro infantil-amigável do greeting cria atrito imediato com o positioning. O efeito é o de um plumber chegando à sua casa de macacão de boas-vindas com smiley face na lapela.
**Por que importa:** Hero greeting é o primeiro tom de voz que o visitante registra. Quando ele contradiz a tese do estúdio, o estúdio paga preço de credibilidade nos próximos scrolls. Studios que vendem para SMB B2B (Linear-style ou Webflow-agency-style) começam o hero com peso forte na primeira frase, não com ice-breaker.
**Recomendação:** Trocar greeting por um marker de informação real. Opções: (a) número de clientes/anos: "8 clients / 3 years / Porto, Portugal", (b) localização + foco: "Porto, PT — Studio for ambitious brands", (c) eliminar o greeting completamente. Remover emoji 100%. Se quiser manter um eyebrow, fazer monoespaço pequeno em cor neutra. Referência: linear.app não tem greeting; basement.studio começa com city marker.
**Esforço:** S

### 🟡 Inconsistência shadow / elevation entre cards
**Página/Componente:** Global cards
**Eixo:** Sistema de design / elevation
**Evidência:** `pages.css:507` (`.portfolio-item: nada de box-shadow no estado base`), `pages.css:516` (`hover: 0 16px 48px rgba(92, 64, 51, 0.12)`); `pages.css:734` (`.service-category-preview: nada base, hover: 0 8px 32px`); `pages.css:159` (`.service-card-full: nada base, hover: 0 8px 32px`); `pages.css:347-351` (`.studio-note: 0 12px 32px rgba(92, 64, 51, 0.06)` no estado base); `pages.css:1080` (`.company-card: hover: 0 12px 32px rgba(0, 0, 0, 0.1)` — nota o `rgba(0,0,0)` em vez de `rgba(text)`); `styles.css:418` (`.work-item: hover: 0 20px 40px rgba(0, 0, 0, 0.1)`).
**Problema:** Cinco cards no site, cinco shadow recipes diferentes — ofsets variáveis (8/12/16/20/40px), opacities (0.05/0.06/0.08/0.1/0.12), e dois usam `rgba(0,0,0)` enquanto outros usam `rgba(92,64,51)`. Não existe um sistema de elevation. O usuário visualmente vê cards "flutuando" em alturas inconsistentes lado a lado.
**Por que importa:** Elevation system é uma das decisões mais ensinadas em design system 101. Não ter três tiers (`shadow-sm`, `shadow-md`, `shadow-lg`) é confissão técnica.
**Recomendação:** Tokenizar 3 níveis: `--shadow-sm: 0 2px 8px rgba(45, 31, 26, 0.04)` (default cards), `--shadow-md: 0 8px 32px rgba(45, 31, 26, 0.08)` (hover/elevated), `--shadow-lg: 0 24px 64px rgba(45, 31, 26, 0.12)` (modals). Aplicar globalmente. Substituir 100% dos `rgba(0,0,0)` por `rgba(text-rgb,...)`. Custo: 1h.
**Esforço:** S

### 🟡 Contact section title gradient duplica o tropo do hero
**Página/Componente:** `/index.html` → `.contact-title`
**Eixo:** Identidade visual / repetição de tropo
**Evidência:** `styles.css:919-924` aplica `linear-gradient(135deg, var(--primary), var(--title))` no `.contact-title` "Let's Create Something You're Proud Of".
**Problema:** O mesmo gradient laranja-rosa do hero "Marketing" reaparece no título do contato. Como já apareceu nos heroes de portfolio ("Proud"), services ("Creative"), studio ("Technical Depth"), agora aparece na CTA final — o site usou gradient text 5x. Não é mais um "accent", é o tipo padrão de título do site. Quando algo é o padrão, ele perde o status de accent e se torna o look-and-feel inteiro.
**Por que importa:** Repetição mecânica de um tropo visual = falta de hierarquia. O usuário deixa de notar.
**Recomendação:** Remover gradient do `.contact-title`. Usar cor sólida `var(--text)` em peso forte. Ver recomendação acima sobre cortar gradient text do site inteiro.
**Esforço:** S

### 🟡 Heart canvas aspect ratio no desktop deixa o lado direito do hero meio vazio
**Página/Componente:** `/index.html` → `.hero-right .hero-visual`
**Eixo:** Composição visual / hero
**Evidência:** `styles.css:235-248`. Screenshot live em 1280x800 mostra o canvas ocupando metade direita, mas com a heart formation centralizada, deixando muito espaço cream à volta — ar mal usado.
**Problema:** Mesmo na melhor execução (heart formado), o canvas tem ~600x400px de partículas em uma área de ~720x500px, com a forma centralizada. Resultado: muito espaço creme vazio à volta do coração, sem sinal de propósito. Não é hero negativo intencional (tipo Pentagram), nem hero composto com peças (tipo Linear), nem hero mídia (tipo Vercel) — é um canvas com uma forma central deslocada que não compõe com o texto à esquerda.
**Por que importa:** A composição do hero é a primeira proposta visual do site. Quando metade da composição é vazia sem propósito, sinaliza que o autor "queria fazer algo mas não fechou o frame".
**Recomendação:** Se o hero for refeito (recomendado em finding 1), esse problema desaparece. Se ficar o canvas atual, pelo menos: (a) trocar por uma única peça de mídia real (still de um projeto cliente, vídeo curto de processo), (b) ou expandir o canvas para cobrir o background completo do hero (full-bleed) com uma forma maior, OU (c) mover o canvas para posição absoluta atrás do texto, fazendo o heart aparecer em opacity baixa por trás de "With Heart".
**Esforço:** M

### 🟡 Footer logo 150px é desproporcionalmente grande
**Página/Componente:** Global → `.footer-brand .logo img`
**Eixo:** Composição / proporção
**Evidência:** `styles.css:1402-1405` (`height: 150px`).
**Problema:** O logo do footer é renderizado a 150px (maior que o do nav, que já é 120px). Como o footer é um elemento secundário de navegação, ter o logo MAIOR no footer que no nav é inversão de hierarquia — geralmente footer logos são ~50-70% do tamanho do nav logo (ex.: nav 64px / footer 32-48px).
**Por que importa:** Hierarquia visual quebrada nos elementos finais da página deixa uma impressão de "dimensionamento aleatório".
**Recomendação:** Reduzir footer logo para 56px ou 64px. Se quiser destaque do brand no footer, fazer via wordmark + tagline em tipografia, não via tamanho de imagem.
**Esforço:** S

### 🟡 Ícone de categoria em services usa gradient que repete a paleta do hero
**Página/Componente:** `/services.html` → `.category-icon`
**Eixo:** Identidade visual / repetição
**Evidência:** `pages.css:98-109` — gradient `135deg, var(--primary), var(--accent)` em uma badge 64x64 com border-radius 18px.
**Problema:** Gradient laranja→rosa rodada quadradinha de 64x64px é a estética **iOS app icon 2019-2021** — Linear-clone, Notion-clone, todos os SaaS landing pages do Producthunt. Aplicado a um ícone Font Awesome dentro (`fa-bullhorn`), o conjunto soa genérico. Pior: é o sexto lugar onde o mesmo gradient aparece (hero, contact-title, page-hero-title, plus aqui), virando um leitmotiv visual que não comunica nada.
**Por que importa:** Repetição de elemento visual sem razão funcional dilui a marca.
**Recomendação:** Eliminar o gradient nesta badge. Trocar por uma cor sólida ou um background neutro com o ícone em `var(--primary)`. Ou eliminar o ícone (categorias com nome em peso 700 já se identificam).
**Esforço:** S

---

## LOW

### 🟢 Heart canvas com `border-radius: 32px` cria curvatura conflitante
**Página/Componente:** `#heartCanvas`
**Eixo:** Sistema de design / consistência de raios
**Evidência:** `styles.css:246` (definido em CSS `border-radius: 32px`) e mesmo valor inline no `<style>` no head do `index.html:88-95`.
**Problema:** O canvas usa raio 32px enquanto cards adjacentes usam 12-18-20px. A curvatura é >2x mais forte. Visualmente o canvas "floats" da composição porque a curvatura não pertence ao mesmo sistema.
**Por que importa:** Já coberto no finding sobre border-radius, mas vale citar especificamente porque está duplicado em CSS + inline.
**Recomendação:** Junto com a tokenização de raios, padronizar este canvas para o `--radius-lg`.
**Esforço:** S

### 🟢 Filter buttons portfolio têm 2 designs diferentes (`.filter-btn` e `.category-filter`)
**Página/Componente:** `.filter-btn` (in use) + `.category-filter` (CSS exists, possibly orphan)
**Eixo:** Sistema de design
**Evidência:** `pages.css:472-494` (`.filter-btn`) vs `styles.css:1289-1322` (`.category-filter`).
**Problema:** Dois sistemas de filtro coexistem no CSS. O `.category-filter` tem `flex-count` e parece um sistema mais antigo, possivelmente morto. Se for unused, é dead code; se tiver uso em algum estado, é divergência.
**Por que importa:** Pequeno débito visual + provável dead CSS.
**Recomendação:** Verificar uso de `.category-filter` no DOM, se órfão, deletar. Se em uso, consolidar com `.filter-btn`.
**Esforço:** S

### 🟢 H1 quebra para 4 linhas em desktop por causa de `<br />` hardcoded
**Página/Componente:** `/index.html` → `.hero-title`
**Eixo:** Composição responsiva
**Evidência:** Screenshot desktop mostra "Marketing, / Design & / Dev / With Heart" — 4 linhas em viewport 1280px porque "Design & Dev" não cabe na coluna estreita de hero-left.
**Problema:** O HTML usa `<br />` explícitos para quebrar "Marketing, / Design & Dev / With Heart" em 3 linhas, mas em desktop 1280px a coluna esquerda do hero (50%) não comporta "Design & Dev" em uma linha com Syne 5rem, então o "Dev" pula para uma quarta linha solta. Resultado: tipografia hero quebrada em 4 linhas, com a quarta linha tendo 1 palavra.
**Por que importa:** Layout hero é a primeira impressão tipográfica do site. Uma palavra orfã ("Dev") em linha solta sinaliza falta de QA tipográfico.
**Recomendação:** Remover `<br />` hardcoded e usar `display: block` em cada `<span>` do title (ou `flex-direction: column`), permitindo line-height respirar; OU reduzir font-size do hero-title para `clamp(2.5rem, 6vw, 4rem)` para garantir que cada line cabe; OU reorganizar o copy ("Marketing, Design, Dev — With Heart" em 2 linhas).
**Esforço:** S

### 🟢 Service icon-full background usa rgba hardcoded em vez de tokens
**Página/Componente:** `/services.html` → `.service-icon-full`
**Eixo:** Sistema de design / paleta
**Evidência:** `pages.css:173` `background: linear-gradient(135deg, rgba(255, 94, 50, 0.1), rgba(255, 209, 217, 0.25))`.
**Problema:** Gradient com cores hardcoded em rgba que correspondem a `var(--primary)` e `var(--accent)`, sem usar os tokens. Já listado no finding "Cores hardcoded".
**Recomendação:** Usar `color-mix(in srgb, var(--primary) 10%, transparent)` (CSS moderno) ou criar tokens `--primary-soft` e `--accent-soft`.
**Esforço:** S

### 🟢 Form select e inputs com border-radius 8px destoam do resto
**Página/Componente:** `.contact-form input/select/textarea`
**Eixo:** Sistema de design
**Evidência:** `styles.css:1054`.
**Problema:** Forms com `border-radius: 8px` enquanto cards adjacentes (.quick-contact, .contact-form) usam `border-radius: 1rem` (16px). Inputs e seu container em raios diferentes, sem propósito.
**Por que importa:** Pequena inconsistência visual; resolvido junto com a tokenização de radii.
**Recomendação:** Tokenizar e aplicar `--radius-sm: 8px` a inputs explicitamente, mas manter consistência no container.
**Esforço:** S

### 🟢 `.team-message .highlight-paragraph` tem text-align inconsistente entre seções
**Página/Componente:** `/index.html` vs outras instâncias
**Eixo:** Hierarquia tipográfica
**Evidência:** `pages.css:881-883` (centralizado), `styles.css:769-775` (sem text-align especificado, herda left).
**Problema:** O mesmo componente `.highlight-paragraph` se renderiza centralizado dentro de `.team-message` mas alinhado à esquerda em outros contextos. Não é um bug se intencional, mas sugere ausência de regra clara para "quote pull".
**Por que importa:** Pequeno; só pesa em manutenção.
**Recomendação:** Padronizar via class modifier (`.text-center`) em vez de override por contexto.
**Esforço:** S

---

## SUGGESTION

### 💡 Adotar um único design system público (Tailwind / CSS variables com naming claro)
**Página/Componente:** Global
**Eixo:** Sistema de design
**Evidência:** Inventory item — sem package.json, sem build, sem doc.
**Problema:** Várias decisões visuais flutuam (radii, shadows, cores) porque não há um documento de referência. O próprio site é a única "doc" do design system, e ela está em conflito interno.
**Por que importa:** Um estúdio que vende "Systems Thinking" se beneficia muito de mostrar publicamente seu próprio sistema (em uma `/system` ou `/styleguide` page). Linear faz; Stripe faz; basement faz.
**Recomendação:** Criar uma página `/styleguide.html` (oculta de nav, mas pública) listando: tokens de cor, escala tipográfica, escala de spacing, radii system, shadow system, button states, form states. Custo: 4-6h. Bônus: serve de pitch para clientes que perguntam "vocês sabem fazer design system?".
**Esforço:** M

### 💡 Apresentar 1 case study real em vez de 6 thumbnails clicáveis
**Página/Componente:** `/portfolio.html`
**Eixo:** Visual storytelling
**Evidência:** Inventory item #12-13 — clicar em web card abre só foto crua; click em marketing abre carousel.
**Problema:** Para um estúdio que vende judgment, ter portfolio como "grid de thumbnails sem narrativa" é desperdício de prova. Studios sérios apresentam 1-3 case studies com: problema → processo → solução → resultado. PiccPxs tem 0 case studies escritos.
**Por que importa:** A página /portfolio é a maior alavanca de conversão para um studio. Sem case studies, a página é "olha que cores legais".
**Recomendação:** Criar 1 página `/work/turmeric.html` com case study completo: contexto do cliente, briefing, sketches, decisões de design (por que essa paleta, essa tipografia), screenshots in-context, métricas se houver. Replicar para 1-2 outros projetos. Referência: basement.studio/work/loom, raw.studio/case-studies. Esforço alto, mas é o principal multiplicador de leads B2B.
**Esforço:** L

### 💡 Aposentar o `--secondary` mostarda OU promovê-lo a uso intencional
**Página/Componente:** Global
**Eixo:** Paleta
**Evidência:** Inventory — "`--secondary` mostarda usada em 1 lugar".
**Problema:** A paleta declara 4 cores brand (primary, secondary, accent, title) mas a `--secondary` mostarda só aparece no canvas. É um token órfão. Pior, o "STUDIO" do logo é amarelo-mostarda parecido — o único momento de coesão da `--secondary` com a marca está no PNG do logo, não no CSS.
**Por que importa:** Tokens órfãos sinalizam paleta indecisa. Ou a `--secondary` é parte do brand (e deve aparecer com peso em pelo menos 3 lugares estratégicos), ou não é (e deve ser deletada).
**Recomendação:** Decisão A — promover a `--secondary` para um sistema de "categoria" claro (ex.: marketing badges em mostarda, web badges em laranja — que parcialmente já é o caso). Ou Decisão B — deletar e adotar paleta de 1 brand color (primary) + neutros.
**Esforço:** S

---

## Áreas que estão SÓLIDAS (sem findings)

- **Espaçamento vertical entre seções** — Os `var(--spacing-lg)` / `--spacing-xl` estão consistentes e respiram bem. A escala de spacing tokens (xs/sm/md/lg/xl em 0.5/1/2/4/8 rem) é matematicamente coerente.
- **Cor de body text** (`--text: #5c4033` sobre `--background: #fff9f0`) — Marrom escuro sobre creme é uma escolha cromática válida, com warmth característica que dá personalidade sem ferir leitura. Contraste ~9:1, AAA.
- **Backdrop blur 12px no nav** — Tecnicamente bem implementado, dá profundidade sem opacidade total. Detalhe que sinaliza familiaridade com práticas modernas.
- **Hover transform `translateY(-2px)` nos botões e ícones sociais** — micro-interaction sutil, com `cubic-bezier(0.4, 0, 0.2, 1)` correto, sem exageros.
- **Página `/studio.html` na sua estrutura** — A divisão em manifesto + principles + team + process + cta tem bom ritmo editorial. O problema é o conteúdo dela (team repetido, principles em FA icons), não a estrutura.

---

## Visual axis score: 4/10 — O site contém elementos sólidos isolados (paleta de neutros, spacing system, hover de botões), mas o agregado é dominado por uma cadeia de decisões visuais que contradizem diretamente a tese declarada do estúdio (logo brega, hero clichê triplo, fotos de equipe heterogêneas, cards values genéricos, tropos visuais 2017-2019), o que torna o site uma evidência ativa contra o positioning "Design Taste, Strategic Thinking, Technical Depth".
