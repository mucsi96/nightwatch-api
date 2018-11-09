import React from 'react';
import styled from 'styled-components';
import Heart from 'twemoji/2/svg/2764.svg';
import CH from 'twemoji/2/svg/1f1e8-1f1ed.svg';
import WidthLimiter from '../utils/WidthLimiter';

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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Footer = () => (
  <footer>
    <FooterWidthLimiter>
      <div>
        Created with <StyledHeart /> in <StyledCH />
      </div>
      <div>{new Date().getFullYear()}</div>
    </FooterWidthLimiter>
  </footer>
);

export default Footer;
