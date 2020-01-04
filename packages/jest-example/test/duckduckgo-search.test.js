import { client } from 'nightwatch-api';

describe('Searching DuckDuckGo', () => {
  test('title and search form', async () => {
    await client
      .url('https://duckduckgo.com/')
      .assert.title('DuckDuckGo — Privacy, simplified.')
      .assert.visible('#search_form_homepage_top');
  });

  test('search for WebDriver', async () => {
    await client
      .url('https://duckduckgo.com/')
      .setValue('#search_form_homepage_top', 'WebDriver')
      .click('#search_button_homepage')
      .assert.containsText(
        '#links',
        'WebDriver is a remote control interface that enables introspection and control of user agents.'
      );
  });
});
