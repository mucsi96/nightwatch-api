import { createSession as createNightwatchSession, runQueue } from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import proxy from './proxy';
import { Api } from 'nightwatch';
import section from 'nightwatch/lib/page-object/section';

let nightwatchClient: Api;

export { startWebDriver, stopWebDriver, closeSession } from './client';

export interface IApiConfig {
  env?: string;
  configFile?: string;
}

export async function createSession({ env, configFile }: IApiConfig = {}) {
  nightwatchClient = await createNightwatchSession({ env, configFile });
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
