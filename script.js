const companyProjects = {
  // Web Design projects — single image, with a "Visit Website" link
  turmeric: {
    title: "Turmeric Restaurant",
    description: "A Pakistani-Indian restaurant website in Porto, Portugal. Menu showcase, location, and online reservations in a single-page layout.",
    visitUrl: "https://turmeric.restaurant",
    items: [
      { src: "Projects/Portfolio-Web /Turmeric-Pakistani-Indian Restaurant-Porto-Portugal.webp", label: "Homepage" },
    ],
  },
  gabriella: {
    title: "Gabriella Tattoo",
    description: "A professional tattoo artist portfolio with a stunning gallery of work and a clear path for clients to explore styles.",
    visitUrl: "https://www.gabriellatattoo.com",
    items: [
      { src: "Projects/Portfolio-Web /Gabriella-Tattoo.webp", label: "Homepage" },
    ],
  },
  livingleaving: {
    title: "LivingLeaving",
    description: "A sophisticated interior design portfolio with immersive gallery and before-after comparisons.",
    visitUrl: "https://livingleaving.nl",
    items: [
      { src: "Projects/Portfolio-Web /livingleaving.webp", label: "Homepage" },
    ],
  },
  fazumcafezim: {
    title: "FazUmCafezim",
    description: "An artisanal coffee shop website with a warm, inviting design that reflects the brand's commitment to quality.",
    visitUrl: "https://fazumcafezim.com",
    items: [
      { src: "Projects/Portfolio-Web /FazUmCafezim.jpeg", label: "Homepage" },
    ],
  },
  stegel: {
    title: "Stegel Nails",
    description: "A modern, elegant website for a premium nail salon with service listings and online booking integration.",
    visitUrl: "https://stegel.pt",
    items: [
      { src: "Projects/Portfolio-Web /stegel.pt_.webp", label: "Homepage" },
    ],
  },
  isabelvieira: {
    title: "Isabel Vieira",
    description: "A personal brand website for a professional therapist — easy access to services, booking, and valuable resources.",
    visitUrl: "https://isabelvieira.pt",
    items: [
      { src: "Projects/Portfolio-Web /isabelvieira.pt_.webp", label: "Homepage" },
    ],
  },

  // Marketing / Company projects — multi-image carousel
  cynergia: {
    title: "Grupo Cynergia",
    description: "Complete brand identity, web presence, and ongoing social media for an energy consulting company.",
    items: [
      { src: "Projects/Portfolio-Marketing/CYNERGIA.png", label: "Website" },
      {
        src: "Projects/Portfolio-Marketing/Mesa de trabajo 1.png",
        label: "Brand Identity",
      },
      {
        src: "Projects/Portfolio-Marketing/Calendario Cynergia (Energia) - post 1.png",
        label: "Social Media Calendar",
      },
      {
        src: "Projects/Portfolio-Marketing/Simulação.png",
        label: "Credit Simulation Page",
      },
      {
        src: "Projects/Portfolio-Marketing/Contacte-nos.png",
        label: "Contact Page",
      },
      {
        src: "Projects/Portfolio-Marketing/Sobre nós.png",
        label: "About Page",
      },
    ],
  },
  scriptai: {
    title: "Scriptai",
    description: "Social media campaigns, ad creatives, and print materials for an AI business solutions company.",
    items: [
      {
        src: "Projects/Portfolio-Marketing/Neuronex-Anuncio-IA.png",
        label: "Neuronex AI Ad",
      },
      {
        src: "Projects/Portfolio-Marketing/Prancheta 1.png",
        label: "Product Showcase",
      },
      {
        src: "Projects/Portfolio-Marketing/Flyer A3 Soluções v2.png",
        label: "Solutions Flyer",
      },
      {
        src: "Projects/Portfolio-Marketing/Bitrix24-dia-5-v3_01.png",
        label: "Bitrix24 - Social Media",
      },
      {
        src: "Projects/Portfolio-Marketing/Bitrix24-dia-5-v3_02.png",
        label: "Bitrix24 - Campaign",
      },
      {
        src: "Projects/Portfolio-Marketing/Bitrix24-dia-5-v3_03.png",
        label: "Bitrix24 - Feature",
      },
      {
        src: "Projects/Portfolio-Marketing/dia-6.png",
        label: "Social Media Content",
      },
      {
        src: "Projects/Portfolio-Marketing/Mudança de conta - Stories.png",
        label: "Instagram Stories",
      },
    ],
  },
  mmf: {
    title: "Meet My Friends Portugal",
    description: "Event promotion and social media for a Porto-based events and community brand.",
    items: [{ src: "Projects/Portfolio-Marketing/4.png", label: "Event Promotion" }],
  },
};

let currentLang = "en";

