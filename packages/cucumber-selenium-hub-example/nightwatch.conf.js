const seleniumServer = require('selenium-webdriver');
const chromeDriver = require('chromedriver');
const geckoDriver = require('geckodriver');

module.exports = {
  test_settings: {
    default: {
      selenium: process.env.containerized
        ? {
            port: 443,
            host: `${process.env.gridhost}`,
            use_ssl : true
          }
        : {
            port: 443,
            start_process: false,
            server_path: seleniumServer.path,
            host: `${process.env.gridhost}`,
            cli_args: {
              'webdriver.chrome.driver': chromeDriver.path,
              'webdriver.gecko.driver': geckoDriver.path,
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
    edge: {
      desiredCapabilities: {
        browserName: "MicrosoftEdge",
        platformName: "LINUX",
        w3c: "true"
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
