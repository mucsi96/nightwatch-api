import React, { Fragment } from 'react';
import styled from 'styled-components';
import slug from 'slug';
import TableOfContentsCollector from './TableOfContentsCollector';

const StyledHeading1 = styled.h1`
  padding: 20px 0;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #7ac35f;
`;

const Heading = ({ level, children }) => {
  const title = Array.isArray(children) ? children[0] : children.toString();
  const Container = level === 1 ? StyledHeading1 : `h${level}`;
  const id = slug(title).toLowerCase();
  return (
    <Fragment>
      {level <= 2 ? <TableOfContentsCollector id={id} level={level} title={title} /> : null}
      <Container id={id}>{children}</Container>
    </Fragment>
  );
};

export default Heading;
