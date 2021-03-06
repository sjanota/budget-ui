import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { IconButton } from '../sbadmin2';
import { Size, Variant } from '../sbadmin2/bootstrap';

export default function CreateButton(props) {
  return (
    <IconButton
      icon={faPlus}
      size={Size.sm}
      variant={Variant.primary}
      type='button'
      {...props}
    />
  );
}
