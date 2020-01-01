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
  await client.assert.visible('.js-search-input.search__input--adv');
});
