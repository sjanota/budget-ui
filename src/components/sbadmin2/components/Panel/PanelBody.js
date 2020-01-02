import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function PanelBody({ className, children }) {
  return (
    <div className={classnames(className, 'card-body', 'panel-body')}>
      {children}
    </div>
  );
}

PanelBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
