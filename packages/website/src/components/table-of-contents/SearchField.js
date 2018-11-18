import React from 'react';
import styled from 'styled-components';
import Icon from '../../images/icons8-search-filled.svg';

const Wrapper = styled.div`
  position: relative;

  .algolia-autocomplete {
    width: 100%;
  }

  .label {
    position: absolute;
    left: 0;
    top: -500px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    z-index: 1;
  }

  input {
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
  }
`;

const SearchField = () => (
  <Wrapper>
    <label for="search-field" class="label">
      Search docs
    </label>
    <Icon className="icon" />
    <input type="search" id="search-field" placeholder="Search docs" />
  </Wrapper>
);

export default SearchField;
