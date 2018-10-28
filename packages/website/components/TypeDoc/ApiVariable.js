import React from 'react';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import ApiType from './ApiType';

const ApiVariable = ({ name, type, comment, minLevel }) => {
  const title = name;
  const description = comment && comment.shortText;

  return (
    <>
      <Heading level={minLevel}>{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <Heading level={minLevel + 1}>Type</Heading>
      <ApiType {...type} />
    </>
  );
};

ApiVariable.defaultProps = {
  minLevel: 2
};

export default ApiVariable;
