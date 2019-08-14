import { client } from '../src';

const notExistingPage = client.page.notExistingPage();
const calculatorWithClientInCustomCommand = client.page.calculatorWithClientInCustomCommand();
const calculatorWithSharedPart = client.page.calculatorWithSharedPart();
const calculatorWithDynamicSection = client.page.calculatorWithDynamicSection();

describe('Page object features', () => {
  test('Throws error if page object not exists', async () => {
    const errorHandler = jest.fn();
    try {
      await notExistingPage.init();
    } catch (err) {
      errorHandler(err.message);
    }
    expect(errorHandler).toBeCalledWith(
      expect.stringContaining('Not existing page notExistingPage. Available pages are [')
    );
  });

  test('Enables the usage of client in page object custom commands', async () => {
    await client.init();
    await calculatorWithClientInCustomCommand
      .setA(4)
      .setB(5)
      .pressAdd()
      .checkResult(9);
  });

  test('Enable the usage of shared client in page object custom commands', async () => {
    await client.init();
    await calculatorWithSharedPart
      .setA(4)
      .setB(5)
      .pressAdd()
      .checkResult(9);
  });

  test('Enable the usage of section constructor', async () => {
    const dynamicSection = calculatorWithDynamicSection.getDynamicSection(9);
    await client.init();
    await dynamicSection
      .setA(4)
      .setB(5)
      .pressAdd()
      .checkResult();
  });

  test('Export a section that inherits correctly', async () => {
    const dynamicSection = calculatorWithDynamicSection.getDynamicSection(9);
    await client.init();
    expect(dynamicSection.toString()).toEqual('Section [name=Dynamic Section]');
    expect(dynamicSection.parent).toBe(calculatorWithDynamicSection);
  });
});
