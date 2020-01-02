import PropTypes from 'prop-types';
import React from 'react';

import Amount from '../../model/Amount';
import * as model from '../../model/propTypes';
import { AmountInput } from '../Expenses/AmountInput';
import { useDictionary } from '../sbadmin2/language';
import { FormControl } from '../sbadmin2/utilities/FormControl';
import { FormInModal } from '../sbadmin2/utilities/FormInModal';
import { OptionalFormControl } from '../sbadmin2/utilities/OptionalFormControl';
import { useFormData } from '../sbadmin2/utilities/useFormData';

export function EnvelopeModal({ init, ...props }) {
  const { envelopes } = useDictionary();
  const formData = useFormData({
    name: { $init: init.name },
    limit: {
      $init: Amount.format(init.limit, false),
      $process: Amount.parse,
    },
  });
  return (
    <FormInModal formData={formData} {...props}>
      <FormControl
        label={envelopes.modal.labels.name}
        inline={9}
        feedback='Provide a name for the envelope'
        required
        formData={formData.name}
      />
      <OptionalFormControl
        initEnabled={!!init.limit}
        inline={9}
        label={envelopes.modal.labels.limit}
      >
        <AmountInput formData={formData.limit} required />
      </OptionalFormControl>
    </FormInModal>
  );
}

EnvelopeModal.propTypes = {
  init: PropTypes.shape({
    name: PropTypes.string,
    limit: model.Amount,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};
