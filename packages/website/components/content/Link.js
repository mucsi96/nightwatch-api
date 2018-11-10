import styled from 'styled-components';

const Link = styled.a`
  color: #337ab7;
  text-decoration: none;

  :focus,
  .no-touchevents &:hover {
    color: #23527c;
    text-decoration: underline;
  }

  :focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
`;

export default Link;
