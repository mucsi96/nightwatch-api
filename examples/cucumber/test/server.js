import { startWebDriver } from 'nightwatch-api';

startWebDriver('chrome').catch(err => console.log(err));
