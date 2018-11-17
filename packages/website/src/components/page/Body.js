import styled from 'styled-components';
import theme from '../../theme';

const Body = styled.body`
  margin: 0;
  padding: 0;
  ${theme.base}

  overflow-x: hidden;
  display: grid;

  grid-template-areas:
    ' . main . toc'
    ' . footer . toc';
  grid-template-columns:
    20px
    1fr
    20px
    0;

  @media (min-width: 600px) {
    grid-template-columns:
      20px
      1fr
      40px
      calc(20px + 200px);
  }

  @media (min-width: 780px) {
    grid-template-columns:
      calc(5vw + 20px)
      1fr
      40px
      calc(5vw + 20px + 200px);
  }

  @media (min-width: 980px) {
    grid-template-columns:
      calc(5vw + 20px)
      1fr
      80px
      calc(5vw + 20px + 200px);
  }

  @media (min-width: 1100px) {
    grid-template-columns:
      calc(5vw + 20px)
      1fr
      80px
      calc(5vw + 20px + 300px);
  }

  @media (min-width: 1340px) {
    grid-template-columns:
      calc(50vw - 610px)
      1fr
      80px
      calc(50vw - 610px + 300px);
  }

  @media (min-width: 2000px) {
    grid-template-columns:
      calc(50vw - 420px)
      1fr
      calc(50vw - 420px - 300px)
      300px;
  }
`;

export default Body;
