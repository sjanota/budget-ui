import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function OpenModalButton({
  renderButton,
  renderModal,
  onClickRef,
}) {
  const [show, setShow] = useState(false);
  const onHide = () => setShow(false);
  const onClick = () => setShow(true);
  if (onClickRef) {
    onClickRef.current = onClick;
  }
  return (
    <>
      {renderButton({ onClick })}
      {renderModal({ onHide, show })}
    </>
  );
}

OpenModalButton.propTypes = {
  renderButton: PropTypes.elementType.isRequired,
  renderModal: PropTypes.elementType.isRequired,
  onClickRef: PropTypes.shape({ current: PropTypes.any }),
};
