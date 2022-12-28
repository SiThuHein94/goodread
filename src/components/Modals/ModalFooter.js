import cx from 'classnames';
import React from 'react';

export default function ModalFooter({ children, className }) {
  return (
    <div
      className={cx('flex items-center justify-end py-6 border-t border-gray-300 border-solid rounded-b', className)}
    >
      {children}
    </div>
  );
};
