import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const SBAdmin2Context = React.createContext();

export function SBAdmin2Provider({ user, logout, children }) {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  return (
    <SBAdmin2Context.Provider
      value={{
        sidebarToggled,
        user,
        logout,
        toggleSidebar: () => setSidebarToggled(current => !current),
      }}
    >
      {children}
    </SBAdmin2Context.Provider>
  );
}

SBAdmin2Provider.propTypes = {
  children: PropTypes.any,
};

export const useSBAdmin2 = () => useContext(SBAdmin2Context);
