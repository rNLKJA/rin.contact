#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const SCREENSHOT_DIR = '/Volumes/Rin T705 M2 Drive/GitHub/rin-contact-landing-preview';
const BASE_URL = 'http://localhost:3000';

async function takeScreenshots() {
  await mkdir(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch();

  const scenarios = [
    { width: 1440, height: 900, name: 'desktop', colorScheme: 'light' },
    { width: 1440, height: 900, name: 'desktop', colorScheme: 'dark' },
    { width: 390, height: 844, name: 'mobile', colorScheme: 'light' },
  ];

  for (const { width, height, name, colorScheme } of scenarios) {
    const context = await browser.newContext({
      viewport: { width, height },
      colorScheme,
      locale: 'en-AU',
    });

    const page = await context.newPage();

    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for boot sequence to complete
    await page.waitForTimeout(5000);

    const filename = join(SCREENSHOT_DIR, `${name}-${colorScheme}.png`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`✓ Saved: ${filename}`);

    await context.close();
  }

  await browser.close();
  console.log(`\n✓ All screenshots saved to: ${SCREENSHOT_DIR}`);
}

takeScreenshots().catch(console.error);
