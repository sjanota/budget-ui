import PropTypes from 'prop-types';
import React from 'react';

import Amount from '../../model/Amount';
import { AmountInput } from '../Expenses/AmountInput';
import { useGetEnvelopes } from '../gql/envelopes';
import { WithQuery } from '../gql/WithQuery';
import { Combobox, useDictionary } from '../sbadmin2';
import { FormControl } from '../sbadmin2/utilities/FormControl';
import { FormInModal } from '../sbadmin2/utilities/FormInModal';
import { InlineFormControl } from '../sbadmin2/utilities/InlineFormControl';
import { OptionalFormControl } from '../sbadmin2/utilities/OptionalFormControl';
import { useFormData } from '../sbadmin2/utilities/useFormData';

export function PlanModal({ init, fromEnvelope, toEnvelope, ...props }) {
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
      $default: fromEnvelope && fromEnvelope.id,
    },
    toEnvelopeID: {
      $init: init.toEnvelope !== null ? init.toEnvelope.id : '',
      $process: v => (v === '' ? null : v),
      $default: toEnvelope && toEnvelope.id,
    },
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
                allowedValues={data.envelopes
                  .map(({ id, name }) => ({
                    id,
                    label: name,
                  }))
                  .concat([{ id: null, label: '' }])}
                disabled={!!fromEnvelope}
              />
            </InlineFormControl>
            <InlineFormControl size={8} label={plans.modal.labels.toEnvelope}>
              <Combobox
                _ref={formData.toEnvelopeID}
                defaultValue={formData.toEnvelopeID.default()}
                allowedValues={data.envelopes
                  .map(({ id, name }) => ({
                    id,
                    label: name,
                  }))
                  .concat([{ id: null, label: '' }])}
                disabled={!!toEnvelope}
              />
            </InlineFormControl>
          </>
        )}
      </WithQuery>
    </FormInModal>
  );
}

PlanModal.propTypes = {
  init: PropTypes.shape({
    title: PropTypes.string,
    currentAmount: PropTypes.number,
    recurringAmount: PropTypes.number,
    fromEnvelope: PropTypes.shape({ id: PropTypes.any.isRequired }),
    toEnvelope: PropTypes.shape({ id: PropTypes.any.isRequired }),
  }),
};
