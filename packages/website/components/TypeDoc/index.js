import React from 'react';
import { withTypedoc } from './Provider';
import ApiFunction from './ApiFunction';
import Debug from '../Debug';

const Typedoc = ({ typedoc, entryPoit }) => {
  const module = typedoc.children.find(({ name }) => name === `"${entryPoit}"`);

  if (!module) {
    throw new Error(`${entryPoit} entry point not found.`);
  }

  return module.children.map(child => {
    if (!child.flags || !child.flags.isExported) {
      return null;
    }

    if (child.kindString === 'Function') {
      return <ApiFunction {...child} />;
    }

    return <Debug {...child} />;
  });
};

Typedoc.defaultProps = {
  entryPoit: 'index'
};

export default withTypedoc(Typedoc);
