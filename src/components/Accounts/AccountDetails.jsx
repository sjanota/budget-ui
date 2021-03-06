import PropTypes from 'prop-types';
import React from 'react';

import { CreateExpenseButton } from '../Expenses/CreateExpenseButton';
import { ExpensesTablePanel } from '../Expenses/ExpensesTablePanel';
import { CollapsiblePanel } from '../sbadmin2/components/CollapsiblePanel/CollapsiblePanel';
import { CreateTransferButton } from '../Transfers/CreateTransferButton';
import { TransfersTablePanel } from '../Transfers/TransfersTablePanel';

export function AccountDetails({ entity: account }) {
  return (
    <>
      <TransfersTablePanel
        readTitle={d => d.accounts.inTransfersTableTitle}
        createButton={<CreateTransferButton toAccount={account} />}
        accountFilter={account.id}
        hiddenColumns={['toAccount']}
        wrapper={CollapsiblePanel}
        toAccountFilter={account.id}
      />
      <TransfersTablePanel
        readTitle={d => d.accounts.outTransfersTableTitle}
        createButton={<CreateTransferButton fromAccount={account} />}
        accountFilter={account.id}
        hiddenColumns={['fromAccount']}
        wrapper={CollapsiblePanel}
        fromAccountFilter={account.id}
      />
      <ExpensesTablePanel
        readTitle={d => d.accounts.expensesTableTitle}
        createButton={<CreateExpenseButton account={account} />}
        accountFilter={account.id}
        hiddenColumns={['account']}
        wrapper={CollapsiblePanel}
      />
    </>
  );
}

AccountDetails.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
