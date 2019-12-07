import React from 'react';
import BootstrapTable, {
  BootstrapTableProps,
  Column,
} from 'react-bootstrap-table-next';

import { withDictionary } from '../../language';

interface Dictionary {
  [key: string]: string;
}

interface Props<fieldIds extends string = string>
  extends BootstrapTableProps<fieldIds> {
  columnNames: Dictionary;
}

function Table({ columns, columnNames, ...props }: Props) {
  return (
    <BootstrapTable
      bootstrap4
      columns={addColumnNames(columns, columnNames)}
      {...props}
    />
  );
}

function addColumnNames<fieldIds extends string = string>(
  columns: Column<fieldIds>[],
  dictionary: Dictionary
) {
  return columns.map(c => ({ ...c, text: dictionary[c.dataField] || '' }));
}

export default withDictionary('columnNames', Table);
