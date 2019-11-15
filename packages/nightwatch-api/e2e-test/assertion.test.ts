import 'mocha';
require('chai').should();

import { client } from '../src';
import expect from 'expect';

const calculatorWithResult = client.page.calculatorWithResult();
const nestedCalculator = client.page.nested.calculator();
const calculatorWithNestedSections = client.page.calculatorWithNestedSections();
const calculatorWithSection = client.page.calculatorWithSection();

describe('Assertion features', () => {
  it('Handles assert.ok success', async () => {
    await client.assert.ok(true, 'this assertion should pass');
  });

  // Due to bug in Nightwatch this test throws error
  // Error is emitted but not caught
  // https://github.com/nightwatchjs/nightwatch/blob/master/lib/core/assertion.js#L109
  it('Handles assert.ok failure', async () => {
    let errorMessage;
    try {
      await client.assert.ok(false, 'this assertion should not pass');
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain('Failed [ok]: (this assertion should not pass)');
  });

  it('Handles verify.ok success', async () => {
    await client.verify.ok(true, 'this assertion should pass');
  });

  it('Handles verify.ok failure', async () => {
    await client.verify.ok(false, 'this assertion should not pass');
  });

  it('Handles chai expect success', async () => {
    await client.expect(true).to.be.true;
  });

  it('Handles chai expect failure', async () => {
    let errorMessage;
    try {
      await client.expect(false).to.be.true;
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain('expected false to be true');
  });

  it('Handles expect.element success', async () => {
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add')
      .expect.element('#result-value')
      .text.to.equal('9');

    await client.expect.element('#a').text.to.equal('10');
  });

  it('Handles expect.element twice', async () => {
    await client.init();

    debugger;

    await client.expect.element('#a').text.to.equal('10');
    await client.expect.element('#a').text.to.equal('10');
  });

  it('Handles expect.element failure', async () => {
    let errorMessage;
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add')
        .expect.element('#result-value')
        .text.to.equal('10');
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain('Expected element <#result-value> text to equal: "10"');
  });

  it('Handles page object expect.element success', async () => {
    await client
      .init()
      .setValue('#a', 4)
      .setValue('#b', 5)
      .click('#add');

    await calculatorWithResult.expect.element('@result').text.to.contain(9);
  });

  it('Handles page object expect.element failure', async () => {
    let errorMessage;
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add');

      await calculatorWithResult.expect.element('@result').text.to.contain(10);
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain(
      'Expected element <Element [name=@result]> text to contain: "10"'
    );
  });

  it('Handles nested page object expect.element failure', async () => {
    let errorMessage;
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add');

      await nestedCalculator.expect.element('@result').text.to.contain(10);
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain(
      'Expected element <Element [name=@result]> text to contain: "10"'
    );
  });

  it('Handles page object nested sections expect.element failure', async () => {
    let errorMessage;
    try {
      await client
        .init()
        .setValue('#a', 4)
        .setValue('#b', 5)
        .click('#add');

      const childSection = calculatorWithNestedSections.section.parent.section.child;
      await childSection.expect.element('@result').text.to.contain(10);
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain(
      'Expected element <Section [name=parent],Section [name=child],Element [name=@result]> text to contain: "10"'
    );
  });

  it('Handles page object expect.section', async () => {
    let errorMessage;
    try {
      await client.init();
      await calculatorWithSection
        .setA(4)
        .setB(5)
        .pressAdd()
        .checkResult(9)
        .checkResult(-9);
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toContain('Expected element <Element [name=@result]> text to equal: "9"');
  });
});
