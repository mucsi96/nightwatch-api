import React from 'react';
import styled, { css } from 'styled-components';
import { withSiteConfig } from '../utils/SiteConfigProvider';

const StyledLink = styled('a')`
  @media (min-width: 720px) {
    text-decoration: none;
    color: white;
    padding: 0 20px;
    position: relative;
    transition: filter var(--animation-duration) linear;

    :hover {
      filter: contrast(200%);
      color: #a5cc91;
    }

    ${({ active }) =>
      active &&
      css`
        color: #a5cc91;

        :after {
          border-bottom: 4px solid #a5cc91;
          content: ' ';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
      `};
  }
`;

const HeaderNavigationLink = ({ path, children, href }) => (
  <StyledLink active={path === href} href={href}>
    {children}
  </StyledLink>
);

export default withSiteConfig(HeaderNavigationLink);
