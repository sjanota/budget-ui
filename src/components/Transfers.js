import React from 'react';
import Page from './template/Page/Page';
import PageHeader from './template/Page/PageHeader';
import ModalButton from './template/Utilities/ModalButton';
import CreateButton from './template/Utilities/CreateButton';
import EditTableButton from './template/Utilities/EditTableButton';
import { FormControl } from './template/Utilities/FormControl';
import FormModal from './template/Utilities/FormModal';
import { useFormData } from './template/Utilities/useFormData';
import Amount from '../model/Amount';
import Month from '../model/Month';
import {
  useCreateTransfer,
  useGetCurrentTransfers,
  useUpdateTransfer,
} from './gql/transfers';
import { QueryTablePanel } from './gql/QueryTablePanel';
import { useGetAccounts } from './gql/accounts';
import { useBudget } from './gql/budget';
import { WithQuery } from './gql/WithQuery';

const columns = [
  { dataField: 'title', text: 'Title' },
  {
    dataField: 'amount',
    text: 'Amount',
    formatter: Amount.format,
  },
  {
    dataField: 'fromAccount',
    text: 'From',
    formatter: a => a && a.name,
  },
  {
    dataField: 'toAccount',
    text: 'To',
    formatter: a => a.name,
  },
  {
    dataField: 'date',
    text: 'Date',
  },
  {
    dataField: 'actions',
    text: '',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateTransferButton transfer={row} />
        <span style={{ cursor: 'pointer' }}>
          <i className="fas fa-archive fa-fw" />
        </span>
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

function TransferModal({ init, ...props }) {
  const { selectedBudget } = useBudget();
  const query = useGetAccounts();
  const formData = useFormData({
    title: { $init: init.title },
    date: { $init: init.date },
    amount: { $init: Amount.format(init.amount), $process: Amount.parse },
    fromAccountID: {
      $init: init.fromAccount && init.fromAccount.id,
      $process: v => (v === '' ? null : v),
    },
    toAccountID: { $init: init.toAccount.id },
  });
  const month = Month.parse(selectedBudget.currentMonth.month);
  const first = month.firstDay();
  const last = month.lastDay();
  return (
    <FormModal formData={formData} autoFocusRef={formData.title} {...props}>
      <WithQuery query={query}>
        {({ data }) => (
          <>
            <FormControl
              required
              label="Title"
              inline={10}
              formData={formData.title}
              feedback="Provide title"
            />
            <FormControl
              label="Date"
              inline={10}
              formData={formData.date}
              feedback="Provide date"
              type="date"
              required
              min={first.format()}
              max={last.format()}
            />
            <FormControl
              inline={10}
              label="Amount"
              feedback="Provide amount"
              type="number"
              required
              formData={formData.amount}
              step="0.01"
            />
            <FormControl
              label="From"
              inline={10}
              formData={formData.fromAccountID}
              feedback="Provide from"
              as="select"
            >
              <option />
              {data.accounts.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormControl>
            <FormControl
              label="To"
              inline={10}
              formData={formData.toAccountID}
              feedback="Provide to"
              as="select"
              required
            >
              <option />
              {data.accounts.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormControl>
          </>
        )}
      </WithQuery>
    </FormModal>
  );
}

function UpdateTransferButton({ transfer }) {
  const [updateTransfer] = useUpdateTransfer();
  return (
    <ModalButton
      button={EditTableButton}
      modal={props => (
        <TransferModal
          init={transfer}
          title="Edit transfer"
          onSave={input => updateTransfer(transfer.id, input)}
          {...props}
        />
      )}
    />
  );
}

function CreateTransferButton() {
  const [createTransfer] = useCreateTransfer();
  return (
    <ModalButton
      button={CreateButton}
      modal={props => (
        <TransferModal
          init={{
            title: null,
            fromAccount: { id: null },
            toAccount: { id: null },
            amount: null,
            date: null,
          }}
          title="Add new transfer"
          onSave={createTransfer}
          {...props}
        />
      )}
    />
  );
}

export default function Transfers() {
  const query = useGetCurrentTransfers();

  return (
    <Page>
      <PageHeader>Transfers</PageHeader>
      <QueryTablePanel
        title="Transfer list"
        query={query}
        getData={data => data.budget.currentMonth.transfers}
        buttons={<CreateTransferButton />}
        columns={columns}
        keyField="id"
      />
    </Page>
  );
}