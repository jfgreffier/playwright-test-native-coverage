# Use Chromium coverage collection with [Playwright Test](https://playwright.dev/docs/test-intro)

[![CI](https://github.com/jfgreffier/playwright-test-native-coverage/actions/workflows/nodejs.yml/badge.svg)](https://github.com/jfgreffier/playwright-test-native-coverage/actions/workflows/nodejs.yml)

This example demonstrates how to use Playwright Test to collect coverage data during runtime with your end-to-end tests which will be stored on the filesystem. When applying the shown parts, you are able to view the coverage report e.g. as HTML, or convert it to the `lcov` format for upload to [Coveralls](https://coveralls.io/) or other similar providers.

## Prerequisites

Coverage APIs are only supported on Chromium-based browsers.

## Usage

- Place [`baseFixtures.ts`](./e2e/baseFixtures.ts) into your test directory. Instead of requiring `@playwright/test` to get the test object, use `./baseFixtures`.
- This will collect the corresponding coverage as attachment.
- For an example test, see [App.test.ts](/e2e/App.test.ts)

## Coverage formats

Helpful commands are the following:

- `npx nyc report --reporter=html` -> Writes an HTML report to `coverage/index.html`.
- `npx nyc report --reporter=lcov` -> commonly used to upload to Coveralls or [Codecov](https://about.codecov.io/).
- `npx nyc report --reporter=text` -> CLI output how the current code coverage per file and statement will look like.

## Used tools

- [vite](https://vitejs.dev/) - tooling and bundling for React
- [@web/test-runner-coverage-v8](https://github.com/modernweb-dev/web/tree/master/packages/test-runner-coverage-v8) - to convert V8 to Istanbul with fetching SourceMaps and nice config
- [nyc](https://github.com/istanbuljs/nyc) - Istanbul CLI to generate lcov coverage
