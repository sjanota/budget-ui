import React from 'react';
import PropTypes from 'prop-types';

import { ClickableIcon, Icon } from '../sbadmin2';
import { useDeleteTranfer } from '../gql/transfers';
import { Variant } from '../sbadmin2/bootstrap';

export function DeleteTransferButton({ transfer }) {
  const [deleteTransfer] = useDeleteTranfer();
  return (
    <ClickableIcon
      icon={Icon.Trash}
      variant={Variant.danger}
      onClick={() => deleteTransfer(transfer.id)}
    />
  );
}

DeleteTransferButton.propTypes = {
  transfer: PropTypes.shape({ id: PropTypes.any }).isRequired,
};
