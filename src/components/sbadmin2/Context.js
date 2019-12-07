import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

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
  children: PropTypes.node,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export const useSBAdmin2 = () => useContext(SBAdmin2Context);
