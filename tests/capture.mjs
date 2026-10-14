import { chromium } from 'playwright';
import fs from 'node:fs';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
fs.mkdirSync('docs/screenshots', { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `docs/screenshots/${name}.png`, fullPage: true });
  await page.locator('#brief-open').click().catch(async () => { await page.locator('#menu-toggle').click(); await page.locator('#brief-open').click(); });
  await page.screenshot({ path: `docs/screenshots/${name}-recruiter-brief.png`, fullPage: false });
  await page.close();
}
await browser.close();
console.log('Captured desktop and mobile screenshots');
