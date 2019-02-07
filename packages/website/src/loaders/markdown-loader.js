const fs = require('fs');
const twemoji = require('twemoji');
const emojiRegex = require('emoji-regex')();
const mdImport = `@import '[^']+'`;
const mdImportWithPath = /@import '([^']+)'/;
const relativeImage = '!\\[alt-tag\\]\\(\\..*?\\)';
const relativeImageWithPath = /!\[alt-tag\]\((\..*?)\)/;

function processMarkdownImport(moduleParts, path) {
  const defaultImportVariable = `md${moduleParts.imports.length + 1}`;
  const emojiMapVariable = `emojiMap${moduleParts.imports.length + 1}`;
  const importStatement = `import ${defaultImportVariable}, { emojiMap as ${emojiMapVariable} } from '${path}';`;
  const textChunk = `${defaultImportVariable}.replace(/<--EMOJI-MAP--.*?--EMOJI-MAP-->/, '')`;

  return {
    ...moduleParts,
    imports: [...moduleParts.imports, importStatement],
    textChunks: [...moduleParts.textChunks, textChunk],
    importedEmojiMaps: [...moduleParts.importedEmojiMaps, emojiMapVariable]
  };
}

function processEmoji(moduleParts, emoji) {
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

function processRelativeImage(moduleParts, path) {
  const importVariable = `relativeImage${moduleParts.imports.length + 1}`;
  const importStatement = `import ${importVariable} from '${path}';`;

  return {
    ...moduleParts,
    imports: [...moduleParts.imports, importStatement],
    textChunks: [...moduleParts.textChunks, `'![alt-tag](' + ${importVariable} + ')'`]
  };
}

function processTextChunk(moduleParts, chunk) {
  return {
    ...moduleParts,
    textChunks: [...moduleParts.textChunks, JSON.stringify(chunk)]
  };
}

function processMarkdownChunk(moduleParts, chunk) {
  const importMatch = chunk.match(mdImportWithPath);
  const emojiMatch = chunk.match(new RegExp(emojiRegex));
  const relativeImageMatch = chunk.match(relativeImageWithPath);

  if (importMatch) {
    return processMarkdownImport(moduleParts, importMatch[1]);
  }

  if (emojiMatch) {
    return processEmoji(moduleParts, emojiMatch[0]);
  }

  if (relativeImageMatch) {
    return processRelativeImage(moduleParts, relativeImageMatch[1]);
  }

  return processTextChunk(moduleParts, chunk);
}

function createESModulePartsFromMarkdown(markdownSource) {
  return markdownSource
    .split(new RegExp(`(${mdImport}|${emojiRegex}|${relativeImage})`))
    .filter(chunk => chunk)
    .reduce(processMarkdownChunk, {
      imports: [],
      textChunks: [],
      emojiMap: {},
      importedEmojiMaps: []
    });
}

function createESModuleSourceFromParts({ imports, textChunks, emojiMap, importedEmojiMaps }) {
  return [
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
}

module.exports = function() {
  const markdownSource = fs.readFileSync(this.resourcePath, 'utf8');

  const ESModuleSource = createESModuleSourceFromParts(
    createESModulePartsFromMarkdown(markdownSource)
  );

  return ESModuleSource;
};
