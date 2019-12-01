import React from 'react';
import { ClickableIcon, Icon } from '../sbadmin2';
import { useDeleteTranfer } from '../gql/transfers';
import { Variant } from '../sbadmin2/bootstrap';
export function DeleteTransferButton({ transfer }) {
  const [deleteTransfer] = useDeleteTranfer();
  return (
    <ClickableIcon
      icon={Icon.Trash}
      variant={Variant.secondary}
      onClick={() => deleteTransfer(transfer.id)}
    />
  );
}
