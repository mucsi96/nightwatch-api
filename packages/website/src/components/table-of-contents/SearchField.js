import React from 'react';
import styled from 'styled-components';
import Icon from '../../images/icons8-search-filled.svg';

const Wrapper = styled.div`
  position: relative;

  .algolia-autocomplete {
    width: 100%;
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  z-index: 1;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  background: white;
  border: 0;
  color: inherit;
  font-size: 18px;
  font-family: inherit;
  position: relative;
  padding: 5px 5px 5px 29px;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline-color: currentColor;
`;

const SearchField = () => (
  <Wrapper>
    <StyledIcon />
    <StyledInput
      type="search"
      id="search-field"
      placeholder="Search docs"
      aria-label="Search docs"
    />
  </Wrapper>
);

export default SearchField;
