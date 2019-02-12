## Step definition handling

Step definitions which uses Nightwatch client should return the result of api call as it returns a Promise. Please note that this behavior is different from plain Nightwatch client API.

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
