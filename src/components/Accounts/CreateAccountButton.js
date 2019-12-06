import React from 'react';

import CreateButton from '../common/CreateButton';
import { useCreateAccount } from '../gql/accounts';
import { OpenModalButton } from '../sbadmin2';
import { useDictionary } from '../sbadmin2';
import { AccountModal } from './AccountModal';

export function CreateAccountButton() {
  const [createAccount] = useCreateAccount();
  const { accounts } = useDictionary();
  return (
    <OpenModalButton
      button={props => <CreateButton {...props} />}
      modalContent={props => (
        <AccountModal
          init={{ name: '' }}
          title={accounts.modal.createTitle}
          onSave={createAccount}
          {...props}
        />
      )}
    />
  );
}
