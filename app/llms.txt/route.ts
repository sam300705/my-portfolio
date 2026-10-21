import { certificates, identity, projects, workbench } from "@/lib/content";
export const dynamic = "force-static";
export function GET() {
  const base = "https://sambhavcodes.in";
  const text = [
    `# ${identity.name}`,
    "> CSIT undergraduate focused on practical web applications and learning through building, debugging and iteration.",
    "",
    "## Identity and contact",
    `- Name: ${identity.name}; familiar name: ${identity.familiarName}`,
    `- Education: ${identity.education}, ${identity.school}, Greater Noida; affiliated with ${identity.affiliation}; expected graduation ${identity.graduation}.`,
    "- Current direction: JavaScript, TypeScript, React and web development. Node.js, APIs, application architecture and security-conscious engineering are current learning interests, not claims of senior expertise.",
    `- Location: ${identity.location}`,
    `- Email: ${identity.email}`,
    `- GitHub: ${identity.github}`,
    `- LinkedIn: ${identity.linkedin}`,
    `- Original résumé: ${base}${identity.resume}`,
    "",
    "## Engineering case studies",
    ...projects.flatMap((project) => [
      `### ${project.name}`,
      `- Case study: ${base}/work/${project.slug}`,
      `- Repository: ${project.repo}`,
      `- Status: ${project.status}`,
      `- Summary: ${project.summary}`,
      `- Contribution context: ${project.role}`,
      `- Evidence: ${project.verification}`,
      `- Reviewed revision: ${project.revision}`,
      `- Boundaries: ${project.tradeoff}`,
      "",
    ]),
    "## Additional work",
    "Entries include pilots, academic demos and scaffolds; listing a project is not a claim of a completed production product or sole authorship.",
    ...workbench.map(
      (item) =>
        `- ${item.name}: ${item.state}. https://github.com/sam300705/${item.repo}`,
    ),
    "",
    "## Learning records",
    "These are course/training completions and a job simulation, not professional licences, employment or proof of advanced expertise. PDFs are user-provided; independent issuer verification is not claimed.",
    ...certificates.map(
      (cert, index) =>
        `${index + 1}. ${cert.title} — ${cert.issuer}; ${cert.label}; ${cert.kind}. ${base}/assets/certificates/${cert.file}${"verify" in cert ? ` Verification link printed on certificate: ${cert.verify}` : ""}`,
    ),
    "",
    "## Interpretation",
    "The site preserves the original résumé. Its CSE wording differs from the latest user-confirmed CSIT website wording. No independently verified research publication or professional employment is claimed here.",
    "This text index is an alternative way to read the portfolio. It does not guarantee search ranking, AI indexing or crawler support. Follow linked source evidence and project limitations.",
    "",
  ].join("\n");
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
