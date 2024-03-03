import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  private JSCoverages: any[] = [];

  private getCoverageFromAttachment(attachment: {
    name: any;
    contentType?: string;
    path?: string | undefined;
    body?: Buffer | undefined;
  }) {
    if (attachment.name !== 'coverage') {
      return;
    }
    if (!attachment.body) {
      return;
    }
    return JSON.parse(attachment.body.toString());
  }

  onTestEnd(test: TestCase, result: TestResult) {
    for (const attachment of result.attachments) {
      const JSCoverage = this.getCoverageFromAttachment(attachment);
      if (JSCoverage) {
        this.JSCoverages.push(JSCoverage);
      }
    }
  }

  async onEnd(result: FullResult) {
    const generateUUID = () => crypto.randomBytes(16).toString('hex');

    for (const JSCoverage of this.JSCoverages) {
      await fs.promises.writeFile(
        path.join('.nyc_output', `playwright-coverage-${generateUUID()}.json`),
        JSON.stringify(JSCoverage)
      );
    }
  }
}

export default MyReporter;
