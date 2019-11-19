import React from 'react';
import { useGetEnvelopes } from '../gql/envelopes';
import { CreateEnvelopeButton } from './CreateEnvelopeButton';
import Amount from '../../model/Amount';
import { UpdateEnvelopeButton } from './UpdateEnvelopeButton';
import { QueryTablePanel } from '../gql/QueryTablePanel';
import { Variant } from '../sbadmin2/bootstrap';
import { Icon, ClickableIcon } from '../sbadmin2';

const columns = [
  { dataField: 'name' },
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
        <ClickableIcon icon={Icon.Archive} variant={Variant.secondary} />
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
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
      keyField="id"
      readTitle={d => d.envelopes.table.title}
      readColumnNames={d => d.envelopes.table.columns}
    />
  );
}
