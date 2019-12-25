import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Page } from '../sbadmin2';
import { AccountDetails } from './AccountDetails';
import { AccountsTablePanel } from './AccountsTablePanel';

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.accounts} />
      <Row>
        <Col sm={3}>
          <AccountsTablePanel
            hiddenColumns={['balance']}
            onSelect={setSelectedAccount}
          />
        </Col>
        <Col>
          {!selectedAccount ? null : (
            <AccountDetails account={selectedAccount} />
          )}
        </Col>
      </Row>
    </Page>
  );
}
