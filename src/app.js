import { portfolio, policyDemo } from './data.js';
import './styles.css';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const external = (url) => url ? `<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">Open repository ↗</a>` : '';
const demoLink = (url) => url ? `<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">Verified public link ↗</a>` : '';

function projectMarkup(project) {
  return `<article class="project" id="${project.id}">
    <div>
      <p class="project-index mono">${project.number} / ${project.eyebrow}</p>
      <h3>${project.title}</h3>
      <p class="project-subtitle">${project.subtitle}</p>
      <p class="mono">${project.status}</p>
    </div>
    <div class="project-body">
      <p>${project.description}</p>
      <div class="project-tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
      <div class="project-evidence">${project.evidence.map((item, index) => `<div class="evidence"><strong>Evidence ${String(index + 1).padStart(2, '0')}</strong>${item}</div>`).join('')}</div>
      <p class="boundary"><strong>Boundary:</strong> ${project.boundaries}</p>
      <div class="project-links">${external(project.repo)} ${demoLink(project.demo)}</div>
    </div>
  </article>`;
}

function render() {
  const { person } = portfolio;
  document.querySelectorAll('[data-person="name"]').forEach((el) => { el.textContent = person.name; });
  document.querySelectorAll('[data-person="role"]').forEach((el) => { el.textContent = person.role; });
  document.querySelectorAll('[data-person="location"]').forEach((el) => { el.textContent = person.location; });
  document.querySelectorAll('[data-person="email"]').forEach((el) => { el.textContent = person.email; el.href = `mailto:${person.email}`; });
  document.querySelectorAll('[data-person="github"]').forEach((el) => { el.href = person.github; });
  document.querySelectorAll('[data-person="linkedin"]').forEach((el) => { el.href = person.linkedin; });
  document.querySelectorAll('[data-person="resume"]').forEach((el) => { el.href = person.resume; });
  $('#portrait').src = person.portrait;
  $('#projects').innerHTML = portfolio.projects.map(projectMarkup).join('');
  $('#skills').innerHTML = portfolio.skills.map(({ group, items }) => `<div class="skill-group"><h3>${group}</h3><div class="skill-list">${items.map((item) => `<span class="skill">${item}</span>`).join('')}</div></div>`).join('');
  $('#education-copy').innerHTML = `<div class="journey-card"><span class="mono">${portfolio.education.dates}</span><h3>${portfolio.education.degree}</h3><p>${portfolio.education.institution}</p><p>${portfolio.education.university} · Expected May 2027</p><p>${portfolio.education.coursework}</p></div><div class="journey-card"><span class="mono">Foundation</span><h3>Building through self-directed work</h3><p>Project work is presented honestly as independent software development: from problem definition through implementation, validation, documentation, and deployment preparation.</p></div>`;
}

function setupNavigation() {
  const toggle = $('#menu-toggle');
  const nav = $('#nav-links');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  $$('#nav-links a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu';
  }));
}

function setupPolicyDemo() {
  const scanButton = $('#scan-button');
  const status = $('#scan-status');
  const result = $('#scan-result');
  let scanning = false;
  scanButton.addEventListener('click', () => {
    if (scanning) return;
    scanning = true;
    result.hidden = true;
    status.textContent = 'Evaluating deterministic rule set…';
    scanButton.disabled = true;
    window.setTimeout(() => {
      status.textContent = 'Scan complete · replayable local demo';
      result.innerHTML = `<strong>${policyDemo.outcome}</strong><p>${policyDemo.reason}</p><span class="mono">${policyDemo.rule} · ${policyDemo.severity}</span>`;
      result.hidden = false;
      scanButton.disabled = false;
      scanning = false;
    }, 520);
  });
}

function setupBrief() {
  const panel = $('#brief-panel');
  const open = () => { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); $('#brief-close').focus(); document.body.style.overflow = 'hidden'; };
  const close = () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; $('#brief-open').focus(); };
  $('#brief-open').addEventListener('click', open);
  $('#brief-close').addEventListener('click', close);
  panel.addEventListener('click', (event) => { if (event.target === panel) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && panel.classList.contains('open')) close(); });
}

function setupCopyEmail() {
  const button = $('#copy-email');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(portfolio.person.email);
      button.textContent = 'Email copied';
      window.setTimeout(() => { button.textContent = 'Copy email'; }, 1800);
    } catch {
      button.textContent = portfolio.person.email;
    }
  });
}

render();
setupNavigation();
setupPolicyDemo();
setupBrief();
setupCopyEmail();
