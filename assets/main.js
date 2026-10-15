/* Progressive enhancement: the portfolio works without JavaScript. */
(() => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-links");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
  };
  menu.addEventListener("click", () =>
    setMenu(menu.getAttribute("aria-expanded") !== "true"),
  );
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) setMenu(false);
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  const filters = document.querySelector(".filters");
  const grid = document.querySelector(".projects-grid");
  const cards = [...grid.querySelectorAll(".project-card")];
  const count = document.querySelector(".project-count");
  filters.hidden = false;
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const filter = button.dataset.filter;
    filters.querySelectorAll("button").forEach((item) => {
      const active = item === button;
      item.setAttribute("aria-pressed", String(active));
      item.classList.toggle("is-active", active);
    });
    grid.classList.toggle("is-filtered", filter !== "all");
    scheduleProgress();
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      card.classList.remove("filter-enter");
      if (!card.hidden) visible++;
    });
    requestAnimationFrame(() =>
      cards
        .filter((card) => !card.hidden)
        .forEach((card, index) => {
          card.style.setProperty(
            "--filter-delay",
            `${Math.min(index, 2) * 45}ms`,
          );
          card.classList.add("filter-enter");
        }),
    );
    count.textContent = `${String(visible).padStart(2, "0")} ${visible === 1 ? "selected project" : "selected projects"}`;
  });

  // Keep paired cards slightly staggered without delaying the whole grid.
  cards.forEach((card, index) =>
    card.style.setProperty("--reveal-delay", `${(index % 2) * 65}ms`),
  );

  const progress = document.querySelector(".reading-progress");
  let progressFrame = null;
  const updateProgress = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0})`;
    progressFrame = null;
  };
  const scheduleProgress = () => {
    if (progressFrame === null)
      progressFrame = requestAnimationFrame(updateProgress);
  };
  addEventListener("scroll", scheduleProgress, { passive: true });
  addEventListener("resize", scheduleProgress);
  document.addEventListener("toggle", scheduleProgress, true);
  if ("ResizeObserver" in window)
    new ResizeObserver(scheduleProgress).observe(document.body);
  updateProgress();

  const copy = document.querySelector(".copy-email");
  const copyStatus = document.querySelector(".copy-status");
  let copyTimeout;
  if (navigator.clipboard && window.isSecureContext) {
    copy.hidden = false;
    copy.addEventListener("click", async () => {
      clearTimeout(copyTimeout);
      try {
        await navigator.clipboard.writeText("krsambhav05@gmail.com");
        copy.querySelector("span").textContent = "Email copied";
        copyStatus.textContent = "Email address copied to clipboard.";
      } catch {
        copy.querySelector("span").textContent =
          "Select the email above to copy";
        copyStatus.textContent =
          "Clipboard access unavailable. Select the email address above to copy it.";
      }
      copyTimeout = setTimeout(() => {
        copy.querySelector("span").textContent = "Copy email";
        copyStatus.textContent = "";
      }, 4000);
    });
  }
  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window) {
    const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("#work, #about, #certifications, #contact")
      .forEach((section) => sectionObserver.observe(section));
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reveal = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          ".project-card, .about-grid, .credentials-layout, .contact-grid",
        )
        .forEach((element) => reveal.observe(element));
    }
  }
})();
