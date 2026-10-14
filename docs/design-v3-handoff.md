# Portfolio V3 — engineering handoff

**Design:** Midnight Mineral / The Engineering Editorial
**Base:** feature/premium-portfolio-v2 at 1e0be87bc60551134f653a6c7a633b3b5e275ba9
**Branch:** design/midnight-mineral-v3
**Date:** 2026-10-14

## Work completed

- Kept the V2 architecture and accessibility/privacy patterns.
- New typography, dark editorial identity, custom mark and signature photo composition.
- Expanded flagship list with the repository-supported ScopeLedger pilot.
- Preserved and displayed eight more projects with accurate prototype/demo/scaffold status.
- Exposed expandable engineering context in featured work without overclaiming external outcomes.
- Preserved policy demo, recruiter modal, safe external links, resume assets, and no public phone.

## Known limitations

- Existing résumé is a fallback and needs replacement with the current approved PDF.
- External Google Fonts require connectivity; local/system font fallbacks work.
- NewsOS application source is on a separate development branch.
- The Technical Strategy Copilot repository was empty when audited.
- Source descriptions for JobRadar AI and the wall calendar intentionally avoid unverified feature claims.
- No automatic production deployment or merge is authorized.
- Connected GitHub tooling cannot run local browser tests in this environment; preview/CI verification is required.

## Required verification before merge

`npm ci && npm test && npm run build`
`npm run test:smoke` and `npm run test:a11y` against a local preview.
Inspect 320, 390, 768, 1024, 1440px widths, keyboard dialog navigation, project links, hero photo, and page performance.
Review the live published artifact separately after any authorized deployment.
