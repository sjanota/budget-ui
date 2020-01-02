import './Panel.css';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import PanelBody from './PanelBody';
import PanelHeader from './PanelHeader';
import PanelTitle from './PanelTitle';

export default function Panel({ children, className }) {
  return (
    <div
      className={classnames(
        'card',
        'shadow',
        'mb-4',
        className,
        'overflow-hidden'
      )}
    >
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
