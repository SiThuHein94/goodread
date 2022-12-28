import cx from 'classnames';
import React from 'react';
export default function ModalHeader({ onToggle, children, className })  {
  return (
    <div className={cx('flex flex-row items-center w-full text-white bg-primary', className)}>
      {children && <h4 className="p-4">{children}</h4>}
      {onToggle && (
        <button
          onClick={() => onToggle(false)}
          className="absolute top-0 right-0 mt-4 mr-4 text-2xl fas fa-times"
        ></button>
      )}
    </div>
  );
};
