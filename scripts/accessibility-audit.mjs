import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseURL = process.argv[2] || 'http://localhost:3001';

const pages = [
  '/',
  '/projects',
  '/career',
  '/about',
  '/skills',
  '/resume',
  '/zh-Hans/',
];

const THEMES = ['light', 'dark'];

// Read axe-core source
const axeCorePath = path.join(__dirname, '../node_modules/axe-core/axe.min.js');
let axeSource = '';
try {
  axeSource = readFileSync(axeCorePath, 'utf-8');
} catch (e) {
  console.error('Could not load axe-core from', axeCorePath);
  process.exit(1);
}

async function injectAxeCore(page) {
  // Inject axe-core from local source
  await page.addInitScript(axeSource);
}

async function runAxeAnalysis(page) {
  return await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      if (window.axe) {
        window.axe.run((error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      } else {
        reject(new Error('axe-core not loaded'));
      }
    });
  });
}

async function testPage(browser, url, theme) {
  const page = await browser.newPage();

  // Set viewport for mobile testing
  await page.setViewportSize({ width: 375, height: 667 });

  // Emulate color scheme preference
  if (theme === 'dark') {
    await page.emulateMedia({ colorScheme: 'dark' });
  } else {
    await page.emulateMedia({ colorScheme: 'light' });
  }

  try {
    await injectAxeCore(page);
    await page.goto(url, { waitUntil: 'networkidle' });
    // Wait for all animations/transitions
    await new Promise(resolve => setTimeout(resolve, 2000));

    const results = await runAxeAnalysis(page);

    await page.close();
    return results;
  } catch (error) {
    await page.close();
    throw error;
  }
}

function categorizeIssues(violations) {
  const categories = {
    'contrast': [],
    'aria': [],
    'keyboard': [],
    'touch-target': [],
    'images': [],
    'form': [],
    'focus': [],
    'color-meaning': [],
    'other': []
  };

  violations.forEach(violation => {
    if (violation.id.includes('color-contrast')) {
      categories.contrast.push(violation);
    } else if (violation.id.includes('aria') || violation.id.includes('label')) {
      categories.aria.push(violation);
    } else if (violation.id.includes('keyboard') || violation.id.includes('tabindex')) {
      categories.keyboard.push(violation);
    } else if (violation.id.includes('target-size')) {
      categories['touch-target'].push(violation);
    } else if (violation.id.includes('image-alt')) {
      categories.images.push(violation);
    } else if (violation.id.includes('form') || violation.id === 'label') {
      categories.form.push(violation);
    } else if (violation.id.includes('focus')) {
      categories.focus.push(violation);
    } else {
      categories.other.push(violation);
    }
  });

  return categories;
}

function formatViolation(violation) {
  return {
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    nodeCount: violation.nodes.length,
    samples: violation.nodes.slice(0, 2).map(node => ({
      html: node.html.substring(0, 100),
      target: node.target[0]
    }))
  };
}

