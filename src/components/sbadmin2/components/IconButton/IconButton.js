import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Variant } from '../../bootstrap';

export default function IconButton({
  icon,
  variant,
  className,
  onClick,
  borderless,
  size,
  ...props
}) {
  const prefix = borderless ? 'text' : 'btn';
  const classes = classnames('btn', className, {
    [`${prefix}-${variant}`]: variant,
    [`${prefix}-${size}`]: size,
    'bg-transparent': borderless,
    'border-0': borderless,
    'p-0': borderless,
    'mx-1': borderless,
  });

  function handleOnClick(e) {
    e.preventDefault();
    onClick && onClick(e);
  }

  return (
    <button className={classes} onClick={handleOnClick} {...props}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.any.isRequired,
  borderless: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(Object.keys(Variant)).isRequired,
  size: PropTypes.oneOf(Object.keys(Size)),
};
