import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Site from './components/Site';
import siteConfig from './site-config.json';
import SiteConfigProvider from './components/SiteConfigProvider';

const render = ({ path, contributors }) => {
  const sheet = new ServerStyleSheet();
  const html = `<!DOCTYPE html>${renderToStaticMarkup(
    sheet.collectStyles(
      <SiteConfigProvider {...siteConfig} contributors={contributors} path={path}>
        <Site />
      </SiteConfigProvider>
    )
  )}`;
  const styleTags = sheet.getStyleTags();
  return html.replace('</head>', `${styleTags}</head>`);
};

export default render;