const translations = {
  pt: {
    // Nav
    "nav-home": "Início",

    "nav-work": "Trabalhos",
    "nav-services": "Serviços",
    "nav-about": "Sobre",
    "nav-contact": "Contacto",
    // Hero
    "hero-greeting": "\u{1F44B} Oi! Somos a Picky Pixels!",
    "hero-title-1": "Marketing,",
    "hero-title-2": "Design & Dev",
    "hero-title-3": "com Alma",
    "hero-subtitle": "Criamos experiências digitais para marcas criativas que querem mais do que só um site — querem conexão, clareza e presença.",
    "hero-brands-eyebrow": "Marcas que entregámos — 9",
    "hero-brands-cta": "Ver trabalho completo →",
    "cta-work": "Ver Projetos",
    "cta-contact": "Vamos Conversar",
    // Work section
    "trust-eyebrow": "Marcas que entregamos",

    "section-work-label": "Trabalhos Selecionados",
    "section-work-title": "Alguns dos Nossos Projetos Favoritos",
    "section-work-subtitle": "Um vislumbre de alguns dos projetos que criamos — de sites a campanhas de marketing, cada um feito com cuidado para refletir os objetivos dos nossos clientes.",
    "filter-all": "Todos",
    "filter-web": "Web Design",
    "filter-marketing": "Marketing",
    // Portfolio
    "badge-web": "Web Design",
    "badge-marketing": "Marketing",
    "portfolio-turmeric-desc": "Um site moderno de restaurante de culinária paquistanesa e indiana no Porto, Portugal.",
    "portfolio-gabriella-desc": "Um portfólio profissional de tatuadora com galeria impressionante de trabalhos.",
    "portfolio-livingleaving-desc": "Um portfólio sofisticado de design de interiores com galeria imersiva e comparações antes-depois.",
    "portfolio-cynergia-desc": "Identidade de marca completa e presença web para uma empresa de consultoria energética.",
    "portfolio-scriptai-desc": "Campanhas de redes sociais e criativos publicitários para uma empresa de soluções de IA.",
    "portfolio-flyer-desc": "Design de flyer promocional apresentando toda a gama de soluções empresariais.",
    "portfolio-visit": "Visitar Site",
    "portfolio-see-all": "Ver Todos os Trabalhos",
    // About
    "about-label": "Conheça o Studio",
    "about-title": "Uma Prévia de Como Pensamos e Construímos",
    "about-desc": "Picky Pixels combina bom gosto visual, execução técnica e pensamento estratégico. Esta é a equipa por trás das ideias, sistemas e experiências que criamos para marcas ambiciosas.",
    "role-nathielle": "Web Design & Desenvolvimento",
    "role-rebeca": "Estrategista de Marketing Multicanal",
    "role-marcos": "Engenheiro de Software & Dev Mobile",
    "about-cta": "Conhecer a equipa →",
    "principle-taste-title": "Critério visual",
    "principle-taste-desc": "Escolhas visuais fortes que parecem intencionais, não genéricas. O próprio site já deve ser a prova.",
    "principle-systems-title": "Pensamento sistêmico",
    "principle-systems-desc": "Cada página, bloco e interação tem um papel claro. Desenhamos para escalar, não só para lançar.",
    "principle-execution-title": "Qualidade de execução",
    "principle-execution-desc": "Front-end limpo, UX sólida, entrega sustentável. Para a marca crescer sem precisar de nós na sala.",
    "contact-message": "Enviar Mensagem",
    "team-msg-1": "Somos Nathielle, Rebeca e Marcos — a equipa por trás da Picky Pixels. Juntos, transformamos sonhos em sites, apps e estratégias de marketing que refletem quem você é e o que está construindo.",
    "team-msg-2": "Este estúdio é um lugar onde pequenas empresas, criativos e fundadores de primeira viagem podem se sentir apoiados. Quer esteja lançando algo novo ou renovando sua marca, vamos tornar tudo emocionante, intencional e 100% você.",
    "cta-studio": "Explorar o Studio",
    "cta-portfolio": "Ver Nossos Trabalhos",
    // Services
    "services-title": "Como Podemos Ajudar?",
    "services-desc": "Desde construir seu site até desenvolver apps personalizados — oferecemos serviços de marketing, design e desenvolvimento sob medida para criativos e pequenas empresas.",
    "services-cta": "Ver Todos os Serviços",
    "services-cat-marketing": "Marketing",
    "services-cat-web": "Web Design",
    "services-cat-software": "Software & Mobile",
    "svc-social-media": "Gestão de Redes Sociais",
    "svc-graphic-content": "Criação de Conteúdo Gráfico",
    "svc-video": "Criação e Edição de Vídeo",
    "svc-brand-planning": "Planejamento Estratégico de Marca",
    "svc-paid-traffic": "Gestão de Tráfego Pago",
    "svc-email-marketing": "Email Marketing & Newsletters",
    "svc-website-dev": "Desenvolvimento de Sites",
    "svc-landing": "Landing Pages",
    "svc-ecommerce": "E-Commerce",
    "svc-seo": "SEO",
    "svc-maintenance": "Manutenção de Sites",
    "svc-analytics": "Configuração Google Analytics",
    "svc-mobile-app": "Desenvolvimento de Apps Mobile",
    "svc-api": "Integração de API",
    "svc-scheduling": "Sistemas de Agendamento",
    "svc-management": "Sistemas de Gestão",
    "svc-automation": "Automação & Workflows",
    "svc-cloud": "Deploy em Cloud",
    "form-message-label": "Detalhes do projeto",
    "svc-social-title": "Gestão de Redes Sociais",
    "svc-social-desc": "Calendário editorial, produção de conteúdo, agendamento, respostas à comunidade e relatório mensal de desempenho. Uma pessoa cuida do canal de ponta a ponta para a marca manter-se consistente.",
    "svc-content-title": "Produção de Conteúdo",
    "svc-content-desc": "Conteúdo fotográfico, vídeo e gráfico produzido em sessões pontuais ou em batch days mensais que mantêm o feed abastecido durante semanas.",
    "svc-content-detail": "Sessões presenciais disponíveis no Distrito do Porto",
    "svc-acquisition-title": "Aquisição Paga & Email",
    "svc-acquisition-desc": "Campanhas Meta e Google Ads com otimização semanal, e fluxos de email e newsletter que aquecem leads até uma conversa real.",
    "svc-brandvoice-title": "Estratégia de Marca & Copy",
    "svc-brandvoice-desc": "Posicionamento, hierarquia de mensagens, tom de voz e o copy prático que aparece no site, em anúncios e em emails. Inclui consultoria contínua quando precisas de um segundo par de olhos.",
    "svc-website-title": "Sites Personalizados",
    "svc-website-desc": "Sites multi-página e landing pages desenhados em torno da marca e construídos com front-end escrito à mão. De um lançador de uma página a um site rico em conteúdo com CMS.",
    "svc-ecommerce-title": "E-Commerce",
    "svc-ecommerce-desc": "Lojas online da página de produto ao checkout — Shopify, WooCommerce ou personalizado — com as integrações de inventário, envios e pagamento que o teu negócio realmente precisa.",
    "svc-seo-title": "SEO & Analytics",
    "svc-seo-desc": "SEO on-page, dados estruturados, sitemap e Google Analytics 4 configurados desde o primeiro dia. Health checks trimestrais para sites que precisam continuar a ranquear.",
    "svc-maint-title": "Manutenção & Integrações",
    "svc-maint-desc": "Atualizações, patches de segurança, edições de conteúdo, integrações de formulários e widgets de terceiros — o trabalho que mantém um site lançado saudável sem um dev na equipa.",
    "svc-mobile-title": "Apps Mobile",
    "svc-mobile-desc": "Apps iOS e Android construídos com React Native ou stacks nativas — desde um MVP conectado até uma app de produção polida, incluindo a submissão à App Store.",
    "svc-automation-title": "Software à Medida & Automação",
    "svc-automation-desc": "Ferramentas internas, CRMs, ERPs e automações de fluxo que substituem folhas de Excel e cadeias de Zapier por um sistema desenhado para a forma como o negócio funciona.",
    "svc-api-title": "APIs & Integrações",
    "svc-api-desc": "Gateways de pagamento, sistemas de marcações, sincronização CRM, serviços terceiros — mais APIs personalizadas desenhadas e documentadas para clientes que vão ligar outros fornecedores.",
    "svc-infra-title": "Base de Dados & Cloud",
    "svc-infra-desc": "Arquitetura de backend, hosting, pipelines CI/CD e monitorização em AWS ou equivalente. Construído para a carga que tens hoje e a que terás em 18 meses.",
    "svc-see-marketing": "Ver todos os serviços de marketing",
    "svc-see-web": "Ver todos os serviços web",
    "svc-see-software": "Ver todos os serviços de software",
    // Contact
    "contact-label": "Pronto para Começar?",
    "contact-title": "Vamos Criar Algo do Qual Você Se Orgulhe",
    "contact-subtitle": "Conte suas ideias, seus objetivos e sua visão — vamos ajudar a transformar isso em uma experiência digital consistente.",
    "contact-get-in-touch": "Entrar em Contacto",
    "contact-choose": "Escolha sua forma preferida de contato:",
    "contact-schedule": "Agendar Chamada Gratuita",
    "contact-connect": "Conecte-se connosco:",
    "form-name": "Seu Nome",
    "form-email": "Seu Email",
    "form-service-label": "Com o que precisa de ajuda?",
    "chip-marketing": "Marketing",
    "chip-web": "Web",
    "chip-software": "Software & Mobile",
    "chip-not-sure": "Ainda não sei",
    "form-service-default": "Com o que precisa de ajuda?",
    "form-message": "Fale sobre o seu projeto...",
    "form-submit": "Enviar Mensagem",
    "form-success": "Obrigado! Sua mensagem foi enviada.",
    "form-error": "Ops! Houve um problema ao enviar sua mensagem. Tente novamente.",
    "optgroup-marketing": "Marketing",
    "optgroup-web": "Web Design & Desenvolvimento",
    "opt-social-media": "Gestão de Redes Sociais",
    "opt-content-creation": "Criação de Conteúdo Gráfico",
    "opt-video": "Criação e Edição de Vídeo",
    "opt-photography": "Sessões de Fotografia",
    "opt-copywriting": "Copywriting",
    "opt-brand-strategy": "Planejamento Estratégico de Marca",
    "opt-email-marketing": "Email Marketing & Newsletters",
    "opt-paid-traffic": "Gestão de Tráfego Pago",
    "opt-marketing-consultancy": "Consultoria de Marketing",
    "opt-landing-page": "Landing Page",
    "opt-website": "Desenvolvimento de Sites",
    "opt-ecommerce": "E-Commerce",
    "opt-seo": "SEO",
    "opt-maintenance": "Manutenção de Sites",
    "opt-consulting": "Consultoria Web & Suporte",
    "form-privacy": "Eu concordo com a",
    "form-privacy-link": "política de privacidade",
    // Footer
    "footer-desc": "Ajudando pequenas marcas e criativos ousados a se destacarem online com coração, clareza e confiança.",
    "footer-work": "Trabalhos",
    "footer-services": "Serviços",
    "footer-studio": "Sobre",
    "footer-contact": "Contacto",
    // Portfolio page
    "page-work-label": "Trabalhos Selecionados",
    "page-work-title-1": "Trabalhos Com",
    "page-work-title-2": "Orgulho",
    "page-work-title-3": "",
    "page-work-subtitle": "Uma coleção de projetos que construímos com coração — cada um feito para refletir a personalidade e objetivos dos nossos clientes.",
    "page-filter-all": "Todos",
    "page-portfolio-turmeric-desc": "Um site moderno para restaurante de culinária paquistanesa e indiana no Porto, Portugal. Com cardápio, localização e sistema de reservas online.",
    "page-portfolio-gabriella-desc": "Um portfólio profissional de tatuadora com galeria impressionante e forma fácil para clientes explorarem estilos.",
    "page-portfolio-livingleaving-desc": "Um portfólio sofisticado de design de interiores com transformações de espaço, galeria imersiva e comparações antes-depois.",
    "page-portfolio-cafezim-desc": "Um site de cafeteria artesanal com design acolhedor que reflete o compromisso da marca com qualidade.",
    "page-portfolio-stegel-desc": "Um site moderno e elegante para salão de unhas premium com lista de serviços e integração de agendamento online.",
    "page-portfolio-isabel-desc": "Um site de marca pessoal para terapeuta profissional com fácil acesso a serviços, agendamento e recursos valiosos.",
    "company-cynergia-badge": "6 projetos",
    "company-cynergia-desc": "Consultoria energética",
    "company-scriptai-badge": "8 projetos",
    "company-scriptai-desc": "Soluções de IA para negócios",
    "company-mmf-badge": "1 projeto",
    "company-mmf-desc": "Eventos e comunidade",
    "portfolio-empty-msg": "Nenhum projeto encontrado nesta categoria ainda. Volte em breve!",
    "page-contact-title": "Gostou do Que Viu?",
    "page-contact-subtitle": "Vamos criar algo incrível juntos. Conte-nos sobre seu projeto e entraremos em contato.",
    // Services page
    "svc-page-label": "O Que Fazemos",
    "svc-page-title-1": "Serviços",
    "svc-page-title-2": "Criativos",
    "svc-page-title-3": "Para Sua",
    "svc-page-title-4": "Marca",
    "svc-page-subtitle": "Desde construir sua presença online até gerenciar a voz da sua marca em todas as plataformas — temos soluções de marketing, design e web sob medida para seus objetivos.",
    "svc-cat-marketing-title": "Marketing & Redes Sociais",
    "svc-cat-marketing-desc": "Soluções estratégicas de marketing para crescer a presença da sua marca e engajar seu público em todas as plataformas.",
    "svc-social-media-title": "Gestão de Redes Sociais",
    "svc-social-media-desc": "Gerenciamos sua presença nas redes sociais — criando, agendando e otimizando conteúdo para manter seu público engajado e sua marca consistente.",
    "svc-social-media-detail": "Por plataforma, por mês",
    "svc-graphic-title": "Criação de Conteúdo Gráfico",
    "svc-graphic-desc": "Conteúdo visual impactante para suas redes sociais, campanhas e materiais de marca — feito para se destacar e contar sua história.",
    "svc-video-title": "Criação e Edição de Vídeo",
    "svc-video-desc": "Do conceito ao corte final — conteúdo de vídeo envolvente para redes sociais, anúncios e storytelling de marca que captura atenção.",
    "svc-photo-title": "Sessões de Fotografia",
    "svc-photo-desc": "Fotografia profissional para elevar sua marca — fotos de produtos, imagens lifestyle e sessões de criação de conteúdo.",
    "svc-photo-detail": "Disponível apenas no Distrito do Porto",
    "svc-copywriting-title": "Copywriting",
    "svc-copywriting-desc": "Textos envolventes que falam a linguagem da sua marca — de legendas para redes sociais a textos de site que conectam e convertem.",
    "svc-brand-title": "Planejamento Estratégico de Marca",
    "svc-brand-desc": "Defina o posicionamento, mensagem e identidade visual da sua marca com uma estratégia clara que guia cada ponto de contato.",
    "svc-calendar-title": "Calendário Editorial",
    "svc-calendar-desc": "Um plano de conteúdo estruturado alinhado com seus objetivos e datas-chave — para você sempre saber o que postar e quando.",
    "svc-reports-title": "Relatórios Mensais",
    "svc-reports-desc": "Insights claros e acionáveis sobre o desempenho do seu marketing — para você ver o que está funcionando e onde melhorar.",
    "svc-consultancy-title": "Consultoria",
    "svc-consultancy-desc": "Orientação especializada para sua estratégia de marketing e digital — seja uma sessão única ou suporte contínuo.",
    "svc-email-title": "Email Marketing & Newsletters",
    "svc-email-desc": "Alcance seu público diretamente com emails e newsletters cuidadosamente criados que nutrem relacionamentos e impulsionam ação.",
    "svc-paid-title": "Gestão de Tráfego Pago",
    "svc-paid-desc": "Campanhas estratégicas de anúncios em várias plataformas — otimizadas para alcançar o público certo e maximizar seu retorno sobre investimento.",
    "svc-batch-title": "Produção de Conteúdo em Lote",
    "svc-batch-desc": "Sessões eficientes de criação de conteúdo em grande volume — fotos, vídeos e gráficos produzidos em lotes para manter seu feed abastecido.",
    "svc-batch-detail": "Disponível apenas no Distrito do Porto",
    "svc-event-title": "Cobertura de Eventos",
    "svc-event-desc": "Capture a energia e destaques dos seus eventos com fotografia profissional, videografia e conteúdo em tempo real para redes sociais.",
    "svc-event-detail": "Disponível apenas no Distrito do Porto",
    "svc-cat-web-title": "Web Design & Desenvolvimento",
    "svc-cat-web-desc": "Sites personalizados e soluções digitais que ficam bonitos, funcionam perfeitamente e crescem com o seu negócio.",
    "svc-landing-title": "Landing Pages",
    "svc-landing-desc": "Páginas de alta conversão e foco único projetadas para captar leads, promover lançamentos ou apresentar suas ofertas.",
    "svc-website-title": "Desenvolvimento de Sites",
    "svc-website-desc": "Design e desenvolvimento completo de sites — de sites multi-página a plataformas personalizadas, construídos com código limpo e a identidade da sua marca.",
    "svc-ecommerce-title": "E-Commerce",
    "svc-ecommerce-desc": "Lojas online feitas para vender — páginas de produto bonitas, checkout seguro e uma experiência de compra fluida para seus clientes.",
    "svc-seo-title": "SEO",
    "svc-seo-desc": "Otimização para motores de busca para ajudar seu site a rankear melhor — estrutura inteligente, palavras-chave e estratégias de conteúdo que trazem tráfego orgânico.",
    "svc-form-title": "Configuração de Formulários",
    "svc-form-desc": "Formulários de contato, agendamento, pesquisas e mais — configurados e integrados para você nunca perder um lead ou consulta.",
    "svc-revision-title": "Revisão & Manutenção de Sites",
    "svc-revision-desc": "Mantenha seu site atualizado, seguro e em dia com manutenção contínua, atualizações de conteúdo e melhorias de performance.",
    "svc-analytics-title": "Configuração Google Analytics",
    "svc-analytics-desc": "Acompanhe o desempenho do seu site com Google Analytics — configurado e pronto para fornecer insights sobre seus visitantes.",
    "svc-hosting-note": "A hospedagem e o registo de domínio são cobrados em separado para que mantenhas a propriedade total e possas migrar o site quando quiseres.",
    "svc-cat-software-title": "Software & Desenvolvimento Mobile",
    "svc-cat-software-desc": "Soluções de software personalizadas, apps mobile e integrações de sistemas construídas para otimizar suas operações e escalar seu negócio.",
    "svc-mobile-title": "Desenvolvimento de Apps Mobile",
    "svc-mobile-desc": "Apps mobile nativos e multiplataforma para iOS e Android — do conceito ao lançamento, construídos com foco em performance e experiência do usuário.",
    "svc-api-title": "Integração de API",
    "svc-api-desc": "Conecte seus sistemas e ferramentas de forma integrada — gateways de pagamento, CRMs, serviços de terceiros e APIs personalizadas integradas ao seu fluxo de trabalho.",
    "svc-scheduling-title": "Sistemas de Agendamento & Reservas",
    "svc-scheduling-desc": "Sistemas de reservas e agendamentos online personalizados para seu negócio — confirmações automáticas, sincronização de calendário e experiência fluida para seus clientes.",
    "svc-management-title": "Sistemas de Gestão",
    "svc-management-desc": "CRM, ERP e ferramentas internas personalizadas construídas para se adaptar aos seus processos — estoque, pedidos, clientes e operações em um só lugar.",
    "svc-automation-title": "Automação & Workflows",
    "svc-automation-desc": "Automatize tarefas repetitivas e processos de negócio — de gatilhos de email a pipelines de dados, economizando tempo e reduzindo erros.",
    "svc-database-title": "Banco de Dados & Soluções Backend",
    "svc-database-desc": "Arquitetura de banco de dados robusta e sistemas backend projetados para confiabilidade, segurança e performance conforme seus dados crescem.",
    "svc-cloud-title": "Deploy em Cloud & DevOps",
    "svc-cloud-desc": "Deploy e gestão de suas aplicações na cloud — pipelines CI/CD, configuração de hospedagem, monitoramento e infraestrutura escalável.",
    "form-message-label": "Project details",
    "svc-social-title": "Social Media Management",
    "svc-social-desc": "Editorial calendar, content production, scheduling, community replies, and a monthly performance report. One person owns the channel end-to-end so the brand stays consistent.",
    "svc-content-title": "Content Production",
    "svc-content-desc": "Photo, video, and graphic content shot or designed in-house. Single sessions or monthly batch days that keep the feed stocked for weeks.",
    "svc-content-detail": "In-person shoots available in Porto District",
    "svc-acquisition-title": "Paid Acquisition & Email",
    "svc-acquisition-desc": "Meta and Google ad campaigns with weekly optimization, plus email and newsletter flows that warm leads up to a real conversation.",
    "svc-brandvoice-title": "Brand & Copy Strategy",
    "svc-brandvoice-desc": "Positioning, messaging hierarchy, tone of voice, and the practical copy that shows up across the site, ads, and emails. Includes ongoing advisory when you need a second pair of eyes.",
    "svc-website-title": "Custom Websites",
    "svc-website-desc": "Multi-page sites and landing pages designed around the brand and built with hand-written front-end. From a single-page launcher to a content-rich site with CMS.",
    "svc-ecommerce-title": "E-Commerce",
    "svc-ecommerce-desc": "Online stores from product page to checkout — Shopify, WooCommerce, or custom — with the inventory, shipping, and payment integrations your business actually needs.",
    "svc-seo-title": "SEO & Analytics",
    "svc-seo-desc": "On-page SEO, structured data, sitemap, and Google Analytics 4 set up properly from day one. Quarterly health checks for sites that need to keep ranking.",
    "svc-maint-title": "Maintenance & Integrations",
    "svc-maint-desc": "Ongoing updates, security patches, content edits, form connections, third-party widgets — the work that keeps a launched site healthy without an in-house dev.",
    "svc-mobile-title": "Mobile Apps",
    "svc-mobile-desc": "iOS and Android apps built with React Native or native stacks — from a connected MVP to a polished production app, including the App Store submission.",
    "svc-automation-title": "Custom Software & Automation",
    "svc-automation-desc": "Internal tools, CRMs, ERPs, and workflow automations that replace spreadsheets and Zapier chains with a system designed for how the business actually runs.",
    "svc-api-title": "APIs & Integrations",
    "svc-api-desc": "Payment gateways, booking and scheduling, CRM sync, third-party services — plus custom APIs designed and documented for clients who will plug other vendors into them.",
    "svc-infra-title": "Database & Cloud",
    "svc-infra-desc": "Backend architecture, hosting setup, CI/CD pipelines, and monitoring on AWS or comparable. Built for the load you have today and the one you'll have in 18 months.",
    "svc-cta-title": "Não Sabe o Que Precisa?",
    "svc-cta-desc": "Vamos conversar sobre seus objetivos e encontrar o melhor plano juntos. Sem pressão, sem jargão — apenas uma conversa amigável.",
    "svc-cta-call": "Agendar uma Chamada Grátis",
    "svc-cta-message": "Enviar uma Mensagem",
    // Studio page
    "studio-label": "Dentro do Studio",
    "studio-title-1": "Bom Gosto,",
    "studio-title-2": "Pensamento Estratégico,",
    "studio-title-3": "Profundidade Técnica",
    "studio-subtitle": "Picky Pixels é feito para marcas que querem mais que um site bonito. Reunimos sensibilidade de marca, pensamento voltado para conversão e execução disciplinada em design, marketing e software.",
    "studio-belief-label": "No Que Acreditamos",
    "studio-belief-title": "Sites de boa agência já devem funcionar como prova.",
    "studio-belief-desc": "O próprio site precisa demonstrar bom senso, acabamento técnico, hierarquia de conteúdo e um ponto de vista claro. Esse é o padrão que mantemos para o trabalho dos nossos clientes também.",
    "studio-taste-title": "Bom Gosto Primeiro",
    "studio-taste-desc": "Escolhas visuais fortes que parecem intencionais, não genéricas.",
    "studio-systems-title": "Pensamento de Sistemas",
    "studio-systems-desc": "Cada página, bloco e interação tem um papel claro.",
    "studio-execution-title": "Qualidade de Execução",
    "studio-execution-desc": "Front-end limpo, UX forte e entrega sustentável.",
    "studio-team-label": "A Equipa",
    "studio-team-title": "As Pessoas Por Trás da Picky Pixels",
    "studio-team-desc": "Forças diferentes, padrões compartilhados. Trabalhamos com marca, conteúdo, sites, apps e sistemas digitais com um objetivo em comum: fazer o trabalho parecer afiado, alinhado e preparado para o futuro.",
    "studio-role-nathielle": "Web Design & Desenvolvimento",
    "studio-role-rebeca": "Estrategista de Marketing Multicanal",
    "studio-role-marcos": "Engenheiro de Software & Dev Mobile",
    "studio-process-label": "Como Trabalhamos",
    "studio-process-title": "Equipa Pequena, Altos Padrões, Processo Claro",
    "studio-process-desc": "Mantemos o processo enxuto o suficiente para ser ágil e estruturado o suficiente para entregar com confiança.",
    "studio-step1-title": "Posicionar",
    "studio-step1-desc": "Esclarecemos o que a marca precisa comunicar e o que o site precisa alcançar.",
    "studio-step2-title": "Design",
    "studio-step2-desc": "Moldamos o sistema visual, hierarquia e tom para que a marca pareça clara e memorável.",
    "studio-step3-title": "Construir",
    "studio-step3-desc": "Implementamos com precisão, de landing pages polidas a fluxos e integrações baseados em software.",
    "studio-step4-title": "Refinar",
    "studio-step4-desc": "Ajustamos a experiência final para que o resultado pareça forte, intencional e pronto para performar.",
    "studio-cta-title": "Vamos trabalhar juntos?",
    "studio-cta-desc": "Conte-nos sobre o seu projeto, ou agende uma chamada gratuita de 30 minutos para falarmos sobre os seus objetivos.",
    "studio-cta-call": "Agendar Chamada Gratuita",
    "studio-cta-message": "Enviar Mensagem",
  },
  en: {
    // Nav
    "nav-home": "Home",

    "nav-work": "Portfolio",
    "nav-services": "Services",
    "nav-about": "About",
    "nav-contact": "Contact",
    // Hero
    "hero-greeting": "\u{1F44B} Hey there, we're Picky Pixels!",
    "hero-title-1": "Marketing,",
    "hero-title-2": "Design & Dev",
    "hero-title-3": "With Heart",
    "hero-subtitle": "We help creatives and small businesses grow online — from stunning websites and apps to strategic marketing that connects and converts.",
    "hero-brands-eyebrow": "Brands we've shipped — 9",
    "hero-brands-cta": "See full work →",
    "cta-work": "View Our Work",
    "cta-contact": "Let's Chat",
    // Work section
    "trust-eyebrow": "Brands we've shipped",

    "section-work-label": "Selected Work",
    "section-work-title": "Some of Our Favorite Projects",
    "section-work-subtitle": "A glimpse into some of the projects we've crafted — from websites to marketing campaigns, each one made with care to reflect our clients' goals.",
    "filter-all": "All",
    "filter-web": "Web Design",
    "filter-marketing": "Marketing",
    // Portfolio
    "badge-web": "Web Design",
    "badge-marketing": "Marketing",
    "portfolio-turmeric-desc": "A modern restaurant website for Pakistani Indian cuisine in Porto, Portugal.",
    "portfolio-gabriella-desc": "A professional tattoo artist portfolio showcasing stunning gallery of work.",
    "portfolio-livingleaving-desc": "A sophisticated interior design portfolio with immersive gallery and before-after comparisons.",
    "portfolio-cynergia-desc": "Complete brand identity and web presence for an energy consulting company.",
    "portfolio-scriptai-desc": "Social media campaigns and ad creatives for an AI solutions company.",
    "portfolio-flyer-desc": "Promotional flyer design showcasing full range of business solutions.",
    "portfolio-visit": "Visit Website",
    "portfolio-see-all": "See Full Work",
    // About
    "about-label": "Meet the Studio",
    "about-title": "A Compact Preview of How We Think and Build",
    "about-desc": "Picky Pixels combines visual taste, technical execution, and strategic thinking. This is the team behind the ideas, systems, and experiences we craft for ambitious brands.",
    "role-nathielle": "Web Design & Development",
    "role-rebeca": "Multichannel Marketing Strategist",
    "role-marcos": "Software Engineer & Mobile Developer",
    "about-cta": "Meet the team →",
    "principle-taste-title": "Taste first",
    "principle-taste-desc": "Strong visual choices that feel intentional, not generic. The site itself should be proof.",
    "principle-systems-title": "Systems thinking",
    "principle-systems-desc": "Every page, block, and interaction has a clear role. We design to scale, not just to launch.",
    "principle-execution-title": "Execution quality",
    "principle-execution-desc": "Clean front-end, sharp UX, and maintainable delivery. So the brand can grow without us in the room.",
    "contact-message": "Send a Message",
    "team-msg-1": "We're Nathielle, Rebeca, and Marcos — the team behind Picky Pixels. Together, we turn dreams into websites, apps, and marketing strategies that feel aligned with who you are and what you're building.",
    "team-msg-2": "This studio is a place where small businesses, creatives, and first-time founders can feel supported. Whether you're launching something new or refreshing your brand, we'll make it feel exciting, intentional, and 100% you.",
    "cta-studio": "Explore the Studio",
    "cta-portfolio": "View Our Work",
    // Services
    "services-title": "How Can We Help You?",
    "services-desc": "From building your website to developing custom apps — we offer marketing, design, and development services tailored to creatives and small businesses.",
    "services-cta": "See All Services",
    "services-cat-marketing": "Marketing",
    "services-cat-web": "Web Design",
    "services-cat-software": "Software & Mobile",
    "svc-social-media": "Social Media Management",
    "svc-graphic-content": "Graphic Content Creation",
    "svc-video": "Video Creation & Editing",
    "svc-brand-planning": "Brand Strategic Planning",
    "svc-paid-traffic": "Paid Traffic Management",
    "svc-email-marketing": "Email Marketing & Newsletters",
    "svc-website-dev": "Website Development",
    "svc-landing": "Landing Pages",
    "svc-ecommerce": "E-Commerce",
    "svc-seo": "SEO",
    "svc-maintenance": "Website Maintenance",
    "svc-analytics": "Google Analytics Setup",
    "svc-mobile-app": "Mobile App Development",
    "svc-api": "API Integration",
    "svc-scheduling": "Scheduling & Booking Systems",
    "svc-management": "Management Systems",
    "svc-automation": "Automation & Workflows",
    "svc-cloud": "Cloud Deployment",
    "svc-see-marketing": "See all marketing services",
    "svc-see-web": "See all web services",
    "svc-see-software": "See all software services",
    // Contact
    "contact-label": "Ready to Start?",
    "contact-title": "Let's Create Something You're Proud Of",
    "contact-subtitle": "Tell us your ideas, your goals, and your vision — we'll help bring it to life with marketing, design, and development that feel just right.",
    "contact-get-in-touch": "Get in Touch",
    "contact-choose": "Choose your preferred way to connect:",
    "contact-schedule": "Book a Free Call",
    "contact-connect": "Connect with us:",
    "form-name": "Your Name",
    "form-email": "Your Email",
    "chip-marketing": "Marketing",
    "chip-web": "Web",
    "chip-software": "Software & Mobile",
    "chip-not-sure": "Not sure yet",

    "form-service-label": "What do you need help with?",
    "form-service-default": "What do you need help with?",
    "form-message": "Tell us about your project...",
    "form-submit": "Send Message",
    "form-success": "Thank you! Your message has been sent.",
    "form-error": "Oops! There was a problem sending your message. Please try again.",
    "optgroup-marketing": "Marketing",
    "optgroup-web": "Web Design & Development",
    "opt-social-media": "Social Media Management",
    "opt-content-creation": "Graphic Content Creation",
    "opt-video": "Video Creation & Editing",
    "opt-photography": "Photography Sessions",
    "opt-copywriting": "Copywriting",
    "opt-brand-strategy": "Brand Strategic Planning",
    "opt-email-marketing": "Email Marketing & Newsletters",
    "opt-paid-traffic": "Paid Traffic Management",
    "opt-marketing-consultancy": "Marketing Consultancy",
    "opt-landing-page": "Landing Page",
    "opt-website": "Website Development",
    "opt-ecommerce": "E-Commerce",
    "opt-seo": "SEO",
    "opt-maintenance": "Website Maintenance",
    "opt-consulting": "Web Consulting & Support",
    "form-privacy": "I agree to the",
    "form-privacy-link": "privacy policy",
    // Footer
    "footer-desc": "Helping small brands and bold creatives show up online with heart, clarity, and confidence.",
    "footer-work": "Portfolio",
    "footer-services": "Services",
    "footer-studio": "About",
    "footer-contact": "Contact",
    // Portfolio page
    "page-work-label": "Selected Work",
    "page-work-title-1": "Work We're",
    "page-work-title-2": "Proud",
    "page-work-title-3": "Of",
    "page-work-subtitle": "A collection of projects we've built with heart — each one crafted to reflect the personality and goals of our clients.",
    "page-filter-all": "All",
    "page-portfolio-turmeric-desc": "A modern restaurant website for Pakistani Indian cuisine in Porto, Portugal. Features menu showcase, location information, and online reservation system.",
    "page-portfolio-gabriella-desc": "A professional tattoo artist portfolio showcasing stunning gallery of work and providing an easy way for clients to explore styles.",
    "page-portfolio-livingleaving-desc": "A sophisticated interior design portfolio showcasing space transformations with immersive gallery and before-after comparisons.",
    "page-portfolio-cafezim-desc": "An artisanal coffee shop website featuring a warm, inviting design that reflects the brand's commitment to quality.",
    "page-portfolio-stegel-desc": "A modern and elegant website for a premium nail salon with service listings and online booking integration.",
    "page-portfolio-isabel-desc": "A personal brand website for a professional therapist with easy access to services, booking, and valuable resources.",
    "company-cynergia-badge": "6 projects",
    "company-cynergia-desc": "Energy consulting",
    "company-scriptai-badge": "8 projects",
    "company-scriptai-desc": "AI business solutions",
    "company-mmf-badge": "1 project",
    "company-mmf-desc": "Events & community",
    "portfolio-empty-msg": "No projects found in this category yet. Check back soon!",
    "page-contact-title": "Like What You See?",
    "page-contact-subtitle": "Let's create something amazing together. Tell us about your project and we'll get back to you.",
    // Services page
    "svc-page-label": "What We Do",
    "svc-page-title-1": "Creative",
    "svc-page-title-2": "Services",
    "svc-page-title-3": "For Your",
    "svc-page-title-4": "Brand",
    "svc-page-subtitle": "From building your online presence to managing your brand's voice across platforms — we've got you covered with marketing, design, and web solutions tailored to your goals.",
    "svc-cat-marketing-title": "Marketing & Social Media",
    "svc-cat-marketing-desc": "Strategic marketing solutions to grow your brand's presence and engage your audience across every platform.",
    "svc-social-media-title": "Social Media Management",
    "svc-social-media-desc": "We manage your social media presence across platforms — creating, scheduling, and optimizing content to keep your audience engaged and your brand consistent.",
    "svc-social-media-detail": "Per platform, per month",
    "svc-graphic-title": "Graphic Content Creation",
    "svc-graphic-desc": "Eye-catching visual content for your social media, campaigns, and brand materials — designed to stand out and tell your story.",
    "svc-video-title": "Video Creation & Editing",
    "svc-video-desc": "From concept to final cut — engaging video content for social media, ads, and brand storytelling that captures attention.",
    "svc-photo-title": "Photography Sessions",
    "svc-photo-desc": "Professional photography to elevate your brand — product shots, lifestyle imagery, and content creation sessions.",
    "svc-photo-detail": "Available in Porto District only",
    "svc-copywriting-title": "Copywriting",
    "svc-copywriting-desc": "Compelling copy that speaks your brand's language — from social media captions to website text that connects and converts.",
    "svc-brand-title": "Brand Strategic Planning",
    "svc-brand-desc": "Define your brand's positioning, messaging, and visual identity with a clear strategy that guides every touchpoint.",
    "svc-calendar-title": "Editorial Calendar",
    "svc-calendar-desc": "A structured content plan aligned with your goals and key dates — so you always know what to post and when.",
    "svc-reports-title": "Monthly Reports",
    "svc-reports-desc": "Clear, actionable insights on your marketing performance — so you can see what's working and where to improve.",
    "svc-consultancy-title": "Consultancy",
    "svc-consultancy-desc": "Expert guidance for your marketing and digital strategy — whether you need a one-time session or ongoing support.",
    "svc-email-title": "Email Marketing & Newsletters",
    "svc-email-desc": "Reach your audience directly with beautifully crafted emails and newsletters that nurture relationships and drive action.",
    "svc-paid-title": "Paid Traffic Management",
    "svc-paid-desc": "Strategic ad campaigns across platforms — optimized to reach the right audience and maximize your return on investment.",
    "svc-batch-title": "Batch Content Production",
    "svc-batch-desc": "Efficient, high-volume content creation sessions — photos, videos, and graphics produced in batches to keep your feed stocked.",
    "svc-batch-detail": "Available in Porto District only",
    "svc-event-title": "Event Coverage",
    "svc-event-desc": "Capture the energy and highlights of your events with professional photography, videography, and real-time social media content.",
    "svc-event-detail": "Available in Porto District only",
    "svc-cat-web-title": "Web Design & Development",
    "svc-cat-web-desc": "Custom-built websites and digital solutions that look beautiful, work flawlessly, and grow with your business.",
    "svc-landing-title": "Landing Pages",
    "svc-landing-desc": "High-converting, single-focus pages designed to capture leads, promote launches, or showcase your offerings.",
    "svc-website-title": "Website Development",
    "svc-website-desc": "Full website design and development — from multi-page sites to custom platforms, built with clean code and your brand identity.",
    "svc-ecommerce-title": "E-Commerce",
    "svc-ecommerce-desc": "Online stores built to sell — beautiful product pages, secure checkout, and a seamless shopping experience for your customers.",
    "svc-seo-title": "SEO",
    "svc-seo-desc": "Search engine optimization to help your website rank higher — smart structure, keywords, and content strategies that bring organic traffic.",
    "svc-form-title": "Form Setup",
    "svc-form-desc": "Contact forms, booking forms, surveys, and more — set up and integrated so you never miss a lead or inquiry.",
    "svc-revision-title": "Website Revision & Maintenance",
    "svc-revision-desc": "Keep your website fresh, secure, and up to date with ongoing maintenance, content updates, and performance improvements.",
    "svc-analytics-title": "Google Analytics Setup",
    "svc-analytics-desc": "Track your website's performance with Google Analytics — set up, configured, and ready to give you insights on your visitors.",
    "svc-hosting-note": "Hosting and domain registration are billed separately, so you keep full ownership and can move the site any time.",
    "svc-cat-software-title": "Software & Mobile Development",
    "svc-cat-software-desc": "Custom software solutions, mobile apps, and system integrations built to streamline your operations and scale your business.",
    "svc-mobile-title": "Mobile App Development",
    "svc-mobile-desc": "Native and cross-platform mobile apps for iOS and Android — from concept to launch, built with performance and user experience in mind.",
    "svc-api-title": "API Integration",
    "svc-api-desc": "Connect your systems and tools seamlessly — payment gateways, CRMs, third-party services, and custom APIs integrated into your workflow.",
    "svc-scheduling-title": "Scheduling & Booking Systems",
    "svc-scheduling-desc": "Online booking and appointment systems tailored to your business — automated confirmations, calendar sync, and a smooth experience for your clients.",
    "svc-management-title": "Management Systems",
    "svc-management-desc": "Custom CRM, ERP, and internal tools built to fit your processes — inventory, orders, clients, and operations all in one place.",
    "svc-automation-title": "Automation & Workflows",
    "svc-automation-desc": "Automate repetitive tasks and business processes — from email triggers to data pipelines, saving you time and reducing errors.",
    "svc-database-title": "Database & Backend Solutions",
    "svc-database-desc": "Robust database architecture and backend systems designed for reliability, security, and performance as your data grows.",
    "svc-cloud-title": "Cloud Deployment & DevOps",
    "svc-cloud-desc": "Deploy and manage your applications in the cloud — CI/CD pipelines, hosting setup, monitoring, and scalable infrastructure.",
    "form-message-label": "Project details",
    "svc-social-title": "Social Media Management",
    "svc-social-desc": "Editorial calendar, content production, scheduling, community replies, and a monthly performance report. One person owns the channel end-to-end so the brand stays consistent.",
    "svc-content-title": "Content Production",
    "svc-content-desc": "Photo, video, and graphic content shot or designed in-house. Single sessions or monthly batch days that keep the feed stocked for weeks.",
    "svc-content-detail": "In-person shoots available in Porto District",
    "svc-acquisition-title": "Paid Acquisition & Email",
    "svc-acquisition-desc": "Meta and Google ad campaigns with weekly optimization, plus email and newsletter flows that warm leads up to a real conversation.",
    "svc-brandvoice-title": "Brand & Copy Strategy",
    "svc-brandvoice-desc": "Positioning, messaging hierarchy, tone of voice, and the practical copy that shows up across the site, ads, and emails. Includes ongoing advisory when you need a second pair of eyes.",
    "svc-website-title": "Custom Websites",
    "svc-website-desc": "Multi-page sites and landing pages designed around the brand and built with hand-written front-end. From a single-page launcher to a content-rich site with CMS.",
    "svc-ecommerce-title": "E-Commerce",
    "svc-ecommerce-desc": "Online stores from product page to checkout — Shopify, WooCommerce, or custom — with the inventory, shipping, and payment integrations your business actually needs.",
    "svc-seo-title": "SEO & Analytics",
    "svc-seo-desc": "On-page SEO, structured data, sitemap, and Google Analytics 4 set up properly from day one. Quarterly health checks for sites that need to keep ranking.",
    "svc-maint-title": "Maintenance & Integrations",
    "svc-maint-desc": "Ongoing updates, security patches, content edits, form connections, third-party widgets — the work that keeps a launched site healthy without an in-house dev.",
    "svc-mobile-title": "Mobile Apps",
    "svc-mobile-desc": "iOS and Android apps built with React Native or native stacks — from a connected MVP to a polished production app, including the App Store submission.",
    "svc-automation-title": "Custom Software & Automation",
    "svc-automation-desc": "Internal tools, CRMs, ERPs, and workflow automations that replace spreadsheets and Zapier chains with a system designed for how the business actually runs.",
    "svc-api-title": "APIs & Integrations",
    "svc-api-desc": "Payment gateways, booking and scheduling, CRM sync, third-party services — plus custom APIs designed and documented for clients who will plug other vendors into them.",
    "svc-infra-title": "Database & Cloud",
    "svc-infra-desc": "Backend architecture, hosting setup, CI/CD pipelines, and monitoring on AWS or comparable. Built for the load you have today and the one you'll have in 18 months.",
    "svc-cta-title": "Not Sure What You Need?",
    "svc-cta-desc": "Let's chat about your goals and figure out the best plan together. No pressure, no jargon — just a friendly conversation.",
    "svc-cta-call": "Book a Free Call",
    "svc-cta-message": "Send a Message",
    // Studio page
    "studio-label": "Inside the Studio",
    "studio-title-1": "Design Taste,",
    "studio-title-2": "Strategic Thinking,",
    "studio-title-3": "Technical Depth",
    "studio-subtitle": "Picky Pixels is built for brands that want more than a good-looking website. We bring together brand sensitivity, conversion-minded thinking, and disciplined execution across design, marketing, and software.",
    "studio-belief-label": "What We Believe",
    "studio-belief-title": "Great agency websites should already feel like proof.",
    "studio-belief-desc": "The site itself needs to demonstrate judgment, technical polish, content hierarchy, and a clear point of view. That is the standard we hold our client work to as well.",
    "studio-taste-title": "Taste First",
    "studio-taste-desc": "Strong visual choices that feel intentional, not generic.",
    "studio-systems-title": "Systems Thinking",
    "studio-systems-desc": "Every page, block, and interaction has a clear role.",
    "studio-execution-title": "Execution Quality",
    "studio-execution-desc": "Clean front-end, strong UX, and maintainable delivery.",
    "studio-team-label": "The Team",
    "studio-team-title": "The People Behind Picky Pixels",
    "studio-team-desc": "Different strengths, shared standards. We work across brand, content, websites, apps, and digital systems with one common goal: make the work feel sharp, aligned, and future-proof.",
    "studio-role-nathielle": "Web Design & Development",
    "studio-role-rebeca": "Multichannel Marketing Strategist",
    "studio-role-marcos": "Software Engineer & Mobile Developer",
    "studio-process-label": "How We Work",
    "studio-process-title": "Small Team, High Standards, Clear Process",
    "studio-process-desc": "We keep the process lean enough to move fast and structured enough to deliver with confidence.",
    "studio-step1-title": "Position",
    "studio-step1-desc": "We clarify what the brand needs to communicate and what the site needs to achieve.",
    "studio-step2-title": "Design",
    "studio-step2-desc": "We shape the visual system, hierarchy, and tone so the brand feels clear and memorable.",
    "studio-step3-title": "Build",
    "studio-step3-desc": "We implement with precision, from polished landing pages to software-backed flows and integrations.",
    "studio-step4-title": "Refine",
    "studio-step4-desc": "We tighten the final experience so the end result feels strong, intentional, and ready to perform.",
    "studio-cta-title": "Want to work together?",
    "studio-cta-desc": "Tell us about your project, or book a free 30-minute call to talk through your goals.",
    "studio-cta-call": "Book a Free Call",
    "studio-cta-message": "Send a Message",
  },
};

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.dataset.translate;
    if (t[key] === undefined) return;
    // Preserve a <span> wrapper if present (used for the service-card hover-expand
    // animation, which depends on a single block child inside the <p> for the
    // CSS Grid 0fr → 1fr trick to collapse correctly).
    const innerSpan = el.querySelector(":scope > span:only-child");
    if (innerSpan) {
      innerSpan.textContent = t[key];
    } else {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll("[data-translate-placeholder]").forEach((el) => {
    const key = el.dataset.translatePlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll("[data-translate-label]").forEach((el) => {
    const key = el.dataset.translateLabel;
    if (t[key] !== undefined) el.label = t[key];
  });

  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
}



function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetSelector = anchor.getAttribute("href");

      if (!targetSelector || targetSelector === "#") {
        return;
      }

      const target = document.querySelector(targetSelector);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function switchLanguage(lang) {
  if (lang === currentLang) return;

  document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.body.classList.add("lang-switching");

  setTimeout(() => {
    applyTranslations(lang);
    currentLang = lang;
    localStorage.setItem("pickypixels-lang", lang);
    document.body.classList.remove("lang-switching");
  }, 280);
}

function initLanguageSwitcher() {
  const savedLang = localStorage.getItem("pickypixels-lang");
  const pageLang = document.documentElement.lang.startsWith("pt") ? "pt" : "en";
  currentLang = savedLang || pageLang;

  applyTranslations(currentLang);

  document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
    btn.addEventListener("click", () => {
      if (btn.dataset.lang) switchLanguage(btn.dataset.lang);
    });
  });
}


function initScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress-bar");

  if (!progressBar) {
    return;
  }

  const updateProgress = () => {
    const availableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      availableHeight > 0 ? (window.scrollY / availableHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeButton = document.querySelector(".close-mobile-menu");

  if (!hamburger || !mobileMenu || !closeButton) {
    return;
  }

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", closeMenu);
  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

async function submitContactForm(form, messageElement) {
  messageElement.textContent = "";
  messageElement.style.color = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    form.reset();
    messageElement.style.color = "green";
    messageElement.textContent = translations[currentLang]?.["form-success"] || "Thank you! Your message has been sent.";
  } catch (error) {
    messageElement.style.color = "red";
    messageElement.textContent = translations[currentLang]?.["form-error"] || "Oops! There was a problem sending your message. Please try again.";
  }
}

function initContactForms() {
  document.querySelectorAll("form.contact-form").forEach((form) => {
    const messageElement = form.querySelector("#form-message") || form.parentElement?.querySelector("#form-message");

    if (!messageElement) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitContactForm(form, messageElement);
    });
  });
}

function initImageOverlay() {
  // Onda 3: image-overlay is fully replaced by initCompanyModal. Web design
  // cards now route clicks to the same rich modal as marketing/company cards,
  // surfacing title, description, image, and a Visit Website CTA — all in one
  // place. This function is kept as a no-op so the DOMContentLoaded sequence
  // doesn't break; the actual binding happens inside initCompanyModal.
}

