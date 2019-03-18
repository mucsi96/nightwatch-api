const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'chrome' });
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
