import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';

export function Page({ children }) {
  return <div className="container-fluid">{children}</div>;
}

Page.propTypes = {
  children: PropTypes.node,
};

Page.Header = PageHeader;
