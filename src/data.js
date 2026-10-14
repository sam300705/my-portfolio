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
    }
  ],
  skills: [
    { group: 'Build', items: ['JavaScript', 'TypeScript', 'React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'] },
    { group: 'Ship', items: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'SQL'] },
    { group: 'Work with others', items: ['Git', 'GitHub'] }
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
