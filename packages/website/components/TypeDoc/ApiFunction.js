import React from 'react';
import styled from 'styled-components';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import ApiFunctionParameter from './ApiFunctionParameter';
import ApiType from './ApiType';
import ApiExamples from './ApiExamples';
import Debug from '../Debug';

const ApiFunctionDetails = styled('div')`
  display: flex;
`;

const ApiFunctionDetail = styled('div')`
  flex: 1;
`;

const ApiFunction = ({ signatures, minLevel }) => {
  return signatures.map(({ name, comment, parameters, type }) => {
    const title = `${name}(${parameters.map(({ name }) => name).join()})`;
    const description = comment && comment.shortText;

    return (
      <>
        <Heading level={minLevel}>{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <ApiFunctionDetails>
          <ApiFunctionDetail>
            <Heading level={minLevel + 1}>Parameters</Heading>
            <ul>
              {parameters.map(parameter => (
                <ApiFunctionParameter {...parameter} />
              ))}
            </ul>
          </ApiFunctionDetail>
          <ApiFunctionDetail>
            <Heading level={minLevel + 1}>Returns</Heading> <ApiType {...type} />
          </ApiFunctionDetail>
        </ApiFunctionDetails>
        <ApiExamples {...comment} headingLevel={minLevel + 1} />
      </>
    );
  });
};

ApiFunction.defaultProps = {
  minLevel: 2
};

export default ApiFunction;
