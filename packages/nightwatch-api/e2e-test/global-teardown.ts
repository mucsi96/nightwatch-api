import { stopWebDriver } from '../src';
import { stopTestAppServer } from '../scripts/test-app-server';

async function globalTeardown() {
  await stopWebDriver();
  await stopTestAppServer();
}

export default globalTeardown;
