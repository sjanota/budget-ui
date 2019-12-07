import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Variant } from '../bootstrap';

export default function Spinner({ size, variant }) {
  const classNames = classnames('spinner-border', {
    [`spinner-border-${size}`]: size,
    [`text-${variant}`]: variant,
  });
  return (
    <div className={classNames} role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(Object.keys(Size)),
  variant: PropTypes.oneOf(Object.keys(Variant)),
};
