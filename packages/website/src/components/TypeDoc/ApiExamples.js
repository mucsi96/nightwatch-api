import React from 'react';
import Code from '../content/Code';
import ApiSubSection from './ApiSubSection';

const hasExampes = tags => {
  return tags.filter(({ tag }) => tag === 'example').length > 0;
};

const getExamples = tags => {
  return tags
    .filter(({ tag }) => tag === 'example')
    .map(({ text }, index) => {
      return <Code key={index} language="javascript" value={text} />;
    });
};

const ApiExamples = ({ tags, headingLevel }) => {
  if (!tags || !hasExampes(tags)) {
    return null;
  }

  return (
    <>
      <ApiSubSection>Examples</ApiSubSection>
      {getExamples(tags)}
    </>
  );
};

export default ApiExamples;
