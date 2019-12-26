import React from 'react';
import { Link } from 'react-router-dom';

import Amount from '../../model/Amount';
import { useGetCurrentPlans } from '../gql/plans';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { CreatePlanButton } from './CreatePlanButton';
import { DeletePlanButton } from './DeletePlanButton';
import { UpdatePlanButton } from './UpdatePlanButton';

export function PlansTablePanel({ fromEnvelope, toEnvelope, ...props }) {
  const query = useGetCurrentPlans();

  let filters = [];
  if (fromEnvelope) {
    filters.push(
      row => row.fromEnvelope && row.fromEnvelope.id === fromEnvelope.id
    );
  }
  if (toEnvelope) {
    filters.push(row => row.toEnvelope && row.toEnvelope.id === toEnvelope.id);
  }

  return (
    <QueryTablePanel
      query={query}
      getData={data => data.budget.currentMonth.plans}
      buttons={
        <CreatePlanButton fromEnvelope={fromEnvelope} toEnvelope={toEnvelope} />
      }
      columns={columns}
      keyField='id'
      readTitle={d => d.plans.table.title}
      readColumnNames={d => d.plans.table.columns}
      defaultSorted={defaultSorted}
      filters={filters}
      {...props}
    />
  );
}

const columns = [
  { dataField: 'title', sort: true },
  {
    dataField: 'fromEnvelope',
    sort: true,
    sortValue: cell => (cell ? cell.name : ''),
    formatter: a => a && <Link to={`/envelopes/${a.name}`}>{a.name}</Link>,
  },
  {
    dataField: 'toEnvelope',
    sort: true,
    sortValue: cell => (cell ? cell.name : ''),
    formatter: a => a && <Link to={`/envelopes/${a.name}`}>{a.name}</Link>,
  },
  {
    dataField: 'currentAmount',
    formatter: Amount.format,
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'recurringAmount',
    formatter: a =>
      a !== null ? <i className='fas fa-fw fa-sync-alt' /> : null,
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (_, row) => (
      <span>
        <UpdatePlanButton plan={row} />
        <DeletePlanButton plan={row} />
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
    dataField: 'title',
    order: 'asc',
  },
];
