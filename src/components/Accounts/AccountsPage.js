import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../../model/Amount';
import { useGetAccounts } from '../gql/accounts';
import ListWithDetails from '../layout/ListWithDetails';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { AccountDetails } from './AccountDetails';
import { CreateAccountButton } from './CreateAccountButton';
import { UpdateAccountButton } from './UpdateAccountButton';

const columns = [
  { dataField: 'name', sort: true },
  {
    dataField: 'balance',
    align: 'right',
    headerAlign: 'right',
    formatter: Amount.format,
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (_, row) => (
      <span>
        <UpdateAccountButton account={row} />
        <IconButton icon={faArchive} variant={Variant.secondary} borderless />
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

export default function AccountsPage() {
  const query = useGetAccounts();

  return (
    <ListWithDetails
      basePath='/accounts'
      readTitle={d => d.sidebar.pages.accounts}
      detailsComponent={AccountDetails}
      query={query}
      createButton={<CreateAccountButton />}
      getData={data => data.accounts}
      columns={columns}
      readColumnNames={d => d.accounts.table.columns}
    />
  );
}
