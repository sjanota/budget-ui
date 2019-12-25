import PropTypes from 'prop-types';
import React from 'react';

import Amount from '../../model/Amount';
import { useGetAccounts } from '../gql/accounts';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { CreateAccountButton } from './CreateAccountButton';
import { UpdateAccountButton } from './UpdateAccountButton';

export const columns = [
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
    formatter: (_, row) => (
      <span>
        <UpdateAccountButton account={row} />
        <span style={{ cursor: 'pointer' }}>
          <i className='fas fa-archive fa-fw' />
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

export function AccountsTablePanel({ onSelect, ...props }) {
  const query = useGetAccounts();

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    classes: 'text-white bg-primary selected',
    onSelect,
  };

  return (
    <QueryTablePanel
      {...props}
      query={query}
      getData={data => data.accounts}
      buttons={<CreateAccountButton />}
      columns={columns}
      keyField='id'
      readTitle={d => d.accounts.table.title}
      readColumnNames={d => d.accounts.table.columns}
      selectRow={selectRow}
      defaultSorted={defaultSorted}
    />
  );
}

AccountsTablePanel.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedAccountID: PropTypes.string,
};
