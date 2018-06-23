import React from 'react';
import styled from 'styled-components';

const Heading = ({ level, children, className }) => {
  const Container = `h${level}`;
  return <Container className={className}>{children}</Container>;
};

const StyledHeading = styled(Heading)`
  padding: 20px 0;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #7ac35f;
`;

export default StyledHeading;
