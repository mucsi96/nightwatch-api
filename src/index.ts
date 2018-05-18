import { createSession as createNightwatchSession, runQueue } from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import proxy from './proxy';
import section from 'nightwatch/lib/page-object/section';
import { Api } from 'nightwatch';

let nightwatchClient: Api;

export { startWebDriver, stopWebDriver, closeSession } from './client';

export async function createSession(env: string) {
  nightwatchClient = await createNightwatchSession(env);
  promisifyApi(nightwatchClient, runQueue);
  promisifyExpect(nightwatchClient, runQueue);
  promisifyPageObjects(nightwatchClient, runQueue);
}

export const client = proxy(() => nightwatchClient);

export class Section extends section {
  constructor(definition: object, options: object) {
    super(definition, options);
    promisifySection(this.api, runQueue);
  }
}
