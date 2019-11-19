import React, { useRef } from 'react';
import { Page, FaIconLink, FaIcon, OpenModalButton } from './sbadmin2';
import CreateButton from './sbadmin2/utilities/CreateButton';
import { FormControl } from './sbadmin2/utilities/FormControl';
import FormModal from './sbadmin2/utilities/FormModal';
import { useFormData } from './sbadmin2/utilities/useFormData';
import Amount from '../model/Amount';
import Month from '../model/Month';
import {
  useCreateTransfer,
  useGetCurrentTransfers,
  useUpdateTransfer,
  useDeleteTranfer,
} from './gql/transfers';
import { QueryTablePanel } from './gql/QueryTablePanel';
import { useGetAccounts } from './gql/accounts';
import { useBudget } from './gql/budget';
import { WithQuery } from './gql/WithQuery';
import { GlobalHotKeys } from 'react-hotkeys';
import { Combobox } from './sbadmin2/utilities/Combobox';
import { InlineFormControl } from './sbadmin2/utilities/InlineFormControl';
import { useDictionary } from './sbadmin2';
import { Variant } from './sbadmin2/bootstrap';

const columns = [
  { dataField: 'title' },
  {
    dataField: 'fromAccount',
    formatter: a => a && a.name,
  },
  {
    dataField: 'toAccount',
    formatter: a => a.name,
  },
  {
    dataField: 'amount',
    align: 'right',
    headerAlign: 'right',
    formatter: Amount.format,
  },
  {
    dataField: 'date',
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdateTransferButton transfer={row} />
        <DeleteTransferButton transfer={row} />
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
  const { transfers } = useDictionary();
  const query = useGetAccounts();
  const formData = useFormData({
    title: { $init: init.title },
    date: { $init: init.date },
    amount: {
      $init: Amount.format(init.amount, false),
      $process: Amount.parse,
    },
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
              label={transfers.modal.labels.title}
              inline={10}
              formData={formData.title}
              feedback="Provide title"
            />
            <FormControl
              label={transfers.modal.labels.date}
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
              label={transfers.modal.labels.amount}
              feedback="Provide amount"
              type="number"
              required
              formData={formData.amount}
              step="0.01"
            />
            <InlineFormControl
              size={10}
              label={transfers.modal.labels.fromAccount}
            >
              <Combobox
                allowedValues={data.accounts.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
                _ref={formData.fromAccountID}
                defaultValue={formData.fromAccountID.default()}
              />
            </InlineFormControl>
            <InlineFormControl
              size={10}
              label={transfers.modal.labels.toAccount}
            >
              <Combobox
                allowedValues={data.accounts.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
                _ref={formData.toAccountID}
                defaultValue={formData.toAccountID.default()}
              />
            </InlineFormControl>
          </>
        )}
      </WithQuery>
    </FormModal>
  );
}

function DeleteTransferButton({ transfer }) {
  const [deleteTransfer] = useDeleteTranfer();
  return (
    <FaIconLink
      icon={FaIcon.Trash}
      variant={Variant.secondary}
      onClick={() => deleteTransfer(transfer.id)}
    />
  );
}

function UpdateTransferButton({ transfer }) {
  const [updateTransfer] = useUpdateTransfer();
  const { transfers } = useDictionary();
  return (
    <OpenModalButton
      renderButton={props => (
        <FaIconLink icon={FaIcon.Edit} variant={Variant.primary} {...props} />
      )}
      renderModal={props => (
        <TransferModal
          init={transfer}
          title={transfers.modal.editTitle}
          onSave={input => updateTransfer(transfer.id, input)}
          {...props}
        />
      )}
    />
  );
}

function CreateTransferButton({ openRef }) {
  const [createTransfer] = useCreateTransfer();
  const { transfers } = useDictionary();

  return (
    <OpenModalButton
      openRef={openRef}
      renderButton={props => <CreateButton {...props} />}
      renderModal={props => (
        <TransferModal
          init={{
            title: null,
            fromAccount: { id: null },
            toAccount: { id: null },
            amount: null,
            date: null,
          }}
          title={transfers.modal.createTitle}
          onSave={createTransfer}
          {...props}
        />
      )}
    />
  );
}

const keyMap = {
  openModal: 'n',
};
const keyHandlers = openCreateModal => ({
  openModal: () => openCreateModal.current(),
});

export default function Transfers() {
  const query = useGetCurrentTransfers();
  const openCreateModal = useRef();

  return (
    <Page>
      <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers(openCreateModal)} />
      <Page.Header readTitle={d => d.sidebar.pages.transfers} />
      <QueryTablePanel
        query={query}
        getData={data => data.budget.currentMonth.transfers}
        buttons={<CreateTransferButton openRef={openCreateModal} />}
        columns={columns}
        keyField="id"
        readTitle={d => d.transfers.table.title}
        readColumnNames={d => d.transfers.table.columns}
      />
    </Page>
  );
}
