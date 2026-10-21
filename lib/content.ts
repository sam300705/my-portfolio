export const identity = {
  name: "Kumar Sambhav",
  familiarName: "Sambhav",
  email: "krsambhav05@gmail.com",
  location: "Greater Noida, India",
  github: "https://github.com/sam300705",
  linkedin: "https://www.linkedin.com/in/kumar-sambhav1/",
  resume: "/assets/Kumar-Sambhav-Resume.pdf",
  education: "B.Tech · Computer Science & Information Technology",
  school: "Dronacharya Group of Institutions",
  graduation: "2027",
  affiliation: "AKTU",
} as const;
export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  title: string;
  summary: string;
  repo: string;
  status: string;
  stack: readonly string[];
  revision: string;
  role: string;
  problem: string;
  matters: string;
  architecture: readonly { title: string; body: string }[];
  tradeoff: string;
  verification: string;
  next: string;
  sources: readonly { label: string; path: string }[];
};
export const projects: readonly CaseStudy[] = [
  {
    slug: "agentshield",
    name: "AgentShield",
    category: "Security & developer tooling",
    title: "Fast agents. Considered decisions.",
    summary:
      "A policy-as-code control plane for inspecting risky AI-agent changes before they reach production.",
    repo: "https://github.com/sam300705/Agentshield",
    status: "Public control-plane demo",
    revision: "c761df8e74fc42a53121a68050180b69e01e2acc",
    stack: ["TypeScript", "React", "Express", "PostgreSQL", "Prisma"],
    role: "My résumé records work on the React dashboard, Express API, deterministic scanners, and policy-decision workflows. Those parts are present in the public repository.",
    problem:
      "Coding agents can change dependencies, application code, and infrastructure faster than a reviewer can inspect every action. The missing piece is a reviewable boundary between a change and its consequences.",
    matters:
      "A finding needs context: what was detected, which rule applied, and whether a person should review the change. A risk score alone cannot explain a decision.",
    architecture: [
      {
        title: "Inspect the repository",
        body: "A repository walker feeds deterministic secret, Dockerfile, Kubernetes, workflow-log, and dependency scanners. Findings retain file-level evidence.",
      },
      {
        title: "Evaluate explicit policy",
        body: "Ordered, versioned rules match structured findings. Decisions are ALLOW, WARN, REQUIRE_APPROVAL, or BLOCK; fallback rules preserve a defined outcome.",
      },
      {
        title: "Keep the explanation",
        body: "Prisma models store findings, rule snapshots, decisions, remediation, approvals, and audit events in PostgreSQL. The React dashboard presents that history.",
      },
    ],
    tradeoff:
      "Deterministic signatures make decisions explainable, but they do not detect every secret or vulnerability. Dependency inventory is not a full CVE scanner. Authentication and multi-tenant governance remain future work in the README.",
    verification:
      "Reviewed scanner orchestration, rule matching, decision types, and persistence source at the linked revision. No automated test suite was found in that checkout, and the database-backed system was not run in this portfolio review. The explorer is a labeled explanation of the source, not a live security service.",
    next: "Add scanner regression fixtures, test policy edge cases, and validate the full database-backed workflow before expanding CI integrations.",
    sources: [
      {
        label: "Scanner orchestration",
        path: "packages/scanner/src/scanRunner.ts",
      },
      {
        label: "Policy evaluation",
        path: "packages/policy-engine/src/evaluator.ts",
      },
      { label: "Versioned rules", path: "packages/policy-engine/src/rules.ts" },
      { label: "Data model", path: "prisma/schema.prisma" },
    ],
  },
  {
    slug: "secondyouth",
    name: "SecondYouth",
    category: "Accessible web application",
    title: "Less friction. More independence.",
    summary:
      "An offline-first senior-assistance demo bringing daily routines, trusted contacts, and accessible controls together.",
    repo: "https://github.com/sam300705/SecondYouth",
    status: "Offline-first product demo",
    revision: "992e3b350e68da17b8cc6ef902d79619c912fc8f",
    stack: ["React", "Vite", "Browser APIs", "IndexedDB", "Node.js"],
    role: "The work shown is the application maintained in my public repository: device onboarding, medicine schedules, trusted contacts, and accessibility preferences, with an optional Node API foundation.",
    problem:
      "Everyday assistance is spread across reminders, contacts, and device features. For someone who needs a simpler interface, moving between those tools is part of the problem.",
    matters:
      "Large controls and clear language help, but reliability also means keeping ordinary routines usable when a network connection is unavailable.",
    architecture: [
      {
        title: "Start with the device",
        body: "React renders the product flows. Versioned localStorage records keep profile, settings, contacts, medicine schedules, and SOS history on the device.",
      },
      {
        title: "Use browser capabilities carefully",
        body: "IndexedDB stores audio memories; geolocation and media APIs are requested for explicit actions. Camera recognition scenarios are labeled demonstrations.",
      },
      {
        title: "Separate the optional backend",
        body: "An opt-in Node API contains signed tokens, rotating refresh sessions, rate limiting, structured errors, and a safety-bounded assistant. The offline demo does not require credentials.",
      },
    ],
    tradeoff:
      "Local-first storage is usable without an account, but it does not provide encrypted cloud sync, durable notifications, or production identity. A local lock screen is not server-validated authentication. The demo is not a medical device or an emergency-service guarantee.",
    verification:
      "Ran the repository’s npm run check at the linked revision: ESLint passed, 7 domain tests and 5 server tests passed, and the Vite production build passed. Screenshots were captured from the running local application using synthetic demo details.",
    next: "Validate the interface with its intended users, then address identity, consent-aware sync, durable notifications, and security/privacy review before any real-world healthcare use.",
    sources: [
      { label: "Product scope and boundaries", path: "README.md" },
      { label: "Local state and persistence", path: "src/lib/appStore.js" },
      { label: "Domain test suite", path: "src/lib/appStore.test.js" },
      { label: "Server verification", path: "server/test/server.test.mjs" },
    ],
  },
  {
    slug: "imgflow",
    name: "ImgFlow",
    category: "Open-source CLI exploration",
    title: "Small commands. Useful transformations.",
    summary:
      "Exploring palette conversion and image-processing workflows through a Go command-line tool.",
    repo: "https://github.com/sam300705/imgflow",
    status: "Public repository · upstream lineage retained",
    revision: "008d54f65cdf0a8001192424efd29704830eb649",
    stack: ["CLI", "Image processing", "Unix pipes", "Go project"],
    role: "This is my public image-tooling repository. It retains the github.com/Achno/gowall module, command names, and Achno’s MIT copyright. It is presented as an exploration/adaptation of that lineage, not as software I originated alone or evidence of Go expertise.",
    problem:
      "Image operations often require opening a separate application, repeating settings, and manually moving files. A command-line interface makes repeated transformations easier to compose.",
    matters:
      "A command is useful when its inputs and outputs are predictable. Pipes and file destinations let image processing fit into an existing workflow.",
    architecture: [
      {
        title: "Parse an explicit command",
        body: "Cobra subcommands describe conversion, effects, compression, extraction, and other operations. Shared flags define file, batch, directory, and output behavior.",
      },
      {
        title: "Transform the input",
        body: "Image processors implement the transformation while the I/O layer manages formats, input paths, and destinations. The checked-in source still uses the Gowall command name.",
      },
      {
        title: "Return a reusable artifact",
        body: "The palette comparison on this site uses files produced by the actual checked-out CLI from a generated color-card fixture, rather than a CSS filter pretending to be CLI output.",
      },
    ],
    tradeoff:
      "A broad CLI has different dependencies and failure modes for different features. The local visual example exercises one command only; it does not validate every OCR provider, compression path, or platform installer.",
    verification:
      "Built the checked-out CLI with Go 1.27.2 and ran the palette conversion with exit status 0. The input and output are distinct, valid 720 × 480 PNGs; their SHA256 values and exact command are recorded in the downloadable transcript. This validates that one conversion, not the entire feature set.",
    next: "Make upstream provenance and naming consistent, add focused input/output regression fixtures, and improve error messages before expanding the surface of the CLI.",
    sources: [
      { label: "Upstream attribution", path: "LICENSE" },
      { label: "Module identity", path: "go.mod" },
      { label: "CLI commands", path: "cmd/root.go" },
      { label: "Palette conversion", path: "cmd/convert.go" },
    ],
  },
];
export const sourceUrl = (p: CaseStudy, path: string) =>
  `${p.repo}/blob/${p.revision}/${path}`;
