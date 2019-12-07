import PropTypes from 'prop-types';
import React from 'react';

import { useGetEnvelopes } from '../gql/envelopes';
import { WithQuery } from '../gql/WithQuery';
import { Combobox } from '../sbadmin2';
import { useDictionary } from '../sbadmin2/language';
import { FormControl } from '../sbadmin2/utilities/FormControl';
import { FormInModal } from '../sbadmin2/utilities/FormInModal';
import { InlineFormControl } from '../sbadmin2/utilities/InlineFormControl';
import { useFormData } from '../sbadmin2/utilities/useFormData';

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
    <FormInModal formData={formData} {...props}>
      <WithQuery query={query}>
        {({ data }) => (
          <>
            <FormControl
              label={categories.modal.labels.name}
              inline={9}
              formData={formData.name}
              feedback='Provide name'
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
              feedback='Provide description'
            />
          </>
        )}
      </WithQuery>
    </FormInModal>
  );
}

CategoryModal.propTypes = {
  envelope: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  id: PropTypes.string,
  init: PropTypes.shape({
    name: PropTypes.string,
    envelope: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    description: PropTypes.string,
  }),
  name: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};
