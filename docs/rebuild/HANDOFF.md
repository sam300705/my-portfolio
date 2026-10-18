# Rebuild handoff

## What changed

A complete responsive Next.js rebuild on `design/software-with-intent`, with a graphite/sage identity, paper work chapter, original portrait, three engineering case-study routes, differentiated interactive project evidence, native workflow disclosures, preserved project archive, all seven linked certificates, direct contact, and optional reduced motion. Primary positioning is Sambhav's web-development direction. Unsupported personal skill groups and publication claims are not introduced.

Design, content evidence, architecture and dependency decisions are in [DESIGN_DIRECTION.md](DESIGN_DIRECTION.md), [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md), and [ARCHITECTURE.md](ARCHITECTURE.md). The migration adds typed routes and reusable narrative components; native scrolling, CSS and WAAPI meet the selected interaction requirements without GSAP/Lenis/Three dependencies.

## Review artifacts

- [Desktop](screenshots/desktop.png), [mobile](screenshots/mobile.png), [workflow](screenshots/workflow.png).
- [Verification and limitations](VERIFICATION.md).
- Original baseline revision and SHA256 inventory in `baseline/`.
- Browser regression source in `tests/portfolio.spec.ts`; CI workflow `.github/workflows/portfolio.yml` runs checks on PRs and manual dispatch.
- Full screenshots and Lighthouse HTML/JSON reports are retained outside the checkout in `/workspace/portfolio-review/software-with-intent/`.

## Publication boundary

No production merge, deployment command, or domain change is authorized by this rebuild request. `main` remains at baseline `1b868fddaf145df6f0b1fd06f1e8c1e9e7958334`. Only the development branch may be pushed and previewed. A draft PR is review material, not approval to merge.

Before production: review the real preview, content and asset links; inspect CI for the exact candidate commit; revisit the unpatched development-only braces advisory and mobile LCP limitation; approve the change; then merge/deploy through the existing Vercel workflow. Verify production routes, original downloads and mobile navigation after publication. The original commit provides a recovery reference; no history rewrite is needed.

## Environment

`npm ci`, `npm run dev`, `npm run build`, and `npm test` support the workflow. Build/lint/typecheck/format and all 19 browser tests passed locally. Saved environment install/start instructions support both the redesign branch and the unchanged original static main. Draft configuration saving does not publish the environment; review/save it in environment settings, then publish if you want a reusable snapshot. No fresh-task restoration is claimed.
