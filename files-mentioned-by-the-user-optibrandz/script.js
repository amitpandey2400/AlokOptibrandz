const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const estimator = document.querySelector("[data-estimator]");
const planSummary = document.querySelector("[data-plan-summary]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const year = document.querySelector("[data-year]");
const loader = document.querySelector("[data-loader]");
const scrollProgress = document.querySelector("[data-scroll-progress]");

const hideLoader = () => {
  if (!loader) return;
  loader.classList.add("is-hidden");
  document.body.classList.remove("loading");
};

window.addEventListener("load", () => {
  window.setTimeout(hideLoader, 650);
});

window.setTimeout(hideLoader, 2200);

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

if (header) {
  window.addEventListener("scroll", setHeaderState);
  setHeaderState();
}

const updateScrollProgress = () => {
  if (!scrollProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const updateEstimate = () => {
  const selected = Array.from(estimator.elements)
    .filter((element) => element.tagName === "SELECT")
    .map((select) => select.options[select.selectedIndex].text.replace(" website", ""));

  planSummary.textContent = selected.join(" + ");
};

if (estimator && planSummary) {
  estimator.addEventListener("change", updateEstimate);
  updateEstimate();
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const enquiry = Object.fromEntries(formData.entries());
    const enquiries = JSON.parse(localStorage.getItem("optibrandz-enquiries") || "[]");

    enquiries.push({
      ...enquiry,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("optibrandz-enquiries", JSON.stringify(enquiries));
    contactForm.reset();
    formStatus.textContent = "Thanks. Your enquiry has been saved and our team will follow up.";
  });
}

const revealItems = document.querySelectorAll(
  ".section-heading, .founder-portrait, .founder-copy, .clientele-heading, .client-track article, .service-columns article, .package-card, .rate-grid article, .review-list article, .number-grid article, .contact-layout, .estimator-panel"
);

const animateNumber = (element) => {
  if (element.dataset.counted === "true") return;
  const text = element.textContent.trim();
  const target = Number(text.replace(/[^0-9]/g, ""));

  if (!target) return;

  element.dataset.counted = "true";
  element.classList.add("counting");

  const suffix = text.replace(/[0-9]/g, "");
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = text;
    }
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          if (entry.target.matches(".stage-card, .review-score")) {
            entry.target.querySelectorAll("strong").forEach(animateNumber);
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });

  document.querySelectorAll(".stage-card, .review-score").forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const magneticCards = document.querySelectorAll(
  ".service-columns article, .package-card, .rate-grid article, .number-grid article, .contact-card"
);

magneticCards.forEach((card) => {
  card.classList.add("magnetic-card");

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
