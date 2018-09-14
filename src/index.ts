import { createClient, runQueue } from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import section from 'nightwatch/lib/page-object/section';

const nightwatchClient = createClient();
export const client = nightwatchClient.api;

promisifyApi(client, runQueue);
promisifyExpect(client, runQueue);
promisifyPageObjects(client, runQueue);

export { startWebDriver, stopWebDriver, createSession, closeSession } from './client';

export class Section extends section {
  constructor(definition: object, options: object) {
    super(definition, options);
    promisifySection(this.api, runQueue);
  }
}
