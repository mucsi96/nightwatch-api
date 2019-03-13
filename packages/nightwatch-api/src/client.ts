import {
  CliRunner,
  CliRunnerInstance,
  client as createClient,
  Client,
  Api,
  NightwatchError
} from 'nightwatch';
import assertionError from 'assertion-error';
import protocol from 'nightwatch/lib/api/protocol';
import fs from 'fs';
import path from 'path';
import { log } from './logger';
import { createFailureScreenshot } from './screenshots';
import reporter from './reporter';

interface IOptions {
  env?: string;
  configFile?: string;
}

let runner: CliRunnerInstance | null;
let client: Client;

export function deleteRunner() {
  runner = null;
}

function getDefaultEnvironment() {
  return 'default';
}

function getDefaultConfigFile() {
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
      'For custom location please provide "configFile" option for "startWebDriver" or',
      '"createSession" functions.'
    ].join(' ')
  );
}

function createRunner(options: IOptions) {
  if (!runner) {
    runner = CliRunner({
      env: (options && options.env) || getDefaultEnvironment(),
      config: (options && options.configFile) || getDefaultConfigFile()
    });
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
  deleteRunner();
  const runner = createRunner(options);

  const { port } = runner.test_settings.webdriver;
  await runner.startWebDriver();
  log(`WebDriver started on port ${port} for ${runner.testEnv} environment`);
}

export async function stopWebDriver() {
  if (!runner) {
    return;
  }

  const { port } = runner.test_settings.webdriver;
  await runner.stopWebDriver();
  log(`WebDriver stopped on port ${port} for ${runner.testEnv} environment`);
}

export async function createSession(options: IOptions): Promise<Api> {
  if (options) {
    deleteRunner();
  }

  const runner = createRunner(options);
  const settings = runner.test_settings;
  client = createClient(settings, new reporter());
  log(`Creating session for ${runner.testEnv} environment on port ${settings.webdriver.port}`);
  await client.startSession();
  log(`Session created for ${runner.testEnv} environment`);
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
  const protocolInstance = new protocol(client);
  if (protocolInstance.Actions.session) {
    await new Promise(resolve =>
      protocolInstance.Actions.session.call(
        protocolInstance,
        protocol.SessionActions.DELETE,
        resolve
      )
    );
  }
  if (runner) {
    log(`Session closed for ${runner.testEnv} environment`);
  }
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