function initPortfolioPreviewFilter() {
  const section = document.getElementById("work");
  const portfolioLink = document.getElementById("portfolio-link");

  if (!section || !portfolioLink) {
    return;
  }

  const buttons = section.querySelectorAll(".filter-btn");
  const items = section.querySelectorAll(".portfolio-item");

  if (!buttons.length || !items.length) {
    return;
  }

  const applyFilter = (filter) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    items.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.style.display = shouldShow ? "" : "none";
      item.style.animation = shouldShow ? "fadeInUp 0.4s ease forwards" : "";
    });

    portfolioLink.href =
      filter === "all" ? "portfolio.html" : `portfolio.html?filter=${filter}`;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
  });
}

function initPortfolioPageFilter() {
  const buttons = document.querySelectorAll(".portfolio-section .filter-btn");
  const items = document.querySelectorAll(".portfolio-section .portfolio-item");
  const companyGroupsGrid = document.querySelector(".company-groups-grid");
  const emptyMessage = document.querySelector(".portfolio-empty");

  if (!buttons.length || !items.length) {
    return;
  }

  const applyFilter = (filter) => {
    let visibleCount = 0;

    buttons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    items.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.style.display = shouldShow ? "" : "none";
      item.style.animation = shouldShow ? "fadeInUp 0.4s ease forwards" : "";

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (companyGroupsGrid) {
      const shouldShowCompanies = filter === "all" || filter === "marketing";
      companyGroupsGrid.style.display = shouldShowCompanies ? "" : "none";
      companyGroupsGrid.style.animation = shouldShowCompanies
        ? "fadeInUp 0.4s ease forwards"
        : "";

      if (shouldShowCompanies) {
        visibleCount += 1;
      }
    }

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount > 0;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
  });

  const initialFilter = new URLSearchParams(window.location.search).get("filter");
  applyFilter(initialFilter && ["web", "marketing"].includes(initialFilter) ? initialFilter : "all");
}

