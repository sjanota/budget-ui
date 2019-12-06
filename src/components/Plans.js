import {} from './sbadmin2';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Amount from '../model/Amount';
import CreateButton from './common/CreateButton';
import { AmountInput } from './Expenses/AmountInput';
import { useGetEnvelopes } from './gql/envelopes';
import {
  useCreatePlan,
  useDeletePlan,
  useGetCurrentPlans,
  useUpdatePlan,
} from './gql/plans';
import { QueryTablePanel } from './gql/QueryTablePanel';
import { WithQuery } from './gql/WithQuery';
import { IconButton, OpenModalButton, Page, useDictionary } from './sbadmin2';
import { Variant } from './sbadmin2/bootstrap';
import { Combobox } from './sbadmin2/utilities/Combobox';
import { FormControl } from './sbadmin2/utilities/FormControl';
import { FormInModal } from './sbadmin2/utilities/FormInModal';
import { InlineFormControl } from './sbadmin2/utilities/InlineFormControl';
import { OptionalFormControl } from './sbadmin2/utilities/OptionalFormControl';
import { useFormData } from './sbadmin2/utilities/useFormData';

const columns = [
  { dataField: 'title', sort: true },
  {
    dataField: 'fromEnvelope',
    sort: true,
    sortValue: cell => (cell ? cell.name : ''),
    formatter: a => a && a.name,
  },
  {
    dataField: 'toEnvelope',
    sort: true,
    sortValue: cell => (cell ? cell.name : ''),
    formatter: a => a && a.name,
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
      a !== null ? <i className='fas fa-fw fa-sync-alt' /> : null,
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

const defaultSorted = [
  {
    dataField: 'title',
    order: 'asc',
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
    <FormInModal formData={formData} {...props}>
      <WithQuery query={query}>
        {({ data }) => (
          <>
            <FormControl
              required
              label={plans.modal.labels.title}
              inline={10}
              formData={formData.title}
              feedback='Provide title'
            />
            <FormControl inline={8} label={plans.modal.labels.amount}>
              <AmountInput formData={formData.currentAmount} />
            </FormControl>
            <OptionalFormControl
              initEnabled={init.recurringAmount !== null}
              inline={8}
              label={plans.modal.labels.recurring}
              feedback='Provide amount for recurring plans'
              type='number'
              required
              formData={formData.recurringAmount}
              step='0.01'
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
    </FormInModal>
  );
}

function UpdatePlanButton({ plan }) {
  const [updatePlan] = useUpdatePlan();
  const { plans } = useDictionary();

  return (
    <OpenModalButton
      button={props => (
        <IconButton
          icon={faEdit}
          variant={Variant.primary}
          borderless
          {...props}
        />
      )}
      modalContent={props => (
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
    <IconButton
      icon={faTrash}
      variant={Variant.secondary}
      onClick={() => deletePlan(plan.id)}
      borderless
    />
  );
}

function CreatePlanButton() {
  const [createPlan] = useCreatePlan();
  const { plans } = useDictionary();

  return (
    <OpenModalButton
      button={props => <CreateButton {...props} />}
      modalContent={props => (
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

export default function Plans() {
  const query = useGetCurrentPlans();

  return (
    <Page>
      <Page.Header readTitle={d => d.sidebar.pages.plans} />
      <QueryTablePanel
        query={query}
        getData={data => data.budget.currentMonth.plans}
        buttons={<CreatePlanButton />}
        columns={columns}
        keyField='id'
        readTitle={d => d.plans.table.title}
        readColumnNames={d => d.plans.table.columns}
        defaultSorted={defaultSorted}
      />
    </Page>
  );
}
