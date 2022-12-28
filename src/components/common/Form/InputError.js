import { get } from 'react-hook-form';
import { isEmpty, startCase } from 'lodash';
import React from 'react';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ errors = {}, name }) => {
  if (isEmpty(errors)) return false;
  var error = get(errors, name);
  if (!error) return false;

  let errorMessage;
  switch (error.type) {
    case 'required':
      errorMessage = error.message || `${startCase(name)} is ${error.type}`;
      break;
    default:
      errorMessage = error.message || `This field is invalid`;
  }

  return <div className="invalid-feedback">{errorMessage}</div>;
};