function initCompanyModal() {
  const modal = document.getElementById("company-modal");

  if (!modal) {
    return;
  }

  const title = document.getElementById("company-modal-title");
  const description = document.getElementById("company-modal-description");
  const visitLink = document.getElementById("company-modal-visit");
  const image = document.getElementById("carousel-image");
  const caption = document.getElementById("carousel-caption");
  const dotsContainer = document.getElementById("carousel-dots");
  const thumbnailsContainer = document.getElementById("carousel-thumbnails");
  const closeButton = modal.querySelector(".company-modal-close");
  const backdrop = modal.querySelector(".company-modal-backdrop");
  const prevButton = modal.querySelector(".carousel-prev");
  const nextButton = modal.querySelector(".carousel-next");

  if (
    !title ||
    !image ||
    !caption ||
    !dotsContainer ||
    !thumbnailsContainer ||
    !closeButton ||
    !backdrop ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  let items = [];
  let currentIndex = 0;

  const showSlide = (index) => {
    if (!items.length) {
      return;
    }

    currentIndex = (index + items.length) % items.length;
    const currentItem = items[currentIndex];

    image.src = currentItem.src;
    image.alt = currentItem.label;
    caption.textContent = currentItem.label;

    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });

    thumbnailsContainer
      .querySelectorAll(".carousel-thumb")
      .forEach((thumbnail, thumbIndex) => {
        thumbnail.classList.toggle("active", thumbIndex === currentIndex);
      });
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  const openModal = (projectId) => {
    const project = companyProjects[projectId];

    if (!project) {
      return;
    }

    items = project.items;
    currentIndex = 0;
    title.textContent = project.title;

    // Description (optional — shows when present)
    if (description) {
      if (project.description) {
        description.textContent = project.description;
        description.hidden = false;
      } else {
        description.hidden = true;
        description.textContent = "";
      }
    }

    // Visit Website CTA (optional — shows when project has visitUrl)
    if (visitLink) {
      if (project.visitUrl) {
        visitLink.href = project.visitUrl;
        visitLink.hidden = false;
      } else {
        visitLink.hidden = true;
      }
    }

    // Hide carousel controls if only one image
    const single = items.length <= 1;
    prevButton.hidden = single;
    nextButton.hidden = single;
    dotsContainer.hidden = single;
    thumbnailsContainer.hidden = single;

    dotsContainer.innerHTML = "";
    thumbnailsContainer.innerHTML = "";

    items.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer.appendChild(dot);

      const thumbnail = document.createElement("img");
      thumbnail.className = "carousel-thumb";
      thumbnail.src = item.src;
      thumbnail.alt = item.label;
      thumbnail.addEventListener("click", () => showSlide(index));
      thumbnailsContainer.appendChild(thumbnail);
    });

    showSlide(0);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // Bind clicks to BOTH company cards (marketing) and web portfolio cards.
  // Web cards use data-project-id; company cards use data-company.
  document.querySelectorAll(".company-card[data-company]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.company));
  });
  document.querySelectorAll(".portfolio-item[data-project-id]").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openModal(card.dataset.projectId));
  });

  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showSlide(currentIndex - 1);
  });
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showSlide(currentIndex + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowLeft") {
      showSlide(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showSlide(currentIndex + 1);
    }
  });
}

