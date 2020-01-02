import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function PanelBody({ className, children }) {
  return <div className={classnames(className, 'card-body')}>{children}</div>;
}

PanelBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
