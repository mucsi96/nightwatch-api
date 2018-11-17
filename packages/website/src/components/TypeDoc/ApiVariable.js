import React from 'react';
import Heading from '../content/Heading';
import ApiType from './ApiType';
import ApiDescription from './ApiDescription';
import ApiExamples from './ApiExamples';
import ApiSubSection from './ApiSubSection';

const ApiVariable = ({ name, type, comment, minLevel }) => {
  const title = name;

  return (
    <>
      <Heading level={minLevel}>{title}</Heading>
      <ApiDescription {...comment} />
      <ApiSubSection>Type</ApiSubSection>
      <ApiType {...type} />
      <ApiExamples {...comment} headingLevel={minLevel + 1} />
    </>
  );
};

ApiVariable.defaultProps = {
  minLevel: 2
};

export default ApiVariable;
