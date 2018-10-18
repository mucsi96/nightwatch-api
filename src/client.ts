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

let runner: CliRunnerInstance;
let client: Client;

function createRunner(env: string = 'default') {
  if (!runner) {
    const jsonConfigFile = './nightwatch.json';
    const jsConfigFie = path.resolve('./nightwatch.conf.js');
    const configFile = fs.existsSync(jsConfigFie) ? jsConfigFie : jsonConfigFile;
    runner = CliRunner({ env, config: configFile });
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

/**
 * Start WebDriver
 * @param env Nightwatch environment
 */
export async function startWebDriver(env?: string) {
  createRunner(env);
  const { port } = runner.test_settings.webdriver;
  await runner.startWebDriver();
  log(`WebDriver started on port ${port}`);
}

/**
 * Stop WebDriver
 */
export async function stopWebDriver() {
  const { port } = runner.test_settings.webdriver;
  await runner.stopWebDriver();
  log(`WebDriver stopped on port ${port}`);
}

export async function createSession(env?: string): Promise<Api> {
  createRunner(env);
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

function handleQueueResult(err: NightwatchError, resolve: Function, reject: Function) {
  if (!err) {
    resolve();
    return;
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
      client.queue.run((err: NightwatchError) => handleQueueResult(err, resolve, reject));
    });
  } catch (err) {
    throw err;
  } finally {
    resetQueue();
  }
}
