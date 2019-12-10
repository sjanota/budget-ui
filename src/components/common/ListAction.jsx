import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { IconButton, OpenModalButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

export default function ListAction({ disabled, variant, ...props }) {
  return (
    <IconButton
      variant={disabled ? Variant.secondary : variant}
      borderless
      disabled={disabled}
      {...props}
    />
  );
}

ListAction.Edit = props => (
  <ListAction icon={faEdit} variant={Variant.primary} {...props} />
);

ListAction.EditInModal = ({
  modalComponent: Modal,
  dictionary,
  update,
  init,
  ...buttonProps
}) => (
  <OpenModalButton
    button={props => <ListAction.Edit {...buttonProps} {...props} />}
    modalContent={props => (
      <Modal
        init={init}
        title={dictionary.modal.editTitle}
        onSave={input => update(init.id, input)}
        {...props}
      />
    )}
  />
);

ListAction.Delete = props => (
  <ListAction icon={faTrash} variant={Variant.danger} {...props} />
);
