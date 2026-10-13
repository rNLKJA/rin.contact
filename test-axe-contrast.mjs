import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const BASE_URL = 'http://localhost:3821';
const PAGES = [
  '/',
  '/projects',
  '/career',
  '/about',
  '/skills',
  '/resume',
  '/zh-Hans/',
];

const THEMES = ['light', 'dark'];

async function testPage(browser, url, theme) {
  const page = await browser.newPage();

  if (theme === 'dark') {
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'dark' }
    ]);
  }

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  // Wait longer for all CSS transitions to complete (most are 200-300ms)
  await new Promise(resolve => setTimeout(resolve, 2000));

  const results = await new AxePuppeteer(page)
    .withRules(['color-contrast'])
    .analyze();

  await page.close();

  return results.violations;
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  let totalViolations = 0;

  for (const pagePath of PAGES) {
    for (const theme of THEMES) {
      const url = `${BASE_URL}${pagePath}`;
      console.log(`\nTesting ${pagePath} (${theme} mode)...`);

      const violations = await testPage(browser, url, theme);

      if (violations.length > 0) {
        console.log(`  ❌ ${violations.length} color-contrast violation(s)`);
        totalViolations += violations.length;

        violations.forEach(v => {
          v.nodes.forEach(n => {
            console.log(`    - ${n.html.substring(0, 80)}...`);
            if (n.any.length > 0) {
              console.log(`      ${n.any[0].message}`);
            }
          });
        });
      } else {
        console.log(`  ✓ No violations`);
      }
    }
  }

  await browser.close();

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total color-contrast violations: ${totalViolations}`);
  console.log('='.repeat(60));

  process.exit(totalViolations > 0 ? 1 : 0);
})();
