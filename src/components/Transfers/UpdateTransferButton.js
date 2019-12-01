import React from 'react';
import { ClickableIcon, Icon, OpenModalButton } from '../sbadmin2';
import { useUpdateTransfer } from '../gql/transfers';
import { useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { TransferModal } from './TransferModal';
export function UpdateTransferButton({ transfer }) {
  const [updateTransfer] = useUpdateTransfer();
  const { transfers } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon icon={Icon.Edit} variant={Variant.primary} {...props} />
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
