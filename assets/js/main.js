document.addEventListener("DOMContentLoaded", () => {
  // Apply the single source of truth for all call and WhatsApp links across every page.
  const contact = window.SITE_CONTACT || {};
  const phone = contact.phoneNumber || "";
  const whatsapp = contact.whatsappNumber || "";
  document.querySelectorAll("[data-phone-link]").forEach(link => {
    link.href = phone ? `tel:${phone}` : "#";
    if (!phone) link.addEventListener("click", event => event.preventDefault());
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
    link.href = whatsapp ? `https://wa.me/${whatsapp}` : "#";
    if (!whatsapp) link.addEventListener("click", event => event.preventDefault());
  });
  document.querySelectorAll("[data-phone-display]").forEach(node => {
    node.textContent = phone || "Update number";
  });
  document.querySelectorAll("[data-whatsapp-display]").forEach(node => {
    node.textContent = whatsapp ? "WhatsApp: " + whatsapp : "Chat with us";
  });

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

  // Clicking a project image opens WhatsApp with a category-specific enquiry.
  // Replace this demo number with the studio's real WhatsApp number before deployment.
  const whatsappNumber = window.SITE_CONTACT?.whatsappNumber || "";
  document.querySelectorAll("[data-whatsapp-enquiry]").forEach(card => {
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    const openEnquiry = () => {
      const category = card.dataset.category || card.querySelector(".project-info small")?.textContent?.trim() || "project";
      const title = card.querySelector(".project-info h3")?.textContent?.trim() || category;
      const categoryName = category === "living-room" ? "Living Room" : category.charAt(0).toUpperCase() + category.slice(1);
      const message = `Hey, can I get more details on ${categoryName}!!!`;
      if (!whatsappNumber) { alert("Please add the WhatsApp number in assets/js/config.js."); return; }
      window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`, "_blank", "noopener");
    };
    card.addEventListener("click", openEnquiry);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openEnquiry(); }
    });
    card.setAttribute("aria-label", `Ask about ${card.querySelector(".project-info h3")?.textContent?.trim() || "this project"} on WhatsApp`);
  });

  // One-image-at-a-time Kitchen, Bedroom and Living Room carousels.
  document.querySelectorAll("[data-category-slider]").forEach(slider => {
    const track = slider.querySelector(".category-slider-track");
    const cards = [...slider.querySelectorAll(".category-slide")];
    const section = slider.closest(".category-gallery-section");
    const prev = section?.querySelector("[data-slider-prev]");
    const next = section?.querySelector("[data-slider-next]");
    const status = section?.querySelector("[data-slider-status]");
    let index = 0;

    cards.forEach(card => {
      const img = card.querySelector("img");
      if (img) {
        img.addEventListener("error", () => card.classList.add("image-missing"), { once: true });
        if (img.complete && img.naturalWidth === 0) card.classList.add("image-missing");
      }
    });

    const update = () => {
      if (track) track.style.transform = `translateX(-${index * 100}%)`;
      if (status) status.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    };
    prev?.addEventListener("click", () => { index = index <= 0 ? cards.length - 1 : index - 1; update(); });
    next?.addEventListener("click", () => { index = index >= cards.length - 1 ? 0 : index + 1; update(); });
    window.setInterval(() => { index = index >= cards.length - 1 ? 0 : index + 1; update(); }, 5000);
    update();
  });

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
