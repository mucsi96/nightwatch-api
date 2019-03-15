module.exports = {
  name: 'e2e',
  displayName: 'e2e',
  testMatch: ['<rootDir>/e2e-test/**/*.test.js'],
  globalSetup: './e2e-test/global-setup.ts',
  globalTeardown: './e2e-test/global-teardown.ts',
  setupFilesAfterEnv: ['./e2e-test/setup']
};
