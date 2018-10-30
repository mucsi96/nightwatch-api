import React from 'react';
import ApiFunction from './ApiFunction';
import ApiVariable from './ApiVariable';
import ApiClass from './ApiClass';
import { withSiteConfig } from '../SiteConfigProvider';
import typedoc from 'appSource';

const Typedoc = () => {
  const children = typedoc.children;

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

export default withSiteConfig(Typedoc);
