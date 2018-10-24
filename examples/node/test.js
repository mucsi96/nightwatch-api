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
  process.exit();
}

async function run() {
  await client.url('https://duckduckgo.com/');
  let title;
  await client.getTitle(t => (title = t));
  await client.assert.title('DuckDuckGo — Privacy, simplified.');
  console.log(title);
}

(async function() {
  try {
    await setup('default');
    await run();
  } catch (err) {
    console.log(err.stack);
    process.exitCode = 1;
  } finally {
    await shutdown();
  }
})();
