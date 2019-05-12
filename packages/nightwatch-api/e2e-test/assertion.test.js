require('chai').should();

import { client } from '../src';

const calculatorWithResult = client.page.calculatorWithResult();
const nestedCalculator = client.page.nested.calculator();
const calculatorWithNestedSections = client.page.calculatorWithNestedSections();
const calculatorWithSection = client.page.calculatorWithSection();

describe('Assertion features', () => {
  test('Handles assert.ok success', async () => {
    await client.assert.ok(true, 'this assertion should pass');
  });

  // Due to bug in Nightwatch this test throws error
  // Error is emitted but not caught
  // https://github.com/nightwatchjs/nightwatch/blob/master/lib/core/assertion.js#L109
  test('Handles assert.ok failure', async () => {
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

  test('Handles verify.ok success', async () => {
    await client.verify.ok(true, 'this assertion should pass');
  });

  // Due to bug in Nightwatch this test throws error
  // Error is emitted but not caught
  // https://github.com/nightwatchjs/nightwatch/blob/master/lib/core/assertion.js#L109
  test('Handles verify.ok failure', async () => {
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

  test('Handles chai expect success', async () => {
    await client.expect(true).to.be.true;
  });

  test('Handles chai expect failure', async () => {
    const errorHandler = jest.fn();
    try {
      await client.expect(false).to.be.true;
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith('expected false to be true');
  });

  test('Handles expect.element success', async () => {
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add')
      .expect.element('#result-value')
      .text.to.equal('9');
  });

  test('Handles expect.element failure', async () => {
    const errorHandler = jest.fn();
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add')
        .expect.element('#result-value')
        .text.to.equal('10');
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Expected element <#result-value> text to equal: "10"')
    );
  });

  test('Handles getAttribute failure', async () => {
    const errorHandler = jest.fn();
    try {
      await client
        .init()
        .getAttribute('#not-existing-element', 'test-attribute', ({ error }) => { if (error) { throw Error(error) } });
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Error while running "getAttribute" command: no such element: Unable to locate element')
    );
  });

  test('Handles page object expect.element success', async () => {
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add');

    await calculatorWithResult.expect.element('@result').text.to.contain(9);
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

  test('Handles nested page object expect.element failure', async () => {
    const errorHandler = jest.fn();
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add');

      await nestedCalculator.expect.element('@result').text.to.contain(10);
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Expected element <Element [name=@result]> text to contain: "10"')
    );
  });

  test('Handles page object nested sections expect.element failure', async () => {
    const errorHandler = jest.fn();
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add');

      const childSection = calculatorWithNestedSections.section.parent.section.child;
      await childSection.expect.element('@result').text.to.contain(10);
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining(
        'Expected element <Section [name=parent],Section [name=child],Element [name=@result]> text to contain: "10"'
      )
    );
  });

  test('Handles page object expect.section', async () => {
    const errorHandler = jest.fn();
    try {
      await client.init();
      await calculatorWithSection
        .setA(4)
        .setB(5)
        .pressAdd()
        .checkResult(9)
        .checkResult(-9);
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Expected element <Element [name=@result]> text to equal: "9"')
    );
  });
});
