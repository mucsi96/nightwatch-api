import { startWebDriver, stopWebDriver } from 'nightwatch-api';

startWebDriver('default').catch(err => console.log(err));

process.once('SIGINT', async () => {
  try {
    await stopWebDriver();
  } finally {
    process.exit();
  }
});
