import React from 'react';
import SplitButton from '../components/SplitButton/SplitButton';
import PropTypes from 'prop-types';
import { useDictionary } from '../language';
import Icon from '../components/Icon/Icon';
import { Size, Variant } from '../bootstrap';

export default function CancelButton({ onClick }) {
  const { buttons } = useDictionary();
  return (
    <SplitButton
      variant={Variant.danger}
      icon={Icon.Save}
      size={Size.sm}
      onClick={onClick}
    >
      {buttons.cancel}
    </SplitButton>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
