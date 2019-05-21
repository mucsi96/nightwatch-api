import fs from 'fs';
import path from 'path';
import { client, getNewScreenshots } from '../src';

Date.prototype.getTimezoneOffset = jest.fn(() => -60);
Date.prototype.getTime = jest.fn(() => 1544964642047);

describe('screenshots-e2e', () => {
  it('creates failure screenshot', async () => {
    const filename = path.resolve(__dirname, 'e2e-test-screenshots/20181216-135042-047.png');
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
    try {
      await client.assert.ok(false);
    } catch (err) {}
    const screenshot = fs.readFileSync(filename);
    expect(screenshot).toBeInstanceOf(Buffer);
    expect(Array.from(screenshot.slice(0, 9).values())).toMatchInlineSnapshot(`
Array [
  137,
  80,
  78,
  71,
  13,
  10,
  26,
  10,
  0,
]
`);
  });

  it('getNewScreenshots returns the newly created screenshots', async () => {
    getNewScreenshots();
    const filename = path.resolve(__dirname, 'e2e-test-screenshots/20181216-135042-047.png');
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
    try {
      await client.assert.ok(false);
    } catch (err) {}
    
    expect(getNewScreenshots()).toEqual([filename]);
    expect(getNewScreenshots()).toEqual([]);
  });
});
