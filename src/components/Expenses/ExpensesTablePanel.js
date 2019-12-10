import React from 'react';

import Amount from '../../model/Amount';
import ListActions from '../common/ListActions';
import { useMonth } from '../context/Month';
import {
  useDeleteExpense,
  useGetExpenses,
  useUpdateExpense,
} from '../gql/expenses';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { ExpenseModal } from './ExpenseModal';

const columns = [
  { dataField: 'title' },
  { dataField: 'date', sort: true },
  {
    dataField: 'account',
    formatter: a => a.name,
  },
  {
    dataField: 'totalAmount',
    formatter: Amount.format,
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (_, row) => (
      <ListActions
        row={row}
        monthScopedResource
        modalComponent={ExpenseModal}
        dictionaryName='expenses'
        updateHook={useUpdateExpense}
        deletehook={useDeleteExpense}
      />
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

const rowClasses = (row, rowIndex) => {
  return rowIndex % 2 === 0 && 'table-striped';
};

const expandRow = {
  className: 'background-color-white',
  renderer: row => (
    <table className='table table-sm mb-0'>
      <tbody>
        {row.categories.map((category, idx) => (
          <tr key={idx}>
            <td className='pl-3'>{category.category.name}</td>
            <td>{Amount.format(category.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

const defaultSorted = [
  {
    dataField: 'date',
    order: 'desc',
  },
];

export function ExpensesTablePanel({
  readTitle,
  createButton,
  accountFilter,
  ...props
}) {
  const { selectedMonth } = useMonth();
  const query = useGetExpenses(selectedMonth);

  let filters = [];
  if (accountFilter) {
    filters.push(row => row.account.id === accountFilter);
  }

  return (
    <QueryTablePanel
      {...props}
      query={query}
      getData={d => d.monthlyReport.expenses}
      buttons={createButton}
      columns={columns}
      keyField='id'
      expandRow={expandRow}
      rowClasses={rowClasses}
      striped={false}
      readTitle={readTitle}
      readColumnNames={d => d.expenses.table.columns}
      defaultSorted={defaultSorted}
      filters={filters}
    />
  );
}
