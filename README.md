# Kumar Sambhav — Software with intent

A personal portfolio and three source-backed engineering case studies. Built with Next.js App Router, strict TypeScript, SCSS Modules, local fonts, and small native interactions. No application database, authentication, tracking, or third-party runtime services.

**Production:** https://sambhavcodes.in — the rebuild is developed separately on `design/software-with-intent`. Production publication requires explicit approval.

## Develop

Requires Node.js 20.9+ (Node 24 used in this review).

```sh
npm ci
npm run dev
```

Production validation:

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm test
```

Playwright uses `/usr/bin/chromium` in this cloud environment; set `CHROMIUM_PATH` for another system browser. Alternatively install Playwright's browser and adjust the config for your local environment. Tests launch their own production server on port 3100; `PLAYWRIGHT_BASE_URL` can target an already running preview.

## Structure

- `app/`: server-rendered home page, statically generated case studies, metadata, sitemap, and scoped styles.
- `components/`: shared navigation, motion preference, source architecture explorer, image comparison, contact action.
- `lib/content.ts`: typed content and evidence-pinned project links.
- `public/assets/`: the original portrait, résumé, certificate PDFs, fonts and license, plus actual project artifacts.
- `tests/`: browser, accessibility, resource, motion, history, and SEO checks.
- `docs/rebuild/`: brief, baseline, content evidence, architecture, design direction, and verification/handoff records.

The original public asset paths and original files are preserved. Certification order follows the user's request; ASEAN training and the British Airways / Forage simulation are last. Personal skills remain focused on web development.

## Evidence and boundaries

AgentShield's explorer explains inspected source; it is not a live scanner or production activity. SecondYouth imagery is captured from the actual local demo using synthetic details; it is not a medical-service claim. ImgFlow imagery is produced by one actual palette command; its Gowall lineage is attributed, and the demo does not imply authorship of every upstream feature.

[Source of truth](docs/rebuild/SOURCE_OF_TRUTH.md) · [Architecture](docs/rebuild/ARCHITECTURE.md) · [Design direction](docs/rebuild/DESIGN_DIRECTION.md) · [Baseline](docs/rebuild/BASELINE.md)

## Project links

- [AgentShield](https://github.com/sam300705/Agentshield)
- [SecondYouth](https://github.com/sam300705/SecondYouth) · [source-listed demo](https://second-youth.vercel.app/) · [source-listed custom domain](https://vridhcare.in/)
- [ImgFlow](https://github.com/sam300705/imgflow)

Live SecondYouth domains were blocked to the review environment; screenshots and test results are from the actual local application.
