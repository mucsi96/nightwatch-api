import { client, closeSession } from '../src';
import fetch from 'node-fetch';

describe('Session handling', () => {
  test('Should be ready for creating new sessions', async () => {
    const response = await fetch('http://localhost:4444/status');
    const json = await response.json();
    expect(json).toMatchObject({
      value: {
        build: {
          version: expect.any(String)
        },
        message: 'ChromeDriver ready for new sessions.',
        os: {
          arch: expect.any(String),
          name: expect.any(String),
          version: expect.any(String)
        },
        ready: true
      }
    });
  });

  test('Should create session', async () => {
    const { sessionId } = client;
    const response = await fetch(`http://localhost:4444/session/${sessionId}`);
    const json = await response.json();
    expect(json).toMatchObject({
      sessionId,
      status: 0,
      value: {
        browserName: 'chrome',
        chrome: {
          chromedriverVersion: expect.any(String)
        },
        javascriptEnabled: true,
        takesScreenshot: true
      }
    });
  });

  test('Should close session', async () => {
    const { sessionId } = client;
    await closeSession();
    const response = await fetch(`http://localhost:4444/session/${sessionId}`);
    const json = await response.json();
    expect(json).toMatchObject({
      value: {
        message: 'invalid session id'
      }
    });
  });
});
