import React from 'react';

const GitHubStarts = ({ id, url }) => (
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
);

export default GitHubStarts;
