import React, { useRef } from 'react';
import Page from './sbadmin2/Page/Page';
import PageHeader from './sbadmin2/Page/PageHeader';
import ModalButton from './sbadmin2/Utilities/ModalButton';
import CreateButton from './sbadmin2/Utilities/CreateButton';
import EditTableButton from './sbadmin2/Utilities/EditTableButton';
import { FormControl } from './sbadmin2/Utilities/FormControl';
import FormModal from './sbadmin2/Utilities/FormModal';
import { useFormData } from './sbadmin2/Utilities/useFormData';
import Amount from '../model/Amount';
import {
  useCreateAccount,
  useGetAccounts,
  useUpdateAccount,
} from './gql/accounts';
import { QueryTablePanel } from './gql/QueryTablePanel';
import { GlobalHotKeys } from 'react-hotkeys';
import { useDictionary, withColumnNames } from './sbadmin2/Utilities/Lang';

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
    <ModalButton
      button={EditTableButton}
      modal={props => (
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
    <ModalButton
      openRef={openRef}
      button={CreateButton}
      modal={props => (
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
  const { sidebar, accounts } = useDictionary();

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers(openCreateModal)}>
      <Page>
        <PageHeader>{sidebar.pages.accounts}</PageHeader>
        <QueryTablePanel
          title={accounts.table.title}
          query={query}
          getData={data => data.accounts}
          buttons={<CreateAccountButton openRef={openCreateModal} />}
          columns={withColumnNames(columns, accounts.table.columns)}
          keyField="id"
        />
      </Page>
    </GlobalHotKeys>
  );
}
