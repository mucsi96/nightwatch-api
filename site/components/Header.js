import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const Header = styled(({ renderHomeLink, renderMenu, className }) => (
  <header className={className}>
    <nav>
      {renderHomeLink()}
      <Menu>{renderMenu()}</Menu>
    </nav>
  </header>
))`
  box-sizing: border-box;
  padding: 10px 30px;
  margin-right: auto;
  margin-left: auto;

  a {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    width: 750px;
  }

  @media (max-width: 769px) {
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav ul {
    display: flex;
    list-style: none;
    align-items: center;
  }

  nav li {
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
  }

  nav li > a {
    color: #777;
  }

  nav li > a:focus,
  nav li > a:hover {
    color: #333;
    text-decoration: none;
  }

  @media (max-width: 991px) {
    nav {
      justify-content: space-between;
    }

    ul {
      flex-direction: column;
      list-style-type: none;
      -webkit-font-smoothing: antialiased;
      /* to stop flickering of text in safari */
      opacity: 0.98;
      border-bottom: 3px solid #7ac35f;
      top: 0;
      left: 0;
      right: 0;
      margin: 0;
      padding: 50px;
      background: white;
      position: fixed;
      transform-origin: 0% 0%;
      transform: translate(0, -100%);

      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    }

    ul li {
      padding: 8px 0;
      font-size: 16px;
    }
  }
`;

export default Header;
