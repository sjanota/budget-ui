import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export default function OpenModalButton({
  button: Button,
  modalContent: ModalContent,
  onClickRef,
  ...props
}) {
  const [show, setShow] = useState(false);
  const onHide = () => setShow(false);
  const onClick = () => setShow(true);
  if (onClickRef) {
    onClickRef.current = onClick;
  }

  return (
    <span>
      <Button onClick={onClick} />
      <Modal show={show} onHide={onHide} {...props}>
        <ModalContent onHide={onHide} />
      </Modal>
    </span>
  );
}

OpenModalButton.propTypes = {
  button: PropTypes.elementType.isRequired,
  modalContent: PropTypes.elementType.isRequired,
  onClickRef: PropTypes.shape({ current: PropTypes.any }),
};
