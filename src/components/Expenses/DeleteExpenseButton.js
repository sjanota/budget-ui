import React from 'react';
import PropTypes from 'prop-types';
import { ClickableIcon, Icon } from '../sbadmin2';
import { useDeleteExpense } from '../gql/expenses';
import { Variant } from '../sbadmin2/bootstrap';

export function DeleteExpenseButton({ expense }) {
  const [deleteExpense] = useDeleteExpense();
  return (
    <ClickableIcon
      icon={Icon.Trash}
      variant={Variant.danger}
      onClick={() => deleteExpense(expense.id)}
    />
  );
}

DeleteExpenseButton.propTypes = {
  expense: PropTypes.shape({ id: PropTypes.any }).isRequired,
};
