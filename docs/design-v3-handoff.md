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

## Figma design handoff

Existing file: https://www.figma.com/design/MuG5GZPLCkFp4DqI6Ue5zS
- Editable V3 desktop: https://www.figma.com/design/MuG5GZPLCkFp4DqI6Ue5zS?node-id=21-13
- Editable V3 mobile: https://www.figma.com/design/MuG5GZPLCkFp4DqI6Ue5zS?node-id=23-2
- V3 variable collection: `Portfolio V3 / Midnight Mineral` (9 color variables).
- Original Figma pages untouched; V3 designs are editable concept/specification layers, not rasterized website captures.

## Verification evidence and recovery log

- PASS: GitHub source JS syntax compile checks on commit `b58ab7d`.
- PASS: 5 featured projects, 8 archived entries, unique HTML IDs, balanced CSS braces, no phone in public markup.
- PASS: Vercel **preview** for `b58ab7d` reported READY; browser UI behavior not independently proven.
- PARTIAL: V3 Figma desktop screenshot inspected; mobile screenshot initially showed text overlap because resizing reset `textAutoResize` to NONE. Fixed all 49 mobile text nodes to HEIGHT after sizing; final screenshot shows no overlap.
- NOT RUN: Automated CI and browser tests until branch workflow run completes.
- NOT RUN: Live production, which still tracks original `main`.
- Local checkout blocker: the execution container could not resolve github.com, so a direct `git clone` was not possible; GitHub connector performed non-destructive commits.

## Merge sequence

Stack is **PR #1 (V2) → PR #2 (V3)**; PR #2 targets `feature/premium-portfolio-v2`. Do not merge either without explicit owner authorization. Production remains unchanged.

### CI failure #1 — resolved in configuration

- Initial V3 workflow attempts failed during job setup: GitHub Actions rejected abbreviated `actions/checkout` hash `11bd71901bbe5b1630ceea73d27597364`.
- Root cause was an incomplete action SHA, **not** a code/test failure.
- Correction: pin the full verified action hash `11bd71901bbe5b1630ceea73d27597364c9af683`, exactly as GitHub's runner log requested.
- Follow-up: verify a new workflow run on the corrected commit and record its actual conclusion.
