import React from 'react';
import { inspect } from 'util';
import styled from 'styled-components';

const Pre = styled('pre')`
  overflow-x: auto;
  width: 790px;
`;

const Debug = props => {
  return (
    <Pre>
      <code>{inspect(props, false, 30)}</code>
    </Pre>
  );
};

export default Debug;
