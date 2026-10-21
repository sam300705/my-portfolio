# Identity and evidence map

Reviewed 18 October 2026. A course completion is not proof of advanced expertise. A public repository is not proof that one person originated every line of its code. Repository inspection, local execution, self-report, and independent verification are kept distinct.

## Identity

| Item | Source | Treatment |
| --- | --- | --- |
| Kumar Sambhav; familiar name Sambhav | Latest user brief, original résumé, user correction in this chat | Name and first-person introduction retained |
| CSIT B.Tech at Dronacharya Group of Institutions, Greater Noida; AKTU; 2027 | Latest user brief | Current website wording follows this explicit request |
| Résumé wording says CSE and expected May 2027 | Original user PDF | Preserve the PDF unchanged; do not silently rewrite it to resolve the wording difference |
| Web-development focus: JavaScript, TypeScript, React | Latest brief and explicit prior correction | Primary technical positioning |
| Node.js, APIs, architecture, reliability, security | Latest brief | Learning/current direction, not senior expertise |
| Python/FastAPI/ONNX, Go and systems tooling | User previously said these are not personal skills | May occur as project context; never restored as personal skill groups |
| Internship interest | User-approved existing portfolio and latest target audience | “Open to internships” retained as self-reported intent; no availability inferred from graduation alone |
| GitHub, LinkedIn, email | Existing approved content and résumé | Original URLs retained; LinkedIn could not be fetched in this environment |

## Featured work

### AgentShield

Public repository: https://github.com/sam300705/Agentshield

Reviewed revision: `c761df8e74fc42a53121a68050180b69e01e2acc`.

- Source inspected: `packages/scanner/src/scanRunner.ts`, secret/Docker/Kubernetes/workflow scanners, `packages/policy-engine/src/evaluator.ts`, `rules.ts`, and Prisma schema.
- Corroborates the résumé's dashboard/API/scanner/policy claims at a project level. A line-by-line authorship audit was not performed.
- The default rules explicitly BLOCK critical secrets, REQUIRE_APPROVAL for hostPath volumes, and WARN on Docker `latest` tags.
- Dependency inventory is not a complete CVE scanner.
- README calls this a demo; authentication, RBAC, multi-tenancy, and deeper integrations are future scope.
- No automated test files were found in the inspected checkout. Full PostgreSQL-backed runtime was not exercised. The portfolio explorer is a labeled source explanation, not a scanner or production telemetry.

### SecondYouth

Public repository: https://github.com/sam300705/SecondYouth

Reviewed revision: `992e3b350e68da17b8cc6ef902d79619c912fc8f`.

- README and implementation establish a React offline-first senior-assistance demo; localStorage for versioned care state and IndexedDB for audio memories.
- Optional Node security/API foundation exists separately from the offline product.
- Ran `npm ci` from its lockfile, then `npm run check`: ESLint PASS, 7 domain tests PASS, 5 server tests PASS, Vite production build PASS.
- Captured the running interface with synthetic “Demo user” / “Demo contact” details, not real personal data. No emergency calls, messages, camera access, or location access were triggered.
- The screenshot is a real local product capture, not a redesigned mockup.
- The demo is not a medical device, verified authentication, durable notification system, or production healthcare service. Local success does not validate these missing capabilities.
- Existing links to vridhcare.in and second-youth.vercel.app are retained as source-provided URLs where relevant; their live behavior must not be described as locally verified.

### ImgFlow

Public repository: https://github.com/sam300705/imgflow

Reviewed revision: `008d54f65cdf0a8001192424efd29704830eb649` (default branch `master`).

- GitHub API says `fork: false`, but the checked-in module remains `github.com/Achno/gowall`, CLI usage remains `gowall`, and LICENSE says Copyright 2024 Achno. Do not describe it as software Sambhav originated alone or proof of Go expertise.
- Source-backed demonstration: compiled that revision, ran `imgflow convert input.png - -t everforest > output.png`, exit 0. Both generated files are valid, distinct 720×480 PNGs.
- Build used official Go 1.27.2 with release SHA256 verified. The initially installed `/usr/bin/go` was not the Go language SDK. A blocked module-proxy redirect for go-fitz was resolved with `GOPROXY=direct` for that pinned dependency, retaining Go sum verification. No checksum, signature, or TLS checks were disabled.
- Exact command, source revision, SDK, and input/output SHA256 values are recorded in `public/assets/projects/imgflow-command.txt`.
- This validates one palette operation, not every feature, provider, installer, or operating system.

## Preserved additional work

ScopeLedger and NeuroInsight retain the résumé's pilot / ongoing and academic non-clinical boundaries. EstateFlow, Interactive Wall Calendar, AdmissionOS, MRO Equipment Health Monitor, NewsOS, Predictive RUL Estimation, JobRadar AI, and Technical Strategy Copilot retain their existing approved titles, links, and limited status descriptions.

These archive entries were preserved rather than newly validated end-to-end. Their language must not imply additional test or deployment evidence.

NewsOS's public main revision `503dc22b206c3929dcc70a9787dedf5f28258ed6` contains an initialization README pointing to `feat/phases-1-16` pending review. The feature-branch README was also inspected; its end-to-end runtime was not exercised. It is not presented as a completed release.

## Credentials and assets

All seven uploaded certificates remain public, ordered as the user requested: Software Testing, Networking, Operating Systems, Cybersecurity, Claude Code, ASEAN AI Career Readiness, and British Airways / Forage Data Science Job Simulation. Every PDF retains its original bytes and public URL. Claude Code retains the printed Skilljar verification URL. No issuer verification was invented or independently claimed.

Original portrait and résumé are unchanged. Manrope's bundled OFL is retained. Next's image optimizer changes delivery format/size, not the stored original or the identity of the person.

## Research and publications

The résumé lists “Smart Sensing Air Stations with Advanced WSN and IoT Security”, a DGI research delegation, and EASEC-19 in July 2026. No independently citable paper with confirmed authorship, status, and publication reference was found in the accessible files or inspected repositories. No publication or award is added to the website. The original résumé remains downloadable, preserving the user's own account without inventing a research citation.

## Accessible design/engineering references

- Sarthak Sharma reference video: https://www.youtube.com/watch?v=gq8TxEyE7mo — blocked by network policy. The sequence of identity research, story, reference collection, implementation, critique, optimization, and verification comes from the user's brief; no claim to have watched the video.
- Brittany Chiang public v4 README and its linked preview image: https://github.com/bchiang7/v4 — read as a reference for clear developer positioning, project hierarchy, and source transparency. No branding, layout code, or artwork copied. Live website was blocked.
- Radix scale documentation, official source: https://github.com/radix-ui/website/blob/master/data/colors/docs/palette-composition/understanding-the-scale.mdx — separate background, border, interaction, and text roles. Final palette is custom, so built-in Radix contrast guarantees are not claimed.
- MDN reduced-motion reference, official source: https://github.com/mdn/content/blob/main/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md — system preferences and optional motion.
- Next Image official docs: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/02-components/image.mdx — responsive local assets and deferred project imagery.

The public GitHub API and production portfolio were accessible. LinkedIn, the YouTube video, Radix live docs, and the live showcase reference returned proxy 403 responses. Those limitations were recorded rather than represented as completed research.
