import './UpdateAccountButton.css';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { useUpdateAccount } from '../gql/accounts';
import { IconButton, OpenModalButton, useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { AccountModal } from './AccountModal';

export function UpdateAccountButton({ account }) {
  const [updateAccount] = useUpdateAccount();
  const { accounts } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <IconButton
          className='accounts__update-button'
          icon={faEdit}
          variant={Variant.primary}
          borderless
          {...props}
        />
      )}
      modalContent={props => (
        <AccountModal
          init={account}
          title={accounts.modal.editTitle}
          onSave={input => updateAccount(account.id, input)}
          {...props}
        />
      )}
    />
  );
}
