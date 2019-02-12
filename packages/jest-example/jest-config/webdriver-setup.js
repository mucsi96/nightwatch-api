const { startWebDriver } = require('nightwatch-api');

module.exports = async function() {
  await startWebDriver({ env: 'default' });
};
