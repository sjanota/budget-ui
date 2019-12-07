import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useUpdateExpense } from '../gql/expenses';
import { IconButton, OpenModalButton } from '../sbadmin2';
import { useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { ExpenseModal } from './ExpenseModal';

export function UpdateExpenseButton({ expense }) {
  const [updateExpense] = useUpdateExpense();
  const { expenses } = useDictionary();
  return (
    <OpenModalButton
      button={props => (
        <IconButton
          icon={faEdit}
          variant={Variant.primary}
          {...props}
          borderless
        />
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

UpdateExpenseButton.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string,
  }),
};
