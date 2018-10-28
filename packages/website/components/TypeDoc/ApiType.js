import React from 'react';
import InlineCode from '../InlineCode';
import ApiDescription from './ApiDescription';

const getTypeArguments = typeArguments => {
  if (!typeArguments) {
    return '';
  }

  return `<${[typeArguments.map(({ name }) => name)].join(', ')}>`;
};

const getTypeDefinition = (name, type, typeArguments) => {
  switch (type) {
    case 'reference':
      return <InlineCode>{`${name}${getTypeArguments(typeArguments)}`}</InlineCode>;
  }
};

const ApiType = ({ type, name, comment, typeArguments }) => {
  return (
    <>
      <InlineCode>{getTypeDefinition(name, type, typeArguments)}</InlineCode>{' '}
      <ApiDescription {...comment} />
    </>
  );
};

export default ApiType;
