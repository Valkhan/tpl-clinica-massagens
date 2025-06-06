// DOM Elements
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");
const scrollIndicator = document.querySelector(".scroll-indicator");
const serviceCards = document.querySelectorAll(".service-card");
const mapPlaceholder = document.querySelector(".map-placeholder");

// Mobile Navigation Toggle
navToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Header Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Header background opacity based on scroll
  if (currentScrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }

  // Hide/show header on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;

  // Hide scroll indicator after scrolling
  if (currentScrollY > 300) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});

// Smooth Scroll for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Service Cards Hover Effect Enhancement
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
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
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll(
  ".service-card, .feature, .contact-item"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});

// Map Placeholder Click Handler
mapPlaceholder?.addEventListener("click", () => {
  // Replace with actual Google Maps coordinates
  const address = "Rua das Flores, 123, Jardim Zen, São Paulo, SP";
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  window.open(mapsUrl, "_blank");
});

// WhatsApp Message Tracking
const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
whatsappButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Track WhatsApp clicks (for analytics)
    console.log("WhatsApp button clicked");

    // Add a subtle animation
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);
  });
});

// Scroll-triggered Counter Animation (for future use)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image img");

  if (heroImage && scrolled <= window.innerHeight) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Form Validation (if contact form is added in the future)
function validateForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push("Email inválido");
  }

  if (!formData.phone || formData.phone.trim().length < 10) {
    errors.push("Telefone inválido");
  }

  return errors;
}

// Loading Animation for Images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.3s ease-in-out";
    });

    // Set initial opacity
    img.style.opacity = "0";

    // If image is already loaded
    if (img.complete) {
      img.style.opacity = "1";
    }
  });
});

// Service Card Click Enhancement
serviceCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    // Get service name
    const serviceName = card.querySelector("h3").textContent;

    // Create WhatsApp message
    const message = `Olá! Gostaria de agendar uma ${serviceName}.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Add click animation
    card.style.transform = "scale(0.98)";
    setTimeout(() => {
      card.style.transform = "translateY(-10px)";
    }, 100);
  });

  // Add cursor pointer
  card.style.cursor = "pointer";
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.filter = "blur(0)";
      img.style.transition = "filter 0.3s ease-in-out";
      observer.unobserve(img);
    }
  });
});

// Apply lazy loading to all images
document.querySelectorAll("img").forEach((img) => {
  img.style.filter = "blur(2px)";
  imageObserver.observe(img);
});

// Accessibility Enhancements
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Add focus styles for keyboard navigation
const focusableElements = document.querySelectorAll(
  'a, button, [tabindex]:not([tabindex="-1"])'
);
focusableElements.forEach((element) => {
  element.addEventListener("focus", () => {
    element.style.outline = "2px solid #D4A574";
    element.style.outlineOffset = "2px";
  });

  element.addEventListener("blur", () => {
    element.style.outline = "none";
  });
});

// Console welcome message
console.log(
  "%c🧘‍♀️ Zen Massagens - Landing Page",
  "color: #D4A574; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cDesenvolvido com carinho para proporcionar a melhor experiência digital.",
  "color: #2C1810; font-size: 12px;"
);
