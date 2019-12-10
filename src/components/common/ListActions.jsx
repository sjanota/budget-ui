import React from 'react';

import { useMonth } from '../context/Month';
import { useDictionary } from '../sbadmin2';
import ListAction from './ListAction';

export default function ListActions({
  row,
  monthScopedResource,
  dictionaryName,
  modalComponent,
  updateHook,
  deletehook,
}) {
  const { currentMonth, selectedMonth } = useMonth();
  const dictionary = useDictionary()[dictionaryName];
  const [updateMutation] = updateHook();
  const [deleteMutation] = deletehook();
  const disabled = monthScopedResource && currentMonth !== selectedMonth;
  return (
    <span>
      <ListAction.EditInModal
        modalComponent={modalComponent}
        init={row}
        update={updateMutation}
        dictionary={dictionary}
        disabled={disabled}
      />
      <ListAction.Delete
        onClick={() => deleteMutation(row.id)}
        disabled={disabled}
      />
    </span>
  );
}
