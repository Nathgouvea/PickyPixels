# 03 — Findings B · UX & Information Architecture

**Auditor:** Agent B — Senior Product Designer (UX/IA)
**Eixos cobertos:** 2 (Arquitetura de informação & navegação) e 5 (UX de conversão & funis)
**Data:** 2026-05-12 · Branch: `feature/add-marketing-services`

> **Régua:** o próprio `studio.html` declara — "Great agency websites should already feel like proof. The site itself needs to demonstrate judgment, technical polish, content hierarchy, and a clear point of view." Esta auditoria avalia se os fluxos e a IA confirmam essa thesis ou a desmentem.

---

## Findings

### 🔴 CRITICAL — Same content type, two opposite click-flows (web vs marketing)
**Página/Componente:** `portfolio.html` · `home #work` section · `script.js:912 (initImageOverlay)` e `script.js:1048 (initCompanyModal)`
**Eixo:** Arquitetura de informação · Conversão
**Evidência:** clicar em qualquer `.portfolio-item[data-category="web"]` aciona `initImageOverlay` (linhas 926-940 — apenas troca o `src` da `<img class="overlay-image">` em fullscreen, sem título, sem descrição, sem CTA, sem navegação). Clicar em `.company-card[data-category="marketing"]` aciona `initCompanyModal` (linhas 1110-1141 — abre modal organizado com título, carousel, dots, thumbnails, setas prev/next, suporte a teclado). Inventory captures #12 e #13.
**Problema:** Para o mesmo verbo do usuário ("ver mais sobre este projeto"), o site entrega duas experiências completamente diferentes baseadas em uma categoria que **deveria ser invisível para o usuário**. Pior: o tratamento "rico" é dado ao Marketing (categoria com menos prova de execução técnica) e o tratamento "pobre" é dado ao Web Design (categoria que vende a maior margem do estúdio). Ainda pior: o `initImageOverlay` percorre `.portfolio-image` em todas as páginas — então clicar na imagem de um *card de marketing* abre primeiro a image-overlay (foto crua) e só depois fecha para abrir a company-modal, gerando flicker.
**Por que importa:** O cliente chamou isso de "massiva inconsistência" e está certo. Em modelos mentais, o usuário aprende a regra do primeiro clique e generaliza. Se o primeiro projeto que ele abre é a imagem crua de um restaurante, ele aprende que "clicar em projeto = abrir foto", e ao clicar num card de marketing depois, vai estranhar a mudança. Em qualquer página de portfolio sério (Pentagram, Instrument, Locomotive, MetaLab), todos os projetos abrem na mesma estrutura — geralmente uma case-study page com hero, contexto, processo, resultado.
**Recomendação:** Eliminar o `initImageOverlay` por completo. Criar um único componente `project-modal` que:
1. Recebe `data-project-id` no card,
2. Carrega de um único `projects.js` o título, ano, cliente, escopo de serviço, hero image, gallery (carousel para múltiplas, single para uma), uma frase de problema, uma frase de solução, link "Visit Website" quando existir,
3. Mantém o mesmo chrome (header com título + close, footer com prev/next entre projetos, não entre slides). Referência concreta: cada case em `instrument.com/work/{slug}` segue o mesmo template — hero, intro, sections, "next project" no fim. **Não precisa virar página separada** — o modal pode ser a v1; a v2 evolui para rota `/work/turmeric` quando houver SEO budget.
**Esforço:** L

---

### 🔴 CRITICAL — Home não tem âncora própria na navegação
**Página/Componente:** `nav.main-nav` em todas as páginas · `index.html:139-159`
**Eixo:** Arquitetura de informação
**Evidência:** A nav tem 4 itens: Work / Services / Studio / Contact. **Nenhum deles é "Home"**. Nas páginas internas (portfolio/services/studio), a `nav-link.active` aparece corretamente; em `index.html` **nenhum link está com `active`**. O único caminho de volta à home é clicar no logo (`href="#"` na home, `href="index.html"` nas demais), e ainda assim o logo se chama "Picky Pixels Studio" enquanto existe um item de menu chamado "Studio" — **dois "Studios" distintos com nomes idênticos**.
**Problema:** Quebra a regra de que toda IA deve responder à pergunta "onde estou?" em <2 segundos. Em portfolio.html, o usuário vê "Work" highlighted e entende. Em index.html, vê 4 links sem destaque e **não há sinal visual de que está na home** — a home se torna a "página fantasma" do mental model. Adicionalmente, "Studio" é ambíguo: o nome do estúdio inteiro = nome de um item específico no menu = "página sobre nós".
**Por que importa:** Quando a IA contradiz a estrutura de URLs (a URL é `/`, mas a nav diz que estou em "lugar nenhum"), o usuário perde confiança no mapa. Frota de tabs abertas perde rastreabilidade. Em sites de estúdio comparáveis (locomotive.ca, ueno.co, instrument.com), o logo SEMPRE significa "home" — mas ou (a) há um item "About" claramente separado do logo, ou (b) o logo tem o nome do estúdio e a página sobre nós se chama "About"/"Team"/"Studio philosophy", **nunca "Studio"** sozinho.
**Recomendação:** Renomear o item "Studio" para algo que não colida com o lockup do logo. Opções, em ordem de preferência: **About** (clássico, sem ambiguidade), **The Studio** (mantém o tom mas se diferencia pelo artigo), **Team & Process**. Bonus: desativar `nav-link-cta` no Contact e usar a 5ª posição para um "Home" minimalista; OU investir num logo-com-tooltip "Home" (`aria-label="Picky Pixels Studio — Home"`) e adicionar `class="active"` no logo na home.
**Esforço:** S (rename) + S (active state na home via CSS `body[data-page="home"] .nav-brand`)

---

