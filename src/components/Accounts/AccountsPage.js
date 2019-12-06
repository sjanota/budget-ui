import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { CreateExpenseButton } from '../Expenses/CreateExpenseButton';
import { ExpensesTablePanel } from '../Expenses/ExpensesTablePanel';
import { Page } from '../sbadmin2';
import { CreateTransferButton } from '../Transfers/CreateTransferButton';
import { TransfersTablePanel } from '../Transfers/TransfersTablePanel';
import { AccountsTablePanel } from './AccountsTablePanel';
import { CollapsiblePanel } from './CollapsiblePanel';

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.accounts} />
      <Row>
        <Col sm={5}>
          <AccountsTablePanel onSelectAcount={a => setSelectedAccount(a)} />
        </Col>
        <Col>
          {!selectedAccount ? null : (
            <>
              <h3>{selectedAccount.name}</h3>
              <TransfersTablePanel
                readTitle={d => d.accounts.inTransfersTableTitle}
                createButton={
                  <CreateTransferButton toAccount={selectedAccount} />
                }
                accountFilter={selectedAccount.id}
                hiddenColumns={['toAccount']}
                wrapper={CollapsiblePanel}
                toAccountFilter={selectedAccount.id}
              />
              <TransfersTablePanel
                readTitle={d => d.accounts.outTransfersTableTitle}
                createButton={
                  <CreateTransferButton fromAccount={selectedAccount} />
                }
                accountFilter={selectedAccount.id}
                hiddenColumns={['fromAccount']}
                wrapper={CollapsiblePanel}
                fromAccountFilter={selectedAccount.id}
              />
              <ExpensesTablePanel
                readTitle={d => d.accounts.expensesTableTitle}
                createButton={<CreateExpenseButton account={selectedAccount} />}
                accountFilter={selectedAccount.id}
                hiddenColumns={['account']}
                wrapper={CollapsiblePanel}
                wrapperProps={{ initialyShown: true }}
              />
            </>
          )}
        </Col>
      </Row>
    </Page>
  );
}
