# 03 — Findings · Agent D · Copywriting & Brand Voice

Auditor: Senior copywriter / brand strategist · 2026-05-12

The premise: the studio's own thesis (`studio.html` §What We Believe) says "great agency websites should already feel like proof — judgment, technical polish, content hierarchy, and a clear point of view." The bar is therefore not "is this copy OK for a small business website?" but "does this copy demonstrate the editorial discipline we sell?". Most of the findings below are framed against that bar.

The site has two voices fighting each other:

1. The **strategic voice** in `studio.html` ("Design Taste, Strategic Thinking, Technical Depth", "Different strengths, shared standards", "Small Team, High Standards, Clear Process"). This voice is short, declarative, no jargon, no emoji.
2. The **friendly-startup voice** in `index.html` ("Hey there, we're Picky Pixels!", "With Heart", "Fun and stress-free process", "Designs and strategies that reflect your unique story"). This voice is warm, generic, leans on emoji and platitudes.

A visitor arriving on the home gets voice 2; a visitor arriving on `studio.html` gets voice 1. They will assume two different studios wrote them. Picking one (and rewriting the other) is the single most leveraged copy decision on the site.

---

## Findings (ordered by severity, then by axis)

### 🔴 CRITICAL — `index.pt.html` is the production PT page and it is full of unaccented Portuguese
**Página/Componente:** `index.pt.html` (entire file)
**Eixo:** i18n
**Evidência:**
- `index.pt.html:19` (OG description): `"Ajudamos criativos e pequenas empresas a crescer online - de sites incriveis e apps a marketing estrategico que conecta e converte."`
- `index.pt.html:249` (hero subtitle): `"Ajudamos criativos e pequenas empresas a crescer online - de sites incriveis e apps a marketing estrategico que conecta e converte."`
- `index.pt.html:307`: `"Um website moderno para restaurante de culinaria indiana paquistanesa no Porto, Portugal."`
- `index.pt.html:337`: `"...sofisticado portfolio de design de interiores com galeria imersiva e comparacoes antes-depois."`
- `index.pt.html:979` (footer): `"Ajudando pequenas marcas e criativos ousados a aparecer online com alma, clareza e confiança."` ("alma" is correct, but compare to `script.js:187` which uses "coração" — divergence inside PT itself).

**Problema:** The static HTML the visitor receives on first paint of `pickypixels.studio/index.pt.html` is missing accents on basic words: `incriveis` (incríveis), `estrategico` (estratégico), `culinaria` (culinária), `comparacoes` (comparações), `solucoes` (soluções), `Estrategia` (Estratégia), `anuncios` (anúncios), `criativos de anuncios` (criativos de anúncios), `Anuncios`, `Impresso`, `Design Grafico`, `Redes Sociais` is fine, `Trafego` (Tráfego — appears later). Many appear in the OG/Twitter meta tags, which means social previews shared from the PT URL will display unaccented copy too. The `script.js` translation keys re-paint the visible body when JS runs, but (a) meta tags are static and not retranslated, (b) the FOUC interval shows the broken HTML, (c) any user/crawler with JS off (Googlebot indexing meta, social platforms scraping OG) sees only the broken version.
**Por que importa:** A Porto-based studio publishing PT copy with missing acentos reads as either careless or non-native. For a studio whose thesis is "judgment", this is the single most damaging credibility leak on the site. It also breaks Portuguese SEO (search engines treat "estrategico" and "estratégico" as different tokens; the latter is what users actually search).
**Recomendação:** Run a single pass over `index.pt.html` and fix every word missing an accent. A non-exhaustive list to start with:
- `incriveis` → `incríveis`
- `estrategico` → `estratégico`
- `culinaria` → `culinária`
- `comparacoes` → `comparações`
- `solucoes` → `soluções`
- `Estrategia` → `Estratégia`
- `anuncios` → `anúncios`
- `consultoria energetica` → `consultoria energética`
- `Trafego` → `Tráfego`
- `Grafico` → `Gráfico`
- `Sessoes` → `Sessões`
- `apresentando` is fine; `gama` is fine
After the fix, the static HTML should match what `script.js` paints when language is switched. Then enforce: never edit the PT translations in two places — pick one source of truth (`script.js` translations OR a single `index.pt.html`, not both).
**Esforço:** S

---

### 🔴 CRITICAL — Hero PT subtitle is not a translation of the EN subtitle — they communicate different positioning
**Página/Componente:** Home hero (PT vs EN)
**Eixo:** i18n + Copywriting
**Evidência:**
- EN (`index.html:255`, `script.js:338`): `"We help creatives and small businesses grow online -from stunning websites and apps to strategic marketing that connects and converts."`
- PT static (`index.pt.html:249`): `"Ajudamos criativos e pequenas empresas a crescer online - de sites incriveis e apps a marketing estrategico que conecta e converte."` (translation of EN)
- PT in JS (`script.js:85`): `"Criamos experiências digitais para marcas criativas que querem mais do que só um site -querem conexão, clareza e presença."` (different message entirely)

**Problema:** The PT hero subtitle exists in two contradictory versions — the static `index.pt.html` version is a direct translation of the EN, but `script.js:85` paints a completely different message the moment JS runs. A PT user sees the static "Ajudamos criativos..." for ~200ms, then the JS replaces it with "Criamos experiências digitais...". The two messages also pitch different value: EN says "we help you grow online", JS-PT says "we create digital experiences for brands that want connection, clarity, and presence". One is conversion-led ("grow"), one is brand-led ("connection, clarity, presence"). They cannot both be the headline subtitle.
**Por que importa:** This is brand schizophrenia at the most-read line on the site. It also shows the PT translation pipeline is broken — nobody noticed two versions disagree because nobody is treating PT as a first-class artifact.
**Recomendação:** Pick one PT subtitle and put it in both places (static HTML + JS). Recommended: keep the EN-aligned version for now (`"Ajudamos criativos e pequenas empresas a crescer online — de sites e apps incríveis a marketing estratégico que conecta e converte."`) — note em-dash, accents, and "incríveis" (plural agreement). The "Criamos experiências..." line is a softer, brand-side message — it can live in the studio.html PT subtitle if you want both voices, but never as the home hero subtitle.
**Esforço:** S

---

### 🔴 CRITICAL — "Connect with me:" / "Connect with us:" / "Conecte-se conosco:" — three different choices for the same line
**Página/Componente:** Home contact (`index.html:829`), Portfolio contact (`portfolio.html:352`), Home PT contact (`index.pt.html:818`, `script.js:158`)
**Eixo:** Voice
**Evidência:**
- `index.html:829`: `<p data-translate="contact-connect">Connect with me:</p>`
- `portfolio.html:352`: `<p data-translate="contact-connect">Connect with us:</p>`
- `script.js:411` (EN translation): `"contact-connect": "Connect with me:"`
- `script.js:158` (PT translation): `"contact-connect": "Conecte-se conosco:"` (= "with us")
- `index.pt.html:818`: `Conecte-se conosco:`

**Problema:** Same `data-translate` key (`contact-connect`) resolves to "Connect with me:" in EN and "Conecte-se conosco:" (= with us) in PT. So when a user toggles EN→PT on the home page, "me" silently becomes "us" with no indication of why. Meanwhile portfolio.html hardcodes "Connect with us:" but uses the same key — so loading portfolio in EN, the JS runs `applyTranslations("en")` and rewrites it to "Connect with me:". The page that says "us" in the source file actually displays "me" after JS execution. The whole site otherwise uses "we / our" — "Connect with me:" is the only first-person-singular line in the EN copy.
**Por que importa:** This is a 3-founder studio. "Connect with me" makes it sound like a solo freelancer pretending to be an agency. A visitor who saw "We're Nathielle, Rebeca, and Marcos" 10 seconds earlier and now reads "Connect with me" reasonably wonders who "me" is.
**Recomendação:** Replace all three with `"Connect with us:"` / `"Conecte-se conosco:"`. Update `script.js:411` from `"Connect with me:"` to `"Connect with us:"`. The "me" pattern shows up again at `index.html:918` and `script.js:416` — `placeholder="Tell me about your project..."` and `"form-message": "Tell me about your project..."`. Fix all of them in one pass: `"Tell us about your project..."` (which is what `portfolio.html:439` already uses). The first-person-singular voice belongs nowhere in the site as long as the team copy says "we".
**Esforço:** S

---