### 🔴 CRITICAL — Mesmos projetos, dois nomes (e dois inventários incompatíveis)
**Página/Componente:** `index.html` `#work` vs `portfolio.html` `.portfolio-section` · `index.html:282-291` e `portfolio.html:151-157`
**Eixo:** Arquitetura de informação
**Evidência:** Home: section-label "Selected Work" + título "Some of Our Favorite Projects" (`section-work-title`). Portfolio: section-label "Selected Work" (idêntico) + título "Work We're Proud Of" (`page-work-title-1..3`). Inventário: home mostra 6 cards (3 web + 3 marketing). Portfolio mostra 6 web + 3 company-cards (Cynergia "6 projects", Scriptai "8 projects", MMF "1 project") — total **6 + 15 = 21 trabalhos por contagem, 9 cards visualmente**, e os 3 marketing da home (Cynergia/Scriptai/MMF) são exatamente os 3 da portfolio mas com cards de formato diferente.
**Problema:** Três rótulos diferentes em três níveis ("Selected Work" como section-label idêntico nas duas, "Some of Our Favorite Projects" no H2 da home, "Work We're Proud Of" no H1 da portfolio) para o mesmo conjunto conceitual de trabalho. O usuário que clica "See Full Work" da home espera que "Full" inclua *mais* dos mesmos. Recebe (a) os mesmos 3 web cards + 3 web novos, (b) os mesmos 3 marketing cards mas reformatados como "company cards" agrupados, e (c) "Selected Work" pela segunda vez como label — sem conseguir distinguir o que é destaque vs catálogo completo.
**Por que importa:** Redundância com nomes divergentes treina o usuário a desconfiar do mapa. "Selected" no portfolio.html está logicamente errado também — se é a página completa, não é "selected"; se é selected, então a home não devia repetir os mesmos. **O verdadeiro insight é: a home não precisa de uma section #work com 6 cards.** Ela só precisa de uma promessa visual + 1 CTA.
**Recomendação:** Reduzir o `#work` da home para apenas 3 cards (curadoria estrita) ou — melhor — substituir por uma **única faixa horizontal de logo strip** (Turmeric, Gabriella Tattoo, LivingLeaving, Cynergia, Stegel, Isabel Vieira) com headline "Brands we've shipped" + CTA "See all work →". A portfolio.html mantém o título "Selected Work" (que ali faz sentido se for curadoria) ou muda para "Work" simples. Eliminar o duplo rotulamento "Selected Work" presente nas duas páginas. Referência: `instrument.com` na home tem uma seção "Recent Work" com 4 cards horizontais e CTA "See all"; a página `/work` tem o título "Work" sem subtítulo. Sem ambiguidade.
**Esforço:** M

---

### 🔴 CRITICAL — Contact via anchor cross-page rompe o fluxo
**Página/Componente:** `nav-link-cta` Contact em portfolio/services/studio · `portfolio.html:74`, `services.html:74`, `studio.html:70`
**Eixo:** Arquitetura de informação · Conversão
**Evidência:** Em todas as páginas internas, o item "Contact" da nav linka para `index.html#contact`. Isso obriga: full page navigation → load do `index.html` (5000+ px de scroll height) → scroll automático até `#contact` no fim. Em conexões 3G ou cold cache, o usuário **vê a home aparecendo do topo antes de o scroll-to-anchor disparar** (FOUC + jump). Para piorar, o services.html tem seu próprio CTA `Send a Message` (services.html:490) que ALSO aponta para `index.html#contact`. Studio.html não tem nenhum CTA para contact.
**Problema:** A intenção do usuário ao clicar "Contact" é começar uma conversa AGORA. O custo cognitivo de "perdi a página onde estava, por que estou na home?" é alto. Pior, no portfolio/services/studio, a única "página de contato" é uma seção embutida na home — o que sinaliza ao usuário que o estúdio nem teve disposição para fazer uma página dedicada. Nada na nav indica "voltarei pra home, role 5000px, encontrará o form".
**Por que importa:** A taxa de conversão cai para qualquer fluxo que custe mais de 1 clique para chegar ao form. Estúdios sérios (`humaan.com/contact`, `pentagram.com/contact`, `mschf.com/contact-us`) têm `/contact` como rota dedicada com URL própria — não anchor cross-page.
**Recomendação:** Criar `contact.html` como página dedicada. Promover a section `#contact` atual da home para essa página. Substituir todos os `href="index.html#contact"` por `href="contact.html"`. Manter um teaser "Ready to start? →" na home apontando para `contact.html` em vez do form embutido (ou manter o form embutido como bônus, mas a fonte da verdade fica em `contact.html`). Bonus: usar `<form action="https://formspree.io/f/mpwaajew">` num só lugar elimina o conflito de IDs duplicados (`id="contact-form"`, `id="name"`, `id="email"`, `id="form-message"` — todos repetidos entre `index.html` e `portfolio.html`, atualmente HTML inválido).
**Esforço:** M

---

### 🔴 CRITICAL — PT version aponta links para EN-only secondary pages
**Página/Componente:** `index.pt.html` nav e CTAs · `index.pt.html:147-150`, `:543-544`
**Eixo:** Arquitetura de informação · Conversão (i18n flow)
**Evidência:** A nav PT tem `<a href="portfolio.html">Trabalhos</a>`, `<a href="services.html">Serviços</a>`, `<a href="studio.html">Studio</a>`. Apenas `index.pt.html` e `privacy-policy.pt.html` existem com versão PT. Quando o usuário PT clica "Trabalhos", aterra em `portfolio.html` que tem `<html lang="en">` — o JS `initLanguageSwitcher` (script.js:704) detecta `pageLang = "en"` mas vê `localStorage.pickypixels-lang === "pt"` salvo, então força aplicação das traduções em runtime. **Mas a URL ainda é `portfolio.html`** (sem indicação de idioma), o usuário pode compartilhar essa URL e o destinatário verá em EN. Pior: o `<title>` ("Our Work — Picky Pixels Studio") não traduz porque vem do `<title>` do servidor; a meta-description também não.
**Problema:** Há uma **expectativa quebrada**: a home PT promete uma experiência PT, mas as páginas filhas dependem de JS para parecer PT. SEO em PT desaparece (Google indexa `<html lang="en">` para essas páginas). Instâncias clicáveis sem `data-translate` ficam em EN visivelmente — ex: as opções dentro de `<select>` no form (com `data-translate` em cada option) dependem do JS rodar antes do user clicar; até que rode, vê opções EN. Botão `Send Message` no form PT (sem `data-translate` no submit-btn span de algumas instâncias).
**Por que importa:** O cliente está em Porto, mercado é PT-PT. Se o site comunica que tem PT mas só metade está em PT, gera percepção de descuido — exatamente o oposto da thesis "Design Taste, Strategic Thinking, Technical Depth". Um cliente avaliando o estúdio para um trabalho multilingual vai concluir que "se eles erram a própria multilíngua, vão errar a minha".
**Recomendação:** Duas opções, do menor pro maior esforço:
- **Curto prazo (S/M):** Esconder o toggle PT até existirem versões PT reais de todas as 4 páginas core; OU forçar `lang="pt"` nas páginas internas via JS antes do paint e adicionar persistência via querystring (`portfolio.html?lang=pt` que o JS lê e aplica).
- **Longo prazo (L):** Criar `portfolio.pt.html`, `services.pt.html`, `studio.pt.html`, `contact.pt.html` com `<html lang="pt">`, `<title>` PT, meta-description PT, e fazer cada link da nav PT apontar para o `.pt.html` correspondente. Adicionar `<link rel="alternate" hreflang="pt" href="...">` e vice-versa nas páginas EN para SEO bilíngue.
**Esforço:** L (versão correta) ou S (esconder PT até estar pronto)

