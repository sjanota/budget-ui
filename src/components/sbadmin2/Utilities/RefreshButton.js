import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function RefreshButton({ className, ...props }) {
  const classes = classnames('btn', 'btn-sm', 'btn-secondary', className);
  return (
    <button type="button" className={classes} {...props}>
      <i className="fas fa-fw fa-sync-alt" />
    </button>
  );
}

RefreshButton.propTypes = {
  className: PropTypes.string,
};
