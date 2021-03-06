import React from 'react';
import { useSBAdmin2 } from '../context';

export default function TopbarUser() {
  const { user, logout } = useSBAdmin2();
  return (
    <li className="nav-item dropdown no-arrow">
      <span
        className="nav-link dropdown-toggle"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          {user.name}
        </span>
        <img alt="" className="img-profile rounded-circle" src={user.picture} />
      </span>
      <ul
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <li className="dropdown-item">
          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
          Settings
        </li>
        <div className="dropdown-divider"></div>
        <li
          className="dropdown-item"
          data-toggle="modal"
          data-target="#logoutModal"
          onClick={() => logout()}
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </li>
      </ul>
    </li>
  );
}
