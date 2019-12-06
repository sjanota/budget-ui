import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Variant } from '../../bootstrap';

export default function ClickableIcon({
  icon,
  variant,
  className,
  onClick,
  ...props
}) {
  const classes = classnames(
    'btn',
    'bg-transparent',
    'border-0',
    'p-0',
    'mx-1',
    className,
    {
      [`text-${variant}`]: variant,
    }
  );

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

ClickableIcon.propTypes = {
  icon: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(Object.keys(Variant)).isRequired,
};
