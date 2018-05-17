import { createSession as createNightwatchSession, runQueue } from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import proxy from './proxy';
import NightwatchSection from 'nightwatch/lib/page-object/section';

let nightwatchClient;

export { startWebDriver, stopWebDriver, closeSession } from './client';

export async function createSession(env: string) {
  nightwatchClient = await createNightwatchSession(env);
  promisifyApi(client, runQueue);
  promisifyExpect(client, runQueue);
  promisifyPageObjects(client, runQueue);
}

export function client() {
  return proxy(() => nightwatchClient);
}

export class Section extends NightwatchSection {
  constructor(definition, options) {
    super(definition, options);
    promisifySection(this.api, runQueue);
  }
}
