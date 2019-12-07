import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { MouseEvent } from 'react';

import { Size } from '../../bootstrap';
import { Variant } from '../../bootstrap.typed';

interface Props {
  icon: IconProp;
  variant: Variant;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  borderless?: boolean;
  size?: string;
}

export default function IconButton({
  icon,
  variant,
  className,
  onClick,
  borderless,
  size,
  ...props
}: Props) {
  const prefix = borderless ? 'text' : 'btn';
  const classes = classnames('btn', className, {
    [`${prefix}-${variant}`]: variant,
    [`${prefix}-${size}`]: size,
    'bg-transparent': borderless,
    'border-0': borderless,
    'p-0': borderless,
    'mx-1': borderless,
  });

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
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
