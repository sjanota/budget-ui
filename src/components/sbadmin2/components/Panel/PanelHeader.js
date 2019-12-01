import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function PanelHeader({ className, ...props }) {
  return <div className={classnames(className, 'card-header')} {...props} />;
}

PanelHeader.propTypes = {
  className: PropTypes.string,
};
