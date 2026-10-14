import { chromium } from 'playwright';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const consoleErrors = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => consoleErrors.push(error.message));
await page.goto(baseURL, { waitUntil: 'networkidle' });
if (await page.title() !== 'Kumar Sambhav | Software Developer | JavaScript & TypeScript') throw new Error('Unexpected page title');
if (await page.locator('body').evaluate((node) => node.scrollWidth > document.documentElement.clientWidth)) throw new Error('Horizontal overflow at 390px');
if (!(await page.locator('#research-paper-title').textContent()).includes('Smart Sensing Air Stations')) throw new Error('Research heading missing');
if ((await page.locator('#research-contributions li').count()) !== 3) throw new Error('Research contributions missing');
if ((await page.locator('#training-list li').count()) !== 4) throw new Error('Training items missing');
if ((await page.locator('#skills').textContent()).includes('Python')) throw new Error('Academic Python displayed in skills');
if ((await page.locator('.archive-row').count()) !== 8) throw new Error('Archive project count changed');
await page.locator('[data-archive-filter="ai"]').click();
if ((await page.locator('.archive-row:visible').count()) !== 2) {
  const debug = await page.evaluate(() => ({
    pressed: document.querySelector('[data-archive-filter="ai"]')?.getAttribute('aria-pressed'),
    status: document.querySelector('#archive-result-count')?.textContent,
    entries: [...document.querySelectorAll('.archive-row')].map(node => ({
      family: node.dataset.archiveFamily,
      hidden: node.hidden,
      display: getComputedStyle(node).display,
      visible: node.getBoundingClientRect().width > 0
    }))
  }));
  throw new Error('AI archive filter failed: ' + JSON.stringify({ debug, consoleErrors }));
}
await page.locator('[data-archive-filter="all"]').click();
if ((await page.locator('.archive-row:visible').count()) !== 8) throw new Error('Archive reset failed');
if ((await page.locator('.project .system-map').count()) !== 5) throw new Error('Featured schematic missing');
await page.locator('#scan-button').click();
await page.waitForTimeout(650);
if (!(await page.locator('#scan-result').textContent()).includes('REQUIRE_APPROVAL')) throw new Error('Policy result missing');
await page.locator('#menu-toggle').click();
await page.locator('#brief-open').click();
if (await page.locator('#brief-panel').getAttribute('aria-hidden') !== 'false') throw new Error('Recruiter Brief did not open');
if (await page.locator('#brief-close').evaluate(node => document.activeElement !== node)) throw new Error('Focus did not move into Recruiter Brief');
await page.keyboard.press('Shift+Tab');
if (!(await page.locator('#brief-panel').evaluate(node => node.contains(document.activeElement)))) throw new Error('Shift+Tab escaped Recruiter Brief');
await page.keyboard.press('Tab');
if (await page.locator('#brief-close').evaluate(node => document.activeElement !== node)) throw new Error('Tab did not wrap to first dialog control');
await page.keyboard.press('Escape');
if (await page.locator('#brief-panel').getAttribute('aria-hidden') !== 'true') throw new Error('Recruiter Brief did not close with Escape');
if (await page.locator('#brief-open').evaluate(node => document.activeElement !== node)) throw new Error('Focus did not return to recruiter brief trigger');
await page.goto(`${baseURL}/case-study.html?project=agentshield`,{waitUntil:'networkidle'});
if ((await page.locator('#case-title').textContent() || '').trim() !== 'AgentShield.') throw new Error('Case study title missing');
if ((await page.locator('.system-map-expanded .system-map-node').count()) !== 4) throw new Error('Case study schematic missing');
for(const id of ['context','architecture','evidence','limitations']) {
  if(await page.locator(`#${id}`).count() !== 1) throw new Error(`Missing case study section ${id}`);
}
await page.goto(`${baseURL}/case-study.html?project=missing`,{waitUntil:'networkidle'});
if(!(await page.locator('h1').textContent()).includes('No case study'))throw new Error('Invalid project fallback missing');
await page.goto(baseURL,{waitUntil:'networkidle'});
const resume = await page.request.get(`${baseURL}/assets/Kumar-Sambhav-Software-Developer-Resume.pdf`);
if (!resume.ok() || (resume.headers()['content-type'] || '').includes('html')) throw new Error('Resume asset is unavailable');
if (consoleErrors.length) throw new Error(`Console errors: ${consoleErrors.join('; ')}`);
console.log('Playwright smoke: passed at 390px reduced-motion viewport');
await browser.close();
