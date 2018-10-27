import React from 'react';
import Debug from '../Debug';

const ApiFunctionParameter = ({ name, type, ...props }) => {
  const parameterType = type && type.type;
  return (
    <>
      <li>{`${name} - ${parameterType}`}</li>
      <Debug {...props} />
    </>
  );
};

export default ApiFunctionParameter;
