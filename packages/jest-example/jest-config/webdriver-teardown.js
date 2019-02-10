const { stopWebDriver } = require('nightwatch-api');

module.exports = async function() {
  await stopWebDriver();
};
