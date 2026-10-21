import Image from "next/image";
import Link from "next/link";
import { Arrow, Brand } from "@/components/Icon";
import Architecture from "@/components/Architecture";
import ImageComparison from "@/components/ImageComparison";
import CopyEmail from "@/components/Contact";
import { MotionToggle } from "@/components/Motion";
import {
  certificates,
  identity,
  process,
  projects,
  workbench,
} from "@/lib/content";
import styles from "./page.module.scss";

function SectionLabel({
  number,
  children,
  aside,
}: {
  number: string;
  children: React.ReactNode;
  aside?: string;
}) {
  return (
    <div className="section-label">
      <span>
        {number} / {children}
      </span>
      {aside && <span>{aside}</span>}
    </div>
  );
}
function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="tags" aria-label="Project technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export default function Home() {
  const [agent, youth, imgflow] = projects;
  return (
    <>
      <main id="main">
        <section
          className={`shell ${styles.hero}`}
          aria-labelledby="hero-heading"
        >
          <div className={styles.heroCopy}>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              KUMAR SAMBHAV / SOFTWARE ENGINEERING
            </p>
            <h1 id="hero-heading">
              Make it work.
              <br />
              Make it <em>better.</em>
            </h1>
            <p className={styles.heroIntro}>
              I’m Sambhav, a CSIT student building useful web applications — and
              learning to make each decision more considered.
            </p>
            <div className={styles.heroActions}>
              <a className="button" href="#work">
                Explore the work <Arrow down />
              </a>
              <a
                href={identity.resume}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé <Arrow />
              </a>
            </div>
            <div className={styles.heroFoot}>
              <span className="availability">
                <i />
                Open to internships
              </span>
              <span>
                Greater Noida, India <span aria-hidden="true">·</span> Class of
                2027
              </span>
            </div>
          </div>
          <div className={styles.portrait}>
            <div className={styles.portraitFrame}>
              <span className={styles.photoNote}>
                A LITTLE CODE.
                <br />A LOT OF CURIOSITY.
              </span>
              <Image
                src="/assets/kumar-sambhav-hero.webp"
                width={1263}
                height={1245}
                alt="Kumar Sambhav, wearing glasses and a cream checked shirt"
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 40vw, 460px"
                preload
                quality={75}
                fetchPriority="high"
                className={styles.portraitImage}
              />
            </div>
            <div className={styles.photoCaption}>
              <span>THE PERSON BEHIND THE PROJECTS</span>
              <span>01 / 01</span>
            </div>
          </div>
        </section>
        <div className={`shell ${styles.indexLine}`}>
          <span className="mono">SOFTWARE WITH INTENT.</span>
          <p>
            Curiosity is the starting point.
            <br />
            Working software is the conversation.
          </p>
          <div>
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              GitHub <Arrow />
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Arrow />
            </a>
          </div>
        </div>
        <section
          className={styles.work}
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="shell">
            <SectionLabel number="01" aside="THREE PUBLIC PROJECTS">
              THE WORK
            </SectionLabel>
            <div className={styles.workHeading}>
              <h2 id="work-heading">
                Different questions.
                <br />
                <em>The same care.</em>
              </h2>
              <p>
                Three ways of thinking through a problem.
                <br />
                The implementation, the trade-offs,
                <br />
                and the parts still worth improving.
              </p>
            </div>
            <article className={styles.agent} data-reveal>
              <div className={styles.projectText}>
                <p className="eyebrow">01 / SECURITY &amp; DEVELOPER TOOLING</p>
                <h3>{agent.name}</h3>
                <p className={styles.projectHeadline}>{agent.title}</p>
                <p>{agent.summary}</p>
                <Tags items={agent.stack} />
                <div className={styles.projectLinks}>
                  <Link href="/work/agentshield" className="button button-ink">
                    Inside the project <Arrow />
                  </Link>
                  <a
                    className="text-link"
                    href={agent.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository <Arrow />
                  </a>
                </div>
                <span className={styles.projectStatus}>
                  Public control-plane demo · Not production telemetry
                </span>
              </div>
              <Architecture />
            </article>
            <article className={styles.youth} data-reveal>
              <div className={styles.youthVisual}>
                <div className={styles.browserBar}>
                  <span aria-hidden="true">● ● ●</span>
                  <span>SECONDYOUTH / LOCAL DEMO</span>
                  <span aria-hidden="true">+</span>
                </div>
                <Image
                  src="/assets/projects/secondyouth-desktop.png"
                  width={1200}
                  height={800}
                  alt="Actual SecondYouth home screen with large medicine, contact, and safety controls, using synthetic demo details"
                  sizes="(max-width: 800px) 90vw, 650px"
                />
                <span className={styles.captureCaption}>
                  Actual application capture · Synthetic demo data
                </span>
              </div>
              <div className={styles.projectText}>
                <p className="eyebrow">02 / ACCESSIBLE WEB APPLICATION</p>
                <h3>{youth.name}</h3>
                <p className={styles.projectHeadline}>{youth.title}</p>
                <p>{youth.summary}</p>
                <Tags items={["React", "Offline first", "Browser APIs"]} />
                <div className={styles.projectLinks}>
                  <Link href="/work/secondyouth" className="text-link">
                    The product &amp; the boundaries <Arrow />
                  </Link>
                </div>
                <span className={styles.projectStatus}>
                  A portfolio demo, not a medical device
                </span>
              </div>
            </article>
            <article className={styles.imgflow} data-reveal>
              <div className={styles.projectText}>
                <p className="eyebrow">03 / CLI &amp; IMAGE WORKFLOWS</p>
                <h3>{imgflow.name}</h3>
                <p className={styles.projectHeadline}>{imgflow.title}</p>
                <p>
                  One command, two actual files. Drag the comparison to see the
                  palette transformation produced by the checked-out CLI.
                </p>
                <div className={styles.command}>
                  <span>THE COMMAND / ACTUALLY RUN</span>
                  <code>
                    imgflow convert input.png - -t everforest &gt; output.png
                  </code>
                </div>
                <Link href="/work/imgflow" className="text-link">
                  Follow the input to the output <Arrow />
                </Link>
                <span className={styles.projectStatus}>
                  Gowall lineage &amp; upstream attribution retained
                </span>
              </div>
              <ImageComparison />
            </article>
            <div className={styles.extraWork}>
              <span className="mono">STILL EXPLORING</span>
              <div>
                {workbench.slice(0, 2).map((project) => (
                  <a
                    key={project.name}
                    href={`https://github.com/sam300705/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <span>{project.state}</span>
                      <h3>{project.name}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <Arrow />
                  </a>
                ))}
              </div>
            </div>
            <details className="archive">
              <summary>
                <div>
                  <span className="mono">
                    SMALLER BUILDS &amp; UNFINISHED QUESTIONS
                  </span>
                  <h3>
                    From the workbench <small>08</small>
                  </h3>
                </div>
                <span className="disclosure-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="archive-list">
                {workbench.slice(2).map((project) => (
                  <a
                    href={`https://github.com/sam300705/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={project.name}
                  >
                    <div>
                      <h4>{project.name}</h4>
                      <span className="archive-state">{project.state}</span>
                      <p>{project.summary}</p>
                    </div>
                    <span>{project.stack}</span>
                    <Arrow />
                  </a>
                ))}
              </div>
            </details>
          </div>
        </section>
        <section
          id="approach"
          className={`section shell ${styles.approach}`}
          aria-labelledby="approach-heading"
        >
          <SectionLabel number="02" aside="A PRACTICE, NOT A PERFECT FORMULA">
            HOW I BUILD
          </SectionLabel>
          <div className={styles.approachHeading}>
            <h2 id="approach-heading">
              Good questions.
              <br />
              <em>Better iterations.</em>
            </h2>
            <p>
              I learn by getting a small thing working,
              <br />
              then finding the assumptions that don’t hold.
            </p>
          </div>
          <div className={styles.process}>
            {process.map(([name, title, body], index) => (
              <details key={name} name="build-process" open={index === 0}>
                <summary>
                  <span className="mono">0{index + 1}</span>
                  <h3>{name}</h3>
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </details>
            ))}
          </div>
          <p className={styles.processNote}>
            These are habits I’m developing through projects, not a claim that
            every build follows a perfect sequence.
          </p>
        </section>
        <section
          className={styles.about}
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="shell">
            <SectionLabel number="03" aside="THE PERSON, NOT JUST THE STACK">
              A LITTLE CONTEXT
            </SectionLabel>
            <div className={styles.aboutGrid}>
              <div>
                <h2 id="about-heading">
                  A builder.
                  <br />A learner.
                  <br />
                  <em>Still becoming.</em>
                </h2>
                <div className={styles.marginNote}>
                  <span aria-hidden="true">✳︎</span>
                  <p>
                    Less interested in sounding finished.
                    <br />
                    More interested in getting better.
                  </p>
                </div>
              </div>
              <div className={styles.aboutCopy}>
                <p className={styles.aboutLead}>
                  I’m Sambhav. I like the moment a small idea becomes something
                  someone can actually use.
                </p>
                <p>
                  I’m pursuing my B.Tech in Computer Science &amp; Information
                  Technology at Dronacharya Group of Institutions, Greater
                  Noida, affiliated with AKTU. I graduate in 2027.
                </p>
                <p>
                  Right now, my focus is JavaScript, TypeScript, React, and web
                  development. I’m learning more about Node.js, APIs,
                  application architecture, and how to build software with
                  clearer boundaries.
                </p>
                <p>
                  I learn by building, debugging, testing, and coming back to
                  the parts that feel unclear. That’s also how I want this
                  portfolio to read: work I can explain, with room to improve.
                </p>
                <div className={styles.learning}>
                  <span className="mono">CURRENT DIRECTION</span>
                  <p>
                    JavaScript · TypeScript · React
                    <br />
                    Web applications · APIs · Thoughtful interfaces
                  </p>
                </div>
                <a
                  className="text-link"
                  href={identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More context in my résumé <Arrow />
                </a>
              </div>
            </div>
            <div className={styles.education}>
              <span className="mono">THE CURRENT CHAPTER</span>
              <span>{identity.education}</span>
              <span>2023 — 2027</span>
            </div>
          </div>
        </section>
        <section
          id="certifications"
          className={`section shell ${styles.certifications}`}
          aria-labelledby="certifications-heading"
        >
          <SectionLabel
            number="04"
            aside="COURSES, TRAINING &amp; A JOB SIMULATION"
          >
            LEARNING, DOCUMENTED
          </SectionLabel>
          <div className={styles.credentialsGrid}>
            <div>
              <h2 id="certifications-heading">
                Always a <em>student.</em>
              </h2>
              <p>
                Structured learning helps me ask better questions.
                <br />
                Applying it is the next part.
              </p>
              <span className={styles.credentialNote}>
                These records show completed learning.
                <br />
                They don’t replace evidence from the work.
              </span>
            </div>
            <div className={styles.credentials}>
              {certificates.map((cert, index) => (
                <article className={styles.credential} key={cert.title}>
                  <div>
                    <span className="mono">{cert.kind}</span>
                    <h3>{cert.title}</h3>
                    <p>{cert.issuer}</p>
                  </div>
                  <time dateTime={cert.date}>{cert.label}</time>
                  <div className={styles.credentialLinks}>
                    <a
                      className="text-link"
                      href={`/assets/certificates/${cert.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View certificate PDF: ${cert.title}`}
                    >
                      View certificate <span>PDF</span>
                      <Arrow />
                    </a>
                    {"verify" in cert && (
                      <a
                        className="text-link"
                        href={cert.verify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify credential <Arrow />
                      </a>
                    )}
                  </div>
                  {index === 4 && (
                    <span className="sr-only">
                      The following records are additional training and a job
                      simulation.
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contact"
          className={styles.contact}
          aria-labelledby="contact-heading"
        >
          <div className="shell">
            <SectionLabel number="05" aside="LOOKING FOR A GOOD NEXT CHAPTER">
              LET’S TALK
            </SectionLabel>
            <div className={styles.contactGrid}>
              <div>
                <h2 id="contact-heading">
                  Something worth
                  <br />
                  <em>figuring out?</em>
                </h2>
                <p>
                  I’m looking for software engineering internships and
                  opportunities to learn by contributing. If there’s a useful
                  problem to work on, I’d like to hear about it.
                </p>
                <a className={styles.email} href={`mailto:${identity.email}`}>
                  {identity.email}
                  <Arrow />
                </a>
                <CopyEmail />
              </div>
              <div className={styles.socials}>
                <span className="mono">ELSEWHERE</span>
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <Arrow />
                </a>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <Arrow />
                </a>
                <a
                  href={identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Résumé <Arrow />
                </a>
              </div>
            </div>
            <footer className={styles.footer}>
              <Link className="brand" href="/">
                <Brand />
                <span>Kumar Sambhav</span>
              </Link>
              <p>Built with intent. Always improving.</p>
              <MotionToggle />
              <a href="#main" className="back-top">
                Back to top <Arrow down />
              </a>
              <span>© 2026</span>
            </footer>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: identity.name,
            url: "https://sambhavcodes.in",
            image: "https://sambhavcodes.in/assets/kumar-sambhav-hero.webp",
            sameAs: [identity.github, identity.linkedin],
            affiliation: {
              "@type": "CollegeOrUniversity",
              name: identity.school,
            },
            description:
              "B.Tech CSIT student, expected graduation 2027, focused on web development.",
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
