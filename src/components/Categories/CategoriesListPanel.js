import React from 'react';
import { useGetCategories } from '../gql/categories';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { CreateCategoryButton } from './CreateCategoryButton';
import { UpdateCategoryButton } from './UpdateCategoryButton';
import { ClickableIcon, Icon } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

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
        <ClickableIcon icon={Icon.Archive} variant={Variant.secondary} />
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

export function CategoriesListPanel({ createFunRef }) {
  const query = useGetCategories();
  return (
    <QueryTablePanel
      keyField="id"
      columns={columns}
      buttons={<CreateCategoryButton openRef={createFunRef} />}
      query={query}
      getData={data => data.categories}
      readTitle={d => d.categories.table.title}
      readColumnNames={d => d.categories.table.columns}
      defaultSorted={defaultSorted}
    />
  );
}
