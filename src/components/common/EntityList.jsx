import React from 'react';
import { useHistory } from 'react-router-dom';

import { QueryTablePanel } from '../gql/QueryTablePanel';

export function EntityList({
  basePath,
  createButton,
  name,
  columns,
  renderActions,
  ...props
}) {
  const history = useHistory();
  const enhancedColumns = [
    { dataField: 'name', sort: true },
    ...columns,
    {
      dataField: 'actions',
      isDummyColumn: true,
      formatter: (_, row) => <span>{renderActions(row)}</span>,
      style: {
        whiteSpace: 'nowrap',
        width: '1%',
        paddingBottom: 0,
      },
    },
  ];
  function onSelect(entity) {
    history.push(`${basePath}/${encodeURIComponent(entity.name)}`);
  }
  return (
    <QueryTablePanel
      {...props}
      columns={enhancedColumns}
      onSelect={onSelect}
      buttons={createButton}
      keyField='name'
      defaultSorted={[
        {
          dataField: 'name',
          order: 'asc',
        },
      ]}
      selected={name}
    />
  );
}
