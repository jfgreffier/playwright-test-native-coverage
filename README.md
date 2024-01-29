# Use Chromium coverage collection with [Playwright Test](https://playwright.dev/docs/test-intro)

[![CI](https://github.com/jfgreffier/playwright-test-native-coverage/actions/workflows/nodejs.yml/badge.svg)](https://github.com/jfgreffier/playwright-test-native-coverage/actions/workflows/nodejs.yml)

This example demonstrates how to use Playwright Test to collect coverage data during runtime with your end-to-end tests which will be stored on the filesystem. When applying the shown parts, you are able to view the coverage report e.g. as HTML, or convert it to the `lcov` format for upload to [Coveralls](https://coveralls.io/) or other similar providers.

## Prerequisites

TODO

## Usage

- Place [`baseFixtures.ts`](./e2e/baseFixtures.ts) into your test directory. Instead of requiring `@playwright/test` to get the test object, use `./baseFixtures`.
- This will collect the corresponding coverage files into the `.nyc_output` directory.
- For an example test, see [App.test.ts](/e2e/App.test.ts)

## Coverage formats

Helpful commands are the following:

TODO

## Used tools

- [vite](https://vitejs.dev/) - tooling and bundling for React
- [vite-plugin-istanbul](https://github.com/ifaxity/vite-plugin-istanbul) - to add coverage information
- [nyc](https://github.com/istanbuljs/nyc) - Istanbul CLI to generate lcov coverage
