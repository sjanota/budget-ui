import React, { ComponentType, MouseEvent, useState } from 'react';
import { Modal } from 'react-bootstrap';

interface ButtonProps {
  onClick(event: MouseEvent<HTMLButtonElement>): void;
}

interface ModalContentProps {
  onHide(): void;
}

interface Props {
  button: ComponentType<ButtonProps>;
  modalContent: ComponentType<ModalContentProps>;
}

export default function OpenModalButton({
  button: Button,
  modalContent: ModalContent,
  ...props
}: Props) {
  const [show, setShow] = useState<boolean>(false);
  const onHide = () => setShow(false);
  const onClick = () => setShow(true);

  return (
    <span>
      <Button onClick={onClick} />
      <Modal show={show} onHide={onHide} {...props}>
        <ModalContent onHide={onHide} />
      </Modal>
    </span>
  );
}
