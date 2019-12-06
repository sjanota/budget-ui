import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Variant } from '../../bootstrap';

export default function SplitButton({
  icon,
  variant,
  size,
  className,
  disabled,
  _ref,
  children,
  ...props
}) {
  const classNames = classnames('btn', 'btn-icon-split', className, {
    disabled,
    [`btn-${size}`]: size,
    [`btn-${variant}`]: variant,
  });

  return (
    <button
      className={classNames}
      disabled={disabled}
      ref={_ref}
      aria-label={children}
      {...props}
    >
      <span className='icon text-white-50'>
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className='text'>{children}</span>
    </button>
  );
}

SplitButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.any.isRequired,
  size: PropTypes.oneOf(Object.keys(Size)),
  variant: PropTypes.oneOf(Object.keys(Variant)).isRequired,
  _ref: PropTypes.any,
};
