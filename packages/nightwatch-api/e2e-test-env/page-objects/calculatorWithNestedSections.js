module.exports = {
  sections: {
    parent: {
      selector: 'body',
      sections: {
        child: {
          selector: '#result',
          elements: {
            result: '#result-value'
          }
        }
      }
    }
  }
};