---

### 🟠 HIGH — Trust signals praticamente ausentes em todo o site
**Página/Componente:** todas as páginas
**Eixo:** Conversão
**Evidência:** Audit do conteúdo: zero depoimentos de clientes, zero logos de empresas atendidas em formato de "trusted by" strip, zero contadores ("X projetos entregues", "Y anos de operação"), zero awards/badges, zero case studies com metric outcome ("aumentou conversão 32%"). O mais próximo de prova social: badges nos company-cards ("6 projects", "8 projects", "1 project"). Os links "Visit Website" funcionam como prova frágil mas dependem do usuário clicar fora do site.
**Problema:** Para um pequeno negócio em Porto avaliando "devo gastar €475 numa Creative Pro Site?", a primeira pergunta é: "quem mais já confiou neles e o que o resultado entregou?". O site atual responde com fotos de equipe + linguagem genérica ("creative solutions with purpose"). Sem prova, todo o resto se torna marketing autorreferencial.
**Por que importa:** Trust signals são o multiplicador #1 de conversão em sites de serviço. A literatura é clara (Nielsen Norman Group testimonials studies, BlackBox social-proof tests). É o item de maior ROI/esforço na lista.
**Recomendação:** Adicionar três peças, em ordem de prioridade:
1. **Quote-block testimonials** abaixo do hero da home E acima do CTA final em portfolio/services. Mínimo 3 com nome real + cargo + empresa + foto/avatar + frase específica (não "ótimo trabalho!" — algo como "Aumentaram nosso tráfego 40% no primeiro trimestre" — Maria Silva, fundadora, X). Sem testimonial real, **não inventar** — pedir ao primeiro cliente real (Turmeric, LivingLeaving, etc.) por escrito antes de publicar.
2. **Logo strip "Brands we've worked with"** com 5-8 logos: Turmeric, Stegel Nails, Isabel Vieira, Gabriella Tattoo, LivingLeaving, Cynergia, Scriptai, MMF. Em escala de cinza, alinhamento horizontal, abaixo do hero ou no topo do `#work`. Referência: `humaan.com` — strip horizontal em cinza, sem títulos, só logos.
3. **Métrica concreta nos case-cards** quando existir ("+18% bookings via novo agendamento online" no card do Stegel, etc.). Se não tiver métrica ainda, escrever "what changed" em uma frase factual ("Reservas via WhatsApp passaram a chegar com pré-formulário").
**Esforço:** M (sem testimonials reais, S — só fazer o site comportar isso e lançar com placeholders trocáveis)

---

