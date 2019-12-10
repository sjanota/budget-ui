import React from 'react';

import MonthSwitcher from '../common/MonthSwitcher';
import { Page } from '../sbadmin2';
import { CreateTransferButton } from './CreateTransferButton';
import { TransfersTablePanel } from './TransfersTablePanel';

export function TransfersPage() {
  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.transfers}>
        <MonthSwitcher />
      </Page.Header>
      <TransfersTablePanel
        readTitle={d => d.transfers.table.title}
        createButton={<CreateTransferButton />}
      />
    </Page>
  );
}
