import React from 'react';
import InlineCode from '../InlineCode';

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
  const description = comment && comment.shortText;
  return (
    <>
      <InlineCode>{getTypeDefinition(name, type, typeArguments)}</InlineCode> {description}
    </>
  );
};

export default ApiType;
