const { client } = require('../src');

describe('General features', () => {
  test('Handles basic commands', async () => {
    const onResultReady = jest.fn();
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add')
      .getText('#result', ({ value }) => onResultReady(parseInt(value)));
    expect(onResultReady).toBeCalledWith(9);
  });
});

describe('Assertion features', () => {
  // Due to bug in Nightwatch this test throws error
  // Error is emmited but not catched
  // https://github.com/nightwatchjs/nightwatch/blob/master/lib/core/assertion.js#L109
  test('Handles assert.ok', async () => {
    const errorHandler = jest.fn();
    try {
      await client.assert.ok(false, 'this assertion should not pass');
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('AssertionError: Failed [ok]: (this assertion should not pass)')
    );
  });

  // Due to bug in Nightwatch this test throws error
  // Error is emmited but not catched
  // https://github.com/nightwatchjs/nightwatch/blob/master/lib/core/assertion.js#L109
  // Error [ERR_UNHANDLED_ERROR]: Unhandled error. (AssertionError: Failed [ok]:
  // (this assertion should not pass) - expected "true" but got: "false")
  // test('Handles verify.ok', async () => {
  //   const errorHandler = jest.fn();
  //   try {
  //     await client.verify.ok(false, 'this assertion should not pass');
  //   } catch (err) {
  //     errorHandler(err.message);
  //   }
  //   expect(errorHandler).not.toBeCalled();
  // });

  test('Handles expect.element', async () => {
    const errorHandler = jest.fn();
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add')
        .expect.element('#result')
        .text.to.equal('10');
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('AssertionError: Failed [ok]: (this assertion should not pass)')
    );
  });
});
