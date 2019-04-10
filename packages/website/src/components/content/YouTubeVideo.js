import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  margin: 25px -20px;
  position: relative;
  padding-bottom: 56.25%; /*16:9*/
  padding-top: 30px;
  height: 0;
  overflow: hidden;

  @media (min-width: 894px) {
    margin-right: -18px;
    margin-left: -18px;
    border-radius: 10px;
  }
`;

const VideoIFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YouTubeVideo = ({ src }) => (
  <VideoContainer>
    <VideoIFrame
      width="560"
      height="315"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </VideoContainer>
);

export default YouTubeVideo;
