import PropTypes from 'prop-types';
import React from 'react';

import ContextSwitcher from '../components/ContextSwitcher/ContextSwitcher';

export default function TopbarContextSwitcher({
  label,
  value,
  onChange,
  allowedValues,
}) {
  return (
    <ContextSwitcher
      label={label}
      allowedValues={allowedValues}
      value={value}
      onChange={onChange}
    />
  );
}

TopbarContextSwitcher.propTypes = {
  allowedValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
};
