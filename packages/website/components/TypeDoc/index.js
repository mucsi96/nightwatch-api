import React from 'react';
import path from 'path';
import { Application } from 'typedoc';
import ApiFunction from './ApiFunction';
import ApiVariable from './ApiVariable';
import ApiClass from './ApiClass';
import { withSiteConfig } from '../SiteConfigProvider';

const Typedoc = ({ sourceEntryPoint, tsConfig }) => {
  const app = new Application({
    mode: 'modules',
    tsConfig
  });

  const result = app.converter.convert([sourceEntryPoint]);

  if (result.errors && result.errors.length) {
    result.errors.map(error => {
      throw new Error(error.messageText);
    });
  }

  const projectObject = app.serializer.projectToObject(result.project);

  const module = projectObject.children.find(
    ({ originalName }) => originalName.replace(/\//g, path.sep) === sourceEntryPoint
  );

  if (!module) {
    throw new Error(`${sourceEntryPoint} entry point not found.`);
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

export default withSiteConfig(Typedoc);
