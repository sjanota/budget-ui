import { faSave } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Variant } from '../sbadmin2/bootstrap';
import SplitButton from '../sbadmin2/components/SplitButton/SplitButton';
import { useDictionary } from '../sbadmin2/language';

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
