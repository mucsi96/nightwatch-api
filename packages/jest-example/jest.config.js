module.exports = {
  globalSetup: './jest-config/webdriver-setup.js',
  globalTeardown: './jest-config/webdriver-teardown.js',
  setupFilesAfterEnv: ['./jest-config/setup']
};
