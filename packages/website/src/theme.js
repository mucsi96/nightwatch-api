import { css } from 'styled-components';
import * as HighlighJs from 'react-syntax-highlighter/styles/hljs';

const theme = {
  base: css`
    color: #000;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  `,
  syntaxHighlight: HighlighJs.tomorrowNightEighties,
  code: css`
    font-size: 14px;
    line-height: 20px;
    background-color: #2d2d2d;
  `,
  inlineCode: css`
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 90%;
    background-color: #f9f2f4;
  `,
  primaryColor: '#282c34',
  secondaryColor: '#f7f7f7',
  linkColor: '#337ab7',
  hoverEffect: css`
    filter: contrast(0.1);
  `,
  shortAnimation: '.1s ease',
  animation: '.15s ease'
};

export default theme;