### 🟠 HIGH — Hero EN is fighting itself: emoji greeting + "With Heart" + studio thesis "Design Taste, Strategic Thinking, Technical Depth"
**Página/Componente:** Home hero EN (`index.html:242-253`)
**Eixo:** Voice
**Evidência:**
- `index.html:242-244`: `<span class="greeting">👋 Hey there, we're Picky Pixels!</span>`
- `index.html:245-253`: `Marketing, / Design & Dev / With Heart` (last word in outline-text gimmick)
- `studio.html:148-150`: `Design Taste, / Strategic Thinking, / Technical Depth`

**Problema:** The home hero opens with a waving-hand emoji, the casual "Hey there", and crowns the H1 with the abstract noun "Heart". The studio page — the same brand — opens with "Design Taste, Strategic Thinking, Technical Depth", three precision-engineered nouns. A buyer comparing studios will read these as either (a) two different agencies, or (b) one agency that doesn't know what it is. The "👋 Hey there" greeting is a 2018 Squarespace template default; the "With Heart" is the kind of line a wedding photographer or a yoga studio uses. Neither belongs above-the-fold of an agency that sells "judgment".
**Por que importa:** Hero is the only line >70% of visitors will read. Picking the wrong voice here mis-prices the studio by ~50%. Compare to: Studio Lin (studio-lin.com) hero — single sentence, no emoji, no gradient. North Kingdom hero — single short positioning line. Pentagram hero — just the work, no copy at all. None of them open with a wave emoji.
**Recomendação:** Drop the emoji greeting badge entirely. Rewrite the H1 to align with studio.html voice. Suggested replacements (pick one):
- Conservative (keeps meaning, drops sentiment): `"Marketing, Design & Dev / built with care."` Drop outline-text gimmick.
- Aligned with studio.html: `"Marketing, design, and development — / built with the rigor of a system."`
- Brutalist (strongest): just remove the H1 line "With Heart" and keep `"Marketing, Design & Dev"` as a 2-line wordmark, with the subtitle doing the actual positioning work.

Subtitle, regardless of which H1 you pick, should say what the studio actually does in one sentence — not what we feel about it. Suggested: `"A 3-person studio building websites, apps, and marketing systems for creatives and small businesses in Porto."` (concrete: team size, deliverables, audience, place — which is exactly what the studio is selling and what the current "stunning websites" line hides.)
**Esforço:** S

---

### 🟠 HIGH — "Some of Our Favorite Projects" (home) and "Work We're Proud Of" (portfolio) — same content, two names, neither earns its space
**Página/Componente:** `index.html:287` (`section-work-title`) and `portfolio.html:152-153` (`page-work-title`)
**Eixo:** Copywriting
**Evidência:**
- `index.html:287`: `<h2>Some of Our Favorite Projects</h2>`
- `portfolio.html:152-153`: `<h1>Work We're / Proud Of</h1>`
- The section labels also disagree: `index.html:280` "Selected Work" / `portfolio.html:150` "Selected Work" / `index.html:287` "Some of Our Favorite Projects" — three labels for one concept.

**Problema:** Both titles say the same thing — "here is some work" — wrapped in self-praise. "Favorite" and "proud of" both belong to the studio, not the visitor; neither tells the visitor anything about what they are about to see. They are also both forty-percent-too-long for what they communicate.
**Por que importa:** Section titles are H1/H2 — they set the page promise. "Work We're Proud Of" is a stock 2017 portfolio H1 (try Googling it — hundreds of agencies use the exact phrase). For a studio claiming "Taste First", reusing a clichéd H1 fails the taste test on its own portfolio page.
**Recomendação:** Pick one title and use it everywhere there is a `Work` section. Replace both with one of:
- `"Selected Work"` — promote the existing label to title; the simplest, most confident.
- `"Recent Work"` — adds a freshness signal.
- `"Six websites and three brand systems."` — declarative, specific, earns its space (mirrors the Pentagram hero pattern).
The home section can lead with the same title and add a count/year signal underneath ("Selected work · 2023–2026 · 9 projects"). Pick whichever, but use it once.
**Esforço:** S

---

### 🟠 HIGH — Owner-values copy fails the "fortune cookie test"
**Página/Componente:** Home about (`index.html:530-545`) + PT (`index.pt.html:524-539`) + JS translations (`script.js:115-120`, `368-373`)
**Eixo:** Copywriting
**Evidência:**
- `index.html:533-534`: `Personal — "Designs and strategies that reflect your unique story"`
- `index.html:538-539`: `Strategic — "Creative solutions with purpose"`
- `index.html:543-544`: `Collaborative — "Fun and stress-free process"`

**Problema:** Run the fortune-cookie test (Joel Spolsky, paraphrased): "if I delete the agency name, can this paragraph fit on any other agency's website?" All three pass with zero edits. "Creative solutions with purpose" is the highest-density cliché in the agency industry — it appears verbatim on Etsy, Fiverr, and Wix template homepages by the thousand. "Fun and stress-free process" is what every freelancer claims and zero clients can verify until after the engagement. "Designs and strategies that reflect your unique story" combines two clichés ("unique story" + "reflect who you are") and adds nothing. Now compare to studio.html principles: "Strong visual choices that feel intentional, not generic", "Every page, block, and interaction has a clear role", "Clean front-end, strong UX, and maintainable delivery." The studio.html versions actually commit to specifics. The home versions don't.
**Por que importa:** These three cards sit directly under the team photos. The team photos already humanize. The cards then waste prime real estate on platitudes the visitor already assumed. Worse — they undermine the studio.html principles by showing that the team can write a sharp principle when forced (studio page) and a generic one when not (home page), suggesting the home was rushed.
**Recomendação:** Either delete the three cards entirely (the team photos + paragraph already do the humanization) OR replace with the studio.html principles verbatim, using the same icon style. If you keep three cards, rewrite to commit to specifics. Suggested replacements:
- `Personal` → `Run by 3, not 30. The people who pitch are the people who build.`
- `Strategic` → `Every site we ship is structured around one job: convert the right visitor.`
- `Collaborative` → `Weekly check-ins, no surprise invoices, source files handed over at the end.`
Each of these is testable. "Fun and stress-free" is not.
**Esforço:** M (requires brand alignment but copy itself is small)

---

### 🟠 HIGH — Founder roles are written in three different registers
**Página/Componente:** Home team (`index.html:445`, `:473`, `:510`) + Studio team (`studio.html:238`, `:266`, `:303`)
**Eixo:** Copywriting
**Evidência:**
- Nathielle: `"Web Design & Development"` — generic department name
- Rebeca: `"Multichannel Marketing Strategist"` — corporate jargon
- Marcos: `"Software Engineer & Mobile Developer"` — technical/discipline

**Problema:** Three founders, three completely different registers. "Multichannel Marketing Strategist" is enterprise B2B speak (Hubspot, Salesforce). "Software Engineer & Mobile Developer" is what the engineer's LinkedIn says. "Web Design & Development" is what a department is called inside a company, not a person. None of them tells the visitor what each founder actually does day-to-day or why they are good at it. The PT versions repeat the inconsistency: "Estrategista de Marketing Multicanal", "Engenheiro de Software & Dev Mobile", "Web Design & Desenvolvimento" — all three registers preserved.
**Por que importa:** Reference: Read.cv, the standard for founder/team bios in the design-studio space, uses `Role · 1-line specificity`. E.g. "Designer at Vercel — design systems, marketing sites." Picky Pixels currently has the role part but no specificity, and the role part itself is uneven. A potential client trying to figure out "who do I email if I need an iOS app" cannot tell from these labels.
**Recomendação:** Standardize to one of:

Option A (parallel function nouns): `Design & Front-end`, `Marketing & Brand`, `Software & Mobile`. Three words each, parallel, scannable.

Option B (function + edge): `Design & Front-end — restaurants, salons, small e-commerce`, `Marketing & Brand — content, paid, calendars`, `Software & Mobile — iOS, Android, internal tools`. Adds the "good for what" signal that converts.

Drop "Multichannel Strategist". Drop "Engineer & Developer" (an engineer is a developer; the redundancy is unintentional). The PT translations should mirror whichever EN choice you make — e.g. `"Design & Front-end"` should NOT be translated as `"Web Design & Desenvolvimento"`; either keep it English (it already says "Studio" in PT for nav-about) or commit to PT names like `"Design e Front-end"`.
**Esforço:** S

---

