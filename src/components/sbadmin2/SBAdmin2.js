import React from 'react';
import { SBAdmin2Provider } from './context';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import Sidebar from './Sidebar/Sidebar';
import { DictionaryProvider } from './language';

export function SBAdmin2({
  sidebarProps,
  topbar,
  user,
  logout,
  children,
  dictionaries,
  copyright,
}) {
  const Topbar = topbar;
  return (
    <SBAdmin2Provider user={user} logout={logout}>
      <DictionaryProvider dictionaries={dictionaries}>
        <div id="wrapper">
          <Sidebar {...sidebarProps} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <Switch>
                {children}
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; {copyright}</span>
            </div>
          </div>
        </footer>
      </DictionaryProvider>
    </SBAdmin2Provider>
  );
}

SBAdmin2.propTypes = {
  children: PropTypes.any,
  copyright: PropTypes.string,
  sidebarProps: PropTypes.shape(Sidebar.propTypes).isRequired,
  topbar: PropTypes.elementType.isRequired,
  user: PropTypes.shape({
    locale: PropTypes.string,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  dictionaries: PropTypes.object,
};
