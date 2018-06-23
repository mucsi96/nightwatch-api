import React from 'react';
import { Context } from './TableOfContentsProvider';

const TableOfContentsCollector = ({ id, level, title }) => {
  const { Consumer } = Context;
  return (
    <Consumer>
      {({ addItem }) => {
        addItem({ id, level, title });
        return null;
      }}
    </Consumer>
  );
};

export default TableOfContentsCollector;
