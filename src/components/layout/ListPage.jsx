import React from 'react';

import { EntityList } from '../common/EntityList';
import { Page } from '../sbadmin2';

export function ListPage({ ...props }) {
  const { title } = props;
  return (
    <Page>
      <Page.Header title={title} />
      <EntityList {...props} />
    </Page>
  );
}