function initServicesColumns() {
  // Onda 4 — Wrap service cards into 2 independent flex columns.
  // Each card lives in one column; hover-expand on a card only pushes the
  // card(s) BELOW it in the same column. The sibling column stays put.
  const grids = document.querySelectorAll(".services-grid-full");
  if (!grids.length) return;

  const distribute = () => {
    grids.forEach((grid) => {
      const existing = Array.from(grid.querySelectorAll(":scope > .services-column"));
      const cards = existing.length
        ? existing.flatMap((col) => Array.from(col.children))
        : Array.from(grid.children);

      existing.forEach((col) => col.remove());

      const columnCount = window.innerWidth > 768 ? 2 : 1;
      const columns = [];
      for (let i = 0; i < columnCount; i += 1) {
        const col = document.createElement("div");
        col.className = "services-column";
        grid.appendChild(col);
        columns.push(col);
      }

      cards.forEach((card, i) => columns[i % columnCount].appendChild(card));
    });
  };

  let resizeTimer;
  distribute();
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(distribute, 200);
  });
}

function updateCopyrightYear() {
  document.querySelectorAll(".copyright").forEach((element) => {
    element.innerHTML = element.innerHTML.replace(/\d{4}/, `${new Date().getFullYear()}`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initLanguageSwitcher();
  initScrollProgress();
  initMobileMenu();
  initContactForms();
  initImageOverlay();
  initPortfolioPreviewFilter();
  initPortfolioPageFilter();
  initCompanyModal();
  initServicesColumns();
  updateCopyrightYear();
});
