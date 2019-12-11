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
    return shared.assert.containsText('@result', expectedResult);
  }
};

module.exports = {
  url: `http://localhost:3000`,
  elements: {
    body: 'body',
    searchBar: 'input[name="p"]'
  },
  commands: [commands]
};
