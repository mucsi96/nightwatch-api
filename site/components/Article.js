import React from 'react';
import Markdown from 'react-markdown';
import Heading from '../components/Heading';
import Link from '../components/Link';
import Code from '../components/Code';
import Image from '../components/Image';

const Article = ({ markdown }) => (
  <Markdown
    escapeHtml={true}
    source={markdown}
    renderers={{
      heading: Heading,
      link: Link,
      code: Code,
      image: Image
    }}
  />
);

export default Article;
