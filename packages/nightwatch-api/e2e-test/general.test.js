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

  test('Handles getAttribute success', async () => {
    let id;
    await client.init();
    await client.getAttribute('#a', 'id', ({ value }) => {
      id = value;
    });
    expect(id).toEqual('a');
  });

  test('Handles getAttribute failure', async () => {
    await client.init();

    let error;
    try {
      await client.getAttribute('#not-existing-element', 'test-attribute', ({ value }) => {
        if (value.error) {
          throw Error(value.error);
        }
      });
    } catch (err) {
      error = err;
    }
    expect(error.message).toMatch(
      'An error occurred while running .getAttribute() command on <#not-existing-element>:'
    );
  });
});
