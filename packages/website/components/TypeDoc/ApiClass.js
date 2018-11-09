import React from 'react';
import Heading from '../content/Heading';
import ApiFunction from './ApiFunction';
import ApiVariable from './ApiVariable';
import ApiDescription from './ApiDescription';
import ApiExamples from './ApiExamples';

const hasConstructors = children => {
  return (
    children.filter(({ kindString }) => {
      return kindString === 'Constructor';
    }).length > 0
  );
};

const getConstructors = children => {
  return children
    .filter(({ kindString }) => {
      return kindString === 'Constructor';
    })
    .map(constructor => <ApiFunction key={constructor.id} minLevel={4} {...constructor} />);
};

const hasProperties = children => {
  return (
    children.filter(({ kindString }) => {
      return kindString === 'Property';
    }).length > 0
  );
};

const getProperties = children => {
  return children
    .filter(({ kindString }) => {
      return kindString === 'Property';
    })
    .map(property => <ApiVariable key={property.id} minLevel={4} {...property} />);
};

const hasMethods = children => {
  return (
    children.filter(({ kindString }) => {
      return kindString === 'Method';
    }).length > 0
  );
};

const getMethods = children => {
  return children
    .filter(({ kindString }) => {
      return kindString === 'Method';
    })
    .map(method => <ApiFunction key={method.id} minLevel={4} {...method} />);
};

const ApiClass = ({ name, comment, children }) => {
  return (
    <>
      <Heading level={2}>{name}</Heading>
      <ApiDescription {...comment} />
      {hasConstructors(children) && (
        <>
          <Heading level={3}>Constructors</Heading>
          {getConstructors(children)}
        </>
      )}
      {hasProperties(children) && (
        <>
          <Heading level={3}>Properties</Heading>
          {getProperties(children)}
        </>
      )}
      {hasMethods(children) && (
        <>
          <Heading level={3}>Methods</Heading>
          {getMethods(children)}
        </>
      )}
      <ApiExamples {...comment} headingLevel={3} />
    </>
  );
};

export default ApiClass;
