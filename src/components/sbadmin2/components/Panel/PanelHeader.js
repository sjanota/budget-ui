import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function PanelHeader({ className, children }) {
  return <div className={classnames(className, 'card-header')}>{children}</div>;
}

PanelHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
