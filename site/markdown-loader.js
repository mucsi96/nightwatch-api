const fs = require('fs');
const path = require('path');
const twemoji = require('twemoji');
const twemojiSrc = path.resolve(__dirname, '../node_modules/twemoji/2/svg');

function getEmojiSVG(emoji) {
  return fs.readFileSync(
    path.resolve(twemojiSrc, `${twemoji.convert.toCodePoint(emoji)}.svg`),
    'utf8'
  );
}

function loadMarkdown(filePath) {
  const ranges = [
    '[\u2049-\u3299]',
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude80-\udeff]'
  ];
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .replace(/@import '([^']+)'/g, (match, fileName) => {
      return `${loadMarkdown(path.resolve(path.dirname(filePath), fileName))}\n`;
    })
    .replace(new RegExp(ranges.join('|'), 'g'), emoji => getEmojiSVG(emoji));
}

module.exports = function() {
  return `module.exports = ${JSON.stringify(loadMarkdown(this.resourcePath))}`;
};
