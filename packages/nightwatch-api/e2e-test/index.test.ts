import 'mocha';
import path from 'path';
import { createSession, closeSession, startWebDriver, stopWebDriver } from '../src';
import { startTestAppServer, stopTestAppServer } from '../scripts/test-app-server';
import { log } from '../src/logger';

log.enabled = true;

before(async () => {
  await startTestAppServer();
  await startWebDriver({
    env: process.env.NIGHTWATCH_ENV || 'chrome',
    configFile: path.resolve(__dirname, '../e2e-test-env/nightwatch.conf.js')
  });
  await createSession({
    env: process.env.NIGHTWATCH_ENV || 'chrome',
    configFile: path.resolve(__dirname, '../e2e-test-env/nightwatch.conf.js')
  });
});

after(async () => {
  await closeSession();
  await stopWebDriver();
  await stopTestAppServer();
});
