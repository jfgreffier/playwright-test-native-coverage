import { test as baseTest } from '@playwright/test';
import { v8ToIstanbul } from '@web/test-runner-coverage-v8';

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

    const reporter = testInfo.config.reporter.find((reporter) => reporter[0].includes('my-awesome-reporter'))
    const config = reporter?.[1];
    
    const coverageMapData = await v8ToIstanbul(config, [], JSCoverage);
    const coverageJSON = JSON.stringify(coverageMapData, null, 2);
    testInfo.attach('coverage', { body: coverageJSON });
  },
});

export const expect = test.expect;
