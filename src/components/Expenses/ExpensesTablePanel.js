import React from 'react';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { useGetCurrentExpenses } from '../gql/expenses';
import Amount from '../../model/Amount';
import { DeleteExpenseButton } from './DeleteExpenseButton';
import { UpdateExpenseButton } from './UpdateExpenseButton';

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
    formatter: (cell, row) => (
      <span>
        <UpdateExpenseButton expense={row} />
        <DeleteExpenseButton expense={row} />
      </span>
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
    <table className="table table-sm mb-0">
      <tbody>
        {row.categories.map((category, idx) => (
          <tr key={idx}>
            <td className="pl-3">{category.category.name}</td>
            <td>{Amount.format(category.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

function getExpenses(...filters) {
  return data =>
    filters.reduce(
      (expenses, filter) => expenses.filter(filter),
      data.budget.currentMonth.expenses
    );
}

function filterByAccount(account) {
  return expense => expense.account.id === account;
}

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
  hiddenColumns,
  ...props
}) {
  const query = useGetCurrentExpenses();
  const filter = getExpenses(
    accountFilter ? filterByAccount(accountFilter) : e => e
  );
  const hideColumns = columns.map(c => ({
    ...c,
    hidden: hiddenColumns && hiddenColumns.some(hc => c.dataField === hc),
  }));

  return (
    <QueryTablePanel
      {...props}
      query={query}
      getData={filter}
      buttons={createButton}
      columns={hideColumns}
      keyField="id"
      expandRow={expandRow}
      rowClasses={rowClasses}
      striped={false}
      readTitle={readTitle}
      readColumnNames={d => d.expenses.table.columns}
      defaultSorted={defaultSorted}
    />
  );
}
