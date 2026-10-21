import { certificates, projects, workbench } from "@/lib/content";
import styles from "./PortfolioNumbers.module.scss";
const records = [
  {
    value: projects.length,
    label: "Engineering stories",
    detail: "Architecture, decisions & trade-offs",
    href: "#work",
  },
  {
    value: projects.length + workbench.length,
    label: "Projects in the portfolio",
    detail: "Demos, pilots & work in progress",
    href: "#workbench",
  },
  {
    value: certificates.length,
    label: "Learning records",
    detail: "Original certificates, ready to open",
    href: "#certifications",
  },
];
export default function PortfolioNumbers() {
  return (
    <section
      className={`shell ${styles.numbers}`}
      aria-labelledby="numbers-heading"
    >
      <div className={styles.intro}>
        <span className="mono">A SMALL INDEX</span>
        <h2 id="numbers-heading">
          Less noise.
          <br />
          <em>More substance.</em>
        </h2>
        <p>
          A few ways into the work.
          <br />
          Every number has something behind it.
        </p>
      </div>
      <div className={styles.records}>
        {records.map((record) => (
          <a href={record.href} key={record.label} className={styles.record}>
            <span
              className={styles.value}
              aria-hidden="true"
              data-count={record.value}
            >
              {String(record.value).padStart(2, "0")}
            </span>
            <span className="sr-only">{record.value} </span>
            <span className={styles.label}>
              {record.label}
              <span aria-hidden="true">↗</span>
            </span>
            <span className={styles.detail}>{record.detail}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
