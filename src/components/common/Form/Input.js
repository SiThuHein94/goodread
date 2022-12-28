import cx from 'classnames';
import InputError from './InputError';
import React from 'react';

const Container = ({ children, plain }) => (plain ? <>{children}</> : <div className="form-group">{children}</div>);


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({
    onChange,
    defaultValue = '',
    type,
    methods = {},
    rules = {},
    name,
    id = name,
    label,
    className,
    plain = false,
    sideIcon = null,
    ...rest
  }) => {
  const { register, errors = {} } = methods;

  const defaultProps = {
    type,
    name,
    id,
    defaultValue,
    className: cx({ 'is-invalid': errors[name] }, { 'form-control': type !== 'checkbox' }, className),
  };

  return (
    <>
      <Container plain={plain}>
        {label && (
          <label htmlFor={id}>
            {label} {rules.required && <sup>*</sup>}
          </label>
        )}
        <input onChange={onChange} {...defaultProps} {...rest} {...register (name,rules) } />

        <InputError errors={errors} name={name} />
        {!errors[name] && sideIcon}
        {/* { errors[name] && <i className="fas fa-exclamation-triangle side-icon text-danger" /> } */}
      </Container>
    </>
  );
};
