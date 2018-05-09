const { client } = require("../src");

describe("general", () => {
  test("runs", async () => {
    expect(client.settings.desiredCapabilities.browserName).toEqual("chrome");
  });
});
