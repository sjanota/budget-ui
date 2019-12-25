import React from 'react';

import MonthSwitcher from './MonthSwitcher';

interface Props {
  title: string;
}

export default function HeaderWithMonthSwitcher({ title }: Props) {
  return (
    <h3 className='d-flex justify-content-between'>
      {title}
      <div>
        <MonthSwitcher />
      </div>
    </h3>
  );
}
