import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from './PageHeader';

export default function Page({ children }) {
  return <div className='container-fluid d-flex flex-column'>{children}</div>;
}

Page.propTypes = {
  children: PropTypes.node,
};

Page.Header = PageHeader;
