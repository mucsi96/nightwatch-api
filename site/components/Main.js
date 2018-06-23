import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  box-sizing: border-box;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 100px;
  margin-right: auto;
  margin-left: auto;

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
`;

export default Main;
