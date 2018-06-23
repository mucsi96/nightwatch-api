import React from 'react';
import styled from 'styled-components';

const Footer = styled(({ renderNav, className }) => (
  <footer className={className}>
    <span>Created with ❤️ in 🇨🇭</span>
    <nav>{renderNav()}</nav>
  </footer>
))`
  background-color: #7ac35f;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: relative;
  z-index: 1;

  nav {
    width: 100%;
  }

  span {
    margin-top: 50px;
  }

  ul {
    padding: 0;
    margin: 50px 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  ul > li {
    display: flex;
    align-items: center;
  }

  @media (min-width: 768px) {
    ul {
      width: 750px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (min-width: 992px) {
    ul {
      width: 970px;
    }
  }

  @media (min-width: 1200px) {
    ul {
      width: 1170px;
    }
  }

  .icon {
    width: 35px;
    fill: white;
  }

  .icon.npm {
    transform: scale(3);
  }

  @media (max-width: 768px) {
     {
      padding: 0 20px;
    }

    .icon {
      width: 25px;
    }

    .icon.npm {
      transform: scale(2);
    }

    ul {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    li {
      margin: 15px;
    }
  }
`;

export default Footer;
