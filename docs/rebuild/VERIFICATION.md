# Verification record — 18 October 2026

## Local production build

Node 24.19.0; Next 16.4.2; React 19.3.1; Playwright 1.58.2; system Chromium. Exact dependency versions are locked. These are local measurements, not production field data.

| Check | Result | Evidence / scope |
| --- | --- | --- |
| Original baseline suite | PASS | Existing static smoke suite before migration; source retained under baseline/ |
| Dependency installation | PASS | Lockfile-based installation; no trust/checksum bypass |
| ESLint | PASS | `npm run lint` |
| Strict TypeScript | PASS | `npm run typecheck` |
| Prettier | PASS | `npm run format:check` |
| Next production build | PASS | Homepage, three case studies, sitemap and not-found pre-rendered |
| Browser regression suite | PASS | 19 tests; 16.4 seconds on final application build |
| Responsive homepage | PASS | 320, 375, 390, 768, 1024, 1440 pixels; no horizontal overflow |
| Accessibility automation | PASS | axe WCAG A/AA at 390/1440 on home, expanded content and case-study route |
| Interaction checks | PASS | Architecture arrows/Home/End; range keyboard; workflow disclosure; mobile menu/Escape/outside state; clipboard success/rejection; history |
| Motion and progressive enhancement | PASS | OS reduction, persistent override, JavaScript-disabled content/navigation/downloads |
| Local resources | PASS | No unexpected 4xx resources or page errors during tests; PDF bytes valid; original asset hashes checked separately |
| Metadata/navigation | PASS | Canonicals, structured data, sitemap, robots, 404 and index redirect |
| SecondYouth source project | PASS | Its lint, 7 domain tests, 5 server tests, build, actual local screenshot |
| ImgFlow source project | PASS | Actual compiled palette conversion; limited to recorded operation |
| AgentShield full runtime | NOT RUN | PostgreSQL-backed runtime not established; source explorer only |
| Independent certification validation | NOT RUN | Original PDFs and one printed issuer link preserved; no independent issuer verification claimed |
| Research publication | UNVERIFIED | No citable authorship/publication evidence found; no publication added |
| Reference video / LinkedIn / several live reference sites | BLOCKED | HTTP 403; accessible official source documentation and public GitHub used |
| Production deployment / merge | NOT RUN | Requires user approval; development branch only |

## Dependency review

`npm audit --omit=dev`: **zero vulnerabilities** at review time.

Full `npm audit`: **PARTIAL — five high-severity package entries from one advisory**, GHSA-vfj7-8cjw-p6xm. The development-only chain is eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces 3.0.3. Deeply nested brace patterns can exhaust the stack. The latest published braces version at review was still 3.0.3. No patched compatible release was available; blindly downgrading the framework lint configuration is not a verified fix. Lint and audit checks were not weakened. Revisit upstream before production approval, and avoid processing untrusted lint patterns in the meantime. This does not establish that every possible security issue has been excluded.

## Visual iteration

Compared real desktop/mobile baseline renders against the new interface. Revised the weak, narrow desktop workflow columns into a full-width readable active panel with native disclosure fallback; increased contrast of tags/captions; fixed menu Escape focus; removed unsupported selected-project dates; corrected accessible names identified by Lighthouse; reduced portrait delivery quality while preserving its original file and improved fetch priority. The portrait is never a generated replacement.

Final screenshots cover home and all three case studies at 390/768/1440. Browser assertions cover the remaining requested widths. Automated accessibility and Chromium checks do not substitute for a complete human assistive-technology or Safari/Firefox audit.

## Lighthouse — final local production build

Lighthouse 13.5.0, headless system Chromium, navigation audits. Mobile uses Lighthouse's default simulated mobile/slow-network settings; desktop uses `--preset=desktop`. Reports are not production or field measurements. The machine-readable settings/results are in [lighthouse-summary.json](lighthouse-summary.json).

| Mode | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 96 | 100 | 100 | 100 | 2.8 s | 0 | 60 ms |
| Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |

**PARTIAL:** mobile LCP remains above the 2.5-second target despite meeting the performance score target. The initial 95/2.9s run identified missing image fetch priority; priority now passes and responsive portrait delivery dropped from about 29 KB to 21 KB in the mobile audit. Accessible-name mismatches also pass after correction. Next's shared client runtime still has unused/legacy JavaScript diagnostics. No audits were excluded to manufacture a higher score. Navigation Lighthouse does not provide real-user INP; that target remains NOT RUN until field data exists. Scores can vary with hardware, cache, host and network; the deployed preview needs separate review.
