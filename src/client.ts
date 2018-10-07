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
import waitOn from 'wait-on';
import { promisify } from 'util';

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

async function waitForWebDriver(
  host: string = 'localhost',
  port: number = 4444,
  timeout: number,
  start: boolean = true
) {
  await promisify(waitOn)({
    timeout,
    reverse: !start,
    resources: [`http-get://${host}:${port}/status`]
  });
}

/**
 * Start WebDriver
 * @param env Nightwatch environment
 * @param timeout Timeout in ms, default 3000ms
 */
export async function startWebDriver(env?: string, timeout: number = 5000) {
  createRunner(env);
  const { host, port } = runner.test_settings.webdriver;
  await runner.startWebDriver();
  try {
    await waitForWebDriver(host, port, timeout, true);
  } catch (err) {
    throw new Error(`Starting WebDriver on ${host}:${port} timed out. Timeout was ${timeout}ms.`);
  }
  log(`WebDriver started on port ${port}`);
}

/**
 * Stop WebDriver
 * @param timeout Timeout in ms, default 3000ms
 */
export async function stopWebDriver(timeout: number = 5000) {
  const { host, port } = runner.test_settings.webdriver;
  await runner.stopWebDriver();
  try {
    await waitForWebDriver(host, port, timeout, false);
  } catch (err) {
    throw new Error(`Stopping WebDriver on ${host}:${port} timed out. Timeout was ${timeout}ms.`);
  }
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
