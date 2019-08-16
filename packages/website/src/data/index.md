# Introduction

## What is Nightwatch API?

Nightwatch API is JavaScript (Node.js) programming interface for controlling [Nightwatch.js](http://nightwatchjs.org/) which is an End-to-End (E2E) testing solution for browser based apps and websites.
Nightwatch.js uses the powerful [W3C WebDriver](https://www.w3.org/TR/webdriver/) API to perform commands and assertions on DOM elements. Nightwatch API adds a huge flexibility and control to Nightwatch.js. It enables using any type of test runner or browser control without using runner at all. Let's mention some use cases supported by this package.

- Running E2E tests using any test runner ([Jest](https://jestjs.io/), [Mocha](https://mochajs.org/), [Jasmine](https://jasmine.github.io/), [AVA](https://github.com/avajs/ava), [TAP](https://www.node-tap.org/), ...)
- Running acceptance tests based on feature requirements written in Gherkin language ([Cucumber.js](https://github.com/cucumber/cucumber-js))
- Controlling the browser using Nightwatch.js commands and assertions

## Differences from nightwatch-cucumber and nightwatch package

This package exposes the core features of Nightwatch without it's runner. The runner and test case handling is disabled. Due to this features related to runner and test cases are not supported.
Instead you can use similar features of your chosen test runner.

This package has a chainable Promise based API. Because of that it can be used by any test runner which support asynchronous code testing like: Jest, Mocha, CucumberJs, Jasmine, etc. But because every command returns a Promise you should follow these rules.

This package does support the following features of Nightwatch:

1. Parallel execution. Use any parallel execution feature of you chosen runner.
2. global hooks. Use test hooks of you chosen runner.
3. Any plugins which depends on Nightwatch runner

Check the [cucumber-example](https://github.com/mucsi96/nightwatch-api/tree/master/packages/cucumber-example) to see how can it be used with Cucumber.js

### Returning a Promise

Every test case which uses Nightwatch client should return the result of api call as it returns a Promise. Please note that this behavior is different from plain Nightwatch client API.

```
// NOT OK

Given(/^I open Google's search page$/, () => {
  client
    .url('http://google.com')
    .waitForElementVisible('body', 1000);
});
```

```
// OK

Given(/^I open Google's search page$/, () => {
  return client
    .url('http://google.com')
    .waitForElementVisible('body', 1000);
});
```

```
// OK

Given(/^I open Google's search page$/, async () => {
  await client
    .url('http://google.com')
    .waitForElementVisible('body', 1000);
});
```

```
// OK

Given(/^I open Google's search page$/, () => {
  client.url('http://google.com');

  return client.waitForElementVisible('body', 1000);
});
```

```
// OK

Given(/^I open Google's search page$/, async () => {
  client.url('http://google.com');

  await client.waitForElementVisible('body', 1000);
});
```

```
// OK Recommended

Given(/^I open Google's search page$/, async () => {
  await client.url('http://google.com');
  await client.waitForElementVisible('body', 1000);
});
```

### Writing proper command callbacks

```
// NOT OK

Then(/^the title is "(.*?)"$/, async text => {
  await client.getAttribute(
    'body',
    'id',
    result => client.assert.equal('pg-index', result.value)
  );
});
```

```
// OK

Then(/^the title is "(.*?)"$/, async text => {
  let bodyId;
  await client.getAttribute(
    'body',
    'id',
    result => {
      if (result.value.error) {
        throw Error(result.value.error);
      }

      bodyId = result.value;
    }
  );
  await client.assert.equal('pg-index', bodyId);
});
```

```
// OK

Then(/^the title is "(.*?)"$/, async text => {
  let bodyId;
  await client.getAttribute(
    'body',
    'id',
    ({ value }) => {
      if (value.error) {
        throw Error(value.error);
      }

      bodyId = value;
    }
  );
  await client.assert.equal('pg-index', bodyId);
});
```

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```terminal
npm install --save-dev nightwatch-api
```

This library has a `peerDependencies` listing for `nightwatch`.
It should be installed as one of your project's `devDependencies`:

```terminal
npm install --save-dev nightwatch
```

You may also be interested in installing [chromedriver](https://www.npmjs.com/package/chromedriver) and [geckodriver][https://www.npmjs.com/package/geckodriver] (for Firefox) or [selenium-server](https://www.npmjs.com/package/selenium-server), so anybody can easily run the library without the need to do any manual installation.

## Configuration

In project root create a JavaScript configuration file for Nightwatch.js. We suggest to use `nightwatch.conf.js` instead of `nightwatch.json` as it provides much more flexibility and ability to import packages in the configuration. For more details about the content of this file check out the [Nightwatch.js docs](http://nightwatchjs.org/gettingstarted#settings-file). In this example there are 3 nightwatch environments

- default - runs Chrome headless
- chrome - runs Chrome with UI
- firefox - runs Firefox with UI

All of the environments are connecting directly to the Chromedriver or Geckodriver (in case of Firefox) without
using Selenium server.

You can view the complete list of capabilities on [SeleniumHQ wiki](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities).

```javascript
// nightwatch.conf.js

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
```

### Changing the WebDriver port

By default Nightwatch API uses the port 4444 to connect to the WebDriver API. In order to change this, you have to provide both a `--port` CLI argument and the `port` WebDriver configuration option.

```javascript
// nightwatch.conf.js

const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 5555,
        cli_args: ['--port=5555']
      }
      // ...
    }
    // ...
  }
};
```

### Screenshots on failure

You can enable screenshot generation on failure using following Nightwatch configuration.
Screenshots will be named using template `[date]-[time]-[ms].png`.

```javascript
// nightwatch.conf.js
module.exports = {
  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        path: 'screenshots'
      }
      // ...
    }
    // ...
  }
};
```

## Usage

Let's create a file called `test.js` to try out the features

```javascript
// test.js

const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  client
} = require('nightwatch-api');

async function setup(env = 'default') {
  await startWebDriver({ env });
  await createSession({ env });
}

async function shutdown() {
  await closeSession();
  await stopWebDriver();
}

async function run() {
  await client.url('https://duckduckgo.com/');
  let title;
  await client.getTitle(t => (title = t));
  console.log(title);
}

(async function() {
  try {
    await setup('chrome');
    await run();
  } catch (err) {
    console.log(err.stack);
  } finally {
    await shutdown();
  }
})();
```

## Execution

You can run the example using

```terminal
node test.js
```

Now try to change the `environment` parameter of the `setup` function. In this example the supported environments are `default`, `chrome` and `firefox`. You can change the code to get the environment from command line arguments as well.

For complete working examples check out the [node-example](https://github.com/mucsi96/nightwatch-api/tree/master/packages/node-example), [jest-example](https://github.com/mucsi96/nightwatch-api/tree/master/packages/jest-example) and [cucumber-example](https://github.com/mucsi96/nightwatch-api/tree/master/packages/cucumber-example) folders of the source code.

## Contributors

[contributors](#contributors)

## We are using

[browserstack](#browserstack)

We are using [BrowserStack](https://www.browserstack.com) for testing the Selenium support of current package. BrowserStack loves open source and has sponsored thousands of projects. They offered us a free account as we're an open source project. This makes testing very easy on different browsers and various platforms including real mobile devices.
