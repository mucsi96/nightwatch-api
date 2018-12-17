import {
  CliRunner,
  CliRunnerInstance,
  client as createClient,
  Client,
  Api,
  NightwatchError
} from 'nightwatch';
import assertionError from 'assertion-error';
import reporter from 'nightwatch/lib/testsuite/reporter';
import fs from 'fs';
import path from 'path';
import { log } from './logger';
import { createFailureScreenshot } from './screenshots';

let runner: CliRunnerInstance;
let client: Client;

interface IOptions {
  env: string;
  configFile: string;
}

export function getDefaultEnvironment() {
  return 'default';
}

export function getDefaultConfigFile() {
  const jsonConfigFile = './nightwatch.json';
  const jsConfigFie = path.resolve('./nightwatch.conf.js');

  if (fs.existsSync(jsonConfigFile)) {
    return jsonConfigFile;
  }

  if (fs.existsSync(jsConfigFie)) {
    return jsConfigFie;
  }

  throw new Error(
    [
      'No configuration file was found for Nightwatch in the current process folder.',
      '(nightwatch.json or nightwatch.conf.js).',
      'For custom location please provide "configFile" option for "startWebDriver" and',
      '"createSession" functions.'
    ].join(' ')
  );
}

function createRunner(options: IOptions) {
  if (!runner) {
    runner = CliRunner({ env: options.env, config: options.configFile });
    runner.isWebDriverManaged = function() {
      if (this.baseSettings.selenium) {
        this.baseSettings.selenium.start_process = true;
      }
      return true;
    };
    runner.setup();
  }

  return runner;
}

export async function startWebDriver(options: IOptions) {
  createRunner(options);
  const { port } = runner.test_settings.webdriver;
  await runner.startWebDriver();
  log(`WebDriver started on port ${port}`);
}

export async function stopWebDriver() {
  const { port } = runner.test_settings.webdriver;
  await runner.stopWebDriver();
  log(`WebDriver stopped on port ${port}`);
}

export async function createSession(options: IOptions): Promise<Api> {
  createRunner(options);
  const settings = runner.test_settings;
  client = createClient(settings, new reporter([], 0, {}, {}));
  await client.startSession();
  log('Session created');
  return client.api;
}

function resetQueue() {
  if (client && client.queue) {
    client.queue
      .reset()
      .removeAllListeners()
      .empty();
  }
}

export async function closeSession() {
  resetQueue();
  if (client && client.queue) {
    await runQueue();
  }
  log('Session closed');
}

async function handleQueueResult(err: NightwatchError, resolve: Function, reject: Function) {
  if (!err) {
    resolve();
    return;
  }

  if (client && client.api.screenshotsPath) {
    log('Creating screenshot because of failure');
    try {
      await createFailureScreenshot(client);
    } catch (e) {
      throw e;
    }
  }

  if (!(err instanceof assertionError) || err.abortOnFailure) {
    resetQueue();
  }

  err.stack = [err.message, err.stack].join('\n');
  reject(err);
}

export async function runQueue() {
  if (!client || !client.queue) {
    throw new Error(
      `Nightwatch client is not ready.
        Looks like function "createSession" did not succeed or was not called yet.`
    );
  }

  try {
    await new Promise((resolve, reject) => {
      client.queue.once(
        'queue:finished',
        async (err: NightwatchError) => await handleQueueResult(err, resolve, reject)
      );
      client.queue.run();
    });
  } catch (err) {
    throw err;
  } finally {
    resetQueue();
  }
}
