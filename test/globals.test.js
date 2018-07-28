import { client } from '../src';

describe('Globals handling', () => {
  test('Handles basic globals', async () => {
    expect(client.globals.myGlobal).toEqual(1);
  });
});
