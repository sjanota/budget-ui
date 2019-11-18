import React from 'react';
import { useGetCategories } from '../gql/categories';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { CreateCategoryButton } from './CreateCategoryButton';
import { UpdateCategoryButton } from './UpdateCategoryButton';
import { useDictionary, withColumnNames } from '../sbadmin2/language';
import { FaIconLink, FaIcon } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

const columns = [
  { dataField: 'name' },
  {
    dataField: 'envelope',
    formatter: a => a.name,
  },
  { dataField: 'description' },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateCategoryButton category={row} />
        <FaIconLink icon={FaIcon.Archive} variant={Variant.secondary} />
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

export function CategoriesListPanel({ createFunRef }) {
  const query = useGetCategories();
  const { categories } = useDictionary();
  return (
    <QueryTablePanel
      buttons={<CreateCategoryButton openRef={createFunRef} />}
      title={categories.table.title}
      query={query}
      getData={data => data.categories}
      columns={withColumnNames(columns, categories.table.columns)}
      keyField="id"
    />
  );
}
