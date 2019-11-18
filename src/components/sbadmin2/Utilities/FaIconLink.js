import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import { FaIcon } from './FaIcon';

export function FaIconLink({ icon, variant, ...props }) {
  const classes = classnames(
    'bg-transparent',
    'border-0',
    'p-0',
    'mx-1',
    `text-${variant}`
  );
  return (
    <Button className={classes} {...props}>
      <FaIcon icon={icon} />
    </Button>
  );
}

FaIconLink.propTypes = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
