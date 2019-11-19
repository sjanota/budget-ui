import React from 'react';
import ReactDOM from 'react-dom';
import './sb-admin-2.css';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { AuthApolloProvider, createClient } from './apollo';
import { Auth0Provider, Auth0Context } from './react-auth0-spa';
import config from './auth_config.json';
import { Beta } from './components/Beta';
import { ApolloProvider } from '@apollo/react-hooks';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const ProdAuthorizationProvider = ({ children }) => (
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={process.env.PUBLIC_URL || window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={config.audience}
    scope="beta"
    returnTo={process.env.PUBLIC_URL || window.location}
  >
    <AuthApolloProvider>{children}</AuthApolloProvider>
  </Auth0Provider>
);

const DevAuthorizationProvider = ({ children }) => (
  <Auth0Context.Provider
    value={{
      isAuthenticated: true,
      loading: false,
      loginWithRedirect: () => {},
      user: {
        name: 'Valerie Luna',
        picture: 'https://source.unsplash.com/QAB-WJcbgJk/60x60',
        locale: 'pl',
      },
      getTokenScopes: () => Promise.resolve(['beta']),
    }}
  >
    <ApolloProvider client={createClient()}>{children}</ApolloProvider>
  </Auth0Context.Provider>
);

const authDisabled = process.env.REACT_APP_INSECURE_AUTH_DISABLED;
const AuthorizationProvider =
  authDisabled !== 'true'
    ? ProdAuthorizationProvider
    : DevAuthorizationProvider;

ReactDOM.render(
  <AuthorizationProvider>
    <Beta>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Beta>
  </AuthorizationProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
