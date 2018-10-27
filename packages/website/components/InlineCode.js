import React from 'react';
import styled from 'styled-components';

const StyledInlineCode = styled.code`
  padding: 2px 4px;
  font-size: 90%;
  background-color: #f9f2f4;
  border-radius: 4px;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

const InlineCode = ({ children }) => <StyledInlineCode>{children}</StyledInlineCode>;

export default InlineCode;
