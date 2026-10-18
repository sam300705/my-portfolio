# Architecture decision: App Router, pre-rendered narrative, small interactions

## Decision

Migrate the 1,000+ line static HTML document and duplicated CSS to Next.js App Router, strict TypeScript, SCSS Modules, typed content, and pre-rendered case-study routes. The home page and all three case studies are statically generated. Use native CSS and the Web Animations API for the small amount of motion needed.

## Why a migration is useful here

The old static site was fast, simple, and functional; it did not need a framework just for visual effects. This rebuild adds reusable eight-part engineering stories, clean case-study routes, route-specific metadata, a typed evidence/content inventory, shared navigation, and responsive image delivery. Those requirements now justify component boundaries and a build step. Keeping most of the site in server components limits interactive JavaScript.

Costs include the Next/React runtime, package maintenance, a build process, and a Next-capable host. The old Python static-server deployment is no longer the development workflow. The route build output must be reviewed, and a preview validated, before replacing production.

## Components

- `app/page.tsx`: server-rendered personal narrative and differentiated project presentations.
- `app/work/[slug]/page.tsx`: pre-generated case-study template, per-route metadata, evidence links pinned to reviewed revisions, and project structured data.
- `lib/content.ts`: typed identity, project scope, evidence notes, archive, certifications, and workflow content.
- `components/Header.tsx`: accessible mobile disclosure, Escape/outside click, viewport reset.
- `components/Architecture.tsx`: small stateful source explorer with keyboard-operable tabs. A no-JavaScript text equivalent explains the complete flow; case studies always expose source notes.
- `components/ImageComparison.tsx`: keyboard/touch range control clipping two real image files. Original/output links exist on the case study without JavaScript.
- `components/Motion.tsx`: optional, one-shot entrance enhancement and a persistent motion-reduction control. Content is visible by default; no observer gates rendering.
- `components/Contact.tsx`: clipboard action with a failure message; plain mailto remains the primary contact method.
- `app/globals.scss`, page/case/architecture SCSS Modules: shared tokens with scoped layout styles.
- `public/assets/`: original files and URLs retained; actual new project screenshots and CLI artifacts added.

## Dependency decisions

Next, React, and React DOM are the runtime dependencies. SCSS, TypeScript, lint/format tools, Playwright, and axe are development tools. Versions are pinned in the lockfile. Playwright core is aligned through an override to avoid incompatible duplicate Page types in the axe adapter.

GSAP/ScrollTrigger were considered, but they add no necessary capability to the chosen interactions: there is no pinned multi-scene narrative requiring a scroll orchestration engine. WAAPI and CSS handle small, optional entrances with fewer responsibilities. Three.js, GLSL, Lenis, and Motion were omitted because the architecture explorer is clearer as accessible HTML/SVG/CSS, and native scrolling already meets the interaction goal. No database, backend API, auth, analytics, or contact form is introduced.

## Loading and security

Use Next's local font loader with the original licensed Manrope font; Georgia supplies the display italic without another download. Portrait and real project imagery use `next/image`, explicit dimensions, responsive sizes, and local files. The hero is preloaded; below-the-fold project imagery is lazy. Original asset hashes are retained for comparison.

No public runtime request is made to a third party. All GitHub/LinkedIn/issuer links are ordinary user-activated links with appropriate rel attributes. No secrets or private repo material is bundled. The application sets nosniff, a conservative referrer policy, and frame denial. No security checks were disabled to make a build or artifact download pass.

Production deployment is **not** approved. A branch-local `vercel.json` identifies the new framework for a development preview; main's old files and domain configuration remain untouched.
