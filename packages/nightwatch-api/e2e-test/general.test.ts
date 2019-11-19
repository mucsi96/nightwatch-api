import { client } from '../src';
import expect from 'expect';

describe('General features', () => {
  it('Handles basic commands', async () => {
    let result;
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add')
      .getText('#result-value', ({ value }) => {
        result = parseInt(value, 10);
      });
    expect(result).toEqual(9);
  });

  it('Handles getAttribute success', async () => {
    let id;
    await client.init();
    await client.getAttribute('#a', 'id', ({ value }) => {
      id = value;
    });
    expect(id).toEqual('a');
  });

  it('Handles getAttribute failure', async () => {
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