### 🟠 HIGH — Form com 17 opções de serviço gera paralisia de escolha
**Página/Componente:** `.contact-form` em `index.html` e `portfolio.html` · `index.html:851-954`
**Eixo:** Conversão
**Evidência:** O `<select id="service">` tem 2 optgroups: Marketing (9 opções) + Web Design & Development (6 opções) = 15 opções funcionais + 1 placeholder + 1 disabled = **17 entradas no dropdown**. Ironicamente, o `services.html` mostra 30 cards (10 marketing + 7 web + 7 software + alguns extras) — então o dropdown nem é completo (Software/Mobile não aparece). Para um usuário que clicou em "Mobile App Development" no services.html, o select do form não tem essa opção.
**Problema:** Dropdowns longos para serviços não-mutuamente-exclusivos têm conhecida queda de conversão (Hick's Law). E o "What do you need help with?" como label + repetido como placeholder é redundância pura. Usuários técnicos em mobile precisam tocar, scrollar dentro do select nativo, e marcar — friction alto. Pior: a opção "Software & Mobile" (que é um dos 3 pilares do estúdio segundo services.html) **simplesmente não existe** no form.
**Por que importa:** O form é o último gargalo do funil. Cada campo extra ou friction reduz envios. Para um estúdio que vende "personal" e "collaborative", impor um taxonomy rígido aos primeiros 30 segundos do contato é hostile.
**Recomendação:** Substituir o select por um **grupo de 3 botões-chips** (mutuamente exclusivos): Marketing / Web / Software & Mobile. Ou, mais radical, eliminar completamente o select e adicionar uma única linha extra na textarea: "Tell us about your project. Roughly what do you need help with — marketing, a website, an app, or not sure yet?" Adicionar a 4ª opção "Not sure yet" como conversão valiosa (qualified lead pra discovery call). Referência: `pentagram.com/contact` — só 3 campos (nome, email, mensagem) e a categorização vem do conteúdo da mensagem; o form ali existe pra abrir conversa, não pra triar.
**Esforço:** S

---

### 🟠 HIGH — Form da home aparece após 5000+px de scroll
**Página/Componente:** home `#contact` section · `index.html:784-955`
**Eixo:** Conversão
**Evidência:** A home tem (em ordem): hero + work (com 6 cards) + about (team grid) + values (3 cards) + how-we-help (3 categorias com 6 bullets cada) + (pricing escondida) + contact. Pelo inventory captures, o form fica em scroll position ~5200px no desktop. O `nav-link-cta` Contact escora isso via anchor (`#contact`), mas o usuário precisa saber que existe e clicar.
**Problema:** Não há sticky CTA, não há "back-to-top + Contact" flutuante, não há um segundo CTA no meio da página apontando para o form. A taxa de scroll-to-bottom em landing pages B2B mediana é ~30%, mediana entre 30% e 50% para sites de serviço. Usuários que rolam até o `about` (~2600px) e ficam interessados não têm um trigger imediato — precisam voltar para o topo, achar "Contact" no nav, clicar, e aí descer 5000px de novo (ou scrollar 2400px daquele ponto).
**Por que importa:** Cada CTA "intermediário" colocado no fim de uma seção rica (após team, após services preview) captura intent que se perderia. Se a fonte da verdade do form virar `contact.html` (recomendação anterior), o problema some, mas enquanto o form viver na home, ele precisa ser convocado várias vezes.
**Recomendação:** Adicionar pelo menos 2 CTAs sticky/intermediários na home:
1. **Após o `team-message`** (~3400px), um banner escuro: "Ready to start your project? **Book a free 30-min call** ou **send us a message**" com 2 CTAs (Calendly + scroll-to-form).
2. **Sticky bottom-right "Talk to us" button** — visível só quando o usuário scrollou >40% e ainda não chegou no contact section. Click expand → mini-form 3 campos OU 3 ícones (WhatsApp / Email / Schedule). Referência: `linear.app` faz isso com um pill "Get in touch" que aparece após scroll. Tem que ser sutil (não confundir com chat-bot intrusivo).
**Esforço:** M

---

### 🟠 HIGH — Footer redundância: 4 nav links idênticos à top nav
**Página/Componente:** `.footer` em todas as páginas · `index.html:981-1042`
**Eixo:** Arquitetura de informação
**Evidência:** Footer contém: logo + tagline + (Work / Services / Studio / Contact) + (Instagram / Email / WhatsApp) + copyright + privacy. **Os 4 nav links são idênticos aos 4 do top.** Os 3 social icons são idênticos aos 3 do `nav-social` no top.
**Problema:** Footers normalmente são onde o estúdio agrega informações que **não cabem** na top nav: endereço físico, mailing list, jurisdição (NIF/CNPJ), Press Kit, Careers, Sitemap, links a clientes-âncora, mapa, créditos de fonte. O footer atual repete a top nav e adiciona privacy — o que é um requisito legal. Tudo o resto é decoração.
**Por que importa:** Repetição na IA não é "redundância benigna" — é sinal de que o estúdio não pensou no que pertence ao footer. Sites de estúdio comparáveis (`humaan.com`, `instrument.com`, `vercel.com`) usam o footer para: assinatura newsletter, endereço com mapa, código fiscal/registry, links institucionais (privacy, terms, accessibility statement), info de licenciamento de fonte/imagem.
**Recomendação:** Reestruturar o footer em 4 colunas:
1. **Brand** — logo + tagline + endereço Porto + NIF + email principal.
2. **Sitemap** — Work / Services / Studio / Contact + Privacy Policy + Sitemap.xml link.
3. **Connect** — WhatsApp number escrito (`+351 961 698 157`), email, Instagram handle, LinkedIn da empresa, GitHub do estúdio, Calendly direto.
4. **Get updates** — input "your email" + button "Subscribe" para newsletter (Formspree dá conta do collect; Substack/Mailchimp para envio). Bonus: "We send 1 email per quarter — case studies + lessons learned. No spam."
**Esforço:** M

---

### 🟠 HIGH — Studio.html é dead-end de conversão (sem CTA de contato)
**Página/Componente:** `studio.html` `.services-cta` · `studio.html:358-371`
**Eixo:** Conversão
**Evidência:** O CTA final do studio.html tem 2 botões: "View Work" → portfolio.html, "See Services" → services.html. Não tem "Contact" / "Book a Call" / "Send a Message". A página studio é onde o usuário aterra quando quer entender QUEM somos antes de decidir contratar — é o estágio mais "pronto-para-converter" do funil informativo. E o site responde "vai ver mais coisas".
**Problema:** O studio é a página onde o usuário desenvolve confiança ("ah, eles têm um manifesto, têm processo claro, têm equipe"). É exatamente onde um CTA de conversão tem o maior peso. Mandá-lo para outra página de discovery é diluir o momento. Pior: services.html já oferece "Book a Free Call" + "Send a Message" — então o usuário que chega na studio.html, lê tudo, vai para services.html, e SÓ AÍ recebe o CTA de contato. 2 cliques desnecessários.
**Por que importa:** Funnel intent decay. Cada redirect a uma página de "leia mais" perde 30-50% dos prospects que estavam prontos pra contatar. Estúdios maduros (`humaan.com/about`, `pentagram.com/about`) terminam suas páginas about/team com "Got a project? Let's talk →" diretamente.
**Recomendação:** Trocar o `services-cta` no fim do studio.html para algo como:
- H2: "Want to work together?" (em vez de "Want to See How That Looks in Practice?")
- 2 botões: "Book a Free Call" (Calendly direto) + "Send a Message" (link para contact.html ou anchor da home).
- Bonus: 3º botão "View Recent Work" — mas como secundário, não como primário.
**Esforço:** S

---

### 🟠 HIGH — Calendly + form duplicados sem hierarquia clara
**Página/Componente:** home `#contact` + services-cta · `index.html:817-826` e `services.html:484-491`
**Eixo:** Conversão
**Evidência:** Calendly aparece: (1) home `quick-contact` "Schedule a Call", (2) home contact-form como alternativa, (3) services-cta "Book a Free Call" como CTA primário. Email aparece: (1) `mailto:nathielle@pickypixels.studio` no nav-social (×4 páginas), (2) action-btn em quick-contact (home + portfolio), (3) `Send a Message` no services-cta. WhatsApp aparece: (1) nav-social, (2) social-connect block, (3) footer-social. Total: o estúdio expõe 3 canais primários × 4 páginas × 3 posições = **um caos de "como nos contactar"**.
**Problema:** Excesso de canais sem hierarquia clara causa decision paralysis. O usuário que quer contato precisa decidir entre WhatsApp ("informal mas vou ter de digitar"), Email ("envia e espera"), Calendly ("compromete agenda"), e form ("preenche 5 campos"). Sem dica de qual o estúdio prefere e qual gera resposta mais rápida. E "Schedule a Call" vs "Book a Free Call" são o mesmo destino com cópias diferentes.
**Por que importa:** Hick's Law: aumento de opções aumenta tempo de decisão e taxa de abandono. Um estúdio com posicionamento claro recomenda **um canal primário** ("Para a primeira conversa, agende uma chamada de 30 min — é grátis e nos ajuda a entender se faz sentido trabalhar juntos"), e relega os demais a "ou mande WhatsApp / email se preferir".
**Recomendação:** Estabelecer **uma hierarquia explícita**:
- **Primário:** Calendly link "Book a 30-min discovery call" — botão laranja primário, em todos os CTAs de fim de página.
- **Secundário:** Form de contato — para quem não quer compromisso de horário ainda.
- **Terciário (utility):** WhatsApp + Email no nav-social e footer apenas — não como botão de CTA.

Padronizar a cópia do Calendly em **uma string única** ("Book a Free 30-min Call") repetida em todos os pontos. Eliminar "Schedule a Call" como variante.
**Esforço:** S

---

### 🟠 HIGH — `nav-link-cta` não existe no menu mobile
**Página/Componente:** `.mobile-menu .mobile-nav-links` · `index.html:201-209`
**Eixo:** Arquitetura de informação · Conversão
**Evidência:** Desktop nav: `<a href="#contact" class="nav-link nav-link-cta">Contact</a>` — `styles.css:126` aplica background, border, hover state, sinalizando "este link é diferente, é o CTA da nav". Mobile nav (`.mobile-menu`): `<a href="#contact" class="nav-link">Contact</a>` — **sem `nav-link-cta`**. Logo Contact perde sua diferenciação visual exatamente no viewport onde o usuário tem mais friction (touch + 1 mão).
**Problema:** O mobile menu trata os 4 itens como iguais. Mas para um estúdio que vende serviços, "Contact" é o ponto de conversão e deve estar visualmente destacado como botão. Ainda pior: o item Contact aparece por último na lista de 4 — em mobile, é o item mais distante do thumb.
**Por que importa:** Mobile representa ~50%+ do tráfego de pequeno negócio em Portugal. A versão mobile do site é onde a primeira impressão de UX se forma para metade dos prospects.
**Recomendação:** Adicionar `nav-link-cta` à classe do Contact no mobile menu (e em styles.css garantir que a regra `.nav-link-cta` produza um botão grande, não só um pill desktop). Bonus: reordenar os 4 itens em mobile para `[Contact]` no topo + os outros 3 abaixo (regra: a ação mais provável fica na zona de thumb, logo abaixo do close X).
**Esforço:** S

---

### 🟠 HIGH — Logo na home faz `scrollTo(0)` em vez de navegação real
**Página/Componente:** `nav-brand .logo` na home · `index.html:141-150`
**Eixo:** Arquitetura de informação
**Evidência:** Home: `<a href="#" class="logo" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">`. Demais páginas: `<a href="index.html" class="logo">`. O `href="#"` na home é tecnicamente inválido (gera entry no histórico do browser para `#`), e o `onclick` previne a default do anchor implicitamente via smooth-scroll mas não cancela.
**Problema:** Click no logo da home altera o URL para `/#` (browser history pollution). Em mobile, o usuário que clica no logo expecting "go home" recebe scroll suave em vez de carregar nova página. **Mas como já está na home, scrollar é o comportamento correto** — então no fim a UX é OK, só o markup é frágil. O issue real é que o usuário não tem como saber se é "na home" ou "em outra página" antes de clicar — comportamentos inconsistentes do logo entre páginas violam a Lei de Jakob (similaridade de comportamento).
**Por que importa:** Logos são o componente mais clicado em sites — esperar "go home" é universal. Quando "home" é a página atual, o comportamento esperado é "scroll to top". O atual está OK funcionalmente, mas a implementação é hacky.
**Recomendação:** Trocar para `<a href="index.html" class="logo" onclick="if(location.pathname.match(/index|^\/$/)){event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}">`. Ou mais limpo: adicionar `id="top"` no `<body>` e usar `href="#top"` na home + `href="index.html"` nas demais — mantém histórico limpo. Garantir `aria-label="Picky Pixels Studio — Home"` em todos.
**Esforço:** S

---

### 🟡 MEDIUM — Filtros com defaults divergentes (All vs All Projects)
**Página/Componente:** `.portfolio-filters` em home `#work` e `portfolio.html` · `index.html:295` e `portfolio.html:166`
**Eixo:** Arquitetura de informação
**Evidência:** Home: `<button data-filter="all">All</button>`. Portfolio: `<button data-filter="all">All Projects</button>`. As outras 2 (Web Design / Marketing) são idênticas.
**Problema:** Pequena inconsistência de cópia gera percepção de descuido — para um usuário que clica `Work` no nav após ver os filtros na home, espera achar a mesma UI. Recebe "All Projects" em vez de "All" — micro-interrupção do mental model.
**Por que importa:** Estúdio que afirma "Systems Thinking" deve ter os mesmos componentes nomeados igual em todos os lugares. Sintoma de copy-paste sem revisão.
**Recomendação:** Padronizar para "All" em ambos OU "All Projects" em ambos. Preferência: "All" (mais curto, igual ao padrão Material Design / Apple). Aplicar no PT também ("Todos" vs "Todos os Projetos").
**Esforço:** S

---

### 🟡 MEDIUM — Filter state não é preservado no scroll-to-portfolio
**Página/Componente:** home `#work` filter → "See Full Work" link · `script.js:985-987`
**Eixo:** Arquitetura de informação · Conversão
**Evidência:** O JS do home filter (linha 985) ATUALIZA o `href` do botão "See Full Work" baseado no filtro ativo: `portfolio.html?filter=marketing`. O `initPortfolioPageFilter` (linha 1044) lê o querystring e aplica o filtro inicial. **Funciona** — boa prática! Mas a inversa NÃO: o "Visit Website" link aponta para a URL externa diretamente, então clicar num portfolio item externo + voltar não preserva o filtro escolhido.
**Problema:** Inconsistência sutil — o estúdio acertou metade do fluxo (home → portfolio com filtro preservado) mas não pensou no retorno (back from external site → portfolio sem filtro). E o filtro do home também não é preservado se o usuário navegar para outra section da home e voltar (mantém em memória mas sem URL hash).
**Por que importa:** Para o caso 80%, está OK. Para usuários que comparam projetos, voltar e perder filtro é friction.
**Recomendação:** Refletir filtro ativo no URL via `history.pushState` (ex: `index.html?work-filter=marketing#work`). Quando o usuário voltar via browser back, o URL mantém o estado. Esforço baixo, ganho de polimento.
**Esforço:** S

---

### 🟡 MEDIUM — Pricing section comentada e não mencionada em lugar nenhum
**Página/Componente:** home `#packages` · `index.html:638-782` (HTML comment)
**Eixo:** Arquitetura de informação · Conversão
**Evidência:** Há ~150 linhas de pricing block (3 packages: One-Page Starter €250, Creative Pro Site €475, Soulful Shop €950) DENTRO de um HTML comment — então não renderiza, mas continua no source. Commit recente: `1058743 Hide pricing section and nav links temporarily`. **Nenhuma página menciona preço — e nenhuma menciona "preços sob consulta" / "request quote"**. Services.html lista 30 serviços sem nenhum custo associado.
**Problema:** Três cenários, nenhum bom: (a) usuário scolha sair do site para procurar concorrente que mostre preço, (b) usuário envia form esperando descobrir preço e tem expectativa de "deve ser caro", (c) usuário ignora a CTA por dúvida de orçamento. Para serviço de €250-€2k, a faixa de preço é exatamente onde pricing transparente impulsiona conversão.
**Por que importa:** Decisão estratégica do cliente, mas o silencioso atual não é neutro — comunica "evita conversa de preço". Sites de estúdio que escolhem não mostrar preço (`pentagram.com`, `instrument.com`) explicitamente dizem "Project budgets typically start at $X" ou "We work with budgets from €Xk". Silêncio total é o pior dos mundos.
**Recomendação:** Decidir: voltar pricing OU adicionar uma frase "Most projects start around €X" no services.html no fim do `services-cta`. Se decidir por silêncio, ao menos adicionar no form um campo "Budget range" (faixas: <€500, €500-1.5k, €1.5k-5k, >€5k, "Not sure yet") — qualifica leads e sinaliza que o estúdio fala de preço.
**Esforço:** S (a frase) ou M (decisão estratégica + reativar packages)

---

### 🟡 MEDIUM — "Connect with me:" / "Connect with us:" — voz inconsistente
**Página/Componente:** `social-connect` em home vs portfolio · `index.html:829` e `portfolio.html:352`
**Eixo:** Arquitetura de informação (sinaliza "quem está atendendo?")
**Evidência:** Home: `<p>Connect with me:</p>`. Portfolio: `<p>Connect with us:</p>`. Studio + services não têm essa string. Mesmo data-translate key (`contact-connect`) — então a tradução é única, mas as duas instâncias divergem.
**Problema:** Mistura de voz "we" (3 founders) e "me" (Nathielle?) sinaliza para o usuário um conflito não resolvido: é um estúdio (3 pessoas) ou uma freela (Nathielle) com 2 colaboradores? O email do contato é só `nathielle@pickypixels.studio` em todas as páginas, reforçando a confusão.
**Por que importa:** Para "trust" no funil de venda, a clareza sobre QUEM atende é fundamental. Se o estúdio é "we" (3 sócios), o canal de contato deveria ser `hello@`/`contato@`/`studio@pickypixels.studio` — não o pessoal de uma única pessoa. Se é "Nathielle + 2", então a posicionamento deveria ser explícito ("Nathielle leads — Rebeca and Marcos collaborate").
**Recomendação:** Decidir o pronome único: **"us"** (assumir o "we" do estúdio). Padronizar em todas as instâncias. Trocar `nathielle@pickypixels.studio` por `hello@pickypixels.studio` (alias que vai pra inbox dela ou shared inbox). Bonus: `mailto:hello@pickypixels.studio?subject=Project%20Inquiry%20—%20[Your%20Name]` pré-preenche assunto.
**Esforço:** S

---

### 🟡 MEDIUM — Social URLs inconsistentes (Instagram handle muda)
**Página/Componente:** múltiplos · nav-social aponta para `instagram.com/pickypixels`, footer aponta para `instagram.com/pickypixelsstudio`
**Eixo:** Arquitetura de informação
**Evidência:** Grep confirma 2 handles: `pickypixels` (top nav todas as páginas) vs `pickypixelsstudio` (footer todas as páginas + contact section + JSON-LD `sameAs`). Ambos URLs funcionam? Provavelmente um redireciona ou um é dead.
**Problema:** Usuário clica top nav Instagram → vê perfil A; clica footer Instagram → vê perfil B (ou redirect). Para um estúdio, ter 2 handles ativos é confuso; ter 1 handle ativo e 1 dead linka usuário pra "page not found" do Instagram.
**Por que importa:** Brand consistency. Sintoma de "ninguém revisou" — exato oposto da thesis "Design Taste".
**Recomendação:** Verificar qual handle é o real (provavelmente `pickypixelsstudio` é o canônico, dado que aparece no schema.org JSON-LD), e padronizar em **todos** os 11 lugares. Opcional: registrar o handle não-usado e fazer redirect interno do IG.
**Esforço:** S

---

### 🟡 MEDIUM — Cards web na portfolio têm "Visit Website" mas alguns não — e isso quebra o pattern
**Página/Componente:** `portfolio.html` `.portfolio-grid` · cards Stegel Nails (linha 232) e Isabel Vieira (linha 244)
**Eixo:** Conversão (prova social) · Arquitetura de informação
**Evidência:** Inventory capture #10. Os 6 web cards na portfolio.html: Turmeric, Gabriella, LivingLeaving, FazUmCafezim têm `<a class="portfolio-link">Visit Website</a>`. **Stegel Nails e Isabel Vieira não têm** — terminam no `<p>` da descrição. Os cards parecem incompletos.
**Problema:** Para o usuário, "este estúdio entregou esse site, mas não me deixa ver o site real" sugere: (a) o site não foi entregue, (b) o site foi modificado pelo cliente e o estúdio tem vergonha, (c) o estúdio se esqueceu de adicionar o link. Qualquer das 3 é ruim. Pior, o card abre `image-overlay` (o problema CRITICAL #1) — então o usuário vê uma imagem estática sem nenhuma rota para visitar o produto real.
**Por que importa:** A prova mais forte de um trabalho web é o link funcional. Sem ele, o card vira "design mockup" sem prova de execução.
**Recomendação:** 1) Verificar se os sites realmente existem em produção. 2) Se sim, adicionar o link `Visit Website`. 3) Se foram desativados pelo cliente, marcar com pequena tag "Ongoing maintenance" ou "Archived" + um Wayback Machine link. 4) Se nunca foram para produção (apenas comp/preview), remover do portfolio — o trabalho não vendido publicamente não conta como portfolio prova.
**Esforço:** S

