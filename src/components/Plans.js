import React, { useRef } from 'react';
import Page from './sbadmin2/Page/Page';
import PageHeader from './sbadmin2/Page/PageHeader';
import ModalButton from './sbadmin2/Utilities/ModalButton';
import CreateButton from './sbadmin2/Utilities/CreateButton';
import EditTableButton from './sbadmin2/Utilities/EditTableButton';
import { FormControl } from './sbadmin2/Utilities/FormControl';
import { OptionalFormControl } from './sbadmin2/Utilities/OptionalFormControl';
import FormModal from './sbadmin2/Utilities/FormModal';
import { useFormData } from './sbadmin2/Utilities/useFormData';
import Amount from '../model/Amount';
import {
  useCreatePlan,
  useGetCurrentPlans,
  useUpdatePlan,
  useDeletePlan,
} from './gql/plans';
import { QueryTablePanel } from './gql/QueryTablePanel';
import { useGetEnvelopes } from './gql/envelopes';
import { WithQuery } from './gql/WithQuery';
import TableButton from './sbadmin2/Utilities/TableButton';
import { GlobalHotKeys } from 'react-hotkeys';
import { InlineFormControl } from './sbadmin2/Utilities/InlineFormControl';
import { Combobox } from './sbadmin2/Utilities/Combobox';
import { useDictionary, withColumnNames } from './sbadmin2/Utilities/Lang';

const columns = [
  { dataField: 'title' },
  {
    dataField: 'fromEnvelope',
    formatter: a => a && a.name,
  },
  {
    dataField: 'toEnvelope',
    formatter: a => a.name,
  },
  {
    dataField: 'currentAmount',
    formatter: Amount.format,
    align: 'right',
    headerAlign: 'right',
  },
  {
    dataField: 'recurringAmount',
    formatter: a =>
      a !== null ? <i className="fas fa-fw fa-sync-alt" /> : null,
  },
  {
    dataField: 'actions',
    isDummyColumn: true,
    formatter: (cell, row) => (
      <span>
        <UpdatePlanButton plan={row} />
        <DeletePlanButton plan={row} />
      </span>
    ),
    style: {
      whiteSpace: 'nowrap',
      width: '1%',
    },
  },
];

function PlanModal({ init, ...props }) {
  const query = useGetEnvelopes();
  const { plans } = useDictionary();
  const formData = useFormData({
    title: { $init: init.title },
    currentAmount: {
      $init: Amount.format(init.currentAmount, false),
      $process: Amount.parse,
    },
    recurringAmount: {
      $init: Amount.format(init.recurringAmount, false),
      $default: fd => Amount.format(fd.currentAmount.value()),
      $process: Amount.parse,
    },
    fromEnvelopeID: {
      $init: init.fromEnvelope !== null ? init.fromEnvelope.id : '',
      $process: v => (v === '' ? null : v),
    },
    toEnvelopeID: { $init: init.toEnvelope.id },
  });
  return (
    <FormModal formData={formData} autoFocusRef={formData.title} {...props}>
      <WithQuery query={query}>
        {({ data }) => (
          <>
            <FormControl
              required
              label={plans.modal.labels.title}
              inline={10}
              formData={formData.title}
              feedback="Provide title"
            />
            <FormControl
              inline={8}
              label={plans.modal.labels.amount}
              feedback="Provide amount"
              type="number"
              required
              formData={formData.currentAmount}
              step="0.01"
            />
            <OptionalFormControl
              initEnabled={init.recurringAmount !== null}
              inline={8}
              label={plans.modal.labels.recurring}
              feedback="Provide amount for recurring plans"
              type="number"
              required
              formData={formData.recurringAmount}
              step="0.01"
            />
            <InlineFormControl size={8} label={plans.modal.labels.fromEnvelope}>
              <Combobox
                _ref={formData.fromEnvelopeID}
                defaultValue={formData.fromEnvelopeID.default()}
                allowedValues={data.envelopes.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
              />
            </InlineFormControl>
            <InlineFormControl size={8} label={plans.modal.labels.toEnvelope}>
              <Combobox
                _ref={formData.toEnvelopeID}
                defaultValue={formData.toEnvelopeID.default()}
                allowedValues={data.envelopes.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
              />
            </InlineFormControl>
          </>
        )}
      </WithQuery>
    </FormModal>
  );
}

function UpdatePlanButton({ plan }) {
  const [updatePlan] = useUpdatePlan();
  const { plans } = useDictionary();

  return (
    <ModalButton
      button={EditTableButton}
      modal={props => (
        <PlanModal
          init={plan}
          title={plans.modal.editTitle}
          onSave={input => updatePlan(plan.id, input)}
          {...props}
        />
      )}
    />
  );
}

function DeletePlanButton({ plan }) {
  const [deletePlan] = useDeletePlan();
  return (
    <TableButton
      faIcon="trash-alt"
      variant="secondary"
      onClick={() => deletePlan(plan.id)}
    />
  );
}

function CreatePlanButton({ openRef }) {
  const [createPlan] = useCreatePlan();
  const { plans } = useDictionary();

  return (
    <ModalButton
      openRef={openRef}
      button={CreateButton}
      modal={props => (
        <PlanModal
          init={{
            title: null,
            fromEnvelope: { id: null },
            toEnvelope: { id: null },
            currentAmount: null,
            recurringAmount: null,
            date: null,
          }}
          title={plans.modal.createTitle}
          onSave={createPlan}
          {...props}
        />
      )}
    />
  );
}

const keyMap = {
  create: 'n',
};

const handlers = openCreateModalRef => ({
  create: () => openCreateModalRef.current(),
});

export default function Plans() {
  const openCreateModalRef = useRef();
  const query = useGetCurrentPlans();
  const { sidebar, plans } = useDictionary();

  return (
    <Page>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers(openCreateModalRef)} />
      <PageHeader>{sidebar.pages.plans}</PageHeader>
      <QueryTablePanel
        title={plans.table.title}
        query={query}
        getData={data => data.budget.currentMonth.plans}
        buttons={<CreatePlanButton openRef={openCreateModalRef} />}
        columns={withColumnNames(columns, plans.table.columns)}
        keyField="id"
      />
    </Page>
  );
}
