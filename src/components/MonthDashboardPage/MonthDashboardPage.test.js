import { MockedProvider } from '@apollo/react-testing';
import { render, waitForDomChange } from '@testing-library/react';
import React from 'react';

import dict from '../../lang/pl';
import { BudgetContext } from '../gql/budget';
import { GET_CURRENT_MONTHLY_REPORT } from '../gql/monthlyReport';
import { DictionaryContext } from '../sbadmin2/language';
import { MonthDashboardPage } from './MonthDashboardPage';

const selectedBudget = {
  id: 'f834e106-dc2f-4d71-a7b4-476f531891e7',
  name: 'my budget',
};

const queryMock = {
  request: {
    query: GET_CURRENT_MONTHLY_REPORT,
    variables: {
      budgetID: selectedBudget.id,
    },
  },
  result: {
    data: {
      budget: {
        __typename: 'Budget',
        currentMonth: {
          __typename: 'MonthlyReport',
          month: '12-2019',
          totalPlannedAmount: 123,
          totalIncomeAmount: 123,
          totalExpenseAmount: 123,
          problems: [],
        },
      },
    },
  },
};

it('MonthDashboardPage', async () => {
  const { container } = render(
    <DictionaryContext.Provider value={dict}>
      <MockedProvider mocks={[queryMock]} addTypename>
        <BudgetContext.Provider value={{ selectedBudget }}>
          <MonthDashboardPage />
        </BudgetContext.Provider>
      </MockedProvider>
    </DictionaryContext.Provider>
  );
  await waitForDomChange(() => {}, container);
});
