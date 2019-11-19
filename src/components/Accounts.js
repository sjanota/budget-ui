import React, { useRef } from 'react';
import { Page, ClickableIcon, Icon, OpenModalButton } from './sbadmin2';
import CreateButton from './sbadmin2/utilities/CreateButton';
import { FormControl } from './sbadmin2/utilities/FormControl';
import FormModal from './sbadmin2/utilities/FormModal';
import { useFormData } from './sbadmin2/utilities/useFormData';
import Amount from '../model/Amount';
import {
  useCreateAccount,
  useGetAccounts,
  useUpdateAccount,
} from './gql/accounts';
import { QueryTablePanel } from './gql/QueryTablePanel';
import { GlobalHotKeys } from 'react-hotkeys';
import { useDictionary } from './sbadmin2';
import { Variant } from './sbadmin2/bootstrap';

const columns = [
  { dataField: 'name' },
  {
    dataField: 'balance',
    align: 'right',
    headerAlign: 'right',
    formatter: Amount.format,
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateAccountButton account={row} />
        <span style={{ cursor: 'pointer' }}>
          <i className="fas fa-archive fa-fw" />
        </span>
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

function AccountModal({ init, ...props }) {
  const { accounts } = useDictionary();
  const formData = useFormData({
    name: { $init: init.name },
  });
  return (
    <FormModal formData={formData} autoFocusRef={formData.name} {...props}>
      <FormControl
        label={accounts.modal.labels.name}
        inline={10}
        formData={formData.name}
        feedback="Provide name"
      />
    </FormModal>
  );
}

function UpdateAccountButton({ account }) {
  const [updateAccount] = useUpdateAccount();
  const { accounts } = useDictionary();
  return (
    <OpenModalButton
      renderButton={props => (
        <ClickableIcon icon={Icon.Edit} variant={Variant.primary} {...props} />
      )}
      renderModal={props => (
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

function CreateAccountButton({ openRef }) {
  const [createAccount] = useCreateAccount();
  const { accounts } = useDictionary();
  return (
    <OpenModalButton
      openRef={openRef}
      renderButton={props => <CreateButton {...props} />}
      renderModal={props => (
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

const keyMap = {
  openModal: 'n',
};
const keyHandlers = openCreateModal => ({
  openModal: () => openCreateModal.current(),
});

export default function Accounts() {
  const query = useGetAccounts();
  const openCreateModal = useRef();

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers(openCreateModal)}>
      <Page>
        <Page.Header readTitle={d => d.sidebar.pages.accounts} />
        <QueryTablePanel
          query={query}
          getData={data => data.accounts}
          buttons={<CreateAccountButton openRef={openCreateModal} />}
          columns={columns}
          keyField="id"
          readTitle={d => d.categories.table.title}
          readColumnNames={d => d.categories.table.columns}
        />
      </Page>
    </GlobalHotKeys>
  );
}
