const { CliRunner, client: createClient } = require('nightwatch');
const fs = require('fs');
const path = require('path');
const { log } = require('./logger');

let runner;
let client;

function createRunner(env) {
  if (!runner) {
    const jsonConfigFile = './nightwatch.json';
    const jsConfigFie = path.resolve('./nightwatch.conf.js');
    const configFile = fs.existsSync(jsConfigFie) ? jsConfigFie : jsonConfigFile;
    runner = CliRunner({ config: configFile, env });
    runner.setup();
  }

  return runner;
}

async function createSession(env = 'default') {
  createRunner(env);
  const settings = runner.test_settings;
  if (settings.webdriver.start_process) {
    await runner.startWebDriver();
    log(`WebDriver started on port ${runner.test_settings.webdriver.port}`);
  }
  client = createClient(settings);
  await new Promise(function(resolve, reject) {
    client.once('nightwatch:session.create', resolve).once('nightwatch:session.error', reject);

    client.startSession();
  });
  log('Session created');

  return client.api;
}

async function closeSession() {
  client.queue.empty();
  client.queue.reset();
  client.session.close();
  await runQueue();
  log('Session closed');
  if (runner.test_settings.webdriver.start_process) {
    await runner.stopWebDriver();
    log(`WebDriver stopped on port ${runner.test_settings.webdriver.port}`);
  }
}

async function runQueue() {
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

module.exports = {
  createSession,
  closeSession,
  runQueue
};
