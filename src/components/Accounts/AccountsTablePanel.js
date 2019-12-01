import React from 'react';
import PropTypes from 'prop-types';
import { useGetAccounts } from '../gql/accounts';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import Amount from '../../model/Amount';
import { CreateAccountButton } from './CreateAccountButton';
import { UpdateAccountButton } from './UpdateAccountButton';

const columns = [
  { dataField: 'name', sort: true },
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

const defaultSorted = [
  {
    dataField: 'name',
    order: 'asc',
  },
];

export function AccountsTablePanel({ onSelectAcount }) {
  const query = useGetAccounts();

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    classes: 'text-white bg-primary selected',
    onSelect: account => onSelectAcount(account),
  };

  return (
    <QueryTablePanel
      query={query}
      getData={data => data.accounts}
      buttons={<CreateAccountButton />}
      columns={columns}
      keyField="id"
      readTitle={d => d.accounts.table.title}
      readColumnNames={d => d.accounts.table.columns}
      selectRow={selectRow}
      defaultSorted={defaultSorted}
    />
  );
}

AccountsTablePanel.propTypes = {
  onSelectAcount: PropTypes.func.isRequired,
  selectedAccountID: PropTypes.string,
};
