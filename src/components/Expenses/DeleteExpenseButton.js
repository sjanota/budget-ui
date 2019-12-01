import React from 'react';
import { ClickableIcon, Icon } from '../sbadmin2';
import { useDeleteExpense } from '../gql/expenses';
import { Variant } from '../sbadmin2/bootstrap';
export function DeleteExpenseButton({ expense }) {
  const [deleteExpense] = useDeleteExpense();
  return (
    <ClickableIcon
      icon={Icon.Trash}
      variant={Variant.secondary}
      onClick={() => deleteExpense(expense.id)}
    />
  );
}
