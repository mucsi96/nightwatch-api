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
  margin: 25px -30px;
  padding: 0 15px;
  overflow: auto;

  ${theme.code}

  @media (min-width: 600px) {
    border-radius: 10px;
  }
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: calc(1rem - 0.5em);
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
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 4px;
  border-radius: 50%;
  outline: 1px solid transparent;

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
  top: 15px;
  left: 11px;
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
  padding-top: 15px;
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
