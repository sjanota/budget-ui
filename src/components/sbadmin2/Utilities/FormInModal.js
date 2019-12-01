import React, { useState, useRef } from 'react';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';
import { Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function FormInModal({ title, onHide, onSave, formData, children }) {
  const [validated, setValidated] = useState(false);
  const form = useRef();
  function handleSave(event) {
    event.preventDefault();
    event.stopPropagation();
    const isValid = form.current.checkValidity();
    setValidated(true);
    if (!isValid) {
      return;
    }
    if (formData.changed()) {
      const input = formData.value();
      onSave(input);
    }
    onHide();
    setValidated(false);
  }

  return (
    <Form validated={validated} ref={form} onSubmit={handleSave}>
      <Modal.Header
        closeButton
        className="m-0 font-weight-bold text-primary bg-light"
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className=" bg-light">
        <CancelButton onClick={onHide} />
        <SaveButton onClick={handleSave} />
      </Modal.Footer>
    </Form>
  );
}

FormInModal.propTypes = {
  autoFocusRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formData: PropTypes.any.isRequired,
};
