import React from 'react';

import { Page } from '../sbadmin2';
import { PlansTablePanel } from './PlansTablePanel';

export default function PlansPage() {
  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.plans} />
      <PlansTablePanel />
    </Page>
  );
}
