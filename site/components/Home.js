import React from 'react';
import Markdown from 'react-markdown';
import text from '../data/index.md';
import Heading from './Heading';
import Link from './Link';
import Code from './Code';
import Image from './Image';

const Home = () => (
  <Markdown
    escapeHtml={true}
    source={text}
    renderers={{
      heading: Heading,
      link: Link,
      code: Code,
      image: Image
    }}
  />
);

export default Home;