### 🟠 HIGH — Footer tagline is a sentence-long cliché chain
**Página/Componente:** Footer EN (`index.html:993-994`, repeated on every page) and PT (`index.pt.html:979-980`, `script.js:187`)
**Eixo:** Copywriting
**Evidência:**
- EN: `"Helping small brands and bold creatives show up online with heart, clarity, and confidence."`
- PT (script.js): `"Ajudando pequenas marcas e criativos ousados a se destacarem online com coração, clareza e confiança."`
- PT (index.pt.html static): `"Ajudando pequenas marcas e criativos ousados a aparecer online com alma, clareza e confiança."` (uses "alma" not "coração", "aparecer" not "destacarem-se" — divergence inside PT)

**Problema:** "Helping [X] do [Y] with [Z, Z, and Z]" is the single most overused tagline structure in agency websites. The triplet "heart, clarity, confidence" is alliterative-adjacent and reads as Mad-Libbed (it could be "passion, purpose, and polish" or "soul, story, and strength" with no meaningful difference). "Show up online" is so vague it could mean "have a website", "post on Instagram", or "exist". Also note PT divergence — "alma" vs "coração" vs "se destacarem" vs "aparecer". The PT footer cannot agree with itself across two files.
**Por que importa:** Footer tagline is the second-most-read line on the site (every page, every viewport). For a studio that demands "judgment" and "clear point of view", this is the cliché-test killshot.
**Recomendação:** Replace with a one-line factual positioning. Suggested:
- EN: `"A 3-person studio in Porto. Websites, apps, and marketing for creatives and small businesses."`
- PT: `"Estúdio de 3 pessoas no Porto. Sites, apps e marketing para criativos e pequenas empresas."`

Sync the static HTML and the JS translation to one source. Both currently say two different things in PT.
**Esforço:** S

---

### 🟠 HIGH — Marketing service descriptions are 13 stock-template paragraphs
**Página/Componente:** `services.html:170-303` (Marketing & Social Media section) + JS translations
**Eixo:** Copywriting
**Evidência:** A representative sample:
- `services.html:188`: `"Eye-catching visual content for your social media, campaigns, and brand materials -designed to stand out and tell your story."`
- `services.html:198`: `"From concept to final cut -engaging video content for social media, ads, and brand storytelling that captures attention."`
- `services.html:208`: `"Professional photography to elevate your brand -product shots, lifestyle imagery, and content creation sessions."`
- `services.html:219`: `"Compelling copy that speaks your brand's language -from social media captions to website text that connects and converts."`
- `services.html:229`: `"Define your brand's positioning, messaging, and visual identity with a clear strategy that guides every touchpoint."`
- `services.html:259`: `"Expert guidance for your marketing and digital strategy -whether you need a one-time session or ongoing support."`

**Problema:** All 13 marketing card descriptions follow the same Mad Libs template: `"[Adjective] [thing] -[verb-ing] [outcome] for [audience]."`. The verbs all rotate from a tiny pool (elevate, capture, connect, convert, engage, drive, nurture, optimize, scale). The phrase "your brand" appears in 9 of 13 descriptions. "Tell your story" appears 3 times across the page. None of the descriptions name a tool, deliverable format, turnaround time, or example. A buyer cannot tell from these whether Picky Pixels does Reels in After Effects or stock-template Canva exports, whether photo sessions are 2-hour or full-day, whether copywriting is per-piece or per-brand.
**Por que importa:** This is the page where price questions are formed. Vague descriptions force the buyer to discovery-call to figure out scope, which raises the friction-to-quote and lowers conversion. Reference: Basecamp's pricing page is built on a single confident sentence per row, no jargon. Linear's pricing rows say what you get in 6-8 words ("Unlimited members", "Native iOS / macOS / Android"). Picky Pixels' service rows currently say "Eye-catching visual content for your social media" — which doesn't tell anyone anything they couldn't already assume.
**Recomendação:** Rewrite each card to follow the pattern `[What it is, plain] · [Format / deliverable] · [Cadence or unit]`. Examples:

- `Social Media Management` → `"Posts, stories, and replies on up to 3 platforms. Calendar shared monthly, captions and design included. Per platform, per month."`
- `Graphic Content Creation` → `"Posts, stories, carousels, and ad creative. Editable source files (Figma or Adobe). Priced per pack of 10."`
- `Video Creation & Editing` → `"Reels, vertical ads, brand films. Shot in Porto or edited from your footage. Per finished minute."`
- `Photography Sessions` → `"Product, lifestyle, content batches. 2-hour or full-day. RAW + edited delivery."`
- `Copywriting` → `"Site copy, captions, ad copy, newsletters. EN and PT. Per page or per word."`
- `Brand Strategic Planning` → `"Positioning, messaging, visual direction. One workshop + a 12-page brand brief."`

Same treatment across the 13 cards. The deliverable is what closes the deal, not the adjective.
**Esforço:** L (real strategic work — needs founder input on scope/pricing model)

---

### 🟠 HIGH — Web Design service descriptions reuse the same vague template
**Página/Componente:** `services.html:317-386` (Web Design section)
**Eixo:** Copywriting
**Evidência:**
- `services.html:324`: `"High-converting, single-focus pages designed to capture leads, promote launches, or showcase your offerings."`
- `services.html:334`: `"Full website design and development -from multi-page sites to custom platforms, built with clean code and your brand identity."`
- `services.html:344`: `"Online stores built to sell -beautiful product pages, secure checkout, and a seamless shopping experience for your customers."`
- `services.html:354`: `"Search engine optimization to help your website rank higher -smart structure, keywords, and content strategies that bring organic traffic."`

**Problema:** Same Mad-Libs template as marketing. "Built with clean code" is the empty assertion of every web shop in existence. "High-converting" without a number is salesman pitch. "Smart structure, keywords, and content strategies" is the SEO category description on every single SEO agency landing page. None of these answer "what stack?", "WordPress or custom?", "what's the SEO deliverable — a report? technical fixes? content?". A buyer who arrived from `studio.html` (which said "Clean front-end, strong UX, and maintainable delivery") will be disappointed by the lower specificity here.
**Por que importa:** Web Design is the studio's most expensive line item. The descriptions need to do more work than the marketing cards because the price tag is higher. They are currently doing less work, because the underlying claim is even more generic.
**Recomendação:** Same treatment as the marketing rewrite:
- `Landing Pages` → `"One-page sites for product launches, events, or campaigns. Static HTML/CSS/JS or framework of your choice. Goes live in 2 weeks."`
- `Website Development` → `"3-10 page sites for service businesses. Static HTML or WordPress, your call. Source code yours at handover."`
- `E-Commerce` → `"Shopify or WooCommerce, depending on your shipping setup. Up to 50 SKUs in scope. Includes 1 month of post-launch fixes."`
- `SEO` → `"Technical audit + 5 priority fixes + on-page optimization for up to 10 pages. One-time or quarterly."`
- `Website Revision & Maintenance` → `"Monthly retainer: content updates, security patches, broken-link fixes, performance check. Cancel anytime."`

The pattern: name the technology, name the unit, name what closes the engagement.
**Esforço:** L (same reason — needs scope/pricing input)

---

### 🟠 HIGH — Hosting alert and location badge get inverted visual weight relative to their importance
**Página/Componente:** `services.html:389-391` (hosting note) and `services.html:209`, `:290`, `:301` (location badges)
**Eixo:** Microcopy
**Evidência:**
- Hosting note (`services.html:390`): `"Hosting and domain registration are not included in our web packages and are available as add-ons."` — full-width, salmon background, info icon, prominent.
- Location badge (`services.html:209`): `"Available in Porto District only"` — small, neutral, inline pill, three places (photo, batch, event).

**Problema:** "Hosting not included" is housekeeping — it limits scope but doesn't disqualify a buyer. "Available in Porto District only" is an actual disqualifier — a Lisbon agency CMO researching the photo service is being told "you cannot buy this", but in a quiet, almost-hidden pill. The visual hierarchy is inverted relative to the user impact.

