import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useDeleteExpense } from '../gql/expenses';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';

export function DeleteExpenseButton({ expense }) {
  const [deleteExpense] = useDeleteExpense();
  return (
    <IconButton
      icon={faTrash}
      variant={Variant.danger}
      onClick={() => deleteExpense(expense.id)}
      borderless
    />
  );
}

DeleteExpenseButton.propTypes = {
  expense: PropTypes.shape({ id: PropTypes.any }).isRequired,
};
