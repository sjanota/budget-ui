import React from 'react';
import { Page } from '../sbadmin2';
import { CreateExpenseButton } from './CreateExpenseButton';
import { ExpensesTablePanel } from './ExpensesTablePanel';

export default function ExpensesPage() {
  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.expenses} />
      <ExpensesTablePanel
        readTitle={d => d.expenses.table.title}
        createButton={<CreateExpenseButton />}
      />
    </Page>
  );
}
