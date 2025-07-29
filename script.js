// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const links = document.querySelectorAll("a, button");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorFollower.style.left = e.clientX + "px";
  cursorFollower.style.top = e.clientY + "px";
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursorFollower.style.transform = "scale(1.5)";
  });

  link.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursorFollower.style.transform = "scale(1)";
  });
});

// Parallax Effect
const parallaxElements = document.querySelectorAll("[data-parallax]");

window.addEventListener("mousemove", (e) => {
  const { innerWidth: width, innerHeight: height } = window;
  const { clientX: x, clientY: y } = e;
  const xPos = (x / width - 0.5) * 2;
  const yPos = (y / height - 0.5) * 2;

  parallaxElements.forEach((el) => {
    const speed = el.dataset.parallax;
    el.style.transform = `translate3d(${xPos * speed * 10}px, ${
      yPos * speed * 10
    }px, 0)`;
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Language Switcher
const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = document.documentElement.lang.startsWith("pt") ? "pt" : "en";

const translations = {
  pt: {
    // Navigation
    "nav-work": "Trabalhos",
    "nav-about": "Sobre",
    "nav-contact": "Contato",

    // Hero Section
    "hero-greeting": "👋 Olá, eu sou Nathielle!",
    "hero-title-1": "Sites",
    "hero-title-2": "Com Coração",
    "hero-title-3": "E Estratégia",
    "hero-subtitle":
      "Ajudo criativos e pequenas empresas a construir espaços digitais que refletem quem são—bonitos, funcionais e cheios de personalidade.",
    "cta-work": "Ver Nossos Trabalhos",
    "cta-contact": "Vamos Conversar",

    // Work Section
    "section-work-label": "Nosso Portfólio",
    "section-work-title": "Alguns dos Nossos Projetos Favoritos",
    "section-work-subtitle":
      "Um vislumbre de alguns dos sites que construímos—cada um criado com cuidado para refletir a personalidade e os objetivos de nossos clientes.",
    "filter-all": "Todos os Projetos",
    "filter-web": "Design Web",
    "filter-ui": "UI/UX",
    "filter-dev": "Desenvolvimento",

    // About Section
    "section-about-label": "Sobre Nós",
    "section-about-title": "Vamos Construir Algo Significativo",
    "section-about-subtitle":
      "Criamos sites que não apenas parecem bons—eles se sentem certos. Adaptados à sua marca, sua vibe, seus objetivos.",
    "owner-role": "Fundadora & Diretora Criativa",
    "owner-quote":
      "Estou aqui para ajudar você a se mostrar online com confiança e autenticidade—vamos construir algo que se sinta certo e funcione perfeitamente.",

    // Contact Section
    "contact-label": "Pronto para Começar?",
    "contact-title": "Vamos Criar Algo do Qual Você Se Orgulhe",
    "contact-subtitle":
      "Me conte suas ideias, seus objetivos e sua visão—vou ajudar a transformá-los em um site que se sinta perfeito.",
    "contact-get-touch": "Entre em Contato",
    "contact-choose-way": "Escolha sua forma preferida de conexão:",
    "contact-schedule": "Agendar uma Chamada",
    "contact-connect": "Conecte-se comigo:",

    // Form Labels
    "form-name": "Seu Nome",
    "form-email": "Seu Email",
    "form-service": "Com o que você precisa de ajuda?",
    "form-budget": "Sua Faixa de Orçamento",
    "form-message": "Me conte sobre seu projeto...",
    "form-privacy": "Eu concordo com a",
    "form-privacy-link": "política de privacidade",
    "form-submit": "Enviar Mensagem",

    // Footer
    "footer-tagline":
      "Ajudando pequenas marcas e criativos ousados a se mostrarem online com coração, clareza e confiança.",
    "footer-privacy": "Política de Privacidade",
    "footer-copyright": "Todos os direitos reservados.",
  },
  en: {
    // Navigation
    "nav-work": "Work",
    "nav-about": "About",
    "nav-contact": "Contact",

    // Hero Section
    "hero-greeting": "👋 Hey there, I'm Nathielle!",
    "hero-title-1": "Websites",
    "hero-title-2": "With Heart",
    "hero-title-3": "And Strategy",
    "hero-subtitle":
      "I help creatives and small businesses build digital spaces that feel true to them—beautiful, functional, and full of personality.",
    "cta-work": "View Our Work",
    "cta-contact": "Let's Chat",

    // Work Section
    "section-work-label": "Our Portfolio",
    "section-work-title": "Some of Our Favorite Builds",
    "section-work-subtitle":
      "A glimpse into some of the websites we've built—each one crafted with care to reflect the personality and goals of our clients.",
    "filter-all": "All Projects",
    "filter-web": "Web Design",
    "filter-ui": "UI/UX",
    "filter-dev": "Development",

    // About Section
    "section-about-label": "About Us",
    "section-about-title": "Let's Build Something Meaningful",
    "section-about-subtitle":
      "We create websites that don't just look good—they feel right. Tailored to your brand, your vibe, your goals.",
    "owner-role": "Founder & Creative Director",
    "owner-quote":
      "I'm here to help you show up online with confidence and authenticity—let's build something that feels right and works beautifully.",

    // Contact Section
    "contact-label": "Ready to Start?",
    "contact-title": "Let's Create Something You're Proud Of",
    "contact-subtitle":
      "Tell me your ideas, your goals, and your vision—I'll help bring it to life with a website that feels just right.",
    "contact-get-touch": "Get in Touch",
    "contact-choose-way": "Choose your preferred way to connect:",
    "contact-schedule": "Schedule a Call",
    "contact-connect": "Connect with me:",

    // Form Labels
    "form-name": "Your Name",
    "form-email": "Your Email",
    "form-service": "What do you need help with?",
    "form-budget": "Your Budget Range",
    "form-message": "Tell me about your project...",
    "form-privacy": "I agree to the",
    "form-privacy-link": "privacy policy",
    "form-submit": "Send Message",

    // Footer
    "footer-tagline":
      "Helping small brands and bold creatives show up online with heart, clarity, and confidence.",
    "footer-privacy": "Privacy Policy",
    "footer-copyright": "All rights reserved.",
  },
};

function switchLanguage(lang) {
  currentLang = lang;

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  // Update translations for elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.dataset.translate;
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Handle page switching
  const currentPath = window.location.pathname;
  const isPT = currentPath.includes("index.pt.html");

  if (lang === "pt" && !isPT) {
    window.location.href = "index.pt.html";
  } else if (lang === "en" && isPT) {
    window.location.href = "index.html";
  }
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    switchLanguage(lang);
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      if (entry.target.classList.contains("work-item")) {
        entry.target.style.transitionDelay = `${entry.target.dataset.delay}s`;
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".work-item, .stat-item, .section-title, .section-header, .large-text, .stat-number"
  )
  .forEach((el, index) => {
    el.dataset.delay = index * 0.2;
    observer.observe(el);
  });

// Contact Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  try {
    // Here you would typically send the data to a server
    console.log("Form submitted:", data);

    // Show success message
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = "Message Sent!";
    button.classList.add("success");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("success");
      contactForm.reset();
    }, 3000);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
    mobileMenu.classList.toggle("active");
  });
}

