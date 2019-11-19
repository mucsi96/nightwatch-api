import 'mocha';
import { client } from '../src';
import expect from 'expect';

describe('Globals handling', () => {
  it('Handles basic globals', async () => {
    expect(client.globals.myGlobal).toEqual(1);
  });
});
