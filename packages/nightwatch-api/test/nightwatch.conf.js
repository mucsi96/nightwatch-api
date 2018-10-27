const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const path = require('path');

module.exports = {
  silent: !process.env.NIGHTWATCH_VERBOSE,
  src_folders: ['.'],
  page_objects_path: path.resolve(__dirname, 'page-objects'),
  globals_path: path.resolve(__dirname, 'globals/globals.json'),
  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
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