(async () => {
  console.log('Starting Accessibility Audit...\n');
  console.log(`Target: ${baseURL}`);
  console.log(`Pages: ${pages.length}`);
  console.log(`Themes: ${THEMES.join(', ')}\n`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });

    const auditResults = {};
    let totalIssues = 0;

    for (const path_item of pages) {
      const url = baseURL + path_item;
      console.log(`Auditing ${path_item}...`);

      auditResults[path_item] = {
        light: null,
        dark: null,
      };

      for (const theme of THEMES) {
        try {
          const results = await testPage(browser, url, theme);
          auditResults[path_item][theme] = {
            violations: results.violations,
            passes: results.passes.length,
            categorized: categorizeIssues(results.violations)
          };
          totalIssues += results.violations.length;
          console.log(`  ${theme}: ${results.violations.length} issues`);
        } catch (error) {
          console.error(`  Error testing ${path_item} (${theme}): ${error.message}`);
          auditResults[path_item][theme] = {
            violations: [],
            passes: 0,
            error: error.message
          };
        }
      }
    }

    await browser.close();

    // Generate detailed report
    console.log('\n' + '='.repeat(80));
    console.log('ACCESSIBILITY AUDIT REPORT');
    console.log('='.repeat(80));

    const issuesByCategory = {
      'contrast': { count: 0, critical: 0 },
      'aria': { count: 0, critical: 0 },
      'keyboard': { count: 0, critical: 0 },
      'touch-target': { count: 0, critical: 0 },
      'images': { count: 0, critical: 0 },
      'form': { count: 0, critical: 0 },
      'focus': { count: 0, critical: 0 },
      'other': { count: 0, critical: 0 }
    };

    // Summary by page
    console.log('\nSUMMARY BY PAGE:\n');
    for (const [path_key, results] of Object.entries(auditResults)) {
      const lightViolations = results.light?.violations || [];
      const darkViolations = results.dark?.violations || [];
      const lightCount = lightViolations.length;
      const darkCount = darkViolations.length;

      console.log(`${path_key}:`);
      console.log(`  Light mode: ${lightCount} issues`);
      console.log(`  Dark mode: ${darkCount} issues`);

      // Categorize for totals
      if (results.light?.categorized) {
        for (const [cat, issues] of Object.entries(results.light.categorized)) {
          if (cat in issuesByCategory) {
            issuesByCategory[cat].count += issues.length;
            issuesByCategory[cat].critical += issues.filter(i => i.impact === 'critical').length;
          }
        }
      }
      if (results.dark?.categorized) {
        for (const [cat, issues] of Object.entries(results.dark.categorized)) {
          if (cat in issuesByCategory) {
            issuesByCategory[cat].count += issues.length;
            issuesByCategory[cat].critical += issues.filter(i => i.impact === 'critical').length;
          }
        }
      }
    }

    // Issues by category
    console.log('\n' + '='.repeat(80));
    console.log('ISSUES BY CATEGORY:\n');

    let hasCategoryIssues = false;
    for (const [category, stats] of Object.entries(issuesByCategory)) {
      if (stats.count > 0) {
        console.log(`${category.toUpperCase()}: ${stats.count} issues (${stats.critical} critical)`);
        hasCategoryIssues = true;
      }
    }

    if (!hasCategoryIssues) {
      console.log('No accessibility issues found across all categories!');
    }

    // Detailed violations by page and category
    console.log('\n' + '='.repeat(80));
    console.log('DETAILED VIOLATIONS:\n');

    for (const [path_key, results] of Object.entries(auditResults)) {
      console.log(`\n--- ${path_key} ---`);

      for (const theme of THEMES) {
        const themeResults = results[theme];
        if (themeResults.error) {
          console.log(`\n${theme} mode: ERROR - ${themeResults.error}`);
          continue;
        }

        console.log(`\n${theme.toUpperCase()} MODE (${themeResults.violations.length} issues):`);

        const categorized = themeResults.categorized;
        let hasIssues = false;

        for (const [category, issues] of Object.entries(categorized)) {
          if (issues.length > 0) {
            hasIssues = true;
            console.log(`\n  ${category}: ${issues.length} issue(s)`);
            issues.slice(0, 2).forEach((violation, index) => {
              const formatted = formatViolation(violation);
              console.log(`    ${index + 1}. [${formatted.impact}] ${formatted.description}`);
              console.log(`       Help: ${formatted.help}`);
              console.log(`       Affected: ${formatted.nodeCount} element(s)`);
            });
            if (issues.length > 2) {
              console.log(`    ... and ${issues.length - 2} more`);
            }
          }
        }

        if (!hasIssues) {
          console.log('  ✓ No accessibility violations found');
        }
      }
    }

    // Save detailed JSON report
    const reportPath = '/Volumes/Rin T705 M2 Drive/GitHub/rin.contact/accessibility-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));
    console.log(`\nDetailed report saved to: ${reportPath}`);

    // Final summary
    console.log('\n' + '='.repeat(80));
    console.log('AUDIT COMPLETE');
    console.log(`Total issues found: ${totalIssues}`);
    console.log('='.repeat(80));

    process.exit(totalIssues > 0 ? 1 : 0);
  } catch (error) {
    console.error('Audit failed:', error);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