---

### 🟡 MEDIUM — `services.html` tem 30 serviços listados mas sem priorização
**Página/Componente:** `services.html` 3 sections (Marketing/Web/Software) · `services.html:170-474`
**Eixo:** Arquitetura de informação · Conversão
**Evidência:** Marketing: 13 serviços (Social Media, Graphic Content, Video, Photography, Copywriting, Brand Strategy, Editorial Calendar, Monthly Reports, Consultancy, Email Marketing, Paid Traffic, Batch Production, Event Coverage). Web: 7 (Landing, Website, E-Commerce, SEO, Form, Maintenance, Analytics). Software: 7 (Mobile App, API, Scheduling, Management, Automation, Database, Cloud Deployment). Totalizando **27 cards**, todos com mesmo peso visual e mesmo formato de card.
**Problema:** Quando tudo é igualmente importante, nada é importante. Para um estúdio de 3 pessoas, vender 27 serviços simultaneamente é (a) suspeito ("é só o estúdio sabe fazer tudo?"), (b) confuso para o cliente (difícil mapear "preciso de X" para um dos 27 cards), (c) inconsistente com a thesis "Strategic Thinking" (estúdios estratégicos especializam, não broadcastam).
**Por que importa:** Sintoma de "Sears catalog problem" — listar tudo o que se sabe fazer dilui posicionamento. Estúdios maduros (`humaan.com/services`, `instrument.com/capabilities`) tem 4-7 categorias-mãe, cada uma com 2-3 serviços-âncora dentro.
**Recomendação:** Reagrupar os 27 cards em 3 sections × 4-5 cards âncora. Por exemplo, fundir "Editorial Calendar" + "Monthly Reports" + "Consultancy" num único "Strategic Marketing Operations". Fundir "Form Setup" + "Analytics Setup" em "Website Configuration". Para o restante, listar como "Also: copywriting, editorial calendar, ..." em um parágrafo de fim de section. Promover ao topo os 3 serviços-âncora: "Brand identity systems, Custom websites, Mobile apps" (ou os que o estúdio vende mais).
**Esforço:** L (mas parcialmente cosmético se mantiver o conteúdo)

