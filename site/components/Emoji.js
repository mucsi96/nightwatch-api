import React from 'react';
import styled from 'styled-components';

const Emoji = ({ className, svg }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const StyledEmoji = styled(Emoji)`
  display: inline-block;
  width: 1.5em;
`;

export default StyledEmoji;
