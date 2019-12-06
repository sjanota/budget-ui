import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { useUpdateEnvelope } from '../gql/envelopes';
import { IconButton, OpenModalButton, useDictionary } from '../sbadmin2';
import { Variant } from '../sbadmin2/bootstrap';
import { EnvelopeModal } from './EnvelopeModal';

export function UpdateEnvelopeButton({ envelope }) {
  const [updateEnvelope] = useUpdateEnvelope();
  const { envelopes } = useDictionary();

  const onSave = input => {
    updateEnvelope(envelope.id, input);
  };
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
        <EnvelopeModal
          title={envelopes.modal.editTitle}
          init={envelope}
          onSave={onSave}
          {...props}
        />
      )}
    />
  );
}

UpdateEnvelopeButton.propTypes = {
  envelope: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
