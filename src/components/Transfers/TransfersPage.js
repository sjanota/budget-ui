import React from 'react';
import { Page } from '../sbadmin2';
import { TransfersTablePanel } from './TransfersTablePanel';
import { CreateTransferButton } from './CreateTransferButton';

export function TransfersPage() {
  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.transfers} />
      <TransfersTablePanel
        readTitle={d => d.transfers.table.title}
        createButton={<CreateTransferButton />}
      />
    </Page>
  );
}
