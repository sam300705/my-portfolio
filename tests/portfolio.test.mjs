import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const data = fs.readFileSync(path.join(root, 'src/data.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');

test('new developer positioning is present and outdated positioning is absent', () => {
  assert.match(html, /Software Developer \| JavaScript & TypeScript/);
  assert.doesNotMatch(html, /AI & Data Engineer/);
  assert.doesNotMatch(html, /Associate AI/);
});

test('required navigation landmarks and sections exist', () => {
  for (const id of ['work', 'about', 'skills-section', 'journey', 'education', 'contact', 'brief-panel']) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /aria-modal="true"/);
});

test('flagship projects and safety boundaries are represented', () => {
  assert.match(data, /AgentShield/);
  assert.match(data, /NeuroInsight AI/);
  assert.match(data, /not a medical device/);
  assert.match(data, /not a live security scan/);
  assert.match(data, /ALLOW, WARN, REQUIRE_APPROVAL, BLOCK/);
});

test('public contact does not expose the phone number', () => {
  assert.doesNotMatch(html, /tel:/);
  assert.doesNotMatch(html, /8252581619/);
});

test('interactive states are wired accessibly', () => {
  assert.match(html, /aria-live/);
  assert.match(data, /REQUIRE_APPROVAL/);
  assert.match(app, /Escape/);
  assert.match(app, /navigator\.clipboard/);
  assert.match(css, /prefers-reduced-motion/);
});

test('external links use safe new-tab attributes', () => {
  const externalLinks = html.match(/target="_blank"/g) ?? [];
  const safeLinks = html.match(/rel="noopener noreferrer"/g) ?? [];
  assert.equal(externalLinks.length, safeLinks.length);
});

test('Midnight Mineral v3 identity, featured ScopeLedger, and archive remain present', () => {
  assert.match(css, /#0b1719/i);
  assert.match(css, /#b6dfc5/i);
  assert.match(html, /Software<br><span>worth<\/span>/);
  assert.match(html, /id="archive-section"/);
  assert.match(data, /ScopeLedger/);
  assert.match(data, /technical-strategy-copilot/);
  assert.match(data, /Empty repository · concept only/);
  assert.match(app, /archiveMarkup/);
  assert.match(html, /id="copyright-year"/);
});

test('recruiter brief traps keyboard focus and restores the opener', () => {
  assert.match(app, /event\.key !== 'Tab'/);
  assert.match(app, /last\.focus\(\)/);
  assert.match(app, /previousFocus/);
});

test('five case studies provide real Vite routes and source evidence', () => {
  const page = fs.readFileSync(path.join(root, 'case-study.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'src/case-study.js'), 'utf8');
  const vite = fs.readFileSync(path.join(root, 'vite.config.js'), 'utf8');
  assert.ok(app.includes('case-study.html?project='));
  assert.ok(page.includes('id="case-root"'));
  assert.ok(script.includes('portfolio.projects.find'));
  assert.ok(script.includes('project.evidence.map'));
  assert.ok(script.includes('esc('));
  assert.ok(script.includes('noopener noreferrer'));
  assert.ok(vite.includes('caseStudy'));
});

test('resume-aligned CSE degree and professional skill list omit coursework-only languages', () => {
  assert.ok(data.includes('B.Tech in Computer Science and Engineering'));
  assert.ok(!html.includes('Computer Science and Information Technology'));
  assert.ok(!html.includes('CSIT'));
  assert.ok(data.includes('Cloudflare Workers'));
  assert.ok(data.includes('Cloudflare D1'));
  const skillSlice = data.slice(data.indexOf('skills: ['), data.indexOf('research: {'));
  assert.ok(!skillSlice.includes("'Python'"));
  assert.ok(!skillSlice.includes("'Java'"));
  assert.ok(!skillSlice.includes("'C++'"));
});
test('EASEC-19 research role and certifications are represented without invented publication', () => {
  assert.ok(html.includes('id="research"'));
  assert.ok(html.includes('id="training-section"'));
  assert.ok(data.includes('Smart Sensing Air Stations with Advanced WSN and IoT Security'));
  assert.ok(data.includes('Technical Research Delegation Member'));
  assert.ok(data.includes('not been independently verified'));
  assert.ok(data.includes('Cisco Networking Academy'));
  assert.ok(data.includes('Claude Code in Action'));
  assert.ok(app.includes('research-contributions'));
});
