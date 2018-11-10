import styled from 'styled-components';
import theme from '../../theme';

const Link = styled.a`
  text-decoration: none;
  color: ${theme.linkColor};

  :focus,
  .no-touchevents &:hover {
    ${theme.hoverEffect}
    text-decoration: underline;
  }

  :focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
`;

export default Link;
