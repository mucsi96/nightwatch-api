import { client } from '../src';

describe('General features', () => {
  test('Handles basic commands', async () => {
    const onResultReady = jest.fn();
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add')
      .getText('#result-value', ({ value }) => onResultReady(parseInt(value)));
    expect(onResultReady).toBeCalledWith(9);
  });
});
