# Kumar Sambhav | Web Development Portfolio

Personal portfolio for Kumar Sambhav, a B.Tech Computer Science and Information Technology student graduating in 2027 and focused on web development and useful, accessible web experiences.

**Live site:** [sambhavcodes.in](https://sambhavcodes.in)

## Highlights

- Recruiter-focused responsive portfolio with accessible navigation
- Downloadable current résumé and professional profile photo
- Project storytelling for AgentShield, SecondYouth, and ImgFlow
- SEO metadata, structured data, social preview, favicon, sitemap, and web manifest
- Responsive editorial design with self-hosted typography and project architecture sketches
- Project category filters, expandable technical notes, and a browsable workbench
- Seven course, training, and simulation credentials, with seven certificate PDFs and an issuer verification link
- Reduced-motion support, keyboard-accessible mobile navigation, and clipboard email action

## Selected projects

### AgentShield

Policy-as-code AI-agent security control plane with deterministic checks, workflow and dependency inventory, auditable decisions, remediation playbooks, risk scores, approvals, and audit trails.

[Repository](https://github.com/sam300705/Agentshield)

### SecondYouth

Enterprise-ready senior-assistance platform foundation with an offline-first React experience, secure Node API, rotating sessions, RBAC primitives, rate limiting, structured observability, and a safety-bounded AI assistant.

[Live site](https://vridhcare.in) · [Deployment](https://second-youth.vercel.app) · [Repository](https://github.com/sam300705/SecondYouth)

### ImgFlow

Open-source Go CLI for palette conversion, compression, OCR, format conversion, terminal previews, GIFs, background removal, effects, and Unix pipes and redirection.

[Repository](https://github.com/sam300705/imgflow)

## Contact

- [Portfolio](https://sambhavcodes.in)
- [GitHub](https://github.com/sam300705)
- [LinkedIn](https://www.linkedin.com/in/kumar-sambhav1/)
- [Email](mailto:krsambhav05@gmail.com)

## Local development

This is a static website. No package installation or build step is required.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Edit `index.html` for content, `assets/styles.css` for the design system, and `assets/main.js` for progressive interactions. The font is self-hosted; there are no third-party runtime requests.

### Browser checks

With Python Playwright and Chromium installed:

```sh
python3 scripts/smoke_test.py
```

The script serves the site on an ephemeral port and tests responsive layouts, project filtering, disclosures, mobile navigation, clipboard handling, reduced motion, and navigation without JavaScript. In Codex cloud these browser tools are already available. Elsewhere, install Playwright with `python3 -m pip install playwright` and its browser with `python3 -m playwright install chromium`.

See [the design and architecture notes](docs/DESIGN.md) for the palette, research sources, page structure, and implementation decisions.
