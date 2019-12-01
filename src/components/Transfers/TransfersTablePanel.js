import React from 'react';
import { useGetCurrentTransfers } from '../gql/transfers';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { UpdateTransferButton } from './UpdateTransferButton';
import { DeleteTransferButton } from './DeleteTransferButton';
import Amount from '../../model/Amount';

const columns = [
  { dataField: 'title' },
  {
    dataField: 'fromAccount',
    formatter: a => a && a.name,
  },
  {
    dataField: 'toAccount',
    formatter: a => a.name,
  },
  {
    dataField: 'amount',
    align: 'right',
    headerAlign: 'right',
    formatter: Amount.format,
  },
  {
    dataField: 'date',
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateTransferButton transfer={row} />
        <DeleteTransferButton transfer={row} />
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

export function TransfersTablePanel({
  toAccountFilter,
  fromAccountFilter,
  createButton,
  ...props
}) {
  const query = useGetCurrentTransfers();
  let filters = [];
  if (toAccountFilter) {
    filters.push(row => row.toAccount.id === toAccountFilter);
  }
  if (fromAccountFilter) {
    filters.push(
      row => row.fromAccount && row.fromAccount.id === fromAccountFilter
    );
  }
  return (
    <QueryTablePanel
      {...props}
      query={query}
      getData={data => data.budget.currentMonth.transfers}
      buttons={createButton}
      columns={columns}
      keyField="id"
      readColumnNames={d => d.transfers.table.columns}
      filters={filters}
    />
  );
}
