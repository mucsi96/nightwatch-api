import React from 'react';
import styled from 'styled-components';
import Heart from '../../emojis/2764.svg';
import CH from '../../emojis/1f1e8-1f1ed.svg';
import IN from '../../emojis/1f1ee-1f1f3.svg';
import US from '../../emojis/1f1fa-1f1f8.svg';

const StyledHeart = styled(Heart)`
  width: 21px;
  height: 21px;
  margin: 7px;
`;

const Flag = styled.span`
  line-height: 0;

  svg {
    width: 32px;
    height: 32px;
    margin: 7px;
  }
`;

const StyledFooter = styled.footer`
  grid-area: footer;
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
  <StyledFooter>
    <div>
      Created with <StyledHeart /> in{' '}
      <Flag>
        <CH />
      </Flag>
      <Flag>
        <IN />
      </Flag>
      <Flag>
        <US />
      </Flag>
    </div>
    <div>2018 - {new Date().getFullYear()}</div>
  </StyledFooter>
);

export default Footer;
