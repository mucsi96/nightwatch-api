const { Section } = require('../../src');

const commands = {
  getDynamicSection(expectedResult) {
    return new Section(
      {
        selector: 'body',
        commands: [
          {
            setA: function(value) {
              return this.setValue('#a', value);
            },
            setB: function(value) {
              return this.setValue('#b', value);
            },
            pressAdd: function() {
              return this.click('#add');
            },
            checkResult: function() {
              return this.assert.containsText('#result', expectedResult);
            }
          }
        ]
      },
      {
        name: 'Dynamic Section',
        parent: this
      }
    );
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
