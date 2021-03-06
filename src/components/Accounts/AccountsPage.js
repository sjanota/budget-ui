import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../../model/Amount';
import { useGetAccounts } from '../gql/accounts';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import ListWithDetailsWorkflow from '../workflow/ListWithDetailsWorkflow';
import { AccountDetails } from './AccountDetails';
import { CreateAccountButton } from './CreateAccountButton';
import { UpdateAccountButton } from './UpdateAccountButton';

const columns = [
  {
    dataField: 'balance',
    align: 'right',
    headerAlign: 'right',
    formatter: Amount.prettyFormat,
  },
];

export default function AccountsPage() {
  const query = useGetAccounts();

  return (
    <ListWithDetailsWorkflow
      basePath='/accounts'
      readTitle={d => d.sidebar.pages.accounts}
      detailsComponent={AccountDetails}
      query={query}
      createButton={<CreateAccountButton />}
      getData={data => data.accounts}
      columns={columns}
      readColumnNames={d => d.accounts.table.columns}
      renderActions={account => (
        <>
          <UpdateAccountButton account={account} />
          <IconButton icon={faArchive} variant={Variant.secondary} borderless />
        </>
      )}
    />
  );
}
