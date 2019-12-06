import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { useUpdateTransfer } from '../gql/transfers';
import { ClickableIcon, OpenModalButton } from '../sbadmin2';
import { useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { TransferModal } from './TransferModal';

export function UpdateTransferButton({ transfer }) {
  const [updateTransfer] = useUpdateTransfer();
  const { transfers } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon icon={faEdit} variant={Variant.primary} {...props} />
      )}
      modalContent={props => (
        <TransferModal
          init={transfer}
          title={transfers.modal.editTitle}
          onSave={input => updateTransfer(transfer.id, input)}
          {...props}
        />
      )}
    />
  );
}
