# v2 verification — 21 October 2026

Candidate branch: `feature/portfolio-v2`. Baseline: deployed production merge `0f3f9fe86eaa102fffe045453ac8c2ea277d1a80`. The v2 task does not merge or replace production.

| Check | Outcome | Evidence / scope |
| --- | --- | --- |
| ESLint | PASS | `npm run lint` |
| Strict TypeScript | PASS | `npm run typecheck` |
| Formatting | PASS | `npm run format:check` |
| Production build | PASS | Pre-rendered home, 3 cases, sitemap and new plain-text route |
| Browser regression suite | PASS | 24 tests, 25.0 seconds; Chromium with software WebGL enabled for scene coverage |
| Responsive layout | PASS | 320, 375, 390, 768, 1024, 1440 pixels |
| Accessibility automation | PASS | axe WCAG A/AA home/expanded content and case route, 390 and 1440 pixels |
| Desktop enhancement lifecycle | PASS | Scene actually renders, pauses off-screen, is disposed on motion reduction; GSAP triggers and Lenis removed; counts restored |
| System motion preference | PASS | Blocks enhancement setup, reacts to preference changes |
| Mobile behavior | PASS | Touch navigation, final readable counts, native scrolling, no canvas or desktop motion layer |
| WebGL unavailable | PASS | Forced context unavailability leaves portrait, heading and static fallback usable |
| Progressive enhancement | PASS | JavaScript-disabled menu/archive/downloads and existing case-study equivalent content |
| Text index | PASS | Plain-text response includes identity, source revisions, project limitations and all seven PDFs in order |
| Original assets | PASS | 15 original SHA256 hashes unchanged, including portrait, résumé, seven PDFs, font/license |
| Runtime dependency audit | PASS | `npm audit --omit=dev`: zero vulnerabilities at review time |
| Full dependency audit | PARTIAL | Existing development-only braces advisory remains; five affected package entries, one underlying advisory |
| Codex Security Cloud plugin scan | NOT RUN | Selected plugin exposed no callable tool; no plugin scan claimed |
| Video source inspection | BLOCKED | YouTube/NotebookLM direct access unavailable; screenshots are the implementation brief, not independently verified video evidence |
| Safari/Firefox and real assistive technology | NOT RUN | Chromium automation is not a full cross-browser or human accessibility audit |
| Real-user INP | NOT RUN | No field performance data; navigation Lighthouse cannot establish it |
| Production publication | NOT RUN | Preview first; no new production merge/domain change |

## Security review

No server API, credentials, authentication, uploads, analytics or external runtime content was added. Local dynamic imports use locked packages; renderer resources, event handlers, animation contexts and RAFs have explicit cleanup. Chunk/WebGL failures preserve static content. Text output is plain text generated from local typed data. Existing headers and original documents remain. This review is not equivalent to a dedicated penetration test or the unavailable plugin scan.

Full npm audit still reports GHSA-vfj7-8cjw-p6xm through eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces 3.0.3. Deeply nested untrusted brace patterns can exhaust the stack in the development toolchain. The reported fix suggests an incompatible framework-lint downgrade; no verified compatible patched release was applied. No audit/lint/security checks were disabled. See the original rebuild verification for the initial investigation.

## Visual iteration and artifacts

Reviewed actual desktop and mobile browser renders; reduced the first overly large/dense 3D form, retained hierarchy and natural portrait crop, and centralized the motion control after a regression test found a duplicate on case routes. Case studies keep useful differentiated evidence instead of turning every project into the same animated card.

Actual screenshots and machine-readable Lighthouse settings/results are retained with this review. Full HTML/JSON audit reports are in `/workspace/portfolio-review/v2/`. Reports use the local production build, Lighthouse 13.5.0, default simulated mobile settings / desktop preset. Software WebGL is enabled only in headless browser testing. These are lab measurements, not hosted or field performance guarantees.

## Final Lighthouse measurements

| Mode | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 96 | 100 | 100 | 100 | 2.705 s | 0 | 89 ms |
| Desktop | 100 | 100 | 100 | 100 | 0.601 s | 0 | 0 ms |

The score target (95+) passes in the final runs. LCP lab values are near the 2.5s mobile boundary; a prior run was 2.504s, so a single rounded score is not a guarantee for all devices or hosts. Host, cache and device variation require separate deployed/field review. The first mobile run with GSAP enabled scored 94 (TBT about 150ms); keeping desktop enhancement chunks off the mobile path raised the measured result to 97 (TBT 45ms) before the final camera-framing adjustment, with static final figures on phones. No audit categories or checks were disabled to raise the score. Raw numeric settings/results are in [lighthouse-summary.json](lighthouse-summary.json).
