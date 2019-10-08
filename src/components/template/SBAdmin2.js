import React from 'react';
import { TemplateProvider } from './Context';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Sidebar from './Sidebar/Sidebar';

export default function SBAdmin2({
  sidebarProps,
  topbar,
  children,
  copyright,
}) {
  const Topbar = topbar;
  return (
    <TemplateProvider>
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
    </TemplateProvider>
  );
}

SBAdmin2.propTypes = {
  children: PropTypes.any,
  copyright: PropTypes.string,
  sidebar: PropTypes.elementType.isRequired,
  topbar: PropTypes.elementType.isRequired,
};