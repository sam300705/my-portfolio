"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
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
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener("portfolio:motion-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("portfolio:motion-change", callback);
    window.removeEventListener("storage", callback);
  };
};
export function useMotionAllowed() {
  return useSyncExternalStore(
    subscribe,
    () =>
      !readPreference() &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
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
      title="Turn off optional animations and smooth scrolling"
      onClick={toggle}
    >
      {reduced ? "Motion reduced" : "Reduce motion"}
      <span aria-hidden="true">{reduced ? "−" : "↘"}</span>
    </button>
  );
}
export function MotionEnhancements() {
  const allowed = useMotionAllowed();
  const pathname = usePathname();
  useEffect(() => {
    if (!allowed) return;
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
  }, [allowed, pathname]);
  return null;
}
