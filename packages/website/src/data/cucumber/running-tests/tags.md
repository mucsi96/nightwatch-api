## Feature and Scenario Tags

You can selectively run features and scenarios based on tags. [More details ](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#tags)

```gherkin
# google.feature

@google
Feature: Google Search

@search
Scenario: Searching Google

  Given I open Google's search page
  Then the title is "Google"
  And the Google search form exists
```

```bash
npm run e2e-test -- --tags @google
```

or for multiple tags

```bash
npm run e2e-test -- --tags "@google or @duckduckgo"
npm run e2e-test -- --tags "(@google or @duckduckgo) and @search"
```

You can also skip features or scenarios based on tags

```bash
npm run e2e-test -- --tags "not @google"
npm run e2e-test -- --tags "not(@google or @duckduckgo)"
```
