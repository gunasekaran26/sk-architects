document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen ? "&times;" : "&#9776;";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = "&#9776;";
    }));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card[data-category]");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projects.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  }));

  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lightboxImage = lightbox.querySelector("img");
    const close = lightbox.querySelector(".lightbox-close");
    document.querySelectorAll("[data-lightbox]").forEach(item => item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.full || item.querySelector("img").src;
      lightboxImage.alt = item.querySelector("img").alt || "Project photograph";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }));
    const closeBox = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };
    close?.addEventListener("click", closeBox);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeBox(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeBox(); });
  }

  document.querySelectorAll(".faq-question").forEach(button => button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(item.classList.contains("open")));
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const form = document.querySelector("[data-enquiry-form]");
  if (form) {
    form.addEventListener("submit", e => {
      const recipient = form.dataset.recipient || "";
      if (!recipient || recipient.includes("REPLACE_WITH")) {
        e.preventDefault();
        const note = form.querySelector(".success-message");
        if (note) {
          note.style.display = "block";
          note.textContent = "Demo mode: replace the placeholder email address in this form with the client's real email before launch. No email has been sent yet.";
        }
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
