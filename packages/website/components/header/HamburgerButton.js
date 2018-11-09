import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const HamburgerInner = styled.div`
  margin-top: -2px;
  top: 2px;

  position: absolute;
  width: 40px;
  height: 4px;
  transition: transform var(--animation-duration) ease, opacity var(--animation-duration) ease;
  background-color: currentColor;
  border-radius: 4px;

  :after,
  :before {
    display: block;
    content: '';
    position: absolute;
    width: 40px;
    height: 4px;
    transition: transform var(--animation-duration) ease, opacity var(--animation-duration) ease;
    border-radius: 4px;
    background-color: currentColor;
  }

  :before {
    top: 10px;
  }

  :after {
    top: 20px;
    bottom: -10px;
  }

  ${({ active }) =>
    active &&
    css`
      transform: translate3d(0, 10px, 0) rotate(45deg);

      :before {
        transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
        opacity: 0;
      }

      :after {
        transform: translate3d(0, -20px, 0) rotate(-90deg);
      }
    `};
`;

const HamburgerBox = styled.div`
  color: #a5cc91;
  position: relative;
  width: 40px;
  height: 24px;
`;

const HamburgerButton = ({ className, active, ...props }) => (
  <div className={className} {...props} aria-hidden={true}>
    <HamburgerBox>
      <HamburgerInner active={active} />
    </HamburgerBox>
  </div>
);

const StyledHamburgerButton = styled(HamburgerButton)`
  overflow: visible;
  transition: filter var(--animation-duration) linear;

  :hover {
    filter: contrast(200%);
  }
`;

export default StyledHamburgerButton;
