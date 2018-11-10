import { client } from 'nightwatch-api';

describe('Searching DuckDuckGo', () => {
  test('title and search form', async () => {
    await client
      .url('https://duckduckgo.com/')
      .assert.title('DuckDuckGo — Privacy, simplified.')
      .assert.visible('input[name="q"]');
  });

  test('search for WebDriver', async () => {
    await client
      .url('https://duckduckgo.com/')
      .setValue('input[name="q"]', 'WebDriver')
      .click('input[type="submit"]')
      .assert.containsText(
        '#links',
        'WebDriver is a remote control interface that enables introspection and control of user agents.'
      );
  });
});
