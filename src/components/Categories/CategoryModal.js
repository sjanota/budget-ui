import React from 'react';
import FormModal from '../sbadmin2/utilities/FormModal';
import { useFormData } from '../sbadmin2/utilities/useFormData';
import { FormControl } from '../sbadmin2/utilities/FormControl';
import PropTypes from 'prop-types';
import { useGetEnvelopes } from '../gql/envelopes';
import { WithQuery } from '../gql/WithQuery';
import { Combobox } from '../sbadmin2/utilities/Combobox';
import { InlineFormControl } from '../sbadmin2/utilities/InlineFormControl';
import { useDictionary } from '../sbadmin2/language';

export function CategoryModal({ init, ...props }) {
  const query = useGetEnvelopes();
  const { categories } = useDictionary();
  const formData = useFormData({
    name: { $init: init.name },
    envelopeID: {
      $init: init.envelope.id,
    },
    description: { $init: init.description },
  });
  return (
    <FormModal autoFocusRef={formData.name} formData={formData} {...props}>
      <WithQuery query={query}>
        {({ data }) => (
          <>
            <FormControl
              label={categories.modal.labels.name}
              inline={9}
              formData={formData.name}
              feedback="Provide name"
            />
            <InlineFormControl
              size={9}
              label={categories.modal.labels.envelope}
            >
              <Combobox
                allowedValues={data.envelopes.map(({ id, name }) => ({
                  id,
                  label: name,
                }))}
                _ref={formData.envelopeID}
                defaultValue={formData.envelopeID.default()}
              />
            </InlineFormControl>
            <FormControl
              label={categories.modal.labels.description}
              inline={9}
              formData={formData.description}
              feedback="Provide description"
            />
          </>
        )}
      </WithQuery>
    </FormModal>
  );
}

CategoryModal.propTypes = {
  init: PropTypes.shape({
    name: PropTypes.string,
    envelope: PropTypes.shape({ id: PropTypes.string }).isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};
