import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/styles/hljs';

const Code = ({ language, value, className }) => (
  <SyntaxHighlighter language={language} style={gruvboxDark} className={className}>
    {value}
  </SyntaxHighlighter>
);

const StyledCode = styled(Code)`
  padding: 0 15px;
  margin: 25px -30px;
  color: white;
  background-color: #282c34;
  font-size: 14px;
  overflow: auto;

  @media (min-width: 720px) {
    border-radius: 10px;
  }

  pre {
    margin: 1rem;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

export default StyledCode;
