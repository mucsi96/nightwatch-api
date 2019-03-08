import React from 'react';
import logo from '../../images/browserstack-logo.png';
import styled from 'styled-components';

const Logo = styled.img`
  width: 100%;
  max-width: 300px;
  display: block;
  margin: -40px -6px;
`;

const BrowserStackLogo = () => (
  <a href="https://www.browserstack.com">
    <Logo src={logo} />
  </a>
);

export default BrowserStackLogo;
