import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withDictionary } from '../../language';

function PanelTitle({ children, title, className }) {
  const classNames = classnames(
    'm-0',
    'font-weight-bold',
    'text-primary',
    className
  );
  return (
    <h6 className={classNames}>
      {children}
      {title}
    </h6>
  );
}

PanelTitle.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withDictionary('title', PanelTitle);