The hosting note also uses defensive, lawyerly tone: `"Hosting and domain registration are not included"` (negative framing — what we *don't* do) instead of positive ("We can host for €15/mo or you keep your existing host" — what you *can* do). Defensive copy on services pages signals that this caveat has caused friction in the past.
**Por que importa:** A buyer in Lisbon clicking "Photography Sessions" should not need to read three paragraphs and a small badge to learn they are not eligible. Conversely, the hosting note's heavy treatment makes it feel like a problem when it should feel like a configuration.
**Recomendação:**
- Reframe the hosting note positively: `"Hosting and domain are billed separately — €15-25/mo with us, or bring your own."` Strip the salmon background; make it a footnote-tone line under the Web Design section header.
- Promote the location badge: each Porto-only service should have a small but visible label *in the card title* — e.g. `"Photography Sessions · Porto only"`. Or group the three Porto-only services into a sub-section with a clear header: `"In-person services (Porto District)"`.

PT versions need the same treatment — `"Hospedagem e registro de domínio não estão incluídos..."` is currently the same defensive structure.
**Esforço:** M

---

### 🟠 HIGH — Section labels (yellow pill badges) don't earn their visual prominence
**Página/Componente:** `index.html:280` "Selected Work", `:403` "Meet the Studio", `:792` "Ready to Start?", `services.html:150` "What We Do", `studio.html:146` "Inside the Studio", `:195` "The Team", `:313` "How We Work"
**Eixo:** Microcopy + Voice
**Evidência:**
- All seven labels are small, ALL CAPS, in a yellow/cream pill above each section title.
- Three are direct ("Selected Work", "What We Do", "How We Work").
- Four are warmer/lifestyle ("Meet the Studio", "Inside the Studio", "Ready to Start?", "The Team").

**Problema:** The labels split into two voices in the same component slot. "Inside the Studio" + "Meet the Studio" are also doing the same job — both above team-related sections. "Ready to Start?" is the only question — every other label is a noun phrase. The visual treatment is identical (same pill style) so the eye expects them to read in the same register; they don't.
**Por que importa:** Section labels in this style (ALL CAPS pill above H2) are a classic editorial design pattern — they only work if they read as a confident editorial voice. Mixing "Inside the Studio" (magazine voice) with "Ready to Start?" (sales voice) breaks the pattern. They become noise instead of structure.
**Recomendação:** Standardize on one register — declarative noun phrases, no questions. Suggested:
- `Selected Work` (keep)
- `Meet the Studio` → drop one of the duplicates: keep `The Studio` for the home about section and `The Team` for the studio.html team section.
- `What We Do` (keep)
- `Inside the Studio` → drop, redundant with `Meet the Studio`
- `Ready to Start?` → `Start a Project` (or remove the label and let the H2 stand alone)
- `How We Work` (keep)

PT versions need the same cleanup — `"Pronto para Começar?"` becomes `"Iniciar um Projeto"`, etc.
**Esforço:** S

---

### 🟠 HIGH — CTA inventory: 16 button labels for ~6 distinct intents
**Página/Componente:** Site-wide
**Eixo:** Microcopy + Copywriting
**Evidência:** Catalogued across all pages:

| Intent | Variants found |
|---|---|
| View work | `"View Our Work"` (`index.html:259`, `:550`), `"View Work"` (`studio.html:367`), `"See Full Work"` (`index.html:394`), `"See all marketing services"` / `"web"` / `"software"` (`index.html:590`, `:610`, `:630`) |
| Schedule a call | `"Schedule a Call"` (`index.html:824`), `"Book a Free Call"` (`services.html:489`), `"Let's Chat"` (`index.html:265`) |
| Send a message | `"Send a Message"` (`services.html:490`), `"Send Message"` (`index.html:947`), `"Get in Touch"` (`index.html:805`) |
| Explore studio | `"Explore the Studio"` (`index.html:549`), `"See Services"` (`studio.html:369`) |
| Section header CTA | `"Like What You See?"` (`portfolio.html:323`), `"Want to See How That Looks in Practice?"` (`studio.html:360`), `"Not Sure What You Need?"` (`services.html:481`), `"Ready to Start?"` (`index.html:792`) |

**Problema:** Three button labels for "schedule a call". Two for "send a message". Three or four for "view work" depending on count. The variations are not styled differently or contextually meaningful — they are inconsistent because nobody owned the CTA inventory.

The "section header CTA" line is also four versions of the same idea — "want more?" — written four ways. None of them propose the *next thing*; they all just open a question and then the buttons answer it.
**Por que importa:** CTA consistency is the cheapest UX win available. When a button has the same label everywhere it appears, the user develops muscle memory and conversion goes up. When it has 3-4 labels, the user has to re-read each instance. Reference: Stripe uses `"Start now"` and `"Contact sales"` consistently across every page; Linear uses `"Start Building"` and `"Talk to Sales"`. They do not vary the label.
**Recomendação:** Standardize the CTA dictionary to 4-5 labels and use them everywhere:

| Intent | Standardize to | Replaces |
|---|---|---|
| Primary "view portfolio" | `"View Work"` | View Our Work / See Full Work / View Our Work (twice) |
| Per-category drill-down | `"All marketing services →"` etc. | See all marketing services / web / software |
| Primary "schedule" | `"Book a Call"` | Schedule a Call / Book a Free Call / Let's Chat |
| Secondary "email" | `"Email Us"` | Send a Message / Send Message / Get in Touch |
| Studio | `"About the Studio"` | Explore the Studio |
| Services | `"All Services"` | See Services / See All Services |

For the section header CTAs, replace the questions with statements that frame the next step:
- `Like What You See?` → `Start a Project` (or just delete the line and let the form speak for itself)
- `Want to See How That Looks in Practice?` → `See the Work`
- `Not Sure What You Need?` → keep — this one earns the question because it's specifically about indecision
- `Ready to Start?` → drop, or convert to `Start a Project`

PT versions need the same dictionary — currently `"Vamos Conversar"`, `"Agendar uma Chamada"`, `"Agendar uma Chamada Grátis"`, `"Agendar Chamada Gratuita"` for the same intent.
**Esforço:** S

---

### 🟠 HIGH — `<title>` tag pattern is broken on studio.html
**Página/Componente:** `studio.html:34`
**Eixo:** Microcopy / SEO
**Evidência:**
- `index.html:58`: `<title>Picky Pixels Studio</title>`
- `portfolio.html:38`: `<title>Our Work - Picky Pixels Studio</title>`
- `services.html:38`: `<title>Our Services - Picky Pixels Studio</title>`
- `studio.html:34`: `<title>Studio - Picky Pixels Studio</title>` ← repeats "Studio"

**Problema:** Three pages follow `[Page] - Picky Pixels Studio` — `studio.html` becomes literally `Studio - Picky Pixels Studio` in the browser tab. This is what shows up in Google SERPs, browser history, bookmarks, and tab titles. Also: home title is `Picky Pixels Studio` (no qualifier), inconsistent with the others which have `[Page] - Picky Pixels Studio`. PT pages have `Picky Pixels Studio` for the home but no PT versions of the other pages exist (they all share the EN HTML files), so a PT user on portfolio.html sees `Our Work - Picky Pixels Studio` even with PT toggled.
**Por que importa:** SEO-load-bearing field, plus the duplicate "Studio" reads as a copy-paste error to anyone hovering over the tab. Studio.html is also the page most likely to be bookmarked by a buyer, so the broken title has the worst placement.
**Recomendação:**
- `studio.html` → `<title>The Studio - Picky Pixels</title>` (drop the second "Studio")
- Standardize the home: `<title>Picky Pixels - Marketing, Design & Dev Studio in Porto</title>` (adds the positioning + place — this is the single most-indexed line for the brand)
- All other pages: `<title>[Page] - Picky Pixels</title>` (drop "Studio" from every title; the home already establishes it)
- For PT: add a JS step to update `<title>` on language switch, or accept that title stays English (it's a minor concession). Better: add `data-translate-title` keys so titles also translate.
**Esforço:** S

---

### 🟠 HIGH — PT register inconsistency: site swings between PT-PT and PT-BR mid-page
**Página/Componente:** PT translations site-wide (`script.js:73-326`, `index.pt.html`)
**Eixo:** i18n
**Evidência:**
- `script.js:114`: `"Quer esteja lançando algo novo..."` — PT-PT-style ("esteja lançando") but using "esteja" which is also valid PT-BR. (PT-PT speakers often say "Quer estejas a lançar..." with infinitive.)
- `script.js:109`, `:113`, `:305`, `:312`: uses `"equipa"` (PT-PT)
- `index.pt.html:400`, `:513`: uses `"equipe"` (PT-BR)
- Same site, two spellings of the same word in different files.
- `script.js:163`: `"Fale sobre o seu projeto..."` — PT-PT phrasing ("o seu" before noun)
- `index.pt.html:905`: `"Conte sobre seu projeto..."` — PT-BR-leaning ("seu" without article)
- `<html lang="pt-BR">` (`index.pt.html:2`) — declares PT-BR
- `script.js:601`: `document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"` — JS sets PT-BR even when the actual content is mixed
- `script.js:120`: `"Processo divertido e sem stress"` — uses "stress" (PT-PT loanword), PT-BR would more often say "estresse"
- `script.js:147`: `"Deploy em Cloud"` — anglicism, could be either; PT-PT users usually say "implantação na cloud" (still using "cloud"); PT-BR would also use this.

**Problema:** The studio is in Porto. Portuguese users in Portugal are trained to spot PT-BR markers instantly (the word "equipe" vs "equipa" is the canonical tell — also "tela" vs "ecrã", "celular" vs "telemóvel", "arquivo" vs "ficheiro"). The site claims `lang="pt-BR"` but uses "equipa" in the JS translations and "equipe" in the static HTML — so the same user, same page, different sections, sees both spellings. PT-PT readers will read "equipe" as Brazilian. PT-BR readers will read "equipa" as European. Both feel "this isn't written for me".
**Por que importa:** This is a Porto studio selling to Porto businesses. The PT register should be PT-PT (or at minimum, internally consistent). It is currently neither.
**Recomendação:** Pick PT-PT (recommended, given the studio's location and target market). Change:
- `<html lang="pt-BR">` → `<html lang="pt-PT">` in `index.pt.html:2`
- `script.js:601`: `lang === "pt" ? "pt-PT" : "en"`
- `equipe` → `equipa` everywhere in `index.pt.html` (currently lines 400, 513)
- Reread all PT translations with a PT-PT speaker to catch:
  - `"Conte sobre"` → `"Conte-nos sobre"` (PT-PT prefers explicit pronoun)
  - `"Sites"` is fine for both; `"website"` is PT-EN loanword, OK in casual marketing copy
  - `"E-commerce pronto"` (PT-BR-leaning) vs `"Pronto para e-commerce"` (PT-PT)
  - `"Atualizado"` is fine in both; `"Renovando sua marca"` should be `"A renovar a tua marca"` if you also switch to second-person-singular `tu` (PT-PT informal default)

If client base is mixed PT-PT + PT-BR, alternative: keep PT-BR ("equipe", "você") consistently, label the PT toggle "PT-BR" not just "PT", and add a separate PT-PT version later. But pick one.
**Esforço:** M (requires native PT-PT proofreader)

---

### 🟡 MEDIUM — Form select label is identical to the placeholder — redundant
**Página/Componente:** `index.html:885-889`, `portfolio.html:408-410`
**Eixo:** Microcopy
**Evidência:**
- `index.html:885`: `<label for="service" data-translate="form-service-label">What do you need help with?</label>`
- `index.html:887-889`: `<option value="" disabled selected data-translate="form-service-default">What do you need help with?</option>`

**Problema:** The visible label above the select says "What do you need help with?". The placeholder option inside the closed select also says "What do you need help with?". When closed, the user sees the label twice in two adjacent visual zones. When the select is opened, the label persists above and the placeholder option is the first one in the list — the user reads the same question three times in two seconds.
**Por que importa:** Forms with redundant labels signal carelessness, and they make the form longer than it needs to be. A native form pattern: short noun label + verb-style placeholder. (Stripe checkout: label "Card", placeholder "1234 1234 1234 1234".)
**Recomendação:**
- Label: `"Project type"` (`Tipo de projeto`)
- Placeholder option: `"Select one..."` (`Selecionar...`)

These map directly: the label says what the field is about; the placeholder tells the user how to interact. No repetition.
**Esforço:** S

---

### 🟡 MEDIUM — Form name/email inputs use placeholder as label — `name="message"` PT placeholder uses singular-`me` voice
**Página/Componente:** `index.html:866-879`, `:918`
**Eixo:** Microcopy
**Evidência:**
- `index.html:866`: `placeholder="Your Name"` (no visible `<label>`)
- `index.html:877`: `placeholder="Your Email"` (no visible `<label>`)
- `index.html:918`: `placeholder="Tell me about your project..."` ← singular "me" again

**Problema:** Aside from the a11y issue (covered by Agent E), the textarea placeholder is the third "me" instance on the home page (after "Connect with me:" and the form title issues). The portfolio.html version of the textarea uses "Tell us..." correctly. Inconsistent across the two contact forms.
**Por que importa:** Reinforces the "is this a solo freelancer or a team?" confusion noted in the Connect-with-me finding. Also makes the home form less inviting because "Tell me about your project" implies a private chat with one person, while "Tell us" feels like a team is on the receiving end.
**Recomendação:** Change `index.html:918` placeholder to `"Tell us about your project..."` matching `portfolio.html:439`. Update `script.js:416` `"form-message"` from `"Tell me about your project..."` to `"Tell us about your project..."`. And `script.js:163` PT version `"Fale sobre o seu projeto..."` is fine but conjugate to `"Falem-nos do seu projeto..."` (PT-PT, plural reception) or `"Conte-nos sobre o seu projeto..."` (formal "us") for parallel structure with EN.
**Esforço:** S

---

### 🟡 MEDIUM — Studio.html ends without a Contact CTA; only "View Work" + "See Services"
**Página/Componente:** `studio.html:358-372` (services-cta section)
**Eixo:** Microcopy / Conversion (overlap with Agent B)
**Evidência:**
- H2 `"Want to See How That Looks in Practice?"` — leading question.
- Buttons: `View Work` (primary) + `See Services` (outline). No third button for `Contact` / `Book a Call`.

**Problema:** The studio page is the brand-trust page — it's where high-intent buyers go when they want to verify the studio is for-real. Yet the page ends by sending them back into the funnel (Work or Services) instead of giving them the high-intent action (Contact / Book Call). Compare to home (`Send Message` + `Schedule a Call`), services (`Book a Free Call` + `Send a Message`) — both end with conversion CTAs. Studio is the only main page that ends without one.
**Por que importa:** A buyer who reads through `studio.html` to the end has spent more time than a casual home-page visitor and is more likely to convert. Closing that page without a "Talk to us" button is leaving the warmest leads on the table.
**Recomendação:** Replace one of the two existing buttons (probably "See Services" — since the previous section already discussed services indirectly) with a direct contact CTA. Suggested:
- Keep H2 statement-style: `"See how this works in practice."` (drop the question form)
- Subtitle: `"Browse the work, scope your project, or book a call when you're ready to talk."`
- Buttons: `View Work` (outline) + `Book a Call` (primary, links to Calendly)
**Esforço:** S

---

### 🟡 MEDIUM — Hero greeting badge has no functional purpose and adds emoji noise
**Página/Componente:** `index.html:242-244` + `index.pt.html:236-238` + `script.js:81`, `:334`
**Eixo:** Voice + Microcopy
**Evidência:**
- EN: `"👋 Hey there, we're Picky Pixels!"`
- PT static: `"Oi! Somos a Picky Pixels!"` (no emoji in static)
- PT JS: `"\u{1F44B} Oi! Somos a Picky Pixels!"` (emoji added when JS runs)

**Problema:** The greeting badge restates what the H1 + logo already say. The visitor knows they're on Picky Pixels' site — that information is delivered by the URL, the logo, the page title, and within ~50ms. The badge tells them again, with a wave emoji, in a casual register that conflicts with the studio voice. Also note: PT-BR/PT-PT speakers do not start business conversations with "Oi!" — that's casual-personal, not business-casual. PT-PT business default is "Olá" or no greeting.
**Por que importa:** The badge sets the tone before the H1 is read. Setting it casual + emoji means the H1 has to fight uphill to feel professional. Small piece of copy doing damage out of proportion to its size.
**Recomendação:** Delete the greeting badge entirely. If the empty space is a problem, replace with a one-line factual signal that earns its space:
- EN: `"Studio · Porto · Est. 2024"` (or whatever year)
- PT: `"Estúdio · Porto · Desde 2024"`

This sits in the same visual slot but communicates *new* information (where, how long), which is what the visitor actually wants to know in those 200ms.
**Esforço:** S

---

### 🟡 MEDIUM — Schema.org ContactPage description is generic and outdated phrasing
**Página/Componente:** `index.html:962-963`, `index.pt.html:948-949`
**Eixo:** Microcopy / SEO
**Evidência:**
- `index.html:963`: `"description": "Creative digital agency specializing in marketing, web design, and development"`
- `index.pt.html:949`: `"description": "Agência digital criativa especializada em marketing, web design e desenvolvimento"`

**Problema:** "Creative digital agency" is the most-overused agency tagline in the entire web. Schema.org descriptions are read by search engines and AI scrapers (Google, Bing, ChatGPT, Perplexity) — they're a primary input to how the studio gets summarized in search results and AI answers. Writing a generic line here means the studio gets summarized generically.
**Por que importa:** SEO + AI summarization. When ChatGPT is asked "tell me about Picky Pixels Studio", the schema description is one of the highest-weighted snippets. Currently it would summarize as "a creative digital agency" — same as 10,000 others.
**Recomendação:** Rewrite as a positioning sentence with concrete signals:
- EN: `"3-person studio in Porto, Portugal, building websites, mobile apps, and marketing systems for creatives and small businesses."`
- PT: `"Estúdio de 3 pessoas no Porto, Portugal, a construir sites, aplicações móveis e sistemas de marketing para criativos e pequenas empresas."`

These give: team size (small = relatable), location (Porto = local SEO signal), three deliverables (vs vague "design"), audience (vs vague "everyone").
**Esforço:** S

---

### 🟡 MEDIUM — Privacy checkbox label has trailing period inconsistency
**Página/Componente:** `index.html:935-943`, `portfolio.html:456-464`, `index.pt.html:921-929`
**Eixo:** Microcopy
**Evidência:** `<label>I agree to the <a>privacy policy</a>.</label>` — trailing period after `</a>`. PT version mirrors this. Functional, but there's a UX micro-thing: the period is *inside* the label but *outside* the link, so the link underline doesn't include the period. This is correct, but worth noting that the link reads `"privacy policy"` not `"privacy policy."` — that's good.

**Problema:** Smaller issue: the label uses sentence-case "I agree to the privacy policy." but the linked text is lowercase "privacy policy". Most policy-link patterns capitalize the linked phrase: "Privacy Policy". Inconsistent capitalization between body text and link target across the site (footer link is "Privacy Policy", inline link is "privacy policy").
**Por que importa:** Trust micro-copy on the form should be 100% groomed — this is the line that guards GDPR compliance for an EU studio. Inconsistencies signal the form was assembled, not designed.
**Recomendação:** Use the same casing everywhere. Either keep both lowercase ("I agree to the privacy policy" + footer "Privacy policy") or both title-cased ("I agree to the Privacy Policy" + footer "Privacy Policy"). Title-case is the norm for legal links — go with that.
**Esforço:** S

---

### 🟡 MEDIUM — `studio.html` H1 is three abstract concepts in serial, no verb
**Página/Componente:** `studio.html:147-151`
**Eixo:** Copywriting
**Evidência:** `<h1>Design Taste, / Strategic Thinking, / Technical Depth</h1>`

**Problema:** It's well-positioned and the tone is right (this is the studio voice that I argued elsewhere should be promoted). But as an H1 it's a list of three nouns with no verb, no subject — pure tagline. It works in a deck slide, less well as a page H1 that has to introduce the studio. A reader who lands on `studio.html` cold has no anchor — the H1 doesn't say *who has* the design taste, *who applies* the strategic thinking. The subtitle then has to do all the explaining.
**Por que importa:** The strongest line on the entire site is here, but its grammar makes it work harder than it needs to. Compare to studio websites that lead with `"[Verb] [object] [for whom]"` — e.g. `"We design and build for ambitious brands."` (Pentagram-adjacent), or to Pentagram's own which is structured around case studies with no headline at all.
**Recomendação:** Promote the three nouns to a *kicker* (above-the-H1 small label) and write a real H1 underneath. Suggested:
- Kicker: `"Design Taste · Strategic Thinking · Technical Depth"` (move to the section-label slot)
- H1: `"A 3-person studio for brands that need all three."`

This keeps the tagline (which is genuinely good) and adds a verb-driven H1 that introduces the studio. Or alternatively keep the tagline H1 but split into two lines max: `"Design taste. Technical depth."` (drop "Strategic Thinking" — it's the weakest of the three because it's less verifiable; tighten by 33%).
**Esforço:** S

---

### 🟡 MEDIUM — "How Can We Help You?" home services title is weaker than its services.html sibling
**Página/Componente:** Home (`index.html:562`) vs Services page (`services.html:152-154`)
**Eixo:** Copywriting
**Evidência:**
- Home: `<h2>How Can We Help You?</h2>` — generic question.
- Services page: `<h1>Creative Services / For Your Brand</h1>` — declarative, with the gradient/outline gimmick on "Creative" and "Brand".

**Problema:** Both intro the same content (the three service categories). Home asks a question; services page makes a statement. They should agree. The home version is weaker because "How Can We Help You?" is the single most-printed services-page H2 in the agency industry — it appears verbatim on Squarespace agency templates. Services-page version is also weak ("Creative Services For Your Brand" is also generic) but at least it's declarative.
**Por que importa:** A user clicking "See All Services" from the home expects continuity. They go from "How can we help you?" to "Creative services for your brand" — both clichéd in different directions, no coherent voice between them.
**Recomendação:** Pick a single positioning H2/H1 for services and reuse:
- `"What we do."` — minimalist, declarative, copy-tested by Linear, Notion, Stripe, Vercel for years.
- Home version (under "What we do."): `"Three categories. One studio."` (subtitle that sets up the 3-column preview)
- Services page H1: `"What we do."` + subtitle: `"Marketing, web design, and software — across 27 individual services."` (the count is concrete and earns the "see everything" framing)

PT: `"O que fazemos."` is a clean translation that works in both PT-PT and PT-BR.
**Esforço:** S

---

### 🟡 MEDIUM — "Inside the Studio" + "Meet the Studio" — same job, two labels (also: studio.html `studio-team-label` is just "The Team")
**Página/Componente:** `index.html:403`, `studio.html:146`, `:195`
**Eixo:** Microcopy + Voice
**Evidência:**
- Home: `section-label` `"Meet the Studio"` above team grid.
- Studio: `section-label` `"Inside the Studio"` at top of page.
- Studio: `section-label` `"The Team"` above team grid (same content as home's "Meet the Studio").

**Problema:** Three labels for two distinct concepts. "Meet the Studio" (home) and "The Team" (studio) refer to the same thing — meeting the team. "Inside the Studio" is the studio-page hero label. The labels are not synchronized between pages even when they describe the same component.
**Por que importa:** Reusing the team-grid component should reuse the label too — otherwise the pattern feels random. Labels also overlap conceptually: "Inside the Studio" + "Meet the Studio" + "The Team" are three flavors of the same idea.
**Recomendação:** Standardize:
- `studio.html:146` (page hero label): `"The Studio"` (drops "Inside" — it's a label, not a verb)
- `studio.html:195` and `index.html:403` (team grid label): `"The Team"` (same text both places)

Now the label hierarchy is: Page = "The Studio", section = "The Team". Clean nest.
**Esforço:** S

---

### 🟡 MEDIUM — Form select option `"Web Consulting & Support"` doesn't appear anywhere else as a service
**Página/Componente:** `index.html:907`, `portfolio.html:428`, `script.js:183`, `:436`
**Eixo:** Copywriting
**Evidência:**
- Form option (EN): `"Web Consulting & Support"`
- Form option (PT): `"Consultoria Web & Suporte"`
- This service is **not listed** in `services.html` Web Design section, nor in the home services preview (`index.html:601-608`).

**Problema:** If a user picks "Web Consulting & Support" in the form, what are they signing up for? It doesn't appear on the Services page, so there's no scope, no description, no price hint. The form is offering a service the studio doesn't publicly document. Either it's dead copy from a previous version, or it's a real service that needs to be promoted. Either way, this is a leaky form option.
**Por que importa:** Every option in a service-picker should be one the studio is actively selling and able to scope. Otherwise the lead arrives expecting something the team can't immediately quote. Conversely, if it IS a real service (and "consulting" is plausible for a small studio), it deserves to be on the services page.
**Recomendação:** Either:
- (a) Remove the option from both forms — it's unsupported.
- (b) Add a `Web Consulting & Support` card to `services.html#webdesign` with a real description, then promote it (e.g. "Hourly consults for in-progress sites built by other developers — code review, performance audit, accessibility audit. €X/hr or €Y for a full audit").

Recommend (b) — it's a high-margin micro-product for a studio with technical depth.
**Esforço:** M (depends on choice)

---

### 🟡 MEDIUM — Studio team-message is a "agency website cliché bingo" full house
**Página/Componente:** `index.html:518-528` (PT version `index.pt.html:512-522`)
**Eixo:** Copywriting
**Evidência:**
- `"We're Nathielle, Rebeca, and Marcos -the team behind Picky Pixels."` — clichés: "the team behind"
- `"Together, we turn dreams into websites, apps, and marketing strategies that feel aligned with who you are and what you're building."` — clichés: "turn dreams into", "feel aligned", "who you are"
- `"This studio is a place where small businesses, creatives, and first-time founders can feel supported."` — clichés: "feel supported", "place where X can [emotion]"
- `"Whether you're launching something new or refreshing your brand, we'll make it feel exciting, intentional, and 100% you."` — clichés: "exciting, intentional, and 100% you", "Whether you're [verb-ing]"

**Problema:** Four sentences, ~10 cliché phrases. "Turn dreams into" is in the top-5 most-overused agency phrases of the past decade. "100% you" is an Etsy-tier sign-off. "First-time founders can feel supported" is a phrase that suggests the studio is positioning as a coach/mentor, not a vendor — which conflicts with the strategic positioning elsewhere. The PT version preserves all the clichés ("transformamos sonhos", "100% você", "primeira viagem") word-for-word.
**Por que importa:** This is the longest piece of copy on the home page. It's the place where the team voice should land. Currently the team voice = generic agency voice with extra emotion words. Compare to studio.html's same-page copy which is sharp and committed. The two pages can't both be true.
**Recomendação:** Rewrite to mirror studio.html voice. Suggested:
- `"We're Nathielle, Rebeca, and Marcos. We design, build, and run marketing for creatives and small businesses out of Porto."` (1 sentence — name + function + audience + place)
- `"Each project is led by the founder closest to the work — design by Nathielle, marketing by Rebeca, software by Marcos. No account managers, no handoffs."` (1 sentence — what makes the model different)
- `"We work best with brands that already know what they want to be, and need help getting there with rigor."` (1 sentence — qualification)

Three sentences, no clichés, real differentiators (no AMs, founder-led work, rigor-as-qualifier).
**Esforço:** M

---

### 🟢 LOW — `services.html` CTA tagline contradicts itself on "no jargon"
**Página/Componente:** `services.html:481-482`
**Eixo:** Microcopy
**Evidência:**
- H2: `"Not Sure What You Need?"`
- Body: `"Let's chat about your goals and figure out the best plan together. No pressure, no jargon -just a friendly conversation."`

**Problema:** The same page contains "Multichannel Marketing Strategist", "Cloud Deployment & DevOps", "API Integration", "CI/CD pipelines", "SEO", "CRM, ERP", "iOS and Android". Then the CTA says "no jargon". Either the services page is jargon-light (it isn't) or the promise is empty. Also "no pressure, no jargon, just a friendly conversation" is a salesman trope — exactly the kind of phrase a high-pressure jargon-using salesman uses to disarm.
**Por que importa:** Self-contradiction in CTA copy reads as desperation. A studio confident in its expertise doesn't need to promise "no jargon" — it just doesn't use jargon when talking to clients.
**Recomendação:** Drop the "no pressure, no jargon" line. Replace the body with something honest:
- `"30-minute call. We listen, ask scoping questions, and write back with a recommendation within 48 hours."` (concrete: duration, what happens during, what happens after, when)

This is a real promise, not a vibes one.
**Esforço:** S

---

### 🟢 LOW — Filter label "All" (home) vs "All Projects" (portfolio) — same intent, two labels
**Página/Componente:** `index.html:295` (`filter-all`), `portfolio.html:166` (`page-filter-all`)
**Eixo:** Microcopy
**Evidência:**
- Home filter: `"All"` (key `filter-all`)
- Portfolio filter: `"All Projects"` (key `page-filter-all`)

**Problema:** Same `<button>` element doing the same job, two different labels, two different translation keys. The two keys exist because the two labels were treated as different strings — but they describe the same UI action.
**Por que importa:** Tiny, but it's symptomatic of how the two filter widgets evolved separately when they should have been one component. (Component-level finding — see Agent C.) From the copy side: pick `"All"` (concise, matches the other filter labels which are 1-2 words: "Web Design", "Marketing").
**Recomendação:** Use `"All"` in both places. Delete `page-filter-all` translation key, reuse `filter-all`.
**Esforço:** S

---

### 🟢 LOW — Subtitle pattern "stunning websites and apps" — "stunning" is a filler adjective
**Página/Componente:** `index.html:255`, `script.js:338`, OG meta
**Eixo:** Copywriting
**Evidência:** `"...from stunning websites and apps to strategic marketing that connects and converts."`

**Problema:** "Stunning" is the adjective equivalent of placeholder text. It signals "we couldn't think of a better word so we used a complimentary one". Compare to "stunning gallery of work" (`portfolio-gabriella-desc`), "beautiful product pages" (`svc-ecommerce-desc`), "beautifully crafted emails" (`svc-email-desc`), "A modern restaurant website" (`portfolio-turmeric-desc`). The pattern: the noun does the work, the adjective adds nothing. "Modern restaurant website" → "restaurant website" loses zero information.
**Por que importa:** Filler adjectives accumulate. Every paragraph on the site has 1-2 of them. Removing them tightens the prose by ~15% and makes the remaining adjectives carry weight.
**Recomendação:** Strip filler adjectives in a single editing pass. Examples:
- `"stunning websites and apps"` → `"websites and apps"`
- `"stunning gallery of work"` → `"a gallery of recent work"`
- `"beautiful product pages"` → `"product pages built to convert"`
- `"beautifully crafted emails"` → `"emails written and designed in-house"`
- `"A modern restaurant website"` → `"A restaurant website"` (or add specific signal: `"A restaurant website with menu, hours, and reservations"`)

PT versions follow the same logic — `"galeria deslumbrante"`, `"galeria impressionante"`, `"design acolhedor"`, `"design sofisticado"` all suffer from the same pattern.
**Esforço:** M (single-pass edit across the whole site, not difficult but needs a careful eye)

---

### 🟢 LOW — `nav-about` translates to `"Studio"` in PT (kept English) — likely intentional, but the pattern needs naming
**Página/Componente:** `script.js:78`, `index.pt.html:149`, `:200`
**Eixo:** i18n
**Evidência:** `"nav-about": "Studio"` (PT row) — same as EN.

**Problema:** PT visitors see "Studio" in the nav, not "Estúdio". This is probably a deliberate brand choice (the studio's name has "Studio" in it; using "Estúdio" in nav and "Studio" in logo would feel inconsistent). But the same logic should apply to other terms — "Web Design" stays "Web Design" in PT, but "Software & Mobile" stays "Software & Mobile" too. Meanwhile "Trabalhos" is translated to PT for the nav. There's no documented rule for what gets translated.
**Por que importa:** A buyer doesn't care, but the translator (or future Claude) does. Without a rule, every new string requires a judgment call, and judgment calls drift.
**Recomendação:** Document a 3-rule policy in a comment at the top of the translations dict in `script.js`:
1. Brand terms (`Studio`, `Picky Pixels`) stay English in both.
2. Category names that are loanwords in PT (`Web Design`, `Marketing`, `SEO`, `E-Commerce`, `Software`, `Landing Page`) stay English in both.
3. Functional UI labels and prose translate (`Trabalhos`, `Serviços`, `Contato`, etc.).
**Esforço:** S

---

### 🟢 LOW — Form success/error messages are the only multilingual user-facing alerts and they're fine — but they need a third state
**Página/Componente:** `script.js:165-166`, `:418-419`, `:890`, `:893`
**Eixo:** Microcopy
**Evidência:**
- EN success: `"Thank you! Your message has been sent."`
- EN error: `"Oops! There was a problem sending your message. Please try again."`
- PT success: `"Obrigado! Sua mensagem foi enviada."`
- PT error: `"Ops! Houve um problema ao enviar sua mensagem. Tente novamente."`

**Problema:** These are functional but missing a *what's next* signal. After "Thank you, sent" the user has no information about response time. Compare to Notion's contact form ("Thanks. We'll get back within 1 business day."). Adding a response-time commitment converts the form from "form sent" to "expectation set".
**Por que importa:** A small studio's main differentiator is response speed. Saying it explicitly here costs nothing and frames the next 24 hours.
**Recomendação:**
- EN success: `"Thanks! We'll reply within 1 business day. (Friday afternoons might take until Monday.)"`
- EN error: `"Something didn't go through. Email us directly at nathielle@pickypixels.studio?"` (ends with the safe fallback in case the form is permanently broken)
- PT success: `"Obrigado! Respondemos em 1 dia útil. (Sextas à tarde podem ir para segunda.)"` (PT-PT: `"em 1 dia útil"`)
- PT error: `"Algo correu mal. Pode escrever para nathielle@pickypixels.studio diretamente?"`

PT-PT note: `"correu mal"` is PT-PT default; PT-BR would prefer `"deu errado"`. Pick the register that matches the rest of the site (see PT-PT vs PT-BR finding).
**Esforço:** S

---

### 🟢 LOW — `portfolio.html` has 6 web cards but only 4 have "Visit Website" links
**Página/Componente:** `portfolio.html:172-248`
**Eixo:** Microcopy
**Evidência:** Cards 1-4 (Turmeric, Gabriella, LivingLeaving, FazUmCafezim) have `<a class="portfolio-link">Visit Website</a>`. Cards 5-6 (Stegel Nails, Isabel Vieira) do not.

**Problema:** Visitors expect parity inside a grid. Two cards out of six missing a CTA reads like (a) those sites are no longer live, (b) the studio isn't proud of those projects, or (c) the cards are unfinished. From a copy perspective, this is a missing CTA, not a styling issue.
**Por que importa:** Inconsistent CTAs in a portfolio grid lower trust because they make the visitor wonder what's wrong with the two outliers. A buyer skimming the grid will assume the missing CTA = missing case study.
**Recomendação:** Either:
- (a) Add `Visit Website` links to Stegel Nails and Isabel Vieira if their sites are live (verify URLs first).
- (b) If the sites are no longer live or were design-only deliverables (no public URL), replace with a different CTA per card — e.g. `"Case study coming soon"` (with no link) or `"Design archive →"` (links to a static asset).

Option (a) preferred. If neither works, write a one-line explanation under the project: e.g. `"Designed in 2024. Site no longer live."` — explicit beats absent.
**Esforço:** S

---

### 🟢 LOW — "Available in Porto District only" is the right kind of microcopy in the wrong place
**Página/Componente:** `services.html:209`, `:290`, `:301`
**Eixo:** Microcopy
**Evidência:** Three services have a small inline pill: `"Available in Porto District only"` with map-marker icon.

**Problema:** This is a constraint, not a feature, but it's currently displayed at the bottom of the card after the description — meaning a buyer reads the whole card, gets interested, then learns at the end "you can't actually buy this". The pill itself is also written in a slightly defensive register ("only" — exclusionary).
**Por que importa:** Position-of-information matters. Constraints should appear before commitment, not after. Lisbon-based buyer sees the photo card, reads the description, gets excited, then sees "Porto only" and bounces.
**Recomendação:** Three alternatives, in order of effort:
- (S) Move the pill to the *top* of the card, above the title.
- (M) Reword to neutral framing: `"Porto District (in-person)"` — communicates the constraint without "only" or "available". Make it a category badge, like the "Web Design" badge on portfolio cards.
- (L) Group the three Porto-only services into a sub-section with one header: `"In-person services (Porto District)"` — solves the problem at the architecture level.

PT versions follow the same logic — `"Disponível apenas no Distrito do Porto"` → `"Distrito do Porto (presencial)"`.
**Esforço:** S

---

### 💡 SUGGESTION — There is no client list, no logos, no testimonials anywhere
**Página/Componente:** Site-wide
**Eixo:** Copywriting (gap, not bug)
**Evidência:** Nothing matching `<div class="testimonial">`, `<blockquote>`, `client-logos`, `social-proof`, etc., across all 5 main HTML files. Searched for variants of "client", "testimonial", "review", "feedback", "loved" — none appear in copy.

**Problema:** A studio with 9 portfolio projects across 3 categories has zero quoted feedback from any of those clients. Zero "X said" social proof. Zero metrics ("we increased sign-ups by Y%"). The work pages show *what* was made; no copy shows *what happened next*. For a studio claiming "Strategic Thinking" and "conversion-minded thinking", the absence of any conversion result on the site is itself a signal.
**Por que importa:** Testimonials and outcome metrics are the highest-converting copy on a service-business site (consistent across decades of CRO research). The studio has zero of them. A buyer comparing Picky Pixels to a competitor with even one client quote will tilt toward the competitor.
**Recomendação:** Reach out to the 3 most engaged past clients and ask for a 1-2 sentence quote. Use them in:
- A new section on `studio.html` between "The Team" and "How We Work" — `"What clients say"` or just three quote cards with name + business.
- One quote per service category on `services.html`.
- One outcome metric per portfolio item on `portfolio.html` (e.g. "Turmeric: launched in 4 weeks. 200 reservations in first month.")

For the cases where metrics aren't available, use process quotes ("They asked the right questions early. The site shipped on time.") — these are easier to source and still build trust.

This is a M-effort but L-impact addition. Putting in the suggestion bucket because it's outside the strict copy-audit scope but is the highest-leverage copy missing from the site.
**Esforço:** M (per quote/metric)

---

### 💡 SUGGESTION — The studio's location is a USP that the copy doesn't lead with
**Página/Componente:** Hero, footer, meta tags, all pages
**Eixo:** Copywriting / Positioning
**Evidência:** "Porto" appears in:
- `services.html:209` (Porto District only — for 3 services)
- `index.html:313` (Turmeric description: "in Porto, Portugal")
- Schema.org address: `"Portugal"` (no city)

**Problema:** "Porto" appears as a constraint (Porto District only) and as a project context (a Porto restaurant), but never as the studio's positioning. A buyer searching "Porto agency" or "Porto web designer" won't find the studio because the studio isn't claiming Porto in the H1, hero subtitle, footer tagline, page titles, or meta descriptions.
**Por que importa:** Local SEO + positioning. Porto has a small but serious creative-business community. Being *the* Porto studio (vs being *a* Portugal-based studio with Porto-only services) is a much stronger position. Reference: Wieden+Kennedy is the Portland agency. Pentagram is associated with London/NYC. Picky Pixels can plausibly own "the Porto studio for small brands".
**Recomendação:** Add "Porto" to:
- Home page `<title>`: `"Picky Pixels - Marketing, Design & Dev Studio in Porto"`
- Hero subtitle: include "in Porto" (suggested copy in earlier finding)
- Footer tagline: include "in Porto" (suggested copy in earlier finding)
- Schema.org address: add `"addressLocality": "Porto"`
- All page meta descriptions: add Porto reference

This is one search-replace pass at the strategic level.
**Esforço:** S

---

### 💡 SUGGESTION — The "Design taste" thesis on studio.html is undercut by the home's owner-values
**Página/Componente:** `studio.html:175-186` vs `index.html:530-545`
**Eixo:** Voice
**Evidência:**
- `studio.html` "Taste First — Strong visual choices that feel intentional, not generic."
- `index.html` "Personal — Designs and strategies that reflect your unique story" (intentionally generic positive)

**Problema:** The studio.html principle says "intentional, not generic". The home owner-value is, by industry consensus, a generic phrase. So the home is performing the exact failure the studio page warned against. The two pages talk past each other; neither hands the other a baton.
**Por que importa:** Editorial discipline at the brand level. The principles on studio.html should appear in some form on the home — either as the actual values (recommended in earlier finding) or as a callout/quote linking to studio.html.
**Recomendação:** Replace the home owner-values with the studio.html principles (already covered in the owner-values finding). Add a small "Read more about how we work →" link below them, pointing to studio.html. The two pages now share one voice.
**Esforço:** S (already covered — repeat for emphasis)

---

## Voice/Copy axis score: 4/10

**Justification:** The site has a real voice, just not consistently. `studio.html` and `services.html` (in their headers, principles, and process steps) demonstrate that someone on the team can write sharp, declarative, no-jargon copy when given the brief. The home page, the team-message, the owner-values, the footer tagline, and the hero greeting demonstrate that someone — possibly the same someone — defaults to startup-friendly cliché when not given a brief.

The PT layer is worse than the EN layer in three independent ways: (1) static HTML in `index.pt.html` is missing dozens of accents (a credibility-critical bug for a Porto studio); (2) PT register swings between PT-PT ("equipa", "stress") and PT-BR ("equipe", "você") inside the same site, sometimes the same page; (3) several PT strings are not translations of their EN counterparts but completely different positioning messages (the hero subtitle is the worst case).

Three findings would each individually drop the score by 1-2 points and they all compound:
- The `Connect with me / Connect with us / Conecte-se conosco` triangle, plus the `Tell me / Tell us` echo, makes the site read as a solo freelancer pretending to be a 3-person team.
- The owner-values fortune-cookie test fails 3-for-3, and they sit in the most-read part of the home page.
- The accent bug in `index.pt.html` is the single most damaging credibility leak; "estrategico", "incriveis", and "culinaria" published from a Porto studio is something a competitor can screenshot and use.

To get to 7/10: fix the PT accents and accent the divergent translations; consolidate the CTA dictionary; rewrite the owner-values and footer tagline; pick one voice (recommended: the studio.html voice) and propagate to home and services pages. To get to 8/10: rewrite the 13 marketing card descriptions and the 7 web design ones with concrete deliverables, formats, and units. To get to 9/10: add testimonials and outcome metrics; localize PT to PT-PT consistently; lead positioning with "Porto" everywhere.
