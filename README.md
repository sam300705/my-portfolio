# Kumar Sambhav | Software Developer Portfolio

A premium, evidence-driven portfolio for Kumar Sambhav, a 2027 B.Tech Computer Science and Information Technology candidate building secure, reliable JavaScript and TypeScript products.

**Live production site:** [sambhavcodes.in](https://sambhavcodes.in)

## Portfolio purpose

The site presents two flagship case studies—AgentShield and NeuroInsight AI—and keeps SecondYouth and ImgFlow as additional engineering work. Every displayed project claim is grounded in repository code, documentation, tests, or a verified public deployment. The site intentionally avoids unsupported usage, impact, clinical, security-guarantee, employment, and adoption claims.

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

The resume link currently points to `assets/Kumar-Sambhav-Software-Developer-Resume.pdf`, a clean-name fallback copied from the repository PDF because the specifically named latest supplied PDF was unavailable in the workspace. Replace that file with the authoritative latest resume before merging.

## Accessibility and privacy

The site uses semantic landmarks, a skip link, visible focus states, keyboard-accessible navigation and dialog controls, live regions for the policy walkthrough, touch-sized controls, reduced-motion CSS, safe external-link attributes, no public phone number, no tracking, and no visitor data collection.

## Documentation

- [`docs/content-audit.md`](docs/content-audit.md) — evidence and content decisions.
- [`docs/linkedin-alignment.md`](docs/linkedin-alignment.md) — proposed LinkedIn positioning and known inconsistencies.
- [`docs/final-verification-report.md`](docs/final-verification-report.md) — branch verification results, screenshots, and owner gates.
