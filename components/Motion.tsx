"use client";
import { useEffect, useSyncExternalStore } from "react";
let sessionPreference = false;
const readPreference = () => {
  try {
    const value = localStorage.getItem("portfolio-motion");
    return value === null ? sessionPreference : value === "reduced";
  } catch {
    return sessionPreference;
  }
};
const subscribe = (callback: () => void) => {
  window.addEventListener("portfolio:motion-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("portfolio:motion-change", callback);
    window.removeEventListener("storage", callback);
  };
};
export function MotionToggle() {
  const reduced = useSyncExternalStore(subscribe, readPreference, () => false);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);
  const toggle = () => {
    sessionPreference = !reduced;
    try {
      localStorage.setItem(
        "portfolio-motion",
        sessionPreference ? "reduced" : "full",
      );
    } catch {}
    window.dispatchEvent(new Event("portfolio:motion-change"));
  };
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-pressed={reduced}
      onClick={toggle}
    >
      {reduced ? "Motion reduced" : "Reduce motion"}
      <span aria-hidden="true">{reduced ? "−" : "↘"}</span>
    </button>
  );
}
export function MotionEnhancements() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (
            preference.matches ||
            document.documentElement.dataset.motion === "reduced"
          )
            return;
          const animation = entry.target.animate(
            [
              { opacity: 0.7, transform: "translateY(10px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 500, easing: "cubic-bezier(.22,1,.36,1)" },
          );
          animations.add(animation);
          animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation),
          );
        });
      },
      { rootMargin: "0px 0px -20px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    const finish = () => {
      if (
        preference.matches ||
        document.documentElement.dataset.motion === "reduced"
      )
        animations.forEach((a) => a.finish());
    };
    preference.addEventListener("change", finish);
    const mutations = new MutationObserver(finish);
    mutations.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", finish);
      animations.forEach((a) => a.cancel());
    };
  }, []);
  return null;
}
