const fs = require('fs');
const twemoji = require('twemoji');
const emojiRegex = [
  '[\u2049-\u3299]',
  '\ud83c[\udf00-\udfff]',
  '\ud83d[\udc00-\ude4f]',
  '\ud83d[\ude80-\udeff]'
].join('|');

function processMarkdownModuleChunk(moduleParts, chunk) {
  const importMatch = chunk.match(/@import '([^']+)'/);
  const emojiMatch = chunk.match(new RegExp(emojiRegex));

  if (importMatch) {
    const defaultImportVariable = `md${moduleParts.imports.length + 1}`;
    const emojiMapVariable = `emojiMap${moduleParts.imports.length + 1}`;
    const importStatement = `import ${defaultImportVariable}, { emojiMap as ${emojiMapVariable} } from '${
      importMatch[1]
    }';`;

    return {
      ...moduleParts,
      imports: [...moduleParts.imports, importStatement],
      textChunks: [...moduleParts.textChunks, defaultImportVariable],
      importedEmojiMaps: [...moduleParts.importedEmojiMaps, emojiMapVariable]
    };
  }

  if (emojiMatch) {
    const emoji = emojiMatch[0];
    const codePoint = twemoji.convert.toCodePoint(emoji);
    const importVariable = `emoji${moduleParts.imports.length + 1}`;
    const svgPath = `raw-loader!twemoji/2/svg/${codePoint}.svg`;
    const importStatement = `import ${importVariable} from '${svgPath}';`;

    return {
      ...moduleParts,
      imports: [...moduleParts.imports, importStatement],
      textChunks: [...moduleParts.textChunks, `'[${codePoint}](#emoji)'`],
      emojiMap: { ...moduleParts.emojiMap, [codePoint]: importVariable }
    };
  }

  return {
    ...moduleParts,
    textChunks: [...moduleParts.textChunks, JSON.stringify(chunk)]
  };
}

module.exports = function() {
  const content = fs.readFileSync(this.resourcePath, 'utf8');

  const { imports, textChunks, emojiMap, importedEmojiMaps } = content
    .split(new RegExp(`(@import '[^']+'|${emojiRegex})`))
    .filter(chunk => /\S/.test(chunk))
    .reduce(processMarkdownModuleChunk, {
      imports: [],
      textChunks: [],
      emojiMap: {},
      importedEmojiMaps: []
    });

  const moduleSource = [
    imports.join('\n'),
    `export const emojiMap = {\n${importedEmojiMaps
      .map(emojiMap => `...${emojiMap}`)
      .concat([
        Object.entries(emojiMap)
          .map(([codePoint, variable]) => `['${codePoint}']: ${variable}`)
          .join(', ')
      ])
      .join(',\n')}};\n`,
    `export default [\n${textChunks
      .concat([`'<--EMOJI-MAP--' + JSON.stringify(emojiMap) + '--EMOJI-MAP-->'`])
      .join(',\n')}\n].join('');`
  ]
    .filter(part => part.length)
    .join('\n');

  // process.stdout.write(moduleSource);

  return moduleSource;
};
