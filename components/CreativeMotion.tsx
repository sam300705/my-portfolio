"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMotionAllowed } from "./Motion";

// The same preference governs GSAP, Lenis and the separate WebGL layer.
export default function CreativeMotion() {
  const allowed = useMotionAllowed();
  const pathname = usePathname();
  useEffect(() => {
    if (
      !allowed ||
      !matchMedia("(min-width: 801px) and (pointer: fine)").matches
    )
      return;
    let disposed = false;
    let cleanup = () => {};
    const timer = window.setTimeout(async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          // Text is server-rendered and never relies on an animation to be visible.
          gsap.fromTo(
            "[data-hero-line]",
            { y: 20, opacity: 0.75 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "all",
            },
          );
          document
            .querySelectorAll<HTMLElement>("[data-count]")
            .forEach((el) => {
              const target = Number(el.dataset.count);
              const value = { current: 0 };
              gsap.to(value, {
                current: target,
                duration: 1.1,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 95%", once: true },
                onUpdate: () => {
                  el.textContent = Math.round(value.current)
                    .toString()
                    .padStart(2, "0");
                },
                onComplete: () => {
                  el.textContent = target.toString().padStart(2, "0");
                },
              });
            });
        });
        document.documentElement.dataset.scrollTriggers = "active";
        let stopScroll = () => {};
        cleanup = () => {
          stopScroll();
          context.revert();
          document
            .querySelectorAll<HTMLElement>("[data-count]")
            .forEach((el) => {
              el.textContent = Number(el.dataset.count)
                .toString()
                .padStart(2, "0");
            });
          delete document.documentElement.dataset.scrollTriggers;
        };
        // Touch devices keep their platform's native momentum and gestures.
        if (matchMedia("(min-width: 1101px) and (pointer: fine)").matches) {
          const { default: Lenis } = await import("lenis");
          if (disposed) return;
          const lenis = new Lenis({
            autoRaf: false,
            lerp: 0.13,
            smoothWheel: true,
            syncTouch: false,
            anchors: false,
          });
          let frame = 0;
          const tick = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(tick);
          };
          const visibility = () => {
            cancelAnimationFrame(frame);
            if (!document.hidden) frame = requestAnimationFrame(tick);
          };
          visibility();
          document.addEventListener("visibilitychange", visibility);
          const viewport = matchMedia(
            "(min-width: 1101px) and (pointer: fine)",
          );
          const resize = () => {
            if (!viewport.matches) stopScroll();
          };
          viewport.addEventListener("change", resize);
          document.documentElement.dataset.smoothScroll = "active";
          stopScroll = () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("visibilitychange", visibility);
            viewport.removeEventListener("change", resize);
            lenis.destroy();
            delete document.documentElement.dataset.smoothScroll;
          };
        }
      } catch {
        cleanup();
      }
    }, 900);
    return () => {
      disposed = true;
      clearTimeout(timer);
      cleanup();
    };
  }, [allowed, pathname]);
  return null;
}
