"use client";
import { useEffect, useRef } from "react";
import { useMotionAllowed } from "./Motion";
import styles from "./HeroCanvas.module.scss";

export default function HeroCanvas() {
  const host = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();
  useEffect(() => {
    const element = host.current;
    if (
      !element ||
      !allowed ||
      !matchMedia("(min-width: 801px) and (pointer: fine)").matches
    )
      return;
    let disposed = false;
    let cleanup = () => {};
    // Independent lazy chunk: it cannot block the portrait, text or navigation.
    const timer = window.setTimeout(async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;
        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          });
        } catch {
          element.dataset.renderState = "unavailable";
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
        camera.position.z = 6;
        const geometry = new THREE.TorusKnotGeometry(0.95, 0.22, 100, 8, 2, 3);
        const material = new THREE.MeshBasicMaterial({
          color: 0x9cbd91,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(0.4, 0.4, -0.2);
        scene.add(mesh);
        renderer.domElement.setAttribute("aria-hidden", "true");
        element.append(renderer.domElement);
        let frame = 0,
          visible = false,
          lost = false,
          last = 0;
        let pointerX = 0,
          pointerY = 0;
        const viewport = matchMedia("(min-width: 801px) and (pointer: fine)");
        const resize = () => {
          const { width, height } = element.getBoundingClientRect();
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(element);
        resize();
        const tick = (time: number) => {
          if (time - last > 32) {
            const delta = Math.min((time - last) / 1000, 0.05);
            last = time;
            mesh.rotation.y += delta * 0.09;
            mesh.rotation.x +=
              (pointerY * 0.13 + 0.4 - mesh.rotation.x) * 0.025;
            mesh.rotation.z +=
              (pointerX * 0.13 - 0.2 - mesh.rotation.z) * 0.025;
            renderer.render(scene, camera);
          }
          frame = requestAnimationFrame(tick);
        };
        const sync = () => {
          cancelAnimationFrame(frame);
          const running =
            visible && !document.hidden && !lost && viewport.matches;
          element.dataset.renderState = running ? "running" : "paused";
          if (running) {
            last = performance.now();
            frame = requestAnimationFrame(tick);
          }
        };
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          sync();
        });
        io.observe(element);
        const pointer = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          pointerX = Math.max(
            -1,
            Math.min(1, (event.clientX - box.x) / box.width - 0.5),
          );
          pointerY = Math.max(
            -1,
            Math.min(1, (event.clientY - box.y) / box.height - 0.5),
          );
        };
        const contextLost = (event: Event) => {
          event.preventDefault();
          lost = true;
          sync();
        };
        const restored = () => {
          lost = false;
          sync();
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        renderer.domElement.addEventListener("webglcontextrestored", restored);
        document.addEventListener("pointermove", pointer, { passive: true });
        document.addEventListener("visibilitychange", sync);
        viewport.addEventListener("change", sync);
        cleanup = () => {
          cancelAnimationFrame(frame);
          io.disconnect();
          ro.disconnect();
          document.removeEventListener("pointermove", pointer);
          document.removeEventListener("visibilitychange", sync);
          viewport.removeEventListener("change", sync);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          renderer.domElement.removeEventListener(
            "webglcontextrestored",
            restored,
          );
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          element.dataset.renderState = "disabled";
        };
      } catch {
        cleanup();
        element.dataset.renderState = "unavailable";
      }
    }, 1500);
    return () => {
      disposed = true;
      clearTimeout(timer);
      cleanup();
    };
  }, [allowed]);
  return (
    <div
      ref={host}
      className={styles.canvas}
      data-hero-canvas
      data-render-state="disabled"
      aria-hidden="true"
    >
      <div className={styles.fallback} />
    </div>
  );
}
