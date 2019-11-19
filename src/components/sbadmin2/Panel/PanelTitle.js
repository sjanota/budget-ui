import React from 'react';
import PropTypes from 'prop-types';
import { withDictionary } from '../language';

function PanelTitle({ title }) {
  return <h6 className="m-0 font-weight-bold text-primary">{title}</h6>;
}

PanelTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withDictionary('title', PanelTitle);
