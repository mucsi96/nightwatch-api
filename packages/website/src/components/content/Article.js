import React from 'react';
import Markdown from 'react-markdown';
import Heading from './Heading';
import Link from './Link';
import Code from './Code';
import Image from './Image';
import InlineCode from './InlineCode';
import Emoji from './Emoji';
import Paragraph from './Paragraph';
import Contributors from './Contributors';

const EMOJI_MAP_REGEX = /<--EMOJI-MAP--(.*)--EMOJI-MAP-->/;

const Article = ({ markdown }) => {
  const emojiMap = JSON.parse(EMOJI_MAP_REGEX.exec(markdown)[1]);

  return (
    <article>
      <Markdown
        escapeHtml={true}
        source={markdown.replace(EMOJI_MAP_REGEX, '')}
        renderers={{
          heading: Heading,
          link: ({ href, children }) => {
            if (href === '#contributors') {
              return <Contributors />;
            }
            if (href === '#emoji') {
              return <Emoji svg={emojiMap[children]} />;
            }
            return <Link href={href}>{children}</Link>;
          },
          inlineCode: InlineCode,
          code: Code,
          image: Image,
          paragraph: Paragraph
        }}
      />
    </article>
  );
};

export default Article;
