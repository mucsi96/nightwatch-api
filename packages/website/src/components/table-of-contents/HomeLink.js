import React from 'react';
import styled from 'styled-components';
import { version } from 'packageJson';
import theme from '../../theme';

const StyledHomeLink = styled.a`
  font-size: 1.3em;
  text-decoration: none;
  display: block;
  transition: filter ${theme.shortAnimation};
  color: ${theme.primaryColor};

  .no-touchevents &:hover {
    ${theme.hoverEffect}
  }
`;

const HomeLink = ({ title }) => (
  <StyledHomeLink href="/">
    <strong>{title}</strong>
    <div>{`v${version}`}</div>
  </StyledHomeLink>
);

export default HomeLink;
