import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../../model/Amount';
import Envelope from '../../model/Envelope';
import { useGetEnvelopes } from '../gql/envelopes';
import ListWithDetails from '../layout/ListWithDetails';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { CreateEnvelopeButton } from './CreateEnvelopeButton';
import { UpdateEnvelopeButton } from './UpdateEnvelopeButton';

const columns = [
  { dataField: 'name', sort: true },
  {
    dataField: 'limit',
    formatter: Amount.format,
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'balance',
    formatter: Amount.format,
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'overLimit',
    align: 'right',
    headerAlign: 'right',
    formatter: (_, row) => Envelope.overLimit(row),
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (_, row) => (
      <span>
        <UpdateEnvelopeButton envelope={row} />
        <IconButton icon={faArchive} variant={Variant.secondary} borderless />
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

export default function EnvelopesPage() {
  const query = useGetEnvelopes();

  return (
    <ListWithDetails
      basePath='/envelopes'
      readTitle={d => d.sidebar.pages.envelopes}
      detailsComponent={EnvelopeDetails}
      query={query}
      createButton={<CreateEnvelopeButton />}
      getData={data => data.envelopes}
      columns={columns}
      readColumnNames={d => d.envelopes.table.columns}
    />
  );
}

export function EnvelopeDetails({ name, entity }) {
  return <div>Dupa {name}</div>;
}
