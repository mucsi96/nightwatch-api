## Getting Started

Before diving in technical steps we highly recommend to check out the [Cucumber introduction](https://docs.cucumber.io/guides/overview) page.

### Step 1 - Installing dependencies

Let's start with installing all the dependencies. First we need to have Nightwatch.js and Cucumber.js to be installed locally. If you are new to Nightwatch.js you can read the [developer guide](http://nightwatchjs.org/guide). Also we need some browser WebDriver. In this example we are going to test using Google Chrome browser. So we are installing the ChromeDriver. We use `cucumber-pretty` to make the output more verbose.

```terminal
npm install --save-dev nightwatch-api nightwatch cucumber chromedriver cucumber-pretty
```

### Step 2- Configuring Nightwatch.js

Now we need to configure Nightwatch.js. Let's create a JavaScript configuration file for Nightwatch.js in the project root folder. We use `nightwatch.conf.js` instead of `nightwatch.json` for flexibility. For more configuration option check out the [Nightwatch docs](http://nightwatchjs.org/guide#settings-file). We don't need to specify `src_folders` as test are running using Cucumber.

```javascript
// nightwatch.conf.js

const chromedriver = require('chromedriver');

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
        browserName: 'chrome'
      }
    }
  }
};
```

### Step 3 - Configuring Cucumber

Now we need to configure Cucumber. Let's create a JavaScript configuration file called `cucumber-setup.js` in the project root folder. This file is responsible for setting up the default timeout, starting the WebDriver and creating the session.

```javascript
// cucumber-setup.js

const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver();
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
```

### Step 4 - Writing a feature file

Let's create our first feature file under `features` folder called `google.feature`.

```gherkin
// features/google.feature

Feature: Google Search

Scenario: Searching Google

  Given I open Google's search page
  Then the title is "Google"
  And the Google search form exists
```

### Step 5 - Writing step definitions

For Cucumber to be able to understand and execute the feature file we need to create matching step definitions for every feature step we use in our feature file. Let's create a step definition file under `step-definitions` folder called `google.js`.

```javascript
// step_definitions/google.js

const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Given(/^I open Google's search page$/, () => {
  return client.url('http://google.com').waitForElementVisible('body', 1000);
});

Then(/^the title is "([^"]*)"$/, title => {
  return client.assert.title(title);
});

Then(/^the Google search form exists$/, () => {
  return client.assert.visible('input[name="q"]');
});
```

### Step 6 - Creating npm script

For convinience we are creating an npm script in our `package.json` to be able to execute the test with a short command. You can choose any name for it.

```json
// package.json
{
  ...
  "scripts": {
    "e2e-test": "cucumber-js --require cucumber-setup.js --require step-definitions --format node_modules/cucumber-pretty",
    ...
  }
  ...
}
```

### Step 7 - Run the tests

Let's run our first test.

```terminal
npm run e2e-test
```

```terminal
npm run e2e-test

> nightwatch-api-test@1.0.0 e2e-test /home/igor/test/nightwatch-api-test
> cucumber-js --require cucumber-setup.js --require step-definitions --format node_modules/cucumber-pretty


Feature: Google Search

  Scenario: Searching Google
    Given I open Google's search page
√ Element <body> was visible after 96 milliseconds.
    Then the title is "Google"
√ Testing if the page title equals "Google"  - 18 ms.
    And the Google search form exists
√ Testing if element <input[name="q"]> is visible  - 98 ms.

1 scenario (1 passed)
3 steps (3 passed)
0m02.263s
```

For more examples check out the the [cucumber-example](https://github.com/mucsi96/nightwatch-api/tree/master/packages/cucumber-example)
or [cucumber-selenium-example] projects.(https://github.com/mucsi96/nightwatch-api/tree/master/packages/cucumber-selenium-example)
