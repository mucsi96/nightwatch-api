import React from 'react';
import Debug from '../Debug';
import InlineCode from '../InlineCode';

const getParameterType = type => {
  switch (type && type.type) {
    case 'reflection':
      return 'object';
    case 'intrinsic':
      return type.name;
    case 'union':
      return type.types
        .map(({ name }) => name)
        .filter(name => name !== 'undefined')
        .join(' | ');
    default:
      return type.type;
  }
};

const getSubTypes = type => {
  if (!type || !type.declaration) {
    return null;
  }

  return (
    <ul>
      {type.declaration.children.map(item => (
        <ApiFunctionParameter {...item} />
      ))}
    </ul>
  );
};

const ApiFunctionParameter = ({ name, type, comment, flags }) => {
  const title = [name, flags && flags.isOptional ? '?' : '', ': ', getParameterType(type)].join('');
  const description = comment && comment.shortText;

  return (
    <li>
      <InlineCode>{title}</InlineCode> {description}
      {getSubTypes(type)}
    </li>
  );
};

export default ApiFunctionParameter;
