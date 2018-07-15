import React, { Fragment } from 'react';
import styled from 'styled-components';
import slug from 'slug';
import TableOfContentsCollector from './TableOfContentsCollector';

const StyledHeading1 = styled.h1`
  font-size: 40px;
  line-height: 1.125;
  margin: 40px 0;
  color: #282c34;

  @media (min-width: 780px) {
    font-size: 60px;
    margin: 50px 0;
  }

  @media (min-width: 980px) {
    margin-top: 80px;
  }
`;

const StyledHeading2 = styled.h2`
  font-size: 20px;
  margin: 40px 0;

  @media (min-width: 980px) {
    font-size: 24px;
  }

  @media (min-width: 1280px) {
    font-size: 35px;
  }
`;

const styledLevels = {
  '1': StyledHeading1,
  '2': StyledHeading2
};

const Heading = ({ level, children }) => {
  const title = Array.isArray(children) ? children[0] : children.toString();
  const Container = styledLevels[level] || `h${level}`;
  const id = slug(title).toLowerCase();
  return (
    <Fragment>
      {level <= 2 ? <TableOfContentsCollector id={id} level={level} title={title} /> : null}
      <Container id={id}>{children}</Container>
    </Fragment>
  );
};

export default Heading;
