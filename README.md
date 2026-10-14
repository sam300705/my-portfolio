# Kumar Sambhav | Software Developer Portfolio

A premium, evidence-driven portfolio for Kumar Sambhav, a 2027 B.Tech Computer Science and Engineering candidate building secure, reliable JavaScript and TypeScript products.

**Live production site:** [sambhavcodes.in](https://sambhavcodes.in)

## Portfolio purpose

The site presents five featured engineering case studies—AgentShield, NeuroInsight AI, SecondYouth, ImgFlow and ScopeLedger—plus eight smaller project entries, a source-backed EASEC-19 research delegation section, and four résumé-listed training records. Every displayed project claim is grounded in repository code, documentation, tests, or a verified public deployment. The site intentionally avoids unsupported usage, impact, clinical, security-guarantee, employment, and adoption claims.

## Technology stack

The implementation is a dependency-light static site using semantic HTML, modern CSS, native ES modules, and Vite for local development and production bundling. Portfolio content is centralized in `src/data.js`; behavior lives in `src/app.js`; the visual system is in `src/styles.css`.

## Local setup

```bash
npm install
npm run dev
```

To inspect the production bundle:

```bash
npm run build
npm run preview
```

## Available scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start local development server. |
| `npm run build` | Create the production bundle in `dist/`. |
| `npm run preview` | Serve the production bundle locally. |
| `npm test` | Run deterministic content and interaction wiring tests. |
| `npm run check` | Run the current test check. |
| `npm run format:check` | Check formatting when Prettier is installed. |

## Updating content

Update project, skill, education, contact, and evidence-boundary content in `src/data.js`. Keep claims tied to a repository, test, document, or verified deployment and update `docs/content-audit.md` whenever a claim changes. Do not edit LinkedIn automatically; use `docs/linkedin-alignment.md` as the review proposal.

## Testing and quality targets

The project includes deterministic Node tests for positioning, required sections, privacy rules, safe external links, project boundaries, and interactive state wiring. Before merge, run `npm install`, `npm test`, `npm run build`, and browser checks against the production preview. The target is WCAG 2.2 AA behavior, no critical or serious automated accessibility issues, Lighthouse Performance 95+, Accessibility 100, Best Practices 95+, and SEO 100 where the hosting environment permits.

## Deployment and custom-domain notes

The current site is a static custom-domain deployment at `sambhavcodes.in`. This branch does not deploy or alter the production domain. Review the branch locally or through a pull-request preview, confirm the custom domain remains attached to the default production branch, and merge only after owner approval. A rollback is a revert of the pull request or a restore of the previous `main` commit; the original implementation remains in Git history.

The current résumé download uses an older fallback PDF in `public/assets/Kumar-Sambhav-Software-Developer-Resume.pdf`. A newer authoritative résumé was uploaded on 2026-10-14 but is not yet synced to the repository because the connected GitHub writer cannot read the binary from the upload path. Replace the PDF before merging; do not claim it has been updated.

## Accessibility and privacy

The site uses semantic landmarks, a skip link, visible focus states, keyboard-accessible navigation and dialog controls, live regions for the policy walkthrough, touch-sized controls, reduced-motion CSS, safe external-link attributes, no public phone number, no tracking, and no visitor data collection.

## Documentation

- [`docs/content-audit.md`](docs/content-audit.md) — evidence and content decisions.
- [`docs/linkedin-alignment.md`](docs/linkedin-alignment.md) — proposed LinkedIn positioning and known inconsistencies.
- [`docs/final-verification-report.md`](docs/final-verification-report.md) — branch verification results, screenshots, and owner gates.

## V3 design iteration — Midnight Mineral (October 2026)

The `design/midnight-mineral-v3` branch builds on the existing V2 pull request, not on the outdated production `main`.

- Adopts deep midnight-pine, sage, warm porcelain, and limited bronze editorial accents.
- Retains the real portrait, evidence-led flagship descriptions, deterministic Policy Check, recruiter brief, résumé fallback, and existing interactions.
- Adds ScopeLedger as a fifth repository-grounded featured build.
- Adds eight additional archived projects with explicit maturity/status labels; the Technical Strategy Copilot repo is currently empty.
- Adds expandable architecture/problem context for projects, restrained rows, refined responsive typography, and an inverted contact area.
- Does not replace the authoritative résumé, modify LinkedIn, merge, or deploy.

Review `docs/design-v3-handoff.md` before merging. Validate from the final commit with npm tests, build, browser accessibility and responsive checks.

### V3 Figma / review

- [Editable desktop design](https://www.figma.com/design/MuG5GZPLCkFp4DqI6Ue5zS?node-id=21-13)
- [Editable mobile design](https://www.figma.com/design/MuG5GZPLCkFp4DqI6Ue5zS?node-id=23-2)
- [Stacked draft PR #2](https://github.com/sam300705/my-portfolio/pull/2)

V3 changes should pass `.github/workflows/portfolio-quality.yml`; verification and outstanding gates are in `docs/design-v3-handoff.md`.

### Resume-aligned research and skills

The research section credits technical delegation participation in `Smart Sensing Air Stations with Advanced WSN and IoT Security` (EASEC-19, Kuala Lumpur, July 2026). The degree is now B.Tech **CSE**, and showcased skills emphasize demonstrated JS/TS/full-stack/cloud tools rather than college-only languages. Four training entries and updated project details come from the current uploaded résumé. The downloadable PDF currently remains an older fallback pending binary asset transfer.
