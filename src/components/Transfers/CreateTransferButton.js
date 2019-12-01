import React from 'react';
import { OpenModalButton } from '../sbadmin2';
import CreateButton from '../sbadmin2/utilities/CreateButton';
import { useCreateTransfer } from '../gql/transfers';
import { useDictionary } from '../sbadmin2';
import { TransferModal } from './TransferModal';

export function CreateTransferButton({ toAccount, fromAccount }) {
  const [createTransfer] = useCreateTransfer();
  const { transfers } = useDictionary();
  return (
    <OpenModalButton
      button={props => <CreateButton {...props} />}
      modalContent={props => (
        <TransferModal
          init={{
            title: null,
            fromAccount: { id: null },
            toAccount: { id: null },
            amount: null,
            date: null,
          }}
          title={transfers.modal.createTitle}
          onSave={createTransfer}
          toAccount={toAccount}
          fromAccount={fromAccount}
          {...props}
        />
      )}
    />
  );
}
