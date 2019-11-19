import React from 'react';
import PropTypes from 'prop-types';
import { withDictionary } from '../language';

function PageHeader({ title }) {
  return <h1 className="h3 mb-4 text-gray-800">{title}</h1>;
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withDictionary('title', PageHeader);
