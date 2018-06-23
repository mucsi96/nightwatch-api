import React from 'react';
import styled from 'styled-components';

const StyledHeading1 = styled.h1`
  padding: 20px 0;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #7ac35f;
`;

const Heading = ({ level, children }) => {
  const Container = level === 1 ? StyledHeading1 : `h${level}`;
  return <Container>{children}</Container>;
};

export default Heading;
