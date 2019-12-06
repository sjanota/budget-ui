import PropTypes from 'prop-types';
import React from 'react';

import RefreshButton from '../common/RefreshButton';
import { WithQuery } from '../gql/WithQuery';
import { TablePanel } from '../sbadmin2';

export function QueryTablePanel({ query, buttons, getData, ...props }) {
  return (
    <WithQuery query={query} size='sm' showError={false}>
      {({ refetch, data }) => (
        <TablePanel
          headerButtons={
            <>
              <RefreshButton onClick={() => refetch()} className='mr-1' />
              {buttons}
            </>
          }
          data={getData(data)}
          {...props}
        />
      )}
    </WithQuery>
  );
}

QueryTablePanel.propTypes = {
  buttons: PropTypes.node,
  getData: PropTypes.func.isRequired,
  query: PropTypes.shape({
    data: PropTypes.any,
    refetch: PropTypes.func,
  }).isRequired,
};
