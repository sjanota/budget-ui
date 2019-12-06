import React from 'react';

import Amount from '../../model/Amount';
import { useGetCurrentPlans } from '../gql/plans';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { Page } from '../sbadmin2';
import { CreatePlanButton } from './CreatePlanButton';
import { DeletePlanButton } from './DeletePlanButton';
import { UpdatePlanButton } from './UpdatePlanButton';

const columns = [
  { dataField: 'title', sort: true },
  {
    dataField: 'fromEnvelope',
    sort: true,
    sortValue: cell => (cell ? cell.name : ''),
    formatter: a => a && a.name,
  },
  {
    dataField: 'toEnvelope',
    sort: true,
    sortValue: cell => (cell ? cell.name : ''),
    formatter: a => a && a.name,
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
    formatter: (cell, row) => (
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

export default function PlansPage() {
  const query = useGetCurrentPlans();

  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.plans} />
      <QueryTablePanel
        query={query}
        getData={data => data.budget.currentMonth.plans}
        buttons={<CreatePlanButton />}
        columns={columns}
        keyField='id'
        readTitle={d => d.plans.table.title}
        readColumnNames={d => d.plans.table.columns}
        defaultSorted={defaultSorted}
      />
    </Page>
  );
}