---

### 🟡 MEDIUM — Form mensagem placeholder muda voz entre páginas
**Página/Componente:** textarea placeholder · `index.html:918` ("Tell me about your project...") vs `portfolio.html:439` ("Tell us about your project...")
**Eixo:** Arquitetura de informação (voz inconsistente)
**Evidência:** Confirmado por grep direto. Mesmo `data-translate-placeholder="form-message"`, mas o texto inline diverge ("me" vs "us"). Antes do JS rodar, o usuário vê a versão inline.
**Problema:** Mesmo problema do "Connect with me/us" — incoerência sobre quem atende. Aqui especificamente, o form da home diz "me" (singular) e o da portfolio diz "us" (plural). Confunde até em qual ano estamos no funil.
**Por que importa:** Idêntico ao finding "Connect with me/us" — voz é o sinal sutil mais forte de quem está do outro lado.
**Recomendação:** Consolidar para "us" no markup inline E na chave PT do `translations.pt["form-message"]`. Verificar todas as 8 instâncias de "me/us" no site.
**Esforço:** S

---

### 🟡 MEDIUM — Process da Studio é texto sem entregáveis ou prazos
**Página/Componente:** `studio.html` `.studio-steps` 4 cards (Position/Design/Build/Refine) · `studio.html:321-353`
**Eixo:** Conversão (gerenciamento de expectativa)
**Evidência:** Cada step tem número (01-04), título (1 palavra), e 1 frase descritiva. Nenhum prazo ("Position: 1 week"), nenhum entregável ("Brief document, content audit"), nenhuma indicação de envolvimento do cliente ("3 review checkpoints").
**Problema:** Para um cliente avaliando contratar, o "process" é onde ele decide se confia ou não no estúdio. "We clarify what the brand needs to communicate" não diz NADA sobre o que vai acontecer concretamente nas 2 primeiras semanas. Sintoma de marketing-page genérica em vez de transparência operacional.
**Por que importa:** Decisão de contratar agência é inerentemente sobre confiança. Estúdios que ganham essa confiança rapidamente são os que mostram entregáveis e prazos concretos. Referência: `humaan.com/services` lista cada fase com "What you'll get" + "Typical timeline". `metalab.com` lista process com phases + deliverables.
**Recomendação:** Para cada um dos 4 steps, adicionar 2 linhas:
- "**Timeline:** ~1 week"
- "**You'll receive:** brief, sitemap, content matrix"

