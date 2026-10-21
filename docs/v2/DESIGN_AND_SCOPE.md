# Portfolio v2 — Human in the loop

## Input and boundary

The user supplied six NotebookLM screenshots and asked to implement a unique, professional revision. The visible material requests a dark Next/SCSS portfolio with a Three.js hero, GSAP count-ups, smooth scrolling, project hover details, a global motion switch, seven certificates in the existing order, and an `llms.txt` endpoint. The screenshots are a design brief supplied by the user, not independently verified evidence of what appears in the inaccessible YouTube video. No claim is made to have watched that video or validated NotebookLM's source attributions.

This iteration starts from production merge `0f3f9fe86eaa102fffe045453ac8c2ea277d1a80`, on `feature/portfolio-v2`. It is prepared for preview, not automatic production replacement. Local missing original assets were restored from committed bytes because preserving the portrait, résumé and certificates is an explicit requirement. The pre-revision missing-file list is retained outside the repository at `/tmp/portfolio-before-v2-status.txt`.

## Direction

Retain the custom graphite/sage/paper editorial system and authentic photograph. Refine the portrait as a numbered figure, with a precise rule, restrained glow and a single curved corner. The label “The human in the loop” connects Sambhav's real portrait with a continuous 3D line study. The line form is supplementary, never a navigation surface, and never replaces the portrait. Its geometry and styling are original implementation choices, not copied artwork.

Use typography and spacing for hierarchy. Different projects retain different visual treatments: source architecture, actual accessible-product capture, and an actual command/output comparison. Small link-arrow movement and image scaling support interaction without masking content. No synthetic terminal, fabricated contribution count, skill percentage, generated portrait, cursor takeover or preloader is added.

## Meaningful numbers

The three index figures come directly from typed content: 3 engineering case studies, 13 portfolio entries (3 featured + 10 workbench entries, including unfinished work), and 7 learning records. They describe the website inventory. They do not claim 13 production products, professional employment, sole authorship or independent certificate validation. Each figure links to its supporting content. Accessible names use the final values, so screen readers do not announce animated intermediate counts.

## Motion architecture

- Existing readable server-rendered content and small WAAPI entrance enhancements remain.
- On desktop fine-pointer devices, GSAP and ScrollTrigger load in a separate client chunk for short type entrances and one-time count-ups. A context owns all timelines and triggers; route/preference cleanup reverts them and restores final text values.
- Lenis is current `lenis`, not the obsolete `@studio-freight/lenis` package named in the screenshot. It handles desktop fine-pointer wheel smoothing only, with a single owned RAF. Native anchors, keyboard behavior and touch momentum are retained. It is destroyed on reduction/route cleanup, and the RAF pauses in hidden documents. No scroll pinning is introduced.
- Three.js loads separately after the readable hero. A low-power, DPR-capped wireframe torus knot renders at about 30fps only on desktop fine-pointer devices while visible. It pauses when off-screen, hidden, resized below its threshold or the context is lost. GPU objects/listeners/RAF are disposed on reduction/unmount. WebGL or chunk-load failure leaves the photograph and a CSS line fallback intact.
- One fixed motion control appears on every route. Manual preference persists. The operating system's reduced-motion setting takes precedence over optional motion. Neither the Three.js nor GSAP enhancement chunks are requested on initial mobile/reduced-motion render. Mobile readers see the final figures immediately, with lightweight native entrances only.
- Three/Fiber, Framer Motion and Lucide are not all installed merely because a generated brief lists them. Direct Three.js supplies the one scene; GSAP supplies the explicit count-up/sequence requirement; the existing icons and React components suffice elsewhere.

## Text index and security

`app/llms.txt/route.ts` generates a static plain-text `/llms.txt` response from the same typed identity/projects/certificates used by the interface. This avoids a duplicated static `public/llms.txt` silently drifting. It retains source revisions, attribution, project limitations and issuer links. It makes no promise of AI indexing or ranking.

No backend, analytics, secret, upload or external runtime API is introduced. Existing headers and original assets remain. The selected Codex Security Cloud plugin exposed no callable tools in this session: no plugin scan is claimed. Dependency audit and ordinary code review are separate evidence, recorded with their actual results.

## Review

Compare actual desktop/tablet/mobile renders before accepting the result. Initial review reduced an overly large/dense 3D wire form so it complements the portrait. Regression coverage verifies the motion system as a whole; it caught and fixed a duplicate motion button on case-study routes after centralizing the control in the root layout.
