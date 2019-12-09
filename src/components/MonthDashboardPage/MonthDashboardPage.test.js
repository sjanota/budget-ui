import { MockedProvider } from '@apollo/react-testing';
import { render, waitForDomChange } from '@testing-library/react';
import React from 'react';

import dict from '../../lang/pl';
import { MonthProvider } from '../context/Month';
import { BudgetContext } from '../gql/budget';
import { GET_MONTHLY_REPORT } from '../gql/monthlyReport';
import { DictionaryContext } from '../sbadmin2/language';
import { MonthDashboardPage } from './MonthDashboardPage';

const selectedBudget = {
  id: 'f834e106-dc2f-4d71-a7b4-476f531891e7',
  name: 'my budget',
  currentMonth: {
    month: '12-2019',
  },
};

const queryMock = {
  request: {
    query: GET_MONTHLY_REPORT,
    variables: {
      budgetID: selectedBudget.id,
      month: selectedBudget.currentMonth.month,
    },
  },
  result: {
    data: {
      monthlyReport: {
        __typename: 'MonthlyReport',
        month: '12-2019',
        totalPlannedAmount: 123,
        totalIncomeAmount: 123,
        totalExpenseAmount: 123,
        problems: [],
      },
    },
  },
};

it('MonthDashboardPage', async () => {
  const { container } = render(
    <DictionaryContext.Provider value={dict}>
      <MockedProvider mocks={[queryMock]} addTypename>
        <BudgetContext.Provider value={{ selectedBudget }}>
          <MonthProvider currentMonth={selectedBudget.currentMonth.month}>
            <MonthDashboardPage />
          </MonthProvider>
        </BudgetContext.Provider>
      </MockedProvider>
    </DictionaryContext.Provider>
  );
  await waitForDomChange(() => {}, container);
});
