import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PanelTitle from './PanelTitle';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

export default function Panel({ children, className }) {
  return (
    <div className={classnames('card', 'shadow', 'mb-4', className)}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Panel.Title = PanelTitle;
Panel.Header = PanelHeader;
Panel.Body = PanelBody;
