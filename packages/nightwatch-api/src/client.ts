import {
  CliRunner,
  CliRunnerInstance,
  client as createClient,
  Client,
  Api,
  NightwatchError
} from 'nightwatch';
import protocol from 'nightwatch/lib/api/protocol';
import fs from 'fs';
import { log } from './logger';
import { createFailureScreenshot } from './screenshots';
import reporter from './reporter';

interface IOptions {
  env?: string;
  configFile?: string;
  silent?: boolean;
}

let runner: CliRunnerInstance | null;
let runnerOptions: IOptions | null;
let client: Client | null;

export function deleteRunner() {
  runner = null;
  runnerOptions = null;
  client = null;
}

function getDefaultEnvironment() {
  return 'default';
}

function getDefaultConfigFile() {
  const jsonConfigFile = './nightwatch.json';
  const jsConfigFie = './nightwatch.conf.js';

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
    runnerOptions = {
      env: (options && options.env) || getDefaultEnvironment(),
      configFile: (options && options.configFile) || getDefaultConfigFile(),
      silent: (options && options.silent) || false
    };
    runner = CliRunner({ env: runnerOptions.env, config: runnerOptions.configFile });
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
  client =
    runnerOptions && runnerOptions.silent
      ? createClient(settings)
      : createClient(settings, new reporter());
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
  if (!client) {
    return;
  }
  const protocolInstance = new protocol(client);
  await new Promise(resolve =>
    protocolInstance.Actions.session.call(protocolInstance, protocol.SessionActions.DELETE, resolve)
  );
  /* istanbul ignore next */
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
    await createFailureScreenshot(client);
  }

  err.stack = [err.message, err.stack].join('\n');
  reject(err);
}

export async function runQueue() {
  try {
    await new Promise((resolve, reject) => {
      if (!client || !client.queue) {
        throw new Error(
          `Nightwatch client is not ready.
            Looks like function "createSession" did not succeed or was not called yet.`
        );
      }
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
