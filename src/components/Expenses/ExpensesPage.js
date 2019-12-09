import React from 'react';

import MonthSwitcher from '../common/MonthSwitcher';
import { Page } from '../sbadmin2';
import { CreateExpenseButton } from './CreateExpenseButton';
import { ExpensesTablePanel } from './ExpensesTablePanel';

export default function ExpensesPage() {
  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.expenses}>
        <MonthSwitcher />
      </Page.Header>
      <ExpensesTablePanel
        readTitle={d => d.expenses.table.title}
        createButton={<CreateExpenseButton />}
      />
    </Page>
  );
}
