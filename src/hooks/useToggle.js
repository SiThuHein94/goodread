import React from 'react';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state) => {
  const [toggle, setToggle] = React.useState(state);

  const handleToggle = React.useCallback((item) => {
    setToggle((prevState) => ({ ...prevState, ...item }));
  }, []);

  return {
    handleToggle,
    toggle,
  };
};
