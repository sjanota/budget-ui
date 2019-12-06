import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useDeleteTranfer } from '../gql/transfers';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

export function DeleteTransferButton({ transfer }) {
  const [deleteTransfer] = useDeleteTranfer();
  return (
    <IconButton
      icon={faTrash}
      variant={Variant.danger}
      onClick={() => deleteTransfer(transfer.id)}
      borderless
    />
  );
}

DeleteTransferButton.propTypes = {
  transfer: PropTypes.shape({ id: PropTypes.any }).isRequired,
};
