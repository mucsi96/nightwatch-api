import {
  CliRunner,
  CliRunnerInstance,
  client as createClient,
  Client,
  Api,
  NightwatchError
} from 'nightwatch';
import fs from 'fs';
import { log } from './logger';
import { createFailureScreenshot } from './screenshots';
import reporter from './reporter';

export declare interface BrowerStackLocalOptions {
  key: string;
  verbose: boolean;
  force: boolean;
  only: string;
  onlyAutomate: boolean;
  forceLocal: boolean;
  localIdentifier: string;
  folder: string;
  proxyHost: string;
  proxyPort: string;
  proxyUser: string;
  proxyPass: string;
  forceProxy: boolean;
  logFile: string;
  parallelRuns: string;
  binarypath: string;
  [key: string]: string | boolean;
}

declare class BrowerStackLocal {
  start(options: Partial<BrowerStackLocalOptions>, callback: () => void): void;
  isRunning(): boolean;
  stop(callback: () => void): void;
}

export interface IBrowserStackOptions {
  /**
   * A flag to enable BrowserStack testing. You must have the appropriate options set in your selenium config.
   * Defaults to `false`.
   */
  enabled?: boolean;
  /**
   * A flag to enable the `browserstack-local` package. This is an optional dependency you must have installed.
   * Defaults to `false`.
   */
  localEnabled?: boolean;
  /**
   * The options supported by `browserstack-local`.
   * Please see https://github.com/browserstack/browserstack-local-nodejs/blob/master/index.d.ts for details.
   */
  localOptions?: Partial<BrowerStackLocalOptions>;
}

interface IOptions {
  env?: string;
  configFile?: string;
  silent?: boolean;
  browserStackOptions?: IBrowserStackOptions;
}

let runner: CliRunnerInstance | null;
let runnerOptions: IOptions | null;
let client: Client | null;
let screenshots: string[] = [];
let browserStackLocal: BrowerStackLocal;

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

function getDefaultBrowserStackOptions() {
  const options: IBrowserStackOptions = {
    enabled: false,
    localEnabled: false,
    localOptions: undefined
  };
  return options;
}

async function createRunner(options: IOptions) {
  if (runner) {
    return runner;
  }

  return new Promise<CliRunnerInstance | null>((resolve, reject) => {
    runnerOptions = {
      env: (options && options.env) || getDefaultEnvironment(),
      configFile: (options && options.configFile) || getDefaultConfigFile(),
      silent: (options && options.silent) || false,
      browserStackOptions:
        (options && options.browserStackOptions) || getDefaultBrowserStackOptions()
    };

    let browserStackEnabled: boolean | undefined;
    let browserStackLocalEnabled: boolean | undefined;
    let browserStackLocalOptions: Partial<BrowerStackLocalOptions> = {};

    if (runnerOptions.browserStackOptions) {
      browserStackEnabled = runnerOptions.browserStackOptions.enabled;
      browserStackLocalEnabled = runnerOptions.browserStackOptions.localEnabled;
      browserStackLocalOptions = runnerOptions.browserStackOptions.localOptions || {};
    }

    runner = CliRunner({ env: runnerOptions.env, config: runnerOptions.configFile });
    runner.isWebDriverManaged = function() {
      const managed = typeof browserStackEnabled === 'undefined' ? true : !browserStackEnabled;
      if (this.baseSettings.selenium) {
        this.baseSettings.selenium.start_process = managed;
      }
      return managed;
    };

    if (browserStackEnabled && browserStackLocalEnabled) {
      try {
        const browserstack = require('browserstack-local');

        browserStackLocal = new browserstack.Local();

        browserStackLocal.start(browserStackLocalOptions, () => {
          if (runner) {
            runner.setup();
            resolve(runner);
          } else {
            reject('Failed to create the runner within BrowserStack Local');
          }
        });
      } catch (err) {
        reject(`Failed to create the runner within BrowserStack Local. Details: ${err}`);
      }
    } else {
      runner.setup();
      resolve(runner);
    }
  });
}

async function stopBrowserStackLocal() {
  return new Promise<void>((resolve, reject) => {
    if (browserStackLocal) {
      browserStackLocal.stop(() => {
        log('BrowserStack Local stopped');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

export async function startWebDriver(options: IOptions) {
  deleteRunner();
  const runner = await createRunner(options);

  if (!runner) {
    throw new Error("The CliRunner instance wasn't properly created");
  }

  let driverPort: number | undefined;
  if (runner.test_settings.webdriver) {
    const { port } = runner.test_settings.webdriver;
    driverPort = port;
  }

  await runner.startWebDriver();

  if (driverPort) {
    log(`WebDriver started on port ${driverPort} for ${runner.testEnv} environment`);
  }
}

export async function stopWebDriver() {
  if (!runner) {
    return;
  }

  let driverPort: number | undefined;
  if (runner.test_settings.webdriver) {
    const { port } = runner.test_settings.webdriver;
    driverPort = port;
  }

  await runner.stopWebDriver();
  await stopBrowserStackLocal();

  if (driverPort) {
    log(`WebDriver stopped on port ${driverPort} for ${runner.testEnv} environment`);
  }
}

export async function createSession(options: IOptions): Promise<Api> {
  if (options) {
    deleteRunner();
  }

  const runner = await createRunner(options);

  if (!runner) {
    throw new Error("The CliRunner instance wasn't properly created");
  }

  const settings = runner.test_settings;
  client =
    runnerOptions && runnerOptions.silent
      ? createClient(settings)
      : createClient(settings, new reporter());

  if (settings.webdriver && settings.webdriver.port) {
    log(`Creating session for ${runner.testEnv} environment on port ${settings.webdriver.port}`);
  } else {
    log(`Creating session for ${runner.testEnv} environment`);
  }
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
  await new Promise(resolve => {
    if (!client) {
      return;
    }

    client.transportActions.sessionAction('DELETE', client.sessionId, resolve);
  });
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
    const fileName = await createFailureScreenshot(client);
    screenshots.push(fileName);
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

export function getNewScreenshots() {
  const result = screenshots;
  screenshots = [];
  return result;
}
