import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    port: 5173,
  },
  globalSetup: require.resolve('./global-setup'),
  reporter: [
    [
      './e2e/my-awesome-reporter.ts',
      {
        rootDir: process.cwd(),
        hostname: 'localhost',
        port: 5173,
        coverageConfig: {
          include: ['src/*'],
          exclude: ['nothing'],
        },
      },
    ],
  ],
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
