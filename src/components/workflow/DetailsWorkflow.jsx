import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DetailsPage } from '../layout/DetailsPage';
import { withDictionary } from '../sbadmin2/language';

function DetailsWorkflow({ ...props }) {
  const { basePath } = props;
  return (
    <Switch>
      <Route
        path={`${basePath}/:name`}
        render={({ match }) => (
          <DetailsPage
            name={decodeURIComponent(match.params.name)}
            {...props}
          />
        )}
      />
    </Switch>
  );
}

export default withDictionary('title', DetailsWorkflow);
