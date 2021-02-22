const path = require('path');
const { getOptions } = require('loader-utils');
const { Application } = require('typedoc');

module.exports = function () {
  const options = getOptions(this);
  const app = new Application(options);

  console.log({ options, app, resourcePath: this.resourcePath });

  const result = app.converter.convert([this.resourcePath]);

  if (result.errors && result.errors.length) {
    result.errors.map((error) => {
      throw new Error(error.messageText);
    });
  }

  const projectObject = app.serializer.projectToObject(result.project);

  const module = projectObject.children.find(
    ({ originalName }) => originalName.replace(/\//g, path.sep) === this.resourcePath
  );

  if (!module) {
    throw new Error(`${this.resourcePath} entry point not found.`);
  }

  return `export default ${JSON.stringify(module)}`;
};
