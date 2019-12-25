import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { useGetCategories } from '../gql/categories';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { CreateCategoryButton } from './CreateCategoryButton';
import { UpdateCategoryButton } from './UpdateCategoryButton';

const columns = [
  { dataField: 'name', sort: true },
  {
    dataField: 'envelope',
    formatter: a => a.name,
    sort: true,
  },
  { dataField: 'description' },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateCategoryButton category={row} />
        <IconButton icon={faArchive} variant={Variant.secondary} borderless />
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

export function CategoriesTablePanel({ envelopeFilter, ...props }) {
  const query = useGetCategories();

  let filters = [];
  if (envelopeFilter) {
    filters.push(row => row.envelope.id === envelopeFilter.id);
  }
  return (
    <QueryTablePanel
      {...props}
      keyField='id'
      columns={columns}
      buttons={<CreateCategoryButton envelope={envelopeFilter} />}
      query={query}
      getData={data => data.categories}
      readTitle={d => d.categories.table.title}
      readColumnNames={d => d.categories.table.columns}
      defaultSorted={defaultSorted}
      filters={filters}
    />
  );
}