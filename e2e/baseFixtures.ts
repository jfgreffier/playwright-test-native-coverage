import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page, browserName }, use, testInfo) => {
    const isCoverageSupported = browserName === 'chromium';

    if (!isCoverageSupported) {
      await use(page);
      return;
    }

    await page.coverage.startJSCoverage();
    await use(page);
    const JSCoverage = await page.coverage.stopJSCoverage();

    const coverageJSON = JSON.stringify({ result: JSCoverage }, null, 2);
    testInfo.attach('coverage', { body: coverageJSON });
  },
});

export const expect = test.expect;
