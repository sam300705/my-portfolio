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
