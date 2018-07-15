import React from 'react';
import styled from 'styled-components';
import Heart from 'twemoji/2/svg/2764.svg';
import CH from 'twemoji/2/svg/1f1e8-1f1ed.svg';
import WidthLimiter from './WidthLimiter';

const StyledHeart = styled(Heart)`
  width: 21px;
  height: 21px;
  margin: 7px;
`;

const StyledCH = styled(CH)`
  width: 32px;
  height: 32px;
  margin: 7px;
`;

const FooterWidthLimiter = styled(WidthLimiter)`
  padding-top: 50px;
  padding-bottom: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 720px) {
    padding-right: calc(var(--sidebar-width) + var(--sidebar-gutter));
  }
`;

const StyledFooter = styled.footer`
  background-color: #7ac35f;
`;

const Footer = () => (
  <StyledFooter>
    <FooterWidthLimiter>
      Created with <StyledHeart /> in <StyledCH />
    </FooterWidthLimiter>
  </StyledFooter>
);

export default Footer;
