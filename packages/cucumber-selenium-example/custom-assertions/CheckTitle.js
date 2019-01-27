exports.assertion = function(expected) {
  this.message = `Testing title to be ${expected}`;
  this.expected = expected;

  this.pass = function(value) {
    return value === this.expected;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    this.api.title(callback);

    return this;
  };
};
