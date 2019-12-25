import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../../model/Amount';
import Envelope from '../../model/Envelope';
import { CategoriesTablePanel } from '../Categories/CategoriesTablePanel';
import { useGetEnvelopes } from '../gql/envelopes';
import ListWithDetails from '../layout/ListWithDetails';
import { PlansTablePanel } from '../Plans/PlansTablePanel';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { CollapsiblePanel } from '../sbadmin2/components/CollapsiblePanel/CollapsiblePanel';
import { CreateEnvelopeButton } from './CreateEnvelopeButton';
import { UpdateEnvelopeButton } from './UpdateEnvelopeButton';

const columns = [
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
      renderActions={envelope => (
        <>
          <UpdateEnvelopeButton envelope={envelope} />
          <IconButton icon={faArchive} variant={Variant.secondary} borderless />
        </>
      )}
    />
  );
}

export function EnvelopeDetails({ entity }) {
  return (
    <>
      <CategoriesTablePanel
        hiddenColumns={['envelope']}
        envelopeFilter={entity}
        wrapper={CollapsiblePanel}
      />
      <PlansTablePanel
        hiddenColumns={['toEnvelope']}
        toEnvelope={entity}
        wrapper={CollapsiblePanel}
        readTitle={d => d.envelopes.inPlansTableTitle}
      />
      <PlansTablePanel
        hiddenColumns={['fromEnvelope']}
        fromEnvelope={entity}
        wrapper={CollapsiblePanel}
        readTitle={d => d.envelopes.outPlansTableTitle}
      />
    </>
  );
}
