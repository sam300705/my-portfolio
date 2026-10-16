# Portfolio design and architecture

## Direction

An editorial portfolio for Kumar Sambhav: calm, precise, and personal. The design prioritizes a clear introduction, actual project substance, and an easy path to contact. It uses a consistent grid, thin rules, generous spacing, restrained illustration, and a mix of modern sans-serif and italic serif typography.

The previous page had strong content but made projects read like a long text inventory. The redesign gives projects distinct visual identities and exposes implementation details through native disclosures. Research and pilot projects retain their scope qualifications. Illustrations are explicitly labeled as sketches or concepts; they are not represented as product screenshots.

## Color and typography

| Token          | Value     | Purpose                                       |
| -------------- | --------- | --------------------------------------------- |
| Paper          | `#f8f7f4` | Warm main canvas                              |
| Surface        | `#efeee9` | About section and quiet surfaces              |
| Ink            | `#252623` | Headings, primary actions, contact background |
| Muted          | `#666760` | Supporting copy                               |
| Line           | `#d9d9d0` | Structural separators                         |
| Accent         | `#ad3b27` | Terracotta emphasis, section labels, focus    |
| Inverse accent | `#e5b59d` | Emphasis on the dark contact section          |

Manrope is self-hosted as a 34 KB Latin-subset variable WOFF. Georgia provides italic editorial accents without another font download. The font license is retained in `assets/fonts/OFL.txt`. Body copy uses readable contrast; lower-contrast diagram decoration is hidden from assistive technology and has adjacent descriptive project content.

### Research

Reviewed the following online sources during implementation:

