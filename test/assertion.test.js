require('chai').should();

const { client } = require('../src');

const calculatorWithResult = client.page.calculatorWithResult();

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
      expect.stringContaining('Failed [ok]: (this assertion should not pass)')
    );
  });

  // Due to bug in Nightwatch this test throws error
  // Error is emmited but not catched
  // https://github.com/nightwatchjs/nightwatch/blob/master/lib/core/assertion.js#L109
  test('Handles verify.ok', async () => {
    const errorHandler = jest.fn();
    try {
      await client.verify.ok(false, 'this assertion should not pass');
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Failed [ok]: (this assertion should not pass)')
    );
  });

  test('Handles chai expect', async () => {
    const errorHandler = jest.fn();
    try {
      await client.expect(false).to.be.true;
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith('expected false to be true');
  });

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
      expect.stringContaining('Expected element <#result> text to equal: "10"')
    );
  });

  test('Handles page object expect.element failure', async () => {
    const errorHandler = jest.fn();
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add');

      await calculatorWithResult.expect.element('@result').text.to.contain(10);
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Expected element <Element [name=@result]> text to contain: "10"')
    );
  });
});
