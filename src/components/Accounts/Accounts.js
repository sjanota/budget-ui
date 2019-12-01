import React, { useState } from 'react';

import { Page } from '../sbadmin2';

import { Row, Col } from 'react-bootstrap';
import { AccountsTablePanel } from './AccountsTablePanel';
import { ExpensesTablePanel } from '../Expenses/ExpensesTablePanel';
import { CreateExpenseButton } from '../Expenses/CreateExpenseButton';
import { CollapsiblePanel } from './CollapsiblePanel';
import { TransfersTablePanel } from '../Transfers/TransfersTablePanel';

export default function Accounts() {
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
              <TransfersTablePanel
                readTitle={d => d.accounts.inTransfersTableTitle()}
                createButton={<CreateExpenseButton account={selectedAccount} />}
                accountFilter={selectedAccount.id}
                hiddenColumns={['toAccount']}
                wrapper={CollapsiblePanel}
                toAccountFilter={selectedAccount.id}
              />
              <TransfersTablePanel
                readTitle={d => d.accounts.outTransfersTableTitle()}
                createButton={<CreateExpenseButton account={selectedAccount} />}
                accountFilter={selectedAccount.id}
                hiddenColumns={['fromAccount']}
                wrapper={CollapsiblePanel}
                fromAccountFilter={selectedAccount.id}
              />
              <ExpensesTablePanel
                readTitle={d =>
                  d.accounts.expensesTableTitle(selectedAccount.name)
                }
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
