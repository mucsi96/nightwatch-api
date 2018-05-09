const { client } = require('../src');

describe('general', () => {
  test('google', async () => {
    await client
      .url('http://google.com')
      .expect.element('body')
      .to.be.present.before(1000);

    await client
      .setValue('input[type=text]', ['nightwatch', client.Keys.ENTER])
      .pause(1000)
      .assert.title('nightwatch - ');
  });
});
