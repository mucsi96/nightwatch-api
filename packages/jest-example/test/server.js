import { startWebDriver, stopWebDriver } from 'nightwatch-api';

startWebDriver({ env: 'default' }).catch(err => console.log(err));

process.once('SIGTERM', async () => {
  try {
    await stopWebDriver();
  } finally {
    process.exit();
  }
});
