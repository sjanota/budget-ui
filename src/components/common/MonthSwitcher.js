import React from 'react';

import Month from '../../model/Month';
import { useMonth } from '../context/Month';
import { useDictionary } from '../sbadmin2';
import ContextSwitcher from '../sbadmin2/components/ContextSwitcher/ContextSwitcher';

export default function MonthSwitcher(props) {
  const { selectedMonth, setSelectedMonth } = useMonth();
  const { months } = useDictionary();
  const parsed = Month.parse(selectedMonth);
  const formated = `${months[parsed.month - 1]} ${parsed.year}`;
  return (
    <ContextSwitcher
      {...props}
      value={formated}
      allowedValues={[]}
      onChange={month => setSelectedMonth(month)}
      displayBg='white'
      label='Month'
      //   labelBg='light'
    />
  );
}
