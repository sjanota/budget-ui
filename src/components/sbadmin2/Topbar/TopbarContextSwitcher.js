import PropTypes from 'prop-types';
import React from 'react';
import { InputGroup } from 'react-bootstrap';

import ContextSwitcher from '../components/ContextSwitcher/ContextSwitcher';

export default function TopbarContextSwitcher({
  label,
  value,
  onChange,
  allowedValues,
}) {
  return (
    <div className='input-group navbar-context-switcher'>
      <InputGroup.Prepend className='navbar-context-switcher-label'>
        <InputGroup.Text as='label' className='border-0'>
          {label}
        </InputGroup.Text>
      </InputGroup.Prepend>
      <ContextSwitcher
        allowedValues={allowedValues}
        value={value}
        onChange={onChange}
      />
    </div>
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
