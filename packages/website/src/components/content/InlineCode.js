import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const StyledInlineCode = styled.code`
  padding: 2px 4px;
  border-radius: 4px;

  ${theme.inlineCode}
`;

const InlineCode = ({ children }) => <StyledInlineCode>{children}</StyledInlineCode>;

export default InlineCode;
