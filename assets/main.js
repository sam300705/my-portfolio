/* Progressive enhancement: the portfolio works without JavaScript. */
(() => {
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const runningMotion = new Set();
  const motionOptions = { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" };
  const animate = (element, frames, options = {}) => {
    if (motionPreference.matches || !element.animate) return null;
    const animation = element.animate(frames, { ...motionOptions, ...options });
    runningMotion.add(animation);
    animation.finished.then(
      () => runningMotion.delete(animation),
      () => runningMotion.delete(animation),
    );
    return animation;
  };
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches)
      runningMotion.forEach((animation) => animation.finish());
  });

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-links");
  let menuOpen = false;
  let menuMotion = null;
  const setMenu = (open, immediate = false) => {
    if (menuOpen === open && !immediate) return;
    menuOpen = open;
    const opacity = getComputedStyle(nav).opacity;
    menuMotion?.cancel();
    menuMotion = null;
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    const mobile = matchMedia("(max-width: 760px)").matches;
    const finish = () => {
      nav.classList.toggle("is-open", open);
      nav.inert = false;
      menuMotion = null;
    };
    if (immediate || !mobile || motionPreference.matches) {
      finish();
      return;
    }
    nav.classList.add("is-open");
    nav.inert = !open;
    menuMotion = animate(
      nav,
      open
        ? [
            { opacity: 0.4, transform: "translateY(-6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ]
        : [
            { opacity, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(-4px)" },
          ],
      { duration: open ? 220 : 160 },
    );
    if (menuMotion) menuMotion.finished.then(finish, () => {});
    else finish();
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
    if (event.matches) setMenu(false, true);
  });

  const filters = document.querySelector(".filters");
  const grid = document.querySelector(".projects-grid");
  const cards = [...grid.querySelectorAll(".project-card")];
  const count = document.querySelector(".project-count");
  const filterMotion = new Map();
  filters.hidden = false;
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const filter = button.dataset.filter;
    if (button.getAttribute("aria-pressed") === "true") return;
    const previousPositions = new Map(
      cards
        .filter((card) => !card.hidden)
        .map((card) => [card, card.getBoundingClientRect()]),
    );
    filterMotion.forEach((animation) => animation.cancel());
    filterMotion.clear();
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
      card.classList.remove("reveal-in", "filter-enter");
      card.classList.add("filter-managed");
      if (!card.hidden) visible++;
    });
    cards
      .filter((card) => !card.hidden)
      .forEach((card, index) => {
        const current = card.getBoundingClientRect();
        if (current.bottom < 0 || current.top > innerHeight) return;
        const previous = previousPositions.get(card);
        const animation = animate(
          card,
          previous
            ? [
                {
                  transform: `translate(${previous.left - current.left}px, ${previous.top - current.top}px)`,
                },
                { transform: "translate(0, 0)" },
              ]
            : [
                { opacity: 0.4, transform: "translateY(12px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
          { delay: previous ? 0 : Math.min(index, 2) * 35 },
        );
        if (animation) filterMotion.set(card, animation);
      });
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

  // Animate both directions without replacing native details/summary semantics.
  document.querySelectorAll(".project-detail, .archive").forEach((details) => {
    const summary = details.querySelector("summary");
    const content = details.querySelector(".detail-body, .archive-list");
    const panel = document.createElement("div");
    panel.className = "disclosure-panel";
    content.before(panel);
    panel.append(content);
    details.classList.add("motion-disclosure");
    let desiredOpen = details.open;
    let animation = null;
    summary.addEventListener("click", (event) => {
      if (event.defaultPrevented || motionPreference.matches || !panel.animate)
        return;
      event.preventDefault();
      desiredOpen = !desiredOpen;
      const from = details.open ? panel.getBoundingClientRect().height : 0;
      animation?.cancel();
      details.open = true;
      panel.style.overflow = "clip";
      const to = desiredOpen ? panel.scrollHeight : 0;
      animation = animate(
        panel,
        [{ height: `${from}px` }, { height: `${to}px` }],
        { duration: desiredOpen ? 320 : 240 },
      );
      const finish = () => {
        details.open = desiredOpen;
        panel.style.overflow = "";
        animation = null;
        scheduleProgress();
      };
      if (animation) animation.finished.then(finish, () => {});
      else finish();
    });
    details.addEventListener("toggle", () => {
      if (!animation) desiredOpen = details.open;
    });
  });

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
