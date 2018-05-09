const { CliRunner, client: createClient } = require("nightwatch");
const fs = require("fs");
const path = require("path");
const { log } = require("./logger");

let runner;
let client;
// let idle = false;

// const idleInterval = setInterval(() => {
//   if (idle) {
//     clearInterval(idleInterval);
//     deleteSession();
//   }
// }, 1000);

function createRunner(env) {
  if (!runner) {
    const jsonConfigFile = "./nightwatch.json";
    const jsConfigFie = path.resolve("./nightwatch.conf.js");
    const configFile = fs.existsSync(jsConfigFie)
      ? jsConfigFie
      : jsonConfigFile;
    runner = CliRunner({ config: configFile, env });
    runner.setup();
  }

  return runner;
}

async function createSession(env = "default") {
  try {
    createRunner(env);
    const settings = runner.test_settings;
    await runner.startWebDriver();
    log("webdriver started");
    client = createClient(settings);
    await new Promise(function(resolve, reject) {
      client
        .once("nightwatch:session.create", resolve)
        .once("nightwatch:session.error", reject);

      client.startSession();
    });
    log("session created");
  } catch (err) {
    throw err;
  } finally {
    // idle = true;
  }
}

async function deleteSession() {
  await new Promise((resolve, reject) => {
    client.queue.empty();
    client.queue.reset();
    client.session.close();
    client.queue.run(err => (!err ? resolve() : reject()));
  });
  log("session closed");
  await runner.stopWebDriver();
  log("webdriver stopped");
}

module.exports = {
  start: createSession,
  stop: deleteSession,
  client: new Proxy(
    {},
    {
      get: (target, name) => client[name]
    }
  )
};
