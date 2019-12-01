import React from 'react';
import { ClickableIcon, Icon, OpenModalButton } from '../sbadmin2';
import { useUpdateExpense } from '../gql/expenses';
import { useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { ExpenseModal } from './ExpenseModal';
export function UpdateExpenseButton({ expense }) {
  const [updateExpense] = useUpdateExpense();
  const { expenses } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon icon={Icon.Edit} variant={Variant.primary} {...props} />
      )}
      modalContent={props => (
        <ExpenseModal
          init={expense}
          title={expenses.modal.editTitle}
          onSave={input => updateExpense(expense.id, input)}
          {...props}
        />
      )}
    />
  );
}
