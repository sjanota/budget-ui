import React from 'react';

import { withDictionary } from '../sbadmin2/language';
import MonthSwitcher from './MonthSwitcher';

function Details({
  entity,
  columns,
  titleField,
  actionsField = 'actions',
  fieldNames,
}) {
  const actionsColumn = columns.find(c => c.dataField === actionsField);
  const fieldColumns = columns.filter(
    c => c.dataField !== titleField && c.dataField !== actionsField
  );
  return (
    <div className='mb-1'>
      <h3 className='d-flex justify-content-between'>
        <span>
          <span className='pr-2'>{entity[titleField]}</span>
          {actionsColumn.formatter(null, entity)}
        </span>
        <div>
          <MonthSwitcher />
        </div>
      </h3>
      {fieldColumns.map(f => {
        return (
          <DetailsField
            key={f.dataField}
            name={fieldNames[f.dataField]}
            value={
              f.formatter
                ? f.formatter(entity[f.dataField], entity)
                : entity[f.dataField]
            }
          />
        );
      })}
    </div>
  );
}

export default withDictionary('fieldNames', Details);

function DetailsField({ name, value }) {
  return (
    <p className='my-0'>
      <strong>{name}:</strong> {value}
    </p>
  );
}
