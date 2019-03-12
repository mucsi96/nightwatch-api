import path from 'path';
import { startWebDriver } from '../src';
import { startTestAppServer } from '../scripts/test-app-server';

async function globalSetup() {
  await startTestAppServer();
  await startWebDriver({
    env: process.env.NIGHTWATCH_ENV || 'chromeHeadless',
    configFile: path.resolve(__dirname, 'nightwatch.conf.js')
  });
}

export default globalSetup;
