import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Architecture from "@/components/Architecture";
import ImageComparison from "@/components/ImageComparison";
import { Arrow } from "@/components/Icon";
import { projects, sourceUrl, identity } from "@/lib/content";
import styles from "./case.module.scss";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project
    ? {
        title: `${project.name} — Engineering case study`,
        description: project.summary,
        alternates: { canonical: `/work/${slug}` },
        openGraph: {
          title: `${project.name} · Kumar Sambhav`,
          description: project.summary,
          url: `/work/${slug}`,
        },
      }
    : { title: "Project not found" };
}
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main">
      <div className="shell">
        <div className={styles.caseNav}>
          <Link href="/#work">← All selected work</Link>
          <span>CASE STUDY / 0{index + 1}</span>
        </div>
        <header className={styles.hero}>
          <p className="eyebrow">{project.category}</p>
          <h1>
            {project.name}
            <span>.</span>
          </h1>
          <div className={styles.heroGrid}>
            <h2>{project.title}</h2>
            <div>
              <p>{project.summary}</p>
              <span className={styles.status}>{project.status}</span>
            </div>
          </div>
          <div className={styles.meta}>
            <div>
              <span>STACK / PROJECT CONTEXT</span>
              <p>{project.stack.join(" · ")}</p>
            </div>
            <a
              className="text-link"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inspect the repository <Arrow />
            </a>
            {slug === "secondyouth" && (
              <a
                className="text-link"
                href="https://second-youth.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open public demo <Arrow />
              </a>
            )}
          </div>
        </header>
        <div className={styles.art}>
          {slug === "agentshield" ? (
            <Architecture />
          ) : slug === "secondyouth" ? (
            <>
              <Image
                src="/assets/projects/secondyouth-desktop.png"
                width={1200}
                height={800}
                alt="Actual SecondYouth local application screen, captured using synthetic demo data"
                sizes="(max-width: 800px) 90vw, 1100px"
                preload
              />
              <p>
                Actual application capture · Local product demo · Synthetic
                profile and contact data
              </p>
            </>
          ) : (
            <>
              <ImageComparison />
              <div className={styles.artifactLinks}>
                <a
                  href="/assets/projects/imgflow-input.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open input image <Arrow />
                </a>
                <a
                  href="/assets/projects/imgflow-output.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open CLI output <Arrow />
                </a>
                <a
                  href="/assets/projects/imgflow-command.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the command transcript <Arrow />
                </a>
              </div>
            </>
          )}
        </div>
        <div className={styles.story}>
          <aside>
            <span className="mono">INSIDE THE BUILD</span>
            <nav aria-label={`${project.name} case-study sections`}>
              <a href="#problem">01 / The problem</a>
              <a href="#contribution">02 / Work &amp; contribution</a>
              <a href="#architecture">03 / Architecture</a>
              <a href="#tradeoffs">04 / Trade-offs</a>
              <a href="#verification">05 / Verification</a>
              <a href="#next">06 / What’s next</a>
              <a href="#sources">07 / Source notes</a>
            </nav>
          </aside>
          <div className={styles.chapters}>
            <section id="problem">
              <span className="eyebrow">01 / THE PROBLEM</span>
              <h2>Start with the friction.</h2>
              <p>{project.problem}</p>
              <h3>Why it matters</h3>
              <p>{project.matters}</p>
            </section>
            <section id="contribution">
              <span className="eyebrow">02 / WORK &amp; CONTRIBUTION</span>
              <h2>What the work contains.</h2>
              <p>{project.role}</p>
            </section>
            <section id="architecture">
              <span className="eyebrow">03 / ARCHITECTURE</span>
              <h2>Give each part a job.</h2>
              <ol className={styles.architecture}>
                {project.architecture.map((part, i) => (
                  <li key={part.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{part.title}</h3>
                      <p>{part.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section id="tradeoffs">
              <span className="eyebrow">04 / CONSTRAINTS &amp; TRADE-OFFS</span>
              <h2>Boundaries are part of the design.</h2>
              <p>{project.tradeoff}</p>
            </section>
            <section id="verification">
              <span className="eyebrow">05 / VERIFICATION</span>
              <h2>Evidence before confidence.</h2>
              <p>{project.verification}</p>
              {slug === "secondyouth" && (
                <div className={styles.checks}>
                  <span>ESLint · PASS</span>
                  <span>Domain tests · 7 PASS</span>
                  <span>Server tests · 5 PASS</span>
                  <span>Production build · PASS</span>
                </div>
              )}
              <p className={styles.small}>
                Evidence reviewed on 18 October 2026 at the source revision
                linked below. Local checks do not establish production
                readiness.
              </p>
            </section>
            <section id="next">
              <span className="eyebrow">
                06 / PRESENT STATE &amp; NEXT STEPS
              </span>
              <h2>There’s a next iteration.</h2>
              <p>
                <strong>{project.status}.</strong> {project.next}
              </p>
            </section>
            <section id="sources">
              <span className="eyebrow">07 / FOLLOW THE SOURCE</span>
              <h2>Read past the story.</h2>
              <p>
                The source links point to the exact revision reviewed, rather
                than a moving branch.
              </p>
              <ul className={styles.sources}>
                {project.sources.map((source) => (
                  <li key={source.path}>
                    <a
                      href={sourceUrl(project, source.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        {source.label}
                        <code>{source.path}</code>
                      </span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
              <span className={styles.revision}>
                Revision {project.revision.slice(0, 12)}
              </span>
            </section>
          </div>
        </div>
        <Link className={styles.nextProject} href={`/work/${next.slug}`}>
          <span>
            <span className="mono">ANOTHER QUESTION WORTH EXPLORING</span>
            <h2>{next.name}</h2>
          </span>
          <Arrow />
        </Link>
        <footer className={styles.footer}>
          <Link href="/">Kumar Sambhav</Link>
          <a href={`mailto:${identity.email}`}>
            Have a question? Email me <Arrow />
          </a>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.summary,
            codeRepository: project.repo,
            url: `https://sambhavcodes.in/work/${project.slug}`,
            creativeWorkStatus: project.status,
            isAccessibleForFree: true,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
