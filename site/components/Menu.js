import React from 'react';
import styled from 'styled-components';

const Menu = ({ className, children }) => (
  <div className={className}>
    <input type="checkbox" />
    <span />
    <span />
    <span />
    {children}
  </div>
);

const StyledMenu = styled(Menu)`
  padding: 10px 0 10px 10px;

  input {
    display: none;
  }

  span {
    display: none;
  }

  @media (max-width: 991px) {
    display: block;
    position: relative;
    z-index: 1;
    top: 4px;
    user-select: none;

    input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;

      cursor: pointer;

      opacity: 0; /* hide this */
      z-index: 2; /* and place it over the Menu */

      -webkit-touch-callout: none;
    }
    /*
     * Just a quick Menu
     */
    span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;

      background: #232323;
      border-radius: 3px;

      z-index: 1;

      transform-origin: 4px 0px;

      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }

    span:first-child {
      transform-origin: 0% 0%;
    }

    span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    /*
     * Transform all the slices of Menu
     * into a crossmark.
     */
    input:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -1px);
      background: #232323;
    }

    /*
     * But let's hide the middle one.
     */
    input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    /*
     * Ohyeah and the last one should go the other direction
     */
    input:checked ~ span:nth-last-child(2) {
      opacity: 1;
      transform: rotate(-45deg) translate(0, -1px);
    }

    /*
    * And let's fade it in from the left
    */
    input:checked ~ ul {
      transform: scale(1, 1);
    }
  }
`;

export default StyledMenu;
