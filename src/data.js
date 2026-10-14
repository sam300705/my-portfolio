export const portfolio = {
  person: {
    name: 'Kumar Sambhav',
    role: 'Software Developer | JavaScript & TypeScript',
    location: 'Greater Noida, India',
    graduation: 'Expected May 2027',
    email: 'krsambhav05@gmail.com',
    github: 'https://github.com/sam300705',
    linkedin: 'https://in.linkedin.com/in/kumar-sambhav1',
    portfolio: 'https://sambhavcodes.in',
    resume: '/assets/Kumar-Sambhav-Software-Developer-Resume.pdf',
    portrait: '/assets/kumar-sambhav.webp'
  },
  projects: [
    {
      id: 'agentshield',
      number: '01',
      eyebrow: 'Flagship · Policy-as-Code',
      title: 'AgentShield',
      subtitle: 'AI Agent Security Control Plane',
      description: 'A TypeScript monorepo that scans agent-generated changes, evaluates declarative rules, preserves evidence, and routes risk toward explanation, remediation, or human approval.',
      problem: 'AI coding agents can edit code, infrastructure, dependencies, and workflows faster than conventional review processes can absorb.',
      architecture: 'React + Vite dashboard · Express API · shared Zod contracts · deterministic scanner and policy packages · Prisma + PostgreSQL',
      evidence: ['Static checks for secrets, Dockerfiles, Kubernetes manifests, agent workflow logs, and dependency inventory', 'Four explicit outcomes: ALLOW, WARN, REQUIRE_APPROVAL, BLOCK', 'Versioned rule snapshots, findings views, approval queues, remediation playbooks, and audit events'],
      boundaries: 'The dependency inventory is SBOM-style and is not presented as a full CVE scanner. The portfolio walkthrough is a deterministic demonstration, not a live security scan.',
      repo: 'https://github.com/sam300705/Agentshield',
      demo: null,
      tags: ['TypeScript', 'React', 'Express', 'PostgreSQL'],
      status: 'Currently building'
    },
    {
      id: 'neuroinsight',
      number: '02',
      eyebrow: 'Flagship · Responsible AI research',
      title: 'NeuroInsight AI',
      subtitle: 'Non-Diagnostic MRI Research Dashboard',
      description: 'A research-oriented TypeScript, React, and Express application that makes upload validation, experimental result views, consent-gated history, and scientific limitations visible in the product experience.',
      problem: 'Experimental medical-imaging interfaces need to communicate uncertainty, privacy boundaries, and deployment gates instead of implying clinical authority.',
      architecture: 'React + TypeScript client · Express application layer · separate FastAPI validation service · protected derived artifacts · documented dataset provenance',
      evidence: ['English/Hindi interface with accessible navigation and persistent non-diagnostic messaging', 'Corrupt-upload validation, consent-gated history, and retention of derived artifacts plus anonymous metadata', 'Raw MRI uploads and patient identifiers are excluded; dataset provenance, limitations, and release gates are documented'],
      boundaries: 'This is an academic research dashboard, not a medical device. No clinical accuracy, patient benefit, or diagnostic capability is claimed.',
      repo: 'https://github.com/sam300705/neuroinsight-ai',
      demo: 'https://neuroaiapp-gtbxy6cw.manus.space',
      tags: ['TypeScript', 'React', 'Express', 'Responsible AI'],
      status: 'Research prototype'
    },
    {
      id: 'secondyouth',
      number: '03',
      eyebrow: 'Additional engineering work',
      title: 'SecondYouth',
      subtitle: 'Offline-first senior-assistance product demo',
      description: 'A React and Vite product demo combining medicine schedules, trusted contacts, emergency actions, location checks, camera scenarios, and private audio memories.',
      evidence: ['Local-first persistence through localStorage and IndexedDB; the deployed demo does not upload this information', 'Browser-native flows for geolocation, camera, audio recording, voice navigation, notifications, and offline caching', 'Explicit production prerequisites for authentication, cloud sync, notifications, and safety review'],
      boundaries: 'A portfolio demonstration, not a medical device or a substitute for emergency services.',
      repo: 'https://github.com/sam300705/SecondYouth',
      demo: 'https://vridhcare.in',
      tags: ['React', 'Vite', 'JavaScript'],
      status: 'Product demo'
    },
    {
      id: 'imgflow',
      number: '04',
      eyebrow: 'Additional engineering work',
      title: 'ImgFlow',
      subtitle: 'Open-source Go image workflow CLI',
      description: 'A Unix-friendly CLI for palette conversion, compression, OCR, format conversion, terminal previews, GIFs, background removal, effects, and pipes.',
      evidence: ['Command-oriented workflows for image conversion and effects', 'Terminal previews, palette themes, and Unix pipes/redirection', 'Repository documentation for installation, source builds, and supported workflows'],
      boundaries: 'Capabilities shown are repository-documented commands, not usage or adoption claims.',
      repo: 'https://github.com/sam300705/imgflow',
      demo: null,
      tags: ['Go', 'Linux', 'CLI'],
      status: 'Open source'
    },
    {
      id: 'scopeledger',
      number: '05',
      eyebrow: 'Flagship · B2B workflow pilot',
      title: 'ScopeLedger',
      subtitle: 'Evidence-led change control for service teams',
      description: 'A working pilot for fixed-scope service firms: capture the original agreement, calculate the cost of extra work, and retain the decision trail.',
      problem: 'Scope changes become difficult to price or defend when approvals, dates, and original agreements live across disconnected messages.',
      architecture: 'Workspace-scoped authorization · role-aware workflows · server-priced change requests · version checks · history and export',
      evidence: ['Company workspace isolation on API operations with owner, editor, reviewer and viewer roles', 'Server-calculated change prices in integer minor units and lifecycle transitions with version checks', 'Approval evidence, atomic activity/history records, searchable views, and guarded CSV export'],
      boundaries: 'A working internal B2B pilot, not a general public SaaS or certified billing platform. Hosting access limits the audience.',
      repo: 'https://github.com/sam300705/scopeledger',
      demo: null,
      tags: ['B2B', 'Authorization', 'Audit history', 'Workflow'],
      status: 'Internal pilot'
    },
  ],
  archive: [
    { title: 'EstateFlow', category: 'Product engineering', summary: 'Demo-first real-estate CRM with lead tracking, pipeline filters, and a PostgreSQL-ready schema.', status: 'Functional demo · persistence planned', repo: 'https://github.com/sam300705/estateflow', stack: 'Next.js / TypeScript' },
    { title: 'AdmissionOS', category: 'Product engineering', summary: 'Demo-first admissions CRM for enquiries, counselling, course interests, and follow-ups.', status: 'Functional demo · persistence planned', repo: 'https://github.com/sam300705/admissionos', stack: 'Next.js / TypeScript' },
    { title: 'NewsOS', category: 'Product experiment', summary: 'A news-oriented application whose development work remains on a feature branch.', status: 'Development branch', repo: 'https://github.com/sam300705/newsos', stack: 'Application prototype' },
    { title: 'JobRadar AI', category: 'Applied AI', summary: 'Job-discovery and application-workflow experiment; inspect the repository for current capabilities.', status: 'Experimental', repo: 'https://github.com/sam300705/JobRadar-AI', stack: 'AI / workflow' },
    { title: 'Interactive Wall Calendar', category: 'Interface experiment', summary: 'Calendar-interface exploration built as an independent prototype.', status: 'Prototype', repo: 'https://github.com/sam300705/interactive-wall-calendar', stack: 'Web interface' },
    { title: 'MRO Equipment Health Monitor', category: 'Desktop tooling', summary: 'WinForms sensor-data viewer with thresholds, visual alerts, charts, and PDF reporting.', status: 'Desktop demo', repo: 'https://github.com/sam300705/mro-equipment-health-monitor', stack: 'C# / .NET' },
    { title: 'Predictive RUL Estimation', category: 'ML research', summary: 'NASA CMAPSS FD001 engine remaining-useful-life experiment using feature engineering and a Random Forest model.', status: 'Research notebook', repo: 'https://github.com/sam300705/Predictive-RUL-Estimation', stack: 'Python / ML' },
    { title: 'Technical Strategy Copilot', category: 'AI exploration', summary: 'An early technical-planning copilot idea with an initialized repository.', status: 'Empty repository · concept only', repo: 'https://github.com/sam300705/technical-strategy-copilot', stack: 'Concept' }
  ],
  skills: [
    { group: 'Secure systems', items: ['TypeScript', 'Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'SQL'] },
    { group: 'Applied AI', items: ['Python', 'ML research', 'Model evaluation', 'Explainability'] },
    { group: 'Product engineering', items: ['JavaScript', 'React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'] },
    { group: 'Developer workflow', items: ['Git', 'GitHub', 'Go', 'CLI tooling'] }
  ],
  education: {
    degree: 'B.Tech in Computer Science and Information Technology',
    institution: 'Dronacharya Group of Institutions, Greater Noida',
    university: 'AKTU',
    dates: '2023 — 2027',
    coursework: 'Data structures and algorithms · DBMS · Object-oriented programming fundamentals'
  },
  sourceNotes: {
    resume: 'The latest supplied resume PDF was not present in the workspace at implementation time. The repository’s existing PDF is retained only as a temporary fallback and is not relinked under the new filename.',
    linkedin: 'The public profile redirected to LinkedIn’s authwall in the audit environment and could not be independently verified.'
  }
};

export const policyDemo = {
  file: 'agent-config.yml',
  change: '+ allow_shell: true',
  outcome: 'REQUIRE_APPROVAL',
  reason: 'Shell execution is enabled for an agent workflow. The rule permits review, but requires a human approval before the change is accepted.',
  rule: 'AS-AGENT-004 · version 1.2',
  severity: 'HIGH'
};
