import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Site from './components/Site';
import ContributorsProvider from './components/ContributorsProvider';
import TypedocProvider from './components/TypeDoc/Provider';

const render = ({ path, contributors, typedoc }) => {
  const sheet = new ServerStyleSheet();
  const html = `<!DOCTYPE html>${renderToStaticMarkup(
    sheet.collectStyles(
      <TypedocProvider typedoc={typedoc}>
        <ContributorsProvider contributors={contributors}>
          <Site path={path} />
        </ContributorsProvider>
      </TypedocProvider>
    )
  )}`;
  const styleTags = sheet.getStyleTags();
  return html.replace('</head>', `${styleTags}</head>`);
};

export default render;
