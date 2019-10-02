import {
  startWebDriver as clientStartWebDriver,
  stopWebDriver as clientStopWebDriver,
  createSession as clientCreateSession,
  closeSession as clientCloseSession,
  getNewScreenshots as clientGetNewScreenshots,
  runQueue,
  IOptions
} from './client';
import { promisifyApi, promisifySection, promisifyExpect, promisifyPageObjects } from './promisify';
import proxy from './proxy';
import { Api } from 'nightwatch';
import section from 'nightwatch/lib/page-object/section';

let nightwatchClient: Api;

/**
 * This variable represents the Nightwatch WebDriver client.
 * This is the main part of this package.
 * All Nightwatch [API](http://nightwatchjs.org/api) is available on this variable.
 * Important to note that every method call is wrapped in a promise.
 * So you can await its execution using `await` keyword.
 * Also chaining is supported as well.
 * Before using it you need to create a WebDriver session.
 * @example
 * const { client } = require('nightwatch-api');
 *
 * (async function() {
 *   await client
 *     .url('https://duckduckgo.com/')
 *     .setValue('input[name="q"]', 'WebDriver')
 *     .click('input[type="submit"]')
 *     .assert.containsText('#links', 'WebDriver - w3.org');
 * )();
 * @example
 * const { client } = require('nightwatch-api');
 *
 * (async function() {
 *   // This is much easier to debug, place console.logs, use if conditions and for loops
 *   await client.url('https://duckduckgo.com/');
 *   await client.setValue('input[name="q"]', 'WebDriver');
 *   await client.click('input[type="submit"]');
 *   await client.assert.containsText('#links', 'WebDriver - w3.org');
 * )();
 * @example
 *
 * const { client } = require('nightwatch-api');
 *
 * const googleSearch = client.page.google();
 *
 * (async function() {
 *   await googleSearch.init();
 *   await googleSearch.setValue('@searchField', 'WebDriver');
 *   await googleSearch.click('@searchButton');
 *   await googleSearch.assert.containsText('@searchResult', 'WebDriver - w3.org');
 * )();
 */
export const client = proxy(() => nightwatchClient);

/**
 * Starts WebDriver server according to selected environment configuration.
 * You can use it to start chromedriver, geckodriver, selenium server and other WebDrivers.
 * @example
 * const { startWebDriver, stopWebDriver } = require('nightwatch-api');
 *
 * beforeAll(async () => {
 *    await startWebDriver({ env: 'firefox' });
 * });
 *
 * afterAll(async () => {
 *    await stopWebDriver();
 * });
 * @example
 * const { startWebDriver, stopWebDriver } = require('nightwatch-api');
 *
 * (async function() {
 *   try {
 *     await startWebDriver({ env: 'chrome' });
 *     // create WebDriver client
 *     // use WebDriver session
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     // close WebDriver session
 *     await stopWebDriver();
 *   }
 * )();
 */
export async function startWebDriver(options: IOptions) {
  return clientStartWebDriver(options);
}

/**
 * Stops the currently running WebDriver.
 */
export async function stopWebDriver() {
  await clientStopWebDriver();
}

/**
 * Creates a new WebDriver session.
 * You need to create a session to be able to communicate with the browser.
 * @example
 * const { createSession, closeSession } = require('nightwatch-api');
 *
 * beforeAll(async () => {
 *    await createSession({ env: 'firefox' });
 * });
 *
 * afterAll(async () => {
 *    await closeSession();
 * });
 * @example
 * const { createSession, closeSession } = require('nightwatch-api');
 *
 * (async function() {
 *   try {
 *     // create WebDriver session
 *     await createSession({ env: 'chrome' });
 *     // use WebDriver client
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     await closeSession();
 *     // close WebDriver session
 *   }
 * )();
 */
export async function createSession(
  /**
   * Options are ignored if you already started the WebDriver using `startWebDriver`.
   */
  options: IOptions
) {
  nightwatchClient = await clientCreateSession(options);
  promisifyApi(nightwatchClient, runQueue);
  promisifyExpect(nightwatchClient, runQueue);
  promisifyPageObjects(nightwatchClient, runQueue);
}

/**
 * Closes the active WebDriver session.
 */
export async function closeSession() {
  await clientCloseSession();
}

/**
 * This class enables creation of Nightwatch page object sections dynamically.
 * @example
 * const { client, Section } = require('nightwatch-api');
 *
 * function createSearchSection(provider, parent) {
 *   if (provider === 'google') {
 *     return new Section(
 *       {
 *          selector: 'body',
 *          elements: {
 *            searchField: 'input[name="q"]',
 *            searchButton: 'input[type="submit"]',
 *          },
 *       },
 *       {
 *         name: 'Search Section',
 *         parent: client
 *       }
 *     );
 *   }
 * }
 *
 * (async function() {
 *   const section = createSearchSection('google');
 *   await client.init();
 *   await section.setValue('@searchField', 'WebDriver');
 *   await section.click('@searchButton');
 * )();
 */
export class Section extends section {
  constructor(definition: object, options: object) {
    super(definition, options);
    promisifySection(this.api, runQueue);
  }
}

/**
 * Return the screenshot filenames which were created after latest call of this method.
 */
export function getNewScreenshots() {
  return clientGetNewScreenshots();
}
