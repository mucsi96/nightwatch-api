import styled from 'styled-components';
import theme from '../../theme';

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
  ${theme.base}
`;

export default Body;
