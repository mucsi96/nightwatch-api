import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import Site from "./components/Site";
import ContributorsProvider from "./components/ContributorsProvider";

const render = ({ path, contributors }) => {
  const sheet = new ServerStyleSheet();
  const html = `<!DOCTYPE html>${renderToStaticMarkup(
    sheet.collectStyles(
      <ContributorsProvider contributors={contributors}>
        <Site path={path} />
      </ContributorsProvider>
    )
  )}`;
  const styleTags = sheet.getStyleTags();
  return html.replace("</head>", `${styleTags}</head>`);
};

export default render;
