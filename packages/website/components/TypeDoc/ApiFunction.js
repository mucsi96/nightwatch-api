import React from 'react';
import styled from 'styled-components';
import Heading from '../Heading';
import ApiFunctionParameter from './ApiFunctionParameter';
import ApiType from './ApiType';
import ApiExamples from './ApiExamples';
import ApiDescription from './ApiDescription';

const ApiFunctionDetails = styled('div')`
  display: flex;
  flex-wrap: wrap;

  div:first-child {
    margin-right: var(--sidebar-gutter);
  }
`;

const ApiFunction = ({ signatures, minLevel }) => {
  return signatures.map(({ id, name, comment, parameters = [], type }) => {
    const title = `${name}(${parameters.map(({ name }) => name).join()})`;

    return (
      <>
        <Heading level={minLevel}>{title}</Heading>
        <ApiDescription {...comment} />
        <ApiFunctionDetails>
          {!!parameters.length && (
            <div>
              <Heading level={minLevel + 1}>Parameters</Heading>
              <ul>
                {parameters.map(parameter => (
                  <ApiFunctionParameter key={parameter.id} {...parameter} />
                ))}
              </ul>
            </div>
          )}
          <div>
            <Heading level={minLevel + 1}>Returns</Heading> <ApiType {...type} />
          </div>
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
