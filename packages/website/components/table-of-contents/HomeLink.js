import React from 'react';
import styled from 'styled-components';
import { version } from 'packageJson';

const StyledHomeLink = styled.a`
  font-size: 1.3em;
  color: inherit;
  text-decoration: none;
  margin-bottom: 30px;
  display: block;
  color: #282c34;
  transition: filter 0.1s linear;

  .no-touchevents &:hover {
    filter: invert(50%);
  }
`;

const Title = styled('span')`
  font-weight: bold;
  margin-right: 15px;
`;

const Version = styled('span')``;

const HomeLink = ({ title }) => (
  <StyledHomeLink href="/">
    <Title>{title}</Title> <Version>{`v${version}`}</Version>
  </StyledHomeLink>
);

export default HomeLink;
