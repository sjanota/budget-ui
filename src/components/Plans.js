import React, { useRef } from 'react';
import { Page, ClickableIcon, Icon, OpenModalButton } from './sbadmin2';
import CreateButton from './sbadmin2/utilities/CreateButton';
import { FormControl } from './sbadmin2/utilities/FormControl';
import { OptionalFormControl } from './sbadmin2/utilities/OptionalFormControl';
import FormModal from './sbadmin2/utilities/FormModal';
import { useFormData } from './sbadmin2/utilities/useFormData';
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
import { GlobalHotKeys } from 'react-hotkeys';
import { InlineFormControl } from './sbadmin2/utilities/InlineFormControl';
import { Combobox } from './sbadmin2/utilities/Combobox';
import { useDictionary } from './sbadmin2';
import { Variant } from './sbadmin2/bootstrap';

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
    <OpenModalButton
      renderButton={props => (
        <ClickableIcon icon={Icon.Edit} variant={Variant.primary} {...props} />
      )}
      renderModal={props => (
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
    <ClickableIcon
      icon={Icon.Trash}
      variant={Variant.secondary}
      onClick={() => deletePlan(plan.id)}
    />
  );
}

function CreatePlanButton({ openRef }) {
  const [createPlan] = useCreatePlan();
  const { plans } = useDictionary();

  return (
    <OpenModalButton
      openRef={openRef}
      renderButton={props => <CreateButton {...props} />}
      renderModal={props => (
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

  return (
    <Page>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers(openCreateModalRef)} />
      <Page.Header readTitle={d => d.sidebar.pages.plans} />
      <QueryTablePanel
        query={query}
        getData={data => data.budget.currentMonth.plans}
        buttons={<CreatePlanButton openRef={openCreateModalRef} />}
        columns={columns}
        keyField="id"
        readTitle={d => d.plans.table.title}
        readColumnNames={d => d.plans.table.columns}
      />
    </Page>
  );
}
