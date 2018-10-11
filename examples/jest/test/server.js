import { startWebDriver } from 'nightwatch-api';

startWebDriver({ env: 'default' }).catch(err => console.log(err));
