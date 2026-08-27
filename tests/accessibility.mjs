import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const results = [];
for (const width of [360, 390, 768, 1024, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  const axe = await new AxeBuilder({ page }).analyze();
  results.push({ width, overflow, violations: axe.violations.map(({ id, impact, description, nodes }) => ({ id, impact, description, nodes: nodes.map((node) => ({ html: node.html, target: node.target })) })), consoleErrors: errors });
  await context.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
if (results.some(({ overflow, violations, consoleErrors }) => overflow || violations.length || consoleErrors.length)) process.exit(1);
