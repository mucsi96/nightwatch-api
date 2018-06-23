import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/styles/hljs';

const Code = styled(({ language, value, className }) => (
  <SyntaxHighlighter language={language} style={gruvboxDark} className={className}>
    {value}
  </SyntaxHighlighter>
))`
  border-radius: 4px;
  padding: 1em !important;

  @media (max-width: 769px) {
    margin-left: -15px;
    margin-right: -15px;
    border-radius: 0;
  }
`;

export default Code;
