import React from 'react';
import Markdown from 'react-markdown';
import Heading from '../components/Heading';
import Link from '../components/Link';
import Code from '../components/Code';
import Image from '../components/Image';
import InlineCode from '../components/InlineCode';

const Article = ({ markdown }) => (
  <article>
    <Markdown
      escapeHtml={true}
      source={markdown}
      renderers={{
        heading: Heading,
        link: Link,
        inlineCode: InlineCode,
        code: Code,
        image: Image
      }}
    />
  </article>
);

export default Article;
