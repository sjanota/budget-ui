import React from 'react';

import { withDictionary } from '../sbadmin2/language';

function Details({ entity, columns, fieldNames }) {
  return (
    <div className='mb-3'>
      <div className='pl-2'>
        {columns.map(f => {
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
