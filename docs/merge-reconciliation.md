# V2 conflict resolution / 2026-10-14
The v2 pull request diverged from main after newer production portfolio edits. This is a **non-rewriting merge reconciliation**: parents are V2 `1e0be87bc60551134f653a6c7a633b3b5e275ba9` and production `c7375848f523cacdc44e3cef92226cc7a581e264`, with the intended Vite portfolio UI retained from V2.
Main-only latest original files are preserved by their exact existing Git object hashes:
- `assets/Kumar-Sambhav-Resume.pdf`: `0bc5559509d3bd1508f9b4939259b8386e45d9e3`
- `assets/kumar-sambhav-hero.webp`: `2ffe9da0dbbb80b0b0a1d99df9d5c37db0712291`.
Existing main `index.html` is intentionally superseded by V2's Vite-shell design as part of the redesign, not silently discarded. No production deployment and no force push took place with this reconciliation.
