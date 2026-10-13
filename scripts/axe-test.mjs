import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const baseURL = process.argv[2] || 'http://localhost:3821';

const pages = [
  '/',
  '/projects',
  '/career',
  '/about',
  '/skills',
  '/resume',
  '/zh-Hans/',
];

async function testPage(browser, url, theme) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Set theme
  if (theme === 'dark') {
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
  }

  const results = await new AxePuppeteer(page)
    .withRules(['color-contrast'])
    .analyze();

  await page.close();
  return results.violations;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  const results = {};

  for (const path of pages) {
    const url = baseURL + path;
    console.log(`Testing ${url}...`);

    const lightViolations = await testPage(browser, url, 'light');
    const darkViolations = await testPage(browser, url, 'dark');

    const lightContrast = lightViolations.filter(v => v.id === 'color-contrast');
    const darkContrast = darkViolations.filter(v => v.id === 'color-contrast');

    results[path] = {
      light: lightContrast.length,
      dark: darkContrast.length,
      lightDetails: lightContrast,
      darkDetails: darkContrast,
    };
  }

  await browser.close();

  console.log('\n=== Contrast Violations Summary ===\n');
  for (const [path, result] of Object.entries(results)) {
    console.log(`${path}:`);
    console.log(`  Light mode: ${result.light} violations`);
    console.log(`  Dark mode: ${result.dark} violations`);
    if (result.light > 0 || result.dark > 0) {
      const allNodes = [
        ...result.lightDetails.flatMap(v => v.nodes),
        ...result.darkDetails.flatMap(v => v.nodes),
      ];
      console.log('  Affected elements:');
      allNodes.slice(0, 3).forEach(node => {
        console.log(`    - ${node.html.substring(0, 80)}...`);
      });
    }
  }

  const totalLight = Object.values(results).reduce((sum, r) => sum + r.light, 0);
  const totalDark = Object.values(results).reduce((sum, r) => sum + r.dark, 0);
  console.log(`\nTotal: ${totalLight} light mode, ${totalDark} dark mode violations`);

  process.exit(totalLight + totalDark);
})();
