import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { Variant, Size } from '../../bootstrap';

export default function SplitButton({
  children,
  icon,
  variant,
  size,
  className,
  disabled,
  ...props
}) {
  const classNames = classnames('btn', 'btn-icon-split', className, {
    disabled,
    [`btn-${size}`]: size,
    [`btn-${variant}`]: variant,
  });

  return (
    <button className={classNames} disabled={disabled} {...props}>
      <span className="icon text-white-50">
        <Icon icon={icon} />
      </span>
      <span className="text">{children}</span>
    </button>
  );
}

SplitButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(Size)),
  variant: PropTypes.oneOf(Object.keys(Variant)),
};
