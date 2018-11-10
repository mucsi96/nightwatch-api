import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import theme from '../../theme';

const CodeWrapper = styled.div`
  margin: 25px -30px;
  padding: 0 15px;
  overflow: auto;

  ${theme.code}

  @media (min-width: 720px) {
    border-radius: 10px;
  }
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: calc(1rem - 0.5em);
  white-space: pre-wrap;
  word-break: break-word;
`;

const Code = ({ language, value }) => (
  <CodeWrapper>
    <StyledSyntaxHighlighter language={language} style={theme.syntaxHighlight}>
      {value}
    </StyledSyntaxHighlighter>
  </CodeWrapper>
);

export default Code;
