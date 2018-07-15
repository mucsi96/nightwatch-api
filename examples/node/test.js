const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  client
} = require('nightwatch-api');

async function setup(env = 'default') {
  await startWebDriver(env);
  await createSession(env);
}

async function shutdown() {
  await closeSession();
  await stopWebDriver();
}

async function run() {
  await client.url('https://duckduckgo.com/');
  let title;
  await client.getTitle(t => (title = t));
  console.log(title);
}

(async function() {
  try {
    await setup('chrome');
    await run();
  } catch (err) {
    console.log(err.stack);
  } finally {
    await shutdown();
  }
})();
