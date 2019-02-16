import React from 'react';
import styled, { css } from 'styled-components';
import SyntaxHighlighter, { Light as SyntaxHighlighterCore } from 'react-syntax-highlighter';
import theme from '../../theme';

SyntaxHighlighterCore.registerLanguage('terminal', () => ({
  case_insensitive: true,
  contains: [
    {
      className: 'purple',
      begin: /^Feature: |^  Scenario:/
    },
    {
      className: 'green',
      begin: /^√|1 passed|3 passed/
    }
  ]
}));

const CodeWrapper = styled.div`
  margin: 25px -18px;
  padding: 0 18px;
  overflow: auto;
  border-radius: 10px;

  ${theme.code}
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 0 -0.5em;
  white-space: pre-wrap;
  word-break: break-word;

  .hljs-purple {
    color: #b4009e;
  }

  .hljs-green {
    color: #11a10e;
  }
`;

const WindowButton = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;

  ${({ type }) => {
    const color = {
      close: '#ff5f56',
      minimize: '#ffbd2e',
      maximize: '#27c93f'
    }[type];

    return css`
      background-color: ${color};
    `;
  }}
`;

const WindowButtonsWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: repeat(3, auto);
  align-items: center;
`;

const WindowButtons = () => (
  <WindowButtonsWrapper>
    <WindowButton type="close" />
    <WindowButton type="minimize" />
    <WindowButton type="maximize" />
  </WindowButtonsWrapper>
);

const WindowTitle = styled.div`
  color: white;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin-top: 12px;
`;

const titleRegex = /^\/\/ (.*?)\r?\n/;

const Code = ({ language, value }) => {
  const titleMatch = value.match(titleRegex);
  const windowTitle = titleMatch && titleMatch[1];
  let code = value;

  if (windowTitle) {
    code = code.replace(titleRegex, '').replace(/^\s+/, '');
  }

  if (language === 'terminal') {
    code = `$ ${value}`;
  }

  return (
    <CodeWrapper>
      {
        <WindowTitle>
          <WindowButtons />
          {windowTitle || '\u00a0'}
        </WindowTitle>
      }
      <StyledSyntaxHighlighter language={language} style={theme.syntaxHighlight}>
        {code}
      </StyledSyntaxHighlighter>
    </CodeWrapper>
  );
};

export default Code;
