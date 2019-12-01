import React from 'react';
import { OpenModalButton, ClickableIcon, Icon } from '../sbadmin2';
import { useUpdateEnvelope } from '../gql/envelopes';
import { EnvelopeModal } from './EnvelopeModal';
import PropTypes from 'prop-types';
import { useDictionary } from '../sbadmin2/language';
import { Variant } from '../sbadmin2/bootstrap';

export function UpdateEnvelopeButton({ envelope }) {
  const [updateEnvelope] = useUpdateEnvelope();
  const { envelopes } = useDictionary();

  const onSave = input => {
    updateEnvelope(envelope.id, input);
  };
  return (
    <OpenModalButton
      button={props => (
        <ClickableIcon icon={Icon.Edit} variant={Variant.primary} {...props} />
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
