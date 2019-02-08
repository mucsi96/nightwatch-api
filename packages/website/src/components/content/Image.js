import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Image = ({ src }) => <StyledImage src={src} />;

export default Image;
