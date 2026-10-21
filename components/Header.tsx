"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow, Brand } from "./Icon";
import { identity } from "@/lib/content";
export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target as Element).closest("header")) setOpen(false);
    };
    const media = matchMedia("(min-width: 801px)");
    const onMedia = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", onMedia);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", onMedia);
    };
  }, [open]);
  const base = pathname === "/" ? "" : "/";
  return (
    <header className="site-header">
      <div className="reading-progress" aria-hidden="true" />
      <nav className="shell nav" aria-label="Primary navigation">
        <Link href="/" className="brand">
          <Brand />
          <span>
            Kumar Sambhav
            <span className="brand-role">Software engineering / CSIT ’27</span>
          </span>
        </Link>
        <div
          id="main-navigation"
          className={`navigation ${open ? "is-open" : ""}`}
          onClick={() => setOpen(false)}
        >
          <Link href={`${base}#work`}>Work</Link>
          <Link href={`${base}#approach`}>Approach</Link>
          <Link href={`${base}#about`}>About</Link>
          <Link
            href={identity.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <Arrow />
          </Link>
          <Link href={`${base}#contact`} className="nav-contact">
            Let’s talk <Arrow />
          </Link>
        </div>
        <button
          ref={button}
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
