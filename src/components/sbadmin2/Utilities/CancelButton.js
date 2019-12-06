import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Variant } from '../bootstrap';
import SplitButton from '../components/SplitButton/SplitButton';
import { useDictionary } from '../language';

export default function CancelButton({ onClick }) {
  const { buttons } = useDictionary();
  return (
    <SplitButton
      variant={Variant.secondary}
      icon={faTrash}
      size={Size.sm}
      onClick={onClick}
      type='button'
    >
      {buttons.cancel}
    </SplitButton>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
