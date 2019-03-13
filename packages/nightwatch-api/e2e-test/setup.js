const { createSession, closeSession } = require('../src');
const path = require('path');

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession({
    env: process.env.NIGHTWATCH_ENV || 'chromeHeadless',
    configFile: path.resolve(__dirname, 'nightwatch.conf.js')
  });
});

afterAll(async () => {
  await closeSession();
});
