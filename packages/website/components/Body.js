import styled from 'styled-components';

const Body = styled.body`
  --header-height: 48px;
  --horizontal-padding: 20px;
  --sidebar-width: 200px;
  --sidebar-gutter: 40px;
  --animation-duration: 0.15s;

  @media (min-width: 720px) and (min-height: 1000px) {
    --header-height: 50px;
  }

  @media (min-width: 980px) {
    --sidebar-gutter: 80px;
  }

  @media (min-width: 1100px) {
    --sidebar-width: 300px;
  }

  @media (min-width: 1280px) and (min-height: 1000px) {
    --header-height: 60px;
  }

  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`;

export default Body;
