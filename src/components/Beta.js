import { useAuth0 } from '../react-auth0-spa';
import React, { useState, useEffect } from 'react';

export function Beta({ children }) {
  const { getTokenScopes } = useAuth0();
  const [scope, setScope] = useState();

  useEffect(() => {
    getTokenScopes().then(setScope);
  }, [setScope, getTokenScopes]);

  if (!scope) {
    return <div></div>;
  }

  const isBetaUser = scope.some(v => v === 'beta');

  if (isBetaUser) {
    return children;
  }
  return <div>This conent is available only to beta users</div>;
}
