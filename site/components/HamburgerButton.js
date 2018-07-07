import React from 'react';
import styled, { css } from 'styled-components';

const HamburgerInner = styled.div`
  margin-top: -2px;
  top: 2px;

  position: absolute;
  width: 40px;
  height: 4px;
  transition: transform 0.15s ease, opacity 0.15s ease;
  background-color: currentColor;
  border-radius: 4px;

  :after,
  :before {
    display: block;
    content: '';
    position: absolute;
    width: 40px;
    height: 4px;
    transition: transform 0.15s ease, opacity 0.15s ease;
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

  ${props =>
    props.active &&
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
  transition: opacity 0.15s linear;

  :hover {
    opacity: 0.7;
  }
`;

export default StyledHamburgerButton;
