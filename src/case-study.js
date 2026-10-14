import { portfolio } from './data.js';
import './styles.css';
import './case-study.css';
import { systemMapMarkup } from './system-map.js';

const el = document.querySelector('#case-root');
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const id = new URLSearchParams(window.location.search).get('project');
const project = portfolio.projects.find((p) => p.id === id);
const section = (key,num,label,body) => `<section class="case-section" id="${key}" aria-labelledby="${key}-title">
<p class="section-kicker">${num} / ${label}</p><div>${body}</div></section>`;
const external = (url,label) => url ? `<a class="button" href="${esc(url)}" rel="noopener noreferrer" target="_blank">${label} ↗</a>` : '';

if (!project) {
  document.title = 'Project not found | Kumar Sambhav';
  el.innerHTML = '<div class="case-missing"><p class="section-kicker">Project not found</p><h1>No case study for that link.</h1><p>The requested engineering story is not available here.</p><a class="button primary" href="/#work">Return to work ↗</a></div>';
} else {
  document.title = `${project.title} — Case Study | Kumar Sambhav`;
  const description = document.querySelector('meta[name="description"]');
  description.setAttribute('content', `${project.title}: engineering context, architecture, repository evidence and limitations.`);
  el.innerHTML = `
  <div class="case-topline"><span class="mono">KUMAR SAMBHAV / ENGINEERING NOTES</span><span class="mono">${esc(project.status)}</span></div>
  <header class="case-hero"><div><p class="section-kicker">${esc(project.number)} / ${esc(project.eyebrow)}</p>
  <h1 id="case-title">${esc(project.title)}<span class="case-dot">.</span></h1>
  <p class="case-subtitle">${esc(project.subtitle)}</p></div>
  <div><p class="case-lead">${esc(project.description)}</p><div class="project-tags">${project.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div></header>
  <div class="case-schematic">${systemMapMarkup(project.id, true)}</div>
  <div class="case-layout">
   <aside class="case-toc"><p class="mono">ON THIS PAGE</p><nav aria-label="Case study contents"><a href="#context">01 / Context</a><a href="#architecture">02 / Architecture</a><a href="#evidence">03 / Engineering evidence</a><a href="#limitations">04 / Limitations</a></nav></aside>
   <div class="case-content">
    ${section('context','01','Context',`<h2 id="context-title">What needed solving?</h2><p>${esc(project.problem || project.description)}</p>`)}
    ${section('architecture','02','Technical approach',`<h2 id="architecture-title">How it was built.</h2><p>${esc(project.architecture || 'See the source repository for documented implementation details.')}</p><div class="case-stack"><span class="mono">TECHNOLOGY</span><p>${project.tags.map(esc).join(' / ')}</p></div>`)}
    ${section('evidence','03','Implementation evidence',`<h2 id="evidence-title">What the code demonstrates.</h2><ol class="case-evidence">${project.evidence.map((entry,i)=>`<li><span class="mono">${String(i+1).padStart(2,'0')}</span><p>${esc(entry)}</p></li>`).join('')}</ol>`)}
    ${section('limitations','04','Honest boundaries',`<h2 id="limitations-title">What it does not claim.</h2><p>${esc(project.boundaries)}</p><div class="case-note">This is an independent engineering project, not evidence of unsupported production adoption or outcomes. See the repository for the current implementation.</div>`)}
   </div>
  </div>
  <section class="case-end"><p class="section-kicker">INSPECT THE ACTUAL WORK</p><h2>Proof lives in the details.</h2><div class="case-actions">
  ${external(project.repo,'View repository')} ${external(project.demo,'Open live demo')}
  <a class="button primary" href="/#work">Back to portfolio ↗</a></div></section>`;
}
