import React from 'react';
import Heading from '../Heading';
import ApiType from './ApiType';
import ApiDescription from './ApiDescription';
import ApiExamples from './ApiExamples';

const ApiVariable = ({ name, type, comment, minLevel }) => {
  const title = name;

  return (
    <>
      <Heading level={minLevel}>{title}</Heading>
      <ApiDescription {...comment} />
      <Heading level={minLevel + 1}>Type</Heading>
      <ApiType {...type} />
      <ApiExamples {...comment} headingLevel={minLevel + 1} />
    </>
  );
};

ApiVariable.defaultProps = {
  minLevel: 2
};

export default ApiVariable;
