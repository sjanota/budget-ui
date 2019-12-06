import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { SplitButton, useDictionary } from '../sbadmin2';
import { Size, Variant } from '../sbadmin2/bootstrap';

export default function CancelButton(props) {
  const { buttons } = useDictionary();
  return (
    <SplitButton
      variant={Variant.secondary}
      icon={faTrash}
      size={Size.sm}
      type='button'
      {...props}
    >
      {buttons.cancel}
    </SplitButton>
  );
}
