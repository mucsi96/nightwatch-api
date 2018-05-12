const { client } = require('../src');

const notExistingPage = client.page.notExistingPage();

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
});
