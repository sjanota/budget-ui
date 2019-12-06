import { faArchive } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../../model/Amount';
import { useGetEnvelopes } from '../gql/envelopes';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { ClickableIcon } from '../sbadmin2';
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
    formatter: (cell, row) =>
      row.limit !== null && row.limit < row.balance
        ? Amount.format(row.balance - row.limit)
        : '',
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateEnvelopeButton envelope={row} />
        <ClickableIcon icon={faArchive} variant={Variant.secondary} />
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

export function EnvelopesListPanel({ createFunRef }) {
  const query = useGetEnvelopes();
  return (
    <QueryTablePanel
      query={query}
      buttons={<CreateEnvelopeButton openRef={createFunRef} />}
      getData={data => data.envelopes}
      columns={columns}
      keyField='id'
      readTitle={d => d.envelopes.table.title}
      readColumnNames={d => d.envelopes.table.columns}
      defaultSorted={defaultSorted}
    />
  );
}
