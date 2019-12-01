import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormInModal, useDictionary } from '../sbadmin2';
import { useFormData } from '../sbadmin2/utilities/useFormData';

export function AccountModal({ init, ...props }) {
  const { accounts } = useDictionary();
  const formData = useFormData({
    name: { $init: init.name },
  });
  return (
    <FormInModal formData={formData} autoFocusRef={formData.name} {...props}>
      <FormControl
        label={accounts.modal.labels.name}
        inline={10}
        formData={formData.name}
        feedback="Provide name"
      />
    </FormInModal>
  );
}

AccountModal.propTypes = {
  init: PropTypes.shape({ name: PropTypes.string }).isRequired,
};
