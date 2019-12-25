import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../../model/Amount';
import Envelope from '../../model/Envelope';
import { useGetEnvelopes } from '../gql/envelopes';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { IconButton } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { CreateEnvelopeButton } from './CreateEnvelopeButton';
import { UpdateEnvelopeButton } from './UpdateEnvelopeButton';

export const columns = [
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

const defaultSorted = [
  {
    dataField: 'name',
    order: 'asc',
  },
];

export function EnvelopesTablePanel({ selected, onSelect, ...props }) {
  const query = useGetEnvelopes();

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    classes: 'text-white bg-primary selected',
    onSelect,
    selected: [selected],
  };

  return (
    <QueryTablePanel
      {...props}
      query={query}
      buttons={<CreateEnvelopeButton />}
      getData={data => data.envelopes}
      columns={columns}
      keyField='id'
      readTitle={d => d.envelopes.table.title}
      readColumnNames={d => d.envelopes.table.columns}
      selectRow={selectRow}
      defaultSorted={defaultSorted}
    />
  );
}
