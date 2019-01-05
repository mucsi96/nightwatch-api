const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 4444,
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless', 'disable-gpu']
        }
      }
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['disable-gpu']
        }
      }
    },
    firefox: {
      webdriver: {
        server_path: geckodriver.path
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    }
  }
};
