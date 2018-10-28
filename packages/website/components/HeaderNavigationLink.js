import React from 'react';
import styled, { css } from 'styled-components';
import { withSiteConfig } from './SiteConfigProvider';

const StyledLink = styled('a')`
  text-decoration: none;
  color: white;
  padding: 0 20px;

  :hover {
    color: #a5cc91;
  }

  ${({ active }) =>
    active &&
    css`
      border-bottom: 4px solid #a5cc91;
      color: #a5cc91;
    `};
`;

const HeaderNavigationLink = ({ path, children, href }) => (
  <StyledLink active={path === href} href={href}>
    {children}
  </StyledLink>
);

export default withSiteConfig(HeaderNavigationLink);
