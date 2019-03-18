const { config } = require('dotenv-safe');

config();

module.exports = {
  test_settings: {
    default: {
      selenium: {
        start_process: false,
        host: 'hub-cloud.browserstack.com',
        port: 80
      },
      desiredCapabilities: {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        os: 'Windows',
        os_version: '10'
      }
    },
    chrome: {
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
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        marionette: true
      }
    }
  }
};
