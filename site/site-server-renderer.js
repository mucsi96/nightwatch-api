import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Site from './components/Site';
import MainProvider from './components/MainProvider';

const render = locals => {
  const sheet = new ServerStyleSheet();
  const html = `<!DOCTYPE html>${renderToStaticMarkup(
    sheet.collectStyles(
      <MainProvider {...locals}>
        <Site />
      </MainProvider>
    )
  )}`;
  const styleTags = sheet.getStyleTags();
  return html.replace('</head>', `${styleTags}</head>`);
};

export default render;
