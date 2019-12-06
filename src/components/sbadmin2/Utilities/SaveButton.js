import { faSave } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Variant } from '../bootstrap';
import SplitButton from '../components/SplitButton/SplitButton';
import { useDictionary } from '../language';

export default function SaveButton(props) {
  const { buttons } = useDictionary();

  return (
    <SplitButton
      icon={faSave}
      size={Size.sm}
      variant={Variant.primary}
      type='submit'
      {...props}
    >
      {buttons.save}
    </SplitButton>
  );
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
