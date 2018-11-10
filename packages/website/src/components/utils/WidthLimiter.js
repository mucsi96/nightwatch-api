import styled from 'styled-components';

const WidthLimiter = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-right: var(--horizontal-padding);
  padding-left: var(--horizontal-padding);
  margin: 0 auto;

  @media (min-width: 780px) {
    width: 90%;
  }

  @media (min-width: 1340px) {
    max-width: 1260px;
  }
`;

export default WidthLimiter;
