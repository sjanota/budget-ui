import React from 'react';
import { OpenModalButton, FaIconLink, FaIcon } from '../sbadmin2';
import { useUpdateEnvelope } from '../gql/envelopes';
import { EnvelopeModal } from './EnvelopeModal';
import PropTypes from 'prop-types';
import { useDictionary } from '../sbadmin2/utilities/Lang';
import { Variant } from '../sbadmin2/bootstrap';

export function UpdateEnvelopeButton({ envelope }) {
  const [updateEnvelope] = useUpdateEnvelope();
  const { envelopes } = useDictionary();

  const onSave = input => {
    updateEnvelope(envelope.id, input);
  };
  return (
    <OpenModalButton
      renderButton={props => (
        <FaIconLink icon={FaIcon.Edit} variant={Variant.primary} {...props} />
      )}
      renderModal={props => (
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
