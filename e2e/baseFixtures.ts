import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { test as baseTest } from '@playwright/test';

const C8Output = path.join(process.cwd(), 'coverage/tmp');

export function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex');
}

export const test = baseTest.extend({
  page: async ({ page, browserName }, use) => {
    const isCoverageSupported = browserName === 'chromium';

    if (!isCoverageSupported) {
      await use(page);
      return;
    }

    await page.coverage.startJSCoverage();
    await use(page);
    const JSCoverage = await page.coverage.stopJSCoverage();

    await fs.promises.mkdir(C8Output, { recursive: true });
    const coverageJSON = JSON.stringify({ result: JSCoverage }, null, 2);
    await fs.promises.writeFile(
      path.join(C8Output, `playwright-coverage-${generateUUID()}.json`),
      coverageJSON
    );
  },
});

export const expect = test.expect;
