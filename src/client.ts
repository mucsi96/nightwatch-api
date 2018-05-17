import { CliRunner, client as createClient } from 'nightwatch';
import fs from 'fs';
import path from 'path';
import { log } from './logger';

let runner: object;
let client: object;

function createRunner(env = 'default') {
  if (!runner) {
    const jsonConfigFile = './nightwatch.json';
    const jsConfigFie = path.resolve('./nightwatch.conf.js');
    const configFile = fs.existsSync(jsConfigFie) ? jsConfigFie : jsonConfigFile;
    runner = CliRunner({ config: configFile, env });
    runner.isWebDriverManaged = function() {
      this.baseSettings.selenium.start_process = true;
      return true;
    };
    runner.setup();
  }

  return runner;
}

export async function startWebDriver(env) {
  createRunner(env);
  await runner.startWebDriver();
  log(`WebDriver started on port ${runner.test_settings.webdriver.port}`);
}

export async function stopWebDriver() {
  await runner.stopWebDriver();
  log(`WebDriver stopped on port ${runner.test_settings.webdriver.port}`);
}

export async function createSession(env: string) {
  createRunner(env);
  const settings = runner.test_settings;
  client = createClient(settings);
  await client.startSession();
  log('Session created');
  return client.api;
}

export async function closeSession() {
  client.queue.empty();
  client.queue.reset();
  client.session.close();
  await runQueue();
  log('Session closed');
}

export async function runQueue() {
  try {
    await new Promise((resolve, reject) => {
      client.queue.run(err => {
        if (!err || !(err.abortOnFailure || err.abortOnFailure === undefined)) {
          resolve();
          return;
        }

        err.stack = [err.message, err.stack].join('\n');
        reject(err);
      });
    });
  } catch (err) {
    throw err;
  } finally {
    client.queue.removeAllListeners();
    client.queue.empty();
    client.queue.reset();
  }
}
