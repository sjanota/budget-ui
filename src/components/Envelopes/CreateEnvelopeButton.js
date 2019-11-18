import React from 'react';
import { OpenModalButton } from '../sbadmin2';
import CreateButton from '../sbadmin2/utilities/CreateButton';
import { useCreateEnvelope } from '../gql/envelopes';
import { EnvelopeModal } from './EnvelopeModal';
import { useDictionary } from '../sbadmin2/language';
import PropTypes from 'prop-types';

export function CreateEnvelopeButton({ onClickRef }) {
  const [createEnvelope] = useCreateEnvelope();
  const { envelopes } = useDictionary();
  return (
    <OpenModalButton
      onClickRef={onClickRef}
      renderButton={props => <CreateButton {...props} />}
      renderModal={props => (
        <EnvelopeModal
          title={envelopes.modal.createTitle}
          init={{ name: '', limit: null }}
          onSave={createEnvelope}
          {...props}
        />
      )}
    />
  );
}

CreateEnvelopeButton.propTypes = {
  onClickRef: PropTypes.shape({ current: PropTypes.any }),
};
