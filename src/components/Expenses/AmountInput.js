import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Amount from '../../model/Amount';

export function AmountInput({ placeholder, formData }) {
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState(formData.default() || '');
  useEffect(() => {
    formData.current = { value };
  }, [formData, value]);
  function onChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    setIsValid(Amount.isValid(newValue));
  }
  return (
    <Form.Control
      required
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isValid={isValid}
    />
  );
}

AmountInput.propTypes = {
  formData: PropTypes.shape({
    default: PropTypes.func.isRequired,
    current: PropTypes.shape({ value: PropTypes.string }),
  }),
  placeholder: PropTypes.string,
};
