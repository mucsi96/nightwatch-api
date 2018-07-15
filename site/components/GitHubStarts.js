import React from 'react';
import styled from 'styled-components';

const LineHeightReset = styled.div`
  line-height: initial;
`;

const GitHubStarts = ({ id, url }) => (
  <LineHeightReset>
    <a
      href={url}
      className="github-button"
      data-icon="octicon-star"
      data-size="large"
      data-show-count="true"
      aria-label={`Star ${id} on GitHub`}
    >
      Star
    </a>
  </LineHeightReset>
);

export default GitHubStarts;
