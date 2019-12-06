import PropTypes from 'prop-types';
import React from 'react';

import CreateButton from '../common/CreateButton';
import { useCreateEnvelope } from '../gql/envelopes';
import { OpenModalButton } from '../sbadmin2';
import { useDictionary } from '../sbadmin2/language';
import { EnvelopeModal } from './EnvelopeModal';

export function CreateEnvelopeButton({ onClickRef }) {
  const [createEnvelope] = useCreateEnvelope();
  const { envelopes } = useDictionary();
  return (
    <OpenModalButton
      onClickRef={onClickRef}
      button={props => <CreateButton {...props} />}
      modalContent={props => (
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
