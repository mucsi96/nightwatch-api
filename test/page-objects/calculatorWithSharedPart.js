const { client } = require('../../src');

const shared = client.page.shared();
const commands = {
  setA: function(value) {
    shared.setValue('@a', value);
    return this;
  },
  setB: function(value) {
    shared.setValue('@b', value);
    return this;
  },
  pressAdd: function() {
    shared.click('@add');
    return this;
  },
  checkResult: function(expectedResult) {
    shared.assert.containsText('@result', expectedResult);
    return this;
  }
};

module.exports = {
  url: `http://localhost:${process.env.TEST_APP_PORT}`,
  elements: {
    body: 'body',
    searchBar: 'input[name="p"]'
  },
  commands: [commands]
};
