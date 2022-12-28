import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import cx from 'classnames';
import React from 'react';

export default function Modal ({ children, onToggle, size = 'md', className }) {
  const ref = React.createRef();

  React.useEffect(() => {
    const { current } = ref;
    disableBodyScroll(current);
    return () => {
      enableBodyScroll(current);
    };
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
        className={cx(
          'modal',

          className
        )}
        onClick={onToggle}
      >
        <div
          className={cx(
            `modal-${size}`,
            'relative w-auto border border-gray-400 shadow-lg modal-content',
            { 'md:w-1/3 lg:w-1/5': size === 'xs' },
            { 'md:w-2/3 lg:w-1/3': size === 'sm' },
            { 'md:w-3/4 lg:w-2/4': size === 'md' },
            { 'md:w-4/5': size === 'lg' }
          )}
        >
          {children}
        </div>
      </div>
      <div className="modal-overlay" />
    </>
  );
};
