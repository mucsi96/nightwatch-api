import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightEighties as theme } from "react-syntax-highlighter/styles/hljs";

const CodeWrapper = styled.div`
  margin: 25px -30px;
  padding: 0 15px;
  background-color: #2d2d2d;
  font-size: 14px;
  overflow: auto;

  @media (min-width: 720px) {
    border-radius: 10px;
  }
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: calc(1rem - 0.5em);
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Code = ({ language, value }) => (
  <CodeWrapper>
    <StyledSyntaxHighlighter language={language} style={theme}>
      {value}
    </StyledSyntaxHighlighter>
  </CodeWrapper>
);

export default Code;
