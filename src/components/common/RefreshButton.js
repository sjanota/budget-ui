import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { IconButton } from '../sbadmin2';
import { Size, Variant } from '../sbadmin2/bootstrap';

export default function RefreshButton(props) {
  return (
    <IconButton
      icon={faSyncAlt}
      size={Size.sm}
      variant={Variant.secondary}
      type='button'
      {...props}
    />
  );
}
