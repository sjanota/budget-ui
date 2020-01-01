import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { CreateExpenseButton } from '../Expenses/CreateExpenseButton';
import { ExpensesTablePanel } from '../Expenses/ExpensesTablePanel';
import { useGetCategories } from '../gql/categories';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { CollapsiblePanel } from '../sbadmin2/components/CollapsiblePanel/CollapsiblePanel';
import DetailsWorkflow from '../workflow/DetailsWorkflow';
import { columns } from './CategoriesTablePanel';
import { CreateCategoryButton } from './CreateCategoryButton';
import { UpdateCategoryButton } from './UpdateCategoryButton';

export default function CategoryPage() {
  const query = useGetCategories();

  return (
    <DetailsWorkflow
      basePath='/categories'
      readTitle={d => d.categories.table.title}
      getBreadcrumbPrefix={category => [
        { to: '/envelopes', readText: d => d.sidebar.pages.envelopes },
        {
          to: `/envelopes/${category.envelope.name}`,
          text: category.envelope.name,
        },
      ]}
      query={query}
      getData={d => d.categories}
      renderActions={row => (
        <span>
          <UpdateCategoryButton category={row} />
          <IconButton icon={faArchive} variant={Variant.secondary} borderless />
        </span>
      )}
      columns={columns}
      readColumnNames={d => d.categories.table.columns}
      detailsComponent={CategoryDetails}
      createButton={<CreateCategoryButton />}
    />
  );
}

function CategoryDetails(props) {
  return (
    <>
      <CategoryExpenses {...props} />
    </>
  );
}

function CategoryExpenses({ entity }) {
  return (
    <ExpensesTablePanel
      readTitle={d => d.expenses.table.title}
      createButton={<CreateExpenseButton />}
      wrapper={CollapsiblePanel}
      categoryFilter={entity.id}
    />
  );
}
