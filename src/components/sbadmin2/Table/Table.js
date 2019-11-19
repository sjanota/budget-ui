import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';

import { withDictionary } from '../language';

function Table({ columns, columnNames, ...props }) {
  return (
    <BootstrapTable
      bootstrap4
      columns={addColumnNames(columns, columnNames)}
      {...props}
    />
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  columnNames: PropTypes.object.isRequired,
};

function addColumnNames(columns, dictionary) {
  return columns.map(c => ({ ...c, text: dictionary[c.dataField] || '' }));
}

export default withDictionary('columnNames', Table);
