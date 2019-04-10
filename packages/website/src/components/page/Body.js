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
    minmax(20px, 1fr)
    minmax(auto, 840px)
    minmax(20px, 1fr)
    0;

  @media (min-width: 1100px) {
    grid-template-columns:
      minmax(80px, 1fr)
      minmax(auto, 840px)
      minmax(80px, 1fr)
      300px;
  }
`;

export default Body;
