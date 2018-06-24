import React from 'react';
import styled from 'styled-components';

const Emoji = styled(({ className, svg }) => {
  return <span className={className} dangerouslySetInnerHTML={{ __html: svg }} />;
})`
  display: inline-block;
  width: 1.5em;
`;

export default Emoji;
