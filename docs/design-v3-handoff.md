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

### Final narrow-viewport and keyboard hardening

- Automated accessibility run now also inspects 320px.
- Browser interaction tests check recruiter dialog initial focus, Shift+Tab wrap, Tab wrap, Escape close, and trigger focus restoration.
- Do not mark these as passed until the CI run against this exact new commit succeeds.

## Dedicated case-study routes

All five featured projects link to `/case-study.html?project=...`, a multi-page Vite route using verified source material in the existing data model. The case study covers context, architecture, implementation evidence, limitations and secure repository links; unknown IDs have a safe fallback. Browser smoke tests cover AgentShield and the unknown-project case. Screenshots and extensive personal decision diaries are not invented; source assets and author narratives are remaining enhancements.

## Case-study CI failure #2 — correction

- Initial run failed in `npm test` because a newly introduced static assertion used an invalid regex `/esc\\(/`. This was a test syntax bug, not evidence of a website runtime bug.
- Replaced regex patterns with precise `.includes()` assertions and checked the test syntax.
- Runner `npm ci` reported 30 npm dependency advisories (20 moderate, 10 high). These are audit summary warnings, not investigated root causes; investigate separately without bypassing checks or running forced upgrades.

## Authoritative resume refresh: 2026-10-14

Uploaded résumé: Kumar_Sambhav_Zenskar_SDE1_Resume(1).pdf. The original résumé is unchanged and identifies **B.Tech Computer Science and Engineering**, expected May 2027. Its college-only Python/Java/C/C++ background is deliberately omitted from marketed portfolio skills at the user's request.

**Added:** research delegation credit for `Smart Sensing Air Stations with Advanced WSN and IoT Security` at EASEC-19 in Kuala Lumpur, July 2026; the published conference schedule is at https://www.ukm.my/easec19/. DGI/student public posts confirm the project title was presented by a research participant. The user’s documented role is **technical research delegation member** (literature review, diagrams, documentation, WSN security/connectivity). Paper author list, DOI, individual presentation, and indexed publication are **not verified** and are not claimed.

**Also added:** Four resume-listed training/certification entries; source-backed ScopeLedger Cloudflare Workers/D1 details; NeuroInsight experimental ResNet50/Grad-CAM. No fabricated badge links. Phone remains absent from HTML.

**Remaining PDF asset blocker:** The supplied binary PDF is mounted in the session but the connected GitHub file writer cannot ingest the local container path. The old résumé at public/assets/Kumar-Sambhav-Software-Developer-Resume.pdf is not replaced by this code commit. Original uploaded PDF SHA-256: 464f0489e7d3484d6583d68abd0a784cac562fa364751f207cdfc4a6e63c8b4b.

## Portfolio visual system refinement (2026-10-14)

- Five ground-truth, four-stage system diagrams added to homepage and dedicated case-study pages, as accessible semantic HTML.
- Diagrams are explicitly marked conceptual: no invented screenshots, customers, monitoring data or product outcomes.
- Eight-project archive is filterable: Products (4), AI (2), Systems (1), Research (1); live count and pressed-state announcements added.
- Playwright smoke and accessibility tests expanded to cover the new components and case-study route at the original six screen widths.
- No edits to downloadable résumé, no branch merge and no production deployment.

## Archive filter CI correction

- First workflow run for `b32fdab` failed its Playwright archive filter assertion.
- Root cause: calling `querySelector` via `$` and then invoking `.forEach()` on a single button node, which prevented archive filter handlers from being registered.
- Fixed both selectors to `$$` (`querySelectorAll` array helper) and added static assertions guarding collection selection.
- Follow-up run required against this corrected commit. No résumé, deployment, or production changes.
