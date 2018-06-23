import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/styles/hljs';

const Code = ({ language, value, className }) => {
  return (
    <SyntaxHighlighter language={language} style={gruvboxDark} className={className}>
      {value}
    </SyntaxHighlighter>
  );
};

const StyledCode = styled(Code)`
  border-radius: 4px;

  code {
    padding: 2px 4px;
  }

  @media (max-width: 769px) {
    margin-left: -15px;
    margin-right: -15px;
    border-radius: 0;
  }
`;

export default StyledCode;