Mantém a página minimalista mas adiciona substância. Bonus: 1 quote por step de cliente passado relacionado ("Adoramos a clareza do brief — Maria, Turmeric").
**Esforço:** S

---

### 🟢 LOW — Privacy policy link só na footer, sem referência no form
**Página/Componente:** form privacy checkbox vs footer
**Eixo:** Arquitetura de informação
**Evidência:** O checkbox no form (`index.html:935-943`) tem `<a href="/privacy-policy.html">privacy policy</a>` — funciona. Footer também. Mas privacy é mencionado apenas após o usuário scrollar até o form ou até o footer. Não há link no nav nem em FAQ-like areas.
**Problema:** Pequeno — para a maioria dos usuários, o footer é suficiente. Para usuários atentos a GDPR (mercado UE/Portugal), faltam: cookie banner, link explícito a "How we use your data", info sobre retenção de form submissions (Formspree as a processor).
**Por que importa:** Compliance + percepção de profissionalismo. Para B2B em Portugal, RGPD é tópico vivo.
**Recomendação:** Adicionar cookie consent banner (já que GA4 está rodando + Formspree). Adicionar pequeno link "Privacy" no nav-social area. Garantir que o privacy-policy.html cobre RGPD adequadamente (separar audit no Agent C).
**Esforço:** M

---

### 🟢 LOW — Page-hero subtitle invisível em portfolio cards filtrados
**Página/Componente:** `.portfolio-empty` · `portfolio.html:313-315`
**Eixo:** Conversão (edge case)
**Evidência:** O HTML tem `<div class="portfolio-empty" hidden><p>No projects found in this category yet. Check back soon!</p></div>`. O JS toggle `hidden` baseado em `visibleCount`. Nesse momento, **nenhuma das 3 categorias retorna 0 projetos** — então a mensagem nunca aparece. Mas se o usuário entrar via `?filter=foo` (categoria inexistente), a fallback em `script.js:1045` força "all" — então também não aparece.
**Problema:** Componente morto. Não causa bug, mas adiciona ruído ao HTML.
**Por que importa:** Limpeza. Apontar agora porque vai virar bug se categorias forem adicionadas no futuro.
**Recomendação:** Remover o componente OU garantir que ele seja triggered se `applyFilter` resultar em `visibleCount === 0`. Mais simples: remover.
**Esforço:** S

---

