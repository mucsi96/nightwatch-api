import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  max-width: 42em;
`;

const Paragraph = ({ children }) => <StyledParagraph>{children}</StyledParagraph>;

export default Paragraph;
