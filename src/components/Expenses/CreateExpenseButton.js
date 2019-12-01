import React from 'react';
import { OpenModalButton } from '../sbadmin2';
import CreateButton from '../sbadmin2/utilities/CreateButton';
import { useCreateExpense } from '../gql/expenses';
import { useDictionary } from '../sbadmin2';
import { ExpenseModal } from './ExpenseModal';

export function CreateExpenseButton({ account }) {
  const [createExpense] = useCreateExpense();
  const { expenses } = useDictionary();
  const initAccount = account ? { id: account } : {};

  return (
    <OpenModalButton
      button={props => <CreateButton {...props} />}
      modalContent={props => (
        <ExpenseModal
          init={{
            name: null,
            account: initAccount,
            date: null,
            categories: [],
          }}
          title={expenses.modal.createTitle}
          onSave={createExpense}
          {...props}
        />
      )}
    />
  );
}