### 💡 SUGGESTION — Adicionar location explicit ao site (Porto)
**Página/Componente:** todas
**Eixo:** Conversão · Arquitetura de informação
**Evidência:** A localização "Porto District" aparece apenas em 3 location-badges no services.html (Photography, Batch Production, Event Coverage). O JSON-LD diz `addressCountry: Portugal` mas sem cidade. Hero, footer, nav — nenhum menciona Porto.
**Problema:** Para SEO local + para o cliente em Porto que quer "estúdio local", a falta de menção à cidade tira o estúdio de buscas locais. Para clientes internacionais, a falta de menção tira o "exotic" de "estúdio em Porto". Em ambos os mundos, perde.
**Por que importa:** Local SEO em Portugal é dominado por keywords como "agência marketing porto", "web design porto". Sem menção, o site não compete.
**Recomendação:** Adicionar "From Porto, Portugal" no greeting badge ou na linha logo abaixo do hero. Adicionar endereço completo no footer (mesmo que apenas "Porto, Portugal" sem rua). Adicionar ao schema.org JSON-LD: `addressLocality: "Porto"`. Bonus: criar página `/porto` ou seção "We're a Porto-based studio" no studio.html com 1 parágrafo + foto de equipe num espaço identificável.
**Esforço:** S

---

### 💡 SUGGESTION — "How Can We Help You?" duplica services.html
**Página/Componente:** home `services-help` section · `index.html:557-636`
**Eixo:** Arquitetura de informação
**Evidência:** A section da home `How Can We Help You?` tem 3 colunas (Marketing/Web/Software) com 6 bullets cada e link "See all marketing services" → `services.html#marketing`. A page services.html mostra 30+ cards com a mesma taxonomia. **A home está re-implementando uma versão "lite" de services.html.**
**Problema:** Se o usuário lê os 18 bullets da home, qual o incentivo para clicar em "See all"? Os bullets já entregam a mensagem. Se não lê, então a section está ocupando ~1500px de scroll por nada.
**Por que importa:** Uma home enxuta linka para páginas profundas. Uma home "supermercado" replica conteúdo.
**Recomendação:** Reduzir o `services-help` para 3 frases-âncora + 1 CTA forte:
- "We do brand-aligned websites, marketing operations, and custom software."
- 3 ícones grandes (Marketing / Web / Software) com 1 frase cada.
- 1 CTA: "See all services →".

Total: ~400px de scroll em vez de ~1500. Foco do `services.html` recupera importância.
**Esforço:** M

---

### 💡 SUGGESTION — Adicionar "Latest from the studio" / blog teaser
**Página/Componente:** home (após about, antes de contact)
**Eixo:** Conversão · Arquitetura de informação (SEO)
**Evidência:** Não existe blog, journal, case-study writeup, ou changelog em nenhuma página. O estúdio que afirma "Strategic Thinking, Technical Depth" não publica nada que demonstre esse pensamento.
**Problema:** Para diferenciação em um mercado saturado, conteúdo (case studies escritas, opiniões sobre design, breakdowns de processo) é o arsenal mais eficaz. Sem isso, o estúdio compete só em preço/portfolio.
**Por que importa:** Estúdios com blog ativo recebem inbound leads via SEO + autoridade percebida. Para um estúdio jovem, é o caminho mais barato de notoriedade. Referência: `cassie.codes` (blog ativo dela é o melhor recurso de portfolio); `rauno.me`; `pip.codes`.
**Recomendação:** Criar uma rota `journal.html` simples com 3-5 artigos curtos (case-study breakdowns dos próprios projetos: "How we structured Turmeric's menu"). Linkar do nav (5º item) ou no footer. Cadência mínima 1 post/mês, mas a barra mais baixa: 1 post/trimestre é ainda melhor que zero.
**Esforço:** L (esforço editorial contínuo)

---

## Score por eixo

### Eixo 2 — UX / Information Architecture: **3.5/10**

**Justificação:** O site tem fundação razoável (nav consistente entre páginas internas, hierarquia básica de seções, breadcrumb implícito via active state nas páginas internas), mas comete erros estruturais que comprometem o mental model:

- **(-3)** A inexistência de "Home" / `active state` na home, combinada com o nome "Studio" idêntico ao nome do estúdio, quebra a navegação para metade dos novos usuários.
- **(-2)** Os mesmos projetos com nomes diferentes ("Some of Our Favorite Projects" vs "Work We're Proud Of") + dois inventários incompatíveis (6 cards uniformes na home vs 6 web cards + 3 company cards no portfolio) treinam desconfiança no mapa.
- **(-1.5)** Contact como anchor cross-page (`index.html#contact`) é a quebra mais visível do mental model — o usuário não pode "ir contatar", só pode "voltar para a home, scrollar, contatar".
- **(-1)** Footer redundante (idêntico à top nav + 0 conteúdo institucional) é desperdício de IA.
- **(-1)** PT version aponta para EN-only pages — falha estruturalmente como i18n.
- **(+0.5)** Bonus: filter state preservado via querystring `?filter=` é boa execução.
- **(+0.5)** Bonus: nav consistente entre as 4 páginas (mesma ordem, mesmos itens).

### Eixo 5 — Conversion UX & Funnels: **3/10**

**Justificação:** O funil de conversão é frágil em quase todos os pontos críticos:

- **(-2)** Click em projeto entrega 2 experiências opostas (image-overlay sem contexto vs company-modal organizado) — o caminho mais óbvio de prova social está fragmentado.
- **(-2)** Trust signals praticamente ausentes (sem testemunhos, sem logos strip, sem métricas de outcome) — o multiplicador #1 de conversão está em 0.
- **(-1.5)** Form com 17 opções + fim da página de 5000+px + 0 CTAs intermediários = leak alto entre intent e action.
- **(-1.5)** Studio.html é dead-end de conversão (sem CTA de contato no fim) — perde os usuários no momento mais "pronto-pra-converter" do funil.
- **(-1)** Calendly + form + WhatsApp + email duplicados sem hierarquia = paralisia de escolha.
- **(+0.5)** Bonus: o form básico funciona (Formspree configurado, mensagens de sucesso/erro existem).
- **(+0.5)** Bonus: services-cta tem dois CTAs (Calendly primário + form secundário) — boa hierarquia local mesmo que inconsistente entre páginas.

---

**Total findings:** 25 (4 CRITICAL · 8 HIGH · 9 MEDIUM · 1 LOW · 3 SUGGESTION)

**Top 3 ações de maior impacto e menor esforço:**
1. Renomear "Studio" para "About" no nav (S, mas resolve o mental model imediatamente).
2. Adicionar CTA de contato no fim de studio.html (S, +5-10pp conversão estimado).
3. Padronizar "us" / consolidar Calendly em uma única cópia / standardize Instagram handle (S, S, S — 3 polimentos com efeito multiplicado de "atenção a detalhe" alinhada à thesis).
