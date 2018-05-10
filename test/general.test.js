const { client } = require('../src');

describe('general', () => {
  test('basic commands', async () => {
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add')
      .getText('#result', ({ value }) => expect(value).toEqual('9'));
  });
});
