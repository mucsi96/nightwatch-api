## Demo Test

Using the **cucumber example** found [here](https://github.com/mucsi96/nightwatch-api/tree/master/packages/cucumber-example)

By default feature files are located in `features` folder. You can change this by adding the directory that you would like to use in the package.json `test` script like so:

```json
"test": "cucumber-js other-features-dir --require-module babel-core/register --require cucumber.conf.js --require step-definitions --format node_modules/cucumber-pretty"
```

_More information here:_ [cucumber-js documentation](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md)

```gherkin
# features/google.feature

Feature: Google Search

Scenario: Searching Google

  Given I open Google`s search page
  Then the title is "Google"
  And the Google search form exists
```

Step definitions files are located in `step_definitions` folder because we specify it in the package.json `--require step-definitions`.

```javascript
import { client } from 'nightwatch-api';
import { Given, Then } from 'cucumber';

Given(/^I open Google`s search page$/, async () => {
  await client.url('http://google.com');
});

Given(/^I open DuckDuckGo search page$/, async () => {
  await client.url('https://duckduckgo.com/');
});

Then(/^the title is "(.*?)"$/, async text => {
  await client.assert.title(text);
});

Then(/^the Google search form exists$/, async () => {
  await client.assert.visible('input[name="q"]');
});

Then(/^the DuckDuckGo search form exists$/, async () => {
  await client.assert.visible('input[name="q"]');
});
```
