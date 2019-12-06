import { faSave } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { SplitButton, useDictionary } from '../sbadmin2';
import { Size, Variant } from '../sbadmin2/bootstrap';

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
