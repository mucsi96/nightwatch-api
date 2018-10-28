import * as Client from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import proxy from './proxy';
import { Api } from 'nightwatch';
import section from 'nightwatch/lib/page-object/section';

let nightwatchClient: Api;

export { stopWebDriver, closeSession } from './client';

/**
 * eeeeeeeeeee
 * @param options xxxxxxxxxxxxxxxxxxxxxxxxxx
 * @example
 * sadasdasdasda
 * asdasd
 * @example
 * ewityqewfndm,vndasjngj,dasngkjadfngajdsngvm,\jgrane;gh,opaesd
 * dsffjdsakjgnrqekhjernfdska
 */
export async function startWebDriver(
  options: {
    /**
     * ddddddddddddddddddddd
     */
    env?: string;
    /**
     * gggggggggggggggggg
     */
    configFile?: string;
  } = {}
) {
  const {
    env = Client.getDefautEnvironment(),
    configFile = Client.getDefaultConfigFile()
  } = options;
  return Client.startWebDriver({ env, configFile });
}

/**
 * aaaaaaaaaaaaaaaa
 */
export async function createSession(
  options: {
    /**
     * bbbbbbbbbbbbbbbbbbbbb
     */
    env?: string;
    /**
     * cccccccccccccccccc
     */
    configFile?: string;
  } = {}
) {
  const {
    env = Client.getDefautEnvironment(),
    configFile = Client.getDefaultConfigFile()
  } = options;
  nightwatchClient = await Client.createSession({ env, configFile });
  promisifyApi(nightwatchClient, Client.runQueue);
  promisifyExpect(nightwatchClient, Client.runQueue);
  promisifyPageObjects(nightwatchClient, Client.runQueue);
}

export const client = proxy(() => nightwatchClient);

export class Section extends section {
  constructor(definition: object, options: object) {
    super(definition, options);
    promisifySection(this.api, Client.runQueue);
  }
}
