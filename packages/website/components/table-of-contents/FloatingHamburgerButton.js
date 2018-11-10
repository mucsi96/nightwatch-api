import React from 'react';
import styled, { css } from 'styled-components';

const scrollbarWidth = window.innerWidth - document.body.clientWidth;

const HamburgerInner = styled.div`
  top: 19px;
  left: 11px;
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
  color: #282c34;
  position: relative;
  width: 62px;
  height: 62px;
`;

const FloatingHamburgerButton = ({ className, active, ...props }) => (
  <div className={className} {...props} aria-hidden={true}>
    <HamburgerBox>
      <HamburgerInner active={active} />
    </HamburgerBox>
  </div>
);

const StyledHamburgerButton = styled(FloatingHamburgerButton)`
  overflow: visible;
  transition: opacity 0.1s ease;
  position: fixed;
  bottom: 44px;
  background-color: #f7f7f7;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px;
  z-index: 2;

  .no-touchevents &:hover {
    opacity: 0.7;
  }

  @media (min-width: 720px) {
    display: none;
  }

  ${({ active }) => css`
    right: calc(20px + ${active && scrollbarWidth ? scrollbarWidth : 0}px);
  `};
`;

export default StyledHamburgerButton;
