import fs from 'fs';
import path from 'path';
import { client, getNewScreenshots } from '../src';
import expect from 'expect';
import sinon from 'sinon';

describe('screenshots-e2e', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(Date.prototype, 'getTimezoneOffset').returns(-60);
    sandbox.stub(Date.prototype, 'getTime').returns(1544964642047);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('creates failure screenshot', async () => {
    const filename = path.resolve(__dirname, 'screenshots/20181216-135042-047.png');
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
    try {
      await client.assert.ok(false);
    } catch (err) {}
    const screenshot = fs.readFileSync(filename);
    expect(screenshot).toBeInstanceOf(Buffer);
    expect(Array.from(screenshot.slice(0, 9).values())).toEqual([
      137,
      80,
      78,
      71,
      13,
      10,
      26,
      10,
      0
    ]);
  });

  it('getNewScreenshots returns the newly created screenshots', async () => {
    getNewScreenshots();
    const filename = path.resolve(__dirname, 'screenshots/20181216-135042-047.png');
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
