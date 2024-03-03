import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    port: 5173,
  },
  globalSetup: require.resolve('./global-setup'),
  reporter: './e2e/my-awesome-reporter.ts',
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