// Header Scroll Effect
const header = document.querySelector(".header");
let lastScroll = 0;

if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      // Scrolling down
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      // Scrolling up
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });
}

// Add mouse movement effect to hero section
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const cards = document.querySelectorAll(".hero-3d-card");

if (hero && heroContent) {
  hero.addEventListener("mousemove", (e) => {
    const { offsetWidth: width, offsetHeight: height } = hero;
    const { clientX, clientY } = e;

    const x = (clientX - width / 2) / width;
    const y = (clientY - height / 2) / height;

    heroContent.style.transform = `
        rotateY(${x * 5}deg)
        rotateX(${y * -5}deg)
        translateZ(10px)
    `;

    cards.forEach((card) => {
      const cardX = card.classList.contains("left") ? -x : x;
      card.style.transform = `
            perspective(1000px)
            rotateX(${y * 10}deg)
            rotateY(${cardX * 15}deg)
        `;
    });
  });

  hero.addEventListener("mouseleave", () => {
    heroContent.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
    cards.forEach((card) => {
      card.style.transform = card.classList.contains("left")
        ? "perspective(1000px) rotateX(-5deg) rotateY(-15deg)"
        : "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Scroll Progress Indicator
const scrollProgress = document.querySelector(".scroll-progress-bar");

window.addEventListener(
  "scroll",
  () => {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  },
  { passive: true }
);

// Work Section Filtering
const categoryFilters = document.querySelectorAll(".category-filter");
const workItems = document.querySelectorAll(".work-item");

categoryFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // Update active filter
    categoryFilters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    workItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        }, 300);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Enhanced Scroll Animation
window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    parallaxElements.forEach((el) => {
      const speed = el.dataset.parallax;
      const yPos = -((scrolled * speed) / 5);
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  },
  { passive: true }
);

// Work Item Hover Effect
workItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = item.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    item.style.transform = `
            perspective(1000px)
            rotateY(${x * 10}deg)
            rotateX(${y * -10}deg)
            translateZ(20px)
        `;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "none";
  });
});

