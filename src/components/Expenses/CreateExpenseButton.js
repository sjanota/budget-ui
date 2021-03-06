import PropTypes from 'prop-types';
import React from 'react';

import CreateButton from '../common/CreateButton';
import { useCreateExpense } from '../gql/expenses';
import { OpenModalButton } from '../sbadmin2';
import { useDictionary } from '../sbadmin2';
import { ExpenseModal } from './ExpenseModal';

export function CreateExpenseButton({ account }) {
  const [createExpense] = useCreateExpense();
  const { expenses } = useDictionary();

  return (
    <OpenModalButton
      button={props => <CreateButton {...props} />}
      modalContent={props => (
        <ExpenseModal
          init={{
            name: null,
            account: {},
            date: null,
            categories: [],
          }}
          account={account}
          title={expenses.modal.createTitle}
          onSave={createExpense}
          {...props}
        />
      )}
    />
  );
}

CreateExpenseButton.propTypes = {
  account: PropTypes.any,
};
