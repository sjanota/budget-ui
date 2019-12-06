import './UpdateAccountButton.css';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { useUpdateAccount } from '../gql/accounts';
import { ClickableIcon, OpenModalButton, useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { AccountModal } from './AccountModal';

export function UpdateAccountButton({ account }) {
  const [updateAccount] = useUpdateAccount();
  const { accounts } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon
          className='accounts__update-button'
          icon={faEdit}
          variant={Variant.primary}
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
