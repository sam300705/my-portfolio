"use client";
import { useId, useRef, useState } from "react";
import styles from "./Architecture.module.scss";
const stages = [
  {
    label: "Repository",
    file: "examples/vulnerable-repo",
    title: "Start with the change, not a score.",
    description:
      "An intentionally vulnerable repository supplies the demo input. No live repository or personal data is scanned by this portfolio.",
  },
  {
    label: "Scanners",
    file: "packages/scanner",
    title: "Turn a change into inspectable evidence.",
    description:
      "Deterministic scanners inspect secrets, Dockerfiles, Kubernetes manifests, agent logs, and dependency inventory. Each finding carries its source context.",
  },
  {
    label: "Policy",
    file: "packages/policy-engine",
    title: "A decision should explain itself.",
    description:
      "Versioned rules produce ALLOW, WARN, REQUIRE_APPROVAL, or BLOCK. For example, the checked-in critical-secret rule returns BLOCK; a hostPath volume requires approval.",
  },
  {
    label: "Review",
    file: "Prisma + React dashboard",
    title: "Keep the decision and its history together.",
    description:
      "Persistence and the dashboard connect findings, explanations, remediation, approvals, and audit events. Authentication and multi-tenancy remain future scope.",
  },
] as const;
export default function Architecture() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className={styles.explorer}>
      <div className={styles.caption}>
        <span>SYSTEM EXPLORER</span>
        <span>Source-backed illustration</span>
      </div>
      <div
        className={styles.flow}
        role="tablist"
        aria-label="AgentShield architecture stages"
      >
        {stages.map((stage, index) => (
          <button
            ref={(el) => {
              tabs.current[index] = el;
            }}
            key={stage.label}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            className={active === index ? styles.active : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = active;
              if (event.key === "ArrowRight") next = (active + 1) % 4;
              else if (event.key === "ArrowLeft") next = (active + 3) % 4;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = 3;
              else return;
              event.preventDefault();
              setActive(next);
              tabs.current[next]?.focus();
            }}
          >
            <span className={styles.nodeNumber}>0{index + 1}</span>
            <span>{stage.label}</span>
            <span className={styles.nodeShape} aria-hidden="true">
              {["⌘", "≋", "◇", "✓"][index]}
            </span>
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className={styles.panel}
      >
        <code>{stages[active].file}</code>
        <h4>{stages[active].title}</h4>
        <p>{stages[active].description}</p>
      </div>
      <div className={styles.foot}>
        <span className={styles.dot} />
        Inspect a boundary. Follow the decision.<span>0{active + 1} / 04</span>
      </div>
      <noscript>
        <p>
          Repository → deterministic scanners → versioned policy → persisted
          decisions and review. This is an architecture illustration, not a
          running security scanner.
        </p>
      </noscript>
    </div>
  );
}
