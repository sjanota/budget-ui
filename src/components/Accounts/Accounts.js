import React, { useRef } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import { Page } from '../sbadmin2';
import Amount from '../../model/Amount';
import { useGetAccounts } from '../gql/accounts';
import { QueryTablePanel } from '../gql/QueryTablePanel';

import { CreateAccountButton } from './CreateAccountButton';
import { UpdateAccountButton } from './UpdateAccountButton';

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
          readTitle={d => d.accounts.table.title}
          readColumnNames={d => d.accounts.table.columns}
        />
      </Page>
    </GlobalHotKeys>
  );
}
