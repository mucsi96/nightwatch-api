import React from 'react';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import ApiFunction from './ApiFunction';
import ApiVariable from './ApiVariable';

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
    .map(constructor => <ApiFunction minLevel={4} {...constructor} />);
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
    .map(field => <ApiVariable minLevel={4} {...field} />);
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
    .map(method => <ApiFunction minLevel={4} {...method} />);
};

const ApiClass = ({ name, comment, children }) => {
  const description = comment && comment.shortText;
  return (
    <>
      <Heading level={2}>{name}</Heading>
      <Paragraph>{description}</Paragraph>
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
    </>
  );
};

export default ApiClass;
