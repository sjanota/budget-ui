import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import { Variant } from '../../bootstrap';

export default function ClickableIcon({ icon, variant, ...props }) {
  const classes = classnames(
    'btn',
    'bg-transparent',
    'border-0',
    'p-0',
    'mx-1',
    {
      [`text-${variant}`]: variant,
    }
  );
  return (
    <button className={classes} {...props}>
      <Icon icon={icon} />
    </button>
  );
}

ClickableIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.keys(Variant)),
};
