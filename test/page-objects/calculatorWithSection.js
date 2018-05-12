const commands = {
  setA: function(value) {
    return this.setValue('@a', value);
  },
  setB: function(value) {
    return this.setValue('@b', value);
  },
  pressAdd: function() {
    this.api.pause(1000);
    return this.click('@add');
  },
  checkResult: function(expectedResult) {
    return this.expect.section('@result').text.to.equal(expectedResult);
  }
};

module.exports = {
  url: `http://localhost:${process.env.TEST_APP_PORT}`,
  elements: {
    body: 'body',
    a: '#a',
    b: '#b',
    add: '#add',
    searchBar: 'input[name="p"]'
  },
  sections: {
    result: {
      selector: '#result'
    }
  },
  commands: [commands]
};
