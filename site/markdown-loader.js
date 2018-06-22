const fs = require('fs');
const path = require('path');

function loadMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.replace(/@import '([^']+)'/g, (match, fileName) => {
    return `${loadMarkdown(path.resolve(path.dirname(filePath), fileName))}\n`;
  });
}

module.exports = function() {
  return `module.exports = ${JSON.stringify(loadMarkdown(this.resourcePath))}`;
};