export const workbench = [
  {
    name: "ScopeLedger",
    summary:
      "A B2B pilot for scope changes, server-side pricing, workspace separation, and approval history.",
    stack: "React · TypeScript · Cloudflare D1",
    repo: "scopeledger",
    state: "Ongoing pilot",
  },
  {
    name: "NeuroInsight AI",
    summary:
      "An academic, non-clinical brain-MRI classification and explanation prototype. Not a diagnostic tool.",
    stack: "Research prototype · ONNX · FastAPI",
    repo: "neuroinsight-ai",
    state: "Academic prototype",
  },
  {
    name: "EstateFlow",
    summary: "A demo CRM for real-estate lead pipelines and follow-ups.",
    stack: "Next.js · PostgreSQL",
    repo: "estateflow",
    state: "MVP",
  },
  {
    name: "Interactive Wall Calendar",
    summary: "A calendar-interface prototype.",
    stack: "Next.js · TypeScript",
    repo: "interactive-wall-calendar",
    state: "Prototype",
  },
  {
    name: "AdmissionOS",
    summary: "Admissions enquiries, counselling, and fee workflows.",
    stack: "Next.js · PostgreSQL",
    repo: "admissionos",
    state: "MVP",
  },
  {
    name: "MRO Equipment Health Monitor",
    summary: "An equipment maintenance and reliability experiment.",
    stack: "ML · Reliability",
    repo: "mro-equipment-health-monitor",
    state: "Experiment",
  },
  {
    name: "NewsOS",
    summary:
      "The default branch is initialized; application work is documented as awaiting review on feat/phases-1-16.",
    stack: "Web · Product",
    repo: "newsos",
    state: "In development",
  },
  {
    name: "Predictive RUL Estimation",
    summary: "A remaining-useful-life research experiment.",
    stack: "Python · ML",
    repo: "Predictive-RUL-Estimation",
    state: "Experiment",
  },
  {
    name: "JobRadar AI",
    summary: "Early job-discovery and career-tooling experiments.",
    stack: "AI · Automation",
    repo: "JobRadar-AI",
    state: "Early work",
  },
  {
    name: "Technical Strategy Copilot",
    summary: "An early scaffold for technical planning assistance.",
    stack: "AI · Strategy",
    repo: "technical-strategy-copilot",
    state: "Scaffold",
  },
] as const;
export const certificates = [
  {
    title: "Introduction to Software Testing",
    issuer: "Simplilearn · SkillUp",
    date: "2026-03-29",
    label: "Mar 2026",
    kind: "Course completion",
    file: "introduction-to-software-testing.pdf",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "2026-03-07",
    label: "Mar 2026",
    kind: "Course completion",
    file: "networking-basics.pdf",
  },
  {
    title: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    date: "2026-09-04",
    label: "Sep 2026",
    kind: "Course completion",
    file: "operating-systems-basics.pdf",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2025-04-25",
    label: "Apr 2025",
    kind: "Course completion",
    file: "introduction-to-cybersecurity.pdf",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026-04-05",
    label: "Apr 2026",
    kind: "Course completion",
    file: "claude-code-in-action.pdf",
    verify: "https://verify.skilljar.com/c/yy6sk6home9p",
  },
  {
    title: "AI Career Readiness Training",
    issuer: "ASEAN Foundation · ASEAN Ahead",
    date: "2026-10-07",
    label: "Oct 2026",
    kind: "Training completion",
    file: "ai-career-readiness.pdf",
  },
  {
    title: "Data Science Job Simulation",
    issuer: "British Airways · Forage",
    date: "2026-03-18",
    label: "Mar 2026",
    kind: "Job simulation",
    file: "british-airways-data-science-simulation.pdf",
  },
] as const;
export const process = [
  [
    "Problem",
    "Find the friction.",
    "SecondYouth starts with everyday routines and the need for a simpler interface.",
  ],
  [
    "Research",
    "Read before reaching.",
    "AgentShield separates deterministic findings from the broader problem of vulnerability intelligence.",
  ],
  [
    "Design",
    "Make the next step clear.",
    "Large controls, explicit states, and visible explanations keep the interface understandable.",
  ],
  [
    "Architecture",
    "Draw the boundaries.",
    "Device storage, an optional API, and policy decisions have different responsibilities.",
  ],
  [
    "Implementation",
    "Build the smallest useful slice.",
    "Work through a concrete flow before expanding the surface.",
  ],
  [
    "Testing",
    "Try to prove it wrong.",
    "SecondYouth’s domain tests cover date handling, persistence, and emergency-message formatting.",
  ],
  [
    "Iteration",
    "Keep the useful questions.",
    "A demo is a starting point for user feedback, not the same thing as a finished service.",
  ],
] as const;
