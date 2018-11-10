import styled from 'styled-components';

const Body = styled.body`
  --horizontal-padding: 20px;
  --sidebar-width: 200px;
  --sidebar-gutter: 40px;

  @media (min-width: 980px) {
    --sidebar-gutter: 80px;
  }

  @media (min-width: 1100px) {
    --sidebar-width: 300px;
  }

  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`;

export default Body;
