import React from 'react';
import { withTypedoc } from './Provider';
import ApiFunction from './ApiFunction';
import Debug from '../Debug';
import ApiVariable from './ApiVariable';
import ApiClass from './ApiClass';

const Typedoc = ({ typedoc, entryPoit }) => {
  const module = typedoc.children.find(({ name }) => name === `"${entryPoit}"`);

  if (!module) {
    throw new Error(`${entryPoit} entry point not found.`);
  }

  const children = module.children;

  children.sort((a, b) => {
    return a.sources[0].line - b.sources[0].line;
  });

  return children.map(child => {
    if (!child.flags || !child.flags.isExported) {
      return null;
    }

    switch (child.kindString) {
      case 'Class':
        return <ApiClass key={child.id} {...child} />;
      case 'Function':
        return <ApiFunction key={child.id} {...child} />;
      case 'Variable':
        return <ApiVariable key={child.id} {...child} />;
      default:
        return null;
    }
  });
};

Typedoc.defaultProps = {
  entryPoit: 'index'
};

export default withTypedoc(Typedoc);
