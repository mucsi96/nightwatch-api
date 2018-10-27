import React from 'react';
import Debug from '../Debug';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import ApiFunctionParameter from './ApiFunctionParameter';

const ApiFunction = ({ signatures }) => {
  return signatures.map(({ name, comment, parameters, ...signature }) => {
    const title = `${name}(${parameters.map(({ name }) => name).join()})`;
    const description = comment && comment.shortText;

    return (
      <>
        <Heading level={2}>{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <Heading level={3}>Parameters</Heading>
        {parameters.map(parameter => (
          <ApiFunctionParameter {...parameter} />
        ))}
        <Debug {...signature} />
      </>
    );
  });
};

export default ApiFunction;
