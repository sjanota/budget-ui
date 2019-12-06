import { MockedProvider } from '@apollo/react-testing';
import { render, waitForDomChange } from '@testing-library/react';
import React from 'react';

import dict from '../../lang/pl';
import { BudgetContext } from '../gql/budget';
import { DictionaryContext } from '../sbadmin2/language';
import EnvelopesPage from './EnvelopesPage';

const selectedBudget = {
  id: 'f834e106-dc2f-4d71-a7b4-476f531891e7',
  name: 'my budget',
};

it('Envelopes', async () => {
  const { container } = render(
    <DictionaryContext.Provider value={dict}>
      <MockedProvider mocks={[]}>
        <BudgetContext.Provider value={{ selectedBudget }}>
          <EnvelopesPage />
        </BudgetContext.Provider>
      </MockedProvider>
    </DictionaryContext.Provider>
  );
  await waitForDomChange(() => {}, container);
});
