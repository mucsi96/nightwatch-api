import React from "react";

const TwitterFollowers = ({ id, url }) => (
  <a
    href={url}
    className="twitter-follow-button"
    data-show-screen-name="false"
    data-show-count="true"
  >
    {`Follow @${id}`}
  </a>
);

export default TwitterFollowers;
