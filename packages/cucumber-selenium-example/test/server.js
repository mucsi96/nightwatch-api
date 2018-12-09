import { startWebDriver } from 'nightwatch-api';

startWebDriver({env: process.env.env}).catch(err => console.log(err));
