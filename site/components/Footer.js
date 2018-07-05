import React from 'react';
import styled from 'styled-components';
import Heart from 'twemoji/2/svg/2764.svg';
import CH from 'twemoji/2/svg/1F1E8-1F1ED.svg';
import WidthLimiter from './WidthLimiter';

const Footer = styled(({ renderNav, className }) => (
  <footer className={className}>
    <WidthLimiter>
      <span>
        Created with <Heart width={21} /> in <CH width={32} />
      </span>
      <nav>{renderNav()}</nav>
    </WidthLimiter>
  </footer>
))`
  background-color: lightgreen;

  > div {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  a {
    text-decoration: none;
    color: inherit;
    line-height: 2;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    font-weight: 700;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  @media (min-width: 600px) {
    > ul,
    > div {
      padding-right: calc(var(--sidebar-width) + var(--sidebar-gutter) + var(--horizontal-padding));
    }
  }

  li {
    flex-basis: 50%;
  }

  .about {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Footer;
