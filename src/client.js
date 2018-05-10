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
  await runner.startWebDriver();
  log('webdriver started');
  client = createClient(settings);
  await new Promise(function(resolve, reject) {
    client.once('nightwatch:session.create', resolve).once('nightwatch:session.error', reject);

    client.startSession();
  });
  log('session created');
  return client.api;
}

async function deleteSession() {
  client.queue.empty();
  client.queue.reset();
  client.session.close();
  await runQueue();
  log('session closed');
  await runner.stopWebDriver();
  log('webdriver stopped');
}

async function runQueue() {
  await new Promise((resolve, reject) => {
    client.queue.run(err => {
      if (!err) {
        return resolve();
      }

      err.stack = [err.message, err.stack].join('\n');
      return reject(err);
    });
  });
}

module.exports = {
  createSession,
  deleteSession,
  runQueue
};
