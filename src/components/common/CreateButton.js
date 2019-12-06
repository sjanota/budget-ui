import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { SplitButton, useDictionary } from '../sbadmin2';
import { Size, Variant } from '../sbadmin2/bootstrap';

export default function CreateButton(props) {
  const { buttons } = useDictionary();
  return (
    <SplitButton
      icon={faPlus}
      size={Size.sm}
      variant={Variant.primary}
      type='button'
      {...props}
    >
      {buttons.save}
    </SplitButton>
  );
}
