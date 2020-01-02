import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import Amount from '../../model/Amount';
import ListActions from '../common/ListActions';
import { useMonth } from '../context/Month';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import {
  useDeleteTranfer,
  useGetTransfers,
  useUpdateTransfer,
} from '../gql/transfers';
import { TransferModal } from './TransferModal';

const columns = [
  { dataField: 'title' },
  {
    dataField: 'fromAccount',
    formatter: a => a && <Link to={`/accounts/${a.name}`}>{a.name}</Link>,
  },
  {
    dataField: 'toAccount',
    formatter: a => a && <Link to={`/accounts/${a.name}`}>{a.name}</Link>,
  },
  {
    dataField: 'amount',
    align: 'right',
    headerAlign: 'right',
    formatter: Amount.prettyFormat,
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
      <ListActions
        row={row}
        monthScopedResource
        modalComponent={TransferModal}
        dictionaryName='transfers'
        updateHook={useUpdateTransfer}
        deletehook={useDeleteTranfer}
      />
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
  const { selectedMonth } = useMonth();
  const query = useGetTransfers(selectedMonth);
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
      getData={data => data.monthlyReport.transfers}
      buttons={createButton}
      columns={columns}
      keyField='id'
      readColumnNames={d => d.transfers.table.columns}
      filters={filters}
    />
  );
}

TransfersTablePanel.propTypes = {
  createButton: PropTypes.node.isRequired,
  fromAccountFilter: PropTypes.string,
  toAccountFilter: PropTypes.string,
};
