const seleniumServer = require('selenium-server-standalone-jar');
const chromeDriver = require('chromedriver');
const geckoDriver = require('geckodriver');

module.exports = {
  test_settings: {
    default: {
      selenium: process.env.containerized
        ? {
            port: 4444,
            host: 'selenium-hub'
          }
        : {
            port: 4444,
            start_process: true,
            server_path: seleniumServer.path,
            cli_args: {
              'webdriver.chrome.driver': chromeDriver.path,
              'webdriver.gecko.driver': geckoDriver.path,
              'webdriver.ie.driver': ieDriver.path,
              'webdriver.edge.driver': edgeDriver.path
            }
          }
    },
    chromeHeadless: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false,
          args: ['--headless']
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false
        }
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        marionette: true
      }
    }
  }
};
