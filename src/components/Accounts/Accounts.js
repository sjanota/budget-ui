import React, { useState } from 'react';

import { Page } from '../sbadmin2';

import { Row, Col } from 'react-bootstrap';
import { AccountsTablePanel } from './AccountsTablePanel';
import { ExpensesTablePanel } from '../Expenses/ExpensesTablePanel';
import { CreateExpenseButton } from '../Expenses/CreateExpenseButton';

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
            <ExpensesTablePanel
              readTitle={d =>
                d.accounts.expensesTableTitle(selectedAccount.name)
              }
              createButton={
                <CreateExpenseButton account={selectedAccount.id} />
              }
              accountFilter={selectedAccount.id}
              hiddenColumns={['account']}
            />
          )}
        </Col>
      </Row>
    </Page>
  );
}
