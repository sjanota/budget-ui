import React from 'react';
import { ClickableIcon, Icon, OpenModalButton } from '../sbadmin2';
import { useUpdateAccount } from '../gql/accounts';
import { useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { AccountModal } from './AccountModal';
import './UpdateAccountButton.css';

export function UpdateAccountButton({ account }) {
  const [updateAccount] = useUpdateAccount();
  const { accounts } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon
          className="accounts__update-button"
          icon={Icon.Edit}
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
