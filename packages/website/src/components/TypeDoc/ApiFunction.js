import React from 'react';
import styled from 'styled-components';
import Heading from '../content/Heading';
import ApiFunctionParameter from './ApiFunctionParameter';
import ApiType from './ApiType';
import ApiExamples from './ApiExamples';
import ApiDescription from './ApiDescription';
import ApiSubSection from './ApiSubSection';

const ApiFunctionDetails = styled.div`
  display: flex;
  flex-wrap: wrap;

  div:first-child {
    margin-right: 40px;
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
              <ApiSubSection>Parameters</ApiSubSection>
              <ul>
                {parameters.map(parameter => (
                  <ApiFunctionParameter key={parameter.id} {...parameter} />
                ))}
              </ul>
            </div>
          )}
          <div>
            <ApiSubSection>Returns</ApiSubSection> <ApiType {...type} />
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
