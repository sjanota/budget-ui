import PropTypes from 'prop-types';
import React from 'react';

import { withDictionary } from '../../language';

function PageHeader({ children, title }) {
  return (
    <h1 className='h3 mb-4 text-gray-800 d-flex justify-content-between'>
      {title}
      {children && <div>{children}</div>}
    </h1>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withDictionary('title', PageHeader);
