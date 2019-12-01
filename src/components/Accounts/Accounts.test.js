import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { BudgetContext } from '../gql/budget';
import dict from '../../lang/pl';

import Accounts from './Accounts';
import { DictionaryContext } from '../sbadmin2/language';

const selectedBudget = {
  id: 'f834e106-dc2f-4d71-a7b4-476f531891e7',
  name: 'my budget',
};

it('Accounts', async () => {
  const { container } = render(
    <DictionaryContext.Provider value={dict}>
      <MockedProvider mocks={[]}>
        <BudgetContext.Provider value={{ selectedBudget }}>
          <Accounts />
        </BudgetContext.Provider>
      </MockedProvider>
    </DictionaryContext.Provider>
  );
  await waitForDomChange(() => {}, container);
});
