const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  client
} = require('nightwatch-api');

async function setup(options) {
  await startWebDriver(options);
  await createSession(options);
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
}

(async function() {
  try {
    await setup({ env: 'default' });
    await run();
  } catch (err) {
    console.log(err.stack);
    process.exitCode = 1;
  } finally {
    await shutdown();
  }
})();
