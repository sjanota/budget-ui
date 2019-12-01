import React from 'react';
import { OpenModalButton } from '../sbadmin2';
import CreateButton from '../sbadmin2/utilities/CreateButton';
import { useCreateExpense } from '../gql/expenses';
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
          defaultValues={{ account }}
          title={expenses.modal.createTitle}
          onSave={createExpense}
          {...props}
        />
      )}
    />
  );
}
