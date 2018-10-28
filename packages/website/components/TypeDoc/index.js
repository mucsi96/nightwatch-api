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

  return module.children.map(child => {
    if (!child.flags || !child.flags.isExported) {
      return null;
    }

    switch (child.kindString) {
      case 'Class':
        return <ApiClass {...child} />;
      case 'Function':
        return <ApiFunction {...child} />;
      case 'Variable':
        return <ApiVariable {...child} />;
      default:
        return <Debug {...child} />;
    }
  });
};

Typedoc.defaultProps = {
  entryPoit: 'index'
};

export default withTypedoc(Typedoc);
