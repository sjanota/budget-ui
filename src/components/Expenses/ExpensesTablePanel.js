import React from 'react';
import { Link } from 'react-router-dom';

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

const footer = {
  totalAmount: amounts =>
    Amount.prettyFormat(amounts.reduce((acc, a) => acc + a, 0)),
};

const baseColumns = [
  { dataField: 'title' },
  { dataField: 'date', sort: true },
  {
    dataField: 'account',
    formatter: a => <Link to={`/accounts/${a.name}`}>{a.name}</Link>,
  },
  {
    dataField: 'totalAmount',
    formatter: Amount.prettyFormat,
    align: 'right',
    headerAlign: 'right',
    sort: true,
    footerAlign: 'right',
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
            <td>{Amount.prettyFormat(category.amount)}</td>
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
  categoryFilter,
  addFooter = false,
  ...props
}) {
  const { selectedMonth } = useMonth();
  const query = useGetExpenses(selectedMonth);

  let filters = [];
  let mappers = [];
  if (accountFilter) {
    filters.push(row => row.account.id === accountFilter);
  }
  if (categoryFilter) {
    filters.push(row =>
      row.categories.some(c => c.category.id === categoryFilter)
    );
    mappers.push(row => ({
      ...row,
      categories: row.categories.filter(c => c.category.id === categoryFilter),
    }));
    mappers.push(row => ({
      ...row,
      totalAmount: row.categories.reduce((acc, c) => acc + c.amount, 0),
    }));
  }

  const columns = !addFooter
    ? baseColumns
    : baseColumns.map(c => ({
        ...c,
        footer: footer[c.dataField] ? footer[c.dataField] : '',
      }));

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
      mappers={mappers}
    />
  );
}
