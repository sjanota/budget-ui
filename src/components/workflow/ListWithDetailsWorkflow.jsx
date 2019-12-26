import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DetailsPage } from '../layout/DetailsPage';
import { ListPage } from '../layout/ListPage';
import { withDictionary } from '../sbadmin2/language';

function ListWithDetailsWorkflow({ ...props }) {
  const { basePath } = props;

  return (
    <Switch>
      <Route
        path={`${basePath}/:name`}
        render={({ match }) => (
          <DetailsPage name={match.params.name} {...props} />
        )}
      />
      <Route render={() => <ListPage {...props} />} />
    </Switch>
  );
}

export default withDictionary('title', ListWithDetailsWorkflow);
