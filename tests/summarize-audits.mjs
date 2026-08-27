import fs from 'node:fs';

const axe = JSON.parse(fs.readFileSync('/tmp/portfolio-axe-final.json', 'utf8'));
const lighthouse = JSON.parse(fs.readFileSync('/tmp/portfolio-lighthouse-final.json', 'utf8'));
console.log(JSON.stringify({
  axe: axe.map(({ width, overflow, violations, consoleErrors }) => ({ width, overflow, violations: violations.length, consoleErrors: consoleErrors.length })),
  lighthouse: Object.fromEntries(['performance', 'accessibility', 'best-practices', 'seo'].map((key) => [key, Math.round((lighthouse.categories[key]?.score || 0) * 100)])),
  lcp: lighthouse.audits['largest-contentful-paint']?.displayValue,
  cls: lighthouse.audits['cumulative-layout-shift']?.displayValue,
  inp: lighthouse.audits['interaction-to-next-paint']?.displayValue || 'not reported'
}, null, 2));
