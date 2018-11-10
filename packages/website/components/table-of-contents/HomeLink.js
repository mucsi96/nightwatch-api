import React from 'react';
import styled from 'styled-components';
import { version } from 'packageJson';

const StyledHomeLink = styled.a`
  font-size: 1.3em;
  text-decoration: none;
  margin-bottom: 30px;
  display: block;
  color: #282c34;
  transition: filter 0.1s linear;

  .no-touchevents &:hover {
    filter: invert(50%);
  }
`;

const HomeLink = ({ title }) => (
  <StyledHomeLink href="/">
    <strong>{title}</strong>
    <div>{`v${version}`}</div>
  </StyledHomeLink>
);

export default HomeLink;
