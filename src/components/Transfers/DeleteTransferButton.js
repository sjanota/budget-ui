import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useDeleteTranfer } from '../gql/transfers';
import { ClickableIcon } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

export function DeleteTransferButton({ transfer }) {
  const [deleteTransfer] = useDeleteTranfer();
  return (
    <ClickableIcon
      icon={faTrash}
      variant={Variant.danger}
      onClick={() => deleteTransfer(transfer.id)}
    />
  );
}

DeleteTransferButton.propTypes = {
  transfer: PropTypes.shape({ id: PropTypes.any }).isRequired,
};