// Work Slider
const initWorkSlider = () => {
  const slider = document.querySelector(".work-slider");
  const slides = document.querySelectorAll(".work-slide");
  const prevBtn = document.querySelector(".slider-nav.prev");
  const nextBtn = document.querySelector(".slider-nav.next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!slider || !slides.length) {
    console.warn("Slider or slides are missing");
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots if container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = ""; // Clear existing dots
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    // Update slider position
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots if they exist
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
        dot.setAttribute(
          "aria-selected",
          index === currentSlide ? "true" : "false"
        );
      });
    }

    // Update buttons state if they exist
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // Announce for screen readers
    const liveRegion =
      document.querySelector('[aria-live="polite"]') ||
      (() => {
        const region = document.createElement("div");
        region.setAttribute("aria-live", "polite");
        region.className = "sr-only";
        document.body.appendChild(region);
        return region;
      })();
    liveRegion.textContent = `Showing slide ${
      currentSlide + 1
    } of ${totalSlides}`;
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  }

  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      console.log("Previous clicked, current slide:", currentSlide); // Debug log
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      console.log("Next clicked, current slide:", currentSlide); // Debug log
    });
  }

  // Keyboard Navigation
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Touch Events
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    },
    { passive: true }
  );

  // Initialize
  updateSlider();
  console.log("Slider initialized with", totalSlides, "slides"); // Debug log
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing slider..."); // Debug log
  initWorkSlider();
});

// Add CSS for screen reader only content
const style = document.createElement("style");
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
`;
document.head.appendChild(style);

// Update copyright year
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector(".copyright");

  if (copyrightElement) {
    // Log for debugging
    console.log("Current year:", currentYear);
    console.log("Copyright element found:", copyrightElement);

    // Replace the year in the copyright text
    const newContent = copyrightElement.innerHTML.replace(/\d{4}/, currentYear);
    copyrightElement.innerHTML = newContent;

    // Log the change
    console.log("Copyright updated to:", newContent);
  } else {
    console.warn("Copyright element not found");
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, updating copyright year...");
  updateCopyrightYear();
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMobileMenu = document.querySelector(".close-mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-menu .nav-link");
  const mobileLangBtns = document.querySelectorAll(".mobile-menu .lang-btn");

  if (hamburger && mobileMenu && closeMobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    closeMobileMenu.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
    mobileLangBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        mobileLangBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        // Also update desktop language switcher
        const lang = btn.dataset.lang;
        document.querySelectorAll(".lang-btn[data-lang]").forEach((b) => {
          if (b.dataset.lang === lang) {
            b.classList.add("active");
          } else {
            b.classList.remove("active");
          }
        });
        // Call switchLanguage if available
        if (typeof switchLanguage === "function") {
          switchLanguage(lang);
        }
      });
    });
  }
});

// Simple image overlay
function initImageOverlay() {
  const overlay = document.getElementById("image-overlay");
  const overlayImage = document.getElementById("overlay-image");
  const overlayClose = document.getElementById("overlay-close");
  const portfolioImages = document.querySelectorAll(".portfolio-image");

  // Click image to open
  portfolioImages.forEach((image) => {
    image.addEventListener("click", (e) => {
      e.preventDefault();
      overlayImage.src = image.src;
      overlayImage.alt = image.alt;
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  // Click anywhere to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  // Click close button to close
  overlayClose.addEventListener("click", () => {
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initImageOverlay();
});
