import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function CreateButton({ className, ...props }) {
  const classes = classnames('btn', 'btn-sm', 'btn-primary', className);
  return (
    <button type="button" className={classes} {...props}>
      <i className="fas fa-fw fa-plus" />
    </button>
  );
}

CreateButton.propTypes = {
  className: PropTypes.any,
};