- [Radix: Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale), read from the [official documentation source](https://github.com/radix-ui/website/blob/master/data/colors/docs/palette-composition/understanding-the-scale.mdx): separate background, interactive-state, border, and text roles rather than applying a single accent everywhere.
- [Radix Colors official palette source](https://github.com/radix-ui/colors/blob/main/src/light.ts): examined the Sand neutral scale and warm accent scales when choosing the custom ivory/charcoal/terracotta palette. The final colors are custom, not a claim of Radix's built-in contrast guarantees.
- [Manrope, Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope): official font and Open Font License source.

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), read from the [official source](https://github.com/mdn/content/blob/main/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md): follow device preferences, including when preferences change during a visit.
- [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html), read from the [official source](https://github.com/w3c/wcag/blob/main/understanding/21/animation-from-interactions.html): keep motion purposeful and allow users to suppress nonessential animation.

The Awwwards website could not be reached under this environment's network policy. No claim is made to have reviewed it. Figma tools were unavailable; the finished browser implementation is the design artifact.

## Information architecture

1. **Introduction**: name, engineering focus, real portrait, work and résumé actions, location, and internship availability.
2. **Selected work**: five projects, category filters, technical notes, and direct repository links. AgentShield leads with a system diagram; four complementary projects follow.
3. **Workbench**: an expandable archive of eight experiments and additional projects.
4. **About**: education, approach, and a concise web development skills group. Personal skill claims should reflect Sambhav’s stated knowledge, rather than be inferred from project technologies.
5. **Certifications**: seven course/training/simulation records, with five visible rows and two more in an expandable list. Seven original PDFs are served locally; the Claude Code course includes its printed verification link.
6. **Contact**: email, copy action, GitHub, LinkedIn, résumé, and back-to-top navigation.

## Technical architecture

```text
index.html                  Semantic content, metadata, project sketches, native disclosures
assets/styles.css           Tokens, components, layout, responsive rules, reduced motion
assets/main.js              Navigation, filters, clipboard, active sections, light entrance motion
assets/fonts/               Self-hosted Manrope and license
assets/                     Existing portrait, résumé, social image, favicon
scripts/smoke_test.py        Browser integration checks with an ephemeral local server
```

The site stays a static deployment: no framework runtime, package installation, backend, or build process. JavaScript progressively enhances content that is already present in HTML. Keeping semantic HTML and native `<details>` allows project notes and archive content to work without JavaScript. A no-script mobile navigation fallback preserves access to section links.

### Interaction details

- Mobile menu exposes its state with `aria-expanded`, closes after navigation or outside click, and restores focus after Escape.
- Filters are real buttons with pressed states; hidden projects leave the tab order and accessibility tree. The selected project count is announced in a live region.
- Project notes and workbench use keyboard-accessible native disclosures.
- Copy email appears only when the clipboard API is supported in a secure context. Permission failure shows a useful fallback.
- Section links use an active location indicator. Smooth anchor scrolling accounts for the sticky header.
- Motion uses a short hero sequence, staggered project entrances, position-based filter transitions, two-way disclosure expansion, and mobile-menu entrances/exits. Pointer hover effects stay small and are limited to devices with a fine pointer. Content is never hidden while waiting for a scroll observer.
- Custom animations use the native Web Animations API, with no animation dependencies. Filter changes measure card positions before and after layout changes, then animate the translation. Disclosure wrappers animate measured heights and retain native details/summary semantics, including keyboard activation and the no-JavaScript fallback.
- Rapid interactions cancel the previous animation before starting the next. Changing the device's reduced-motion preference mid-visit finishes active custom motion and makes subsequent interactions immediate. Menu state, focus, and inertness are restored when animations finish or the viewport changes.
- A thin reading-progress rule uses a native CSS scroll timeline in supporting browsers, with no JavaScript scroll listener. The fallback caches the scrollable range and batches only transform writes through requestAnimationFrame. It refreshes dimensions after resizing, restoration, disclosure changes, and filtering; enabling reduced motion switches to this immediate fallback.
- Scrolling stays native, including momentum and user interruption. Sticky navigation uses an opaque surface rather than backdrop blur. Anchor offsets track the header height at each breakpoint; mobile section entrances avoid translating large text blocks, and decorative project surfaces contain their own painting.
- The navigation collapses at 760px to leave enough room for the added Certifications link. Secondary project cards use one factual description rather than both a tagline and description.
- Decorative artwork is inline HTML/SVG and makes no network requests. There are no analytics, autoplay elements, scroll libraries, or third-party runtime calls.

## Development and verification

Serve the repository using `python3 -m http.server 8000 --bind 127.0.0.1`.

Run `python3 scripts/smoke_test.py` in an environment with Python Playwright and Chromium. The check starts and stops its own local HTTP server, covers nine viewport widths, all filter categories, notes, the workbench, mobile keyboard controls, clipboard success/failure, reduced motion, assets, and no-JavaScript mobile navigation. It also covers rapid interrupted disclosure/menu transitions, resizing an open menu, changing reduced-motion preferences during a transition, native and fallback scroll-progress behavior after document-height changes, and section-anchor clearance beneath the sticky header. It does not install packages or write generated artifacts to the repository.

Manual visual review uses desktop, tablet, and mobile browser screenshots. Automated accessibility checks supplement that review; they are not a substitute for assistive-technology user testing.

## Maintaining certifications

Credential titles, issuers, and dates were transcribed from the user-supplied certificates. Course completion and training are not presented as professional licensure or proof of advanced expertise. The Forage item is explicitly labeled a job simulation, not employment at British Airways. The personal skills section remains limited to the user's stated web-development focus.

| Credential                       | Issuer / platform              | Completion date  | Evidence                                           |
| -------------------------------- | ------------------------------ | ---------------- | -------------------------------------------------- |
| Introduction to Software Testing | Simplilearn / SkillUp          | 29 March 2026    | Original PDF                                       |
| Claude Code in Action            | Anthropic                      | 5 April 2026     | Original PDF and printed Skilljar verification URL |
| Operating Systems Basics         | Cisco Networking Academy       | 4 September 2026 | Original PDF                                       |
| Networking Basics                | Cisco Networking Academy       | 7 March 2026     | Original PDF                                       |
| Introduction to Cybersecurity    | Cisco Networking Academy       | 25 April 2025    | Original PDF                                       |
| AI Career Readiness Training     | ASEAN Foundation / ASEAN Ahead | 7 October 2026   | Original PDF                                       |
| Data Science Job Simulation      | British Airways / Forage       | 18 March 2026    | Original PDF                                       |

All seven user-supplied PDF files are copied byte-for-byte into `assets/certificates/` under readable filenames. The ASEAN Foundation and British Airways / Forage records were first transcribed from images, then linked to the matching PDFs once those files were supplied. No replacement certificate images, fabricated issuer URLs, or inferred verification endpoints were created. The printed Skilljar URL is offered as a verification action; independent online verification has not been claimed.

Add future records as semantic `.credential` articles. Include the exact title, issuer, completion date in a `<time datetime="YYYY-MM-DD">`, and a `.credential-kind` describing the document accurately. Place local PDF and issuer verification links in `.credential-links` with descriptive accessible names. Omit links when no source is available. Keep the ASEAN Foundation and British Airways / Forage credentials visible in the main list alongside the three featured courses; Networking Basics and Introduction to Cybersecurity stay in `.credentials-more`. The existing native disclosure works without JavaScript and uses the same measured-height animation as project notes when scripting is available. Update the record-count and asset assertions in `scripts/smoke_test.py` when adding records.
