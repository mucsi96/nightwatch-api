import React from 'react';
import Markdown from 'react-markdown';
import Link from '../Link';
import InlineCode from '../InlineCode';

const ApiDescription = ({ shortText }) => {
  if (!shortText) {
    return null;
  }

  return (
    <Markdown
      escapeHtml={true}
      source={shortText}
      renderers={{
        link: ({ href, children }) => <Link href={href}>{children}</Link>,
        inlineCode: InlineCode,
        paragraph: 'span'
      }}
    />
  );
};

export default ApiDescription;
