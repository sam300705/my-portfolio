# v2 review handoff

A finished implementation of the user-supplied screenshot brief, developed on `feature/portfolio-v2` from the live portfolio's merge revision. Original identity, project scope, source attributions, résumé, portrait and all seven certificates remain intact.

The visible changes are a numbered portrait composition with an optional Three.js line study, short type entrances, a content-derived linked numbers index, project hover details, a single persistent motion control on every route, and a generated `/llms.txt`. The current Next/SCSS architecture is retained; direct Three.js, GSAP and current Lenis are the added runtime dependencies. Phones use native scrolling, final numbers and static hero imagery.

- [Design and scope](DESIGN_AND_SCOPE.md)
- [Verification, security limitations and lab measurements](VERIFICATION.md)
- [Desktop screenshot](screenshots/desktop.png)
- [Mobile screenshot](screenshots/mobile.png)
- [Numbers section](screenshots/numbers.png)

Build, lint, strict typecheck, formatting and all 24 local browser tests pass. Original asset hashes match. The selected Codex Security Cloud plugin could not be invoked; no plugin scan is claimed. Runtime npm audit is clean; the existing unpatched development lint-tool advisory is documented.

Only the review branch is pushed. A draft PR/preview is not a production merge. Confirm the exact branch/commit and CI/provider statuses in the final handoff, since deployment evidence is recorded after the commit exists. Main must remain `0f3f9fe86eaa102fffe045453ac8c2ea277d1a80` during this preview task.

Before publishing: review the preview's appearance, motion preference and downloads, inspect CI for the candidate commit, then obtain user approval to merge/deploy. Check production routes, files and motion behavior after publication. Hosted success must not be inferred from local tests; lab scores do not establish field INP or real-device performance.
