import { createSession as createNightwatchSession, runQueue } from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import proxy from './proxy';
import NightwatchSection from 'nightwatch/lib/page-object/section';
import { Api } from 'nightwatch';

let nightwatchClient: Api;

export { startWebDriver, stopWebDriver, closeSession } from './client';

export async function createSession(env: string) {
  nightwatchClient = await createNightwatchSession(env);
  promisifyApi(nightwatchClient, runQueue);
  promisifyExpect(nightwatchClient, runQueue);
  promisifyPageObjects(nightwatchClient, runQueue);
}

export function client() {
  return proxy(() => nightwatchClient);
}

export class Section extends NightwatchSection {
  constructor(definition: object, options: object) {
    super(definition, options);
    promisifySection(this.api, runQueue);
  }
}
